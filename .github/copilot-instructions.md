# Copilot / AI agent instructions

Short, actionable guidance for editing this static site. Follow literals and file-level conventions precisely.

- Project type: single-page static site (no build). Deploy via GitHub Pages. Local testing: open `index.html` in browser or run a simple static server (examples below).

- Main layout:
  - `index.html` — structure and content (Lithuanian). Timers live in elements with class `countdown` and attributes `data-month`/`data-day`.
  - `script.js` — all JS behavior: timer calculation, audio controls, karaoke-style paragraph highlighting. Avoid splitting logic into multiple JS files unless necessary.
  - `style.css` — global styles; uses `image-set` for `assets/img/Flag_of_Lithuania.webp` fallback and dark-mode overrides.

- Concrete patterns to preserve or follow:
  - Timers: keep `data-month`/`data-day` numeric attributes and the `nextOccurrence()` logic in `script.js` that advances to the next year when needed.
  - Lyrics/audio sync: each hymn stanza is a `<p data-start="SECONDS">` — `data-start` is seconds into the audio. If you change text or timings, update `data-start` numbers accordingly.
  - Audio files: repository expects `assets/audio/tautiska-giesme.mp3` and `.ogg`. Keep filenames; audio UI reads `loadedmetadata`, `timeupdate`, and uses `audio.currentTime` for seeks.
  - Accessibility: the markup includes `role="list"`, `role="listitem"`, `aria-live="polite"` and `aria-label` for timer units. Preserve these attributes when modifying structure.
  - DOM state: `script.js` stores `node._target` (Date) on countdown nodes. If refactoring, maintain equivalent per-node storage to avoid breaking updates.

- Styling and assets:
  - Background uses WebP first, JPEG fallback: `assets/img/Flag_of_Lithuania.webp` / `.jpg`.
  - Karaoke highlight: `.hymn p.active` is styled in `style.css`; keep that selector if adjusting highlight behavior.

- Local test commands (pick one):
  - `python -m http.server 8000` (in repo root)
  - `npx serve .`

- When to change behavior vs. markup:
  - Prefer small markup changes (add/remove `data-*`, aria attributes, or small text edits). For behavioral changes, edit `script.js` with minimal, well-tested edits; run local server to verify audio seeking and timers.

- Examples to reference while coding:
  - Timer element: `<div class="countdown" data-month="2" data-day="16"></div>`
  - Lyric stanza with seek: `<p data-start="17">Tegu Tavo vaikai eina...</p>`

If anything in this file is unclear or you'd like more examples (e.g., tests or CI), tell me which area to expand and I will update the instructions.
