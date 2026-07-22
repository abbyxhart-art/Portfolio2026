import { useEffect, useRef, useState } from "react";
import { motion } from "@/lib/motion";
import type { Transition, ValueTransition } from "motion/react";

const DOT_R        = 8;
const RING_MED_R   = 7;
const RING_SMALL_R = 3.5;
const RING_STROKE  = 1.2;
const RING_MED_EASE   = 0.22;
const RING_SMALL_EASE = 0.09;

type CursorVariant = "default" | "open";

// Figma node 5517:1718 — hover state for casestudy cards. The 16px resting
// dot grows into an 81x32 pill revealing an arrow-right + "View" label.
// Figma only exports the enter (rest -> open) timeline (originally 448ms,
// sped up to 275ms here); the CLOSE_* consts below are that same timeline
// time-mirrored (values/times reversed, same duration) to play back out
// on hover-leave.
const EASE = [0.5, 0, 0.5, 1] as const;

const PILL_OPEN_ANIMATE = { borderWidth: [0, 1, 1], height: [16, 32, 32], width: [16, 81, 81], background: ["#FAF9FF", "rgba(144, 142, 153, 0.2)"] };
const PILL_OPEN_TRANSITION: Transition = {
  borderWidth: { duration: 0.275, times: [0, 0.6693, 1], ease: [EASE, "linear"] },
  height:      { duration: 0.275, times: [0, 0.6693, 1], ease: "linear" },
  width:       { duration: 0.275, times: [0, 0.6693, 1], ease: "linear" },
  background:  { duration: 0.275, times: [0, 0.6693],    ease: EASE },
};

const PILL_CLOSE_ANIMATE = { borderWidth: [1, 1, 0], height: [32, 32, 16], width: [81, 81, 16], background: ["rgba(144, 142, 153, 0.2)", "rgba(144, 142, 153, 0.2)", "#FAF9FF"] };
const PILL_CLOSE_TRANSITION: Transition = {
  borderWidth: { duration: 0.275, times: [0, 0.3307, 1], ease: ["linear", EASE] },
  height:      { duration: 0.275, times: [0, 0.3307, 1], ease: "linear" },
  width:       { duration: 0.275, times: [0, 0.3307, 1], ease: "linear" },
  background:  { duration: 0.275, times: [0, 0.3307, 1], ease: ["linear", EASE] },
};

const FADE_SLIDE_OPEN_ANIMATE  = { opacity: [0, 0, 1, 1], x: [-8, -8, 0, 0], y: [-6, -6, 0, 0] };
const FADE_SLIDE_CLOSE_ANIMATE = { opacity: [1, 1, 0, 0], x: [0, 0, -8, -8], y: [0, 0, -6, -6] };

const FADE_XY_OPEN: ValueTransition  = { duration: 0.275, times: [0, 0.4061, 0.6693, 1], ease: "linear" };
const FADE_XY_CLOSE: ValueTransition = { duration: 0.275, times: [0, 0.3307, 0.5939, 1], ease: "linear" };

const ARROW_OPEN_TRANSITION: Transition  = { opacity: { duration: 0.275, times: [0, 0.3614, 0.6693, 1], ease: ["linear", EASE, "linear"] }, x: FADE_XY_OPEN,  y: FADE_XY_OPEN };
const TEXT_OPEN_TRANSITION: Transition   = { opacity: { duration: 0.275, times: [0, 0.357,  0.6693, 1], ease: ["linear", EASE, "linear"] }, x: FADE_XY_OPEN,  y: FADE_XY_OPEN };
const ARROW_CLOSE_TRANSITION: Transition = { opacity: { duration: 0.275, times: [0, 0.3307, 0.6386, 1], ease: ["linear", EASE, "linear"] }, x: FADE_XY_CLOSE, y: FADE_XY_CLOSE };
const TEXT_CLOSE_TRANSITION: Transition  = { opacity: { duration: 0.275, times: [0, 0.3307, 0.643,  1], ease: ["linear", EASE, "linear"] }, x: FADE_XY_CLOSE, y: FADE_XY_CLOSE };

