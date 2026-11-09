# veilbreak // public pages

The public face of Veilbreak at <https://veil-break.github.io>: a static site with no build step.

| page | what it is |
| --- | --- |
| `index.html` | the immersive landing over one fixed, living backdrop (the veil fractured above a megastructure city: light leaking through broken panes, sky whales, obsidian shards rising into the breach, lit towers, burning ruins, fog, embers and rain; the city climbs as the page descends). The branding splash shatters into the hero (a random squad of three in parallax under the slash-cut title), then the premise, the four classes, the operative spotlight and reel, the run loop and the `/dev/veil` terminal |
| `characters/` | the fighter archive: all roster fighters, class, rarity and kit filters (shareable as `?class=…&rarity=…&kit=…&q=…`), and a dossier per fighter (`#id`) with stats, lore, compact abilities whose rank (0, 3 or 5) toggles per skill or for all at once, artwork and the complete source record. The arrows beside close (or ← →) step through the fighters the filters show, sliding the view the way it travels |
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
around the cutouts. Artwork in the characters repository is git-lfs: `--check` compares
pointers by their oid, and only an artwork change needs `git lfs pull` there. `roster.json` records the producer release and commit; the footer and the archive show it.

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

- `scripts/lib/`: `roster.js` (pure model: filters and their URL state, search, units, seeded squads), `dom.js` (with
  `segmented`, the kit's VbSegmented as a radio group), `fighter-view.js` (chips, skill chips, faces shared by both
  pages), `motion.js` (kit glitch, one reveal observer), `color.js` (kit tokens resolved for canvases).
- `scripts/landing/`: `intro.js` (splash → handoff → live), `hero.js` (pointer and scroll → CSS variables and the
  backdrop, squad), `backdrop.js` (the page canvas) over `scene-field.js` (pure geometry: city layers, the fracture,
  shards, the whale) and `veil-field.js` (rain, embers), `classes.js`, `spotlight.js`, `main.js`.
- `scripts/archive/`: `main.js` (grid, filters, URL state), `dossier.js` (dialog, tabs), `json-viewer.js`.
- `scripts/breach-effects.js`, `hex-shatter.js`, `shatter-geometry.js`: the finite handoff and fault canvas.
- `scripts/terminal.js`, `terminal-state.js`: the simulated shell; every command fails as text.
- `scripts/VeilbreakSplash.js` is ported from `com.veilbreak.branding`.

Motion respects `prefers-reduced-motion`: the splash is skipped, canvases draw one still frame, loops, the carousel and
the dossier slide stop. The backdrop paints its static layers once per size into offscreen canvases, composites them
at 30 fps with the device pixel ratio capped at 1.25, and pauses in hidden tabs. Nothing over it uses a blend mode or a
per-frame filter (side fighters recede with opacity, the title carries its own raster), because those recomposite
with every backdrop frame.

## Verify

```sh
bun test                         # pure modules and synced-data invariants (CI runs this before deploying)
python3 tools/sync.py --check    # with the producer checkouts beside this one
python3 -m http.server 8000      # then open http://localhost:8000 (the archive fetches JSON, so file:// will not do)
```

Last verified 2026-11-09 against characters 3.6.0 (`0296a5b`) and gui 0.9.2 (`71a8777`): 35 Bun tests, `--check`
clean, and headless Chromium captures of both pages at 1440 × 900 and 390 × 844 with no console errors and no
horizontal overflow, plus scripted checks of the filters, the dossier arrows and keys, the rank toggles and reduced
motion. Headless Chromium rasterises in software, so its frame rates (about 39 fps on the landing) say little about
GPU devices. Not checked: Safari and Firefox, real devices, screen readers.
