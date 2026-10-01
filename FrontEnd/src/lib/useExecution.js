import { useEffect, useState } from "react";

// A cell "executes" the first time a visitor actually reaches it, and takes
// the next execution count. The counts end up recording the order this
// visitor read the page in, not an order the page imposed.
export function useExecution(ids) {
  const [counts, setCounts] = useState({});
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let next = 1;
    const seen = {};
    const ratios = {};
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.dataset.cell;
          ratios[id] = e.intersectionRatio;
          const reached = e.isIntersecting && (e.intersectionRatio > 0.3 || e.intersectionRect.height > innerHeight * 0.45);
          if (reached && !seen[id]) {
            seen[id] = next++;
            setCounts((c) => ({ ...c, [id]: seen[id] }));
          }
        }
        const top = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
        if (top && top[1] > 0) setActive(top[0]);
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1] }
    );
    ids.forEach((id) => {
      const el = document.querySelector(`[data-cell="${id}"]`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return { counts, active };
}
