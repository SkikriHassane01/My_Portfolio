// A miniature of the "cognitive router" from the Lear assistant.
//
// A question is scored for two intents. Numeric and listing questions compile
// into the projects query language and are computed (table engine). Everything
// else goes to BM25 retrieval over short passages about Hassane (document
// engine). Nothing here calls a language model: every answer is either a count
// over real rows or a passage quoted with its source.

import { passages } from "../data/profile.js";
import { DOMAINS, projects } from "../data/projects.js";
import { run, toSource } from "./query.js";

const TABLE_CUES = [
  ["how many", 3], ["number of", 2.5], ["count", 2.5], ["list", 2.5],
  ["which", 1.5], ["show me", 1.5], ["show", 1], ["projects", 1.5],
  ["project", 1], ["most recent", 1.5], ["latest", 1.5], ["all", 0.5],
];
const DOCS_CUES = [
  ["why", 2.5], ["how did", 2], ["how does", 2], ["tell me", 2], ["explain", 2.5],
  ["describe", 2], ["who", 2], ["what is", 1], ["what did", 1.5], ["about", 1],
  ["where", 1.5], ["study", 2], ["studied", 2], ["speak", 2], ["spoken", 2], ["languages", 1.5],
  ["contact", 2], ["reach", 2], ["email", 2], ["hire", 1.5], ["experience", 1],
  ["lear", 1], ["internship", 0.5], ["certif", 1.5],
];

// Words that select a domain. Order matters: the first match wins per word.
const DOMAIN_WORDS = {
  genai: ["llm", "llms", "rag", "genai", "generative", "language model", "diffusion", "mistral", "ollama"],
  vision: ["computer vision", "vision", "image", "images", "video", "ocr", "camera", "detection"],
  dl: ["deep learning", "neural", "deep"],
  nlp: ["nlp", "translation", "text"],
  data: ["data analysis", "dashboard", "dashboards", "power bi", "tableau", "analytics", "bi", "sql"],
  cloud: ["cloud", "aws", "azure", "docker", "deployed", "deployment", "mlops"],
  web: ["web", "website", "apps", "app"],
  systems: ["c++", "java", "systems"],
  ml: ["machine learning", "ml", "regression", "classification", "automl"],
};
const KIND_WORDS = {
  work: ["internship", "internships", "company", "companies", "professional", "industry"],
  competition: ["competition", "competitions", "kaggle"],
  learning: ["learning project", "course", "courses", "tutorial"],
};

const STACK = [...new Set(projects.flatMap((p) => p.stack))];

const STOP = new Set(
  "a an and are as at be by did do does for from has have he his him how i in into is it its me my of on or so tell than that the their them then there these they this to was what when where which who why will with you your".split(" ")
);

// Crude suffix stemming so "studied" finds "study" and "speaks" finds "speak".
const stem = (t) =>
  t.length < 5 ? t : t.replace(/ies$/, "y").replace(/ied$/, "y").replace(/(ing|ed|es|s)$/, "");

