// Shared dotted-grid background (used to be scoped to the "Early Days" art
// gallery frame; now also applied page-wide on About). Dot fill is baked into
// an SVG data URI since CSS vars can't be referenced inside one, so callers
// must pass the current theme.
export function getDotBackground(isDark: boolean): React.CSSProperties {
  const dotFill = isDark ? "%23faf9ff" : "%2324232a";
  const dotPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='15' cy='15' r='1' fill='${dotFill}' fill-opacity='0.12'/%3E%3C/svg%3E")`;
  return {
    backgroundImage: dotPattern,
    backgroundRepeat: "repeat",
    backgroundSize: "30px 30px",
  };
}
