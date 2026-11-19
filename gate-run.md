# Gate run — Vice Ledger (gta6-trophy-guide-01 v2 rebuild, from scratch)

- Competition: gta6-trophy-guide-01 — "Build the best GTA 6 trophy guide"
- Entry: Vice Ledger, rebuild of v1 "Platinum Road" (submission 01a1f41d, rank #393/3,121, judge 865,311 — outside the top-50 prizelist)
- Repo: RieryBuild/makefun-gta6-trophy-guide-01-v2 (public, created 2026-11-19T18:55:58Z, after the 2026-11-19T11:00:00Z open)
- Local commit (code): d2768d46227761d7a84a7d24edd9f3e77255824a
- Recording: 01a1f5f0-9411-768f-9569-0edf95809a3b, started 2026-11-19T22:32:26Z (06:32:26 WITA), recorder PID 9030 — before this builder session began (~06:34 WITA)
- Builder session: fresh subagent session, started after the recording
- Deadline: 2026-11-21T11:00:00Z (21 Nov 19:00 WITA); results 6 Dec
- Pool: $250, top 50 paid (1st $50, 2nd $30, 3rd $15, 4–10 $5, 11–50 $3). No fee, no capital.

## Fresh-build discipline (the 422 lesson)

The previous rebuild (01a1f5e8) was refused 422 on thinking_reproduces
(41/1,090 lines authored, 3.7%) because its builder read the old v2 files
and re-typed them. This rebuild:

- NEVER read ~/workspace/makefun-work/gta6-trophy-guide-01-entry-v2/
  (old entry) or ~/workspace/makefun-work/gta6-trophy-guide-01-v2-ref/
  (reference), in any form.
- NEVER cloned or read file contents of RieryBuild/makefun-gta6-trophy-guide-01-v2.
  The remote tree was fetched only as paths + blob SHAs for the PAT push.
- NEVER read the kit starter's code files (main.ts, serve.ts, app.js,
  index.html, style.css, shots.json). Only RULES.txt, competition.yaml and
  kit.json were read, plus a targeted grep of buildDossier's exported
  signature in vendor/makefun-frontend.ts (option names only).
- The ONLY copies: vendor/makefun-frontend.ts and LICENSE from the kit
  starter (kit files, excluded from the counted lines).
- Every other file was composed fresh in this session from the brief's spec
  and the trophy data in the brief. The trophy data file uses a schema of
  this build's own design (id/name/grade/kind/phase/missable/desc/keyfact/
  guide/missableNote/sources[{site,date,covers}]); guides and key facts are
  reworded in this build's own words; only the official names and
  descriptions are byte-identical, as the gate requires.
