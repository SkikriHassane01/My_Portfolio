import { Cell } from "../components/Cell.jsx";
import { education, experience } from "../data/profile.js";

export function Experience({ n }) {
  return (
    <section id="experience" data-cell="experience" data-sc-act="flow" className="block" aria-labelledby="experience-title">
      <h2 id="experience-title" className="md__h2">Where I have worked</h2>
      <Cell n={n} input="experience, education">
        <ol className="xp">
          {experience.map((x, i) => (
            <li key={x.id} className="xp__row" data-sc-reveal="right" data-sc-reveal-at={`${(0.1 + i * 0.06).toFixed(2)} ${(0.34 + i * 0.06).toFixed(2)}`}>
              <span className="xp__when">{x.when}</span>
              <div className="xp__what">
                <p className="xp__role">
                  {x.role}, <strong>{x.org}</strong> <span className="xp__place">{x.place}</span>
                </p>
                <p className="xp__did">{x.did}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="out-caption">education</p>
        <table className="kv kv--wide">
          <tbody>
            {education.map((e) => (
              <tr key={e.when}>
                <th scope="row">{e.when}</th>
                <td>
                  {e.what}
                  <span className="kv__sub">{e.where}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Cell>
    </section>
  );
}
