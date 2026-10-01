# BRIEF: hassaneskikri.me, "the notebook"

**Self-authored under explicit creative delegation.** The owner asked to "make
it unique, modify it 100%" and pointed at his second brain and the existing
portfolio for facts. No interview was run. Every answer below is an authored
decision; facts come from his Jan 2026 CV, his PFE report (Lear Corporation,
2026), the chatbot knowledge base in `BackEnd/Data/intents.json`, and the old
`ProjectsData.js`. Nothing here is a quotation.

## The eight topics

1. **Vibe in five words.** Precise, honest, working, warm, Moroccan.
   References: a Jupyter notebook mid-analysis, a lab instrument's front panel,
   the zellige red of a Fès doorway.
2. **Journey.** Who he is → where he has worked → the one system that defines
   him (the Lear assistant) → everything else he has built, queryable → what he
   works with, counted → a way to reach him.
3. **Energy curve.** Calm open, steady middle, one intense held moment at the
   router, then calm, competent, quiet close.
4. **Feeling, stage by stage, and the one moment.** See the curve below. The
   moment: watching a plain-English question get routed to the right engine and
   answered with a number the page actually computed.
5. **What no site they have seen does.** It contains a small working copy of
   the system he built for his PFE. You can ask it things.
6. **Distance from premium-minimal.** Far. Aesthetic family: **dense**
   (information-forward, small type, tabular numerals) on a paper surface, not
   dark-with-one-accent.
7. **One world or scenes?** Neither. A live surface: one running notebook.
8. **Assets.** One headshot (`TitleImage.png`), certificate scans. No footage.
   No generation: the page's imagery is its own computed output. Stock project
   photos from the previous build are dropped.

## Grammar: live surface (uniqueness.md §2.3)

The honest pitch for an ML engineer is "watch what it does", so the page is the
product. Every output is computed in the browser from data arrays shipped with
the page (`src/data/*`). The query language is real (parsed and executed), the
router is real (scored features, two engines), the retrieval is real (BM25 over
in-page passages). The page says on its face that it runs locally on the
portfolio's own data.

Why the other seven lost:
- *Filmic one-shot*: no footage, and a film is the opposite of "inspect my work".
- *Chaptered editorial*: right for a manifesto; he is an engineer, the work should run.
- *Continuous world*: no real geography in the story.
- *Typographic poster*: his asset is systems, not a sentence.
- *Gallery/catalog*: close (39 projects), but the queryable cell gives the range
  without making the page a shop.
- *Split stage*: the router does have two branches, but only one act wants that.
- *Rhythmic cutlist*: wrong energy for a hiring audience.

## Signature move

**The router cell.** A miniature of his Lear "cognitive router": a typed
question is scored for intent, compiled either into the same query language the
projects cell uses (table engine, numbers computed) or sent to BM25 retrieval
over passages about him (document engine), and answered with provenance. The
scroll walks two demo questions through it (one per branch); then the visitor
types their own.

Supporting embodiment (one only): **execution counts record the visitor's own
path.** A cell gets `In [n]` in the order the visitor actually reached it, so the
sidebar ends the visit as a record of how they read the page.

## Journey

```
1  Recognition   an engineer's notebook already open on him
2  Credibility   four real roles, dated, in order
3  Turn          the Lear system, running, on this page
4  Range         39 projects, queryable
5  Substance     what he works with, counted from the projects
6  Commitment    a message cell with a cursor in it
```

## Feeling curve (curve first, devices second)

```
1  Curiosity     "this is a notebook, and it is about a person"     flow, static surface already in state
2  Trust         rows of real roles arrive as the cell executes     reveal (wipe per row)
3  Awe (PEAK)    a question is routed, scored, computed, answered   pin, span 3.2, bespoke --sc-p pipeline
4  Control       the visitor rewrites the query and the grid obeys  flow + in, editable query
5  Competence    counts tick up, derived from the projects above    count
6  Readiness     a field with a caret in it                         flow, real form
```

No two adjacent feelings repeat. Act 2 is deliberately quieter (plain rows)
so the peak has something to arrive from.

## The peak

> "I typed a question into his portfolio and it showed me how it decided which
> engine to use, then counted his projects for real."

Lives in act 3. It gets the largest span on the page (3.2 viewports, every
other act is unpinned and ≤ ~1.5), the only pin, and the silence of act 2.

## Tell-someone sentence

> It's the site where you ask his portfolio a question and watch it route
> itself, the same way the assistant he built for a car-parts factory does.

## Authored silence

None. The only pinned act carries a greet-state ground (the question field and
the empty pipeline diagram are visible before progress leaves 0).

## Close

Live-surface close is an actual input: `In [n]: send_message()`, a two-field
form (Formspree `xgvwdgbg`, unchanged) with the caret ready, plus his email,
LinkedIn and GitHub as plain lines. No magnetic button.

## Hard-rule notes

- No invented numbers. Every count on the page is computed from `src/data`.
- No em dashes in visible copy. No scroll cue. No section counters (the `In [n]`
  prompts are the visitor's own record, not a sequence the page imposes).
- Live-surface bans honoured: no `scrub`, `kinetic`, `spotlight`, no marketing bar.
- Dimensional hero: the surface is raised off a ruled ground with overlap
  (the sheet crosses the sidebar edge), edge light and two elevation steps.
  Photography is banned by the grammar beyond the headshot as cell output.

## Feel check (after verification)

Scrolled cold from the contact sheets (desktop 1440×900, phone 390×844,
reduced motion), one word per act, then diffed:

| Act | Intended | Felt | Change made |
|---|---|---|---|
| 1 profile | Curiosity | Curiosity | none |
| 2 experience | Trust | Calm, trust | none; quiet by design so the peak lands |
| 3 ask() | Awe (peak) | Awe on the count, then "dense" on the BM25 half | phone: answer was clipped under the status bar and two hits read `experience.lear` twice. Shortened the phone note, put suggestions on one scrolling row, labelled hits by passage |
| 4 projects | Control | Control | none |
| 5 stack | Competence | Competence | none |
| 6 contact | Readiness | Readiness | none |

Peak check: act 3 is the largest visual change on every sheet and owns
3.2 of 9.7 viewport-heights (desktop). The act before it is plain rows.
The end resolves on a form with a caret, the contact links and the colophon.

Harness: no dead scroll on desktop or phone. Reduced motion holds each demo
settled and declares that with `data-sc-verify-hold`, after which it also
reports no dead scroll.

Not verified: a real iPhone (Safari sticky + `svh` behaviour), and the
`/api/chat` fallback against the live Flask service (only its failure path
was exercised, against the static preview server).
