import { useState } from "react";

// Use sessionStorage so the animation plays on every fresh page load (new tab / hard refresh)
// but not on SPA navigations within the same session. Computed once per mount via the
// useState initializer so the value stays stable across re-renders — re-reading
// sessionStorage on every render made shouldAnimate flip to false after the first
// render, cancelling entrance timers that depend on it.
export function useNavEntrance() {
  const [shouldAnimate] = useState(() => {
    const key = "__portfolio_entrance__";
    const fresh = !sessionStorage.getItem(key);
    if (fresh) sessionStorage.setItem(key, "1");
    return fresh;
  });
  return shouldAnimate;
}
