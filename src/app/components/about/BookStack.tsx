import { useState } from "react";
import { motion } from "@/lib/motion";

type QuoteContent = { text: string; attribution: string };
type BackContent = QuoteContent & { bg: string; light?: boolean };

type Page =
  | { type: "cover"; back: BackContent }
  | { type: "quote"; text: string; attribution: string; bg?: string; light?: boolean; back?: BackContent };

const PAGES: Page[] = [
  {
    type: "cover",
    back: {
      text: "What is this doing here? Do you need it? Get rid of it!",
      attribution: "Adam Smith, RIT professor",
      bg: "#0D0D0D",
    },
  },
  {
    type: "quote",
    text: "Think about what you owe people in the design (direction? context?)\nThen think about how to make it work.",
    attribution: "Hye Jin Nae, RIT Professor",
    bg: "#FF4901",
    back: {
      text: "Don't think about users as making errors.\nThink of the actions as approximations of what is desired.",
      attribution: "Don Norman, Design of Everyday Things",
      bg: "#0D0D0D",
    },
  },
  {
    type: "quote",
    text: "Design is how to stop being lost.\nYour work should always answer where, next steps, and how.",
    attribution: "Mike Minerva, RIT professor",
    bg: "#0057FF",
  },
];

const SIZE = 260;
const FLIP_MS = 700;

function QuoteBlock({ text, attribution, light }: QuoteContent & { light?: boolean }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 300, color: light ? "#1A1A1A" : "#f2f2f6", lineHeight: 1.65, whiteSpace: "pre-line" }}>
        {text}
      </p>
      <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 300, color: light ? "rgba(26,26,26,0.5)" : "rgba(242,242,246,0.5)", lineHeight: 1.4 }}>
        {attribution}
      </p>
    </div>
  );
}

export default function BookStack() {
  const [flippedCount, setFlippedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    if (flippedCount >= PAGES.length - 1) {
      setFlippedCount(0);
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setFlippedCount((c) => c + 1);
      setIsAnimating(false);
    }, FLIP_MS);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer select-none relative"
      style={{ width: SIZE, height: SIZE, perspective: 1200 }}
    >
      {[...PAGES].reverse().map((page, revIdx) => {
        const idx = PAGES.length - 1 - revIdx;
        const hasFlipped = idx < flippedCount;
        const isFlipping = isAnimating && idx === flippedCount;
        const isCurrentTop = idx === flippedCount;
        const isNextTop = isAnimating && idx === flippedCount + 1;
        const depth = Math.max(0, idx - flippedCount);
        const bookOpen = flippedCount > 0;

        const frontLight = page.type === "cover" ? false : !!page.light;
        const backLight = !!page.back?.light;

        return (
          <motion.div
            key={idx}
            style={{
              position: "absolute",
              width: SIZE,
              height: SIZE,
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              zIndex: isFlipping
                ? PAGES.length + 10
                : hasFlipped
                ? idx + 1
                : PAGES.length - depth,
            }}
            initial={false}
            animate={{
              rotateY: hasFlipped || isFlipping ? -180 : 0,
              y: isNextTop ? 0 : depth * 1.5,
              scale: isNextTop ? 1 : 1 - depth * 0.015,
            }}
            transition={{
              rotateY: {
                duration: isFlipping ? FLIP_MS / 1000 : 0,
                ease: [0.42, 0, 0.58, 1],
              },
              y: { duration: 0.3, ease: "easeOut" },
              scale: { duration: 0.3, ease: "easeOut" },
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: (isCurrentTop && bookOpen) || isNextTop ? "0 12px 12px 0" : 12,
                border: "none",
                background: page.type === "cover" ? "#FF4901" : (page.bg ?? "#1a1920"),
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                overflow: "hidden",
                padding: 20,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {page.type === "cover" ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6 }}>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 18, fontWeight: 300, color: "#f2f2f6", lineHeight: 1.35 }}>
                    Ethos
                  </p>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(242,242,246,0.65)", lineHeight: 1.4, transition: "opacity 0.15s ease" }}>
                    {isHovered ? "click to open book" : "perspectives shaping how I design"}
                  </p>
                </div>
              ) : (
                <QuoteBlock text={page.text} attribution={page.attribution} light={page.light} />
              )}
            </div>

            {/* Back face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px 0 0 12px",
                border: "none",
                background: page.back?.bg ?? "#0D0D0D",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                overflow: "hidden",
                padding: 20,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {page.back && <QuoteBlock text={page.back.text} attribution={page.back.attribution} light={backLight} />}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
