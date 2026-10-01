import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Github, Lock } from "lucide-react";
import { DOMAINS } from "../data/projects.js";
import { parse, run, QueryError } from "../lib/query.js";
import { highlight } from "../lib/highlight.jsx";

export const DEFAULT_QUERY = 'projects.sort("featured")';
const PREVIEW = 10;

const PRESETS = [
  ["everything", DEFAULT_QUERY],
  ["company work", 'projects.where(kind="work")'],
  ...Object.entries(DOMAINS).map(([k, label]) => [label.toLowerCase(), `projects.where(domain="${k}").sort("featured")`]),
];

const KIND = { work: "company", personal: "personal", competition: "competition", learning: "learning" };

function execute(src) {
  const t0 = performance.now();
  try {
    const res = run(parse(src));
    return { ...res, ms: performance.now() - t0 };
  } catch (e) {
    if (e instanceof QueryError) return { error: e.message };
    throw e;
  }
}

export function Projects({ n, query, setQuery }) {
  const [draft, setDraft] = useState(query);
  const [all, setAll] = useState(false);
  const out = useMemo(() => execute(query), [query]);
  const inputRef = useRef(null);

  // A query arriving from elsewhere (the router) replaces the draft.
  useEffect(() => {
    setDraft(query);
    setAll(false);
  }, [query]);

  // Output height changes move every act below; let the engine re-measure.
  useEffect(() => {
    dispatchEvent(new Event("resize"));
  }, [out, all]);

  const runDraft = () => setQuery(draft.trim() || DEFAULT_QUERY);
  const rows = out.rows ? (all ? out.rows : out.rows.slice(0, PREVIEW)) : [];

  return (
    <section id="projects" data-cell="projects" data-sc-act="flow" className="block" aria-labelledby="projects-title">
      <h2 id="projects-title" className="md__h2">Everything I have built</h2>
      <p className="md__p">
        This cell is live. Pick a filter, or edit the query and press Run. Methods: <code>{"where(field=…)"}</code>, <code>{'search("…")'}</code>,{" "}
        <code>{'sort("featured" | "year" | "title")'}</code>, <code>limit(n)</code>, <code>count()</code>.
      </p>
      <div className="chips" role="group" aria-label="Filter presets">
        {PRESETS.map(([label, q]) => (
          <button key={label} type="button" className={`chip ${query === q ? "is-on" : ""}`} aria-pressed={query === q} onClick={() => setQuery(q)}>
            {label}
          </button>
        ))}
      </div>

      <div className={`cell ${n ? "is-run" : ""}`}>
        <form
          className="cell__in"
          onSubmit={(e) => {
            e.preventDefault();
            runDraft();
          }}
        >
          <span className="prompt" aria-hidden="true">In [{n || " "}]</span>
          <div className="cell__src query">
            <label className="sr-only" htmlFor="query-input">Projects query</label>
            <div className="query__wrap">
              <code className="query__mirror" aria-hidden="true">
                {highlight(draft)}
                {"​"}
              </code>
              <textarea
                id="query-input"
                ref={inputRef}
                className="query__input"
                value={draft}
                rows={1}
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setDraft(e.target.value.replace(/\n/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    runDraft();
                  }
                }}
              />
            </div>
            <button className="btn btn--run" type="submit">
              Run <CornerDownLeft size={14} aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="cell__out">
          <span className="prompt prompt--out" aria-hidden="true">{n ? `Out[${n}]` : ""}</span>
          <div className="cell__body" aria-live="polite">
            {out.error ? (
              <p className="err">
                <span>QueryError:</span> {out.error}
              </p>
            ) : out.count != null ? (
              <p className="count-out">
                <span className="num">{out.count}</span>
                <span className="meta">rows matched in {out.ms.toFixed(2)} ms</span>
              </p>
            ) : (
              <>
                <p className="meta">
                  {out.rows.length} row{out.rows.length === 1 ? "" : "s"} in {out.ms.toFixed(2)} ms
                </p>
                {out.rows.length > 0 && (
                  <div className="df" role="table" aria-label="Projects">
                    <div className="df__head" role="row">
                      <span role="columnheader">project</span>
                      <span role="columnheader">domains</span>
                      <span role="columnheader">stack</span>
                      <span role="columnheader">code</span>
                    </div>
                    {rows.map((p) => (
                      <article key={p.id} className={`df__row ${p.featured ? "is-featured" : ""}`} role="row">
                        <div role="cell" className="df__title">
                          <h3>{p.title}</h3>
                          <p className="df__meta">
                            {KIND[p.kind]}
                            {p.org ? ` · ${p.org}` : ""}
                            {p.year ? ` · ${p.year}` : ""}
                          </p>
                          <p className="df__sum">{p.summary}</p>
                        </div>
                        <div role="cell" className="df__tags">
                          {p.domains.map((d) => (
                            <button key={d} type="button" className="tag" onClick={() => setQuery(`projects.where(domain="${d}").sort("featured")`)}>
                              {DOMAINS[d]}
                            </button>
                          ))}
                        </div>
                        <div role="cell" className="df__stack">{p.stack.join(" · ")}</div>
                        <div role="cell" className="df__link">
                          {p.repo ? (
                            <a href={p.repo} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}>
                              <Github size={16} aria-hidden="true" />
                              <span>repo</span>
                            </a>
                          ) : (
                            <span className="private" title="Company work or not published">
                              <Lock size={14} aria-hidden="true" />
                              <span>private</span>
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                {out.rows.length > PREVIEW && (
                  <button type="button" className="link-btn more" onClick={() => setAll((v) => !v)}>
                    {all ? "show first 10 rows" : `… ${out.rows.length - PREVIEW} more rows, show all`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
