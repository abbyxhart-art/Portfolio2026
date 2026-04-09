import { useState } from "react";

type SipCount = 0 | 1 | 2 | 3 | 4;

export default function MiniInteractionMatchaCream() {
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [hovered, setHovered] = useState(false);

  const isEmpty = sipCount === 4;

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
        <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" />
        {/* Matcha layers — each disappears progressively with sips */}
        <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px] ${[3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px] ${[2, 3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${[1, 2, 3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        {/* Coconut cream */}
        <div
          className={`absolute left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px] h-[17px] ${
            sipCount === 4 ? "opacity-0 bg-[rgba(255,255,255,0.7)]" :
            sipCount === 3 ? "bg-[rgba(255,255,255,0.9)]" :
            "bg-[rgba(255,255,255,0.7)]"
          }`}
        />
        {/* Cup outline */}
        <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        {/* Lid */}
        <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>

      <p
        className="font-['Inter_Tight',sans-serif] leading-[1.2] not-italic text-[14px] text-center tracking-[-0.28px] w-[42px]"
        style={{ color: hovered ? "var(--text/primary, #232226)" : "var(--text/tertiary, #7e7c87)", transition: "color 150ms ease-out" }}
      >
        {isEmpty ? "Refill" : "Sip"}
      </p>
    </div>
  );
}
