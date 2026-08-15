import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { motion } from "@/lib/motion";
import icons from "../assets/icons/icons.json";
import { LAB_CARD_COUNT } from "../app/pages/Booth";

// Figma node 5689:739 "Main Nav Expanded" (non-home rest state) + 5689:753
// "Main Nav Collapsed" (home rest state), transitions from node 5681:4085
// "Home Navigation — Expand" (home -> other page), 5681:4637
// "Home Navigation — Collapse" (other page -> home), and 5688:1236
// "Home Navigation — Load" (first paint on the home page).
//
// Home / Lab / About are laid out with real CSS flexbox (gap + align-items:
// center) rather than Figma's per-item absolute x offsets — the Home slot's
// width tween (53 <-> 108) reflows Lab/About automatically, so their motion
// doesn't need its own x tracks.
//
// Every animated value below is a *scalar* target (never a multi-point
// keyframes array) driven purely through `transition`'s duration/delay/ease
// — deliberately, not for simplicity. Figma's raw tracks are mostly a flat
// "hold" segment followed by one real eased segment (or vice versa); that
// collapses losslessly into delay+duration+ease. Two motion-array pitfalls
// made this necessary rather than optional: (1) with `initial={false}`, a
// component that *mounts* directly into a state (e.g. landing on a non-home
// route, or first paint on "/") renders at the keyframes array's first
// literal value, not its resting (last) value — Home text was invisible on
// a fresh "/" load because its collapsed-direction array started at
// opacity 0. (2) mid-navigation, if the array's first element doesn't match
// the element's actual current rendered value, Motion snaps to it instead
// of tweening from where it really is — the Home icon/pill visibly jumped
// on the way back to "/" because its collapse array assumed a y of 0 when
// it was actually resting at the expanded offset. Scalar targets have
// neither failure mode: Motion always animates from the live current value
// to the target, and a fresh mount renders directly at the target with no
// animation.
const LABEL = {
  fontSize: 14,
  lineHeight: "20px",
  letterSpacing: 0,
} as const;

// Collapse (other page -> home) duration. Expand (home -> other page) uses
// EXPAND_DUR instead (below) — synced to match the load morph's pace so
// both "the pill reveals itself" moments (first paint, and navigating away
// from home) feel like the same motion language rather than two different
// speeds.
const DUR = 0.4;
const EASE_STD = [0.5, 0, 0.5, 1] as const;

const ROW_HEIGHT = { home: 44, other: 52 };
const PILL_HEIGHT = 36;
const PILL_WIDTH = { home: 53, other: 108 };
const ROW_GAP = 24;
const ROW_PADDING_LEFT = 8;
const ICON_SIZE = 18;
const ICON_LOCAL_LEFT = 12;
// Icon/chips park below the pill (invisible) at rest on Home, and rise to
// true vertical center — (36 - 18) / 2 = 9 — once expanded. Figma's own
// literal export lands 1px high of true center; corrected here per design
// feedback rather than copied verbatim.
const ICON_CHIPS_PARKED_TOP = 29;
const ICON_CHIPS_CENTERED_TOP = (PILL_HEIGHT - ICON_SIZE) / 2;
const ICON_CHIPS_RISE = ICON_CHIPS_CENTERED_TOP - ICON_CHIPS_PARKED_TOP;
const FRAMES_LOCAL_LEFT = 42;

// Intro-only ball -> pill morph, played once on the home page's first load
// (Home.tsx dispatches "home:nav:expand" the instant the hero headline's
// icon starts its own expand, which is what `ballExpand` flips true from).
// Figma's own Load node (5688:1236) times this over 0.4s, but the duration
// here stays 0.6s / EASE_STD to stay in lockstep with Home.tsx's
// HEADLINE_EXPAND_DURATION/HEADLINE_EASE (a separate, uncoupled file this
// task doesn't touch) — only the timing *shape* (Figma's real-growth
// fraction, 0.5025 of the timeline) is reused, scaled onto the longer
// duration. Width animates a literal 44 -> "auto" (not a hardcoded end
// pixel) so it settles on real flex-content size and later route-based
// expand/collapse tweens can keep driving it from there. Everywhere else
// `ballExpand` defaults true — already expanded, no morph.
const BALL_EXPAND_DURATION = 0.6;
const BALL_WIDTH_COLLAPSED = 44;

// The Home-pill's "reveal itself" choreography (border/icon/chips/Home-text
// fade) runs on this duration when going home -> other page — same value as
// BALL_EXPAND_DURATION, so it's paced identically to the load morph. Every
// EXPAND_DUR * fraction below keeps Figma's original relative timing shape,
// just stretched from the raw 0.4s Figma authored it at onto this duration.
const EXPAND_DUR = BALL_EXPAND_DURATION;

