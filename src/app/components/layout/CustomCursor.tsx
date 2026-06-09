import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; t: number };

const FADE_MS = 500;   // how long the tail lingers
const MAX_PTS = 50;    // max stored points
const DOT_R   = 8;     // main dot radius (16px diameter)

export default function CustomCursor() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const pointsRef  = useRef<Point[]>([]);
  const posRef     = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const rafRef     = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection — skip everything on touch screens
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

    // Keep canvas full-screen
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Collect mouse positions
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      visibleRef.current = true;
      const now = Date.now();
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      if (pointsRef.current.length > MAX_PTS) {
        pointsRef.current = pointsRef.current.slice(-MAX_PTS);
      }
    };
    const onLeave  = () => { visibleRef.current = false; };
    const onEnter  = () => { visibleRef.current = true; };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Draw loop — runs entirely off refs, no React state touched
    const draw = () => {
      const now = Date.now();

      // Age out old points
      pointsRef.current = pointsRef.current.filter(p => now - p.t < FADE_MS);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;

      // ── Tapered trail — drawn thin→thick so each segment's wider cap
      //    covers the previous joint, eliminating visible circles ──────────
      if (pts.length >= 2) {
        const n = pts.length;
        ctx.lineCap  = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < n; i++) {
          const t     = i / (n - 1);                          // 0 = tail, 1 = head
          const age   = (now - pts[i].t) / FADE_MS;
          const alpha = Math.pow(Math.max(0, 1 - age), 2) * 0.65 * t;
          const width = Math.max(0.5, DOT_R * 2 * t);         // ~0 → 16 px

          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth   = width;
          ctx.stroke();
        }
      }

      // ── Crisp white dot at the cursor tip ─────────────────────────────
      if (visibleRef.current) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(posRef.current.x, posRef.current.y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
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
