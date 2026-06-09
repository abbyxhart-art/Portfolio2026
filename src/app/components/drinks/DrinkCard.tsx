import React, { useState } from "react";
import { useDrink } from "../../context/DrinkContext";

type DrinkFloaterType = 'lychee' | 'matcha' | 'mango' | 'sesame';

const LABEL_TO_FLOATER: Record<string, DrinkFloaterType> = {
  "Taro Milk":     "lychee",
  "Peach Cream":   "matcha",
  "Mango Coconut": "mango",
  "Thai Tea":      "sesame",
};

export function EmptyCup() {
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
      <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

export function TaroMilkCup() {
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
      <div className="absolute bg-[#faf9ff] left-[6px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#faf9ff] left-[14px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#faf9ff] left-[10px] size-[4px] top-[34px]" />
      <div className="absolute bg-[#faf9ff] left-[19px] size-[4px] top-[55px]" />
      <div className="absolute bg-[#faf9ff] left-[33px] size-[4px] top-[38px]" />
      <div className="absolute bg-[#faf9ff] left-[33px] size-[4px] top-[46px]" />
      <div className="absolute bg-[#faf9ff] left-[27px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#faf9ff] left-[27px] size-[4px] top-[50px]" />
      <div className="absolute bg-[#faf9ff] left-[10px] size-[4px] top-[50px]" />
      <div className="absolute bg-[rgba(193,111,255,0.63)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" />
      <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

export function PeachCreamCup() {
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" />
      <div className="absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[44px] w-[37px]" />
      <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

export function MangoCocoCup() {
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
      <div className="absolute bg-[rgba(255,198,43,0.8)] h-[39px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[23px] w-[37px]" />
      <div className="absolute bg-white h-[8px] left-[3px] top-[15px] w-[37px]" />
      <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

export function ThaiTeaCup() {
  return (
    <div className="h-[62px] relative w-[42px]">
      <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[20px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[42px] w-[37px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[28px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[34px] w-[37px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[36px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[26px] w-[37px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" />
      <div className="absolute bg-[#161617] left-[6px] rounded-[10px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#161617] left-[14px] rounded-[10px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[34px]" />
      <div className="absolute bg-[#161617] left-[19px] rounded-[10px] size-[4px] top-[55px]" />
      <div className="absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[38px]" />
      <div className="absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[46px]" />
      <div className="absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[42px]" />
      <div className="absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[50px]" />
      <div className="absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[50px]" />
      <div className="absolute border-[0.75px] border-[#7e7c87] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
      <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
    </div>
  );
}

type SlotDef = {
  cup: React.ReactNode;
  label: string;
  leftPct: string;
  topPct: string;
};

const SLOTS: SlotDef[] = [
  { cup: <TaroMilkCup />,  label: "Taro Milk",     leftPct: "15.1%", topPct: "25.5%" },
  { cup: <PeachCreamCup />, label: "Peach Cream",   leftPct: "53.2%", topPct: "25.5%" },
  { cup: <MangoCocoCup />,  label: "Mango Coconut", leftPct: "15.1%", topPct: "61.5%" },
  { cup: <ThaiTeaCup />,    label: "Thai Tea",      leftPct: "53.2%", topPct: "61.5%" },
];

const FLOATER_TO_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(LABEL_TO_FLOATER).map(([label, type]) => [type, label])
);

export default function DrinkCard() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [resetHovered, setResetHovered] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(4);
  const { selectedDrink, setSelectedDrink } = useDrink();
  const selectedLabel = selectedDrink ? FLOATER_TO_LABEL[selectedDrink] : null;
  const allUnlocked = unlockedCount >= 4;

  const handleReset = () => {
    setUnlockedCount(1);
    if (selectedDrink && selectedDrink !== "lychee") setSelectedDrink(null);
  };

  return (
    <div
      className="relative w-full rounded-[8px] overflow-hidden border border-[#302f34]"
      style={{ aspectRatio: "1 / 1", background: "rgba(88,85,100,0.15)" }}
    >
      {/* Caption */}
      <div className="absolute top-[15px] left-[15px] flex flex-col gap-[6px]">
        <p className="font-['Inter_Tight',sans-serif] font-normal text-[#faf9ff] text-[14px] leading-none whitespace-nowrap">
          Want to sip while you scroll?
        </p>
        {allUnlocked ? (
          <p
            className="font-['Inter_Tight',sans-serif] font-normal text-[14px] leading-none whitespace-nowrap underline cursor-pointer"
            style={{ color: resetHovered ? "var(--text-primary, #faf9ff)" : "var(--text-secondary, #908e99)", transition: "color 150ms ease-out" }}
            onMouseEnter={() => setResetHovered(true)}
            onMouseLeave={() => setResetHovered(false)}
            onClick={handleReset}
          >
            Reset drink menu
          </p>
        ) : (
          <p className="font-['Inter_Tight',sans-serif] font-normal text-[#908e99] text-[14px] leading-none whitespace-nowrap">
            Come back to unlock more flavors
          </p>
        )}
      </div>

      {/* Drink slots */}
      {SLOTS.map(({ cup, label, leftPct, topPct }, index) => {
        const unlocked = index < unlockedCount;
        return (
          <div
            key={label}
            className={`absolute flex flex-col items-center gap-[14px] w-[30.8%] ${unlocked ? "cursor-pointer" : "cursor-default"}`}
            style={{ left: leftPct, top: topPct }}
            onMouseEnter={() => unlocked && setHoveredLabel(label)}
            onMouseLeave={() => setHoveredLabel(null)}
            onClick={() => unlocked && setSelectedDrink(LABEL_TO_FLOATER[label])}
          >
            <div className="scale-[0.7] md:scale-100 origin-top">
              {unlocked ? cup : <EmptyCup />}
            </div>
            <p
              className="font-['Inter_Tight',sans-serif] font-[300] text-[14px] leading-[1.2] tracking-[-0.02em] whitespace-nowrap text-center"
              style={{
                color: unlocked && (hoveredLabel === label || selectedLabel === label) ? "#faf9ff" : "#585564",
                transition: "color 0.15s ease",
              }}
            >
              {unlocked ? label : "?"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
