import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { motion } from "@/lib/motion";
import icons from "../assets/icons/icons.json";

// Figma node 5402:981 "Navigation" — static base (unchanged layout, colors,
// typography) + the node's 0.4s motion timeline, re-fetched after the design
// was rescaled. "The Booth" is now "Lab" (shorter label): About's and Lab's
// right-anchors and the container's width were recomputed (using the real
// glyph widths from the bundled Inter Tight font) so the About↔Lab gap
// (~16.56px), Lab↔edge gap (~15.20px), and Home↔About distance all match
// their exact original pixel values instead of ballooning around the
// shorter word. Container shrinks by ~40.28px (the exact width "The Booth"
// lost becoming "Lab") in both states:
//   container 200×40 → 250×44 becomes 159.72×40 → 209.72×44 (width holds until 37.5%)
//   Pill Home (5402:984)  h 32, width 36.267 → 96 (holds until 37.5%),
//                         x 7 → 6, border fades in between 25% → 37.5%
//   Home Icon (5402:985)  18px, x -8 constant, rises y 0 → -22 (25% → 64.2%)
//   Frames    (5402:986)  shift/A chips drift (-22,-14) → (-13,-26), fade in
//                         from 37.5%
//   Home text (5402:991)  fades out y 0 → -12 in the first 25%
// Figma's hold-then-ease keyframes are expressed as delay + duration.
//
// Collapse timing comes from a separate Figma prototype — node 5420:3594/
// 3595 "Home Navigation — Out Animation" — fetched via get_motion_context.
// It is NOT a mirror of the expand timeline: expand holds each property's
// starting value, then eases in over the back portion of the 0.4s; collapse
// mostly runs hold→ease→hold with its own times/eases (a couple of tracks
// — container width, Pill border — are single full-duration eases with no
// hold at all). So every animated property below now carries two transition
// configs, picked by `expanded`. The collapse node's own pixel targets are
// off-scale (it's still keyed to "The Booth", not "Lab", and reports a
// slightly different container/pill geometry) — per instruction, only the
// *timing* (times/ease arrays) was taken from the collapse fetch; every
// keyframe *value* reuses the already-verified expand-track numbers so
// collapse and expand land on the exact same resting states.
//
// Expanded state is driven by route: expands on About/Lab/casestudy pages,
// collapses back on Home. The nav is mounted once outside the route outlet
// (see routes.tsx) and never remounts on navigation, so this is a plain
// prop-driven transition, not a re-mount.
const LABEL = {
  fontSize: 14,
  lineHeight: "20px",
  letterSpacing: 0,
} as const;

const DUR = 0.4;
const EASE_STD = [0.5, 0, 0.5, 1] as const;

const linkColor = (isActive: boolean) => ({
  color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
  transition: "color 0.2s",
});

// Lab/About sit in a flex row with this as both the gap between them and
// the padding to the container's right edge, so those two gaps are exactly
// equal by construction regardless of each label's actual glyph width (no
// more guessing at per-label right-anchors). The pill-to-Lab gap is made to
// match too by measuring the row's real rendered width and sizing the
// expanded container around it (below), instead of a hardcoded magic width.
const NAV_TRAILING_GAP = 16;
// Pill Home's right edge when expanded: x: 6 + width: 96 (see below).
const HOME_PILL_RIGHT_EDGE = 102;

