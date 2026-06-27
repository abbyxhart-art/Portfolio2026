import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; t: number };

const FADE_MS = 500;
const MAX_PTS = 50;
const DOT_R   = 8;

function hexToRGBA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function buildArrowImage(strokeColor: string): HTMLImageElement {
  const safe = strokeColor.replace(/#/g, "%23");
  const svg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25" stroke="${safe}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const img = new Image();
  img.src = `data:image/svg+xml,${svg}`;
  return img;
}

export default function CustomCursor() {
  const canvasRef          = useRef<HTMLCanvasElement>(null);
  const pointsRef          = useRef<Point[]>([]);
  const posRef             = useRef({ x: -100, y: -100 });
  const visibleRef         = useRef(false);
  const rafRef             = useRef(0);
  const scaleRef           = useRef(1);
  const targetScaleRef     = useRef(1);
  const arrowImgRef        = useRef<HTMLImageElement | null>(null);
  const lastArrowColorRef  = useRef<string>("");

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
      const now = Date.now();
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: now });
      if (pointsRef.current.length > MAX_PTS) {
        pointsRef.current = pointsRef.current.slice(-MAX_PTS);
      }
    };
    const onLeave  = () => { visibleRef.current = false; };
    const onEnter  = () => { visibleRef.current = true; };
    const onScale  = (e: Event) => { targetScaleRef.current = (e as CustomEvent<number>).detail; };

    document.addEventListener("mousemove",    onMove);
    document.addEventListener("mouseleave",   onLeave);
    document.addEventListener("mouseenter",   onEnter);
    document.addEventListener("cursor:scale", onScale);

    const draw = () => {
      const now   = Date.now();
      const style = getComputedStyle(document.documentElement);

      const dotColor   = style.getPropertyValue("--color-text-primary").trim()   || "#FAF9FF";
      const arrowColor = style.getPropertyValue("--color-surface-primary").trim() || "#161617";

      // Rebuild arrow SVG only when surface-primary changes (theme switch)
      if (arrowColor !== lastArrowColorRef.current) {
        lastArrowColorRef.current = arrowColor;
        arrowImgRef.current = buildArrowImage(arrowColor);
      }

      pointsRef.current = pointsRef.current.filter(p => now - p.t < FADE_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;

      // Tapered trail
      if (pts.length >= 2) {
        const n = pts.length;
        ctx.lineCap  = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < n; i++) {
          const t     = i / (n - 1);
          const age   = (now - pts[i].t) / FADE_MS;
          const alpha = Math.pow(Math.max(0, 1 - age), 2) * 0.65 * t;
          const width = Math.max(0.5, DOT_R * 2 * t);

          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x,     pts[i].y);
          ctx.strokeStyle = hexToRGBA(dotColor, alpha);
          ctx.lineWidth   = width;
          ctx.stroke();
        }
      }

      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.12;

      if (visibleRef.current) {
        const { x, y } = posRef.current;
        const r = DOT_R * scaleRef.current;

        // Dot — text/primary
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
        ctx.restore();

        // Arrow icon — surface/primary, fades in as cursor grows
        const arrowOpacity = Math.max(0, Math.min(1, (scaleRef.current - 1) / 1.5));
        if (arrowOpacity > 0.01 && arrowImgRef.current?.complete) {
          const size = r * 1.1;
          ctx.save();
          ctx.globalAlpha = arrowOpacity;
          ctx.drawImage(arrowImgRef.current, x - size / 2, y - size / 2, size, size);
          ctx.restore();
        }
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
