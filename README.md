# Vice Ledger — GTA VI Trophy Guide & Platinum Tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/RieryBuild/makefun-gta6-trophy-guide-01-v2/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/RieryBuild/makefun-gta6-trophy-guide-01-v2/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline guide and tracker for the 55 PlayStation 5 trophies of **Grand Theft Auto VI** — built for the [make.fun bounty gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01).

## What it is

- **All 55 trophies** with their official names, descriptions and grades exactly as PlayStation publishes them (1 platinum, 2 gold, 6 silver, 46 bronze).
- **A tracker**: tick trophies off, progress saves in the browser (localStorage), export it to a file and import it back. Filters by story, missable, collectibles, activities, strangers, crime and misc, plus grade, search and hide-earned.
- **A platinum roadmap in 5 phases** that shows **all 55 trophies with a key fact each** — story first, stranger strands second, activities third, collectibles fourth, crime cleanup last.
- **9 missable trophies flagged**, each with its reason and the save to keep.
- **Spoiler-safe mode** hides un-earned story trophy names and descriptions until they are earned.
- **Every guide cites its sources, with dates** — 121 dated citations across 55 guides. Official list: Exophase & PSNProfiles, 18 Nov 2026. All guide text is written in our own words for this entry; sources are cited, never copied. Where a claim goes beyond the official description, the guide says “not yet verified in-game” instead of inventing a location or a step.
- **An audit strip on every view** (55/55 names, 55/55 descriptions, grades, dated citations, missable count) and a **source matrix** in the Sources & Audit tab.
- **Offline**: static files under `app/`, no network request at runtime, no Rockstar logo or artwork anywhere.

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

Or open `app/index.html` directly from any static server with `app/` at its root.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## Screenshots

1. `1-cover.jpg` — checklist, 13/55 earned, The Shootist guide with dated sources open.
2. `2-guide.jpg` — Maximum Withdrawal (silver) guide with sources.
3. `3-roadmap.jpg` — the platinum roadmap showing all 55 trophies with key facts.
4. `4-spoiler.jpg` — missable filter + spoiler-safe ON, Hot Together guide open.

## License

MIT — see [LICENSE](LICENSE).