export default function MainNavigation({ ballExpand = true }: { ballExpand?: boolean }) {
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

  return (
    <div className="hidden md:flex justify-center w-full">
      {/* Shape/background. Width is only ever literal during the load morph
          (there's no real content to reflow from yet) and settles on
          "auto" — everywhere else it's content-sized so it stays in
          lockstep with the Home pill's own width tween with no separate
          track to keep in sync. Height is a plain smooth tween between the
          Home/other row heights (kept subtle on purpose — Figma's own
          height track is a near-instant snap, but that read as an abrupt
          jump next to the pill's own smooth width/border tween). */}
      <motion.div
        initial={false}
        animate={{
          width: ballExpand ? "auto" : BALL_WIDTH_COLLAPSED,
          height: expanded ? ROW_HEIGHT.other : ROW_HEIGHT.home,
        }}
        transition={{
          width: { duration: BALL_EXPAND_DURATION * 0.5025, ease: "linear" },
          height: { duration: expanded ? EXPAND_DUR : DUR, ease: EASE_STD },
        }}
        style={{
          position: "relative",
          borderRadius: "var(--radius-component-button)",
          background: "var(--color-button-default-fill)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: ballExpand ? 1 : 0 }}
          transition={{
            opacity: ballExpand
              ? { delay: BALL_EXPAND_DURATION * 0.2125, duration: BALL_EXPAND_DURATION * (0.5025 - 0.2125), ease: EASE_STD }
              : { duration: 0.15, ease: EASE_STD },
          }}
          className="flex items-center font-['Inter_Tight',sans-serif]"
          // height: 100% (not a literal 44/52) so this always matches the
          // outer shape's own animated height exactly, frame by frame.
          style={{ height: "100%", gap: ROW_GAP, paddingLeft: ROW_PADDING_LEFT, paddingRight: ROW_GAP }}
        >
          {/* Pill Home — 5689:740 / 5689:754. Invisible at rest on the home
              page; width holds until 37.5% then expands. Flex item (not
              absolutely positioned) so Lab/About reflow with it, and
              align-items: center on the row centers its height inside the
              row exactly, at either row height. */}
          <motion.div
            className="relative shrink-0 overflow-hidden"
            style={{
              height: PILL_HEIGHT,
              borderRadius: 24,
              // Only clickable/hoverable once expanded (icon visible) — when
              // collapsed on Home, this pill is the invisible "Home" text
              // holder and shouldn't intercept pointer events.
              pointerEvents: expanded ? "auto" : "none",
              cursor: expanded ? "pointer" : "default",
            }}
            onClick={() => expanded && navigate("/")}
            onMouseEnter={() => setHomePillHovered(true)}
            onMouseLeave={() => setHomePillHovered(false)}
            initial={false}
            // No opacity on this box itself — "Home" (below) lives inside
            // it and needs to stay fully visible when collapsed, so the
            // border/icon/frames each fade independently instead of the
            // whole box toggling opacity.
            animate={{ width: expanded ? PILL_WIDTH.other : PILL_WIDTH.home }}
            transition={{
              width: expanded
                ? { delay: EXPAND_DUR * 0.375, duration: EXPAND_DUR * (1 - 0.375), ease: EASE_STD }
                : { duration: DUR, ease: EASE_STD },
            }}
          >
            {/* Hover fill — button/hover, same value as layer2 — only shows
                once the pill is actually interactive (expanded/off-home). */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "var(--color-button-default-hover-fill)",
                opacity: expanded && homePillHovered ? 1 : 0,
                transition: "opacity var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)",
              }}
            />
            {/* Border on a dedicated non-motion overlay so Framer's per-frame
                style writes can't interfere with it. Figma binds this to
                border/default; matching the token's own resolved alpha
                (0.2) rather than the raw 0.15 the export carries, so it
                stays in step with the design system if that token changes. */}
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                inset: 0,
                borderRadius: 24,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: expanded ? "var(--color-border-default)" : "rgba(174,171,185,0)",
                transition: expanded
                  ? `border-color ${EXPAND_DUR * 0.125}s cubic-bezier(0.5,0,0.5,1) ${EXPAND_DUR * 0.375}s`
                  : "border-color 0.4s cubic-bezier(0.5,0,0.5,1) 0s",
              }}
            />
            {/* Home Icon — 5689:741 / 5689:755: constant local left, rises
                into true vertical center as it fades in. */}
            <motion.span
              className="absolute"
              style={{ left: ICON_LOCAL_LEFT, top: ICON_CHIPS_PARKED_TOP, width: ICON_SIZE, height: ICON_SIZE }}
              initial={false}
              animate={{
                opacity: expanded ? 1 : 0,
                y: expanded ? ICON_CHIPS_RISE : 0,
              }}
              transition={{
                opacity: expanded
                  ? { delay: EXPAND_DUR * 0.16, duration: EXPAND_DUR * (0.4975 - 0.16), ease: [0, 0, 0.2, 1] }
                  : { delay: DUR * 0.375, duration: DUR * (0.875 - 0.375), ease: [0, 0, 0.6, 1] },
                y: expanded
                  ? { delay: EXPAND_DUR * 0.16, duration: EXPAND_DUR * (0.4975 - 0.16), ease: [0, 0, 0.2, 1] }
                  : { delay: DUR * 0.375, duration: DUR * (0.875 - 0.375), ease: [0, 0, 0.6, 1] },
              }}
            >
              <svg width={ICON_SIZE} height={ICON_SIZE} viewBox={home.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d={home.paths[0].d}
                  stroke={homePillHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)" }}
                />
              </svg>
            </motion.span>
            {/* Frames (shift + A) — 5689:742 / 5689:756: same rise as the
                icon, on its own slightly different curve. */}
            <motion.span
              className="absolute flex items-center"
              style={{ left: FRAMES_LOCAL_LEFT, top: ICON_CHIPS_PARKED_TOP, gap: 2, height: ICON_SIZE }}
              initial={false}
              animate={{
                opacity: expanded ? 1 : 0,
                y: expanded ? ICON_CHIPS_RISE : 0,
              }}
              transition={{
                opacity: expanded
                  ? { delay: EXPAND_DUR * 0.4975, duration: EXPAND_DUR * (1 - 0.4975), ease: [0, 0, 0.2, 1] }
                  : { delay: DUR * 0.125, duration: DUR * (0.5 - 0.125), ease: EASE_STD },
                y: expanded
                  ? { delay: EXPAND_DUR * 0.4975, duration: EXPAND_DUR * (1 - 0.4975), ease: [0, 0, 0.2, 1] }
                  : { delay: DUR * 0.125, duration: DUR * (0.5 - 0.125), ease: EASE_STD },
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{ width: 32, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)" }}
              >
                <span
                  className="text-[12px] leading-none"
                  style={{ color: homePillHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)" }}
                >
                  shift
                </span>
              </span>
              <span
                className="flex items-center justify-center shrink-0"
                style={{ width: 18, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)" }}
              >
                <span
                  className="text-[12px] leading-none"
                  style={{ color: homePillHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)" }}
                >
                  A
                </span>
              </span>
            </motion.span>
          </motion.div>

          {/* Lab — 5689:747 / 5689:761. Always visible, plain flex child —
              the row's `gap` keeps it evenly spaced from the pill and from
              About with no manual position math, in sync with the pill's
              width tween. */}
          <NavLink
            to="/lab"
            className="shrink-0 no-underline whitespace-nowrap flex items-center"
            style={({ isActive }) => ({
              ...LABEL,
              gap: 4,
              color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              transition: "color var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)",
            })}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = pathname === "/lab" ? "var(--color-text-primary)" : "var(--color-text-secondary)")}
          >
            <span>Lab</span>
            <span
              className="flex items-center justify-center shrink-0 h-[16px] px-[6px] rounded-[12px]"
              style={{ background: "var(--color-surface-layer2)" }}
            >
              <span className="text-[12px] leading-none" style={{ color: "var(--color-text-secondary)" }}>{LAB_CARD_COUNT}</span>
            </span>
          </NavLink>

          {/* About — 5689:751 / 5689:765. Always visible, plain flex child,
              last in the row — the row's paddingRight gives it the same
              edge gap as the gap between items. */}
          <NavLink
            to="/about"
            className="shrink-0 no-underline whitespace-nowrap"
            style={({ isActive }) => ({
              ...LABEL,
              color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              transition: "color var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)",
            })}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = pathname === "/about" ? "var(--color-text-primary)" : "var(--color-text-secondary)")}
          >
            About
          </NavLink>
        </motion.div>

        {/* Home — 5689:752 / 5689:766. A sibling of the row (not nested in
            Pill Home, whose own overflow-hidden and shifting width made it
            the wrong anchor) — fixed 24px from the outer shape's own edge,
            vertically centered via a static wrapper. The inner motion.span
            only carries the animated fade + rise, so it never needs to mix
            a static centering transform with Motion's own animated one. */}
        <div
          className="absolute"
          style={{ left: 24, top: "50%", transform: "translateY(-50%)", pointerEvents: expanded ? "none" : "auto" }}
        >
          <motion.span
            className="block whitespace-nowrap"
            initial={false}
            animate={{
              opacity: expanded ? 0 : 1,
              y: expanded ? -22 : 0,
            }}
            transition={{
              opacity: expanded
                ? { duration: EXPAND_DUR * 0.25, ease: [0.72, 0, 1, 1] }
                : { delay: DUR * 0.6875, duration: DUR * (1 - 0.6875), ease: [0.5, 0, 1, 1] },
              y: expanded
                ? { duration: EXPAND_DUR * 0.25, ease: [0.72, 0, 1, 1] }
                : { delay: DUR * 0.6875, duration: DUR * (1 - 0.6875), ease: [0.5, 0, 1, 1] },
            }}
          >
            <NavLink
              to="/"
              end
              className="no-underline whitespace-nowrap"
              style={({ isActive }) => ({
                ...LABEL,
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                transition: "color var(--motion-transition-interaction-duration) var(--motion-transition-interaction-easing)",
              })}
            >
              Home
            </NavLink>
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
