// Just enough highlighting for the one-line calls shown in cell inputs.
const TOKEN = /("[^"]*"|'[^']*')|(\b\d+\b)|(\.\s*\w+(?=\s*\())|(\b\w+(?==))|(\b(?:true|false)\b)/g;

export function highlight(src) {
  const out = [];
  let last = 0;
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const cls = m[1] ? "tk-str" : m[2] || m[5] ? "tk-num" : m[3] ? "tk-fn" : "tk-arg";
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}
