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
        <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
        {/* Peach layers — disappear progressively with sips */}
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px] ${[3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px] ${[2, 3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[rgba(255,173,172,0.8)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${[1, 2, 3, 4].includes(sipCount) ? "opacity-0" : ""}`} />
        {/* Cream layer */}
        <div
          className={`absolute left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px] ${
            sipCount === 4 ? "opacity-0 bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]" :
            sipCount === 3 ? "bg-[rgba(255,231,231,0.7)] h-[19px] top-[43px]" :
            "bg-[rgba(255,255,255,0.7)] h-[17px] top-[45px]"
          }`}
        />
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
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
