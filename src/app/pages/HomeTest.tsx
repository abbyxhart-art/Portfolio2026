import { motion, AnimatePresence } from "@/lib/motion";
import { useState, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useIsMobile } from "../components/ui/use-mobile";
import icons from "../../assets/icons/icons.json";
import { useNavigate } from "react-router";
import aixelsVideo from "../../assets/project/aixels/Aixels_1920x960_29.99fps.mp4";
import gmVideo from "../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";
import figbuildVideo from "../../assets/project/figbuild/figbuild_macstudio_2x1.mp4";
import capitolVideo from "../../assets/project/capitol/Demo_1920x960_V1.mp4";
import gentlemonsterCover from "../../assets/project/gentlemonster/gentlemonster-cover.jpg";
import capitolCover from "../../assets/project/capitol/captiol-cover.jpg";
import figbuildCover from "../../assets/project/figbuild/figbuild-cover.jpg";
import aixelsCover from "../../assets/project/aixels/aixels-cover.jpg";

import MobileCasestudyNav from "../components/layout/MobileCasestudyNav";
import { NAV_TOP_REST, NAV_TOP_SCROLLED } from "../navPosition";
import VideoControls from "../components/VideoControls";

// Bottom-center "N of total" pill tracking which casestudy card is currently
// in view — desktop only (Figma node 5556:1870, "Mini Casestudy Key").
// Keyframe track lifted verbatim from Figma node 5556:1870 ("Mini Casestudy
// Key"): a 34px circle expands to a 64px pill over the first 75% of 0.4s,
// then holds. Horizontal recentering (Figma's own x: -15) is handled for
// free here by the flex-centered wrapper instead of a matching x track.
const INDEX_PILL_EASE: [number, number, number, number] = [0.5, 0, 0.5, 1];
const INDEX_PILL_DURATION = 0.4;
const INDEX_PILL_TIMES: [number, number, number] = [0, 0.75, 1];
// Drop distance: pill settles 16px above the viewport bottom, dropping in
// from 24px higher than that resting spot.
const INDEX_PILL_DROP = 24;

// Popup casestudy menu, opened by clicking the index pill above — Figma
// "Menu Option" (node 5600:3020, no divider yet; node 5574:597 once
// something's been visited, which splits the row with a divider instead of
// an "Already Visited" label). Its motion track (node 5600:3020) loops
// opacity 0->1 + scaleX/scaleY 0.9->1 over the first 15% of a 2s demo loop;
// real one-shot duration is 2 * 0.15 = 0.3s against the same ease curve.
const CASESTUDY_MENU_EASE: [number, number, number, number] = [0.5, 0, 0.5, 1];
const CASESTUDY_MENU_DURATION = 0.3;
// Same localStorage key MobileCasestudyNav reads/writes, so "Already
// Visited" stays in sync between the mobile and desktop menus.
const CASESTUDY_VISITED_KEY = "visited_casestudies";

// Each cover row's own gap widens as it mounts (Figma node 5600:3024,
// "Menu"): column-gap 2px -> 2px (hold) -> 8px over the same 15%-of-2s
// window as the panel's own entrance above, rescaled to real seconds
// (0.0329/0.15 = 0.2193 of CASESTUDY_MENU_DURATION).
const ROW_GAP_EASE: [number, number, number, number] = [0.802, 0, 0.656, 1];
const ROW_GAP_TIMES: [number, number, number] = [0, 0.2193, 1];