export default function MainNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const home = icons.navigation.home;

  const expanded = !isHome;
  const [homePillHovered, setHomePillHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "A") navigate("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Real rendered width of the Lab/About row — lets the expanded container
  // size itself around it so the pill-to-Lab gap comes out to
  // NAV_TRAILING_GAP too, matching the other two exactly (see constants
  // above), without hardcoding a width tuned to one specific pair of words.
  const trailingRef = useRef<HTMLDivElement>(null);
  const [trailingWidth, setTrailingWidth] = useState(90);
  useLayoutEffect(() => {
    const el = trailingRef.current;
    if (!el) return;
    const update = () => setTrailingWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const expandedWidth = HOME_PILL_RIGHT_EDGE + NAV_TRAILING_GAP * 2 + trailingWidth;

  return (
    <div className="hidden md:flex justify-center w-full">
      <motion.div
        className="relative font-['Inter_Tight',sans-serif]"
        style={{
          borderRadius: 42,
          background: "var(--color-surface-fill4)",
          border: "1px solid var(--color-border-default)",
        }}
        initial={false}
        animate={{ width: expanded ? expandedWidth : 159.72, height: expanded ? 44 : 40 }}
        transition={{
          // Collapse (5420:3595): single full-duration ease, no hold —
          // unlike expand's hold-then-ease split. Figma's collapse track
          // didn't include height; it reuses the same full-duration tween
          // expand already uses for height, which is direction-symmetric.
          width: expanded
            ? { duration: 0.25, delay: 0.15, ease: EASE_STD }
            : { duration: DUR, ease: EASE_STD },
          height: { duration: DUR, ease: EASE_STD },
        }}
      >
        {/* Pill Home — 5402:984. Invisible at rest; width holds until 37.5%
            then expands. Centered with top/bottom auto margins — NOT the CSS
            `translate` property, which Motion claims as an independent
            transform on motion elements and resets when animating x/y (this
            is what knocked the pill and Home text out of position). Figma's
            -4px anchor + constant y 4 net out to dead center. */}
        <motion.div
          className="absolute overflow-hidden"
          style={{
            left: 0,
            // 50% of the (animating) container height minus half the 32px
            // pill = dead center at 40px and 44px alike. Plain calc — no
            // translate, no auto margins — so nothing Framer writes per
            // frame can move it.
            top: "calc(50% - 16px)",
            height: 32,
            borderRadius: 24,
            // Only clickable/hoverable once expanded (icon visible) — when
            // collapsed on Home, this pill is the invisible "Home" text
            // holder and shouldn't intercept pointer events.
            pointerEvents: expanded ? "auto" : "none",
            cursor: expanded ? "pointer" : "default",
            background: expanded && homePillHovered ? "var(--color-surface-fill2)" : "transparent",
            transition: "background 0.15s ease",
          }}
          onClick={() => expanded && navigate("/")}
          onMouseEnter={() => setHomePillHovered(true)}
          onMouseLeave={() => setHomePillHovered(false)}
          initial={false}
          animate={{ width: expanded ? 96 : 36.267, x: expanded ? 6 : 7 }}
          transition={{
            // Collapse (5420:3598): single full-duration ease, no hold.
            width: expanded
              ? { duration: 0.25, delay: 0.15, ease: [0.65, 0, 0.5, 1] }
              : { duration: DUR, ease: EASE_STD },
            x: { duration: DUR, ease: EASE_STD },
          }}
        >
          {/* Border on a dedicated non-motion overlay so Framer's per-frame
              style writes can't interfere with it. Fully opaque
              --color-border-dark (#302F34) at the end; Figma timing:
              transparent until 25% (0.1s), settled by 37.5% (0.15s).
              1px rather than Figma's 0.75 — browsers render sub-pixel border
              widths by alpha-blending the stroke, so 0.75px can never reach
              full opacity on 1x displays. */}
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: 0,
              borderRadius: 24,
              borderWidth: 1,
              borderStyle: "solid",
              // surface/fill-2 — same color as the shift/A chips, per user.
              borderColor: expanded ? "var(--color-surface-fill2)" : "rgba(144,142,153,0)",
              // Collapse (5420:3598 borderColor track): fades over the full
              // 0.4s with no delay, vs. expand's fast 0.05s reveal at 0.1s.
              transition: expanded
                ? "border-color 0.05s cubic-bezier(0.5,0,0.5,1) 0.1s"
                : "border-color 0.4s cubic-bezier(0.5,0,0.5,1) 0s",
            }}
          />
          {/* Home Icon — 5402:985: 18px, constant x -8, rises into view
              between 25% and 64.2%. Static top pre-computes Figma's
              calc(50% + 22px) - 50% of the 18px height = 50% + 13px. */}
          <motion.span
            className="absolute"
            style={{ left: 14.25, top: "calc(50% + 13px)", width: 18, height: 18 }}
            initial={false}
            animate={{
              opacity: expanded ? 1 : [1, 1, 0, 0],
              x: -8,
              y: expanded ? -22 : [-22, -22, 0, 0],
            }}
            transition={{
              // Collapse (5420:3599): hold, ease, hold — times/ease from
              // Figma; -22/0 endpoints match the expand track's scale.
              opacity: expanded
                ? { duration: 0.157, delay: 0.1, ease: [0, 0, 0.2, 1] }
                : { duration: DUR, times: [0, 0.3724, 0.8058, 1], ease: ["linear", [0, 0, 0.6, 1], "linear"] },
              y: expanded
                ? { duration: 0.157, delay: 0.1, ease: [0, 0, 0.2, 1] }
                : { duration: DUR, times: [0, 0.3724, 0.8058, 1], ease: ["linear", [0, 0, 0.6, 1], "linear"] },
            }}
          >
            <svg width="18" height="18" viewBox={home.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={home.paths[0].d}
                stroke={homePillHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 0.15s ease" }}
              />
            </svg>
          </motion.span>
          {/* Frames (shift + A) — 5402:986: fades in from 37.5% while
              drifting from (-22,-14) to (-13,-26). */}
          <motion.span
            className="absolute flex items-center"
            style={{ left: 44.25, top: 32.25, gap: 2 }}
            initial={false}
            animate={{
              opacity: expanded ? 1 : [1, 1, 0, 0],
              x: expanded ? -13 : [-13, -13, -22, -22],
              y: expanded ? -26 : [-26, -26, -14, -14],
            }}
            transition={{
              // Collapse (5420:3600): hold, ease, hold — times/ease from
              // Figma; -13/-22 and -26/-14 endpoints match the expand track.
              opacity: expanded
                ? { duration: 0.25, delay: 0.15, ease: EASE_STD }
                : { duration: DUR, times: [0, 0.1308, 0.5058, 1], ease: ["linear", EASE_STD, "linear"] },
              x: expanded
                ? { duration: 0.25, delay: 0.15, ease: EASE_STD }
                : { duration: DUR, times: [0, 0.1308, 0.5058, 1], ease: ["linear", EASE_STD, "linear"] },
              y: expanded
                ? { duration: 0.25, delay: 0.15, ease: EASE_STD }
                : { duration: DUR, times: [0, 0.1308, 0.5058, 1], ease: ["linear", EASE_STD, "linear"] },
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: 32, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)" }}
            >
              <span className="text-[12px] leading-none" style={{ color: "var(--color-text-secondary)" }}>shift</span>
            </span>
            <span
              className="flex items-center justify-center shrink-0"
              style={{ width: 18, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)" }}
            >
              <span className="text-[12px] leading-none" style={{ color: "var(--color-text-secondary)" }}>A</span>
            </span>
          </motion.span>
        </motion.div>

        {/* Home — 5402:991: fades out fast as the pill takes over. Centered
            on x = 34.5 via a zero-width flex anchor (no CSS `translate`,
            which Motion resets on motion elements when animating y). The
            motion lives on a wrapper span because Framer's style prop can't
            take NavLink's ({ isActive }) => ... form. */}
        <motion.span
          className="absolute flex justify-center"
          style={{ left: 34.5, top: "calc(50% - 10px)", width: 0 }}
          initial={false}
          animate={{
            opacity: expanded ? 0 : [0, 0, 1],
            y: expanded ? -12 : [-12, -12, 0],
          }}
          transition={{
            // Collapse (5420:3605): hold at the expanded value, then ease in
            // over the back ~31% of the timeline — Figma's times/ease; -12/0
            // endpoints match the expand track's scale.
            opacity: expanded
              ? { duration: 0.1, ease: [0.721, 0, 1, 1] }
              : { duration: DUR, times: [0, 0.6875, 1], ease: ["linear", [0.5, 0, 1, 1]] },
            y: expanded
              ? { duration: 0.1, ease: [0.721, 0, 1, 1] }
              : { duration: DUR, times: [0, 0.6875, 1], ease: ["linear", [0.5, 0, 1, 1]] },
          }}
        >
          <NavLink
            to="/"
            end
            className="no-underline whitespace-nowrap text-center"
            style={({ isActive }) => ({ ...LABEL, ...linkColor(isActive) })}
          >
            Home
          </NavLink>
        </motion.span>

        {/* Lab/About — 5402:983/5402:982 (order: Home / Lab / About), laid
            out as a flex row instead of individually right-anchored labels.
            Each NavLink is a plain flex child sized to its own text (no more
            fixed-width boxes wider than the label), and the shared `gap`
            plus the row's own `right` padding make the Lab↔About gap and
            the About↔edge gap exactly NAV_TRAILING_GAP each — the third
            (pill↔Lab) gap is matched by sizing the container around this
            row's measured width above. */}
        <div
          ref={trailingRef}
          className="absolute flex items-center whitespace-nowrap"
          style={{ right: NAV_TRAILING_GAP, top: "calc(50% - 10px)", gap: NAV_TRAILING_GAP }}
        >
          <NavLink
            to="/lab"
            className="no-underline whitespace-nowrap"
            style={({ isActive }) => ({ ...LABEL, ...linkColor(isActive) })}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = linkColor(pathname === "/lab").color)}
          >
            Lab
          </NavLink>
          <NavLink
            to="/about"
            className="no-underline whitespace-nowrap"
            style={({ isActive }) => ({ ...LABEL, ...linkColor(isActive) })}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = linkColor(pathname === "/about").color)}
          >
            About
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}
