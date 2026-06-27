import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

export type MiniMenuSection = { id: string; label: string };

const CIRCUMFERENCE = 2 * Math.PI * 13;

export default function CasestudyMiniMenu({ sections }: { sections: MiniMenuSection[] }) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const nearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
      setVisible(scrollY > 200 && !nearBottom);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - window.innerHeight * 0.5) {
          setActiveIndex(i);
          const p = Math.min(Math.max((scrollY - top + window.innerHeight * 0.5) / el.offsetHeight, 0), 1);
          setProgress(p);
          return;
        }
      }
      setActiveIndex(0);
      setProgress(0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const glassStyle = {
    background: hovered ? "rgba(144,142,153,0.4)" : "rgba(144,142,153,0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Expanded panel */}
          <div
            style={{
              background: "rgba(144,142,153,0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: 4,
              overflow: "hidden",
              maxHeight: isOpen ? 400 : 0,
              opacity: isOpen ? 1 : 0,
              padding: isOpen ? "16px" : "0 16px",
              transition: "max-height 250ms ease, opacity 200ms ease, padding 250ms ease",
              pointerEvents: isOpen ? "auto" : "none",
              minWidth: 200,
            }}
          >
            {/* Back to top */}
            <button
              onClick={scrollToTop}
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                color: "#908E99",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 16,
                display: "block",
                width: "100%",
                textAlign: "left",
                transition: "color 150ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FAF9FF")}
              onMouseLeave={e => (e.currentTarget.style.color = "#908E99")}
            >
              Back To Top
            </button>

            {/* Section rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sections.map((s, i) => {
                const isCurrent = i === activeIndex;
                const isHov = hoveredRow === i;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "6px 0",
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    <span style={{ color: isHov ? "#908E99" : "#585564", transition: "color 150ms ease", lineHeight: 1 }}>
                      {i + 1}
                    </span>
                    <span style={{ color: isCurrent || isHov ? "#FAF9FF" : "#908E99", transition: "color 150ms ease", lineHeight: 1, whiteSpace: "nowrap" }}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pill */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              ...glassStyle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 12px 6px 10px",
              borderRadius: 24,
              width: 200,
              cursor: "pointer",
              userSelect: "none",
              transition: "background 0.15s ease",
            }}
          >
            {/* Progress ring + label grouped */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {/* Progress ring + number */}
              <motion.div
                style={{ position: "relative", flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
              >
                <svg width="24" height="24" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(250,249,255,0.2)" strokeWidth="1.5" />
                  <circle
                    key={activeIndex}
                    cx="12" cy="12" r="10"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 10}
                    strokeDashoffset={2 * Math.PI * 10 * (1 - progress)}
                    style={{ stroke: "#FAF9FF", transition: "stroke-dashoffset 80ms linear" }}
                  />
                </svg>
                <span style={{ position: "relative", fontFamily: "'Inter Tight', sans-serif", fontSize: 10, lineHeight: 1, color: "#FAF9FF", userSelect: "none" }}>
                  {activeIndex + 1}
                </span>
              </motion.div>

              {/* Section label */}
              <motion.p
                style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 400, lineHeight: 1, color: "#FAF9FF", margin: 0, whiteSpace: "nowrap" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.26, ease: "easeOut" }}
              >
                {sections[activeIndex]?.label}
              </motion.p>
            </div>

            {/* Chevron */}
            <motion.svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{ flexShrink: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered || isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {isOpen
                ? <path d="M4 6l4 4 4-4" stroke="#908E99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                : <path d="M4 10l4-4 4 4" stroke="#908E99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              }
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