// Figma "cover" tag (node 5600:3243): a small dark label that appears above
// a cover on hover, since the covers themselves carry no text anymore.
function CasestudyMenuCover({ title, path, cover, tagGap, onSelect }: { title: string; path: string; cover: string; tagGap: number; onSelect: (path: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {/* Tag — sits tagGap px above this cover's own top edge, centered on
          it. Top-row covers use a taller gap so the tag clears the panel's
          own top edge instead of crowding it (the panel allows overflow so
          it isn't clipped there); bottom-row covers use the tighter default
          since they land in the gap the divider frees up. */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-1/2"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "-50%" }}
            exit={{ opacity: 0, x: "-50%" }}
            transition={{ duration: 0.15, ease: CASESTUDY_MENU_EASE }}
            style={{
              bottom: `calc(100% + ${tagGap}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              borderRadius: 2,
              background: "var(--color-surface-primary)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 12, lineHeight: "20px", color: "#fff", textTransform: "lowercase" }}>
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => onSelect(path)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          width: 46,
          height: 46,
          borderRadius: 8,
          border: "none",
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <img src={cover} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </button>
    </div>
  );
}

function CasestudyMenuRow({ items, tagGap = 8, onSelect }: { items: CardData[]; tagGap?: number; onSelect: (path: string) => void }) {
  return (
    <motion.div
      initial={{ columnGap: "4px" }}
      animate={{ columnGap: ["4px", "4px", "8px"] }}
      transition={{ duration: CASESTUDY_MENU_DURATION, times: ROW_GAP_TIMES, ease: ["linear", ROW_GAP_EASE] }}
      style={{ display: "flex", alignItems: "flex-start", width: "100%" }}
    >
      {items.map(item => (
        <CasestudyMenuCover key={item.path} title={item.title} path={item.path} cover={item.cover} tagGap={tagGap} onSelect={onSelect} />
      ))}
    </motion.div>
  );
}

function CasestudyIndexPill({ activeIndex, total, show }: { activeIndex: number; total: number; show: boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CASESTUDY_VISITED_KEY);
      if (stored) setVisited(JSON.parse(stored));
    } catch {}
  }, [isOpen]);

  useEffect(() => {
    if (!show) setIsOpen(false);
  }, [show]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const handleSelect = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const rawUnvisited = CARD_DATA.filter(c => !visited.includes(c.path));
  const rawAlreadyVisited = CARD_DATA.filter(c => visited.includes(c.path));
  // Once every casestudy has been visited, "Already Visited" vs "Casestudies"
  // stops meaning anything — fall back to the same single unified row the
  // menu shows before anything's been visited, instead of a lone "Already
  // Visited" row with nothing to divide it from.
  const allVisited = rawUnvisited.length === 0 && rawAlreadyVisited.length > 0;
  const unvisited = allVisited ? CARD_DATA : rawUnvisited;
  const alreadyVisited = allVisited ? [] : rawAlreadyVisited;
  // A divider only makes sense once the row is actually split in two.
  const hasDivider = unvisited.length > 0 && alreadyVisited.length > 0;

  return (
    <div className="fixed inset-x-0 z-50 hidden md:flex justify-center pointer-events-none" style={{ bottom: 16 }}>
      <div ref={containerRef} className="relative">
        {/* Popup menu — sits 8px above the pill (Figma node 5574:597 once
            something's been visited, adding a divider in place of an
            "Already Visited" label; single-row 5600:3020 otherwise).
            overflow left visible so a hover tag on a top-row cover (which
            has no divider gap to sit in) can float above the panel itself. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute left-1/2"
              initial={{ opacity: 0, scaleX: 0.9, scaleY: 0.9, x: "-50%" }}
              animate={{ opacity: 1, scaleX: 1, scaleY: 1, x: "-50%" }}
              exit={{ opacity: 0, scaleX: 0.9, scaleY: 0.9, x: "-50%" }}
              transition={{ duration: CASESTUDY_MENU_DURATION, ease: CASESTUDY_MENU_EASE }}
              style={{
                bottom: "calc(100% + 8px)",
                transformOrigin: "50% 100%",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: 16,
                borderRadius: "var(--radius-component-card)",
                background: "var(--color-surface-layer1)",
                border: "0.5px solid var(--color-border-default)",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxSizing: "border-box",
                pointerEvents: "auto",
              }}
            >
              {unvisited.length > 0 && <CasestudyMenuRow items={unvisited} tagGap={24} onSelect={handleSelect} />}
              {hasDivider && <div style={{ width: "100%", height: 1, background: "var(--color-border-default)", flexShrink: 0 }} />}
              {alreadyVisited.length > 0 && <CasestudyMenuRow items={alreadyVisited} onSelect={handleSelect} />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {show && (
            <motion.div
              onClick={() => setIsOpen(o => !o)}
              // The wrapper is pointer-events:none so empty space beside the
              // pill still passes hover through to the casestudy card behind
              // it; this shape re-enables hit-testing just over its own
              // visible bounds.
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              initial={{ width: 34, y: -INDEX_PILL_DROP }}
              animate={{ width: [34, 72, 72], y: [-INDEX_PILL_DROP, 0, 0] }}
              // Faster, decoupled exit: the default `transition` above (built
              // for the entrance) would otherwise carry its full 0.4s width
              // tween into the exit too, leaving an empty shrinking "dot"
              // on screen well after the label's already faded out.
              exit={{ width: 34, y: -INDEX_PILL_DROP, transition: { duration: 0.15, ease: INDEX_PILL_EASE } }}
              transition={{
                width: { duration: INDEX_PILL_DURATION, times: INDEX_PILL_TIMES, ease: [INDEX_PILL_EASE, "linear"] },
                y: { duration: INDEX_PILL_DURATION, times: INDEX_PILL_TIMES, ease: [INDEX_PILL_EASE, "linear"] },
              }}
              style={{
                height: 34,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                // Same hover treatment as LinkedInButton's pills.
                background: hovered ? "var(--color-surface-fill3)" : "var(--color-button-default-fill)",
                border: "none",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                pointerEvents: "auto",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                // Text fade is deliberately decoupled from the box's own
                // width/y timing: it appears later on the way in (waits until
                // the box is mostly expanded) and disappears faster on the
                // way out (gone well before the box finishes shrinking).
                animate={{ opacity: 1, transition: { duration: 0.15, delay: 0.25, ease: INDEX_PILL_EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.1, ease: INDEX_PILL_EASE } }}
                style={{
                  margin: 0,
                  padding: "0 16px",
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1,
                  color: "var(--color-text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                {activeIndex + 1} of {total}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GlowLink({ children, path }: { children: ReactNode; path: string }) {
  const navigate = useNavigate();
  return (
    <span
      onClick={() => navigate(path)}
      style={{ color: "var(--color-text-primary)", cursor: "pointer" }}
    >
      {children}
    </span>
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
    backgroundColor: hovered ? "var(--color-surface-fill3)" : "var(--color-surface-layer1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "background-color 0.15s ease",
  };

  // Figma 5402:1342 "Linkedin Button" — a 40px-tall pair matching the nav's
  // (collapsed, home-page) height: the status ticker and the shortcut button
  // (93×40, 4/24/24/4 corners, 5402:1080) holding a centered group of 18px
  // LinkedIn icon + C/V chips (18px, 9px text, 3px radius). Widened from the
  // original 85px for a bit more breathing room around that centered group —
  // height stays fixed at 40 to keep matching the nav's own height.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      // Starts fading in the instant the card begins its reveal and lands
      // its own end at the same moment that reveal finishes.
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: CARD_REVEAL_DURATION, ease: CARD_REVEAL_EASE }}
      className="hidden md:flex fixed right-[32px] z-[100] items-center gap-[4px]"
      style={{
        top: `calc(env(safe-area-inset-top) + ${navScrolled ? NAV_TOP_SCROLLED : NAV_TOP_REST}px)`,
        height: 40,
        transition: "top 0.4s cubic-bezier(0.33,0,0,1)",
      }}
    >
      {/* Status ticker — 5402:1165 — shares hover state with the shortcut
          button beside it so the two read as one paired pill. */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="hidden md:block overflow-hidden select-none cursor-pointer"
        style={{ ...pillStyle, width: 93, height: 40, borderRadius: "24px 4px 4px 24px" }}
      >
        <div
          className="flex items-center h-full"
          style={{
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "statusTicker 16s linear infinite",
            fontFamily: "'SF Pro Display', sans-serif",
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
          width: 93,
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
                <span className="text-[9px] leading-none" style={{ color: hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 0.15s ease" }}>{key}</span>
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
  cover: string;
};

const CARD_DATA: CardData[] = [
  {
    title: "Gentle Monster",
    tag1: "Kiosk Design",
    tag2: "UX Research",
    description: "Reducing 15 minute decision paralysis to a 2 minute experience",
    readTime: "5 min read",
    path: "/casestudy/gentle-monster",
    video: gmVideo,
    cover: gentlemonsterCover,
  },
  {
    title: "Capitol",
    tag1: "Product Design Co-op",
    tag2: "Summer 2024",
    tag3: "shipped",
    description: "Calming brand chaos into consistency",
    readTime: "4 min read",
    path: "/casestudy/capitol-aluminum",
    video: capitolVideo,
    cover: capitolCover,
  },
  {
    title: "FigBuild",
    tag1: "Brand Activation",
    tag2: "Design Lead",
    tag3: "shipped",
    description: "Building a digital playground for students in 2 days",
    readTime: "3 min read",
    path: "/casestudy/figma-rit",
    video: figbuildVideo,
    cover: figbuildCover,
  },
  {
    title: "Aixels",
    tag1: "Team Lead",
    tag2: "Designathon Winner",
    tag3: "shipped",
    description: "Bringing 5 hours of fun to students",
    readTime: "3 min read",
    path: "/casestudy/aixels",
    video: aixelsVideo,
    cover: aixelsCover,
  },
];

// Shared "title lives inside the card" header -- Figma node 5745:642
// ("Image"): a small logo-tile slot (reserved for a future per-project
// mark -- no asset exists for any casestudy yet) beside a title/description
// column, both 24px inset from the card's top-left corner, plus the
// hover-fade read-time in the opposite top-right corner, in line with the
// title. Used by every card in the grid (StyledCard's Gentle Monster hero
// card and every EditorialGridTile) so the title treatment -- and the
// read-time animation -- is identical everywhere. Title and description
// share one size (the body/description size, not the larger card-title
// size) and are told apart by weight instead: title is SF Pro Display
// Medium ("Intense"), description is Regular and text/secondary.
function CardTitleBlock({ title, description, readTime, hovered }: { title: string; description?: string; readTime?: string; hovered?: boolean }) {
  return (
    <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 16 }}>
        {/* Logo tile -- reserved slot for a per-project mark, not wired up
            yet. Square (aspect-ratio: 1/1), height stretched to match the
            title+description pair's own height (align-items: stretch
            above) with width following from that via the aspect ratio --
            scoped to just those two lines, not the read-time below, since
            that's a separate row outside this stretch context. */}
        <div style={{ aspectRatio: "1 / 1", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, minWidth: 0, maxWidth: "min(480px, 100%)" }}>
          <p style={{ margin: 0, color: "#fff", fontSize: "var(--text-size\\/body-large)", fontWeight: 500, lineHeight: 1.4 }}>{title}</p>
          {description && (
            <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-size\\/body-large)", fontWeight: 400, lineHeight: 1.4 }}>{description}</p>
          )}
        </div>
      </div>
      {readTime && (
        <motion.p
          animate={hovered ? "visible" : "hidden"}
          initial="hidden"
          variants={{ visible: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
          style={{ margin: 0, marginLeft: 56, color: "var(--color-text-secondary)", fontSize: 12, fontWeight: 400, lineHeight: 1.4, whiteSpace: "nowrap" }}
        >
          {readTime.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.075, ease: "easeIn" } } }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.p>
      )}
    </div>
  );
}

// StyledCard is only ever used for CARD_DATA[0] (Gentle Monster) now, as
// row 1's full-width hero card -- a little taller (HERO_ROW_HEIGHT, below)
// than a single grid cell's own 300x400-derived height, since at that
// height the full-width hero reads as too flat a strip for its own video's
// real proportions. On mobile there's no `height` at all: the video renders at its
// own natural size (position: static, height: auto) instead of being
// cover-cropped into a fixed box, so it keeps its real aspect ratio rather
// than being forced into a shape tuned for desktop's 3-column grid.
function StyledCard({ initialHovered = false, onInitialLeave, data, isMobile = false }: { initialHovered?: boolean; onInitialLeave?: () => void; data: CardData; isMobile?: boolean }) {
  const [hovered, setHovered] = useState(initialHovered);
  const initialHoverActive = useRef(initialHovered);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const height = isMobile ? undefined : HERO_ROW_HEIGHT;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (initialHoverActive.current) {
          initialHoverActive.current = false;
          onInitialLeave?.();
        }
      }}
      onClick={() => navigate(data.path)}
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: "var(--radius-component-card)",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#35353b",
        fontFamily: "'SF Pro Display', sans-serif",
      }}
    >
      {data.video && (
        <>
          <video
            ref={videoRef}
            src={data.video}
            autoPlay
            loop
            muted
            playsInline
            style={height ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } : { position: "static", width: "100%", height: "auto", display: "block" }}
          />
          <VideoControls videoRef={videoRef} />
        </>
      )}
      <CardTitleBlock title={data.title} description={data.description} readTime={data.readTime} hovered={hovered} />
    </div>
  );
}

// Shared gutter for the editorial grid below (row-to-row and column-to-
// column) so every gap in the system — vertical and horizontal — matches.
const GRID_GUTTER = 16;

// Row 1 (Gentle Monster) is deliberately taller than a single grid "cell":
// at the same height as a 1/3-width column, the full-width hero read as too
// flat/long a strip for its own video's real proportions.
const HERO_ROW_HEIGHT = "clamp(320px, 34vw, 560px)";

// Base unit for rows 2/3's grid: every 1/3-width cell is exactly a 300x400
// (3:4) box. A 2/3-width cell (Capitol) gets no aspect-ratio of its own --
// it's left to CSS Grid's default `align-items: stretch`, which fills it to
// match whatever height the row's 1/3 cells establish. That's deliberate:
// a fixed aspect-ratio for the 2/3 cell would have to bake in GRID_GUTTER's
// exact px value to land on the same height as a 300x400 cell (width scales
// 2x + one gap, but height should only scale by the gap-free 2x), which
// drifts at any viewport width other than the one it was tuned for. Letting
// it stretch is exact at every width instead of merely close.
const GRID_CELL_ASPECT_RATIO = "3 / 4";

// Editorial grid tile -- a bare image/video block (no card padding or
// hover-expand frame, unlike the old StyledCard) whose title sits inside
// the card via the same CardTitleBlock treatment as the Gentle Monster hero
// card (Figma node 5745:642), instead of a caption below the media. Reused
// for every cell in the rows-2/3 grid, so a tile's look never depends on
// which column span it happens to be sitting in. On mobile, media falls
// back to its own natural aspect ratio (position: static, height: auto)
// instead of being cover-cropped into a fixed box -- or, if there's no
// media at all (Row 3's blank cells), a fixed 3:4 placeholder ratio, since
// there's no intrinsic ratio to fall back to. `video`/`cover`/`onSelect`
// are all optional so the same component can render those blank cells too.
function EditorialGridTile({ video, cover, title, description, readTime, aspectRatio, isMobile, onSelect }: { video?: string; cover?: string; title: string; description?: string; readTime?: string; aspectRatio?: string; isMobile?: boolean; onSelect?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStyle = !isMobile
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const, display: "block" }
    : { position: "static" as const, width: "100%", height: "auto", display: "block" };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        position: "relative",
        width: "100%",
        // Capitol (the 2/3 cell) is passed no `aspectRatio` at all, relying
        // on the grid's own `align-items: stretch` to size its *wrapper*
        // to the row's height (see the render below). But this div's own
        // content is entirely absolutely-positioned, so without an
        // explicit height it has zero intrinsic size of its own and
        // collapses to nothing even inside a correctly-stretched wrapper --
        // height: 100% is what actually makes it fill that wrapper.
        height: !isMobile && !aspectRatio ? "100%" : undefined,
        aspectRatio: !isMobile ? aspectRatio : (!video && !cover ? GRID_CELL_ASPECT_RATIO : undefined),
        backgroundColor: "#35353b",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-component-card)",
        overflow: "hidden",
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      {video ? (
        <>
          <video ref={videoRef} src={video} autoPlay loop muted playsInline style={mediaStyle} />
          <VideoControls videoRef={videoRef} />
        </>
      ) : (
        cover && <img src={cover} alt={title} style={mediaStyle} />
      )}
      <CardTitleBlock title={title} description={description} readTime={readTime} hovered={hovered} />
    </div>
  );
}

// Row 3's two intentionally-empty cells (see the render below) -- just a
// title placeholder and the shared logo-tile slot, no video/click. Kept as
// data (not hardcoded JSX) so it stays obvious these are meant to be
// swapped for real casestudies later, not permanent copy.
const GRID_BLANK_TILES = ["Title", "Title"];

// Bar fades from white to the same gray as the card's own hover-frame
// background (--color-surface-layer1) as it dissolves. Hardcoded rather than
// var(...) since framer-motion can't interpolate raw custom-property
// references — same reason ThemeContext.tsx duplicates SURFACE_PRIMARY as a
// literal. Site is dark-only right now (light mode's toggle is off); keep in
// sync with tokens.css's dark values if that ever changes.
const BAR_COLOR_LOADING = "#FAF9FF"; // --color-text-primary, dark
const BAR_COLOR_FADE = "rgba(46,45,50,0.9)"; // --color-surface-layer1, dark

// How "thick" the hero card is treated as, in px, for the loading-bar phase.
// A flat (zero-thickness) plane rotated to near-90° under CSS perspective
// doesn't foreshorten evenly — the pivot edge stays full width while the far
// edge recedes in Z and gets perspective-scaled down, so the sliver you'd
// see is a tapered trapezoid, not a clean rectangle. Giving the card a real
// box thickness sidesteps that: the loading "bar" is a separate face
// (EDGE_THICKNESS tall) pre-rotated 90° in local space so the group's own
// rotation cancels it out near rotateX -90 — it's viewed dead-on, not at a
// raking angle, so it renders as a clean rectangle instead of a taper.
const CARD_EDGE_THICKNESS = 4;

// Hero headline intro (Figma nodes 5085:2273 "Home Page Start" and 5673:1707
// "Home Page Middle"): the pixel mark grows from nothing up to 66.666x40 at
// Figma's 42px canvas type size; the ratio below gets rescaled to whatever
// size this site actually renders the headline at (desktop 36px / mobile
// 24px). At rest the mark is zero-width and invisible, and the gap around it
// is small enough to just read as a normal space between "designer" and
// "who" — both the mark's size and the gap animate open together, landing
// at a full 16px gap around the fully-grown mark.
const HEADLINE_EASE: [number, number, number, number] = [0.5, 0, 0.5, 1];
const HEADLINE_FIGMA_FONT = 42;
const HEADLINE_ICON_ASPECT = 13.333 / 8;
const HEADLINE_ICON_LARGE_H = 40;
const HEADLINE_GAP_REST = 4;
const HEADLINE_GAP_EXPANDED = 16;
const HEADLINE_FADE_DURATION = 0.8;
// Icon expand and the card's own loading bar share this duration and start
// at the same moment, so the two land their ends together.
const HEADLINE_EXPAND_DURATION = 0.6;
// The card's own reveal (rotateX unfold, below) takes this long. Nav/name
// plate/subtext/LinkedIn all start fading in the moment it begins and fade
// over this same duration, landing together with the reveal's own end.
const CARD_REVEAL_DURATION = 1;
// Standard "easeInOutCubic" — a punchier, more pronounced cubic ease-in-out
// than HEADLINE_EASE, used only for the reveal ensemble above (card flip,
// hero-group rise, and the chrome that lands with them).
const CARD_REVEAL_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

// The hero card and its loading bar used to be two separate components
// glued together by boolean flags in Home (cardShouldStart, firstCardDone,
// cardFullyDone) — three independently-declared transitions that all had to
// land in sync visually but weren't actually one timeline, which is what
// caused the occasional glitch. IntroCard now treats the card as a thin 3D
// box with two faces sharing one rotateX timeline: an edge face (the bar)
// and the real StyledCard as the front face. Closed (rotateX ~-90°), the
// edge face faces the camera dead-on and reads as the bar; open (rotateX
// 0°), the front face does. Only one face is ever meant to be visible at a
// time, and which one is just a function of the same rotation both share —
// so the bar isn't handing off to the card, it's the same box the whole
// time, seen from a different side.
function IntroCard({ data, isMobile, start, onReveal }: { data: CardData; isMobile: boolean; start: boolean; onReveal: () => void }) {
  const [staysHovered, setStaysHovered] = useState(true);
  // True once the unfold (rotateX) actually begins — HEADLINE_EXPAND_DURATION
  // after `start`, matching where the single continuous scaleX/rotateX track
  // below crosses from "still a flat bar" into "now visibly opening". Driven
  // by a timer rather than onAnimationComplete because the core track is now
  // one uninterrupted animation (see below) that never re-triggers partway
  // through, so there's no natural JS callback at that internal crossover.
  const [revealed, setRevealed] = useState(false);

  // Kicks off the instant the hero headline above starts expanding (Figma's
  // "Home Page Start"/"Middle" intro) — same trigger, same
  // HEADLINE_EXPAND_DURATION, so both land their own end at the same moment.
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setRevealed(true), HEADLINE_EXPAND_DURATION * 1000);
    return () => clearTimeout(t);
  }, [start]);

  // Nav/name-plate/subtext start fading in the instant the card begins its
  // reveal — their own duration is tuned to land at the same moment the
  // reveal itself finishes, so everything ends together.
  useEffect(() => {
    if (revealed) onReveal();
  }, [revealed, onReveal]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ perspective: "1200px", perspectiveOrigin: "50% 0%" }}>
        {/* Rotating group — the shared box both faces live inside. scaleX
            and rotateX are each ONE continuous tween triggered once by
            `start`, not a phase machine re-triggering a fresh animation
            partway through — that restart (plus rotateX's old ease, which
            had a fast initial ramp rather than a true zero-velocity start)
            is what read as "loading bar, [snap], card" instead of one
            motion. rotateX's own `delay` is what holds it flat for the bar's
            full width-growth before it starts easing open, all inside a
            single tween. */}
        <motion.div
          initial={{ scaleX: 0, rotateX: -89.5 }}
          animate={{ scaleX: start ? 1 : 0, rotateX: start ? 0 : -89.5 }}
          transition={{
            scaleX: { duration: HEADLINE_EXPAND_DURATION + CARD_REVEAL_DURATION, ease: [0.4, 0, 0.2, 1] },
            rotateX: { duration: CARD_REVEAL_DURATION, delay: start ? HEADLINE_EXPAND_DURATION : 0, ease: CARD_REVEAL_EASE },
          }}
          style={{ position: "relative", transformStyle: "preserve-3d", transformOrigin: "top center" }}
        >
          {/* Front face — the real card, pushed forward by half the box's
              thickness. Hidden via opacity rather than left to
              backface-visibility: at rotateX -89.5 it hasn't crossed the
              90° cutoff that would cull it, so left alone it would render
              as the same tapered sliver the edge face exists to avoid,
              doubled up underneath it. Fades in with a delay so it only
              becomes visible once the box is already mostly open. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 1.2, delay: revealed ? 0.4 : 0, ease: [0.33, 0, 0, 1] }}
            style={{ transform: `translateZ(${CARD_EDGE_THICKNESS / 2}px)`, backfaceVisibility: "hidden" }}
          >
            <StyledCard initialHovered={staysHovered} onInitialLeave={() => setStaysHovered(false)} data={data} isMobile={isMobile} />
          </motion.div>

          {/* Edge face — the box's actual top edge, a real flat surface
              pre-rotated 90° in local space so the group's rotation
              cancels it out right when the group is closed. That's what
              keeps it a clean rectangle instead of a raking near-90° view
              of a zero-thickness plane: it's only ever seen dead-on
              (closed) or rotating away (opening), never held at an
              oblique angle. Fades white -> gray in the tail of the bar's own
              growth (delay tuned to land exactly as HEADLINE_EXPAND_DURATION
              ends), so it's already gray by the time the unfold starts,
              rather than fading mid-rotation. */}
          <motion.div
            initial={{ backgroundColor: BAR_COLOR_LOADING }}
            animate={{ backgroundColor: start ? BAR_COLOR_FADE : BAR_COLOR_LOADING }}
            transition={{ backgroundColor: { duration: 0.2, delay: start ? HEADLINE_EXPAND_DURATION - 0.2 : 0, ease: "easeOut" } }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: CARD_EDGE_THICKNESS,
              borderRadius: "var(--radius-component-card)",
              transform: `rotateX(90deg) translateZ(${CARD_EDGE_THICKNESS / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// Blob mascot sprite (public/blob/blob-{1,2,3}.png) — replaces the earlier
// hand-traced SVG so the pixel mark can loop through its real frames.
// Frame 1 -> 2 and 2 -> 3 each hold 300ms; 3 -> 1 (the wrap back to rest) is
// a quicker 100ms.
const BLOB_FRAMES = ["/blob/blob-1.png", "/blob/blob-2.png", "/blob/blob-3.png"];
const BLOB_FRAME_DURATIONS = [300, 300, 100];

function BlobSprite() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFrame(f => (f + 1) % BLOB_FRAMES.length), BLOB_FRAME_DURATIONS[frame]);
    return () => clearTimeout(t);
  }, [frame]);
  return (
    <img
      src={BLOB_FRAMES[frame]}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "contain", imageRendering: "pixelated", display: "block" }}
    />
  );
}

// Hero headline — Figma nodes 5085:2273 ("Home Page Start") and 5673:1707
// ("Home Page Middle"). Plays before IntroCard's own loading bar: fades in
// right in its normal resting slot in the hero flex column (no rise), and
// once that fade is done the pixel mark grows in place (pushing "a
// designer"/"who engineers" apart) — at the same time, and same duration, as
// IntroCard's own loading bar (`onExpandStart`) and MainNavigation's own
// ball-into-pill morph. Phase advances are driven by onAnimationComplete
// rather than a setTimeout duration that merely approximates the fade's own
// length, so expanding starts the instant the fade visually finishes.
function HeroHeadline({ isMobile, onExpandStart }: { isMobile: boolean; onExpandStart: () => void }) {
  const [phase, setPhase] = useState<"idle" | "compact" | "expanding">("idle");
  const [blobHovered, setBlobHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("compact"), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "expanding") onExpandStart();
  }, [phase, onExpandStart]);

  const expanding = phase === "expanding";
  const fontSize = isMobile ? 24 : 36;
  const scale = fontSize / HEADLINE_FIGMA_FONT;
  const iconH = expanding ? HEADLINE_ICON_LARGE_H * scale : 0;
  const iconW = expanding ? iconH * HEADLINE_ICON_ASPECT : 0;
  const gapPx = expanding ? HEADLINE_GAP_EXPANDED : HEADLINE_GAP_REST;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === "idle" ? 0 : 1 }}
      transition={{ duration: HEADLINE_FADE_DURATION, ease: HEADLINE_EASE }}
      // Fade finishing (still "compact") heads straight into expanding.
      onAnimationComplete={() => {
        if (phase === "compact") setPhase("expanding");
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? 2 : 3 }}
    >
      <motion.div
        animate={{ gap: `${gapPx}px` }}
        transition={{ duration: HEADLINE_EXPAND_DURATION, ease: HEADLINE_EASE }}
        className="flex items-center justify-center font-[475]"
        style={{ fontSize, color: "var(--color-text-primary)", lineHeight: 1.4 }}
      >
        <span>a designer</span>
        <motion.span
          animate={{ opacity: expanding ? 1 : 0, width: iconW, height: iconH }}
          transition={{ duration: HEADLINE_EXPAND_DURATION, ease: HEADLINE_EASE }}
          onMouseEnter={() => setBlobHovered(true)}
          onMouseLeave={() => setBlobHovered(false)}
          style={{ display: "inline-block", flexShrink: 0, position: "relative" }}
        >
          {/* Hover tag — same treatment as the casestudy nav's cover tags
              (CasestudyMenuCover above): small dark label floating just
              above whatever it names. */}
          <AnimatePresence>
            {blobHovered && (
              <motion.div
                className="absolute left-1/2"
                initial={{ opacity: 0, x: "-50%" }}
                animate={{ opacity: 1, x: "-50%" }}
                exit={{ opacity: 0, x: "-50%" }}
                transition={{ duration: 0.15, ease: HEADLINE_EASE }}
                style={{
                  bottom: "calc(100% + 8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  borderRadius: 2,
                  background: "var(--color-surface-primary)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 12, lineHeight: "20px", color: "#fff", textTransform: "lowercase" }}>
                  blob coming soon
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <BlobSprite />
        </motion.span>
        <span>who engineers</span>
      </motion.div>
      <p className="text-center font-[475]" style={{ margin: 0, fontSize, color: "var(--color-text-primary)", lineHeight: 1.4 }}>
        focused on systems and execution
      </p>
    </motion.div>
  );
}

// Fixed gaps on both sides of the hero text, so the landing composition
// doesn't rely on measuring the nav's rendered height at runtime. Nav-to-hero
// is slightly larger than hero-to-card, nudging the header down a bit lower
// than dead-center between the two.
const HERO_TOP_GAP = 160;
const HERO_BOTTOM_GAP = 128;

export default function HomeTest() {
  const isMobile = useIsMobile();
  const [headlineExpanding, setHeadlineExpanding] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [cardShrunk, setCardShrunk] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showIndexPill, setShowIndexPill] = useState(false);
  const navigate = useNavigate();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroGroupRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [groupOffset, setGroupOffset] = useState(0);

  // Name plate/headline/subtext + the first (intro) card are treated as one
  // rigid block (desktop only — nav itself doesn't move, this is just the
  // hero copy and the card): the delta below centers the TEXT specifically
  // (heroTextRef, not the group as a whole), and the card is carried along
  // by that exact same amount rather than being independently centered —
  // "lowered the same amount as the text." Both rise to their real resting
  // positions (y: 0) the instant the card starts its reveal. useLayoutEffect
  // (not useEffect) so there's no flash of the group at its natural position
  // before this applies.
  useLayoutEffect(() => {
    if (isMobile) {
      setGroupOffset(0);
      return;
    }
    const measure = () => {
      const el = heroTextRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // heroTextRef's own box includes its paddingTop: HERO_TOP_GAP — without
      // subtracting it back out here, "centering" the whole padded box
      // leaves the actual visible text sitting well below true center (half
      // of that box is empty padding above the real content).
      const contentTop = rect.top + HERO_TOP_GAP;
      const contentHeight = rect.height - HERO_TOP_GAP;
      const desiredTop = (window.innerHeight - contentHeight) / 2;
      setGroupOffset(desiredTop - contentTop);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 10);
      setCardShrunk(y > 50);

      // Active card = the last one whose top has crossed the viewport's
      // vertical midpoint — same "crossed the halfway line" convention
      // SectionNavigation uses for its own scroll-driven active index.
      const viewportMid = window.innerHeight * 0.5;
      let active = 0;
      let lastBottom = -Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid) active = i;
        lastBottom = Math.max(lastBottom, rect.bottom);
      });
      setActiveCardIndex(active);
      // Hidden once the page has scrolled past every card (into the lab
      // teaser/footer) — this pill only tracks the casestudy cards.
      setShowIndexPill(y > 50 && lastBottom > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introReady]);

  // Nav's own ball-into-pill morph (MainNavigation's `ballExpand`) plays in
  // lockstep with the headline's icon growing and the card's loading bar —
  // all three keyed off the same headlineExpanding moment, not the later
  // card-reveal one.
  useEffect(() => {
    if (headlineExpanding) {
      document.dispatchEvent(new CustomEvent("home:nav:expand"));
    }
  }, [headlineExpanding]);

  return (
    <div className="relative min-h-screen">

      <LinkedInButton show={introReady} navScrolled={navScrolled} />

      {/* Casestudy menu — mobile only; appears as soon as the page loads
          (introReady), matching the rest of the fixed mobile chrome
          (LinkedIn button, name plate) instead of waiting on a scroll
          gesture. Desktop's equivalent is the CasestudyIndexPill below. */}
      <MobileCasestudyNav show={introReady} />
      <CasestudyIndexPill activeIndex={activeCardIndex} total={CARD_DATA.length} show={showIndexPill} />

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1 }}>

      {/* Hero group — name plate, headline, subtext, and the first (intro)
          card, rigidly together (see groupOffset/heroTextRef above): the
          text starts vertically centered on desktop, and the card is
          lowered by that exact same amount rather than centered on its own.
          Both rise to their real resting positions the instant the card
          starts its reveal. Nav itself doesn't move. */}
      <motion.div
        ref={heroGroupRef}
        initial={{ y: 0 }}
        animate={{ y: !isMobile && !introReady ? groupOffset : 0 }}
        transition={{ duration: introReady ? CARD_REVEAL_DURATION : 0, ease: CARD_REVEAL_EASE }}
      >
      {/* Hero text — sits HERO_TOP_GAP below the nav on desktop, and
          HERO_BOTTOM_GAP above the first card below (see the card wrapper's
          marginTop) — a touch tighter, so the header sits slightly lower
          than dead-center — instead of centering itself in a measured vh
          box. All three lines share one gap-[32px] flex column so the
          spacing between them reads as even. The headline (middle line) owns
          its own intro choreography — see HeroHeadline — so it isn't gated
          on introReady like the name plate and subtext above/below it. */}
      <div
        ref={heroTextRef}
        className="w-full flex flex-col items-center gap-[32px] px-[4.5vw] md:px-0"
        style={
          isMobile
            ? { paddingTop: "calc(env(safe-area-inset-top) + 40px)", paddingBottom: 72, fontFamily: "'SF Pro Display', sans-serif" }
            : { paddingTop: HERO_TOP_GAP, fontFamily: "'SF Pro Display', sans-serif" }
        }
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: CARD_REVEAL_DURATION, ease: CARD_REVEAL_EASE }}
          className="text-[15px] md:text-[length:var(--typography-body-default-font-size)] font-regular text-center"
          style={{ margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.4 }}
        >
          Abby Hart
        </motion.p>

        <HeroHeadline isMobile={isMobile} onExpandStart={() => setHeadlineExpanding(true)} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: CARD_REVEAL_DURATION, ease: CARD_REVEAL_EASE }}
          className="text-[15px] md:text-[length:var(--typography-body-default-font-size)] font-regular text-center md:whitespace-nowrap"
          style={{ color: "var(--color-text-secondary)", lineHeight: 1.4 }}
        >
          built community interfaces w/ <GlowLink path="/casestudy/figma-rit">Figma Edu</GlowLink><br className="md:hidden" /> + relaunched <GlowLink path="/casestudy/capitol-aluminum">Capitol</GlowLink>'s brand identity
        </motion.p>
      </div>

      {/* First (intro) card — the rest of the cards live outside the hero
          group below, unaffected by its centering/rise. */}
      <div
        style={{
          paddingLeft: !isMobile && cardShrunk ? "10vw" : "4.5vw",
          paddingRight: !isMobile && cardShrunk ? "10vw" : "4.5vw",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginTop: isMobile ? 0 : HERO_BOTTOM_GAP,
        }}
      >
        <div ref={(el) => { cardRefs.current[0] = el; }} style={{ position: "relative", width: "100%" }}>
          <IntroCard data={CARD_DATA[0]} isMobile={isMobile} start={headlineExpanding} onReveal={() => setIntroReady(true)} />
        </div>
      </div>
      </motion.div>

      {/* Editorial grid — rows 2 and 3 of the same 3-column system whose
          row 1 is the intro card above (IntroCard is already full-width, so
          it doesn't need to sit inside an explicit grid to read as the
          "3/3" row). One persistent tree for the whole page lifetime,
          outside the hero group so it never shares its centering/rise.
          Fade-in just layers opacity on top once IntroCard reports back via
          onReveal. Nothing here unmounts once introReady flips, so the
          videos already playing never restart. Same horizontal padding as
          the intro card above, and the same GRID_GUTTER for every gap —
          row-to-row here and column-to-column within each row below — so
          every edge lines up on one underlying grid. Row 2/3 stack to a
          single column on mobile rather than shrinking the desktop layout
          in place; row 2's first tile keeps a wider aspect ratio there so
          the "2/3 is more prominent" hierarchy still reads even stacked. */}
      <div
        style={{
          paddingLeft: !isMobile && cardShrunk ? "10vw" : "4.5vw",
          paddingRight: !isMobile && cardShrunk ? "10vw" : "4.5vw",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginTop: GRID_GUTTER,
          marginBottom: 100,
        }}
      >
        {/* One locked grid for every cell below the hero -- Capitol
            (2/3), FigBuild (1/3), Aixels (1/3), and 2 blank cells (1/3
            each), in that order. CSS Grid auto-flows them into two rows
            (2/3+1/3, then 1/3+1/3+1/3) on its own, since they add up to
            exactly 3 columns per row. This used to be two separate grid
            containers -- one "2fr 1fr", one "1fr 1fr 1fr" -- which looks
            equivalent but isn't: with the same GRID_GUTTER, a 2-column
            template only subtracts one gap from the usable width before
            splitting it 2:1, while a 3-column template subtracts two, so
            the same visual "2/3" boundary landed at a different x position
            in each row. One grid with `repeat(3, 1fr)` and Capitol spanning
            2 columns doesn't have that seam -- every row divides the exact
            same tracks. Collapses to a single "1fr" column at the mobile
            breakpoint, stacking every cell full-width in the same order. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.33, 0, 0, 1], delay: introReady ? 0.5 : 0 }}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: GRID_GUTTER }}
        >
          <div ref={(el) => { cardRefs.current[1] = el; }} style={{ gridColumn: !isMobile ? "span 2" : undefined }}>
            <EditorialGridTile
              video={CARD_DATA[1].video}
              cover={CARD_DATA[1].cover}
              title={CARD_DATA[1].title}
              description={CARD_DATA[1].description}
              readTime={CARD_DATA[1].readTime}
              isMobile={isMobile}
              onSelect={() => navigate(CARD_DATA[1].path)}
            />
          </div>
          <div ref={(el) => { cardRefs.current[2] = el; }}>
            <EditorialGridTile
              video={CARD_DATA[2].video}
              cover={CARD_DATA[2].cover}
              title={CARD_DATA[2].title}
              description={CARD_DATA[2].description}
              readTime={CARD_DATA[2].readTime}
              aspectRatio={GRID_CELL_ASPECT_RATIO}
              isMobile={isMobile}
              onSelect={() => navigate(CARD_DATA[2].path)}
            />
          </div>
          <div ref={(el) => { cardRefs.current[3] = el; }}>
            <EditorialGridTile
              video={CARD_DATA[3].video}
              cover={CARD_DATA[3].cover}
              title={CARD_DATA[3].title}
              description={CARD_DATA[3].description}
              readTime={CARD_DATA[3].readTime}
              aspectRatio={GRID_CELL_ASPECT_RATIO}
              isMobile={isMobile}
              onSelect={() => navigate(CARD_DATA[3].path)}
            />
          </div>
          {/* Aixels is the only real casestudy left for row 3; these two
              stay intentionally blank (title + logo tile, no video/click)
              instead of being filled with unrelated lab work. */}
          {GRID_BLANK_TILES.map((title, i) => (
            <EditorialGridTile key={`blank-${i}`} title={title} aspectRatio={GRID_CELL_ASPECT_RATIO} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>

      </div> {/* end scrollable content */}

    </div>
  );
}
