import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useDrink } from "../context/DrinkContext";
import { EmptyCup } from "./DrinkCard";

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
        <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
        {fill && <div className="absolute bg-[rgba(255,198,43,0.8)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]" style={{ height: fill.height, top: fill.top }} />}
        {cream && <div className="absolute bg-white h-[8px] left-[3px] w-[37px]" style={{ top: cream }} />}
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  if (drink === "lychee") {
    const fill = lycheeFill[sip];
    return (
      <div className="h-[62px] relative w-[42px]">
        <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
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
        <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  if (drink === "matcha") {
    return (
      <div className="h-[62px] relative w-[42px]">
        <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px] ${[3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px] ${[2, 3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${[1, 2, 3, 4].includes(sip) ? "opacity-0" : ""}`} />
        <div className={`absolute left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px] ${sip === 4 ? "opacity-0 bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]" : sip === 3 ? "bg-[rgba(255,231,231,0.7)] h-[19px] top-[43px]" : "bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]"}`} />
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>
    );
  }

  // sesame
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
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
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home",      to: "/",      end: true },
  { label: "About",     to: "/about", end: false },
  { label: "The Booth", to: "/booth", end: false },
];

export default function MobileBottomNav() {
  const { selectedDrink } = useDrink();
  const [sipCount, setSipCount] = useState<SipCount>(0);

  useEffect(() => { setSipCount(0); }, [selectedDrink]);

  const handleSip = () => {
    if (!selectedDrink) return;
    setSipCount(prev => (prev === 4 ? 0 : ((prev + 1) as SipCount)));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[110px]">
      {/* Progressive blur + gradient — extends 80px above the bar, not clipped */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: -80, bottom: 0 }}>
        <div className="absolute inset-0" style={{ backdropFilter: "blur(1px)", WebkitBackdropFilter: "blur(1px)", maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)" }} />
        <div className="absolute inset-0" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", maskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)" }} />
        <div className="absolute inset-0" style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", maskImage: "linear-gradient(to bottom, transparent 55%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,22,23,0) 0%, rgba(22,22,23,0.04) 20%, rgba(22,22,23,0.12) 35%, rgba(22,22,23,0.28) 48%, rgba(22,22,23,0.52) 60%, rgba(22,22,23,0.74) 72%, rgba(22,22,23,0.90) 84%, rgba(22,22,23,0.97) 100%)" }} />
      </div>

      {/* Content — top aligned */}
      <div className="relative flex items-start px-[16px] pt-[52px] gap-[24px]">
        <div className="flex gap-[24px] items-start flex-1">
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

        {/* Interactive sip cup */}
        <div
          onClick={handleSip}
          style={{ width: 21, height: 31, overflow: "hidden", flexShrink: 0, cursor: selectedDrink ? "pointer" : "default" }}
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
  );
}
