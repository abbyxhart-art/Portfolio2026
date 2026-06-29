import { motion, AnimatePresence } from "@/lib/motion";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import linkedInIcon from "../../assets/icons/linkedin.svg";
import chevronIcon from "../../assets/icons/chevron-selector-vertical.svg";
import Navigation from "../../imports/Navigation";
import { Link, useNavigate } from "react-router";
import aixelsVideo from "../../assets/project/aixels/Aixels_1920x960_29.99fps.mp4";
import gmVideo from "../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";
import texasVideo from "../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4";
import figbuildVideo from "../../assets/project/figbuild/figbuild_macstudio_2x1.mp4";
import capitolVideo from "../../assets/project/capitol/Demo_1920x960_V1.mp4";
import tianVideo from "../../assets/project/tianair/tian_fullflow_macstudio_2x1.mp4";

const CASE_STUDIES = [
  { label: "Gentle Monster Kiosk", path: "/casestudy/gentle-monster" },
  { label: "Capitol Aluminum", path: "/casestudy/capitol-aluminum" },
  { label: "Texas Mobile", path: "/casestudy/texas-mobile" },
  { label: "FigBuild 2026", path: "/casestudy/figma-rit" },
  { label: "Aixels", path: "/casestudy/aixels" },
  { label: "Tian Airlines", path: "/casestudy/tian-airlines" },
];

const VISITED_KEY = "__portfolio_visited__";

function HomeCasestudyMenu({ show }: { show: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISITED_KEY);
      if (stored) setVisited(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const unvisited = CASE_STUDIES.filter(cs => !visited.includes(cs.path));
  const alreadyVisited = CASE_STUDIES.filter(cs => visited.includes(cs.path));

  const itemStyle: React.CSSProperties = {
    fontFamily: "'Inter Tight', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    color: "var(--color-text-secondary)",
    lineHeight: 1,
    textDecoration: "none",
    display: "block",
    padding: "6px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  };

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -8 }}
      transition={{ duration: 0.4, ease: [0.33, 0, 0, 1] }}
      className="fixed left-[16px] md:left-[calc(4.5vw+16px)] z-50 flex flex-col gap-[12px]"
      style={{ top: 56, pointerEvents: show ? "auto" : "none" }}
    >
      {/* Trigger pill */}
      <button
        onClick={() => setIsOpen(v => !v)}
        onMouseEnter={() => setPillHovered(true)}
        onMouseLeave={() => setPillHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: pillHovered ? "var(--color-button-default-fill)" : "var(--color-surface-ghost)",
          border: "1px solid var(--color-border-dark)",
          borderRadius: 20,
          padding: "6px 12px",
          width: 160,
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 12,
          fontWeight: 400,
          color: "var(--color-text-secondary)",
          transition: "background 0.15s cubic-bezier(0.33,0,0,1)",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <span>Casestudies ({CASE_STUDIES.length})</span>
        <img
          src={chevronIcon}
          alt=""
          style={{ width: 18, height: 18, transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.33, 0, 0, 1] }}
            style={{
              background: "var(--color-surface-fill3)",
              border: "1px solid var(--color-border-dark)",
              borderRadius: 4,
              padding: 16,
              width: 160,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Unvisited */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {unvisited.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  style={itemStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Already visited */}
            {alreadyVisited.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1, margin: 0 }}>
                  Already Visited
                </p>
                {alreadyVisited.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    style={itemStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GlowLink({ children, path }: { children: ReactNode; path: string }) {
  const navigate = useNavigate();
  return (
    <span
      onMouseEnter={() => document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 2.5 }))}
      onMouseLeave={() => document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 1 }))}
      onClick={() => navigate(path)}
      style={{ color: "var(--color-text-primary)", cursor: "pointer" }}
    >
      {children}
    </span>
  );
}

