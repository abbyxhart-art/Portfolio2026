import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import chevronIcon from "../../assets/icons/chevron-selector-vertical.svg";

const VISITED_KEY = "visited_casestudies";

const CASE_STUDIES = [
  { path: "/casestudy/gentle-monster", label: "Gentle Monster Kiosk" },
  { path: "/casestudy/figma-rit",      label: "FigBuild Badges 2026" },
  { path: "/casestudy/tian-airlines",  label: "Tian Airways" },
  { path: "/casestudy/aixels",         label: "AIXELS" },
  { path: "/casestudy/fragrantica",    label: "Fragrantica" },
  { path: "/casestudy/figma-kpop",     label: "Figma K-Pop" },
  { path: "/casestudy/texas-mobile",   label: "Texas Mobile" },
];

type CasestudyNavigationProps = {
  title: string;
};

export default function CasestudyNavigation({ title }: CasestudyNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(VISITED_KEY);
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  });
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisited(prev => {
      const next = new Set(prev);
      next.add(location.pathname);
      try {
        localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, [location.pathname]);

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

  const currentPath = location.pathname;
  const unvisitedOrCurrent = [
    ...CASE_STUDIES.filter(cs => cs.path === currentPath),
    ...CASE_STUDIES.filter(cs => !visited.has(cs.path) && cs.path !== currentPath),
  ];
  const alreadyVisited = CASE_STUDIES.filter(
    cs => visited.has(cs.path) && cs.path !== currentPath
  );

  const renderItem = (cs: (typeof CASE_STUDIES)[0]) => {
    const isCurrent = currentPath === cs.path;
    const isHovered = hoveredPath === cs.path;
    return (
      <Link
        key={cs.path}
        to={cs.path}
        className="flex items-center py-[6px] w-full no-underline"
        onMouseEnter={() => setHoveredPath(cs.path)}
        onMouseLeave={() => setHoveredPath(null)}
        onClick={() => setIsOpen(false)}
      >
        <p
          className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px] whitespace-nowrap"
          style={{
            color: isCurrent || isHovered ? "#faf9ff" : "#908e99",
            transition: "color 150ms ease-out",
          }}
        >
          {cs.label}
        </p>
      </Link>
    );
  };

  return (
    <div ref={ref} className="hidden md:block fixed top-[16px] left-[16px] z-[60]">
      {/* Trigger */}
      <button
        className="flex items-center justify-between px-[12px] py-[10px] rounded-[20px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150"
        style={{
          width: "188px",
          background: hovered ? "rgba(88,85,100,0.15)" : "#161617",
        }}
        onClick={() => setIsOpen(v => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] whitespace-nowrap">
          Casestudies
        </span>
        <img alt="" className="shrink-0 size-[18px]" src={chevronIcon} />
      </button>

      {/* Dropdown — 12px below trigger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0"
            style={{ top: "calc(100% + 12px)" }}
          >
            <div
              className="bg-[#161617] border-[0.5px] border-[#302f34] border-solid flex flex-col items-start p-[16px] rounded-[12px]"
              style={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", width: "188px" }}
            >
              <div className="flex flex-col gap-[4px] w-full">
                {unvisitedOrCurrent.map(renderItem)}
              </div>

              {alreadyVisited.length > 0 && (
                <>
                  <p
                    className="font-['Inter_Tight',sans-serif] font-[400] leading-none text-[12px] w-full mt-[24px] mb-[8px]"
                    style={{ color: "#585564" }}
                  >
                    Already Visited
                  </p>
                  <div className="flex flex-col gap-[4px] w-full">
                    {alreadyVisited.map(renderItem)}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
