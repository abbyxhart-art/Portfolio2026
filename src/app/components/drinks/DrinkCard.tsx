import React, { useState } from "react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useDrink } from "../../context/DrinkContext";

type DrinkFloaterType = 'lychee' | 'matcha' | 'mango' | 'sesame';

export function EmptyCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#7e7c87] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#7e7c87] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function TaroMilkCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#7e7c87] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-white left-[5.4px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-white left-[12.6px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-white left-[9px] size-[3.6px] top-[30.6px]" />
      <div className="absolute flex items-center justify-center left-[17.1px] size-[4.383px] top-[49.5px]">
        <div className="flex-none rotate-[14.41deg]">
          <div className="bg-white relative size-[3.6px]" />
        </div>
      </div>
      <div className="absolute bg-white left-[29.7px] size-[3.6px] top-[34.2px]" />
      <div className="absolute bg-white left-[29.7px] size-[3.6px] top-[41.4px]" />
      <div className="absolute bg-white left-[24.3px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-white left-[24.3px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-white left-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-[rgba(193,111,255,0.63)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#7e7c87] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function PeachCreamCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#7e7c87] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[23.4px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[32.4px] w-[33.3px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[31.5px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[24.3px] w-[33.3px]" />
      <div className="absolute bg-[rgba(251,192,191,0.7)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute bg-[rgba(255,255,255,0.7)] h-[15.3px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[39.6px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#7e7c87] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function MangoCocoCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#7e7c87] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(255,198,43,0.8)] h-[35.1px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[20.7px] w-[33.3px]" />
      <div className="absolute bg-white h-[7.2px] left-[2.7px] top-[13.5px] w-[33.3px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#7e7c87] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
    </div>
  );
}

