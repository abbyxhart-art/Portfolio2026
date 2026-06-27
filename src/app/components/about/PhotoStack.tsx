import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "@/lib/motion";

// Figma node 5224:1705 — container 200×134, cards 200×100
// Index 0 = front, index N = back
const TOPS   = [28, 20, 12,  5,  0];          // y offset (px at Figma scale)
const SCALES = [1.0, 0.93, 0.86, 0.79, 0.72]; // depth scale per position

const CARD_H_F      = 100;
const CONTAINER_H_F = 134;

interface PhotoStackProps {
  images: string[];
  captions?: string[];
  peekVisible?: boolean;
}

export default function PhotoStack({ images, captions = [], peekVisible = false }: PhotoStackProps) {
  const [stack, setStack] = useState(images.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerH, setContainerH] = useState(CONTAINER_H_F);
  const didDragRef = useRef(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setContainerH(e.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sc      = containerH / CONTAINER_H_F;
  const cardH   = CARD_H_F * sc;
  const yFor    = (pos: number) => TOPS[Math.min(pos, TOPS.length - 1)] * sc;
  const scaleFor = (pos: number) => SCALES[Math.min(pos, SCALES.length - 1)];

  const advance = () => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setStack(prev => { const [f, ...r] = prev; return [...r, f]; });
    setTimeout(() => setIsAnimating(false), 520);
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto cursor-pointer select-none"
      style={{ aspectRatio: "200/134", width: "100%", maxWidth: 520 }}
      onClick={() => {
        if (!didDragRef.current) advance();
        didDragRef.current = false;
      }}
    >
      {[...stack].reverse().map((imgIdx) => {
        const pos   = stack.indexOf(imgIdx);
        const isTop = pos === 0;

        return (
          <motion.div
            key={imgIdx}
            className="absolute left-0 w-full overflow-hidden"
            style={{
              top: 0,
              height: cardH,
              borderRadius: 8,
              background: "#201f23",
              zIndex: images.length - pos,
              transformOrigin: "top center",
            }}
            initial={false}
            animate={{
              y: peekVisible ? yFor(pos) : yFor(0),
              scale: peekVisible ? scaleFor(pos) : 1,
            }}
            transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
            drag={isTop ? "y" : false}
            dragConstraints={isTop ? { top: -9999, bottom: 10 } : undefined}
            dragElastic={isTop ? { top: 0.6, bottom: 0.5 } : undefined}
            dragMomentum={isTop ? false : undefined}
            onDragStart={isTop ? () => { didDragRef.current = false; } : undefined}
            onDrag={isTop ? (_, info) => {
              if (Math.abs(info.offset.y) > 8) didDragRef.current = true;
            } : undefined}
            onDragEnd={isTop ? (_, info) => {
              if (info.offset.y < -60 || info.velocity.y < -500) advance();
            } : undefined}
          >
            <img
              src={images[imgIdx]}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: "60%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
              }}
            />
{captions[imgIdx] && isTop && peekVisible && (
              <div
                className="absolute inset-x-0 top-0 px-[14px] py-[10px]"
                style={{ background: "none" }}
              >
                <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.4]" style={{ color: "#fff" }}>
                  {captions[imgIdx]}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
