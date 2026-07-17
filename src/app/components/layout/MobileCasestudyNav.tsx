import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useDragControls } from "@/lib/motion";
import { useLenis } from "../../context/LenisContext";
import { CASE_STUDIES } from "../../data/casestudies";
import icons from "../../../assets/icons/icons.json";
import { STICKY_WIDGET_BOTTOM } from "./mobileNavLayout";

const VISITED_KEY = "visited_casestudies";

// ── Spawn / entrance ──────────────────────────────────────────────────────
// Figma "Casestudy Navigation — Motion" (node 5380:1158; the 430x932 frame
// itself is that file's viewport placeholder, not implemented here). Its
// "Popover Menu Casestudy" child plays a one-shot mount entrance: a small FAB
// assembles into the closed pill. Trigger text renamed from Figma's
// "Lab Navigation" placeholder to "Casestudies (N)". The Already Visited /
// Casestudies column list sits behind the pill at opacity 0 in that frame —
// Figma has no keyframes for revealing it, so the open/close toggle below
// (a separate frame) supplies that motion instead.
const SPAWN_DURATION = 0.3;
const SPAWN_EASE: [number, number, number, number] = [0.457, 0, 0.58, 1];
const SPAWN_COLOR_EASE: [number, number, number, number] = [0.5, 0, 0.5, 1];

// ── Open / close ──────────────────────────────────────────────────────────
// Figma "Casestudy Navigation — Motion" (node 5341:4702) authors this as a
// COLLAPSE: open panel -> closed pill. We open in the opposite direction, so
// every keyframe pair below is that spec's initial/animate swapped — but the
// eased curve itself is reused verbatim (not time-inverted): applying the
// exact same forward ease to both directions keeps the feel ease-in/ease-out
// both ways, rather than the ease-out/ease-in a literal (mirrored) reversal
// of the curve would produce.
const TOGGLE_EASE: [number, number, number, number] = [0.457, 0, 0.58, 1];
const TOGGLE_TRANSITION = { duration: 0.3, ease: TOGGLE_EASE };

const CLOSED_HEIGHT = 40; // a little taller than Figma's 32 — no longer floats with equal margins on every side
const OPEN_HEIGHT = 311; // Figma's authored open-panel height
const WIDGET_MARGIN = 16; // left/right margin while closed; the open panel goes edge-to-edge instead

// Dark chrome, always — matches the rest of this bottom UI (MobileMainNav's
// drink/social chrome), not the light/dark theme tokens. rgb(22,22,23) is
// --color-surface-primary's dark value (#161617), reused literally rather
// than via var() for the same reason.
const SURFACE_PRIMARY_RGB = "22,22,23";

