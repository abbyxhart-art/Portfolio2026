import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import chevronIcon from "../../assets/chevron-selector-vertical.svg";
import eyeIcon from "../../assets/eye.svg";

const CASE_STUDIES = [
  { path: "/casestudy/gentle-monster", label: "Gentle Monster Kiosk" },
  { path: "/casestudy/figma-rit",      label: "FigBuild Badges 2026" },
  { path: "/casestudy/tian-airlines",  label: "Tian Airways" },
  { path: "/casestudy/aixels",         label: "AIXELS" },
];

type CasestudyNavigationProps = {
  title: string;
};

export default function CasestudyNavigation({ title }: CasestudyNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="hidden md:block fixed top-[16px] left-[16px] z-50">
      {/* Trigger */}
      <button
        className="flex gap-[8px] items-center bg-transparent border-none p-0 cursor-pointer"
        onClick={() => setIsOpen(v => !v)}
      >
        <span
          className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[16px] whitespace-nowrap"
          style={{ color: "var(--text/primary, #37363c)" }}
        >
          {title}
        </span>
        <div className="flex items-center p-[4px] shrink-0">
          <div className="relative shrink-0 size-[18px] overflow-clip">
            <div className="absolute inset-[16.67%_29.17%]">
              <div className="absolute inset-[-4.17%_-6.67%]">
                <img alt="" className="block max-w-none size-full" src={chevronIcon} />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Dropdown — 16px below trigger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0"
            style={{ top: "calc(100% + 16px)" }}
          >
            <div
              className="bg-[var(--surface\/primary,#faf9ff)] border-[0.5px] border-[var(--border\/default,#d1cedc)] border-solid flex flex-col gap-[16px] items-start p-[16px] rounded-[12px]"
              style={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", width: "242px" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between w-full">
                <p
                  className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[12px] whitespace-nowrap"
                  style={{ color: "var(--text/tertiary, #908e99)" }}
                >
                  Projects
                </p>
                <div
                  className="flex items-center justify-center p-[4px] rounded-[4px]"
                  style={{ border: "0.75px solid var(--border/default, #d1cedc)" }}
                >
                  <p
                    className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[12px] whitespace-nowrap"
                    style={{ color: "var(--text/secondary, #585564)" }}
                  >
                    Esc
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-[4px] w-full">
                {CASE_STUDIES.map((cs) => {
                  const isCurrent = location.pathname === cs.path;
                  const isHovered = hoveredPath === cs.path;
                  return (
                    <Link
                      key={cs.path}
                      to={cs.path}
                      className="flex items-center justify-between py-[6px] w-full no-underline"
                      onMouseEnter={() => setHoveredPath(cs.path)}
                      onMouseLeave={() => setHoveredPath(null)}
                      onClick={() => setIsOpen(false)}
                    >
                      <p
                        className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap"
                        style={{
                          color: isCurrent || isHovered
                            ? "var(--text/primary, #37363c)"
                            : "var(--text/tertiary, #908e99)",
                          transition: "color 150ms ease-out",
                        }}
                      >
                        {cs.label}
                      </p>
                      <div className={`relative shrink-0 size-[16px] overflow-clip ${isCurrent ? "opacity-100" : "opacity-0"}`}>
                        <div className="absolute inset-[20.83%_8.98%]">
                          <div className="absolute inset-[-5.36%_-3.81%]">
                            <img alt="" className="block max-w-none size-full" src={eyeIcon} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
