import { useRef, useEffect, useState, useLayoutEffect } from "react";

const MINI_QUOTES = [
  {
    text: "What is this doing here? Do you need it? Get rid of it!",
    attribution: "Adam Smith, RIT professor",
  },
  {
    text: "We must design for how people behave",
    attribution: "Don Norman, Design of Everyday Things",
  },
  {
    text: "Design is how to stop being lost.",
    attribution: "Mike Minerva, RIT professor",
  },
  {
    text: "Think about what you owe people in your designs",
    attribution: "Hye Jin Nae, RIT Professor",
  },
  {
    text: "Your willingness to do it will distinguish you all the more.",
    attribution: "Geoff Colvin, Talent is Overrated",
  },
];

const SCROLL_SPEED = 0.25; // px per frame at 60fps
const QUOTE_GAP = 20;

export default function EthosMiniCard() {
  const posRef = useRef(0);
  const halfHeightRef = useRef(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const quoteIdxRef = useRef(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const getQuoteIdx = (): number => {
    const inner = innerRef.current;
    if (!inner) return 0;
    const items = inner.querySelectorAll("[data-quote-item]");
    const pos = posRef.current % halfHeightRef.current;
    let cumulative = 0;
    for (let i = 0; i < MINI_QUOTES.length; i++) {
      const el = items[i] as HTMLElement | undefined;
      if (!el) break;
      cumulative += el.offsetHeight + QUOTE_GAP;
      if (pos < cumulative) return i;
    }
    return 0;
  };

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    halfHeightRef.current = inner.scrollHeight / 2;
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measureId = requestAnimationFrame(() => {
      halfHeightRef.current = inner.scrollHeight / 2;
    });

    const animate = () => {
      posRef.current += SCROLL_SPEED;

      const half = halfHeightRef.current;
      if (half > 0 && posRef.current >= half) {
        posRef.current -= half;
      }

      inner.style.transform = `translateY(-${posRef.current}px)`;

      const newIdx = getQuoteIdx();
      if (newIdx !== quoteIdxRef.current) {
        quoteIdxRef.current = newIdx;
        setQuoteIdx(newIdx);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(measureId);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="relative rounded-[12px] overflow-hidden select-none"
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(88,85,100,0.15)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {/* Fixed header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, padding: "10px 12px 0" }}>
        <div className="flex items-center justify-between">
          <p className="font-['Inter_Tight',sans-serif] leading-none text-foreground" style={{ fontSize: 12 }}>
            Ethos
          </p>
          <p className="font-['Inter_Tight',sans-serif] leading-none text-muted-foreground" style={{ fontSize: 10 }}>
            {quoteIdx + 1}/{MINI_QUOTES.length}
          </p>
        </div>
      </div>

      {/* Scrolling quotes area — masked so text fades in/out at the top and bottom edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 26%, black 88%, transparent 100%)",
        }}
      >
        <div
          ref={innerRef}
          style={{ padding: "34px 12px 0", display: "flex", flexDirection: "column", gap: QUOTE_GAP, willChange: "transform" }}
        >
          {[...MINI_QUOTES, ...MINI_QUOTES].map((q, i) => (
            <div key={i} data-quote-item className="flex flex-col gap-[4px] shrink-0">
              <p
                className="font-['Inter_Tight',sans-serif] text-foreground"
                style={{ fontSize: 12, lineHeight: 1.4, whiteSpace: "pre-line" }}
              >
                {q.text}
              </p>
              <p
                className="font-['Inter_Tight',sans-serif] text-muted-foreground"
                style={{ fontSize: 10, lineHeight: 1.3 }}
              >
                {q.attribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
