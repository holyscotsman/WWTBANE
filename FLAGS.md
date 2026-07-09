# FLAGS.md — blockers & questions for the human

Things the autonomous loop **cannot** decide. Nothing here blocks a playable
ship, but each wants a human before it's "done" per `CLAUDE.md`.

## 1. Question bank — final human review (content integrity)
- **What:** the 157 shipped questions in `src/content/questions.js` and the
  Steve / Phone-a-Friend clues were **AI-drafted and independently AI-verified**
  as the §4-sanctioned offline ingestion QA, then marked `reviewStatus:"verified"`.
- **Why flagged:** `CLAUDE.md §4/§7` require answer keys and teaching dialogue to
  be **human-authored or human-reviewed** before they truly ship.
- **Ask:** a human spot-checks the bank against current Nutanix docs and signs
  off (or edits). See `docs/CONTENT_QA_REPORT.md` for the pipeline outcome and a
  checklist. Quarantined duplicates are in `src/content/quarantine.js`.
- **Note:** this only concerns *content quality*. The **runtime never uses AI to
  grade** — correctness is decided solely by the stored authored key.

## 2. Host dialogue — intro cinematic (authored content)
- **What:** the first-run cinematic (`src/shell/ui/cinematic.js`) contains host
  dialogue: the studio tour lines and the guided tutorial that walks the player
  through the UI and reveals the first question's answer.
- **Why flagged:** `CLAUDE.md §7` reserves host dialogue for a human. These
  lines were AI-drafted at the owner's explicit request ("the host explains how
  to play") — they are game-mechanics narration, not exam teaching — but still
  warrant a human read-through for voice and tone.
- **Integrity note:** the tutorial's revealed answer marks Q1 as assisted, so
  the freebie never promotes mastery.

## 3. Palette identity (inherited, unconfirmed)
- The Iris/Aqua/Mantis/Peach/Gold palette is inherited from StarNix and used
  throughout. `CLAUDE.md §6/§8` flag it for confirmation: keep it, or define
  WWTBANE's own identity?

## 3. Studio visual sign-off
- The WebGL studio is **code-complete, visual-pending**. It passes structural
  and interaction tests but needs a human's eyes. Tracked in `BROWSER_QA.md`.

## 4. Exam version scope
- Content targets **AOS 6.x / Prism / AHV** (broad NCP-MCI). If you want to pin a
  specific exam blueprint version, say which and the bank can be curated to it.

## Resolved
- _none yet._
