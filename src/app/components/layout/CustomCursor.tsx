import { useEffect, useRef, useState } from "react";

const DOT_DEFAULT_R = 6;
const DOT_HOVER_R   = 2;
const RING_HOVER_R  = 12;
const RING_STROKE   = 1.2;
const RING_EASE     = 0.22;
const DOT_LERP      = 0.25;
const RING_PROGRESS_LERP = 0.25;

// The global `cursor: none` override (below) means computed `cursor` is
// always "none", so we can't detect pointer-cursor elements via
// getComputedStyle. Check the tag, an explicit role, the element's own
// *inline* cursor (unaffected by that global stylesheet override), or a
// Tailwind `cursor-pointer` class instead — covers both the real
// buttons/links and this codebase's many div-based clickables.
function isInteractiveElement(start: Element | null): boolean {
  let node: Element | null = start;
  let depth = 0;
  while (node && depth < 8) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName.toLowerCase();
      if (tag === "a" || tag === "button" || tag === "input" || tag === "select" || tag === "textarea" || node.getAttribute("role") === "button") {
        return true;
      }
      if (node.style.cursor === "pointer" || node.classList.contains("cursor-pointer")) {
        return true;
      }
    }
    node = node.parentElement;
    depth++;
  }
  return false;
}

export default function CustomCursor() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const posRef         = useRef({ x: -100, y: -100 });
  const ringPosRef     = useRef({ x: -100, y: -100 });
  const visibleRef     = useRef(false);
  const rafRef          = useRef(0);
  const scaleRef       = useRef(1);
  const targetScaleRef = useRef(1);
  const hoveringRef    = useRef(false);
  const dotRRef        = useRef(DOT_DEFAULT_R);
  const ringProgressRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

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
      hoveringRef.current = isInteractiveElement(document.elementFromPoint(e.clientX, e.clientY));
    };
    const onLeave = () => { visibleRef.current = false; };
    const onEnter = () => { visibleRef.current = true; };
    const onScale = (e: Event) => { targetScaleRef.current = (e as CustomEvent<number>).detail; };

    document.addEventListener("mousemove",     onMove);
    document.addEventListener("mouseleave",    onLeave);
    document.addEventListener("mouseenter",    onEnter);
    document.addEventListener("cursor:scale",  onScale);

    const draw = () => {
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue("--color-text-primary").trim() || "#FAF9FF";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.12;
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * RING_EASE;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * RING_EASE;
      dotRRef.current += (( hoveringRef.current ? DOT_HOVER_R : DOT_DEFAULT_R) - dotRRef.current) * DOT_LERP;
      ringProgressRef.current += ((hoveringRef.current ? 1 : 0) - ringProgressRef.current) * RING_PROGRESS_LERP;

      if (visibleRef.current) {
        const { x, y } = posRef.current;
        const { x: rx, y: ry } = ringPosRef.current;
        const scale = scaleRef.current;
        const ringProgress = ringProgressRef.current;

        // Ring — only visible while hovering an interactive element, fading
        // and scaling in/out via ringProgress. Trails the dot slightly via
        // its own eased position for a soft follow instead of snapping.
        if (ringProgress > 0.01) {
          ctx.save();
          ctx.globalAlpha = ringProgress;
          ctx.strokeStyle = color;
          ctx.lineWidth   = RING_STROKE;
          ctx.beginPath();
          ctx.arc(rx, ry, RING_HOVER_R * ringProgress * scale, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Dot — tracks the cursor exactly; 8px at rest, shrinks to a tiny
        // 2px dot while hovering an interactive element. Every interactive
        // element gets this same treatment — no separate "view" pill hint.
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, dotRRef.current * scale, 0, Math.PI * 2);
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
    </>
  );
}
