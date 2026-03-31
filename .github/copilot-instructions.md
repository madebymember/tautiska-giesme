# Copilot / AI agent instructions

## Project shape
- Static multi-page site with no build step or framework.
- Main public pages are `index.html`, `saltiniai.html`, and `kontaktai.html`.
- Shared styles and behavior live in `assets/css/style.css` and `assets/js/theme.js`.
- There is also legacy/root-level `style.css` and `script.js`; do not assume they are wired into the current public pages unless explicitly asked to migrate or reuse them.
- Deploy target is GitHub Pages with a custom domain via `CNAME`; keep paths relative and repo-local where possible.
- UI language is Lithuanian; preserve text, diacritics, and existing page titles/meta copy.

## Architecture and data flow
- `index.html` is the landing page with hero content, a native `<audio>` player for the hymn, and the hymn text split into `.anthem-stanza` blocks.
- `saltiniai.html` contains the source links page.
- `kontaktai.html` contains the contact information page.
- Shared page chrome is repeated across pages: skip link, sticky header, navigation menu, theme toggle, main content, and footer.
- Styling is driven by CSS custom properties in `assets/css/style.css`, including light/dark theme tokens under `body[data-theme="dark"]`.
- Theme behavior is handled by `assets/js/theme.js`; keep theme-toggle hooks and `data-theme` behavior consistent with existing markup.
- SEO/discovery files include `robots.txt`, `sitemap.xml`, canonical URLs, Open Graph metadata, and JSON-LD in `index.html`.

## File-specific conventions
- Keep page-local links relative: `index.html`, `saltiniai.html`, `kontaktai.html`, `favicon.ico`.
- Preserve shared navigation structure and active-link states (`.nav-menu a.active`, `aria-current="page"`).
- Preserve accessibility hooks such as `.skip-link`, `aria-label` values, `aria-controls`, and `aria-expanded` on the mobile nav toggle.
- Keep the main audio source path as `assets/audio/tautiska-giesme.mp3` unless the markup is intentionally expanded to support additional formats.
- Preserve the hymn text structure as grouped `.anthem-stanza` blocks; when editing lyrics, update text only and avoid unnecessary structural rewrites.
- Keep footer year placeholders as `<span id="current-year"></span>` so shared JS can populate them.
- When editing metadata, keep Lithuanian copy and the deployed canonical/OG URLs under `https://tautiškagiesmė.lt/` aligned across pages.

## Styling and assets
- Primary production stylesheet is `assets/css/style.css`.
- Reuse existing CSS variables, spacing scale, and component classes (`.container`, `.card`, `.button`, `.site-header`, `.nav-menu`, `.hero-*`, `.anthem-*`).
- Preserve responsive behavior around the existing mobile breakpoint (`max-width: 860px`).
- Image assets currently use `assets/images/lietuvos-veliava.svg` in page markup and Open Graph tags.
- Additional legacy background assets exist under `assets/img`; only use or modify them when working on the legacy/root-level stylesheet.

## Integration points and dependencies
- No package-managed runtime dependencies or build tooling.
- Current public pages load:
  - `assets/css/style.css`
  - `assets/js/theme.js`
  - `assets/audio/tautiska-giesme.mp3`
  - `assets/images/lietuvos-veliava.svg`
- Native browser features only: HTML audio, CSS custom properties, `color-mix()`, smooth scrolling, and DOM APIs.
- Hosting-related files include `CNAME`, `robots.txt`, and `sitemap.xml`.

## Local workflow
- Run locally from repo root with a simple static server, for example:
  - `python3 -m http.server 8000`
  - or `npx serve .`
- Verify in browser:
  - navigation links and active page state;
  - mobile menu toggle behavior;
  - theme toggle behavior and persisted theme if implemented in JS;
  - hymn audio playback;
  - layout/responsiveness on `index.html`, `saltiniai.html`, and `kontaktai.html`;
  - SEO/support files still reference the correct production URLs.
- Prefer minimal, targeted edits in the currently referenced files under `assets/` and the three HTML pages.