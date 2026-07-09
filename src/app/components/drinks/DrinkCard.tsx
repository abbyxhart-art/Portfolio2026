import React, { useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useDrink } from "../../context/DrinkContext";

type DrinkFloaterType = 'lychee' | 'matcha' | 'mango' | 'sesame';

export function EmptyCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#4f4c58] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#4f4c58] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function TaroMilkCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#4f4c58] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[#302f34] left-[5.4px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[12.6px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[9px] size-[3.6px] top-[30.6px]" />
      <div className="absolute flex items-center justify-center left-[17.1px] size-[4.383px] top-[49.5px]">
        <div className="flex-none rotate-[14.41deg]">
          <div className="bg-[#302f34] relative size-[3.6px]" />
        </div>
      </div>
      <div className="absolute bg-[#302f34] left-[29.7px] size-[3.6px] top-[34.2px]" />
      <div className="absolute bg-[#302f34] left-[29.7px] size-[3.6px] top-[41.4px]" />
      <div className="absolute bg-[#302f34] left-[24.3px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[24.3px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-[#302f34] left-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-[rgba(193,111,255,0.63)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#9c97a8] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#4f4c58] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function PeachCreamCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#4f4c58] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[23.4px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[32.4px] w-[33.3px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[31.5px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[24.3px] w-[33.3px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute bg-[rgba(255,255,255,0.7)] h-[15.3px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[39.6px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#9c97a8] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#4f4c58] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function MangoCocoCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#4f4c58] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(255,198,43,0.8)] h-[35.1px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[20.7px] w-[33.3px]" />
      <div className="absolute bg-white h-[7.2px] left-[2.7px] top-[13.5px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#9c97a8] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#4f4c58] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function ThaiTeaCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#4f4c58] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[18px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[37.8px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[25.2px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[30.6px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[32.4px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[23.4px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute bg-[#302f34] left-[5.4px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[12.6px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[9px] rounded-[9px] size-[3.6px] top-[30.6px]" />
      <div className="absolute bg-[#302f34] left-[17.1px] rounded-[9px] size-[3.6px] top-[49.5px]" />
      <div className="absolute bg-[#302f34] left-[29.7px] rounded-[9px] size-[3.6px] top-[34.2px]" />
      <div className="absolute bg-[#302f34] left-[29.7px] rounded-[9px] size-[3.6px] top-[41.4px]" />
      <div className="absolute bg-[#302f34] left-[24.3px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#302f34] left-[24.3px] rounded-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-[#302f34] left-[9px] rounded-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute border-[0.675px] border-[#9c97a8] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#4f4c58] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

type DrinkEntry = { cup: React.ReactNode; label: string; type: DrinkFloaterType };

const DRINKS: DrinkEntry[] = [
  { cup: <TaroMilkCup />,   label: "Taro Milk",     type: "lychee"  },
  { cup: <PeachCreamCup />, label: "Peach Cream",   type: "matcha"  },
  { cup: <MangoCocoCup />,  label: "Mango Coconut", type: "mango"   },
  { cup: <ThaiTeaCup />,    label: "Thai Tea",       type: "sesame"  },
];

const UNLOCK_KEY = "__portfolio_drinks_unlocked__";

function getUnlockedCount(): number {
  try {
    const stored = localStorage.getItem(UNLOCK_KEY);
    if (stored !== null) return parseInt(stored, 10);
    localStorage.setItem(UNLOCK_KEY, "2");
    return 2;
  } catch {
    return 2;
  }
}

interface DrinkCardProps {
  size?: number;
}

export default function DrinkCard({ size = 150 }: DrinkCardProps) {
  const [idx, setIdx] = useState(0);
  const [unlockedCount] = useState(getUnlockedCount);
  const [hovered, setHovered] = useState(false);
  const { setSelectedDrink } = useDrink();

  const isLocked = idx >= unlockedCount;
  const sc = size / 150;

  const handleTap = () => {
    const next = (idx + 1) % DRINKS.length;
    setIdx(next);
    if (next < unlockedCount) setSelectedDrink(DRINKS[next].type);
  };

  const current = DRINKS[idx];

  return (
    <div
      onClick={handleTap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-[12px] overflow-hidden cursor-pointer select-none"
      style={{
        width: size,
        height: size,
        background: "rgba(88,85,100,0.15)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {/* Header — single line, crossfades on hover */}
      <div className="absolute top-[12px] inset-x-0 flex justify-center" style={{ height: "1em" }}>
        <p
          className="absolute font-['Inter_Tight',sans-serif] text-[14px] leading-none text-foreground whitespace-nowrap"
          style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease" }}
        >
          Get a drink
        </p>
        <p
          className="absolute font-['Inter_Tight',sans-serif] text-[14px] leading-none text-muted-foreground whitespace-nowrap"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}
        >
          {isLocked ? "Return to unlock" : "Tap to cycle"}
        </p>
      </div>

      {/* Drink — centered, offset toward bottom half */}
      <div
        className="absolute flex flex-col items-center justify-end pb-[8px]"
        style={{
          gap: 14 * sc,
          width: 100 * sc,
          height: 93 * sc,
          left: "50%",
          top: `calc(50% + ${28.5 * sc}px)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center"
            style={{ gap: 14 * sc }}
          >
            {isLocked ? <EmptyCup /> : current.cup}
            <p
              className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.2] tracking-[-0.02em] whitespace-nowrap"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {isLocked ? "?" : current.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
