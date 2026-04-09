import { useState } from "react";

type SipCount = 0 | 1 | 2 | 3 | 4;

const lycheeConfig: Record<SipCount, { height: string; top: string } | null> = {
  0: { height: "44px", top: "18px" },
  1: { height: "35px", top: "27px" },
  2: { height: "28px", top: "34px" },
  3: { height: "20px", top: "42px" },
  4: null,
};

export default function MiniInteractionLycheeRose() {
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [hovered, setHovered] = useState(false);

  const isEmpty = sipCount === 4;
  const lychee = lycheeConfig[sipCount];
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
        <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" />
        {/* Boba dots */}
        <div className={`absolute bg-[#fb21f3] left-[6px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[14px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[10px] size-[4px] top-[34px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
          <div className="flex-none rotate-[14.41deg]">
            <div className={`bg-[#fb21f3] size-[4px] ${sipCount === 4 ? "opacity-0" : ""}`} />
          </div>
        </div>
        <div className={`absolute bg-[#fb21f3] left-[33px] size-[4px] top-[38px] ${is3Or4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[33px] size-[4px] top-[46px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[27px] size-[4px] top-[42px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[27px] size-[4px] top-[50px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        <div className={`absolute bg-[#fb21f3] left-[10px] size-[4px] top-[50px] ${sipCount === 4 ? "opacity-0" : ""}`} />
        {/* Lychee fill — shrinks with each sip */}
        {lychee && (
          <div
            className="absolute bg-[rgba(193,111,255,0.45)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]"
            style={{ height: lychee.height, top: lychee.top }}
          />
        )}
        {/* Cup outline */}
        <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        {/* Lid */}
        <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>

      <p
        className="font-['Inter_Tight',sans-serif] leading-[1.2] not-italic text-[14px] text-center tracking-[-0.28px] w-[42px]"
        style={{ color: hovered ? "var(--text-primary, #232226)" : "var(--text-tertiary, #7e7c87)", transition: "color 150ms ease-out" }}
      >
        {isEmpty ? "Refill" : "Sip"}
      </p>
    </div>
  );
}
