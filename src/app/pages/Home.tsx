import { motion, AnimatePresence } from "@/lib/motion";
import { useState, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { useIsMobile } from "../components/ui/use-mobile";
import icons from "../../assets/icons/icons.json";
import { useNavigate } from "react-router";
import aixelsVideo from "../../assets/project/aixels/Aixels_1920x960_29.99fps.mp4";
import gmVideo from "../../assets/project/gentlemonster/gentlemonster-cover-01.mp4";
import figbuildVideo from "../../assets/project/figbuild/figbuild-cover-01.mp4";
import capitolVideo from "../../assets/project/capitol/Demo_1920x960_V1.mp4";
import texasIdVideo from "../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4";
import gentlemonsterCover from "../../assets/project/gentlemonster/gentlemonster-cover.jpg";
import capitolCover from "../../assets/project/capitol/captiol-cover.jpg";
import figbuildCover from "../../assets/project/figbuild/figbuild-cover.jpg";
import aixelsCover from "../../assets/project/aixels/aixels-cover.jpg";
import texasIdCover from "../../assets/project/texasid/texid-cover.jpg";

import MobileCasestudyNav from "../components/layout/MobileCasestudyNav";
import { NAV_TOP_REST, NAV_TOP_SCROLLED } from "../navPosition";

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
    description: "Building a playground for student expression",
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
  {
    title: "Texas Mobile",
    tag1: "Product Design",
    tag2: "2024",
    description: "Replacing fragmented tools into one responsive interface",
    readTime: "4 min read",
    path: "/casestudy/texas-mobile",
    video: texasIdVideo,
    cover: texasIdCover,
  },
];

