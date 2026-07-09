import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import icons from "../../../assets/icons/icons.json";
import { useIsMobile } from "../ui/use-mobile";

export type MiniMenuSection = { id: string; label: string };

// Timing constants from Figma prototype (2000ms loop, values mapped to one-shot durations)
const EASE_SMOOTH: [number, number, number, number] = [0.5, 0, 0.2, 1]; // menu expand + text reveal
const EASE_SYM:   [number, number, number, number] = [0.5, 0, 0.5, 1]; // border fade, ellipse flash, chevron

const RING_R = 10;
const RING_C = 2 * Math.PI * RING_R;

export default function CasestudyMiniMenu({ sections }: { sections: MiniMenuSection[] }) {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Mobile only: measure the panel's real content height so it can animate to
  // an exact height (rather than a fixed max-height cap) — reads as a
  // deliberate "grow taller" reveal instead of the old abrupt snap.
  const panelContentRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0);

  useLayoutEffect(() => {
    // panelContentRef only mounts once `visible` flips true (nav appears past
    // scrollY 200) — must be a dependency or this never re-measures once it does.
    if (!isMobile || !visible || !panelContentRef.current) return;
    const el = panelContentRef.current;
    const update = () => setPanelHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, visible, sections]);

  // Mobile only: while the panel is open, lock page scroll so a drag on the
  // nav can never translate into the page scrolling behind it.
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobile, isOpen]);

  // Close the panel if the nav itself auto-hides (e.g. scrolled near the
  // bottom of the page) so the backdrop never gets left open with no nav.
  useEffect(() => {
    if (!visible) setIsOpen(false);
  }, [visible]);

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

  // Row height bumped up on mobile (10px vs 6px vertical padding, 13px vs 12px
  // type) so the expanded panel reads as a roomier drawer rather than a
  // cramped list — this is what actually makes it "taller."
  const panelInner = (
    <>
      <button
        onClick={scrollToTop}
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: isMobile ? 13 : 12,
          fontWeight: 400,
          color: "#908E99",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: isMobile ? 20 : 16,
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
                padding: isMobile ? "10px 0" : "6px 0",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: isMobile ? 13 : 12,
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
    </>
  );

  return (
    <>
      {/* Backdrop — mobile only. Darkens the page and physically intercepts
          outside clicks/drags so they can only close the nav, never fall
          through to a link or button underneath. */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "#000" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 0, 0, 1] }}
            onClick={e => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          // Outer div handles horizontal centering; keeps Framer Motion's y transform isolated
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <motion.div
            ref={containerRef}
            className="flex flex-col items-center gap-2"
            // Drops down from higher up, snaps fast into position
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { duration: 0.18, ease: [0.965, 0, 1, 1] as [number, number, number, number] },
            }}
            // Mobile only: dragging anywhere on the nav pulls it down; releasing
            // past the threshold closes it, otherwise it springs back to rest.
            // touchAction "none" stops the drag from ever scrolling the page.
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (isOpen && (info.offset.y > 40 || info.velocity.y > 400)) setIsOpen(false);
            }}
            style={isMobile ? { touchAction: "none" } : undefined}
          >
            {/* Expanded panel — existing interaction logic preserved */}
            {isMobile ? (
              <div
                style={{
                  background: "rgba(144,142,153,0.2)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 4,
                  overflow: "hidden",
                  height: isOpen ? panelHeight : 0,
                  opacity: isOpen ? 1 : 0,
                  transition: "height 320ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease",
                  pointerEvents: isOpen ? "auto" : "none",
                  minWidth: 200,
                }}
              >
                <div ref={panelContentRef} style={{ padding: 20 }}>
                  {panelInner}
                </div>
              </div>
            ) : (
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
                {panelInner}
              </div>
            )}

          {/* ── Pill ─────────────────────────────────────────────────────────────── */}
          {/*
            Figma animation sequence (all from 5325:2805 node, 2000ms prototype loop):
              0ms        → pill is 48px wide (just the status bar)
              0–288ms    → container drops into position (handled by outer motion.div above)
              173–489ms  → border fades in [ease: EASE_SYM]
              238–428ms  → status ring flashes white then reveals [ease: EASE_SYM]
              288–740ms  → pill expands 48→200px, text scales in [ease: EASE_SMOOTH]
              534–740ms  → chevron fades in + slides up [ease: EASE_SYM]
          */}
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            // Entrance: width expands, border fades in
            initial={{ width: 38, borderColor: "rgba(48,47,52,0)" }}
            animate={{ width: 200, borderColor: "#302F34" }}
            transition={{
              width:       { duration: 0.452, delay: 0.288, ease: EASE_SMOOTH },
              borderColor: { duration: 0.316, delay: 0.173, ease: EASE_SYM },
            }}
            style={{
              background: hovered ? "rgba(144,142,153,0.5)" : "rgba(144,142,153,0.3)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderWidth: "0.75px",
              borderStyle: "solid",
              borderRadius: 24,
              height: 38,
              overflow: "hidden", // clips inner content for the expand reveal
              cursor: "pointer",
              userSelect: "none",
              flexShrink: 0,
              boxSizing: "border-box",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
              transition: "background 0.15s ease",
            }}
          >
            {/*
              Inner layout is always 200px wide — the outer clip animates to reveal it.
              Order matches Figma: status bar (left) · label (center) · chevron (right)
            */}
            <div
              style={{
                width: 200,
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0 10px 0 6px",
                boxSizing: "border-box",
              }}
            >
              {/* Status bar — progress ring + section number */}
              <div style={{ position: "relative", flexShrink: 0, width: 24, height: 24 }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
                >
                  {/*
                    Figma node 5325:2808 (Ellipse): background #FAF9FF → transparent
                    Timing: delay 238ms, duration 190ms, ease EASE_SYM
                    Creates a "flash" that fades away to reveal the ring underneath.
                  */}
                  <motion.circle
                    cx="12" cy="12" r={RING_R}
                    initial={{ fill: "#FAF9FF" }}
                    animate={{ fill: "rgba(250,249,255,0)" }}
                    transition={{ duration: 0.19, delay: 0.238, ease: EASE_SYM }}
                  />
                  {/* Track ring */}
                  <circle
                    cx="12" cy="12" r={RING_R}
                    fill="none"
                    stroke="rgba(250,249,255,0.2)"
                    strokeWidth="1.5"
                  />
                  {/* Progress arc — key forces remount on section change, CSS transition handles dashoffset */}
                  <circle
                    key={activeIndex}
                    cx="12" cy="12" r={RING_R}
                    fill="none"
                    stroke="#FAF9FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - progress)}
                    style={{ transition: "stroke-dashoffset 80ms linear" }}
                  />
                </svg>
                {/* Section number centered over the ring */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: 9,
                    lineHeight: 1,
                    color: "#FAF9FF",
                    userSelect: "none",
                  }}
                >
                  {activeIndex + 1}
                </span>
              </div>

              {/*
                Section label — Figma node 5325:2810 (Overview text)
                Figma: opacity 0→1, scaleX/Y 0.5→1, x −24→0
                transformOrigin: '0% 50%' (scale from left edge)
                Timing: delay 288ms, duration 452ms, ease EASE_SMOOTH
              */}
              <motion.p
                initial={{ opacity: 0, scaleX: 0.5, scaleY: 0.5, x: -24 }}
                animate={{ opacity: 1, scaleX: 1, scaleY: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.452, delay: 0.288, ease: EASE_SMOOTH },
                  scaleX:  { duration: 0.452, delay: 0.288, ease: EASE_SMOOTH },
                  scaleY:  { duration: 0.452, delay: 0.288, ease: EASE_SMOOTH },
                  x:       { duration: 0.452, delay: 0.288, ease: EASE_SMOOTH },
                }}
                style={{
                  transformOrigin: "0% 50%",
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "#FAF9FF",
                  margin: 0,
                  flex: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {sections[activeIndex]?.label}
              </motion.p>

              {/*
                Chevron — Figma node 5327:2949
                Figma: opacity 0→1, y 7→0
                Timing: delay 534ms, duration 206ms
                Rotates via CSS to reflect isOpen state (existing interaction preserved)
              */}
              <motion.div
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { duration: 0.206, delay: 0.534, ease: EASE_SYM },
                  y:       { duration: 0.206, delay: 0.534, ease: "linear" },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox={icons.navigation.chevron.viewBox}
                  fill="none"
                  style={{
                    transition: "transform 0.25s ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                >
                  <path
                    d={icons.navigation.chevron.paths[0].d}
                    stroke="#908E99"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
