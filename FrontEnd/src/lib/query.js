// A small, real query language over the projects table.
//
//   projects.where(domain="vision").where(kind="work").sort("year").limit(6)
//   projects.search("yolo").count()
//
// The projects cell lets visitors edit and run it; the router compiles plain
// English into it. Both go through parse() and run() below, so what the page
// shows as code is exactly what executes.

import { DOMAINS, projects } from "../data/projects.js";

export const FIELDS = ["domain", "kind", "stack", "year", "featured"];
const METHODS = ["where", "search", "sort", "limit", "count"];
const SORTS = ["featured", "year", "title"];

export class QueryError extends Error {}

function parseValue(raw) {
  const v = raw.trim();
  if (/^"[^"]*"$/.test(v) || /^'[^']*'$/.test(v)) return v.slice(1, -1);
  if (/^-?\d+$/.test(v)) return Number(v);
  if (v === "true" || v === "false") return v === "true";
  throw new QueryError(`can't read value ${v || "(empty)"}: put text in quotes`);
}

export function parse(src) {
  const text = src.trim().replace(/\s+/g, " ");
  if (!text.startsWith("projects")) {
    throw new QueryError('queries start with "projects"');
  }
  let rest = text.slice("projects".length).trim();
  const steps = [];
  const re = /^\.\s*(\w+)\s*\(([^()]*)\)\s*/;
  while (rest.length) {
    const m = rest.match(re);
    if (!m) throw new QueryError(`unexpected "${rest.slice(0, 18)}"`);
    const [whole, method, args] = m;
    if (!METHODS.includes(method)) {
      throw new QueryError(`no method "${method}". Try ${METHODS.join(", ")}`);
    }
    if (method === "where") {
      const kv = args.match(/^\s*(\w+)\s*=\s*(.+)$/);
      if (!kv) throw new QueryError('where takes field="value"');
      const [, field, raw] = kv;
      if (!FIELDS.includes(field)) {
        throw new QueryError(`no field "${field}". Fields: ${FIELDS.join(", ")}`);
      }
      steps.push({ op: "where", field, value: parseValue(raw) });
    } else if (method === "search") {
      steps.push({ op: "search", value: String(parseValue(args)) });
    } else if (method === "sort") {
      const by = parseValue(args);
      if (!SORTS.includes(by)) throw new QueryError(`sort by ${SORTS.join(", ")}`);
      steps.push({ op: "sort", by });
    } else if (method === "limit") {
      const n = parseValue(args);
      if (!Number.isInteger(n) || n < 1) throw new QueryError("limit takes a positive whole number");
      steps.push({ op: "limit", n });
    } else if (method === "count") {
      if (args.trim()) throw new QueryError("count takes no arguments");
      steps.push({ op: "count" });
    }
    rest = rest.slice(whole.length);
  }
  const countAt = steps.findIndex((s) => s.op === "count");
  if (countAt !== -1 && countAt !== steps.length - 1) {
    throw new QueryError("count() has to come last");
  }
  return steps;
}

const norm = (s) => String(s).toLowerCase();

function matches(p, field, value) {
  const v = norm(value);
  switch (field) {
    case "domain":
      return p.domains.some((d) => d === v || norm(DOMAINS[d]) === v);
    case "kind":
      return p.kind === v;
    case "stack":
      return p.stack.some((s) => norm(s) === v);
    case "year":
      return p.year === Number(value);
    case "featured":
      return Boolean(p.featured) === Boolean(value);
    default:
      return false;
  }
}

function haystack(p) {
  return norm([p.title, p.summary, p.org, ...p.stack, ...p.domains.map((d) => DOMAINS[d])].join(" "));
}

export function run(steps, table = projects) {
  let rows = table.slice();
  for (const s of steps) {
    if (s.op === "where") rows = rows.filter((p) => matches(p, s.field, s.value));
    else if (s.op === "search") {
      const terms = norm(s.value).split(/\s+/).filter(Boolean);
      rows = rows.filter((p) => terms.every((t) => haystack(p).includes(t)));
    } else if (s.op === "sort") {
      const by = s.by;
      rows.sort((a, b) => {
        if (by === "title") return a.title.localeCompare(b.title);
        if (by === "featured" && Boolean(b.featured) !== Boolean(a.featured)) {
          return b.featured ? 1 : -1;
        }
        return (b.year || 0) - (a.year || 0);
      });
    } else if (s.op === "limit") rows = rows.slice(0, s.n);
    else if (s.op === "count") return { rows, count: rows.length };
  }
  return { rows };
}

export function toSource(steps) {
  const q = (v) => (typeof v === "string" ? `"${v}"` : String(v));
  return (
    "projects" +
    steps
      .map((s) => {
        if (s.op === "where") return `.where(${s.field}=${q(s.value)})`;
        if (s.op === "search") return `.search(${q(s.value)})`;
        if (s.op === "sort") return `.sort(${q(s.by)})`;
        if (s.op === "limit") return `.limit(${s.n})`;
        return ".count()";
      })
      .join("")
  );
}
