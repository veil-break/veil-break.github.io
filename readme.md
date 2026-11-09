# veilbreak // public pages

The public face of Veilbreak at <https://veil-break.github.io>: a static site with no build step.

| page | what it is |
| --- | --- |
| `index.html` | the immersive landing: the branding splash shatters into a living hero (rain, a flickering rift, a random squad of three in parallax under the slash-cut title), then the premise, the four classes, the operative spotlight and reel, the run loop and the `/dev/veil` terminal |
| `characters/` | the fighter archive: all roster fighters, class and kit filters (shareable as `?class=…&kit=…&q=…`), and a dossier per fighter (`#id`) with stats, lore, abilities and their rank 0 → 3 → 5 forms, artwork and the complete source record |
| `404.html` | signal lost (also forwards `/characters` to `/characters/`) |

## Sources

Nothing here is authored by hand that a producer owns. `tools/sync.py` derives it from sibling checkouts in a veilbreak
workspace:

| producer | output |
| --- | --- |
| `veil-break/characters` (`data/catalog.json`, `fighters/<id>/canonical.json`, artwork manifests, `docs/icon-vectors.json`) | `data/roster.json` (the summary both pages read), `characters/data/<id>.json` (record + canonical module, loaded when a dossier opens), `characters/data/systems.json`, `characters/media/` (WebP renditions of the selected face, figure and dossier sheet, a thumbnail, the skill and class SVGs) |
| `veil-break/veilbreak-design-system` (`com.veilbreak.gui`'s web kit, `Web~/dist`) | `vendor/veilbreak/gui/` (`tokens.css`, `veilbreak.js`, fonts, `source.json`) |

```sh
python3 tools/sync.py           # needs Pillow for changed images (pip install pillow)
python3 tools/sync.py --check   # writes nothing; exit 1 when an output is stale
```

Artwork is selected by manifest kind and role, never by filename. Images re-encode only when their source bytes or the
rendition recipe change (`characters/media/manifest.json`); the web renditions drop the near-invisible alpha haze (1–11)
around the cutouts. Artwork in the characters repository is git-lfs: run `git lfs pull`
there first. `roster.json` records the producer release and commit; the footer and the archive show it.

## Design system

Every colour, font, cut size, duration and easing is a kit token from `vendor/veilbreak/gui/tokens.css`;
`styles/tokens.css` only adds page-level sizes and maps the four classes and three rarities onto kit colours.
`styles/components.css` ports the kit's cut-corner shape (`VbShape`, `--vb-cut-side 0`) to CSS: `::before` fills the
outline, `::after` frames the ring inset by the frame width, so a glow (`--glow-cta`) bleeds outside the cut and
`.shape--clip` clips content where it must. Title reveals use the kit's own `Veilbreak.Glitch.reveal`. Monochrome
producer SVGs (skills, classes) are painted through CSS masks in the fighter's signal colour.

Stylesheets are layered once in `styles/main.css`: `reset, kit, tokens, base, layout, components, pages, utilities,
overrides`; each page adds `styles/pages/<page>.css`.

## Scripts

- `scripts/lib/`: `roster.js` (pure model: filters, search, units, seeded squads), `dom.js`, `fighter-view.js` (chips,
  skill chips, faces shared by both pages), `motion.js` (kit glitch, one reveal observer), `color.js` (tokens for canvases).
- `scripts/landing/`: `intro.js` (splash → handoff → live), `hero.js` (pointer and scroll → CSS variables, squad),
  `veil.js` + `veil-field.js` (the hero canvas), `classes.js`, `spotlight.js`, `main.js`.
- `scripts/archive/`: `main.js` (grid, filters, URL state), `dossier.js` (dialog, tabs), `json-viewer.js`.
- `scripts/breach-effects.js`, `hex-shatter.js`, `shatter-geometry.js`: the finite handoff and fault canvas.
- `scripts/terminal.js`, `terminal-state.js`: the simulated shell; every command fails as text.
- `scripts/VeilbreakSplash.js` is ported from `com.veilbreak.branding`.

Motion respects `prefers-reduced-motion`: the splash is skipped, canvases draw one still frame, loops and the carousel
stop. Canvases cap the device pixel ratio at 1.5 and pause off screen and in hidden tabs.

## Verify

```sh
bun test                         # pure modules and synced-data invariants (CI runs this before deploying)
python3 tools/sync.py --check    # with the producer checkouts beside this one
python3 -m http.server 8000      # then open http://localhost:8000 (the archive fetches JSON, so file:// will not do)
```

Last verified 2026-11-09 against characters 3.6.0 (`0296a5b`) and gui 0.9.2 (`71a8777`): 27 Bun tests, `--check`
clean, and headless Chromium captures of both pages at 1440 × 900 and 390 × 844 with no console errors and no
horizontal overflow. Not checked: Safari and Firefox, real devices, screen readers.
