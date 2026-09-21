# The Linux Kernel — An Animated Timeline

A fullscreen, horizontally scrolling, interactive timeline of the Linux kernel:
70 moments from the 1991 Usenet post to the 7.x era (7.3 in -rc, 7.4 queuing),
told across 8 color-coded eras on a calm, editorial, paper-light canvas with a
PS3-XMB-style ambient background (out-of-focus bokeh and slow light ribbons).

## Run

Two ways:

1. **Double-click `linux-timeline.html`** — a fully self-contained build (all CSS,
   JS and fonts inlined). Works in every browser, including ones with strict
   local-file security policies that refuse external fonts over `file://`.
2. **Serve the folder** (canonical sources):
   ```
   npx serve .          # or: python3 -m http.server
   ```
   then open `index.html`.

Rebuild the standalone file after editing any source:

```
node build.js
```

## Controls

| Input | Action |
|---|---|
| Mouse wheel / trackpad | Glide horizontally (smoothed) |
| Drag (mouse) | Pan freely |
| Touch | Native swipe |
| `←` `→` | Step by screens |
| `PageUp` `PageDown` | Full-screen jumps |
| `Home` / `End` | 1991 / today |
| Click a card | Detail drawer: highlights, a researched essay, further-reading links (`Esc` to close) |
| Bottom scrubber | Drag to any point in 35 years |

Ambient animation respects `prefers-reduced-motion` and pauses in hidden tabs.

## Files

- `index.html` — shell (hero, timeline stage, scrubber, drawer)
- `styles.css` — clean & light editorial theme
- `data.js` — 70 milestones + 8 eras (dates, summaries, highlight facts,
  further-reading essays of 3–4 paragraphs each, external links)
- `app.js` — layout engine (greedy side/tier placement + overlap refinement),
  scroll wiring, reveal animations, ambient canvas, debug API
- `verify.js` — Puppeteer (system Chrome) screenshot + layout assertion suite
- `build.js` — generates the self-contained `linux-timeline.html`
- `fonts/` — locally bundled Fraunces / Inter / JetBrains Mono

## Verify

```
npm install
npm run verify      # writes screenshots to shots/, prints layout checks
```

Checks include: same-tier and cross-tier card overlaps, viewport clipping,
era-label collisions, card widths, keyboard navigation, real mouse-click →
drawer open, plus a reduced-motion and a 1366×768 pass.
