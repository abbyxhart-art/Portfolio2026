import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "@/lib/motion";
import icons from "../../../assets/icons/icons.json";
import { useIsMobile } from "../ui/use-mobile";
import { RIGHT_CLUSTER_WIDTH, MOBILE_NAV_MARGIN, MAIN_NAV_ROW_CENTER } from "../layout/mobileNavLayout";
import { useLenis } from "../../context/LenisContext";

export type MiniMenuSection = { id: string; label: string };

const EASE_SYM:   [number, number, number, number] = [0.5, 0, 0.5, 1];

// Mobile entrance — keyframe times/eases lifted verbatim from the Figma
// prototype "In Page Navigation — Motion Start" (node 5348:3295), a 600ms
// one-shot reveal. Figma's prototype loops it for demo purposes; here it
// plays once whenever the nav mounts (i.e. each time it scrolls into view).
const ENTER_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];
const ENTER_SYM:      [number, number, number, number] = [0.5, 0, 0.5, 1];
const ENTER_ACCEL:    [number, number, number, number] = [0.4, 0, 1, 1];
const ENTER_DURATION = 0.6;

// Open/close — keyframe times/eases lifted verbatim from the Figma prototype
// "In Page Navigation — Motion Out" (node 5348:2822). Figma's demo runs this
// as the first half of a 600ms loop (the second half just holds the open
// state); here it's a real one-shot 300ms transition triggered by isOpen.
const OPEN_DURATION = 0.3;
const OPEN_TITLE_EASE:  [number, number, number, number] = [0.2, 0, 0.2, 1];
const OPEN_HANDLE_EASE: [number, number, number, number] = [0, 0, 0.5, 1];
// Open sheet height: 350/852 from Figma's frame (852 = iPhone 14 Pro's
// logical viewport height), applied to the real viewport instead of hardcoded.
const OPEN_HEIGHT_RATIO = 350 / 852;

// Gap (px) SectionNavigation's closed pill keeps above MobileMainNav's
// permanent row: that row's own top edge sits 58px above the viewport bottom
// (h-[110px] nav, pt-[52px] content, both unchanged), plus the requested 16px.
const SECTION_NAV_CLOSED_BOTTOM = 58 + 16;
// Fallback only, used for a single frame before viewportWidth is measured —
// the real closed width is computed so the "Back to top" pill beside it
// lands left-aligned with MobileMainNav's Social Media chip and
// right-aligned -16px from the viewport edge (see overviewWidth below).
const SECTION_NAV_CLOSED_WIDTH = 222;
// Gap (px) between the overview pill and the adjoining "Back to top" pill.
const SECTION_NAV_PILL_GAP = 4;
// Figma's own motion track for the entrance (node 5348:3313, "Section
// Navigation") animates width [34, 105.824, 259, 259] — the 259 (not the
// static layout's 222, which is a stale/unrelated value from an older
// iteration of that frame) is the true final width the mid-keyframe 105.824
// was authored against, on Figma's 430px-wide reference frame. Reused as a
// ratio so the same eased growth curve scales to whatever width the
// viewport actually computes.
const OVERVIEW_WIDTH_MID_RATIO = 105.824 / 259;
// Figma's motion track for the "Back to Top Outside Button" (node
// 5348:3342) uses this specific curve for its entrance x-offset — close to
// but distinct from ENTER_STANDARD's [0.4, 0, 0.2, 1].
const BACK_TO_TOP_X_EASE: [number, number, number, number] = [0.132, 0, 0.2, 1];

// Extra room reserved below the section list when sizing the open sheet.
// The in-sheet "Back to Top" button sits pinned to the sheet's own bottom
// edge (bottom: MAIN_NAV_ROW_CENTER - 20, i.e. ~21px up, at 40px tall) —
// independent of the section list's own flow. When a page has few enough
// sections that the Figma-ratio baseline height (OPEN_HEIGHT_RATIO) wins,
// that baseline leaves plenty of slack underneath the list for the button.
// But once a page has enough sections that the content-height floor takes
// over instead (e.g. Capitol's 8), that floor previously only added the
// list's own 16px bottom padding — not enough clearance for the button,
// which ended up overlapping/covering the last row(s).
const BACK_TO_TOP_CLEARANCE = 56;

