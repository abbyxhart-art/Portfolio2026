import { useState } from "react";

type SipCount = 0 | 1 | 2 | 3 | 4;

// Tea fill level per sip (top offset + height inside the cup)
const teaConfig: Record<SipCount, { top: string; height: string } | null> = {
  0: { top: "27px", height: "35px" },
  1: { top: "35px", height: "27px" },
  2: { top: "42px", height: "20px" },
  3: { top: "50px", height: "12px" },
  4: null, // empty
};

// Coconut cream cloud — only visible on first two sip levels
const cloudConfig: Record<SipCount, { top: string } | null> = {
  0: { top: "18px" },
  1: { top: "26px" },
  2: null,
  3: null,
  4: null,
};

export default function MiniInteractionMangoCoconut() {
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [hovered, setHovered] = useState(false);

  const isEmpty = sipCount === 4;
  const tea = teaConfig[sipCount];
  const cloud = cloudConfig[sipCount];

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
      {/* Illustration */}
      <div className="h-[62px] relative shrink-0 w-[42px]">
        {/* Straw */}
        <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" />
        {/* Tea fill */}
        {tea && (
          <div
            className="absolute bg-[rgba(253,209,110,0.7)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]"
            style={{ top: tea.top, height: tea.height }}
          />
        )}
        {/* Coconut cream cloud */}
        {cloud && (
          <div
            className="absolute bg-white h-[9px] left-[3px] w-[37px]"
            style={{ top: cloud.top }}
          />
        )}
        {/* Cup outline */}
        <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        {/* Lid */}
        <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>

      {/* Label */}
      <p
        className="font-['Inter_Tight',sans-serif] leading-[1.2] not-italic text-[14px] text-center tracking-[-0.28px] w-[42px]"
        style={{ color: hovered ? "var(--text-primary, #232226)" : "var(--text-tertiary, #7e7c87)", transition: "color 150ms ease-out" }}
      >
        {isEmpty ? "Refill" : "Sip"}
      </p>
    </div>
  );
}
