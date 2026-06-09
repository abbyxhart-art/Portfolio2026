import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import chevronIcon from "../../../assets/icons/chevron-selector-vertical.svg";

const VISITED_KEY = "visited_casestudies";

const CASE_STUDIES = [
  { path: "/casestudy/gentle-monster",    label: "Gentle Monster Kiosk" },
  { path: "/casestudy/capitol-aluminum",  label: "Capitol Aluminum" },
  { path: "/casestudy/texas-mobile",      label: "Texas Mobile" },
  { path: "/casestudy/figma-rit",         label: "FigBuild 2026" },
  { path: "/casestudy/aixels",            label: "AIXELS" },
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

  const itemStyle: React.CSSProperties = {
    fontFamily: "'Inter Tight', sans-serif",
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 1,
    textDecoration: "none",
    display: "block",
    padding: "6px 0",
    whiteSpace: "nowrap",
  };

  const renderItem = (cs: (typeof CASE_STUDIES)[0]) => {
    const isCurrent = currentPath === cs.path;
    const isHov = hoveredPath === cs.path;
    return (
      <Link
        key={cs.path}
        to={cs.path}
        style={{ ...itemStyle, color: isCurrent || isHov ? "#FAF9FF" : "#908E99", transition: "color 150ms ease-out" }}
        onMouseEnter={() => setHoveredPath(cs.path)}
        onMouseLeave={() => setHoveredPath(null)}
        onClick={() => setIsOpen(false)}
      >
        {cs.label}
      </Link>
    );
  };

  return (
    <motion.div
      ref={ref}
      className="hidden md:block fixed top-[54px] left-[16px] z-[60]"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
    >
      {/* Trigger pill — same style as home page */}
      <button
        onClick={() => setIsOpen(v => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: hovered ? "rgba(144,142,153,0.5)" : "rgba(144,142,153,0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "none",
          borderRadius: 24,
          padding: "6px 12px 6px 10px",
          width: 160,
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 12,
          fontWeight: 300,
          color: hovered ? "#FAF9FF" : "#908E99",
          transition: "background 0.15s ease, color 0.15s ease",
          cursor: "pointer",
          outline: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span>Casestudies</span>
        <img
          alt=""
          src={chevronIcon}
          style={{
            width: 16,
            height: 16,
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            filter: hovered ? "brightness(0) invert(1)" : "none",
            transition: "transform 0.2s ease, filter 0.15s ease",
          }}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.33, 0, 0, 1] }}
            style={{ position: "absolute", left: 0, top: "calc(100% + 8px)" }}
          >
            <div
              style={{
                background: "rgba(144,142,153,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: 4,
                padding: 16,
                minWidth: 160,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {unvisitedOrCurrent.map(renderItem)}

              {alreadyVisited.length > 0 && (
                <>
                  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, color: "#585564", lineHeight: 1, margin: "20px 0 4px" }}>
                    Already Visited
                  </p>
                  {alreadyVisited.map(renderItem)}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
