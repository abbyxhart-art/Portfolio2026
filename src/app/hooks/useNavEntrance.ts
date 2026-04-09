let hasAnimated = false;

export function useNavEntrance() {
  const shouldAnimate = !hasAnimated;
  if (!hasAnimated) hasAnimated = true;
  return shouldAnimate;
}
