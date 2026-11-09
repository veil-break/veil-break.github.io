#!/usr/bin/env python3
"""Sync the public pages from their two producers.

characters (veil-break/characters)      -> data/roster.json, characters/data/, characters/media/
design-system (veilbreak-design-system) -> vendor/veilbreak/gui/ (the @veilbreak/gui web kit dist)

Both producers are sibling checkouts in a veilbreak workspace. Every output is a derived view: edit
the producers, then rerun this tool. `--check` writes nothing and exits 1 when any output is stale.
Images are re-encoded only when their source bytes change (characters/media/manifest.json), so
`--check` never depends on the local WebP encoder build, and it compares git lfs pointers by their oid, so it needs no
lfs objects either. Images need Pillow (`pip install pillow`).
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import re
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
SLOTS = ('basic', 'active', 'signature', 'passive')
ROLES = ('breaker', 'striker', 'bastion', 'operator')
HYPOTHESIS_VARIANT = 'hypothesis-kit'
KIT_FILES = ('tokens.css', 'veilbreak.js')
# The cutouts carry a near-invisible alpha haze (1–11) around the figure; the web rendition drops it.
ALPHA_FLOOR = 12
WEBP_METHOD = 4  # 6 is ~5x slower for a few percent

# Selected artwork by manifest kind/role (never by hard-coded filename), and its web rendition.
ARTWORK = {
    'face': (('portrait', 'generated-face-closeup-v2'), (640, 640), 82),
    'thumb': (('portrait', 'generated-face-closeup-v2'), (256, 256), 78),
    'figure': (('figure', 'generated-full-body-v2'), (1024, 1536), 80),
    'dossier': (('concept-sheet', 'selected-dossier'), (1600, 1600), 80),
}


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def dumps(value) -> bytes:
    return (json.dumps(value, ensure_ascii=False, separators=(',', ':')) + '\n').encode()


def first_existing(*candidates: Path) -> Path | None:
    return next((path for path in candidates if path.is_dir()), None)


def commit_of(root: Path) -> str:
    result = subprocess.run(['git', '-C', str(root), 'rev-parse', 'HEAD'], capture_output=True, text=True, check=False)
    return result.stdout.strip() or 'unknown'


def lfs_pointer(data: bytes) -> bool:
    return data.startswith(b'version https://git-lfs.github.com/spec/')


def content_digest(data: bytes) -> str:
    """sha256 of the content; a git lfs pointer already names it (its oid), so no object fetch is needed to compare."""
    if lfs_pointer(data):
        match = re.search(rb'oid sha256:([0-9a-f]{64})', data)
        if match:
            return match.group(1).decode()
    return sha256(data)


class Outputs:
    """Collects every file the sync owns, then writes or checks them in one place."""

    def __init__(self) -> None:
        self.files: dict[Path, bytes] = {}
        self.owned_dirs: list[Path] = []

    def put(self, relative: str, data: bytes) -> str:
        self.files[SITE / relative] = data
        return relative

    def own(self, relative: str) -> None:
        self.owned_dirs.append(SITE / relative)

    def stale(self) -> list[str]:
        changed = [p for p, data in self.files.items() if not p.is_file() or p.read_bytes() != data]
        extra = [p for d in self.owned_dirs if d.is_dir() for p in d.rglob('*') if p.is_file() and p not in self.files]
        return sorted(str(p.relative_to(SITE)) for p in changed + extra)

    def write(self) -> None:
        for directory in self.owned_dirs:
            for path in directory.rglob('*') if directory.is_dir() else []:
                if path.is_file() and path not in self.files:
                    path.unlink()
        for path, data in self.files.items():
            if not path.is_file() or path.read_bytes() != data:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(data)


# ── characters ──────────────────────────────────────────────────────────────


def selected_asset(record: dict, kind: str, role: str) -> dict | None:
    return next((a for a in record['assets']['assets'] if a['kind'] == kind and a.get('role') == role), None)


def kit_status(record: dict) -> str:
    selected = [v['id'] for v in record['variants']['records'] if v['status'] == 'selected']
    return 'hypothesis' if HYPOTHESIS_VARIANT in selected else 'authored'


def unquote(text: str | None) -> str | None:
    return text.strip().strip('“”"').strip() if text else None


def summary(record: dict, media: dict[str, str]) -> dict:
    dossier = record.get('dossier') or {}
    lore = dossier.get('lore') or {}
    return {
        'id': record['id'],
        'name': record['name'],
        'code': record['code'],
        'role': record['role'],
        'rarity': record['rarity'],
        'callsign': record['callsign'],
        'signal': record['signal'],
        'pronouns': record.get('pronouns'),
        'kit': kit_status(record),
        'identity': dossier.get('identity'),
        'weapon': dossier.get('weaponConcept'),
        'quote': unquote(lore.get('combatQuote')),
        'stats': {key: record[key] for key in ('hp', 'armor', 'stability', 'moveSpeed')},
        'skills': [{'slot': slot, 'name': record[slot]['name'], 'icon': media.get(slot)} for slot in SLOTS],
        'pending': dossier.get('pending') or [],
        'media': {key: media[key] for key in ARTWORK if key in media},
    }


class ImageCache:
    """Re-encode an image only when its source bytes change."""

    def __init__(self, outputs: Outputs, check: bool) -> None:
        self.outputs, self.check = outputs, check
        path = SITE / 'characters/media/manifest.json'
        self.previous = json.loads(path.read_text()) if path.is_file() else {}
        self.manifest: dict[str, str] = {}

    def webp(self, source: Path, relative: str, box: tuple[int, int], quality: int) -> str:
        data = source.read_bytes()
        recipe = f'webp q{quality} m{WEBP_METHOD} {box[0]}x{box[1]} alpha>={ALPHA_FLOOR}'
        digest, target = f'{content_digest(data)} {recipe}', SITE / relative
        self.manifest[relative] = digest
        if self.previous.get(relative) == digest and target.is_file():
            return self.outputs.put(relative, target.read_bytes())
        if self.check:
            return self.outputs.put(relative, b'')  # stale: the manifest names a different source
        if lfs_pointer(data):
            sys.exit(f'{source} changed and is a git lfs pointer: run `git lfs pull` in the characters checkout')
        from PIL import Image  # noqa: PLC0415  (only an image change needs Pillow)

        image = Image.open(io.BytesIO(data))
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        if image.mode == 'RGBA':
            image.putalpha(image.getchannel('A').point(lambda a: 0 if a < ALPHA_FLOOR else a))
        image.thumbnail(box, Image.Resampling.LANCZOS)
        buffer = io.BytesIO()
        image.save(buffer, 'WEBP', quality=quality, method=WEBP_METHOD)
        return self.outputs.put(relative, buffer.getvalue())

    def finish(self) -> None:
        self.outputs.put('characters/media/manifest.json', (json.dumps(self.manifest, indent=1, sort_keys=True) + '\n').encode())


def sync_characters(root: Path, outputs: Outputs, check: bool) -> dict:
    catalog = json.loads((root / 'data/catalog.json').read_text())
    order = json.loads((root / 'fighters/roster.json').read_text())['roster']
    records = {record['id']: record for record in catalog['characters']}
    images = ImageCache(outputs, check)
    for owned in ('characters/media', 'characters/data'):
        outputs.own(owned)

    classes = []
    for record in json.loads((root / 'docs/icon-vectors.json').read_text())['records']:
        if record['slot'] == 'role':
            icon = outputs.put(f"characters/media/classes/{record['role']}.svg", (root / record['path']).read_bytes())
            classes.append({'id': record['role'], 'icon': icon})
    classes.sort(key=lambda c: ROLES.index(c['id']))

    fighters = []
    for fighter_id in order:
        record, base = records[fighter_id], f'characters/media/{fighter_id}'
        media = {}
        for key, ((kind, role), box, quality) in ARTWORK.items():
            asset = selected_asset(record, kind, role)
            if asset:
                media[key] = images.webp(root / asset['path'], f'{base}/{key}.webp', box, quality)
        for slot in SLOTS:
            asset = next((a for a in record['assets']['assets'] if a['kind'] == 'skill-icon' and a['role'] == slot), None)
            if asset and asset['path'].endswith('.svg'):
                media[slot] = outputs.put(f'{base}/skills/{slot}.svg', (root / asset['path']).read_bytes())
        fighters.append(summary(record, media))
        module = json.loads((root / f'fighters/{fighter_id}/canonical.json').read_text())
        outputs.put(f'characters/data/{fighter_id}.json', dumps({
            'record': record,
            'augments': catalog.get('augments', {}).get(fighter_id),
            'module': module,
        }))
    images.finish()

    for role in classes:
        role['count'] = sum(f['role'] == role['id'] for f in fighters)
    outputs.put('characters/data/systems.json', dumps({key: catalog[key] for key in ('units', 'systems', 'equipment')}))
    source = {
        'repository': 'veil-break/characters',
        'version': catalog['version'],
        'commit': commit_of(root),
        'fingerprint': catalog['fingerprint'],
    }
    progression = catalog['systems']['skillPoints']
    outputs.put('data/roster.json', dumps({'source': source, 'progression': progression, 'classes': classes, 'fighters': fighters}))
    return source


# ── design system ───────────────────────────────────────────────────────────


def sync_design_system(root: Path, outputs: Outputs) -> dict:
    gui = root / 'packages/com.veilbreak.gui'
    dist = gui / 'Web~/dist'
    outputs.own('vendor/veilbreak/gui')
    for name in KIT_FILES:
        outputs.put(f'vendor/veilbreak/gui/{name}', (dist / name).read_bytes())
    for font in sorted((dist / 'fonts').iterdir()):
        outputs.put(f'vendor/veilbreak/gui/fonts/{font.name}', font.read_bytes())
    source = {
        'repository': 'veil-break/veilbreak-design-system',
        'package': 'com.veilbreak.gui',
        'version': json.loads((gui / 'package.json').read_text())['version'],
        'web': json.loads((gui / 'Web~/package.json').read_text())['version'],
        'commit': commit_of(root),
    }
    outputs.put('vendor/veilbreak/gui/source.json', (json.dumps(source, indent=1) + '\n').encode())
    return source


def main() -> int:
    workspace = SITE.parent
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--characters', type=Path, default=first_existing(workspace / 'characters', workspace / 'veilbreak-characters'))
    parser.add_argument('--design-system', type=Path, default=first_existing(workspace / 'veilbreak-design-system'))
    parser.add_argument('--check', action='store_true', help='write nothing; exit 1 when an output is stale')
    args = parser.parse_args()
    if not args.characters or not args.design_system:
        parser.error('pass --characters and --design-system (no sibling checkout found)')

    outputs = Outputs()
    characters = sync_characters(args.characters.resolve(), outputs, args.check)
    kit = sync_design_system(args.design_system.resolve(), outputs)
    stale = outputs.stale()
    label = f"characters {characters['version']} @ {characters['commit'][:8]} · gui {kit['version']} @ {kit['commit'][:8]}"
    if args.check:
        print('\n'.join(f'stale: {path}' for path in stale) or f'up to date ({label})')
        return 1 if stale else 0
    outputs.write()
    print(f'{len(stale)} file(s) updated ({label})')
    return 0


if __name__ == '__main__':
    sys.exit(main())