// Desktop side nav (Figma node 5708:763, "Casestudy Menu") — real
// `position: fixed` (a JS-tracked `position: absolute` was tried and
// visibly lagged a frame behind Lenis's own scroll interpolation, causing
// a jitter/bounce; `fixed` is handled natively by the compositor instead).
const SIDE_NAV_LEFT = "5vw";
const SIDE_NAV_TOP_OFFSET = 81;

// Fallback-only duration (no real completion event exists for native
// scrollIntoView/scrollTo, used only on the rare frame before Lenis mounts)
// for how long a jump is presumed to still be in flight — see runJumpScroll.
const JUMP_FALLBACK_MS = 1000;

const cssEase = ([x1, y1, x2, y2]: [number, number, number, number]) => `cubic-bezier(${x1},${y1},${x2},${y2})`;

const RING_R = 10;
const RING_C = 2 * Math.PI * RING_R;

export default function SectionNavigation({ sections, title }: { sections: MiniMenuSection[]; title?: string }) {
  const isMobile = useIsMobile();
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  // Desktop's own visibility/position signal — kept separate from `visible`
  // (which also gates the mobile sheet and, via the effect below, force-closes
  // isOpen) so that scrolling near the page bottom doesn't force-close it.
  const [desktopVisible, setDesktopVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  // Per-section scroll progress (0-1 each), used to fill each row's ring —
  // see growSectionProgress below for the update rules.
  const [sectionProgress, setSectionProgress] = useState<number[]>(() => sections.map(() => 0));
  const [backToTopHovered, setBackToTopHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  // Theme-aware colors (CSS variables) can't be Framer `animate` targets —
  // Framer's color interpolator only understands literal rgb/rgba/hex, so a
  // `var(--...)` target just snaps instead of fading. Anywhere the design
  // fades in a themed color (mobile pill background), it's driven as a plain
  // CSS transition instead, flipped on right after mount to match Figma's
  // delay/duration for that fade.
  const [entered, setEntered] = useState(false);
  // Width/radii on the mobile pill are driven by the one-shot mount entrance
  // (keyframe arrays) until it finishes, then handed over to plain isOpen-based
  // targets for the open/close sheet transition — both need that property.
  const [entranceDone, setEntranceDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // True for the duration of a click-triggered scrollTo (section row or
  // "back to top"). While true, onScroll below still updates activeIndex
  // for highlighting, but skips writing to sectionProgress — otherwise a
  // jump from section 1 to section 3 would fly straight through section
  // 2's DOM range and mark it (and the rest of section 1) fully read
  // along the way, when the user never actually scrolled through it.
  const isJumpingRef = useRef(false);
  // Bumped on every jump and closed over by that jump's own completion
  // callback, so if a second jump starts before the first one's callback
  // fires (rapid clicks on two different rows), the stale first callback
  // can't clear isJumpingRef out from under the second jump still in flight.
  const jumpTokenRef = useRef(0);
  // Explicit start (rather than Framer's default dragListener) so a
  // pointerdown anywhere on the open sheet — not just its handle — begins
  // the drag-to-collapse gesture. A plain tap on a nested button still
  // fires that button's own onClick normally since dragControls.start only
  // engages an actual drag once the pointer moves past Framer's threshold.
  const dragControls = useDragControls();

  useEffect(() => {
    if (!visible) {
      // Only mobile's sheet should force-close on this signal — desktop's
      // dropdown has its own visibility (desktopVisible) that stays true
      // near the bottom of the page, so it never hits this branch while open.
      if (isMobile) setIsOpen(false);
      setEntered(false);
      setEntranceDone(false);
      return;
    }
    setEntered(true);
    const t = setTimeout(() => setEntranceDone(true), ENTER_DURATION * 1000);
    return () => clearTimeout(t);
  }, [visible, isMobile]);

  // Full-bleed open sheet needs the real viewport size (Framer can't tween a
  // px value to "100vw"/"100vh" — units must match on both ends of the
  // keyframe), and the open height is a proportion of viewport height —
  // 350/852 verbatim from Figma's "In Page Navigation — Motion Out" frame,
  // which is built at iPhone 14 Pro's exact logical size (393x852) — so this
  // reproduces that frame's actual proportions on whatever device it renders on.
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  useEffect(() => {
    if (!isMobile) return;
    const update = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isMobile]);

  // Safety floor only — if a page ever has enough sections to exceed the
  // Figma-proportioned sheet height, grow to fit instead of clipping content.
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const [sheetContentHeight, setSheetContentHeight] = useState(0);
  useLayoutEffect(() => {
    if (!isMobile || !sheetContentRef.current) return;
    const el = sheetContentRef.current;
    const update = () => setSheetContentHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, sections, title]);

  useEffect(() => {
    // Monotonic: a section's stored progress only ever grows toward 1, never
    // drops back down if the user scrolls back up through it — it should
    // read as "furthest point reached", not "current scroll position within
    // this section". The only way it goes back to 0 is a fresh mount (i.e.
    // leaving the page and coming back), which sectionProgress's initial
    // state already gives for free. Suppressed entirely during a
    // click-triggered jump (isJumpingRef) so flying through an intermediate
    // section's DOM range on the way to a farther one doesn't mark it read.
    const growSectionProgress = (i: number, value: number) => {
      if (isJumpingRef.current) return;
      setSectionProgress((prev) => {
        const next = Math.max(prev[i] ?? 0, value);
        return next === prev[i] ? prev : prev.map((v, idx) => (idx === i ? next : v));
      });
    };

    const onScroll = () => {
      // Read Lenis's own interpolated scroll value rather than window.scrollY:
      // Lenis animates the real scroll position across rAF frames, but the
      // native 'scroll' event it triggers can be coalesced/throttled by the
      // browser, so window.scrollY occasionally lags a frame behind — enough
      // to make the progress ring visibly stutter. lenis.scroll is the exact
      // value driving the current frame, so reading it directly (when
      // available) keeps the ring's progress perfectly in step with the
      // motion the user actually sees.
      const scrollY = lenis?.scroll ?? window.scrollY;
      const bottomMargin = 120;
      const nearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - bottomMargin;
      setVisible(scrollY > 200 && !nearBottom);

      // Desktop: pinned near the top of the viewport via real `position:
      // fixed`, so it never needs to dodge the footer the way the old
      // bottom-anchored pill did.
      setDesktopVisible(scrollY > 200);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - window.innerHeight * 0.5) {
          setActiveIndex(i);
          const p = Math.min(Math.max((scrollY - top + window.innerHeight * 0.5) / el.offsetHeight, 0), 1);
          setProgress(p);
          growSectionProgress(i, p);
          return;
        }
      }
      setActiveIndex(0);
      setProgress(0);
    };

    // Prefer Lenis's own scroll event — it fires once per rAF tick in exact
    // sync with the frame Lenis renders, whereas the native 'scroll' event
    // (used as a fallback before Lenis has mounted) can fire at an uneven
    // cadence and cause the progress ring to jitter.
    if (lenis) {
      lenis.on("scroll", onScroll);
      onScroll();
      return () => { lenis.off("scroll", onScroll); };
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, lenis]);

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

  // Locks background scroll while the mobile sheet is open — desktop's own
  // dropdown panel (which reuses this same isOpen state) is unaffected. The
  // page's scroll is driven by Lenis (App.tsx), which manages its own scroll
  // loop independent of native overflow, so CSS alone (overflow:hidden on
  // <html>/<body>) doesn't stop it — lenis.stop()/start() does the real work;
  // the CSS is kept too as a fallback for wheel/touch input Lenis doesn't
  // intercept and for the rare case Lenis hasn't mounted yet.
  useEffect(() => {
    if (!isMobile || !isOpen) return;
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
  }, [isMobile, isOpen, lenis]);

  // Routed through Lenis (when mounted) rather than the native
  // scrollIntoView/scrollTo — calling the native APIs directly fights
  // Lenis's own rAF-driven scroll loop, which is what caused the visible
  // bounce/jitter during a click-triggered jump. Shared by scrollToSection
  // and scrollToTop below so the isJumpingRef/jumpTokenRef bookkeeping
  // (see their declarations above) lives in exactly one place.
  const runJumpScroll = (target: number | string) => {
    isJumpingRef.current = true;
    const token = ++jumpTokenRef.current;
    const endJump = () => { if (jumpTokenRef.current === token) isJumpingRef.current = false; };
    if (lenis) {
      lenis.scrollTo(target, { onComplete: endJump });
    } else {
      if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(endJump, JUMP_FALLBACK_MS);
    }
  };

  const scrollToSection = (id: string) => {
    runJumpScroll(`#${id}`);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    runJumpScroll(0);
    setIsOpen(false);
  };

  // Desktop-only "Back to Top" outside button carries a Shift+E hint chip
  // (Figma node 5511:1972) mirroring MainNavigation's real Shift+A shortcut —
  // wired here so the hint isn't purely decorative.
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "E") scrollToTop();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  const statusRing = (
    <div style={{ position: "relative", flexShrink: 0, width: 24, height: 24 }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        {/* Flash: a full circle in the primary text color fades out to reveal the track/progress rings beneath. */}
        <motion.circle
          cx="12" cy="12" r={RING_R}
          fill="var(--color-text-primary)"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.19, delay: 0.238, ease: EASE_SYM }}
        />
        <circle
          cx="12" cy="12" r={RING_R}
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.5"
          opacity={0.2}
        />
        <circle
          key={activeIndex}
          cx="12" cy="12" r={RING_R}
          fill="none"
          stroke="var(--color-text-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - progress)}
        />
      </svg>
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
          color: "var(--color-text-primary)",
          userSelect: "none",
        }}
      >
        {activeIndex + 1}
      </span>
    </div>
  );

  // ── Mobile ───────────────────────────────────────────────────────────────
  if (isMobile) {
    const closedLeft = MOBILE_NAV_MARGIN;
    const closedBottom = SECTION_NAV_CLOSED_BOTTOM;
    const openWidth = viewportWidth || SECTION_NAV_CLOSED_WIDTH;
    // Closed overview pill fills the space between the shared left margin and
    // the "Back to top" pill (itself RIGHT_CLUSTER_WIDTH wide, sitting
    // SECTION_NAV_PILL_GAP to the right), so that pill's right edge lands
    // exactly MOBILE_NAV_MARGIN from the viewport edge — mirroring
    // MobileMainNav's Social Media chip + drink cluster, which is
    // right-aligned the same way and shares RIGHT_CLUSTER_WIDTH.
    const overviewWidth = viewportWidth
      ? viewportWidth - MOBILE_NAV_MARGIN * 2 - RIGHT_CLUSTER_WIDTH - SECTION_NAV_PILL_GAP
      : SECTION_NAV_CLOSED_WIDTH;
    const openHeight = viewportHeight ? viewportHeight * OPEN_HEIGHT_RATIO : 350;
    // +32 = sheet's own 16px top/bottom padding; +BACK_TO_TOP_CLEARANCE keeps
    // the pinned Back to Top button clear of the last row; Math.max is a
    // floor only, in case a page has enough sections to need more room than
    // the Figma ratio gives.
    const sheetHeight = Math.max(openHeight, sheetContentHeight + 32 + BACK_TO_TOP_CLEARANCE, 34);

    return (
      <AnimatePresence>
        {visible && (
          <div ref={containerRef}>
            {/* Darkens the page while the sheet is open — same treatment as
                MobileMainNav's own dim treatments elsewhere.
                Visual only: the existing outside-pointerdown listener already
                closes the sheet, so this doesn't need its own click handling.
                Sits below the nav's Home/About/Lab (z-75) and above ordinary
                page content, so those links stay visible through the dim. */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="fixed inset-0"
                  style={{ background: "#000", pointerEvents: "none", zIndex: 62 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: OPEN_DURATION, ease: ENTER_STANDARD }}
                />
              )}
            </AnimatePresence>

            {/* Left: this element IS both the closed pill and, when open, the
                full-bleed bottom sheet (Figma node 5348:2822, "In Page
                Navigation — Motion Out"). Width/radii-right are driven by the
                one-shot mount entrance until it finishes, then handed to
                isOpen-based targets for the open/close transition. */}
            <motion.div
              onClick={() => { if (!isOpen) setIsOpen(true); }}
              onPointerDown={(e) => { if (isOpen) dragControls.start(e); }}
              drag={isOpen ? "y" : false}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              dragSnapToOrigin
              onDragEnd={(_e, info) => {
                if (info.offset.y > 80 || info.velocity.y > 500) setIsOpen(false);
              }}
              initial={{
                left: closedLeft, bottom: closedBottom,
                width: 34, height: 34, x: 165, y: -53,
                borderTopLeftRadius: 24, borderBottomLeftRadius: 24,
                borderTopRightRadius: 24, borderBottomRightRadius: 24,
              }}
              animate={{
                left: isOpen ? 0 : closedLeft,
                bottom: isOpen ? 0 : closedBottom,
                height: isOpen ? sheetHeight : 34,
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: isOpen ? 0 : 24,
                width: !entranceDone
                  ? [34, overviewWidth * OVERVIEW_WIDTH_MID_RATIO, overviewWidth, overviewWidth]
                  : (isOpen ? openWidth : overviewWidth),
                borderTopRightRadius: !entranceDone
                  ? [24, 5.271, 4, 4]
                  : (isOpen ? 24 : 4),
                borderBottomRightRadius: !entranceDone
                  ? [24, 5.271, 4, 4]
                  : (isOpen ? 0 : 4),
                x: [165, 170, 0, 0],
                // Drops the pill in from above on mount, landing exactly on
                // closedBottom — the same fixed value the "Back to top" pill
                // sits at the whole time — so the two end up perfectly flush.
                // Kept as a plain 0 (not omitted) once entranceDone: removing
                // a key from `animate` snaps it back to `initial` (-53) here
                // rather than freezing it in place, which is what caused the
                // pill to drift back up after settling.
                y: !entranceDone ? [-53, 0, 0] : 0,
              }}
              transition={{
                left: { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                bottom: { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                height: { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                borderTopLeftRadius: { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                borderBottomLeftRadius: { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                width: !entranceDone
                  ? { duration: ENTER_DURATION, times: [0, 0.4317, 0.8333, 1], ease: ["linear", ENTER_STANDARD, "linear"] }
                  : { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                borderTopRightRadius: !entranceDone
                  ? { duration: ENTER_DURATION, times: [0, 0.6678, 0.8333, 1], ease: [ENTER_SYM, ENTER_STANDARD, "linear"] }
                  : { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                borderBottomRightRadius: !entranceDone
                  ? { duration: ENTER_DURATION, times: [0, 0.6678, 0.8333, 1], ease: [ENTER_STANDARD, ENTER_STANDARD, "linear"] }
                  : { duration: OPEN_DURATION, ease: ENTER_STANDARD },
                x: { duration: ENTER_DURATION, times: [0, 0.3333, 0.8333, 1], ease: [ENTER_ACCEL, ENTER_STANDARD, "linear"] },
                y: { duration: ENTER_DURATION, times: [0, 0.3333, 1], ease: [ENTER_ACCEL, ENTER_STANDARD] },
              }}
              style={{
                position: "fixed",
                zIndex: 70,
                maxWidth: "100vw",
                maxHeight: "70vh",
                background: !entered
                  ? "transparent"
                  : isOpen
                    ? "linear-gradient(to bottom, var(--color-surface-layer1) 0%, var(--color-surface-primary) 100%)"
                    : "var(--color-surface-layer1)",
                transition: isOpen
                  ? `background ${OPEN_DURATION}s ${cssEase(ENTER_STANDARD)}, border-color ${OPEN_DURATION}s ${cssEase(ENTER_STANDARD)}, border-width ${OPEN_DURATION}s ${cssEase(ENTER_STANDARD)}`
                  : `background-color 200ms cubic-bezier(0.5,0,0.5,1) 200ms, border-color 200ms cubic-bezier(0.5,0,0.5,1) 200ms, border-width ${OPEN_DURATION}s ${cssEase(ENTER_STANDARD)}`,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                overflowX: "hidden",
                overflowY: isOpen ? "auto" : "hidden",
                cursor: isOpen ? "default" : "pointer",
                userSelect: "none",
                boxSizing: "border-box",
              }}
            >
              {/* Header — status ring, current section label, chevron.
                  Visible when closed; fades out as the sheet opens. */}
              <div
                style={{
                  width: overviewWidth, maxWidth: "100%", height: 34,
                  display: "flex", alignItems: "center", gap: 4, padding: "0 8px",
                  boxSizing: "border-box", flexShrink: 0,
                  pointerEvents: isOpen ? "none" : "auto",
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={!entranceDone ? { opacity: [0, 1, 1] } : { opacity: isOpen ? 0 : 1 }}
                  transition={
                    !entranceDone
                      ? { duration: ENTER_DURATION, times: [0, 0.0833, 1], ease: [ENTER_SYM, "linear"] }
                      : { duration: 0.15, ease: "easeIn" }
                  }
                >
                  {statusRing}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={
                    !entranceDone
                      ? { opacity: [0, 0, 1, 1], y: 0 }
                      : { opacity: isOpen ? 0 : 1, y: isOpen ? -9 : 0 }
                  }
                  transition={
                    !entranceDone
                      ? { opacity: { duration: ENTER_DURATION, times: [0, 0.3587, 0.5833, 1], ease: ["linear", ENTER_SYM, "linear"] } }
                      : { opacity: { duration: 0.15, ease: EASE_SYM }, y: { duration: 0.15, ease: "linear" } }
                  }
                  style={{
                    margin: 0,
                    flex: 1,
                    minWidth: 0,
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: 12,
                    lineHeight: 1,
                    color: "var(--color-text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sections[activeIndex]?.label}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -25.86 }}
                  animate={
                    !entranceDone
                      ? { opacity: [0, 0, 1, 1], x: [-25.86, -25.86, 0, 0] }
                      : { opacity: isOpen ? 0 : 1, x: isOpen ? 53 : 0 }
                  }
                  transition={
                    !entranceDone
                      ? { duration: ENTER_DURATION, times: [0, 0.7316, 0.8333, 1], ease: ["linear", ENTER_STANDARD, "linear"] }
                      : { duration: 0.1, ease: "easeIn" }
                  }
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 16, height: 16 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox={icons.navigation.chevron.viewBox}
                    fill="none"
                    style={{ transition: "transform 0.25s ease", transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
                  >
                    <path
                      d={icons.navigation.chevron.paths[0].d}
                      stroke="var(--color-text-secondary)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Sheet content — drag handle, optional title, section list,
                  back to top. Inert/invisible when closed; fades in as the
                  sheet opens. Measured to size the sheet's own height. */}
              <div
                ref={sheetContentRef}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  padding: 16,
                  boxSizing: "border-box",
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10.5 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10.5 }}
                  transition={{ duration: 0.1, delay: isOpen ? 0.2 : 0, ease: OPEN_HANDLE_EASE }}
                  style={{
                    width: 40, height: 3, borderRadius: 2,
                    background: "var(--color-surface-fill2)", margin: "0 auto 12px",
                    cursor: isOpen ? "grab" : "default",
                    touchAction: "none",
                  }}
                />

                {title && (
                  <motion.p
                    initial={{ opacity: 0, y: 17 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 17 }}
                    transition={{ duration: 0.15, delay: isOpen ? 0.15 : 0, ease: OPEN_TITLE_EASE }}
                    style={{
                      margin: "0 0 12px",
                      textAlign: "center",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 10,
                      lineHeight: 1,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {title}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, x: 25, y: 23 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 25, y: isOpen ? 0 : 23 }}
                  transition={{ duration: OPEN_DURATION, ease: ENTER_STANDARD }}
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
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
                          gap: 8,
                          padding: "8px 4px",
                          width: "100%",
                          background: isCurrent ? "var(--color-surface-fill3)" : "none",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: 12,
                          fontWeight: 400,
                          boxSizing: "border-box",
                        }}
                      >
                        <span style={{ width: 8, textAlign: "center", color: isHov ? "var(--color-text-secondary)" : "var(--color-text-tertiary)", transition: "color 150ms ease", lineHeight: 1 }}>
                          {i + 1}
                        </span>
                        <span style={{ color: isCurrent || isHov ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 150ms ease", lineHeight: 1, whiteSpace: "nowrap" }}>
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </div>

              {/* Back to top — icon-only circular button per Figma node 5348:2866,
                  pinned to the sheet's bottom-right corner rather than flowing
                  after the list, so it stays put regardless of section count. */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); scrollToTop(); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.15, delay: isOpen ? 0.15 : 0, ease: EASE_SYM }}
                style={{
                  position: "absolute",
                  right: 16,
                  // Vertically centered on the Home/About/Lab row underneath
                  // (MAIN_NAV_ROW_CENTER), not just a flat inset from the bottom.
                  bottom: MAIN_NAV_ROW_CENTER - 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 24,
                  background: "var(--color-button-default-fill)",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                <svg width="16" height="16" viewBox={icons.navigation.arrowUp.viewBox} fill="none">
                  <path
                    d={icons.navigation.arrowUp.paths[0].d}
                    stroke="var(--color-text-primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Right: persistent Back to Top pill — entrance keyframes match
                Figma node 5348:3342; fades away while the sheet above is open
                (node 5348:2869). */}
            <motion.div
              onClick={scrollToTop}
              initial={{ width: 34, x: -10, opacity: 0, borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
              animate={{
                width: [34, 34, RIGHT_CLUSTER_WIDTH, RIGHT_CLUSTER_WIDTH],
                borderTopLeftRadius: [24, 24, 4, 4],
                borderBottomLeftRadius: [24, 24, 4, 4],
                opacity: !entranceDone ? [0, 0, 1, 1] : (isOpen ? 0 : 1),
                x: !entranceDone ? [-10, -10, 0, 0] : (isOpen ? 48 : 0),
                y: isOpen ? 36 : 0,
              }}
              transition={{
                width: { duration: ENTER_DURATION, times: [0, 0.5833, 0.8333, 1], ease: ["linear", ENTER_STANDARD, "linear"] },
                borderTopLeftRadius: { duration: ENTER_DURATION, times: [0, 0.5833, 0.8333, 1], ease: ["linear", ENTER_STANDARD, "linear"] },
                borderBottomLeftRadius: { duration: ENTER_DURATION, times: [0, 0.5833, 0.8333, 1], ease: ["linear", ENTER_STANDARD, "linear"] },
                opacity: !entranceDone
                  ? { duration: ENTER_DURATION, times: [0, 0.4902, 0.5833, 1], ease: ["linear", ENTER_SYM, "linear"] }
                  : { duration: 0.1, ease: EASE_SYM },
                x: !entranceDone
                  ? { duration: ENTER_DURATION, times: [0, 0.5833, 0.8333, 1], ease: ["linear", BACK_TO_TOP_X_EASE, "linear"] }
                  : { duration: 0.1, ease: "linear" },
                y: { duration: 0.1, ease: "linear" },
              }}
              style={{
                position: "fixed",
                left: closedLeft + overviewWidth + SECTION_NAV_PILL_GAP,
                bottom: closedBottom,
                zIndex: 70,
                height: 34,
                borderTopRightRadius: 24,
                borderBottomRightRadius: 24,
                background: "var(--color-surface-layer1)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                overflow: "hidden",
                cursor: "pointer",
                userSelect: "none",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                pointerEvents: isOpen ? "none" : "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 8px", whiteSpace: "nowrap" }}>
                <svg width="16" height="16" viewBox={icons.navigation.arrowUp.viewBox} fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d={icons.navigation.arrowUp.paths[0].d}
                    stroke="var(--color-text-secondary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 1] }}
                  transition={{ duration: ENTER_DURATION, times: [0, 0.724, 0.7837, 1], ease: ["linear", "easeIn", "linear"] }}
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, lineHeight: 1, color: "var(--color-text-secondary)" }}
                >
                  Back to top
                </motion.span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────────
  // Side nav (Figma node 5708:763, "Casestudy Menu"): a fixed vertical list
  // of section rows that pops up once the page scrolls past the same
  // threshold as before — the list itself IS the nav now, no more
  // toggle/dropdown pill to open first.
  const SIDE_NAV_RISE = 12;
  const SIDE_NAV_STAGGER = 0.05;

  // Ring geometry for each row's number badge (Figma's "Progress Bar" node,
  // a 24px circle, r≈10.6) — same dasharray/dashoffset technique as the
  // mobile `statusRing` above, just driven per-row by sectionProgress[i]
  // instead of a single shared `progress` value.
  const SIDE_RING_R = 10.6;
  const SIDE_RING_C = 2 * Math.PI * SIDE_RING_R;

  return (
    <AnimatePresence>
      {desktopVisible && (
        <motion.div
          ref={containerRef}
          className="fixed z-50 flex flex-col gap-[16px]"
          style={{ left: SIDE_NAV_LEFT, top: SIDE_NAV_TOP_OFFSET }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Back to top — pinned to the top of the list (per request),
              rather than living inline inside the old toggle pill. */}
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setBackToTopHovered(true)}
            onMouseLeave={() => setBackToTopHovered(false)}
            initial={{ opacity: 0, y: SIDE_NAV_RISE }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_SYM }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox={icons.navigation.arrowUp.viewBox} fill="none">
                <path
                  d={icons.navigation.arrowUp.paths[0].d}
                  stroke={backToTopHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke 0.15s ease" }}
                />
              </svg>
            </div>
            <span style={{ fontSize: 14, lineHeight: 1, color: backToTopHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 0.15s ease" }}>
              Back to top
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, lineHeight: 1, color: backToTopHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 0.15s ease" }}>
                shift
              </span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 4, background: "var(--color-surface-fill2)", fontFamily: "'Inter Tight', sans-serif", fontSize: 12, lineHeight: 1, color: backToTopHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 0.15s ease" }}>
                E
              </span>
            </span>
          </motion.button>

          {/* Section rows — each ring fills 0% -> 100% as the user scrolls
              through that section (sectionProgress[i], monotonically grown
              by growSectionProgress in onScroll above — never decreases if
              they scroll back up, only resets on a fresh mount). A section
              that gets skipped entirely (e.g. clicking straight from
              "Overview" to "Heuristics") simply stays at 0 instead of being
              marked complete. Numbers stay visible in every state; only the
              ring fill and the text colors change. */}
          {sections.map((s, i) => {
            const isCurrent = i === activeIndex;
            const rowProgress = sectionProgress[i] ?? 0;
            const isReached = isCurrent || rowProgress > 0;
            const isHov = hoveredRow === i;
            return (
              <motion.button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                initial={{ opacity: 0, y: SIDE_NAV_RISE }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (i + 1) * SIDE_NAV_STAGGER, ease: EASE_SYM }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: 174,
                  padding: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Inter Tight', sans-serif",
                }}
              >
                <div style={{ position: "relative", flexShrink: 0, width: 24, height: 24 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                    <circle
                      cx="12" cy="12" r={SIDE_RING_R}
                      fill="none"
                      stroke="var(--color-surface-tertiary)"
                      strokeWidth="1.3"
                      opacity={isReached ? 0.3 : 0}
                      style={{ transition: "opacity 0.2s ease" }}
                    />
                    <circle
                      cx="12" cy="12" r={SIDE_RING_R}
                      fill="none"
                      stroke={isCurrent ? "var(--color-text-primary)" : "var(--color-text-secondary)"}
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeDasharray={SIDE_RING_C}
                      strokeDashoffset={SIDE_RING_C * (1 - rowProgress)}
                      opacity={isReached ? 1 : 0}
                      style={{ transition: "opacity 0.2s ease, stroke 0.15s ease" }}
                    />
                  </svg>
                  <span
                    style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10.5, lineHeight: 1,
                      color: isCurrent ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                      transition: "color 0.15s ease",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 14, lineHeight: 1, width: 130,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    color: isCurrent || isHov ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {s.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
