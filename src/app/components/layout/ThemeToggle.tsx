import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import icons from "../../../assets/icons/icons.json";

const PAD = 11;        // horizontal padding — slider sits 5px from pill edge, matching vertical
const GAP = 8;         // gap between icon slots
const BTN = 22;        // icon slot size
const H = 34;          // 32px inner + 1px border top/bottom = matches LinkedIn visually
const W = PAD + BTN + GAP + BTN + PAD; // 74px

const MOON_LEFT = PAD;
const SUN_LEFT = PAD + BTN + GAP;
const BTN_TOP = (H - BTN) / 2;

const SLIDER_W = 34;   // wider than BTN for extra click room
const SLIDER_H = 24;   // pill height minus small inset
const SLIDER_TOP = (H - SLIDER_H) / 2;
const SLIDER_OFFSET = (SLIDER_W - BTN) / 2; // how much slider overhangs icon slot

const SWITCH_DELAY = 300;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [pending, setPending] = useState<"dark" | "light" | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<"moon" | "sun" | null>(null);
  const [hovered, setHovered] = useState(false);

  const sliderTheme = pending ?? theme;
  const sliderLeft = (sliderTheme === "dark" ? MOON_LEFT : SUN_LEFT) - SLIDER_OFFSET;

  const handleClick = () => {
    if (pending) return;
    const next = isDark ? "light" : "dark";
    setPending(next);
    setTimeout(() => {
      toggleTheme();
      setPending(null);
    }, SWITCH_DELAY);
  };

  const moonStroke = () => {
    if (isDark) return "var(--color-text-primary)";
    if (hoveredIcon === "moon") return "var(--color-text-primary)";
    return "var(--color-text-secondary)";
  };

  const sunStroke = () => {
    if (!isDark) return "var(--color-text-primary)";
    if (hoveredIcon === "sun") return "var(--color-text-primary)";
    return "var(--color-text-secondary)";
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        flexShrink: 0,
        width: W,
        height: H,
        borderRadius: 9999,
        border: "1px solid var(--color-border-dark)",
        background: hovered ? "var(--color-surface-secondary-hover)" : "var(--color-surface-fill3)",
        cursor: "pointer",
        padding: 0,
        transition: "background-color 0.15s ease",
      }}
    >
      {/* Sliding pill */}
      <span
        style={{
          position: "absolute",
          left: sliderLeft,
          top: SLIDER_TOP,
          width: SLIDER_W,
          height: SLIDER_H,
          borderRadius: 9999,
          background: "var(--color-surface-fill2)",
          opacity: 0.8,
          transition: `left ${SWITCH_DELAY}ms cubic-bezier(0.4,0,0.2,1)`,
          pointerEvents: "none",
        }}
      />

      {/* Moon icon */}
      <span
        onMouseEnter={() => setHoveredIcon("moon")}
        onMouseLeave={() => setHoveredIcon(null)}
        style={{
          position: "absolute",
          left: MOON_LEFT,
          top: BTN_TOP,
          width: BTN,
          height: BTN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="13" height="13" viewBox={icons.moon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d={icons.moon.path}
            stroke={moonStroke()}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.15s" }}
          />
        </svg>
      </span>

      {/* Sun icon */}
      <span
        onMouseEnter={() => setHoveredIcon("sun")}
        onMouseLeave={() => setHoveredIcon(null)}
        style={{
          position: "absolute",
          left: SUN_LEFT,
          top: BTN_TOP,
          width: BTN,
          height: BTN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="13" height="13" viewBox={icons.sun.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d={icons.sun.path}
            stroke={sunStroke()}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.15s" }}
          />
        </svg>
      </span>
    </button>
  );
}
