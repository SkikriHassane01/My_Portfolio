import { ArrowDownRight, Mail } from "lucide-react";
import { Cell } from "../components/Cell.jsx";
import { languages, profile } from "../data/profile.js";
import { projects } from "../data/projects.js";

export function Intro({ n }) {
  const rows = [
    ["role", profile.role],
    ["based", profile.based],
    ["school", profile.school],
    ["focus", profile.focus],
    ["speaks", languages.map((l) => `${l.name} (${l.level})`).join(", ")],
    ["projects", `${projects.length} in this notebook`],
  ];
  return (
    <section id="intro" data-cell="intro" className="block block--intro" aria-labelledby="intro-title">
      <div className="md">
        <img className="avatar" src="/hassane.webp" width="180" height="180" alt="Portrait of Hassane Skikri" />
        <h1 id="intro-title" className="md__h1">Hassane Skikri</h1>
        <p className="md__lede">
          Machine learning engineer. I build systems that answer questions about data, and compute the numbers instead of guessing them.
        </p>
        <div className="actions">
          <a className="btn btn--primary" href="#ask">
            Ask the notebook <ArrowDownRight size={16} aria-hidden="true" />
          </a>
          <a className="btn" href="#contact">
            Get in touch <Mail size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <Cell n={n} input="profile">
        <table className="kv">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Cell>
    </section>
  );
}
