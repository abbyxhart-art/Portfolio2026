import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence, useDragControls } from "@/lib/motion";
import { useDrink } from "../../context/DrinkContext";
import { EmptyCup } from "../drinks/DrinkCard";
import { CASE_STUDIES } from "../../data/casestudies";
import icons from "../../../assets/icons/icons.json";

type SipCount = 0 | 1 | 2 | 3 | 4;
type DrinkType = 'mango' | 'matcha' | 'lychee' | 'sesame' | null;

// ── Mango Coconut ────────────────────────────────────────────────────────────
const mangoFill: Record<SipCount, { height: string; top: string } | null> = {
  0: { height: "39px", top: "23px" }, 1: { height: "36px", top: "26px" },
  2: { height: "27px", top: "35px" }, 3: { height: "20px", top: "42px" }, 4: null,
};
const mangoCream: Record<SipCount, string | null> = {
  0: "15px", 1: "18px", 2: "27px", 3: "34px", 4: null,
};

// ── Lychee Rose ──────────────────────────────────────────────────────────────
const lycheeFill: Record<SipCount, { height: string; top: string } | null> = {
  0: { height: "44px", top: "18px" }, 1: { height: "35px", top: "27px" },
  2: { height: "28px", top: "34px" }, 3: { height: "20px", top: "42px" }, 4: null,
};

// ── Black Sesame (Thai Tea) ───────────────────────────────────────────────────
const sesameLayers = [
  { height: "44px", top: "18px", hideFrom: 1 },
  { height: "36px", top: "26px", hideFrom: 2 },
  { height: "28px", top: "34px", hideFrom: 3 },
  { height: "20px", top: "42px", hideFrom: 4 },
];

