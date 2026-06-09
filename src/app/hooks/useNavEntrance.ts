// Use sessionStorage so the animation plays on every fresh page load (new tab / hard refresh)
// but not on SPA navigations within the same session.
export function useNavEntrance() {
  const key = "__portfolio_entrance__";
  const shouldAnimate = !sessionStorage.getItem(key);
  if (shouldAnimate) sessionStorage.setItem(key, "1");
  return shouldAnimate;
}