// Home page only — see MobileMainNav for the persistent Home/About/Lab chrome
// that renders on every mobile page.
export default function MobileCasestudyNav({ show }: { show: boolean }) {
  const navigate = useNavigate();
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const [fullWidth, setFullWidth] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const blockNextClickRef = useRef(false);
  const dragControls = useDragControls();

  const closedWidth = fullWidth - WIDGET_MARGIN * 2;
  const CLOSED_STATE = { bottom: STICKY_WIDGET_BOTTOM, height: CLOSED_HEIGHT, width: closedWidth, borderRadius: 24 };
  const OPEN_STATE = { bottom: 0, height: OPEN_HEIGHT, width: fullWidth, borderRadius: "12px 12px 0px 0px" };

  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  useEffect(() => {
    const update = () => setFullWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!show) {
      setEntranceDone(false);
      setIsOpen(false);
      return;
    }
    const t = setTimeout(() => setEntranceDone(true), SPAWN_DURATION * 1000);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISITED_KEY);
      if (stored) setVisited(JSON.parse(stored));
    } catch {}
  }, [isOpen]);

  // Locks background scroll while open — otherwise a drag-down gesture on the
  // sheet is ambiguous with a page-scroll gesture, and Lenis's own smooth
  // scroll (which drives this page independent of native overflow) wins,
  // swallowing the drag before Framer's drag handler sees it. Same treatment
  // as SectionNavigation's mobile sheet.
  useEffect(() => {
    if (!isOpen) return;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Tap-outside-to-close: capture phase so a tap that lands on a link/card
  // underneath the widget closes the widget instead of activating that link.
  // Mounted once (not re-attached per isOpen change): a tap fires pointerdown
  // then click as two separate native events. Two race conditions to avoid:
  // (1) re-attaching this listener on every isOpen change would tear it down
  // the instant pointerdown's setIsOpen(false) commits, leaving the trailing
  // click unblocked — solved by mounting once and reading isOpen from a ref.
  // (2) checking that same ref fresh on both events has the same failure
  // mode one step later: pointerdown flips the ref to false, so the click
  // right behind it would see isOpen already false and wave itself through.
  // blockNextClickRef bridges exactly that one gesture.
  useEffect(() => {
    const handleOutside = (e: Event) => {
      const outside = !!sheetRef.current && !sheetRef.current.contains(e.target as Node);
      if (e.type === "pointerdown") {
        if (isOpenRef.current && outside) {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen(false);
          blockNextClickRef.current = true;
        }
        return;
      }
      // click
      if (outside && (isOpenRef.current || blockNextClickRef.current)) {
        e.stopPropagation();
        e.preventDefault();
      }
      blockNextClickRef.current = false;
    };
    document.addEventListener("pointerdown", handleOutside, { capture: true });
    document.addEventListener("click", handleOutside, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", handleOutside, { capture: true });
      document.removeEventListener("click", handleOutside, { capture: true });
    };
  }, []);

  const unvisited = CASE_STUDIES.filter(cs => !visited.includes(cs.path));
  const alreadyVisited = CASE_STUDIES.filter(cs => visited.includes(cs.path));

  const labelTextStyle: React.CSSProperties = { fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: "#908e99", lineHeight: 1, margin: "0 0 16px", textAlign: "center" };
  const linkTextStyle: React.CSSProperties = { fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: "#faf9ff", lineHeight: 1, margin: 0, whiteSpace: "nowrap", cursor: "pointer", textAlign: "center" };

  return (
    <AnimatePresence>
      {show && fullWidth > 0 && [
        // Dims the page while open — reduces it to 40% (i.e. -60% opacity).
        // MobileMainNav's Home/About/Lab (z-75) and this widget (z-70) both
        // sit above this layer, so neither dims, only the scrollable page
        // content does. Visual only: the capture-phase outside-tap handler
        // above already closes the widget and blocks the tap from reaching
        // a link underneath. Each of these two is its own direct
        // AnimatePresence child (not nested in a shared wrapper) — a shared
        // opacity-animated ancestor would create its own stacking context
        // partway through the fade and trap these fixed-position, z-indexed
        // elements inside it, stacking the whole group by the *ancestor's*
        // (unset, so effectively DOM-order) position instead of their own
        // z-index — which is what made this widget paint underneath the
        // scrollable casestudy cards above it.
        <motion.div
          key="dim"
          className="md:hidden fixed inset-0 z-[69]"
          style={{ background: "#000", pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0.6 : 0 }}
          exit={{ opacity: 0 }}
          transition={TOGGLE_TRANSITION}
        />,

        <motion.div
          key="sheet"
          ref={sheetRef}
          className="md:hidden fixed"
          onPointerDown={(e) => { if (isOpen) dragControls.start(e); }}
          onClick={() => { if (!isOpen && entranceDone) setIsOpen(true); }}
          drag={isOpen ? "y" : false}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          dragSnapToOrigin
          onDragEnd={(_e, info) => {
            if (info.offset.y > 80 || info.velocity.y > 500) setIsOpen(false);
          }}
          // Starts already anchored at its resting bottom position — only
          // size/color animate in, so the spawn grows in place low on the
          // screen instead of dropping in from high up.
          initial={{ width: 38, height: 38, bottom: STICKY_WIDGET_BOTTOM, background: "rgba(48,47,52,0)", borderColor: "rgba(174,171,185,0)" }}
          // Exit (scrolling back up past the show threshold) collapses back
          // down to the same tiny FAB the spawn grew from — the reverse of
          // the entrance — rather than a plain fade. Reuses whatever
          // `transition` is current (TOGGLE_TRANSITION once settled), which
          // shares its easing/duration with the spawn anyway.
          exit={{ width: 38, height: 38, borderRadius: 24, background: "rgba(48,47,52,0)", borderColor: "rgba(174,171,185,0)", opacity: 0 }}
          animate={
            !entranceDone
              ? {
                  width: [38, closedWidth],
                  height: [38, CLOSED_HEIGHT],
                  bottom: STICKY_WIDGET_BOTTOM,
                  borderRadius: 24,
                  background: ["rgba(48,47,52,0)", "rgba(48,47,52,0.5)", "rgba(48,47,52,0.5)"],
                  borderColor: ["rgba(174,171,185,0)", "rgba(174,171,185,0.15)", "rgba(174,171,185,0.15)"],
                }
              : {
                  ...(isOpen ? OPEN_STATE : CLOSED_STATE),
                  opacity: 1,
                  background: "rgba(48,47,52,0.5)",
                  borderColor: "rgba(174,171,185,0.15)",
                }
          }
          transition={
            !entranceDone
              ? {
                  width: { duration: SPAWN_DURATION, ease: SPAWN_EASE },
                  height: { duration: SPAWN_DURATION, ease: SPAWN_EASE },
                  background: { duration: SPAWN_DURATION, times: [0, 0.11, 1], ease: [SPAWN_COLOR_EASE, "linear"] },
                  borderColor: { duration: SPAWN_DURATION, times: [0, 0.11, 1], ease: [SPAWN_COLOR_EASE, "linear"] },
                }
              : TOGGLE_TRANSITION
          }
          style={{
            left: 0,
            right: 0,
            margin: "0 auto",
            zIndex: 70,
            overflow: "hidden",
            boxSizing: "border-box",
            touchAction: "none",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            cursor: isOpen ? "default" : "pointer",
            borderStyle: "solid",
            // Border only on top once expanded.
            borderTopWidth: 0.75,
            borderRightWidth: isOpen ? 0 : 0.75,
            borderBottomWidth: isOpen ? 0 : 0.75,
            borderLeftWidth: isOpen ? 0 : 0.75,
            transition: "border-width 0.3s cubic-bezier(0.457,0,0.58,1)",
          }}
        >
          {/* Drag handle — visible while open, and briefly during the spawn
              before it settles into the closed pill (same track both times). */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={
              !entranceDone
                ? { opacity: [1, 0, 0], y: [0, -8.504, -8.504] }
                : { opacity: isOpen ? 1 : 0, y: 0 }
            }
            transition={
              !entranceDone
                ? { duration: SPAWN_DURATION, times: [0, 0.5, 1], ease: [SPAWN_COLOR_EASE, "linear"] }
                : { duration: 0.15 }
            }
            // Centered via left:50% + a fixed negative margin (half its own
            // 40px width), not a manual `transform: translateX(-50%)` — this
            // element also animates `y` via Framer, and Framer writes its own
            // `transform` for that, silently overwriting a hand-set
            // transform string rather than composing with it. margin-based
            // centering sidesteps the conflict entirely.
            style={{ position: "absolute", top: 10, left: "50%", marginLeft: -20, width: 40, height: 3, borderRadius: 2, background: "rgba(144,142,153,0.4)", pointerEvents: "none" }}
          />

          {/* Closed trigger row — text/icon 16px from each edge. */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: CLOSED_HEIGHT, padding: "0 16px", boxSizing: "border-box", pointerEvents: isOpen ? "none" : "auto" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={!entranceDone ? { opacity: [0, 0, 1, 1] } : { opacity: isOpen ? 0 : 1 }}
              transition={
                !entranceDone
                  ? { duration: SPAWN_DURATION, times: [0, 0.2494, 0.3867, 1], ease: ["linear", SPAWN_COLOR_EASE, "linear"] }
                  : { duration: 0.15 }
              }
              style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 400, color: "#faf9ff", lineHeight: 1, whiteSpace: "nowrap" }}
            >
              Casestudies ({CASE_STUDIES.length})
            </motion.span>
            <motion.svg
              width="16"
              height="16"
              viewBox={icons.navigation.chevron.viewBox}
              fill="none"
              initial={{ opacity: 0 }}
              animate={!entranceDone ? { opacity: [0, 0, 1] } : { opacity: isOpen ? 0 : 1 }}
              transition={
                !entranceDone
                  ? { duration: SPAWN_DURATION, times: [0, 0.8, 1], ease: ["linear", SPAWN_COLOR_EASE] }
                  : { duration: 0.15 }
              }
            >
              <path d={icons.navigation.chevron.paths[0].d} stroke="#faf9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>

          {/* Expanded content — Already Visited / Casestudies columns. */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.15 }}
                style={{ position: "absolute", left: 0, right: 0, top: 16, bottom: 0, padding: "8px 16px 16px", boxSizing: "border-box", overflow: "auto" }}
              >
                {/* Raised closer to the drag handle above; the link columns
                    below are raised too (they share this block's higher
                    `top`), but only slightly — this title's own larger
                    margin-bottom eats back most of that shared rise so the
                    columns don't move up nearly as much as the title does. */}
                <p style={{ textAlign: "center", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: "#908e99", lineHeight: 1, margin: "0 0 32px" }}>
                  Casestudy Navigation
                </p>
                <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
                  {alreadyVisited.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <p style={labelTextStyle}>Already Visited</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
                        {alreadyVisited.map(({ label, path }) => (
                          <p key={path} onClick={() => { navigate(path); setIsOpen(false); }} style={linkTextStyle}>
                            {label}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p style={labelTextStyle}>Casestudies</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
                      {(unvisited.length > 0 ? unvisited : CASE_STUDIES).map(({ label, path }) => (
                        <p key={path} onClick={() => { navigate(path); setIsOpen(false); }} style={linkTextStyle}>
                          {label}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom gradient — blends into surface/primary toward the bottom
              edge once open, so MobileMainNav's Home/About/Lab (rendered
              above this at z-75, right where this panel's bottom edge sits)
              reads clearly against a solid backdrop instead of the plain
              translucent fill. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={TOGGLE_TRANSITION}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 96,
              pointerEvents: "none",
              background: `linear-gradient(to bottom, rgba(${SURFACE_PRIMARY_RGB},0) 0%, rgba(${SURFACE_PRIMARY_RGB},1) 100%)`,
            }}
          />
        </motion.div>,
      ]}
    </AnimatePresence>
  );
}