function CursorViewHint({
  active,
  posRef,
  visibleRef,
  onMountedChange,
}: {
  active: boolean;
  posRef: React.MutableRefObject<{ x: number; y: number }>;
  visibleRef: React.MutableRefObject<boolean>;
  onMountedChange: (mounted: boolean) => void;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  useEffect(() => {
    onMountedChange(mounted);
  }, [mounted, onMountedChange]);

  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const update = () => {
      if (elRef.current) {
        const { x, y } = posRef.current;
        elRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
        elRef.current.style.opacity   = visibleRef.current ? "1" : "0";
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mounted, posRef, visibleRef]);

  if (!mounted) return null;

  return (
    <div ref={elRef} className="fixed top-0 left-0 pointer-events-none z-[9999]" style={{ width: 81, height: 32 }}>
      {/* Cursor — 5517:1721 */}
      <motion.div
        className="absolute top-0 left-0 overflow-clip"
        style={{
          borderStyle: "solid",
          borderColor: "rgba(174,171,185,0.15)",
          borderRadius: 24,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        initial={{ borderWidth: 0, height: 16, width: 16, background: "#FAF9FF" }}
        animate={active ? PILL_OPEN_ANIMATE : PILL_CLOSE_ANIMATE}
        transition={active ? PILL_OPEN_TRANSITION : PILL_CLOSE_TRANSITION}
        onAnimationComplete={() => { if (!active) setMounted(false); }}
      >
        {/* arrow-right — 5517:1728 */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: 9, top: 6, width: 18, height: 18 }}
          initial={{ opacity: 0, x: -8, y: -6 }}
          animate={active ? FADE_SLIDE_OPEN_ANIMATE : FADE_SLIDE_CLOSE_ANIMATE}
          transition={active ? ARROW_OPEN_TRANSITION : ARROW_CLOSE_TRANSITION}
        >
          <div className="absolute" style={{ inset: "20.83%" }}>
            <div className="absolute" style={{ inset: "-7.14%" }}>
              <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 6H11.25M6 11.25L11.25 6L6 0.75" stroke="#FAF9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
        {/* View — 5517:1726 */}
        <motion.p
          className="absolute m-0 whitespace-nowrap"
          style={{ left: 36, top: 4, fontFamily: "'Inter Tight', sans-serif", fontSize: 14, lineHeight: 1.5, color: "#FFFFFF" }}
          initial={{ opacity: 0, x: -8, y: -6 }}
          animate={active ? FADE_SLIDE_OPEN_ANIMATE : FADE_SLIDE_CLOSE_ANIMATE}
          transition={active ? TEXT_OPEN_TRANSITION : TEXT_CLOSE_TRANSITION}
        >
          View
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function CustomCursor() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const posRef         = useRef({ x: -100, y: -100 });
  const ringMedPosRef   = useRef({ x: -100, y: -100 });
  const ringSmallPosRef = useRef({ x: -100, y: -100 });
  const visibleRef     = useRef(false);
  const rafRef         = useRef(0);
  const scaleRef       = useRef(1);
  const targetScaleRef = useRef(1);
  const hintMountedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [variant, setVariant]   = useState<CursorVariant>("default");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
    };
    const onLeave = () => { visibleRef.current = false; };
    const onEnter = () => { visibleRef.current = true; };
    const onScale = (e: Event) => { targetScaleRef.current = (e as CustomEvent<number>).detail; };
    const onVariant = (e: Event) => {
      const next = (e as CustomEvent<string>).detail as CursorVariant;
      setVariant(next === "open" ? "open" : "default");
    };

    document.addEventListener("mousemove",     onMove);
    document.addEventListener("mouseleave",    onLeave);
    document.addEventListener("mouseenter",    onEnter);
    document.addEventListener("cursor:scale",  onScale);
    document.addEventListener("cursor:variant", onVariant);

    const draw = () => {
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue("--color-text-primary").trim() || "#FAF9FF";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.12;
      ringMedPosRef.current.x += (posRef.current.x - ringMedPosRef.current.x) * RING_MED_EASE;
      ringMedPosRef.current.y += (posRef.current.y - ringMedPosRef.current.y) * RING_MED_EASE;
      ringSmallPosRef.current.x += (posRef.current.x - ringSmallPosRef.current.x) * RING_SMALL_EASE;
      ringSmallPosRef.current.y += (posRef.current.y - ringSmallPosRef.current.y) * RING_SMALL_EASE;

      if (visibleRef.current && !hintMountedRef.current) {
        const { x, y } = posRef.current;
        const { x: mx, y: my } = ringMedPosRef.current;
        const { x: sx, y: sy } = ringSmallPosRef.current;
        const scale = scaleRef.current;

        // Rings — drag behind the dot at different eased delays; the
        // smallest ring has the slowest ease so it trails the most. Both
        // are smaller than the dot, so once they catch up at rest they sit
        // hidden inside its fill
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth   = RING_STROKE;

        ctx.beginPath();
        ctx.arc(mx, my, RING_MED_R * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, RING_SMALL_R * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Dot — tracks the cursor exactly, largest of the three
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, DOT_R * scale, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove",     onMove);
      document.removeEventListener("mouseleave",    onLeave);
      document.removeEventListener("mouseenter",    onEnter);
      document.removeEventListener("cursor:scale",  onScale);
      document.removeEventListener("cursor:variant", onVariant);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
      <CursorViewHint
        active={variant === "open"}
        posRef={posRef}
        visibleRef={visibleRef}
        onMountedChange={m => { hintMountedRef.current = m; }}
      />
    </>
  );
}
