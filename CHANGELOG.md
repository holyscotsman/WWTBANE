# Changelog

## Unreleased — first playable build

Added the whole first end-to-end game, hostable as static files on GitHub Pages.

- **Game core** (pure, headless-tested): seeded RNG, question schema/validator,
  Leitner mastery, lifelines (50:50 / Ask the Audience / Phone a Friend) with the
  integrity guarantees, coin economy with tier-boundary banking, seeded +
  mastery-driven selection with a double-buffered set manager, and the run state
  machine (permadeath, multi-answer all-or-nothing, impossible first final,
  prestige).
- **Browser shell**: persistent WebGL studio + green room (vendored Three.js),
  DOM quiz overlay, HUD money ladder, green room with a lifeline shop and Steve,
  original WebAudio cues, localStorage persistence, and the navigation wiring.
- **Accessibility**: keyboard + touch, colorblind-safe glyphs, reduced-motion,
  high-contrast, screen-reader announcements, no timers.
- **Content**: 157-question NCP-MCI bank across 12 domains, AI-drafted and
  independently AI-verified (offline ingestion QA), marked `verified` — pending
  human sign-off. 2 duplicate finals quarantined.
- **Tests**: 41 headless assertions with mandatory negative controls; a browser
  smoke test and a full-flow E2E (win + prestige, loss + green room, seeded).
- **Vendored**: Three.js r160 + addons and a self-hosted Montserrat subset — the
  site makes **no external requests**.
- **Docs**: `CLAUDE.md`, cinematic spec (incl. the §10 event contract), content
  QA report, and the state/flag/backlog/QA files.

### Fixes & polish
- Starting a run now clears the previous screen — the title/green-room menu no
  longer lingers behind the quiz card. Added an E2E regression guard.
- A win is tallied whether or not the player chooses to prestige afterwards
  (moved the counter out of `prestige`).
- Focus moves to the new screen's heading on navigation (keyboard / screen reader).
- Added a GitHub Actions workflow that runs the headless suite on every push and PR.

### Review follow-ups (from an automated PR review)
- Seeded runs are now reproducible through the impossible first final: the flag
  is passed to the seeded builder so Q30 is chosen with the seeded RNG, not
  `Math.random()`. Two first-time players on the same seed get the same final.
  (Mastery play keeps the non-deterministic swap.)
- A win now applies its prestige reset (coins + purchased slots) in `endRun`, so
  it can't be bypassed by leaving the win screen via "Back to title" — every exit
  starts a fresh climb. Mastery still persists.
