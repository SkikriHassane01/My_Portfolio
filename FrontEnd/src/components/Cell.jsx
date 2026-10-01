import { highlight } from "../lib/highlight.jsx";

// One notebook cell: an input line with its execution prompt, then output.
// `input` may be a string (highlighted code) or a node (an editable field).
export function Cell({ n, input, children, className = "", outLabel = true }) {
  const prompt = n ? n : " ";
  return (
    <div className={`cell ${n ? "is-run" : ""} ${className}`}>
      {input != null && (
        <div className="cell__in">
          <span className="prompt" aria-hidden="true">In [{prompt}]</span>
          <div className="cell__src">{typeof input === "string" ? <code>{highlight(input)}</code> : input}</div>
        </div>
      )}
      <div className="cell__out">
        {outLabel && input != null && (
          <span className="prompt prompt--out" aria-hidden="true">
            {n ? `Out[${n}]` : ""}
          </span>
        )}
        <div className="cell__body">{children}</div>
      </div>
    </div>
  );
}
