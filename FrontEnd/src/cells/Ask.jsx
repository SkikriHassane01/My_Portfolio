import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, RotateCcw, SquareArrowOutUpRight } from "lucide-react";
import { askBackend, route } from "../lib/router.js";
import { highlight } from "../lib/highlight.jsx";

// The peak. Scroll walks two demo questions through a working router, one per
// engine. Typing a question takes over the stage and answers it live.

const DEMOS = [
  "How many computer vision projects has he built?",
  "Why did he route questions at Lear instead of asking the LLM?",
];
const SUGGEST = ["Which projects use YOLOv8?", "Where did he study?", "How many internships?", "What languages does he speak?"];

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const reduceMotion = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reads the engine's published --sc-p for this act, only while it is near view.
function useActProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let live = false;
    let last = -1;
    const tick = () => {
      const v = parseFloat(el.style.getPropertyValue("--sc-p")) || 0;
      const q = Math.round(v * 400) / 400;
      if (q !== last) {
        last = q;
        setP(q);
      }
      if (live) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (live) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ref]);
  return p;
}

export function Ask({ n, onOpenQuery, setBusy }) {
  const actRef = useRef(null);
  const p = useActProgress(actRef);
  const [draft, setDraft] = useState("");
  const [live, setLive] = useState(null); // { result, backend, pending }

  const demo = p < 0.5 ? 0 : 1;
  const demoResults = useMemo(() => DEMOS.map(route), []);

  const reduced = reduceMotion();
  let t = demo === 0 ? clamp01(p / 0.46) : clamp01((p - 0.52) / 0.38);
  // Reduced motion: each demo appears settled rather than animating through.
  if (reduced) t = t > 0.08 ? 1 : 0;
  if (live) t = 1;

  const r = live ? live.result : demoResults[demo];
  const phase = t < 0.12 ? 0 : t < 0.42 ? 1 : t < 0.48 ? 2 : t < 0.76 ? 3 : 4;

  const submit = async (q) => {
    const question = (q ?? draft).trim();
    if (!question) return;
    setDraft(question);
    const result = route(question);
    if (result.engine !== "none") {
      setLive({ result });
      return;
    }
    setLive({ result, pending: true });
    setBusy(true);
    const reply = await askBackend(question);
    setBusy(false);
    setLive({ result, backend: reply, pending: false });
  };

  const reset = () => {
    setLive(null);
    setDraft("");
  };

  const shownQuestion = live ? live.result.question : DEMOS[demo];
  const maxScore = Math.max(r.scores.table, r.scores.docs, 1);
  const routerT = clamp01((t - 0.12) / 0.28);
  const featuresShown = Math.ceil(r.features.length * routerT);
  const engineT = clamp01((t - 0.48) / 0.24);
  const chosen = phase >= 2 ? r.engine : null;

  return (
    <section id="ask" data-cell="ask" data-sc-act="pin" data-sc-span="3.2" ref={actRef} className="ask" aria-labelledby="ask-title">
      <div data-sc-stage className="ask__stage" data-sc-verify-state={`${live ? "live" : demo}:${phase}:${Math.round(t * 20)}`}
        data-sc-verify-hold={reduced || live ? "true" : undefined}>
        <div className="ask__inner">
          <header className="ask__head">
            <h2 id="ask-title" className="md__h2">Ask the notebook</h2>
            <p className="ask__note ask__note--short">A working copy of the router I built at Lear. No language model runs here.</p>
            <p className="ask__note ask__note--long">
              A small working copy of the router I built for Lear Corporation.  Counting questions are computed from the project table; everything else is retrieved from notes about me. No language model runs here.
            </p>
          </header>

          <div className={`cell ${n ? "is-run" : ""} ask__cell`}>
            <form
              className="cell__in ask__in"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <span className="prompt" aria-hidden="true">In [{n || " "}]</span>
              <div className="cell__src ask__field">
                <code className="ask__call" aria-hidden="true">
                  <span className="tk-fn">ask</span>(
                </code>
                <label className="sr-only" htmlFor="ask-input">Ask a question about Hassane</label>
                <input
                  id="ask-input"
                  className="ask__input"
                  value={draft}
                  placeholder={DEMOS[demo]}
                  onChange={(e) => setDraft(e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                  maxLength={160}
                />
                <code aria-hidden="true">)</code>
                <button className="btn btn--run" type="submit" disabled={!draft.trim() || live?.pending}>
                  Run <CornerDownLeft size={14} aria-hidden="true" />
                </button>
              </div>
            </form>
            <div className="ask__suggest" aria-label="Example questions">
              {SUGGEST.map((s) => (
                <button key={s} type="button" className="chip" onClick={() => submit(s)}>
                  {s}
                </button>
              ))}
              {live && (
                <button type="button" className="chip chip--ghost" onClick={reset}>
                  <RotateCcw size={12} aria-hidden="true" /> back to the demo
                </button>
              )}
            </div>
          </div>

          <div className="pipe" data-phase={phase} data-engine={chosen || ""} aria-live="polite">
            <div className="pipe__q" key={shownQuestion}>
              <span className="pipe__label">question</span>
              <p>{shownQuestion}</p>
            </div>

            <div className="pipe__node pipe__router">
              <span className="pipe__label">router</span>
              <div className="scores">
                {["table", "docs"].map((k) => (
                  <div key={k} className={`score score--${k} ${chosen === k ? "is-win" : ""}`}>
                    <span className="score__name">{k === "table" ? "table engine" : "document engine"}</span>
                    <span className="score__bar">
                      <span style={{ transform: `scaleX(${(r.scores[k] / maxScore) * routerT})` }} />
                    </span>
                    <span className="score__val">{(r.scores[k] * routerT).toFixed(1)}</span>
                  </div>
                ))}
              </div>
              <ul className="features">
                {r.features.slice(0, 5).map((f, i) => (
                  <li key={f.term + i} className={i < featuresShown ? "is-on" : ""}>
                    <code>{`"${f.term}"`}</code>
                    <span>{f.engine}</span>
                    <span className="num">+{f.w}</span>
                  </li>
                ))}
                {!r.features.length && <li className="is-on features__none">no cues: falling through to retrieval</li>}
              </ul>
            </div>

            <div className={`pipe__node pipe__engine ${chosen === "table" ? "is-on" : chosen ? "is-off" : ""}`}>
              <span className="pipe__label">table engine</span>
              {r.engine === "table" ? (
                <>
                  <code className="pipe__code">{highlight(r.source)}</code>
                  <p className="pipe__result">
                    {r.result.count != null ? (
                      <>
                        <span className="num big">{Math.round(r.result.count * engineT)}</span> rows
                      </>
                    ) : (
                      <span className="num">{Math.round(r.result.rows.length * engineT)} rows</span>
                    )}
                  </p>
                  {onOpenQuery && (
                    <button type="button" className="link-btn" onClick={() => onOpenQuery(r.source)}>
                      open in the projects cell <SquareArrowOutUpRight size={12} aria-hidden="true" />
                    </button>
                  )}
                </>
              ) : (
                <p className="pipe__idle">not used for this question</p>
              )}
            </div>

            <div className={`pipe__node pipe__engine ${chosen === "docs" || chosen === "none" ? "is-on" : chosen ? "is-off" : ""}`}>
              <span className="pipe__label">document engine · BM25</span>
              {r.hits ? (
                <ol className="hits">
                  {r.hits.map((h) => (
                    <li key={h.id}>
                      <code title={h.source}>{h.source.split(".")[0]}/{h.id}</code>
                      <span className="score__bar">
                        <span style={{ transform: `scaleX(${clamp01(h.score / Math.max(r.hits[0].score, 1)) * engineT})` }} />
                      </span>
                      <span className="num">{(h.score * engineT).toFixed(2)}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="pipe__idle">not used for this question</p>
              )}
            </div>

            <div className={`pipe__answer ${phase >= 4 ? "is-on" : ""}`}>
              <span className="pipe__label">answer</span>
              {live?.pending ? (
                <p>Neither engine is confident. Asking the chatbot service…</p>
              ) : r.answer ? (
                <>
                  <p>{r.answer}</p>
                  <p className="pipe__prov">source: {r.provenance}</p>
                </>
              ) : live?.backend ? (
                <>
                  <p>{live.backend}</p>
                  <p className="pipe__prov">source: chatbot service (intent model)</p>
                </>
              ) : (
                <p>
                  Neither engine has an answer to that, and I would rather say so than guess. <a href="#contact">Ask me directly.</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