function LinkedInButton({ show }: { show: boolean }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let lastKey = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        lastKey = "c";
      } else if (e.key.toLowerCase() === "v" && lastKey === "c") {
        window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer");
        lastKey = "";
      } else {
        lastKey = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pillStyle = {
    backgroundColor: hovered ? "var(--color-surface-secondary-hover)" : "var(--color-surface-fill3)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid var(--color-border-dark)",
    transition: "background-color 0.15s ease",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -16 }}
      transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: show ? 0.1 : 0 }}
      className="fixed top-[16px] right-[calc(4.5vw+100px)] z-[100] flex items-center gap-[6px]"
    >
      {/* Status pill */}
      <div
        className="hidden md:block overflow-hidden select-none"
        style={{ ...pillStyle, border: "none", height: 32, borderRadius: 4, width: 260 }}
      >
        <div
          className="flex items-center h-full"
          style={{
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "statusTicker 16s linear infinite",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: hovered ? "var(--color-text-between)" : "var(--color-text-secondary)",
          }}
        >
          <span style={{ padding: "0 16px" }}>Currently seeking co-ops / full time positions</span>
          <span style={{ padding: "0 16px" }}>Currently seeking co-ops / full time positions</span>
        </div>
        <style>{`@keyframes statusTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* LinkedIn button */}
      <button
        onClick={() => window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-[9px] pl-[12px] pr-[16px] rounded-[24px] cursor-pointer select-none"
        style={{
          ...pillStyle,
          height: 32,
          fontFamily: "'Inter Tight', sans-serif",
          outline: "none",
        }}
      >
        <div className="flex items-center gap-[9px]" style={{ pointerEvents: "none" }}>
          <div className="relative shrink-0 size-[18px]">
            <div className="absolute inset-[6.25%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={linkedInIcon} />
            </div>
          </div>
          <div className="flex gap-[2px] items-center">
            {["C", "V"].map(key => (
              <div key={key} className="flex flex-col items-center justify-center rounded-[4px] shrink-0 size-[18px]" style={{ backgroundColor: "var(--color-surface-secondary-active)" }}>
                <p className="leading-[normal] text-[10px] text-center" style={{ color: hovered ? "var(--color-text-between)" : "var(--color-text-secondary)", margin: 0 }}>{key}</p>
              </div>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}



type CardData = {
  title: string;
  tag1: string;
  tag2: string;
  tag3?: string;
  description: string;
  readTime: string;
  path: string;
  video?: string;
};

const CARD_DATA: CardData[] = [
  {
    title: "Gentle Monster Kiosk",
    tag1: "Kiosk Design",
    tag2: "UX Research",
    description: "Gifting shoppers the ability to find their perfect match",
    readTime: "5 min.",
    path: "/casestudy/gentle-monster",
    video: gmVideo,
  },
  {
    title: "Capitol Aluminum Rebrand",
    tag1: "Product Design Co-op",
    tag2: "Summer 2024",
    tag3: "shipped",
    description: "Sole design hire at Capitol. Led Capitol's complete brand transformation across three phases [foundational research, brand system development, print/digital/web]",
    readTime: "4 min.",
    path: "/casestudy/capitol-aluminum",
    video: capitolVideo,
  },
  {
    title: "FigBuild 2026 Badges",
    tag1: "Brand Activation",
    tag2: "Design Lead",
    tag3: "shipped",
    description: "Building a digital playground for students in 2 days",
    readTime: "3 min.",
    path: "/casestudy/figma-rit",
    video: figbuildVideo,
  },
  {
    title: "Texas Mobile",
    tag1: "Mobile Design",
    tag2: "UX Research",
    description: "Creating a dynamic mobile alternative as states roll-out digital ID programs",
    readTime: "6 min.",
    path: "/casestudy/texas-mobile",
    video: texasVideo,
  },
  {
    title: "Aixels",
    tag1: "Team Lead",
    tag2: "Designathon Winner",
    tag3: "shipped",
    description: "Grappling the concept of AI with a pixel mirror",
    readTime: "3 min.",
    path: "/casestudy/aixels",
    video: aixelsVideo,
  },
  {
    title: "Tian Airlines",
    tag1: "Mobile Design",
    tag2: "Design Systems",
    description: "Designing a full airline booking experience with a complete token and component system",
    readTime: "5 min.",
    path: "/casestudy/tian-airlines",
    video: tianVideo,
  },
];

function StyledCard({ initialHovered = false, onInitialLeave, data }: { initialHovered?: boolean; onInitialLeave?: () => void; data: CardData }) {
  const [hovered, setHovered] = useState(initialHovered);
  const initialHoverActive = useRef(initialHovered);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => { setHovered(true); document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 2.5 })); }}
      onMouseLeave={() => {
        setHovered(false);
        document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 1 }));
        if (initialHoverActive.current) {
          initialHoverActive.current = false;
          onInitialLeave?.();
        }
      }}
      onClick={() => navigate(data.path)}
      style={{ position: "relative", width: "100%", borderRadius: 4, overflow: "hidden", cursor: "pointer", fontFamily: "'Inter Tight', sans-serif" }}
    >
      {/* Background frame — expands from 16px inset on hover */}
      <motion.div
        initial={false}
        animate={{ top: hovered ? 0 : 16, right: hovered ? 0 : 16, bottom: hovered ? 0 : 16, left: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
        style={{ position: "absolute", background: "var(--color-button-default-fill)", border: "1px solid var(--color-border-dark)", borderRadius: 4, pointerEvents: "none" }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <p style={{ color: "var(--color-text-primary)", fontSize: 17, fontWeight: 400, lineHeight: 1.65, margin: 0 }}>{data.title}</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {data.tag3 && (
                  <div style={{ background: "var(--color-accent2-background)", borderRadius: 2, padding: "0 8px", display: "flex", alignItems: "center", height: 18 }}>
                    <span style={{ color: "var(--color-accent2-foreground)", fontSize: 11, fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap" }}>{data.tag3}</span>
                  </div>
                )}
                <p style={{ color: "var(--color-text-secondary)", fontSize: 14, fontWeight: 400, lineHeight: 1.2, margin: 0 }}>{data.tag1}</p>
                <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--color-text-secondary)", flexShrink: 0 }} />
                <p style={{ color: "var(--color-text-secondary)", fontSize: 14, fontWeight: 400, lineHeight: 1.2, margin: 0 }}>{data.tag2}</p>
              </div>
            </div>
            <p style={{ color: "var(--color-text-between)", fontSize: 14, fontWeight: 400, lineHeight: 1.65, margin: 0, maxWidth: 600 }}>{data.description}</p>
          </div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.33, 0, 0, 1] }}
            style={{ display: "flex", gap: 9, alignItems: "center", flexShrink: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6.5" stroke="var(--color-text-secondary)" strokeWidth="1"/>
              <path d="M8 5V8.5L10 10" stroke="var(--color-text-secondary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 14, fontWeight: 400, lineHeight: 1.5, margin: 0, whiteSpace: "nowrap" }}>{data.readTime}</p>
          </motion.div>
        </div>
        <div style={{ width: "100%", aspectRatio: "2 / 1", backgroundColor: hovered ? "var(--color-text-primary)" : "rgba(255,255,255,0.2)", borderRadius: 4, overflow: "hidden", transition: "background-color 0.35s cubic-bezier(0.33,0,0,1)" }}>
          {data.video && (
            <video src={data.video} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
      </div>
    </div>
  );
}

// Card + bar are one unit. The bar sits at the card's top edge with identical scaleX/transformOrigin,
// so they're always the same width at the same position. Bar fades as the card face rotates into view.
const LOADING_PHRASES = ["hi welcome!!!", "you're awesome", ":D"];

function FirstCardAnimation({ shouldStart, onDone, onFullyDone, contained = false }: { shouldStart: boolean; onDone: () => void; onFullyDone?: () => void; contained?: boolean }) {
  const [phase, setPhase] = useState<"bar" | "open" | "done">("bar");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    if (phase !== "bar" || !shouldStart) return;
    setPhraseIdx(0);
    const id = setInterval(() => setPhraseIdx(i => (i + 1) % LOADING_PHRASES.length), 200);
    return () => clearInterval(id);
  }, [phase, shouldStart]);

  // Both card and bar animate to this same scaleX so their widths always match
  const scaleX = !shouldStart ? 0 : phase === "bar" ? 0.5 : 1;
  const scaleTransition = { duration: phase === "bar" ? 0.8 : 1.2, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div style={{ position: "relative", width: "100%", ...(contained ? { height: "100%" } : { aspectRatio: "2 / 1" }) }}>

      {/* Card — starts edge-on (rotateX -89), unfolds when phase opens */}
      <div style={{ position: "absolute", inset: 0, perspective: "1200px", perspectiveOrigin: "50% 0%" }}>
        <motion.div
          initial={{ scaleX: 0, rotateX: -89 }}
          animate={{
            scaleX,
            rotateX: phase === "bar" ? -89 : 0,
            opacity: phase === "bar" ? 0 : 1,
          }}
          transition={{
            scaleX: scaleTransition,
            rotateX: { duration: 1.7, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.3, ease: "easeIn" },
          }}
          onAnimationComplete={() => {
            if (shouldStart && phase === "bar") { setPhase("open"); onDone(); }
            if (phase === "open") { setPhase("done"); onFullyDone?.(); }
          }}
          style={{
            transformOrigin: "top center",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--color-border-dark)",
            borderRadius: 8,
          }}
        />
      </div>

      {/* Progress bar — same scaleX + transformOrigin as the card, overlays its top edge */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX,
          opacity: phase === "open" || phase === "done" ? 0 : 1,
        }}
        transition={{
          scaleX: scaleTransition,
          opacity: { duration: 0.4, ease: "easeOut" },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "var(--color-text-primary)",
          transformOrigin: "top center",
        }}
      />

      {/* Loading indicators — visible only during bar phase */}
      <AnimatePresence>
        {phase === "bar" && shouldStart && (
          <>
            {/* Loading text below the bar */}
            <motion.p
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.33, 0, 0, 1], delay: 0.1 }}
              style={{
                position: "absolute",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(250,249,255,0.35)",
                fontSize: 11,
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                margin: 0,
                whiteSpace: "nowrap",
                letterSpacing: "0.08em",
              }}
            >
              {LOADING_PHRASES[phraseIdx]}
            </motion.p>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function Home() {
  const shouldAnimate = useNavEntrance();
  const [cardShouldStart, setCardShouldStart] = useState(!shouldAnimate);
  const [firstCardDone, setFirstCardDone] = useState(false);
  const [cardFullyDone, setCardFullyDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cardShrunk, setCardShrunk] = useState(false);
  const [firstCardStaysHovered, setFirstCardStaysHovered] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10 && y > lastScrollY);
      setCardShrunk(y > 50);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => setCardShouldStart(true), 1400);
    return () => clearTimeout(t);
  }, [shouldAnimate]);

  useEffect(() => {
    if (firstCardDone) {
      document.dispatchEvent(new CustomEvent("home:nav:ready"));
    }
  }, [firstCardDone]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">

      {/* Scroll fade gradient */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
          >
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 20%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 20%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 35%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 35%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 75%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(0.5px)", WebkitBackdropFilter: "blur(0.5px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(var(--color-background-fade),0.75) 0%, rgba(var(--color-background-fade),0.48) 30%, rgba(var(--color-background-fade),0.18) 65%, rgba(var(--color-background-fade),0) 100%)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: firstCardDone ? 0.2 : 0 }}
        transition={{ duration: 1.5, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.2 : 0 }}
        className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "50vh",
          background: "linear-gradient(to top, transparent, #afa4d8)",
        }}
      />

      <LinkedInButton show={firstCardDone} />

      {/* Name plate */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: firstCardDone ? 1 : 0,
          y: firstCardDone ? 0 : -16,
        }}
        transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.1 : 0 }}
        className="fixed top-[16px] left-[16px] md:left-[calc(4.5vw+16px)] z-50 flex flex-row items-center gap-[10px] pointer-events-none"
        style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)", color: "var(--color-text-primary)" }}
      >
        <p className="mb-0 text-[15px] md:text-[17px]" style={{ fontWeight: 400 }}>Abby Hart</p>
        <p className="mb-0 text-[12px]" style={{ color: "var(--color-text-secondary)" }}>New Media '26 @ RIT</p>
      </motion.div>

      {/* Casestudy menu */}
      <HomeCasestudyMenu show={cardShrunk} />

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: firstCardDone ? 1 : 0,
          y: firstCardDone ? 0 : -16,
        }}
        transition={{ duration: 1.5, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.2 : 0 }}
        className="hidden md:block fixed top-[16px] left-[20px] right-[20px] z-50"
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      {/* Scrollable content — z-index above gradient */}
      <div style={{ position: "relative", zIndex: 1 }}>

      {/* Hero text — occupies the 50vh above the card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: firstCardDone ? 1 : 0, y: firstCardDone ? 0 : -16 }}
        transition={{ duration: 1.4, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.3 : 0 }}
        className="w-full flex flex-col items-center justify-center gap-[24px]"
        style={{ height: "50vh", fontFamily: "'Inter Tight', sans-serif" }}
      >

        {/* Text block */}
        <div className="flex flex-col items-center gap-[42px]" style={{ color: "var(--color-text-primary)" }}>
          {/* <p className="text-[14px] font-[300] lowercase text-center" style={{ lineHeight: 0.7 }}>
            creative technologist / product designer
          </p>
          <p className="text-[50px] font-[350] text-center" style={{ lineHeight: 0.7 }}>
            Abby Hart
          </p> */}
          <p className="text-[28px] font-[300] text-center" style={{ lineHeight: 1.5 }}>
            I turn rough concepts / problems into smooth experiences.<br />My work is product design and creative technology
          </p>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-[8px] items-start">
          <p className="text-[17px] font-[300] whitespace-nowrap" style={{ color: "var(--color-text-secondary)", lineHeight: 0.7 }}>
            built communities w/ <GlowLink path="/casestudy/figma-rit">Figma Edu</GlowLink> + relaunched @ <GlowLink path="/casestudy/capitol-aluminum">Capitol</GlowLink>'s brand identity
          </p>
        </div>
      </motion.div>

      {/* Animation phase — first card 3D flip + additional cards fade in */}
      {!cardFullyDone && (
        <>
          <div className="w-full" style={{ paddingLeft: cardShrunk ? "17vw" : "4.5vw", paddingRight: cardShrunk ? "17vw" : "4.5vw", transition: "padding 0.5s cubic-bezier(0.33,0,0,1)" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <motion.div
                style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "auto" }}
                animate={{ opacity: firstCardDone ? 0 : 1 }}
                transition={{ duration: 1.2, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.4 : 0 }}
              >
                <FirstCardAnimation
                  shouldStart={cardShouldStart}
                  onDone={() => setFirstCardDone(true)}
                  onFullyDone={() => setCardFullyDone(true)}
                  contained
                />
              </motion.div>
              <div style={{ perspective: "1200px", perspectiveOrigin: "50% 0%" }}>
                <motion.div
                  initial={{ scaleX: 0.5, rotateX: -89, opacity: 0 }}
                  animate={{ scaleX: firstCardDone ? 1 : 0.5, rotateX: firstCardDone ? 0 : -89, opacity: firstCardDone ? 1 : 0 }}
                  transition={{
                    scaleX: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
                    rotateX: { duration: 1.7, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 1.5, ease: [0.33, 0, 0, 1] },
                  }}
                  style={{ transformOrigin: "top center" }}
                >
                  <StyledCard initialHovered={firstCardStaysHovered} onInitialLeave={() => setFirstCardStaysHovered(false)} data={CARD_DATA[0]} />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: firstCardDone ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.5 : 0 }}
            style={{
              paddingLeft: cardShrunk ? "17vw" : "4.5vw",
              paddingRight: cardShrunk ? "17vw" : "4.5vw",
              transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
              marginTop: 16, marginBottom: 100,
              display: "flex", flexDirection: "column", gap: 16,
            }}
          >
            {CARD_DATA.slice(1).map((data) => (
              <StyledCard key={data.path} data={data} />
            ))}
          </motion.div>
        </>
      )}

      {/* Unified container — all cards stacked after animation */}
      {cardFullyDone && (
        <div style={{
          paddingLeft: cardShrunk ? "17vw" : "4.5vw",
          paddingRight: cardShrunk ? "17vw" : "4.5vw",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginBottom: 100,
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {CARD_DATA.map((data, i) => (
            <StyledCard
              key={data.path}
              data={data}
              initialHovered={i === 0 ? firstCardStaysHovered : false}
              onInitialLeave={i === 0 ? () => setFirstCardStaysHovered(false) : undefined}
            />
          ))}
        </div>
      )}

      </div> {/* end scrollable content */}

    </div>
  );
}
