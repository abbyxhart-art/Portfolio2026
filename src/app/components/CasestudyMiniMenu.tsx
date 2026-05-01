import { useState, useEffect, useRef } from "react";
import pinIcon from "../../assets/pin-01.svg";

export type MiniMenuSection = { id: string; label: string };

const CIRCUMFERENCE = 2 * Math.PI * 13;

function PinIcon({ visible }: { visible: boolean }) {
  return (
    <img
      src={pinIcon}
      width={18} height={18}
      alt=""
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms ease", flexShrink: 0 }}
    />
  );
}

export default function CasestudyMiniMenu({ sections }: { sections: MiniMenuSection[] }) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const nearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
      setVisible(scrollY > 200 && !nearBottom);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (scrollY >= top - window.innerHeight * 0.5) {
          setActiveIndex(i);
          const p = Math.min(Math.max((scrollY - top + window.innerHeight * 0.5) / el.offsetHeight, 0), 1);
          setProgress(p);
          return;
        }
      }
      setActiveIndex(0);
      setProgress(0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // Close on outside click
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">

      {/* Expanded panel */}
      <div
        className="bg-[#faf9ff] border border-[#d1cedc] border-solid rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden"
        style={{
          width: 235,
          maxHeight: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "16px" : "0 16px",
          transition: "max-height 250ms ease, opacity 200ms ease, padding 250ms ease",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="font-['Inter_Tight',sans-serif] font-normal text-[12px] text-[#aeabb9] leading-none w-full text-left mb-6 hover:text-[#908e99] transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          Back To Top
        </button>

        {/* Section rows */}
        <div className="flex flex-col gap-1">
          {sections.map((s, i) => {
            const isCurrent = i === activeIndex;
            const isHov = hoveredRow === i;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="flex items-center justify-between py-[6px] w-full bg-transparent border-none cursor-pointer p-0 text-left"
              >
                <div className="flex gap-4 items-center font-['Inter_Tight',sans-serif] font-normal text-[14px] leading-none whitespace-nowrap">
                  <span style={{ color: isHov ? "#908e99" : "#aeabb9", transition: "color 150ms ease" }}>
                    {i + 1}
                  </span>
                  <span style={{ color: isHov ? "#232226" : "#908e99", transition: "color 150ms ease" }}>
                    {s.label}
                  </span>
                </div>
                <PinIcon visible={isCurrent} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Pill */}
      <div
        className="bg-[#faf9ff] border border-[#d1cedc] border-solid flex gap-3 items-center px-3 py-2 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] w-[235px] cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Progress ring + number */}
        <div className="relative shrink-0 size-8 flex items-center justify-center">
          <svg width="30" height="30" className="absolute" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="15" cy="15" r="13" fill="none" stroke="#e8e7f0" strokeWidth="1.5" />
            <circle
              key={activeIndex}
              cx="15" cy="15" r="13"
              fill="none"
              stroke="#232226"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              style={{ transition: "stroke-dashoffset 80ms linear" }}
            />
          </svg>
          <span className="relative font-['Inter_Tight',sans-serif] text-[14px] text-[#232226] leading-none select-none">
            {activeIndex + 1}
          </span>
        </div>

        {/* Section label */}
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[14px] text-[#232226] leading-normal flex-1 truncate">
          {sections[activeIndex]?.label}
        </p>

        {/* Chevron — fades in on hover, ^ when closed, v when open */}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0"
          style={{ opacity: hovered || isOpen ? 1 : 0, transition: "opacity 300ms ease" }}
        >
          {isOpen
            ? <path d="M4 6l4 4 4-4" stroke="#908e99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            : <path d="M4 10l4-4 4 4" stroke="#908e99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          }
        </svg>
      </div>

    </div>
  );
}
