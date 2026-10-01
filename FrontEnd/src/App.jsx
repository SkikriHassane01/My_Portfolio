import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Intro } from "./cells/Intro.jsx";
import { Experience } from "./cells/Experience.jsx";
import { Ask } from "./cells/Ask.jsx";
import { DEFAULT_QUERY, Projects } from "./cells/Projects.jsx";
import { Stack } from "./cells/Stack.jsx";
import { Contact } from "./cells/Contact.jsx";
import { useExecution } from "./lib/useExecution.js";

const CELLS = [
  { id: "intro", label: "profile" },
  { id: "experience", label: "experience" },
  { id: "ask", label: "ask()" },
  { id: "projects", label: "projects" },
  { id: "stack", label: "stack_counts()" },
  { id: "contact", label: "send_message()" },
];
const IDS = CELLS.map((c) => c.id);

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const set = document.documentElement.dataset.theme;
    if (set) return set;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the toggle still works for this visit */
    }
    setTheme(next);
  };
  return [theme, toggle];
}

export default function App() {
  const { counts, active } = useExecution(IDS);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [busy, setBusy] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const engine = window.ScrollCraft.mount(document.body);
    return () => engine.destroy();
  }, []);

  const openQuery = useCallback((src) => {
    setQuery(src);
    document.getElementById("projects")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  const ran = Object.keys(counts).length;

  return (
    <>
      <a className="skip" href="#ask">Skip to the ask cell</a>
      <span data-sc-progress aria-hidden="true" />

      <aside className="outline" aria-label="Notebook outline">
        <p className="outline__file">
          <span className="outline__dot" aria-hidden="true" />
          hassane.ipynb
        </p>
        <nav>
          <ol>
            {CELLS.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={active === c.id ? "is-active" : ""} aria-current={active === c.id ? "location" : undefined}>
                  <span className="outline__n" aria-hidden="true">[{counts[c.id] || " "}]</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <p className="outline__note">Numbers show the order you reached each cell.</p>
      </aside>

      <main className="sheet">
        <Intro n={counts.intro} />
        <Experience n={counts.experience} />
        <Ask n={counts.ask} onOpenQuery={openQuery} setBusy={setBusy} />
        <Projects n={counts.projects} query={query} setQuery={setQuery} />
        <Stack n={counts.stack} />
        <Contact n={counts.contact} />
      </main>

      <footer className="status" aria-label="Notebook status">
        <span className={`status__kernel ${busy ? "is-busy" : ""}`}>
          <span className="status__led" aria-hidden="true" />
          {busy ? "busy" : "idle"}
        </span>
        <span className="status__item">
          {ran}/{CELLS.length} cells run
        </span>
        <nav className="status__cells" aria-label="Cells">
          {CELLS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={active === c.id ? "is-active" : ""} aria-current={active === c.id ? "location" : undefined}>
              {c.label}
            </a>
          ))}
        </nav>
        <span className="status__item status__wide">{"runs in your browser on this page's data"}</span>
        <button type="button" className="status__theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
          <span>{theme === "dark" ? "light" : "dark"}</span>
        </button>
      </footer>
    </>
  );
}
