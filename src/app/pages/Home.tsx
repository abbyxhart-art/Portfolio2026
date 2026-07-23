import { motion, AnimatePresence } from "@/lib/motion";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { useIsMobile } from "../components/ui/use-mobile";
import icons from "../../assets/icons/icons.json";
import { Link, useNavigate } from "react-router";
import aixelsVideo from "../../assets/project/aixels/Aixels_1920x960_29.99fps.mp4";
import gmVideo from "../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";
import texasVideo from "../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4";
import figbuildVideo from "../../assets/project/figbuild/figbuild_macstudio_2x1.mp4";
import capitolVideo from "../../assets/project/capitol/Demo_1920x960_V1.mp4";
import dragonDoodleVideo from "../../assets/project/booth/dragondoodle-cover.mp4";
import tianAirVideo from "../../assets/project/booth/tian-cover.mp4";
import beyondFashionVideo from "../../assets/project/booth/beyondfashion-cover.mp4";

import { CASE_STUDIES } from "../data/casestudies";
import MobileCasestudyNav from "../components/layout/MobileCasestudyNav";
import { NAV_TOP_REST, NAV_TOP_SCROLLED } from "../navPosition";

const VISITED_KEY = "visited_casestudies";

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
      className="fixed left-[16px] md:left-[32px] z-50 hidden md:flex flex-col gap-[12px]"
      style={{ top: "calc(env(safe-area-inset-top) + 64px)", pointerEvents: show ? "auto" : "none" }}
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
          background: pillHovered ? "var(--color-surface-fill2)" : "var(--color-surface-fill4)",
          border: "1px solid var(--color-border-default)",
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
        <svg
          width="18"
          height="18"
          viewBox={icons.navigation["chevron"].viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transition: "transform 0.2s ease", transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
        >
          <path
            d={icons.navigation["chevron"].paths[0].d}
            stroke="var(--color-text-secondary)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
            {unvisited.length > 0 && (
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
            )}

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
      onClick={() => navigate(path)}
      onMouseEnter={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "open" }))}
      onMouseLeave={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "default" }))}
      style={{ color: "var(--color-text-primary)", cursor: "pointer" }}
    >
      {children}
    </span>
  );
}

const NAME_PLATE_PHRASES = [
  "keeps her files organized",
  "stays in auto layout",
  "loves shortcut keys",
  "finally got X / twitter",
  "can eyeball perfect alignment",
  "might get into rock climbing...",
];