export function ThaiTeaCup() {
  return (
    <div className="h-[55.8px] relative w-[37.8px]">
      <div className="absolute bg-[#7e7c87] h-[47.7px] left-[18px] top-0 w-[3.6px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[18px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[37.8px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[25.2px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[30.6px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[32.4px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[23.4px] w-[33.3px]" />
      <div className="absolute bg-[rgba(224,110,69,0.5)] h-[39.6px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[16.2px] w-[33.3px]" />
      <div className="absolute bg-[#161617] left-[5.4px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#161617] left-[12.6px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#161617] left-[9px] rounded-[9px] size-[3.6px] top-[30.6px]" />
      <div className="absolute bg-[#161617] left-[17.1px] rounded-[9px] size-[3.6px] top-[49.5px]" />
      <div className="absolute bg-[#161617] left-[29.7px] rounded-[9px] size-[3.6px] top-[34.2px]" />
      <div className="absolute bg-[#161617] left-[29.7px] rounded-[9px] size-[3.6px] top-[41.4px]" />
      <div className="absolute bg-[#161617] left-[24.3px] rounded-[9px] size-[3.6px] top-[37.8px]" />
      <div className="absolute bg-[#161617] left-[24.3px] rounded-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute bg-[#161617] left-[9px] rounded-[9px] size-[3.6px] top-[45px]" />
      <div className="absolute border-[0.675px] border-[#7e7c87] border-solid h-[47.7px] left-[2.7px] rounded-bl-[21.6px] rounded-br-[21.6px] top-[8.1px] w-[33.3px]" />
      <div className="absolute bg-[#7e7c87] h-[3.6px] left-0 rounded-[9px] top-[5.4px] w-[37.8px]" />
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
  labelSize?: number;
  /** "cycle" (default) shows one drink at a time, tap to advance — used
   * wherever the card is too small to fit all 4 at once. "grid" lays all 4
   * out in a 2x2 at once, for the larger About-page card that has the room. */
  layout?: "cycle" | "grid";
}

function ArrowButton({
  direction,
  pillSize,
  iconSize,
  visible,
  onClick,
}: {
  direction: "left" | "right";
  pillSize: number;
  iconSize: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer shrink-0"
      style={{
        width: pillSize,
        height: pillSize,
        marginTop: -pillSize * 0.3,
        color: hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "color 0.15s ease, opacity 0.2s ease",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "100%",
          height: "100%",
          background: "var(--color-surface-fill3)",
          border: "1px solid var(--color-border-default)",
          transition: "background 0.15s ease",
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 10 10" fill="none">
          <path
            d={direction === "left" ? "M6.5 1.5L2.5 5l4 3.5" : "M3.5 1.5L7.5 5l-4 3.5"}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

function CycleDrinkCard({ size, labelSize }: { size: number; labelSize: number }) {
  const [idx, setIdx] = useState(0);
  const [unlockedCount] = useState(getUnlockedCount);
  const [hovered, setHovered] = useState(false);
  const [drinkHovered, setDrinkHovered] = useState(false);
  const { setSelectedDrink } = useDrink();

  const isLocked = idx >= unlockedCount;
  const sc = size / 150;

  const prev = () => setIdx((i) => (i - 1 + DRINKS.length) % DRINKS.length);
  const next = () => setIdx((i) => (i + 1) % DRINKS.length);
  const selectCurrent = () => { if (!isLocked) setSelectedDrink(DRINKS[idx].type); };

  const current = DRINKS[idx];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-[12px] overflow-hidden select-none"
      style={{
        // Widens on hover so the arrow buttons flanking the drink have
        // room without feeling cramped against the card's edge.
        width: hovered ? size + 64 : size,
        height: size,
        background: "rgba(88,85,100,0.15)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        transition: "width 0.5s cubic-bezier(0.33, 0, 0, 1)",
      }}
    >
      {/* Header — single line, crossfades on hover */}
      <div className="absolute top-[12px] inset-x-0 flex justify-center" style={{ height: "1em" }}>
        <p
          className="absolute font-['Inter_Tight',sans-serif] leading-none text-foreground whitespace-nowrap"
          style={{ fontSize: labelSize, opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease" }}
        >
          Get a drink
        </p>
        <p
          className="absolute font-['Inter_Tight',sans-serif] leading-none text-muted-foreground whitespace-nowrap"
          style={{ fontSize: labelSize, opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}
        >
          {isLocked ? "Return to unlock" : "Tap to select"}
        </p>
      </div>

      {/* Drink — arrows (either side) cycle through drinks; tapping the drink itself selects it */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          gap: 10 * sc,
          left: "50%",
          top: `calc(50% + ${28.5 * sc}px)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <ArrowButton direction="left" pillSize={34 * sc} iconSize={13 * sc} visible={hovered} onClick={prev} />

        <button
          type="button"
          onClick={selectCurrent}
          onMouseEnter={(e) => { e.stopPropagation(); setDrinkHovered(true); }}
          onMouseLeave={() => setDrinkHovered(false)}
          className="flex flex-col items-center justify-end pb-[8px] bg-transparent border-0 p-0"
          style={{ gap: 14 * sc, width: 100 * sc, height: 93 * sc, cursor: isLocked ? "default" : "pointer" }}
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
                style={{
                  color: drinkHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  transition: "color 0.15s ease",
                }}
              >
                {isLocked ? "?" : current.label}
              </p>
            </motion.div>
          </AnimatePresence>
        </button>

        <ArrowButton direction="right" pillSize={34 * sc} iconSize={13 * sc} visible={hovered} onClick={next} />
      </div>
    </div>
  );
}

function GridDrinkCard({ size, labelSize }: { size: number; labelSize: number }) {
  const [unlockedCount] = useState(getUnlockedCount);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { setSelectedDrink } = useDrink();

  return (
    <div
      className="relative rounded-[12px] overflow-hidden select-none"
      style={{
        width: size,
        height: size,
        background: "rgba(88,85,100,0.15)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      {/* Header */}
      <div className="absolute top-[12px] inset-x-0 flex justify-center">
        <p
          className="font-['Inter_Tight',sans-serif] leading-none text-foreground whitespace-nowrap"
          style={{ fontSize: labelSize }}
        >
          Get a drink
        </p>
      </div>

      {/* 2x2 grid — all 4 drinks at once, locked ones shown as a mystery cup */}
      <div
        className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center"
        style={{ paddingTop: 40, paddingBottom: 16 }}
      >
        {DRINKS.map((drink, i) => {
          const locked = i >= unlockedCount;
          return (
            <button
              key={drink.label}
              type="button"
              onClick={() => { if (!locked) setSelectedDrink(drink.type); }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex flex-col items-center gap-[10px] bg-transparent border-0 p-0"
              style={{ cursor: locked ? "default" : "pointer" }}
            >
              {locked ? <EmptyCup /> : drink.cup}
              <p
                className="font-['Inter_Tight',sans-serif] text-[13px] leading-[1.2] tracking-[-0.02em] whitespace-nowrap"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {locked ? (hoveredIdx === i ? "Return to unlock" : "?") : drink.label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DrinkCard({ size = 150, labelSize = 14, layout = "cycle" }: DrinkCardProps) {
  return layout === "grid"
    ? <GridDrinkCard size={size} labelSize={labelSize} />
    : <CycleDrinkCard size={size} labelSize={labelSize} />;
}
