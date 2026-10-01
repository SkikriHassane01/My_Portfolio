import { ExternalLink } from "lucide-react";
import { Cell } from "../components/Cell.jsx";
import { credentials } from "../data/profile.js";
import { DOMAINS, projects } from "../data/projects.js";

// Counted, not claimed: both tables are derived from the project rows.
function countBy(list, keys) {
  const m = new Map();
  for (const item of list) for (const k of keys(item)) m.set(k, (m.get(k) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

const byDomain = countBy(projects, (p) => p.domains).map(([k, v]) => [DOMAINS[k], v]);
const byTool = countBy(projects, (p) => p.stack).filter(([k]) => k !== "Python").slice(0, 10);
const python = projects.filter((p) => p.stack.includes("Python")).length;

function Bars({ rows, label }) {
  const max = rows[0][1];
  return (
    <table className="bars">
      <caption className="out-caption">{label}</caption>
      <tbody>
        {rows.map(([k, v], i) => (
          <tr key={k} style={{ "--i": i }}>
            <th scope="row">{k}</th>
            <td>
              <span className="bars__bar" style={{ "--w": v / max }} aria-hidden="true" />
              <span className="num" data-sc-count={`0 ${v}`} data-sc-count-ms="900">{v}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Stack({ n }) {
  return (
    <section id="stack" data-cell="stack" className="block" aria-labelledby="stack-title">
      <h2 id="stack-title" className="md__h2">What I work with</h2>
      <p className="md__p">
        Counted from the {projects.length} projects above rather than rated out of five. Python is in {python} of them, so it is left off the chart.
      </p>
      <Cell n={n} input="stack_counts(projects), credentials">
        <div className="bars-grid">
          <Bars rows={byDomain} label="projects per domain" />
          <Bars rows={byTool} label="projects per tool" />
        </div>
        <p className="out-caption">credentials</p>
        <table className="kv kv--wide creds">
          <tbody>
            {credentials.map((c) => (
              <tr key={c.name}>
                <th scope="row">{c.issuer}</th>
                <td>
                  {c.name}
                  {c.year ? <span className="kv__sub">{c.year}</span> : null}
                </td>
                <td className="creds__verify">
                  {c.verify ? (
                    <a href={c.verify} target="_blank" rel="noreferrer">
                      verify{c.verifyNote ? ` (${c.verifyNote})` : ""} <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Cell>
    </section>
  );
}