// "Abby Hart" + cycling typewriter phrase, same font size for both — used by
// both the desktop-pinned and mobile-inline name plates below.
function AnimatedNamePlate({ size }: { size: number }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState(NAME_PLATE_PHRASES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const displayRef = useRef(NAME_PLATE_PHRASES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx(i => (i + 1) % NAME_PLATE_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = NAME_PLATE_PHRASES[phraseIdx];
    if (target === displayRef.current) return;
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setIsAnimating(true);
      let curr = displayRef.current;

      while (curr.length > 0 && !cancelled) {
        curr = curr.slice(0, -1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(28);
      }

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

  // Figma 5420:2921 — one continuous line ("Abby Hart is amazing."), single
  // size and single color; only the phrase after the name types/deletes.
  return (
    <p className="mb-0 whitespace-nowrap" style={{ fontSize: size, fontWeight: 400, lineHeight: "20px", color: "#FFFFFF" }}>
      Abby Hart {displayText}{isAnimating && <span style={{ opacity: 0.6 }}>|</span>}
    </p>
  );
}

function LinkedInButton({ show, navScrolled }: { show: boolean; navScrolled: boolean }) {
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
    backgroundColor: hovered ? "var(--color-surface-fill2)" : "var(--color-surface-fill4)",
    border: "1px solid var(--color-border-default)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "background-color 0.15s ease",
  };

  // Figma 5402:1342 "Linkedin Button" — a 40px-tall pair matching the nav's
  // height: the status ticker (181×40, 4px corners, 5402:1165) and the
  // shortcut button (85×40, 4/24/24/4 corners, 5402:1080) holding a centered
  // group of 18px LinkedIn icon + C/V chips (18px, 9px text, 3px radius).
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -16 }}
      transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: show ? 0.1 : 0 }}
      className="hidden md:flex fixed right-[32px] z-[100] items-center gap-[4px]"
      style={{
        top: `calc(env(safe-area-inset-top) + ${navScrolled ? NAV_TOP_SCROLLED : NAV_TOP_REST}px)`,
        height: 40,
        transition: "top 0.4s cubic-bezier(0.33,0,0,1)",
      }}
    >
      {/* Status ticker — 5402:1165 */}
      <div
        className="hidden md:block overflow-hidden select-none"
        style={{ ...pillStyle, width: 181, height: 40, borderRadius: "24px 4px 4px 24px" }}
      >
        <div
          className="flex items-center h-full"
          style={{
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "statusTicker 16s linear infinite",
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 14,
            lineHeight: "20px",
            color: "#FFFFFF",
          }}
        >
          <span style={{ padding: "0 10px" }}>Seeking fall internships or full time opportunities</span>
          <span style={{ padding: "0 10px" }}>Seeking fall internships or full time opportunities</span>
        </div>
        <style>{`@keyframes statusTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Button Shortcut — 5402:1080 */}
      <button
        onClick={() => window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative shrink-0 cursor-pointer select-none"
        style={{
          ...pillStyle,
          width: 85,
          height: 40,
          borderRadius: "4px 24px 24px 4px",
          padding: 0,
          outline: "none",
        }}
      >
        {/* Centered icon + chips group — 5420:3234 */}
        <span
          className="absolute flex items-center"
          style={{ left: "calc(50% - 1.75px)", top: "50%", translate: "-50% -50%", gap: 8 }}
        >
          {/* linkedin icon — 5402:1162 */}
          <span className="block shrink-0" style={{ width: 18, height: 18 }}>
            <svg width="18" height="18" viewBox={icons.social.linkedin.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={icons.social.linkedin.paths[0].d} fill="var(--color-text-primary)" />
            </svg>
          </span>
          {/* C / V chips — 5402:1095 */}
          <span className="flex items-center" style={{ gap: 1.5 }}>
            {["C", "V"].map(key => (
              <span
                key={key}
                className="flex items-center justify-center shrink-0"
                style={{ width: 18, height: 18, borderRadius: 3, backgroundColor: "var(--color-surface-fill2)" }}
              >
                <span className="text-[9px] leading-none" style={{ color: "var(--color-text-secondary)" }}>{key}</span>
              </span>
            ))}
          </span>
        </span>
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
    readTime: "5 min read",
    path: "/casestudy/gentle-monster",
    video: gmVideo,
  },
  {
    title: "Capitol Aluminum Rebrand",
    tag1: "Product Design Co-op",
    tag2: "Summer 2024",
    tag3: "shipped",
    description: "Sole design hire at Capitol. Led Capitol's complete brand transformation across three phases [foundational research, brand system development, print/digital/web]",
    readTime: "4 min read",
    path: "/casestudy/capitol-aluminum",
    video: capitolVideo,
  },
  {
    title: "FigBuild 2026 Badges",
    tag1: "Brand Activation",
    tag2: "Design Lead",
    tag3: "shipped",
    description: "Building a digital playground for students in 2 days",
    readTime: "3 min read",
    path: "/casestudy/figma-rit",
    video: figbuildVideo,
  },
  {
    title: "Texas Mobile",
    tag1: "Mobile Design",
    tag2: "UX Research",
    description: "Creating a dynamic mobile alternative as states roll-out digital ID programs",
    readTime: "6 min read",
    path: "/casestudy/texas-mobile",
    video: texasVideo,
  },
  {
    title: "Aixels",
    tag1: "Team Lead",
    tag2: "Designathon Winner",
    tag3: "shipped",
    description: "Grappling the concept of AI with a pixel mirror",
    readTime: "3 min read",
    path: "/casestudy/aixels",
    video: aixelsVideo,
  },
];

function StyledCard({ initialHovered = false, onInitialLeave, data, isMobile = false }: { initialHovered?: boolean; onInitialLeave?: () => void; data: CardData; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(initialHovered);
  const isSelected = isMobile || hovered;
  const initialHoverActive = useRef(initialHovered);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        if (!isMobile) document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "open" }));
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (!isMobile) document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "default" }));
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
        animate={{ top: isSelected ? 0 : 16, right: isSelected ? 0 : 16, bottom: isSelected ? 0 : 16, left: isSelected ? 0 : 16, opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
        style={{ position: "absolute", background: "var(--color-button-default-fill)", border: "1px solid var(--color-border-dark)", borderRadius: 4, pointerEvents: "none" }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: isMobile ? "12px 12px 0 12px" : 16, display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: isMobile ? "100%" : undefined }}>
            <p style={{ color: "var(--color-text-primary)", fontSize: "var(--text-size\\/card-title)", fontWeight: 400, lineHeight: 1.65, margin: 0 }}>{data.title}</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {data.tag3 && (
                <div style={{ background: "var(--color-accent2-background)", borderRadius: 2, padding: "0 8px", display: "flex", alignItems: "center", height: 18 }}>
                  <span style={{ color: "var(--color-accent2-foreground)", fontSize: "var(--text-size\\/card-badge)", fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap" }}>{data.tag3}</span>
                </div>
              )}
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-size\\/card-tag)", fontWeight: 400, lineHeight: 1.2, margin: 0 }}>{data.tag1}</p>
              <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--color-text-secondary)", flexShrink: 0 }} />
              <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-size\\/card-tag)", fontWeight: 400, lineHeight: 1.2, margin: 0 }}>{data.tag2}</p>
            </div>
            <p style={{ color: "var(--color-text-between)", fontSize: "var(--text-size\\/card-description)", fontWeight: 400, lineHeight: 1.65, margin: 0, maxWidth: 600 }}>{data.description}</p>
          </div>
          {!isMobile && (
          <motion.p
            animate={hovered ? "visible" : "hidden"}
            initial="hidden"
            variants={{ visible: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
            style={{ color: "var(--color-text-between)", fontSize: 12, fontWeight: 400, lineHeight: 1.65, margin: 0, whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {data.readTime.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.075, ease: "easeIn" } },
                }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.p>
          )}
        </div>
        <div style={{ width: isMobile ? "calc(100% + 24px)" : "100%", margin: isMobile ? "0 -12px" : undefined, aspectRatio: "2 / 1", backgroundColor: isSelected ? "var(--color-text-primary)" : "rgba(255,255,255,0.2)", borderRadius: isMobile ? 0 : 4, overflow: "hidden", transition: "background-color 0.35s cubic-bezier(0.33,0,0,1)" }}>
          {data.video && (
            <video src={data.video} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
      </div>
    </div>
  );
}

// Figma 5530:586 "Background Animation" — a teaser pointing at /lab. Not a
// casestudy, so it lives outside CARD_DATA; clicking a box takes the visitor
// to the lab and opens that item there rather than inline on the home page.
const LAB_TEASER_ITEMS = [
  { id: "dragon-doodle", category: "Interaction", year: "2025", title: "Dragon Doodle", video: dragonDoodleVideo },
  { id: "beyond-fashion", category: "Motion", year: "2024", title: "Beyond Fashion", video: beyondFashionVideo },
  { id: "tian-airlines", category: "Advanced Figma Logic", year: "2025", title: "Tian Air", video: tianAirVideo },
];

function LabTeaserSection({ isMobile = false }: { isMobile?: boolean }) {
  const navigate = useNavigate();
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: "var(--color-button-default-fill)",
        border: "1px solid var(--color-border-dark)",
        borderRadius: 4,
        padding: 24,
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      {/* Frame 1000002087 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, width: 161 }}>
        <p style={{ margin: 0, color: "var(--color-text-primary)", fontSize: "var(--text-size\\/card-title)", fontWeight: 400, lineHeight: 1.65 }}>
          want to see more?
        </p>
        <button
          onClick={() => navigate("/lab")}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          style={{
            width: 140,
            height: 40,
            borderRadius: 42,
            background: buttonHovered ? "var(--color-surface-fill2)" : "var(--color-button-default-fill)",
            border: "1px solid var(--color-border-default)",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "var(--color-text-secondary)",
            transition: "background 0.15s cubic-bezier(0.33,0,0,1)",
          }}
        >
          check out the lab
        </button>
      </div>

      {/* Frame 1000002086 */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
          gap: 24,
          marginTop: 44,
          width: "100%",
        }}
      >
        {LAB_TEASER_ITEMS.map(({ id, category, year, title, video }) => (
          <div
            key={id}
            onClick={() => navigate("/lab", { state: { openLab: id } })}
            onMouseEnter={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "open" }))}
            onMouseLeave={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "default" }))}
            style={{
              flex: "1 0 0",
              minWidth: 0,
              aspectRatio: "1 / 1",
              backgroundColor: "#141414",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              borderRadius: 16,
            }}
          >
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", fontWeight: 300, lineHeight: 1.65 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#908e99" }}>{category} {year}</p>
                <p style={{ margin: 0, fontSize: 16, color: "#faf9ff" }}>{title}</p>
              </div>
            </div>
          </div>
        ))}
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
            {/* Favicon — above the loading text/bar */}
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.33, 0, 0, 1] }}
              style={{
                position: "absolute",
                top: -37,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <img src="/favicon.png" alt="" style={{ width: 24, height: 24 }} />
            </motion.div>

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
  const isMobile = useIsMobile();
  const [cardShouldStart, setCardShouldStart] = useState(false);
  const [firstCardDone, setFirstCardDone] = useState(false);
  const [cardFullyDone, setCardFullyDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [cardShrunk, setCardShrunk] = useState(false);
  const [firstCardStaysHovered, setFirstCardStaysHovered] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10 && y > lastScrollY);
      setNavScrolled(y > 10);
      setCardShrunk(y > 50);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Always kick the intro off via a post-mount state change: under the router's
  // AnimatePresence initial={false}, mount-time animations are skipped entirely,
  // which would leave onAnimationComplete unfired and the intro stuck on the bar.
  useEffect(() => {
    const t = setTimeout(() => setCardShouldStart(true), shouldAnimate ? 1400 : 50);
    return () => clearTimeout(t);
  }, [shouldAnimate]);

  useEffect(() => {
    if (firstCardDone) {
      document.dispatchEvent(new CustomEvent("home:nav:ready"));
    }
  }, [firstCardDone]);

  return (
    <div className="relative min-h-screen">

      {/* Scroll fade gradient */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:block fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
          >
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
        style={isMobile ? {
          height: "75vh",
          background: "linear-gradient(to bottom, var(--background) 0%, #afa4d8 18%, transparent 100%)",
        } : {
          height: "50vh",
          background: "linear-gradient(to top, transparent, #afa4d8)",
        }}
      />

      <LinkedInButton show={firstCardDone} navScrolled={navScrolled} />

      {/* Name plate — desktop only: pinned top-left. On mobile it renders
          inline further down, scrolling with the rest of the page instead. */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: firstCardDone ? 1 : 0,
          y: firstCardDone ? 0 : -16,
        }}
        transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.1 : 0 }}
        className="hidden md:flex fixed md:left-[32px] z-50 flex-row items-center pointer-events-none"
        style={{
          top: `calc(env(safe-area-inset-top) + ${(navScrolled ? NAV_TOP_SCROLLED : NAV_TOP_REST) + 12}px)`,
          fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)",
          color: "var(--color-text-primary)",
          transition: "top 0.4s cubic-bezier(0.33,0,0,1)",
        }}
      >
        <AnimatedNamePlate size={14} />
      </motion.div>

      {/* Casestudy menu — desktop stays scroll-gated (cardShrunk); mobile
          appears as soon as the page loads (firstCardDone), matching the
          rest of the fixed mobile chrome (LinkedIn button, name plate)
          instead of waiting on a scroll gesture. */}
      <HomeCasestudyMenu show={cardShrunk} />
      <MobileCasestudyNav show={firstCardDone} />

      {/* Scrollable content — z-index above gradient */}
      <div style={{ position: "relative", zIndex: 1 }}>

      {/* Hero text — occupies the 50vh above the card on desktop. On mobile,
          height is auto and the name plate joins this same gap-[24px] flex
          column as its first child, so the name-plate→title and
          title→subheader gaps match exactly instead of the name plate being
          separated by whatever the old vh-centered box happened to leave. */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: firstCardDone ? 1 : 0, y: firstCardDone ? 0 : -16 }}
        transition={{ duration: 1.4, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.3 : 0 }}
        className="w-full flex flex-col items-center justify-center gap-[24px] px-[4.5vw] md:px-0"
        style={
          isMobile
            ? { paddingTop: "calc(env(safe-area-inset-top) + 40px)", paddingBottom: 72, fontFamily: "'Inter Tight', sans-serif" }
            : { height: "50vh", fontFamily: "'Inter Tight', sans-serif" }
        }
      >

        {/* Name plate — mobile only: scrolls with the page instead of
            staying fixed (desktop keeps the separate pinned version above). */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: firstCardDone ? 1 : 0, y: firstCardDone ? 0 : -16 }}
          transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.1 : 0 }}
          className="md:hidden flex flex-row items-center justify-center gap-[10px]"
          style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)", color: "var(--color-text-primary)" }}
        >
          <AnimatedNamePlate size={13} />
        </motion.div>

        {/* Text block */}
        <div className="flex flex-col items-center gap-[42px]" style={{ color: "var(--color-text-primary)" }}>
          <p className="text-[22px] md:text-[28px] font-[300] text-center" style={{ lineHeight: 1.5 }}>
           Focused on craft and execution <br />My work is product design <br className="md:hidden" />and creative technology
          </p>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-[8px] items-center">
         
          <p className="text-[15px] md:text-[16px] font-[300] text-center md:whitespace-nowrap" style={{ color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
            built community interfaces w/ <GlowLink path="/casestudy/figma-rit">Figma Edu</GlowLink><br className="md:hidden" /> + relaunched <GlowLink path="/casestudy/capitol-aluminum">Capitol</GlowLink>'s brand identity
          </p>
        </div>
      </motion.div>

      {/* Animation phase — first card 3D flip + additional cards fade in */}
      {!cardFullyDone && (
        <>
          <div className="w-full" style={{ paddingLeft: !isMobile && cardShrunk ? "17vw" : "4.5vw", paddingRight: !isMobile && cardShrunk ? "17vw" : "4.5vw", transition: "padding 0.5s cubic-bezier(0.33,0,0,1)" }}>
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
                  <StyledCard initialHovered={firstCardStaysHovered} onInitialLeave={() => setFirstCardStaysHovered(false)} data={CARD_DATA[0]} isMobile={isMobile} />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: firstCardDone ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.33, 0, 0, 1], delay: firstCardDone ? 0.5 : 0 }}
            style={{
              paddingLeft: !isMobile && cardShrunk ? "17vw" : "4.5vw",
              paddingRight: !isMobile && cardShrunk ? "17vw" : "4.5vw",
              transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
              marginTop: 16, marginBottom: 100,
              display: "flex", flexDirection: "column", gap: 40,
            }}
          >
            {CARD_DATA.slice(1).map((data) => (
              <StyledCard key={data.path} data={data} isMobile={isMobile} />
            ))}
            <LabTeaserSection isMobile={isMobile} />
          </motion.div>
        </>
      )}

      {/* Unified container — all cards stacked after animation */}
      {cardFullyDone && (
        <div style={{
          paddingLeft: !isMobile && cardShrunk ? "17vw" : "4.5vw",
          paddingRight: !isMobile && cardShrunk ? "17vw" : "4.5vw",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginBottom: 100,
          display: "flex", flexDirection: "column", gap: 40,
        }}>
          {CARD_DATA.map((data, i) => (
            <StyledCard
              key={data.path}
              data={data}
              initialHovered={i === 0 ? firstCardStaysHovered : false}
              onInitialLeave={i === 0 ? () => setFirstCardStaysHovered(false) : undefined}
              isMobile={isMobile}
            />
          ))}
          <LabTeaserSection isMobile={isMobile} />
        </div>
      )}

      </div> {/* end scrollable content */}

    </div>
  );
}