// Shared "title lives inside the card" header -- Figma node 5745:642
// ("Image"): a logo-tile slot beside a title/description column, both 24px
// inset from the card's top-left corner. `showFigmaLogo` swaps the empty
// reserved-slot placeholder for a fixed 40x40 black tile with the Figma
// brand mark -- on for every real casestudy card, off for row 3's blank
// placeholder tiles (nothing to mark yet). Used by every
// card in the grid (StyledCard's Gentle Monster hero card and every
// EditorialGridTile) so the title treatment -- and the read-time animation
// -- is identical everywhere. Title and description share the body/default
// text style (size and weight both), told apart only by color -- title is
// #fff, description sits at 80% opacity. Both description and the
// hover-fade read-time below it are
// text/primary at 80% opacity (not a flat text/secondary color) -- read-time
// keeps its own smaller size and sits left-aligned with title/description
// as a third stacked line in the same column, rather than an indented row
// offset to clear the logo tile beside them.
function CardTitleBlock({ title, description, readTime, hovered, showFigmaLogo = false, brandIcon }: { title: string; description?: string; readTime?: string; hovered?: boolean; showFigmaLogo?: boolean; brandIcon?: { viewBox?: string; d?: string; background: string; transform?: string; letter?: string } }) {
  const secondaryTextColor = "rgba(252, 251, 255, 0.8)"; // --color-text-primary at 80%
  return (
    <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* This row holds only the logo + title/description -- read-time
          (when the logo is the fixed-size Figma tile) renders as a separate
          line below instead of a third child in the column here, so the
          tile centers (alignItems: "center") against just title+description
          instead of stretching to match a taller column that includes
          read-time too. Non-figma cards keep the original single-row
          layout (alignItems: "stretch") since their placeholder tile relies
          on stretching to the full column, read-time included. */}
      <div style={{ display: "flex", alignItems: showFigmaLogo ? "center" : "stretch", gap: 16 }}>
        {showFigmaLogo ? (
          /* Figma brand mark -- a fixed 40x40 surface/primary tile.
             Uses icons.json's own viewBox (0 0 24 24) unmodified -- the
             glyph itself just sits off-center within that box (bounding
             box x:[0.75,14.75], y:[0.75,21.75], not symmetric around the
             24x24 center), so instead of cropping the viewBox, the path's
             own transform recenters its bounding-box center (7.75, 11.25)
             onto the viewBox's actual center (12, 12) -- a (4.25, 0.75)
             shift. */
          <div style={{ width: 40, height: 40, borderRadius: 8, background: brandIcon ? brandIcon.background : "#4E4AFD", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {brandIcon ? (
              brandIcon.letter ? (
                <span style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: 18, fontWeight: 600, lineHeight: 1, color: "#fff" }}>
                  {brandIcon.letter}
                </span>
              ) : brandIcon.d ? (
                <svg width="60%" height="60%" viewBox={brandIcon.viewBox} xmlns="http://www.w3.org/2000/svg">
                  <path d={brandIcon.d} fill="#fff" transform={brandIcon.transform} />
                </svg>
              ) : null
            ) : (
              <svg width="60%" height="60%" viewBox={icons.brands.figma.viewBox} xmlns="http://www.w3.org/2000/svg">
                <path transform="translate(4.25, 0.75)" d={icons.brands.figma.paths[0].d} stroke="#fff" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
        ) : (
          /* Logo tile -- reserved slot for a future per-project mark, not
             wired up yet. Square (aspect-ratio: 1/1), height stretched to
             match the title+description+read-time column's own height
             (align-items: stretch above) with width following from that
             via the aspect ratio. */
          <div style={{ aspectRatio: "1 / 1", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", flexShrink: 0 }} />
        )}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0, minWidth: 0, maxWidth: "min(480px, 100%)" }}>
          <p style={{ margin: 0, color: "#fff", fontSize: "var(--typography-body-default-font-size)", fontWeight: "var(--typography-body-default-font-weight)", lineHeight: 1.4 }}>{title}</p>
          {description && (
            <p style={{ margin: 0, marginTop: -2, color: secondaryTextColor, fontSize: "var(--typography-body-default-font-size)", fontWeight: 400, lineHeight: 1.4 }}>
              {description}
            </p>
          )}
          {!showFigmaLogo && readTime && (
            <motion.p
              animate={hovered ? "visible" : "hidden"}
              initial="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
              style={{ margin: 0, color: secondaryTextColor, fontSize: 12, fontWeight: 400, lineHeight: 1.4, whiteSpace: "nowrap" }}
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
      </div>
      {/* Read-time, Figma-tile cards only -- a separate line below the row
          above, marginLeft matched to that row's fixed 40px tile + 16px gap
          so it still lands flush under title/description's left edge. */}
      {showFigmaLogo && readTime && (
        <motion.p
          animate={hovered ? "visible" : "hidden"}
          initial="hidden"
          variants={{ visible: { transition: { staggerChildren: 0.03 } }, hidden: {} }}
          style={{ margin: 0, marginLeft: 56, color: secondaryTextColor, fontSize: 12, fontWeight: 400, lineHeight: 1.4, whiteSpace: "nowrap" }}
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

// StyledCard is only ever used for CARD_DATA[0] (Gentle Monster) now, as the
// 2/3-width cell beside IntroCard's secondCard. Like Capitol's 2/3 cell in
// the row below, it gets no fixed height of its own -- it stretches
// (height: 100%) to match whatever height the row's 1/3 cell (secondCard's
// 3:4 aspect-ratio box) establishes, via the grid's own default
// align-items: stretch, so Gentle Monster's video always fills the row's
// full height instead of being capped at its own fixed value. On mobile
// there's no `height` at all: the video renders at its own natural size
// (position: static, height: auto) instead of being cover-cropped into a
// fixed box, so it keeps its real aspect ratio rather than being forced
// into a shape tuned for desktop's 3-column grid.
function StyledCard({ initialHovered = false, onInitialLeave, data, isMobile = false, showFigmaLogo, brandIcon }: { initialHovered?: boolean; onInitialLeave?: () => void; data: CardData; isMobile?: boolean; showFigmaLogo?: boolean; brandIcon?: { viewBox?: string; d?: string; background: string; transform?: string; letter?: string } }) {
  const [hovered, setHovered] = useState(initialHovered);
  const initialHoverActive = useRef(initialHovered);
  const navigate = useNavigate();
  const height = isMobile ? undefined : "100%";
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
        <video
          src={data.video}
          autoPlay
          loop
          muted
          playsInline
          style={height ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } : { position: "static", width: "100%", height: "auto", display: "block" }}
        />
      )}
      <CardTitleBlock title={data.title} description={data.description} readTime={data.readTime} hovered={hovered} showFigmaLogo={showFigmaLogo} brandIcon={brandIcon} />
    </div>
  );
}

// Shared gutter for the editorial grid below (row-to-row and column-to-
// column) so every gap in the system — vertical and horizontal — matches.
const GRID_GUTTER = 16;


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
function EditorialGridTile({ video, cover, title, description, readTime, aspectRatio, isMobile, onSelect, showFigmaLogo, brandIcon }: { video?: string; cover?: string; title: string; description?: string; readTime?: string; aspectRatio?: string; isMobile?: boolean; onSelect?: () => void; showFigmaLogo?: boolean; brandIcon?: { viewBox?: string; d?: string; background: string; transform?: string; letter?: string } }) {
  const [hovered, setHovered] = useState(false);
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
        borderRadius: "var(--radius-component-card)",
        overflow: "hidden",
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      {video ? (
        <video src={video} autoPlay loop muted playsInline style={mediaStyle} />
      ) : (
        cover && <img src={cover} alt={title} style={mediaStyle} />
      )}
      <CardTitleBlock title={title} description={description} readTime={readTime} hovered={hovered} showFigmaLogo={showFigmaLogo} brandIcon={brandIcon} />
    </div>
  );
}

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
const HEADLINE_FADE_DURATION = 0.6;
// Icon expand and the card's own loading bar share this duration and start
// at the same moment, so the two land their ends together.
const HEADLINE_EXPAND_DURATION = 0.5;
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
function IntroCard({ data, secondCard, isMobile, start, onReveal }: { data: CardData; secondCard: CardData; isMobile: boolean; start: boolean; onReveal: () => void }) {
  const [staysHovered, setStaysHovered] = useState(true);
  const navigate = useNavigate();
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
            {/* Both cards share this single face -- one flip reveals the
                pair together instead of each having its own bar. Gentle
                Monster keeps its 2/3-width hero card; the second card takes
                the remaining 1/3 column at the same 3:4 ratio every other
                grid cell uses. */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: GRID_GUTTER }}>
              <div style={{ gridColumn: !isMobile ? "span 2" : undefined }}>
                <StyledCard
                  initialHovered={staysHovered}
                  onInitialLeave={() => setStaysHovered(false)}
                  data={data}
                  isMobile={isMobile}
                  showFigmaLogo
                  brandIcon={{ viewBox: icons.brands.gentlemonster.viewBox, d: icons.brands.gentlemonster.paths[0].d, background: "var(--color-surface-primary)" }}
                />
              </div>
              <div>
                <EditorialGridTile
                  video={secondCard.video}
                  cover={secondCard.cover}
                  title={secondCard.title}
                  description={secondCard.description}
                  readTime={secondCard.readTime}
                  aspectRatio={GRID_CELL_ASPECT_RATIO}
                  isMobile={isMobile}
                  showFigmaLogo
                  onSelect={() => navigate(secondCard.path)}
                />
              </div>
            </div>
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

  // Still needs a real idle -> compact state change (not starting straight
  // at "compact") for Framer Motion's mount animation to actually run and
  // fire onAnimationComplete below -- if `animate` never changes across
  // renders, that callback never fires and `phase` gets stuck, which
  // silently stalls onExpandStart (and everything gated behind it: nav,
  // name plate, subtext, the card grid). 0ms still defers to the next tick,
  // which is enough for that, without the old 50ms's perceptible delay.
  useEffect(() => {
    const t = setTimeout(() => setPhase("compact"), 0);
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
          {/* Hover tag — small dark label floating just above whatever it
              names. */}
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
        <span>who tests ideas</span>
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

export default function Home() {
  const isMobile = useIsMobile();
  const [headlineExpanding, setHeadlineExpanding] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [cardShrunk, setCardShrunk] = useState(false);
  const navigate = useNavigate();
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
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          gesture. */}
      <MobileCasestudyNav show={introReady} />

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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: CARD_REVEAL_DURATION, ease: CARD_REVEAL_EASE }}
          className="text-[15px] md:text-[length:var(--typography-body-default-font-size)] font-regular text-center"
          style={{ margin: 0, marginTop: -24, color: "var(--color-text-secondary)", lineHeight: 1.4 }}
        >
          Site under renovation. Things may look awful.
        </motion.p>
      </div>

      {/* First (intro) card — the rest of the cards live outside the hero
          group below, unaffected by its centering/rise. */}
      <div
        style={{
          paddingLeft: !isMobile && cardShrunk ? "6vw" : "32px",
          paddingRight: !isMobile && cardShrunk ? "6vw" : "32px",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginTop: isMobile ? 0 : HERO_BOTTOM_GAP,
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <IntroCard data={CARD_DATA[0]} secondCard={CARD_DATA[2]} isMobile={isMobile} start={headlineExpanding} onReveal={() => setIntroReady(true)} />
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
          paddingLeft: !isMobile && cardShrunk ? "6vw" : "32px",
          paddingRight: !isMobile && cardShrunk ? "6vw" : "32px",
          transition: "padding 0.5s cubic-bezier(0.33,0,0,1)",
          marginTop: GRID_GUTTER,
          marginBottom: 100,
        }}
      >
        {/* One locked grid, a single row of 3: Capitol, Aixels, and Texas
            Mobile, each the same 1/3-width 3:4 tile -- no span-2 exception,
            no leftover blank row. Collapses to a single "1fr" column at the
            mobile breakpoint, stacking every cell full-width in the same
            order. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introReady ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.33, 0, 0, 1], delay: introReady ? 0.5 : 0 }}
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: GRID_GUTTER }}
        >
          <div>
            <EditorialGridTile
              video={CARD_DATA[1].video}
              cover={CARD_DATA[1].cover}
              title={CARD_DATA[1].title}
              description={CARD_DATA[1].description}
              readTime={CARD_DATA[1].readTime}
              aspectRatio={GRID_CELL_ASPECT_RATIO}
              isMobile={isMobile}
              showFigmaLogo
              brandIcon={{ background: "var(--color-surface-primary)", letter: "C" }}
              onSelect={() => navigate(CARD_DATA[1].path)}
            />
          </div>
          {/* FigBuild (CARD_DATA[2]) now lives up in the hero row, beside
              Gentle Monster (see IntroCard's secondCard) -- Aixels moves up
              into its old spot here so row 2 stays a full row of 3. */}
          <div>
            <EditorialGridTile
              video={CARD_DATA[3].video}
              cover={CARD_DATA[3].cover}
              title={CARD_DATA[3].title}
              description={CARD_DATA[3].description}
              readTime={CARD_DATA[3].readTime}
              aspectRatio={GRID_CELL_ASPECT_RATIO}
              isMobile={isMobile}
              showFigmaLogo
              // No icon exists for Aixels -- pass a brandIcon with no
              // d/letter so the tile renders blank instead of falling back
              // to the generic Figma mark (which the other two do only
              // because they have no brandIcon at all).
              brandIcon={{ background: "var(--color-surface-primary)" }}
              onSelect={() => navigate(CARD_DATA[3].path)}
            />
          </div>
          <div>
            <EditorialGridTile
              video={CARD_DATA[4].video}
              cover={CARD_DATA[4].cover}
              title={CARD_DATA[4].title}
              description={CARD_DATA[4].description}
              readTime={CARD_DATA[4].readTime}
              aspectRatio={GRID_CELL_ASPECT_RATIO}
              isMobile={isMobile}
              showFigmaLogo
              brandIcon={{ viewBox: icons.brands.texid.viewBox, d: icons.brands.texid.paths[0].d, background: "var(--color-surface-primary)" }}
              onSelect={() => navigate(CARD_DATA[4].path)}
            />
          </div>
        </motion.div>
      </div>

      </div> {/* end scrollable content */}

    </div>
  );
}
