import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ART_CATEGORIES, GALLERY_SECTION_LABEL, GALLERY_SECTION_SUBTITLE } from "../../data/artGallery";

const MENU_WIDTH = 99;

// Mobile-only "Early Days" card (Figma node 5382:831). Replaces the tab-bar
// + static grid used on tablet/desktop with a synced left menu / right
// scroll-pane: scrolling the photo column pages between categories
// (CSS scroll-snap — one collection per scroll, not a continuous slide), and
// clicking a menu title scrolls that category into view — both drive the
// same activeIdx.
export default function EarlyDaysCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const suppressObserver = useRef(false);
  const suppressTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Vertical distance between two consecutive menu item tops — the thumb's
  // fixed length, measured once from the actual rendered menu rather than
  // guessed from font metrics.
  const [itemSpacing, setItemSpacing] = useState(0);

  useLayoutEffect(() => {
    const [first, second] = menuItemRefs.current;
    if (first && second) setItemSpacing(second.offsetTop - first.offsetTop);
  }, []);

  // Pane height = the tallest category's natural content height (the 2-row,
  // 4-photo ones), measured once laid out. Every section is then held to at
  // least that height so scroll-snap always pages one full "screen" at a
  // time, and the tallest category's own bottom padding lands flush 16px
  // above the pane's true bottom edge.
  const [paneHeight, setPaneHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const measure = () => {
      const heights = sectionRefs.current.map((el) => el?.scrollHeight ?? 0);
      const max = Math.max(...heights, 0);
      if (max > 0) setPaneHeight(max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    sectionRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const idx = sectionRefs.current.findIndex((el) => el === topMost.target);
        if (idx !== -1) setActiveIdx(idx);
      },
      { root: container, threshold: 0.5 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [paneHeight]);

  const scrollToSection = (idx: number) => {
    const container = containerRef.current;
    const section = sectionRefs.current[idx];
    if (!container || !section) return;

    suppressObserver.current = true;
    setActiveIdx(idx);
    container.scrollTo({ top: section.offsetTop - container.offsetTop, behavior: "smooth" });

    clearTimeout(suppressTimeout.current);
    suppressTimeout.current = setTimeout(() => { suppressObserver.current = false; }, 600);
  };

  return (
    <div
      className="relative w-full flex flex-col"
      style={{
        border: "1px solid var(--color-border-dark)",
        borderRadius: 24,
        overflow: "hidden",
        background: "var(--color-surface-primary)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-[4px]" style={{ padding: "15px 34px 0" }}>
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[12px] leading-[1.5]" style={{ color: "var(--color-text-primary)" }}>
          {GALLERY_SECTION_LABEL}
        </p>
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[12px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
          {GALLERY_SECTION_SUBTITLE}
        </p>
      </div>

      {/* Split body: menu | divider | scrollable photo column */}
      <div className="relative flex" style={{ marginTop: 15, height: paneHeight }}>
        {/* Menu — top-aligned with the first photo row, click a title to scroll that category into view */}
        <div className="flex flex-col justify-start gap-[24px] shrink-0 whitespace-nowrap" style={{ width: MENU_WIDTH, paddingLeft: 16 }}>
          {ART_CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              ref={(el) => { menuItemRefs.current[i] = el; }}
              onClick={() => scrollToSection(i)}
              className="flex flex-col items-start gap-[4px] bg-transparent border-0 p-0 cursor-pointer text-left"
              style={{ color: activeIdx === i ? "var(--color-text-primary)" : "var(--color-text-secondary)", transition: "color 0.2s ease" }}
            >
              <span className="font-['Inter_Tight',sans-serif] font-normal text-[12px] leading-[1.5] uppercase">{cat.label}</span>
              <span className="font-['Inter_Tight',sans-serif] font-normal text-[10px] leading-[1.65] uppercase tracking-[0.09px]">{cat.year}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="shrink-0" style={{ width: 1, background: "var(--color-border-dark)" }} />

        {/* Scrollable photo column — snaps one full category at a time */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto no-scrollbar"
          style={{ paddingLeft: 16, paddingRight: 16, scrollSnapType: "y mandatory" }}
        >
          {ART_CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="flex flex-col justify-start"
              style={{ minHeight: paneHeight, scrollSnapAlign: "start", scrollSnapStop: "always" }}
            >
              <div className="grid grid-cols-2 gap-x-[16px] gap-y-[24px]" style={{ paddingBottom: 16 }}>
                {cat.photos.slice(0, 4).map((photo, j) => (
                  <div key={j} className="flex flex-col gap-[8px] items-center">
                    <div className="rounded-[4px] overflow-hidden w-full" style={{ aspectRatio: "1/1", background: "var(--color-background-page)" }}>
                      {photo.image && <img src={photo.image} alt={photo.title} loading="lazy" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex flex-col items-center text-center gap-[4px]">
                      <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] leading-none" style={{ color: "var(--color-text-secondary)" }}>{photo.tag}</p>
                      <p className="font-['Inter_Tight',sans-serif] font-normal text-[12px] leading-[1.5]" style={{ color: "var(--color-text-primary)", visibility: photo.title ? "visible" : "hidden" }}>{photo.title ?? " "}</p>
                      <p className="font-['Inter_Tight',sans-serif] font-normal text-[10px] leading-none" style={{ color: "var(--color-text-secondary)" }}>{photo.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Position indicator — spans exactly one menu-item slot (top of the
            active title to the top of the next one), sliding to the active
            category instead of scaling to represent total scroll depth. */}
        {itemSpacing > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{ left: MENU_WIDTH, width: 1, top: activeIdx * itemSpacing, height: itemSpacing, background: "#d9d9d9", transition: "top 0.2s ease" }}
          />
        )}
      </div>
    </div>
  );
}
