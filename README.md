# hassaneskikri.me

My portfolio, rebuilt as a live notebook. Every output on the page is computed
in the browser from the data in `FrontEnd/src/data/`:

- **`ask()`** is a small working copy of the router I built for my final-year
  project at Lear Corporation. A question is scored for intent, then either
  compiled into the projects query language and counted (table engine) or
  answered by BM25 retrieval over short passages about me (document engine).
  No language model runs in the page. Questions neither engine can answer fall
  back to the Flask chatbot in `BackEnd/` when the site is served by it.
- **`projects`** is an editable query cell:
  `projects.where(domain="vision").sort("featured").limit(6)`.
- **`stack_counts()`** counts tools and domains from the project rows instead of
  self-rating skills.
- Execution counts (`In [n]`) record the order each visitor reached the cells.

## Updating content

| What | Where |
|---|---|
| Projects (counts and charts update automatically) | `FrontEnd/src/data/projects.js` |
| Experience, education, credentials, languages | `FrontEnd/src/data/profile.js` |
| What the `ask()` document engine can retrieve | `passages` in `FrontEnd/src/data/profile.js` |

## Run

```bash
cd FrontEnd
npm install
npm run dev      # local development
npm run build    # production build in FrontEnd/dist
```

The Docker image builds the front end and serves it, with the chatbot API, from
Flask on port 8000. For Firebase hosting, see the steps below.

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase deploy
```

## Design

Built with two design skills:
[scroll-craft](https://github.com/nateherkai/scroll-craft) (page grammar,
scroll engine in `FrontEnd/src/engine/`, verification harness) and
[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
(typography pairing and the accessibility checklist). The design brief,
feeling curve and verification notes are in
`scrollcraft/builds/notebook/BRIEF.md`.
