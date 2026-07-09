import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { ART_CATEGORIES, GALLERY_SECTION_LABEL, GALLERY_SECTION_SUBTITLE } from "../../data/artGallery";
import { useTheme } from "../../context/ThemeContext";

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ArtGallery() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeIdx, setActiveIdx] = useState(2);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = ART_CATEGORIES.length;
  const prev = () => setActiveIdx(i => (i - 1 + total) % total);
  const next = () => setActiveIdx(i => (i + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dot fill switches with theme since CSS vars can't be used inside SVG data URIs
  const dotFill = isDark ? "%23faf9ff" : "%2324232a";
  const dotPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ccircle cx='15' cy='15' r='1' fill='${dotFill}' fill-opacity='0.12'/%3E%3C/svg%3E")`;

  const NavButtons = () => (
    <div className="flex gap-[8px] items-center">
      <button
        onClick={prev}
        className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] transition-all duration-200"
        style={{ background: "var(--color-surface-fill3)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", color: "var(--color-text-primary)" }}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] transition-all duration-200"
        style={{ background: "var(--color-surface-fill3)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", color: "var(--color-text-primary)" }}
      >
        <ChevronRight />
      </button>
    </div>
  );

  const CategoryMenu = ({ vertical }: { vertical: boolean }) => (
    <div className={vertical ? "flex flex-col gap-[8px]" : "flex gap-[20px] flex-wrap"}>
      {ART_CATEGORIES.map((cat, i) => {
        const isActive = i === activeIdx;
        const isHovered = hoveredIdx === i;
        return (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex gap-[4px] items-baseline bg-transparent border-0 p-0 cursor-pointer text-left"
            style={{
              color: isActive ? "var(--color-text-primary)" : isHovered ? "var(--color-text-between)" : "var(--color-text-secondary)",
              transition: "color 0.2s ease",
            }}
          >
            <span className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.65] uppercase">
              {cat.label}
            </span>
            <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5]">
              {cat.year}
            </span>
          </button>
        );
      })}
    </div>
  );

  const SectionTitle = () => (
    <div className="flex flex-col gap-[8px] items-center text-center">
      <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
        {GALLERY_SECTION_LABEL}
      </p>
      <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
        {GALLERY_SECTION_SUBTITLE}
      </p>
    </div>
  );

  const frameStyle: React.CSSProperties = {
    border: "1px solid var(--color-border-dark)",
    borderRadius: 24,
    overflow: "hidden",
    backgroundImage: dotPattern,
    backgroundRepeat: "repeat",
    backgroundSize: "30px 30px",
  };

  const PhotoCaption = ({ tag, title, subtitle }: { tag: string; title?: string; subtitle: string }) => (
    <div className="flex flex-col gap-[4px] items-center text-center">
      <p className="font-['Inter_Tight',sans-serif] font-light text-[11px] leading-[1.5] tracking-[0.06em] uppercase" style={{ color: "var(--color-text-secondary)" }}>
        {tag}
      </p>
      <p className="font-['Inter_Tight',sans-serif] font-light text-[17px] leading-[1.65]" style={{ color: "var(--color-text-primary)", visibility: title ? "visible" : "hidden" }}>
        {title ?? " "}
      </p>
      <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
        {subtitle}
      </p>
    </div>
  );

  return (
    <>
      {/* ── xl: menu left, images right, bordered frame ── */}
      <div className="hidden xl:block" style={{ ...frameStyle, padding: 40 }}>
        <SectionTitle />

        <div className="flex gap-[40px] items-start" style={{ marginTop: 40 }}>
          <div className="flex flex-col gap-[16px] shrink-0">
            <CategoryMenu vertical />
            <NavButtons />
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex gap-[22px] w-full"
              >
                {ART_CATEGORIES[activeIdx].photos.slice(0, 4).map((photo, i) => (
                  <div key={i} className="flex flex-col gap-[11px] items-center shrink-0" style={{ width: "calc(25% - 16.5px)" }}>
                    <div
                      className="rounded-[7px] overflow-hidden w-full"
                      style={{ aspectRatio: "1/1", background: "var(--color-background-page)" }}
                    >
                      {photo.image && (
                        <img src={photo.image} alt={photo.title} loading="lazy" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <PhotoCaption tag={photo.tag} title={photo.title} subtitle={photo.subtitle} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Below xl: tabs + 2×2 squares, bordered frame ── */}
      <div className="xl:hidden" style={{ ...frameStyle, padding: 24 }}>
        <SectionTitle />

        <div className="flex items-center gap-[16px]" style={{ marginTop: 24 }}>
          <CategoryMenu vertical={false} />
          <NavButtons />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-wrap gap-[12px]"
            style={{ marginTop: 24 }}
          >
            {ART_CATEGORIES[activeIdx].photos.slice(0, 4).map((photo, i) => (
              <div key={i} className="flex flex-col gap-[11px] items-center" style={{ width: "calc(50% - 6px)" }}>
                <div
                  className="rounded-[7px] overflow-hidden w-full"
                  style={{ aspectRatio: "1/1", background: "var(--color-background-page)" }}
                >
                  {photo.image && (
                    <img src={photo.image} alt={photo.title} loading="lazy" className="w-full h-full object-cover" />
                  )}
                </div>
                <PhotoCaption tag={photo.tag} title={photo.title} subtitle={photo.subtitle} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
