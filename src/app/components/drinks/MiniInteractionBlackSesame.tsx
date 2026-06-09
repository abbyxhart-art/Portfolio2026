import { useState } from "react";

type SipCount = 0 | 1 | 2 | 3 | 4;

// Each layer disappears progressively. Layers indexed from largest to smallest fill.
// h-44: visible only at count 0
// h-36: visible at counts 0–1
// h-28: visible at counts 0–2
// h-20: visible at counts 0–3
const fillLayers = [
  { height: "44px", top: "18px", hideFrom: 1 },
  { height: "36px", top: "26px", hideFrom: 2 },
  { height: "28px", top: "34px", hideFrom: 3 },
  { height: "20px", top: "42px", hideFrom: 4 },
];

export default function MiniInteractionBlackSesame() {
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [hovered, setHovered] = useState(false);

  const isEmpty = sipCount === 4;
  const is3Or4 = sipCount === 3 || sipCount === 4;

  const handleClick = () => {
    setSipCount(prev => (prev === 4 ? 0 : ((prev + 1) as SipCount)));
  };

  return (
    <div
      className="flex flex-col gap-[14px] items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="h-[62px] relative shrink-0 w-[42px]">
        {/* Straw */}
        <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
        {/* Thai Tea fill layers — rendered before boba so dots appear on top */}
        {fillLayers.map((layer, i) => (
          <div
            key={i}
            className={`absolute bg-[rgba(224,110,69,0.5)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px] ${sipCount >= layer.hideFrom ? "opacity-0" : ""}`}
            style={{ height: layer.height, top: layer.top }}
          />
        ))}
        {/* Boba dots — on top of liquid */}
        <div className={`absolute bg-[#161617] left-[6px] rounded-[10px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[14px] rounded-[10px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[34px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
          <div className="flex-none rotate-[14.41deg]">
            <div className={`bg-[#161617] rounded-[10px] size-[4px] ${sipCount === 4 ? "opacity-0" : ""}`} />
          </div>
        </div>
        <div className={`absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[38px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[46px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[50px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[50px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        {/* Cup outline */}
        <div className="absolute border-[#7e7c87] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        {/* Lid */}
        <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>

      <p
        className="font-['Inter_Tight',sans-serif] leading-[1.2] not-italic text-[14px] text-center tracking-[-0.28px] w-[42px]"
        style={{ color: hovered ? "var(--text-primary, #faf9ff)" : "var(--text-secondary, #908e99)", transition: "color 150ms ease-out" }}
      >
        {isEmpty ? "Refill" : "Sip"}
      </p>
    </div>
  );
}
