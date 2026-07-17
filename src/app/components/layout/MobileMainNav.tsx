import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { useDrink } from "../../context/DrinkContext";
import { EmptyCup } from "../drinks/DrinkCard";
import icons from "../../../assets/icons/icons.json";
import { DRINK_WIDTH, DRINK_HEIGHT, DRINK_SCALE, SOCIAL_CHIP_PADDING_X, MAIN_NAV_ROW_BOTTOM, MAIN_NAV_ROW_HEIGHT, MOBILE_BORDER_LIGHT_20 } from "./mobileNavLayout";

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

// Same icons/URLs/viewBox overrides as Footer.tsx's socialLinks — instagram
// and email were drawn on a cropped canvas, hence the non-default viewBox.
const SOCIAL_LINKS = [
  { key: "linkedin",  href: "https://www.linkedin.com/in/abbyxhart/", label: "LinkedIn",  icon: icons.social.linkedin,  stroke: false, iconViewBox: "0 0 24 24" },
  { key: "instagram", href: "https://instagram.com/abbyxhart.art",    label: "Instagram", icon: icons.social.instagram, stroke: false, iconViewBox: "1 1 16 16" },
  { key: "email",     href: "mailto:abbyxhart@gmail.com?subject=Love%20your%20work%2C%20let%27s%20chat", label: "Email", icon: icons.social.email, stroke: true, iconViewBox: "1 1 16 16" },
];

// Persistent bottom chrome on every mobile page: Home/About/Lab (or the
// Social Media + drink chip on casestudy pages, where SectionNavigation
// supplies its own "jump around" pill instead). The Casestudies(N) popover
// used to live here too — it's now MobileCasestudyNav, home-page only.
export default function MobileMainNav() {
  const { pathname } = useLocation();
  const isCasestudy = pathname.startsWith("/casestudy/");
  const { selectedDrink } = useDrink();
  const [sipCount, setSipCount] = useState<SipCount>(0);

  useEffect(() => { setSipCount(0); }, [selectedDrink]);

  const handleSip = () => {
    if (!selectedDrink) return;
    setSipCount(prev => (prev === 4 ? 0 : ((prev + 1) as SipCount)));
  };

  return (
    <>
      <nav className="md:hidden sticky bottom-0 left-0 right-0 z-[65] h-[110px]">
        {/* Progressive blur + gradient — extends 80px above the bar, not clipped */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: -80, bottom: 0 }}>
          <div className="absolute inset-0" style={{ backdropFilter: "blur(1px)", WebkitBackdropFilter: "blur(1px)", maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, transparent 50%)" }} />
          <div className="absolute inset-0" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", maskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 30%, black 55%, transparent 80%)" }} />
          <div className="absolute inset-0" style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", maskImage: "linear-gradient(to bottom, transparent 55%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,22,23,0) 0%, rgba(22,22,23,0.04) 20%, rgba(22,22,23,0.12) 35%, rgba(22,22,23,0.28) 48%, rgba(22,22,23,0.52) 60%, rgba(22,22,23,0.74) 72%, rgba(22,22,23,0.90) 84%, rgba(22,22,23,0.97) 100%)" }} />
        </div>

        {/* Content — top aligned. */}
        {isCasestudy ? (
          // Permanent Navigation (Figma node 5348:2826). Social Media chip +
          // drink pushed flush right via marginLeft:auto, so drink lands
          // exactly 16px from the right edge (px-[16px] on the row) with the
          // chip 8px to its left. Home/About/Lab render separately below,
          // outside the nav's z-[65] stacking context, at z-75 — SectionNavigation's
          // sheet (z-70) needs to sit behind those links but in front of this row.
          <div className="relative flex items-center px-[16px] pt-[52px]" style={{ zIndex: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              {/* Social Media chip */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: `0 ${SOCIAL_CHIP_PADDING_X}px`,
                  height: 34,
                  borderRadius: 4,
                  background: "var(--color-surface-fill4)",
                  border: `0.75px solid ${MOBILE_BORDER_LIGHT_20}`,
                  boxSizing: "border-box",
                }}
              >
                {SOCIAL_LINKS.map(({ key, href, label, icon, stroke, iconViewBox }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >
                    <svg width="18" height="18" viewBox={iconViewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                      {icon.paths.map((p, i) => (
                        <path
                          key={i}
                          d={p.d}
                          fill={stroke ? "none" : "var(--color-text-primary)"}
                          stroke={stroke ? "var(--color-text-primary)" : "none"}
                          strokeWidth={stroke ? 1.5 : undefined}
                          strokeLinecap={stroke ? "round" : undefined}
                          strokeLinejoin={stroke ? "round" : undefined}
                        />
                      ))}
                    </svg>
                  </a>
                ))}
              </div>

              {/* Interactive sip cup — scaled to a 34px-tall illustration to match the social chip */}
              <div
                onClick={handleSip}
                style={{ width: DRINK_WIDTH, height: DRINK_HEIGHT, overflow: "hidden", flexShrink: 0, cursor: selectedDrink ? "pointer" : "default" }}
              >
                <div style={{ transform: `scale(${DRINK_SCALE})`, transformOrigin: "top left" }}>
                  {selectedDrink
                    ? <SipCupInner drink={selectedDrink} sip={sipCount} />
                    : <EmptyCup />
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Home/About/Lab now renders separately below (z-75) on every page,
          // not just casestudy pages — MobileCasestudyNav's open panel (z-70,
          // home page only) needs to sit behind those links, not cover them.
          <div className="relative flex items-center px-[16px] pt-[52px]" style={{ zIndex: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: "auto" }}>
              {/* LinkedIn icon */}
              <button
                onClick={() => window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center" }}
              >
                <svg width="18" height="18" viewBox={icons.social.linkedin.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={icons.social.linkedin.paths[0].d} fill="currentColor" />
                </svg>
              </button>

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
          </div>
        )}
      </nav>

      {/* Home/About/Lab — rendered outside the nav's z-[65] stacking context
          on every mobile page, so it can sit at z-75: above SectionNavigation's
          sheet (z-70) on casestudy pages, and above MobileCasestudyNav's open
          panel (z-70) on the home page. Position replicates the row's old
          in-nav box exactly: bottom-24, height-34 — same spot either way. */}
      <div
        className="md:hidden fixed flex items-center gap-[24px]"
        style={{ left: 16, bottom: MAIN_NAV_ROW_BOTTOM, height: MAIN_NAV_ROW_HEIGHT, zIndex: 75 }}
      >
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
    </>
  );
}
