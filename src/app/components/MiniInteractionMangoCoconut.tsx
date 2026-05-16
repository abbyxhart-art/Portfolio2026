import { useState } from "react";

type SipCount = 0 | 1 | 2 | 3 | 4;

const mangoConfig: Record<SipCount, { height: string; top: string } | null> = {
  0: { height: "39px", top: "23px" },
  1: { height: "36px", top: "26px" },
  2: { height: "27px", top: "35px" },
  3: { height: "20px", top: "42px" },
  4: null,
};

const creamConfig: Record<SipCount, string | null> = {
  0: "15px",
  1: "18px",
  2: "27px",
  3: "34px",
  4: null,
};

export default function MiniInteractionMangoCoconut() {
  const [sipCount, setSipCount] = useState<SipCount>(0);
  const [hovered, setHovered] = useState(false);

  const isEmpty = sipCount === 4;
  const mango = mangoConfig[sipCount];
  const creamTop = creamConfig[sipCount];

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
        {mango && (
          <div
            className="absolute bg-[rgba(255,198,43,0.8)] left-[3px] rounded-bl-[24px] rounded-br-[24px] w-[37px]"
            style={{ height: mango.height, top: mango.top }}
          />
        )}
        {creamTop && (
          <div
            className="absolute bg-white h-[8px] left-[3px] w-[37px]"
            style={{ top: creamTop }}
          />
        )}
        <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
        <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
      </div>

      <p
        className="font-['Inter_Tight',sans-serif] leading-[1.2] not-italic text-[14px] text-center tracking-[-0.28px] w-[42px]"
        style={{ color: hovered ? "#faf9ff" : "#585564", transition: "color 150ms ease-out" }}
      >
        {isEmpty ? "Refill" : "Sip"}
      </p>
    </div>
  );
}
