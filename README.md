# Vice Ledger — GTA VI Trophy Guide & Tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/RieryBuild/makefun-gta6-trophy-guide-01-v2/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/RieryBuild/makefun-gta6-trophy-guide-01-v2/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline guide and tracker for all 55 Grand Theft Auto VI trophies on
PlayStation 5 — built for the
[make.fun gta6-trophy-guide-01 bounty](https://make.fun/bounty/gta6-trophy-guide-01).
Static files under `app/`, no build step, no network at run time: serve the
folder and open it in a desktop browser with the network off.

## What it does

- **Checklist** — every trophy with its official name, description and grade,
  a checkbox that saves to localStorage, and a guide pane beside it with the
  key fact, the full guide, and every source it cites, dated.
- **Roadmap** — five phases in order (story, stranger strands, activities,
  collectibles, crime cleanup), showing all 55 trophies with their key facts.
- **Missables** — the 9 trophies that can pass you by, each with the reason
  and the save to keep.
- **Sources & Audit** — a 4-row source matrix plus a computed audit:
  55/55 names, 55/55 descriptions, grades 1P/2G/6S/46B, 121 dated citations,
  9 missable.
- **Filters** — kind (story / missable / collectibles / activities /
  strangers / crime / misc), grade, text search, hide-earned.
- **Spoiler-safe** — hides the name, description and grade of story
  trophies you have not earned yet, in every view.
- **Export / import / reset** — progress moves as a JSON file.
- **Paper and night themes**, coral and teal accents.

## Try it

```sh
node serve.ts        # serves app/ at http://127.0.0.1:8080/
```

Useful URL parameters: `?demo=1` seeds 13 earned trophies,
`?open=17` opens a trophy's guide, `?view=roadmap` shows the roadmap,
`?filter=missable` filters to missables, `?spoiler=1` turns spoiler-safe on.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
into the output directory and writes `dossier.json` with the kit's
`buildDossier`.

## Data notes

- Trophy names and descriptions are shown exactly as PlayStation publishes
  them, cross-checked across the two dated lists in the source matrix
  (Exophase and PSNProfiles, both 2026-11-18).
- Every guide is written in our own words for this entry and names its
  sources beside it. Counts (42, 14, 18, 52, 9, 8, 500 and the rest) are the
  totals PlayStation tracks in the lists we cite.
- Where a description leaves a place or a trigger unpinned, the guide says
  so plainly ("not yet verified in-game") instead of inventing one.

## Licence

MIT — see `LICENSE`. A fan-made guide, not affiliated with or endorsed by
Rockstar Games or PlayStation. No Rockstar logo, artwork, or game imagery
is used.