- thinking_reproduces % is NOT measurable locally: the kit's `check`
  skips every transcript check ("the site runs it on the transcripts it
  builds from sealed recordings"). The defense is the process above, plus
  the fact that every counted line's exact text was first written by this
  session — except the 3 README badge URLs, which the brief required
  verbatim.

## MQ1 — Can this entry be submitted RIGHT NOW, end to end? PASS

1. Competition: gta6-trophy-guide-01 — entries close 2026-11-21T11:00:00Z
   (re-read fresh from GET /requirements at gate time, 2026-11-19T22:35Z).
2. Deliverables: LICENSE (MIT), main.ts (root), .makefun/owner.json
   (wallet 6do8), vendor/makefun-frontend.ts (kit copy, sha256-verified
   identical), app/ (index.html, style.css, app.js, data/trophies.json),
   screenshots/ (4 JPEGs), shots.json, serve.ts, README.md, gate-run.md —
   all present in the repo.
3. Checks: app_files (4 files, 91,670 bytes; index.html 5,969 bytes),
   references (grep https?:// in app/ = 0; no img/iframe/object/embed,
   no @import/url()), screenshots (4 × 1280×800 JPEG, each ≤256 KiB),
   dossier_matches (dossier 940,050 bytes < 1.5 MiB; text 92,421 bytes
   < 163,840; deterministic byte-identical across 2 runs), trophies
   (55/55 names + guides, descriptions byte-identical to the official
   list — verified by script against the kit starter's list).
4. Submit path: kit CLI submit, repo
   https://github.com/RieryBuild/makefun-gta6-trophy-guide-01-v2, commit =
   remote HEAD after the PAT push (recorded in the coordinator's report).
5. Cost: time ~10 min to seal + submit; capital $0.

## MQ2 — Does this entry clear the competition's bar? PASS (evidence)

- The bar is the top-50 prizelist. Live leaderboard re-read at gate time
  (2026-11-19T22:38Z): #1 swift-pika-45 "GTA VI Trophy Guide & Tracker"
  952,291; #2–#4 izayoi-20 "Boreal Corona", riidzhsn "Leonida Trophy
  Atlas", bassou "LEONIDA LEDGER…" all 948,437; all 12-0-0. This is a
  MARGIN contest, not a win contest — every top entry is undefeated, so
  the judge's margin per call is what separates ranks. Repos withheld
  (0 public), so the study is titles + scores + the house top-5 dossier
  (density per frame, map/progress screen as densest proof, one committed
  palette).
- No practice grade exists for this competition: the kit check states
  "there is no local grade of this competition, the server grades every
  entry." Evidence instead: feed-first study above + multi-model review
  (Gate 1) + the verified feature set (full audit strip in every view,
  spoiler-proofing DOM-verified at 0 leaks, 121 dated citations, all 55
  trophies in the roadmap with key facts).
- v1 stood at #393 (865,311), outside the prizelist — the rebuild has
  headroom to gain and nothing to lose.

## MQ3 — Is the submission window actually open for this account? PASS

- GET /quota re-checked at gate time (2026-11-19T22:47Z): can_submit true,
  day cap 3, taken 2, left 1; hard limit 20, left 18; entries_kept 1.
- Deadline 2026-11-21T11:00:00Z is ~36 hours ahead.

## MQ4 — Signed by the right identity, through the right route? PASS

- .makefun/owner.json names wallet 6do8 ONLY
  (6do8zGw4FPLCB1Cq44G8r8KwQccbhHUqtAptaRji6ALk).
- Repo pushed via the GitHub PAT route (custom.github-pat), per file,
  as new commits on top of the remote HEAD. No git push was used.

## MQ5 — A deliberate new submission, not a duplicate? PASS

- Rebuild under §4, Force_Last supersede of 01a1f41d — intended; the
  standing entry ranked #393, outside the prizelist.
- rebuild_triggered_for=01a1f41d recorded; this is the first (only)
  rebuild trigger for that submission.
- Not a duplicate: a from-scratch snapshot — every file rewritten in
  this session under a new recording. Snapshot differs from every
  earlier entry.

## MQ6 — Can you prove the entry works? PASS

- Data verification script (/tmp/verify-data.cjs, 15 checks): 55
  trophies, grades 1P/2G/6S/46B, unique names/ids, 9 missable,
  121 sources all dated, every trophy ≥2 sources, keyfacts all ≥40
  chars, guides all ≥253 chars, missable notes present, all names in
  the official list, descriptions byte-identical, grades matching —
  ALL PASS.
- DOM verification (headless Chromium, puppeteer): spoiler-on with no
  demo = 0 occurrences of any of the 12 story trophy names; demo 13/55
  progress; audit strip present; 55 checklist rows; roadmap 55 items;
  shot-4 view shows Hot Together with #7 masked ("Hidden story trophy
  #7", grade "—"); sources tab (5 matrix rows, 9 audit rows, 121
  citations); missables tab (9 cards with save notes); theme toggle
  works; checkbox toggles progress 13→14; search narrows to 1 row;
  keyboard Enter opens a guide.
- Screenshots: all 4 viewed by the builder (cover, guide, roadmap,
  spoiler) — readable, dense, no blank renders.
- Determinism: main.ts run twice (node22) to different directories,
  diff -r clean — verified twice (before and after the sorted-copy
  change). Dossier 940,050 bytes.
- Kit check local: 4 passed, 0 failed, 17 skipped (transcript checks
  are server-side), 5 checked at submission.

## MQ7 — Is this entry on the never-submit list? PASS (no match)

- No code-drawn images (screenshots are real browser renders).
- main.ts is Node 22 stdlib only.
- Recording started before the first build action.
- In-session revisions exist (main.ts written + 4 edits; app.js written
  + 11 edits; style.css, index.html, serve.ts revised; screenshots
  re-shot twice).
- Wallet 6do8 only; PAT route only; no claim codes anywhere; no
  secrets in the repo (grep clean except the kit vendor file's HTML
  "tokenizer" wording); can_submit true; $0 capital; not a duplicate.
- Reza visual audit: PENDING — this build STOPS at the audit point
  (Gate 3 held, not claimed).

## MQ8 — Session check PASS

1. Session: builder subagent session 46e724e6 (fresh), recording
   01a1f5f0-9411-768f-9569-0edf95809a3b.
2. Recording start: 2026-11-19T22:32:26Z (06:32:26 WITA).
3. First action: directory setup + kit-file copies ~06:36 WITA; first
   file write (trophies.json) ~06:38 WITA — both AFTER the recording
   started.
4. Coverage: the recording ran for the whole session, start to finish;
   the recorder was never touched, stopped or restarted.
5. In-session revision: yes (see MQ7).

## Gate 0 — Reality PASS

- Repo exists at one public commit; the remote HEAD SHA after the PAT
  push is recorded in the coordinator's report.
- Every deliverable from /requirements is in the repo (checked, MQ1).
- Entry passes its own tests on this commit (MQ6).
- Evidence captured: quota response, recording timestamps, kit check,
  determinism diffs, screenshot hashes (below).

## Gate 1 — Quality PASS

- Multi-model review done via OpenRouter (custom.openrouter), model
  nvidia/nemotron-3-ultra-550b-a55b:free (re-checked GET /models first;
  13 :free models listed, this one still available). Two calls, cost $0:
  - Call 1 (app/app.js, 5,333 prompt / 10,730 completion tokens):
    5 findings — keyboard access for rows/cards, ARIA state for tabs/
    chips, unhandled fetch failure, unhandled FileReader error,
    spoiler=0 ignored. ALL 5 FIXED in-session (tabindex + role +
    keydown handler; aria-selected/aria-pressed; boot try/catch with
    an in-page error; reader.onerror; explicit spoiler param handling).
    No spoiler leaks and no logic errors found in the core flows.
  - Call 2 (main.ts + serve.ts + index.html, 2,909 prompt / 6,122
    completion tokens): 3 findings — serve.ts path-containment check
    allowed a sibling prefix (fixed: APP_ROOT + separator check) and
    double-decoded the pathname (fixed: no decodeURIComponent);
    main.ts cpSync order as a theoretical determinism risk (fixed:
    sorted recursive copy; determinism re-verified byte-identical).
    index.html: NONE FOUND.
- Gemini text/copy review: SKIPPED — gemini-3.8-flash generateContent
  still returns HTTP 503 at gate time. Recorded gap, NOT a Gate 1 FAIL
  per the house rule.
- No practice grade exists for this competition (see MQ2); the entry
  is judged against the prizelist bar via the live top-5 study.
- Feed-first study done for this rebuild (MQ2): the entry is
  demonstrably stronger than v1 (audit strip, spoiler-proofing,
  roadmap with all 55 key facts, 121 dated citations, denser cover).

## Gate 2 — Dedup PASS

- Not a duplicate of the standing entry (MQ5) — Force_Last intended.
- Rebuild-once rule respected (§4): single trigger for 01a1f41d.
- Quota re-checked at gate time (MQ3).

## Gate 3 — Submission quality HELD (audit point — do not submit yet)

- README matches the requirements template (3 LIVE make.fun badge URLs,
  verified format — no shields.io).
- Entry message + signature use wallet 6do8 only; repo via PAT route.
- No claim codes anywhere; no secrets in the repo.
- Deadline still ahead at gate time.
- REZA VISUAL AUDIT: PENDING. The build stops here. The 4 screenshots
  go to Reza in the Make.fun chat; the 1-hour auto-Gas clock (rule
  amended 2026-11-19) governs the wait. Seal + submit run only after
  his Gas (or an hour of silence).

## Self-critique loop (house rule)

- Cycle 1 — 3 weaknesses found and fixed: (a) duplicate PLATINUM pill
  on the platinum row (grade + kind both "Platinum") — kind labels now
  read Goal/Completion for those two; (b) review findings (Gate 1,
  8 items) — all fixed; (c) checklist rows slightly tall — padding
  tightened (9px → 7px, gap 6px → 5px).
- Cycle 2 — no material weakness found. Two notes, neither a defect:
  (a) the Sources & Audit and Missables tabs have no screenshot of
  their own — the 4-shot list is fixed by the brief, and both tabs'
  content is evidenced in the checklist shots (dated sources in the
  guide pane, missable filter + missable note in shot 4); (b) the demo
  set earns 13 bronzes and no silver/gold — honest story progress,
  kept as specified. Loop ends.

## Screenshots (final, re-shot after all edits)

- 1-cover.jpg — 1280×800, 138,161 bytes,
  sha256 bffaddd56b3221ed39584112008f3d6f28b2fffd0ccdbd59c24b51cad3bc277e
  (/?demo=1&open=17, The Shootist)
- 2-guide.jpg — 1280×800, 139,393 bytes,
  sha256 1f0b7f5f0d89605098b1b8b2bddbd3a9ed0343d286458f6bb5c6c01470b04b49
  (/?demo=1&open=40, Maximum Withdrawal)
- 3-roadmap.jpg — 1280×800, 198,080 bytes,
  sha256 2f7ab138e3a497d25fd5e1bf2e87a4761b1c17686d6758e0128951793c022d5c
  (/?demo=1&view=roadmap)
- 4-spoiler.jpg — 1280×800, 155,579 bytes,
  sha256 25c3bcf8eea9a49d470b70623ead74335b3d3ad217530b182c2f96ed1c4b49b1
  (/?demo=1&filter=missable&spoiler=1&open=33, Hot Together)

## Kit check local (2026-11-19T22:41:33Z)

4 passed, 0 failed, 17 skipped, 5 checked at submission.
"ok: every check run here passes; the rest are the site's at submission."
thinking_reproduces is skipped locally by design (server-side only) —
see the fresh-build discipline section above.

## Verdict

MQ1–MQ8 PASS. Gates 0–2 PASS. Gate 3 HELD for Reza's visual audit.
STOP at the audit point: no seal, no bundle, no submit. Recorder alive.
