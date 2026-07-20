import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import icons from "../../../assets/icons/icons.json";
import { useIsMobile } from "../ui/use-mobile";

// Shared between Home and About (both mobile and desktop) — Figma node
// 5399:584 "Section Navigation" is this card's expanded mobile layout; the
// collapsed/drag-to-dismiss mobile interaction is a follow-up, so for now
// every caller just toggles collapsed/expanded via the chevron.
const PILL_PHRASES = [
  "Like the playlist?",
  "Got a cool project?",
  "Grab a matcha?",
];
const COPY_EMAIL = "abbyxhart@gmail.com";

const EXTRA_EXPERIENCES: { company: string; role: string; year: string }[] = [
  { company: "RIT College of Science", role: "Design Intern", year: "2023-2026" },
  { company: "RIT Student Government", role: "Design Intern", year: "2024" },
  { company: "KaleidoscopeMe", role: "Design Intern", year: "2023" },
];

export default function ResumeCard({ collapsed, onToggle, isDark }: { collapsed: boolean; onToggle: () => void; isDark: boolean }) {
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewMoreExpanded, setViewMoreExpanded] = useState(false);
  const [viewMoreHovered, setViewMoreHovered] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(1);
  const [displayText, setDisplayText] = useState(PILL_PHRASES[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const displayRef = useRef(PILL_PHRASES[1]);
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx(i => (i + 1) % PILL_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = PILL_PHRASES[phraseIdx];
    if (target === displayRef.current) return;
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setIsAnimating(true);
      let curr = displayRef.current;

      // Delete phase — backspace char by char
      while (curr.length > 0 && !cancelled) {
        curr = curr.slice(0, -1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(28);
      }

      // Type phase — char by char
      while (curr.length < target.length && !cancelled) {
        curr = target.slice(0, curr.length + 1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(55);
      }

      if (!cancelled) setIsAnimating(false);
    };

    run();
    return () => { cancelled = true; };
  }, [phraseIdx]);

  const handlePillClick = () => {
    navigator.clipboard.writeText(COPY_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContentHeight(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className="relative flex flex-col items-center w-full"
      style={{
        padding: isMobile ? 16 : 24,
        background: isDark ? "rgba(48,47,52,0.8)" : "rgba(233,232,239,0.8)",
        border: "1px solid var(--color-border-default)",
        borderRadius: collapsed ? 999 : 8,
        transition: "border-radius 0.35s ease",
      }}
    >
      {/* Chevron toggle — absolutely positioned at top center */}
      <button
        onClick={onToggle}
        className="absolute top-[2px] left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 z-10"
        style={{ width: 24, height: 24 }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox={icons.navigation.chevron.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
        >
          <path
            d={icons.navigation.chevron.paths[0].d}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Header pill — always visible */}
      <div
        className="flex items-center justify-between w-full px-[12px] py-[4px] cursor-none"
        style={{
          background: pillHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: collapsed ? 999 : 4,
          transition: "background 0.2s ease, border-radius 0.35s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setPillHovered(true)}
        onMouseLeave={() => setPillHovered(false)}
        onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
        onClick={handlePillClick}
      >
        <div className="flex gap-[8px] items-center shrink-0">
          <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] whitespace-nowrap" style={{ color: "#302f34" }}>Abby Hart</p>
          <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] whitespace-nowrap" style={{ color: "#302f34", width: isMobile ? "auto" : 63 }}>NYC/SF</p>
        </div>

        {/* Right side: scramble phrase + copy label inline */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            color: "#847f90",
            margin: 0,
            minWidth: isMobile ? 0 : 150,
            overflow: isMobile ? "hidden" : "visible",
            textOverflow: isMobile ? "ellipsis" : "clip",
            textAlign: "right",
          }}>
            {displayText}{isAnimating && <span style={{ opacity: 0.7 }}>|</span>}
          </p>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            color: "rgba(132,127,144,0.7)",
            margin: 0,
            flexShrink: 0,
          }}>
            {copied ? "Email Copied!" : "Copy Email"}
          </p>
        </div>

        {/* Custom cursor tooltip */}
        {pillHovered && (
          <div
            style={{
              position: "fixed",
              left: cursorPos.x + 12,
              top: cursorPos.y + 12,
              pointerEvents: "none",
              zIndex: 9999,
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied!" : "Copy Email"}
          </div>
        )}
      </div>

      {/* Collapsible content */}
      <motion.div
        animate={{
          height: collapsed ? 0 : contentHeight,
          opacity: collapsed ? 0 : 1,
          marginTop: collapsed ? 0 : 17,
        }}
        transition={{ duration: collapsed ? 0.35 : 0.65, ease: [0.33, 0, 0, 1] }}
        style={{ overflow: "hidden", pointerEvents: collapsed ? "none" : "auto" }}
        className="w-full"
      >
            <div ref={contentRef} className="flex flex-col gap-[17px]">
              {/* Education */}
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5]" style={{ color: isDark ? "#908e99" : "#847f90" }}>Rochester Institute of Technology</p>
                <div className="flex flex-col gap-[2px]">
                  <div className="flex gap-[4px] items-center w-full">
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] flex-1" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>New Media Design</p>
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#908e99" : "#847f90" }}>2026 BFA</p>
                  </div>
                  <div className="flex gap-[4px] items-center w-full">
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] flex-1" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>Mobile Design & Development, Fine Arts</p>
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#908e99" : "#847f90" }}>Minors</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5]" style={{ color: isDark ? "#908e99" : "#847f90" }}>Experience</p>
                <div className="flex flex-col gap-[12px]">
                  {[
                    { company: "Figma", role: "Brand Activations / Campus Leadership", year: "2025" },
                    { company: "Capitol Aluminum", role: "Product Design", year: "2024" },
                  ].map(({ company, role, year }) => (
                    <div key={company} className="flex gap-[42px] items-center w-full">
                      <div className="flex gap-[8px] items-center flex-1 min-w-0">
                        <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] shrink-0" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{company}</p>
                        <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] truncate" style={{ color: isDark ? "#908e99" : "#847f90" }}>{role}</p>
                      </div>
                      <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{year}</p>
                    </div>
                  ))}
                  <AnimatePresence initial={false}>
                    {viewMoreExpanded && EXTRA_EXPERIENCES.length > 0 && (
                      <motion.div
                        key="extra"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
                        style={{ overflow: "hidden" }}
                        className="flex flex-col gap-[12px]"
                      >
                        {EXTRA_EXPERIENCES.map(({ company, role, year }) => (
                          <div key={company} className="flex gap-[42px] items-center w-full">
                            <div className="flex gap-[8px] items-center flex-1 min-w-0">
                              <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] shrink-0" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{company}</p>
                              <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] truncate" style={{ color: isDark ? "#908e99" : "#847f90" }}>{role}</p>
                            </div>
                            <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{year}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setViewMoreExpanded(v => !v)}
                    onMouseEnter={() => setViewMoreHovered(true)}
                    onMouseLeave={() => setViewMoreHovered(false)}
                    className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5] bg-transparent border-0 p-0 cursor-pointer text-left"
                    style={{
                      color: isDark ? (viewMoreHovered ? "#faf9ff" : "#908e99") : (viewMoreHovered ? "#302f34" : "#847f90"),
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textDecorationColor: isDark ? (viewMoreHovered ? "#faf9ff" : "#908e99") : (viewMoreHovered ? "#302f34" : "#847f90"),
                      transition: "color 0.15s ease, text-decoration-color 0.15s ease",
                    }}
                  >
                    {viewMoreExpanded ? "View Less" : "View More"}
                  </button>
                </div>
              </div>
            </div>
      </motion.div>
    </div>
  );
}
