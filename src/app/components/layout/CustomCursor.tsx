import { useEffect, useRef, useState } from "react";

const DOT_R       = 5;
const RING_R      = 15.5;
const RING_STROKE = 1;
const RING_EASE   = 0.15;

export default function CustomCursor() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const posRef         = useRef({ x: -100, y: -100 });
  const ringPosRef     = useRef({ x: -100, y: -100 });
  const visibleRef     = useRef(false);
  const rafRef         = useRef(0);
  const scaleRef       = useRef(1);
  const targetScaleRef = useRef(1);

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
    };
    const onLeave = () => { visibleRef.current = false; };
    const onEnter = () => { visibleRef.current = true; };
    const onScale = (e: Event) => { targetScaleRef.current = (e as CustomEvent<number>).detail; };

    document.addEventListener("mousemove",    onMove);
    document.addEventListener("mouseleave",   onLeave);
    document.addEventListener("mouseenter",   onEnter);
    document.addEventListener("cursor:scale", onScale);

    const draw = () => {
      const style = getComputedStyle(document.documentElement);
      const color = style.getPropertyValue("--color-text-primary").trim() || "#FAF9FF";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.12;
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * RING_EASE;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * RING_EASE;

      if (visibleRef.current) {
        const { x, y } = posRef.current;
        const { x: rx, y: ry } = ringPosRef.current;
        const scale = scaleRef.current;

        // Ring — floats behind the dot with an eased delay
        ctx.save();
        ctx.beginPath();
        ctx.arc(rx, ry, RING_R * scale, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth   = RING_STROKE;
        ctx.stroke();
        ctx.restore();

        // Dot — tracks the cursor exactly
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
      document.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseleave",   onLeave);
      document.removeEventListener("mouseenter",   onEnter);
      document.removeEventListener("cursor:scale", onScale);
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