function SipCupInner({ drink, sip }: { drink: Exclude<DrinkType, null>; sip: SipCount }) {
  const is3Or4 = sip === 3 || sip === 4;

  if (drink === "mango") {
    const fill = mangoFill[sip];
    const cream = mangoCream[sip];
    return (
      <div className="h-[62px] relative w-[42px]">
        <div className="absolute bg-[#4f4c58] h-[53px] left-[20px] top-0 w-[4px]" />
        {fill && <div className="absolute bg-[rgba(255,198,43,0.8)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]" style={{ height: fill.height, top: fill.top }} />}
        {cream && <div className="absolute bg-white h-[8px] left-[3px] w-[37px]" style={{ top: cream }} />}
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#4f4c58] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  if (drink === "lychee") {
    const fill = lycheeFill[sip];
    return (
      <div className="h-[62px] relative w-[42px]">
        <div className="absolute bg-[#4f4c58] h-[53px] left-[20px] top-0 w-[4px]" />
        <div className={`absolute bg-white left-[6px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[14px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[10px] size-[4px] top-[34px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[33px] size-[4px] top-[38px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[33px] size-[4px] top-[46px] ${sip === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[27px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[27px] size-[4px] top-[50px] ${sip === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-white left-[10px] size-[4px] top-[50px] ${sip === 4 ? "opacity-0" : ""}`} />
        {fill && <div className="absolute bg-[rgba(193,112,255,0.63)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]" style={{ height: fill.height, top: fill.top }} />}
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#4f4c58] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  if (drink === "matcha") {
    return (
      <div className="h-[62px] relative w-[42px]">
        <div className="absolute bg-[#4f4c58] h-[53px] left-[20px] top-0 w-[4px]" />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px] ${[3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px] ${[2, 3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${[1, 2, 3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px] ${sip === 4 ? "opacity-0 bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]" : sip === 3 ? "bg-[rgba(255,231,231,0.7)] h-[19px] top-[43px]" : "bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]"}`} />
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#4f4c58] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  // sesame
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#4f4c58] h-[53px] left-[20px] top-0 w-[4px]" />
      {sesameLayers.map((layer, i) => (
        <div key={i} className={`absolute bg-[rgba(224,110,69,0.5)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px] ${sip >= layer.hideFrom ? "opacity-0" : ""}`} style={{ height: layer.height, top: layer.top }} />
      ))}
      <div className={`absolute bg-[#161617] left-[6px] rounded-[10px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[14px] rounded-[10px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[34px] ${is3Or4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[38px] ${is3Or4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[46px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[42px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[50px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className={`absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[50px] ${sip === 4 ? "opacity-0" : ""}`} />
      <div className="absolute border-[#7e7c87] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#4f4c58] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home",      to: "/",      end: true },
  { label: "About",     to: "/about", end: false },
  { label: "Lab", to: "/lab", end: false },
];

const VISITED_KEY = "visited_casestudies";

// Figma "Casestudy Navigation — Motion" (node 5341:4702) authors this as a
// COLLAPSE: open panel -> closed pill. We open in the opposite direction, so
// every keyframe pair below is that spec's initial/animate swapped — but the
// eased curve itself is reused verbatim (not time-inverted), so opening still
// reads as ease-in/ease-out rather than ease-out/ease-in.
const SHEET_EASE: [number, number, number, number] = [0.457, 0, 0.58, 1];
const SHEET_TRANSITION = { duration: 0.3, ease: SHEET_EASE };
// Closed (pill) geometry matches the sheet's current resting size; open
// height comes straight from the Figma frame (311) — taller than the prior
// content-hugged ~226px, which is what read as "too short."
const CLOSED_SHEET = { bottom: 68, left: 16, right: 16, height: 32, paddingBottom: 8, borderRadius: 24 };
const OPEN_SHEET = { bottom: 0, left: 0, right: 0, height: 311, paddingBottom: 40, borderRadius: "12px 12px 0px 0px" };

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const { selectedDrink } = useDrink();
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visited, setVisited] = useState<string[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => { setSipCount(0); }, [selectedDrink]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VISITED_KEY);
      if (stored) setVisited(JSON.parse(stored));
    } catch {}
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: Event) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        if (e.type === "pointerdown") setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside, { capture: true });
    document.addEventListener("click", handleOutside, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", handleOutside, { capture: true });
      document.removeEventListener("click", handleOutside, { capture: true });
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSip = () => {
    if (!selectedDrink) return;
    setSipCount(prev => (prev === 4 ? 0 : ((prev + 1) as SipCount)));
  };

  const unvisited = CASE_STUDIES.filter(cs => !visited.includes(cs.path));
  const alreadyVisited = CASE_STUDIES.filter(cs => visited.includes(cs.path));

  const labelTextStyle = { fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: "#908e99", lineHeight: 1, margin: 0, whiteSpace: "nowrap" as const, textAlign: "center" as const };
  const linkTextStyle = { fontFamily: "'Inter Tight', sans-serif", fontSize: 14, color: "#faf9ff", lineHeight: 1, margin: 0, whiteSpace: "nowrap" as const, cursor: "pointer" as const, textAlign: "center" as const };

  return (
    <>
      {/* Darkens the rest of the page while the sheet is open. Visual only —
          the existing capture-phase outside-click handler above already
          closes the sheet and blocks any click from reaching a link
          underneath, so this doesn't need its own pointer handling. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[64]"
            style={{ background: "#000", pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={SHEET_TRANSITION}
          />
        )}
      </AnimatePresence>

      <nav className="md:hidden sticky bottom-0 left-0 right-0 z-[65] h-[110px]">
        {/* Progressive blur + gradient — extends 80px above the bar, not clipped */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: -80, bottom: 0, opacity: isOpen ? 0 : 1, transition: "opacity 0.35s cubic-bezier(0.33,0,0,1)" }}>
          <div className="absolute inset-0" style={{ backdropFilter: "blur(1px)", WebkitBackdropFilter: "blur(1px)", maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)" }} />
          <div className="absolute inset-0" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", maskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)" }} />
          <div className="absolute inset-0" style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", maskImage: "linear-gradient(to bottom, transparent 55%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,22,23,0) 0%, rgba(22,22,23,0.04) 20%, rgba(22,22,23,0.12) 35%, rgba(22,22,23,0.28) 48%, rgba(22,22,23,0.52) 60%, rgba(22,22,23,0.74) 72%, rgba(22,22,23,0.90) 84%, rgba(22,22,23,0.97) 100%)" }} />
        </div>

        {/* Casestudy popover — single component, morphs between collapsed pill and expanded panel */}
        <div
          className="absolute inset-0"
          style={{
            opacity: scrolled || isOpen ? 1 : 0,
            transform: scrolled || isOpen ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <motion.div
            ref={sheetRef}
            drag={isOpen ? "y" : false}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragSnapToOrigin
            onDragEnd={(_e, info) => {
              if (info.offset.y > 80 || info.velocity.y > 500) setIsOpen(false);
            }}
            onClick={() => { if (!isOpen) setIsOpen(true); }}
            // Explicit keyframes (not the `layout` prop) so the shape genuinely
            // tweens height/inset/radius frame-by-frame. `layout` drove this
            // previously via FLIP (before/after DOMRect + a scale-transform
            // fake-out), which is what produced the flip/skew: scaling a
            // blurred box non-uniformly visibly warps it mid-transition.
            animate={isOpen ? OPEN_SHEET : CLOSED_SHEET}
            transition={{
              bottom: SHEET_TRANSITION,
              left: SHEET_TRANSITION,
              right: SHEET_TRANSITION,
              height: SHEET_TRANSITION,
              paddingBottom: SHEET_TRANSITION,
              borderRadius: SHEET_TRANSITION,
            }}
            style={{
              position: "absolute",
              zIndex: 2,
              overflow: "hidden",
              boxSizing: "border-box",
              pointerEvents: (scrolled || isOpen) ? "auto" : "none",
              cursor: isOpen ? "default" : "pointer",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              background: isOpen
                ? "linear-gradient(to bottom, rgba(48,47,52,0.85) 0%, var(--background) 100%)"
                : "rgba(88,85,100,0.5)",
              transition: "background 0.3s ease",
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isOpen ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  // Figma fades this content out during the first half of the
                  // collapse; reversed, it fades in during the second half of
                  // the open — content settles in only once the sheet has
                  // mostly finished growing, instead of popping in instantly.
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: 0.15 }}
                  style={{ position: "relative" }}
                >
                  {/* Drag handle — wide touch target, visible bar centered inside */}
                  <div
                    onPointerDown={(e) => dragControls.start(e)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 20, cursor: "grab", touchAction: "none" }}
                  >
                    <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(144,142,153,0.4)" }} />
                  </div>

                  {/* Title */}
                  <p style={{ textAlign: "center", fontFamily: "'Inter Tight', sans-serif", fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1, margin: "8px 0 24px" }}>
                    Casestudy Navigation
                  </p>

                  {/* Two centered columns */}
                  <div style={{ display: "flex", gap: 24, alignItems: "flex-start", justifyContent: "center" }}>
                    <div
                      style={{
                        display: "flex", flexDirection: "column", gap: 12, alignItems: "center",
                        visibility: alreadyVisited.length > 0 ? "visible" : "hidden",
                      }}
                    >
                      <p style={labelTextStyle}>Already Visited</p>
                      {(alreadyVisited.length > 0 ? alreadyVisited : CASE_STUDIES).map(({ label, path }) => (
                        <p
                          key={path}
                          onClick={alreadyVisited.length > 0 ? () => { navigate(path); setIsOpen(false); } : undefined}
                          style={linkTextStyle}
                        >
                          {label}
                        </p>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                      <p style={labelTextStyle}>Casestudies</p>
                      {(unvisited.length > 0 ? unvisited : CASE_STUDIES).map(({ label, path }) => (
                        <p key={path} onClick={() => { navigate(path); setIsOpen(false); }} style={linkTextStyle}>
                          {label}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 12, fontWeight: 400, color: "#fff", lineHeight: 1, whiteSpace: "nowrap" }}>
                    Casestudies ({CASE_STUDIES.length})
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10L8 6L12 10" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Content — top aligned. pointer-events:none on the container (its padding-top hit-box
            would otherwise sit over the popover) with pointer-events re-enabled per interactive
            child, so Home/About/Lab stay clickable and layered above the popover without blocking it. */}
        <div className="relative flex items-start px-[16px] pt-[52px] gap-[24px]" style={{ zIndex: 3, pointerEvents: "none" }}>
          <div className="flex gap-[24px] items-start flex-1" style={{ pointerEvents: "auto" }}>
            {NAV_LINKS.map(({ label, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className="font-['Inter_Tight',sans-serif] text-[14px] leading-none no-underline whitespace-nowrap"
                style={({ isActive }) => ({ color: isActive ? "#faf9ff" : "#908e99", transition: "color 0.15s ease" })}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* LinkedIn icon */}
          <button
            onClick={() => window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer")}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", pointerEvents: "auto" }}
          >
            <svg width="18" height="18" viewBox={icons.social.linkedin.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={icons.social.linkedin.paths[0].d} fill="currentColor" />
            </svg>
          </button>

          {/* Interactive sip cup */}
          <div
            onClick={handleSip}
            style={{ width: 21, height: 31, overflow: "hidden", flexShrink: 0, cursor: selectedDrink ? "pointer" : "default", pointerEvents: "auto" }}
          >
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
              {selectedDrink
                ? <SipCupInner drink={selectedDrink} sip={sipCount} />
                : <EmptyCup />
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
