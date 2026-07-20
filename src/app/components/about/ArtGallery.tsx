import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { ART_CATEGORIES, GALLERY_SECTION_LABEL, GALLERY_SECTION_SUBTITLE } from "../../data/artGallery";
import EarlyDaysCard from "./EarlyDaysCard";

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
    background: "var(--color-surface-primary)",
    width: "fit-content",
    margin: "0 auto",
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

          {/* Fixed width (not flex-1/fit-content) so this column can't
              collapse during AnimatePresence's exit→enter gap, when neither
              category's grid is mounted for an instant. */}
          <div style={{ width: 4 * 260 + 3 * 22 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-[22px]"
                style={{ gridTemplateColumns: "repeat(4, 260px)" }}
              >
                {/* Always render 4 slots, even for categories with fewer
                    photos, and lay them out on fixed-width grid tracks —
                    both so the frame never "snaps" narrower for shorter
                    categories, and so it doesn't momentarily collapse
                    during the exit/enter gap between category fades. */}
                {Array.from({ length: 4 }, (_, i) => ART_CATEGORIES[activeIdx].photos[i] ?? null).map((photo, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-[11px] items-center"
                    style={{ visibility: photo ? "visible" : "hidden" }}
                  >
                    <div
                      className="rounded-[7px] overflow-hidden w-full"
                      style={{ aspectRatio: "1/1", background: "var(--color-background-page)" }}
                    >
                      {photo?.image && (
                        <img src={photo.image} alt={photo.title} loading="lazy" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <PhotoCaption tag={photo?.tag ?? ""} title={photo?.title} subtitle={photo?.subtitle ?? ""} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile: synced left menu / right scroll-pane (Figma 5382:831) ── */}
      <div className="md:hidden">
        <EarlyDaysCard />
      </div>

      {/* ── Tablet (md–xl): tabs + 2×2 squares, bordered frame ── */}
      <div className="hidden md:block xl:hidden" style={{ ...frameStyle, padding: 24 }}>
        <SectionTitle />

        <div className="flex items-center gap-[16px]" style={{ marginTop: 24 }}>
          <CategoryMenu vertical={false} />
          <NavButtons />
        </div>

        {/* Fixed width (not fit-content) so this can't collapse during
            AnimatePresence's exit→enter gap, when neither category's grid
            is mounted for an instant. */}
        <div style={{ width: 2 * 190 + 12 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid gap-[12px]"
              style={{ gridTemplateColumns: "repeat(2, 190px)", marginTop: 24 }}
            >
              {/* Always render 4 slots (2×2), even for categories with fewer
                  photos, on fixed-width grid tracks — both so the frame's size
                  stays constant when switching categories instead of
                  collapsing to fewer rows, and so it doesn't momentarily
                  shrink during the exit/enter gap between category fades. */}
              {Array.from({ length: 4 }, (_, i) => ART_CATEGORIES[activeIdx].photos[i] ?? null).map((photo, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-[11px] items-center"
                  style={{ visibility: photo ? "visible" : "hidden" }}
                >
                  <div
                    className="rounded-[7px] overflow-hidden w-full"
                    style={{ aspectRatio: "1/1", background: "var(--color-background-page)" }}
                  >
                    {photo?.image && (
                      <img src={photo.image} alt={photo.title} loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <PhotoCaption tag={photo?.tag ?? ""} title={photo?.title} subtitle={photo?.subtitle ?? ""} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
