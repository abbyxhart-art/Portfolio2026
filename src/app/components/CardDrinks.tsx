import { useState } from "react";
import DrinkMenu, { DrinkState } from "./DrinkMenu";

export type CardDrinksProperty = "Drink 1 Unlocked" | "Drink 2 Unlocked" | "Drink 3 Unlocked" | "Drink 4 Unlocked";

type DrinkKey = "mango" | "matcha" | "lychee" | "sesame";

const drinkKeyMap: Record<string, DrinkKey> = {
  "Mango Coconut": "mango",
  "Matcha Cream": "matcha",
  "Lychee Rose": "lychee",
  "Black Sesame": "sesame",
};

type CardDrinksProps = {
  className?: string;
  property1?: CardDrinksProperty;
  onDrinkClick?: (drink: DrinkKey) => void;
  onReset?: () => void;
};

const drinks = [
  { drinkType: "Mango Coconut" as const, index: 1 },
  { drinkType: "Matcha Cream" as const, index: 2 },
  { drinkType: "Lychee Rose" as const, index: 3 },
  { drinkType: "Black Sesame" as const, index: 4 },
];

export default function CardDrinks({
  className,
  property1 = "Drink 1 Unlocked",
  onDrinkClick,
  onReset,
}: CardDrinksProps) {
  const unlockedCount = parseInt(property1.charAt(6));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getDrinkState = (index: number): DrinkState => {
    if (index > unlockedCount) return "Locked";
    if (activeIndex === index) return "Active";
    if (hoveredIndex === index) return "Hover";
    return "Default";
  };

  return (
    <div className={className || "border border-[#b6b1c8] border-solid content-stretch flex flex-col gap-[42px] items-center p-[36px] relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]"}>
      <div className="content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight',sans-serif)] gap-[8px] items-center leading-none not-italic relative shrink-0 text-[length:var(--text-size\/default,18px)] whitespace-nowrap">
        <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">
          Want to drink while you scroll?
        </p>
        {unlockedCount >= 4 && onReset ? (
          <button
            onClick={onReset}
            className="bg-transparent border-none cursor-pointer p-0 font-[family-name:var(--text-font\/default,'Inter_Tight',sans-serif)] text-[length:var(--text-size\/default,18px)] text-[color:var(--text\/tertiary,#7e7c87)] hover:text-[color:var(--text\/primary,#232226)] transition-colors leading-none"
          >
            new cup, please?
          </button>
        ) : (
          <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)] text-center">
            Visit again to unlock more flavors!
          </p>
        )}
      </div>
      <div className="content-stretch flex gap-[36px] items-center relative shrink-0 w-full">
        {drinks.map(({ drinkType, index }) => {
          const isUnlocked = index <= unlockedCount;
          const drinkState = getDrinkState(index);

          if (!isUnlocked) {
            return (
              <DrinkMenu key={drinkType} drinkType={drinkType} state="Locked" />
            );
          }

          return (
            <div
              key={drinkType}
              className="cursor-pointer select-none"
              onMouseEnter={() => {
                if (activeIndex !== index) setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                if (activeIndex !== index) setHoveredIndex(null);
              }}
              onClick={() => {
                setActiveIndex(index);
                setHoveredIndex(null);
                onDrinkClick?.(drinkKeyMap[drinkType]);
              }}
            >
              <DrinkMenu drinkType={drinkType} state={drinkState} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
