# Cinematic takes — the camera script

The WebGL studio's camera is driven by a **director** (`src/shell/director.js`)
playing **scenes** — playlists of timed **takes** — defined in
`src/shell/takes.js`. Looping scenes are ambient background footage; game
events cut to one-shot scenes, which then **return** to the interrupted
background or **advance** to a named next scene.

Edit `src/shell/takes.js` to retime or re-frame anything — it's pure data with
the stage geography documented at the top.

Legend: ✅ = specced by the owner (implemented verbatim) · ✏️ = drafted by
Claude, awaiting take-by-take direction.

## Scenes

### ✅ Intro cinematic — `intro` (loops · title screen)
| # | Take | Duration |
|---|---|---|
| 1 | Slow orbital rotation around the soundstage, hot seat centered (full 360°, seamless loop) | 10s |

### ✅ Host asks the question — `hostAsks` (start of each tier + the final → cuts to Player is thinking)
| # | Take | Duration |
|---|---|---|
| 1 | Host in his chair, leaning to camera as it slowly zooms in | 4s |

### ✅ Player is thinking — `thinking` (loops · the in-question background)
| # | Take | Duration |
|---|---|---|
| 1 | Focus on the contestant | 5s |
| 2 | Both contestant and host | 5s |
| 3 | Pan left → right across the audience | 3s |
| 4 | Above host + contestant, slowly tilting down onto them | 3s |
| 5 | Piggy bank, dramatic slow zoom | 4s |
| 6 | The other side of the audience, watching the contestant | 5s |
| 7 | Wideshot — host/contestant centered, whole room visible | **5s*** |
| 8 | Slow zoom on the intensity of the contestant | 3s |
| 9 | Slow zoom on the intensity of the host | 3s |
| 10 | Slow orbital pan around the soundstage | 5s |

\* take 7 had no duration in the brief — set to 5s, confirm or adjust.

### ✏️ "Is that your final answer?" — `finalAnswer` (on lock-in; holds till the reveal)
| # | Take | Duration |
|---|---|---|
| 1 | Tight push-in on the host, freezing on the last frame through the suspense | 4s + hold |

### ✏️ Question is correct — `correct` (→ returns to thinking)
| # | Take | Duration |
|---|---|---|
| 1 | Relief pull-back off the contestant | 2.5s |
| 2 | Quick celebratory sweep across the audience | 2.5s |

### ✏️ Question is incorrect — `incorrect`
| # | Take | Duration |
|---|---|---|
| 1 | Slow retreat away from the contestant | 3s |
| 2 | Overhead, looking down on the dimmed stage | 3s |

### ✏️ Host explains the next part — `hostExplains` (when coins bank at a tier boundary)
| # | Take | Duration |
|---|---|---|
| 1 | Gentle arc around the two-shot while he talks | 4s |

### ✏️ Final question correct — `finalCorrect` (the win; last take loops)
| # | Take | Duration |
|---|---|---|
| 1 | Fast orbit around the contestant | 3s |
| 2 | Wide push on the celebrating stage | 4s |
| 3 | Long celebration orbit (repeats until you leave) | 8s loop |

### ✏️ The green room — `greenRoom` (loops · between-runs background)
| # | Take | Duration |
|---|---|---|
| 1 | Wide lounge, slow push | 6s |
| 2 | Lazy pan across the sofa (and the bored contestant) | 5s |
| 3 | Close on the phone waiting on the coffee table | 4s |

### ✏️ 50:50 — `fifty` (→ returns)
| # | Take | Duration |
|---|---|---|
| 1 | Overhead on the console, tilting down as two screens go dark | 3s |

### ✏️ Phone a friend — `phoneFriend` (→ returns)
| # | Take | Duration |
|---|---|---|
| 1 | Tight on the host as the call goes out | 4s |

### ✏️ Ask the audience — `audiencePoll` (→ returns)
| # | Take | Duration |
|---|---|---|
| 1 | Sweep across the voting audience | 3s |
| 2 | The crowd from the stage | 3s |

### ✏️ Sketchy guy phone call — `sketchyCall` (green room, on calling Steve → returns)
| # | Take | Duration |
|---|---|---|
| 1 | The phone on the coffee table, slow zoom | 3s |
| 2 | The sketchy guy loitering by the doors — long coat, wide-brim hat | 4s |

### ✏️ Producer says they're ready — `producerReady` (new game starts → host asks)
| # | Take | Duration |
|---|---|---|
| 1 | The stage manager in the wings — headset, clipboard | 3s |
| 2 | Sweep from the wings onto the stage | 2.5s |

## Trigger map (director cue sheet)

| Game event | Camera |
|---|---|
| Title screen | `intro` loop |
| New game starts (`run:start`) | `producerReady` → `hostAsks` → `thinking` |
| Question shown (tier start: Q1/Q11/Q21/final) | `hostAsks` → `thinking` |
| Question shown (otherwise) | `thinking` (restarts the playlist) |
| Final answer locked | `finalAnswer` (holds until the reveal) |
| Correct | `correct` → background |
| Wrong | `incorrect` → background |
| Coins bank | `hostExplains` queued after `correct` |
| Win | `finalCorrect` (tail loops) |
| 50:50 / audience / phone | `fifty` / `audiencePoll` / `phoneFriend` → background |
| Steve called (green room) | `sketchyCall` → `greenRoom` |
| Enter green room | `greenRoom` loop |

## Notes

- **New set pieces** built for these takes: the gold **piggy bank** on a lit
  pedestal at stage right, the **stage manager** (headset + clipboard) in the
  wings, and the **sketchy guy** (long coat, wide-brim hat) by the green-room
  doors. All original art drawn in code.
- **Reduced motion:** every take becomes a locked-off cut (held at its mid
  pose) for its duration — no orbits, pans, or zooms.
- The CSS backdrop (no-WebGL fallback) keeps its own simpler mood/camera-push
  language; these takes are the WebGL studio's.