const tokenize = (s) =>
  s.toLowerCase().replace(/[^a-z0-9+#\s]/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t)).map(stem);

// "has" / "ml" style cues must match whole words, not substrings.
function hasPhrase(text, phrase) {
  const esc = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9+])${esc}([^a-z0-9+]|$)`).test(text);
}

function scoreCues(text, cues, engine) {
  const hits = [];
  for (const [phrase, w] of cues) {
    if (phrase === "certif" ? text.includes(phrase) : hasPhrase(text, phrase)) {
      hits.push({ term: phrase, engine, w });
    }
  }
  return hits;
}

function compile(text) {
  const steps = [];
  const used = [];
  for (const s of STACK) {
    const t = s.toLowerCase();
    if (t.length >= 3 && hasPhrase(text, t) && !used.includes(t)) {
      steps.push({ op: "where", field: "stack", value: s });
      used.push(t);
      break;
    }
  }
  for (const [domain, words] of Object.entries(DOMAIN_WORDS)) {
    const w = words.find((x) => hasPhrase(text, x) && !used.some((u) => u.includes(x)));
    if (w) {
      steps.push({ op: "where", field: "domain", value: domain });
      used.push(w);
      break;
    }
  }
  for (const [kind, words] of Object.entries(KIND_WORDS)) {
    if (words.some((x) => hasPhrase(text, x))) {
      steps.push({ op: "where", field: "kind", value: kind });
      break;
    }
  }
  const counting = /\b(how many|number of|count)\b/.test(text);
  if (counting) steps.push({ op: "count" });
  else steps.push({ op: "sort", by: "featured" }, { op: "limit", n: 5 });
  return { steps, filters: used.length, counting };
}

// --- BM25 over passages -----------------------------------------------------
const DOCS = passages.map((p) => ({ ...p, tokens: tokenize(p.text) }));
const AVG = DOCS.reduce((n, d) => n + d.tokens.length, 0) / DOCS.length;
const DF = {};
for (const d of DOCS) for (const t of new Set(d.tokens)) DF[t] = (DF[t] || 0) + 1;

function bm25(query, k1 = 1.4, b = 0.75) {
  const q = [...new Set(tokenize(query))];
  return DOCS.map((d) => {
    let score = 0;
    for (const t of q) {
      const f = d.tokens.filter((x) => x === t).length;
      if (!f) continue;
      const idf = Math.log(1 + (DOCS.length - DF[t] + 0.5) / (DF[t] + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.tokens.length) / AVG)));
    }
    return { id: d.id, source: d.source, text: d.text, score };
  }).sort((a, b) => b.score - a.score);
}

export const DOCS_THRESHOLD = 1.6;

const KIND_LABEL = { work: "company work", competition: "competitions", learning: "learning projects", personal: "personal" };

function describe(steps) {
  const parts = steps
    .filter((s) => s.op === "where")
    .map((s) => (s.field === "domain" ? DOMAINS[s.value].toLowerCase() : s.field === "kind" ? KIND_LABEL[s.value] : `${s.value}`));
  return parts.length ? parts.join(", ") : "any";
}

export function route(question) {
  const text = " " + question.toLowerCase().trim() + " ";
  const plan = compile(text);
  const tableHits = scoreCues(text, TABLE_CUES, "table");
  const docsHits = scoreCues(text, DOCS_CUES, "docs");
  if (plan.filters) tableHits.push({ term: `${plan.filters} filter${plan.filters > 1 ? "s" : ""}`, engine: "table", w: plan.filters });

  const table = tableHits.reduce((n, h) => n + h.w, 0);
  const docs = docsHits.reduce((n, h) => n + h.w, 0);
  const features = [...tableHits, ...docsHits].sort((a, b) => b.w - a.w);
  const base = { question: question.trim(), scores: { table, docs }, features };

  const wantsTable = table > docs && (plan.counting || plan.filters > 0 || hasPhrase(text, "projects"));
  if (wantsTable) {
    const source = toSource(plan.steps);
    const result = run(plan.steps);
    const label = describe(plan.steps);
    let answer;
    if (plan.counting) {
      answer = `${result.count} project${result.count === 1 ? "" : "s"} match (${label}).`;
    } else if (result.rows.length) {
      answer = `Top ${result.rows.length} (${label}): ${result.rows.map((r) => r.title).join("; ")}.`;
    } else {
      answer = `No projects match (${label}).`;
    }
    return { ...base, engine: "table", source, result, answer, provenance: "computed from src/data/projects.js" };
  }

  const hits = bm25(question);
  const top = hits[0];
  if (!top || top.score < DOCS_THRESHOLD) {
    return { ...base, engine: "none", hits: hits.slice(0, 3), answer: null };
  }
  return { ...base, engine: "docs", hits: hits.slice(0, 3), answer: top.text, provenance: top.source };
}

// Last resort for questions neither engine covers: the Flask chatbot, when the
// site is served by it. On static hosting the call fails fast and we say so.
export async function askBackend(question, ms = 7000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
      signal: ctrl.signal,
    });
    if (!res.ok || !(res.headers.get("content-type") || "").includes("json")) return null;
    const data = await res.json();
    return typeof data.response === "string" ? data.response : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
