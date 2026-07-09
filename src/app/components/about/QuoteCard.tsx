import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const QUOTES = [
  {
    text: "What is this doing here? Do you need it? Get rid of it!",
    attribution: "Adam Smith, RIT professor",
  },
  {
    text: "We must design for the way people behave, not for how we wish them to.",
    attribution: "Don Norman, Design of Everyday Things",
  },
  {
    text: "Design is how to stop being lost.\nYour work should always answer where, next steps, and how.",
    attribution: "Mike Minerva, RIT professor",
  },
  {
    text: "Think about what you owe people in the design (direction? context?)\nThen think about how to make it work.",
    attribution: "Hye Jin Nae, RIT Professor",
  },
  {
    text: "Your willingness to do it will distinguish you all the more.",
    attribution: "Geoff Colvin, Talent is Overrated",
  },
];

const SCROLL_SPEED = 0.35; // px per frame at 60fps
const QUOTE_GAP = 40;

export default function QuoteCard({ width, height = 260 }: { width?: number; height?: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const posRef = useRef(0);
  const halfHeightRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHoveredRef = useRef(false);
  const quoteIdxRef = useRef(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Measure total height of one set of quotes for the infinite loop reset point
  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    halfHeightRef.current = inner.scrollHeight / 2;
  }, []);

  // Calculate which quote is at the top of the visible area
  const getQuoteIdx = (): number => {
    const inner = innerRef.current;
    if (!inner) return 0;
    const items = inner.querySelectorAll("[data-quote-item]");
    const pos = posRef.current % halfHeightRef.current;
    let cumulative = 0;
    for (let i = 0; i < QUOTES.length; i++) {
      const el = items[i] as HTMLElement | undefined;
      if (!el) break;
      cumulative += el.offsetHeight + QUOTE_GAP;
      if (pos < cumulative) return i;
    }
    return 0;
  };

  // Auto-scroll animation loop
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    // Wait one frame for layout to settle before measuring
    const measureId = requestAnimationFrame(() => {
      halfHeightRef.current = inner.scrollHeight / 2;
    });

    const animate = () => {
      posRef.current += SCROLL_SPEED;

      const half = halfHeightRef.current;
      if (half > 0 && posRef.current >= half) {
        posRef.current -= half;
      }

      inner.style.transform = `translateY(-${posRef.current}px)`;

      const newIdx = getQuoteIdx();
      if (newIdx !== quoteIdxRef.current) {
        quoteIdxRef.current = newIdx;
        setQuoteIdx(newIdx);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(measureId);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Wheel handler — lock page scroll while hovering card, advance quotes on scroll down
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onWheel = (e: WheelEvent) => {
      if (!isHoveredRef.current) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        posRef.current += Math.abs(e.deltaY) * 0.6;
      }
    };

    card.addEventListener("wheel", onWheel, { passive: false });
    return () => card.removeEventListener("wheel", onWheel);
  }, []);

  const bgFrom = isDark ? "rgba(22,22,23,1)" : "rgba(242,242,246,1)";
  const bgTo   = isDark ? "rgba(22,22,23,0)" : "rgba(242,242,246,0)";

  return (
    <div
      ref={cardRef}
      style={{
        width: width ?? "100%",
        height,
        borderRadius: 12,
        border: "1px solid var(--color-border-dark)",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Top fade — single gradient from card top, covers header area then fades */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 110,
        background: `linear-gradient(to bottom, ${bgFrom} 0%, ${bgFrom} 58%, ${bgTo} 100%)`,
        pointerEvents: "none",
        zIndex: 2,
      }} />

      {/* Fixed header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, padding: "20px 20px 0" }}>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1, color: "var(--color-text-primary)", margin: 0 }}>
          Ethos
        </p>
        <div style={{ height: 1, background: "var(--color-border-dark)", margin: "8px 0 8px" }} />
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1, color: "var(--color-text-secondary)", margin: 0 }}>
          Quote {quoteIdx + 1}/{QUOTES.length}
        </p>
      </div>

      {/* Scrolling quotes area */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div
          ref={innerRef}
          style={{ padding: "12px 20px 0", display: "flex", flexDirection: "column", gap: QUOTE_GAP, willChange: "transform" }}
        >
          {[...QUOTES, ...QUOTES].map((q, i) => (
            <div
              key={i}
              data-quote-item
              style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}
            >
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--color-text-primary)",
                margin: 0,
                whiteSpace: "pre-line",
              }}>
                {q.text}
              </p>
              <p style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1.5,
                color: "var(--color-text-secondary)",
                margin: 0,
              }}>
                {q.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 64,
        background: `linear-gradient(to top, ${bgFrom}, ${bgTo})`,
        pointerEvents: "none",
        zIndex: 3,
      }} />
    </div>
  );
}
