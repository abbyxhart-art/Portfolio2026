import IllustrationMangoCoconut from "../../imports/IllustrationMangoCoconut";

export type DrinkType = "Mango Coconut" | "Matcha Cream" | "Lychee Rose" | "Black Sesame";
export type DrinkState = "Default" | "Hover" | "Active" | "Locked";

type DrinkMenuProps = {
  drinkType?: DrinkType;
  state?: DrinkState;
  className?: string;
};

export default function DrinkMenu({ drinkType = "Mango Coconut", state = "Default", className }: DrinkMenuProps) {
  const isLocked = state === "Locked";
  const isActive = state === "Hover" || state === "Active";
  const labelStyle = {
    color: isActive ? "var(--text/primary, #232226)" : "var(--text/tertiary, #7e7c87)",
    transition: "color 150ms ease-out",
  };

  return (
    <div className={className || "content-stretch flex flex-col gap-[14px] items-center relative w-[100px]"}>
      {/* Illustration */}
      <div className="h-[62px] relative shrink-0 w-[42px]">
        {drinkType === "Mango Coconut" && (
          isLocked ? (
            <>
              <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[53px] left-[20px] top-0 w-[4px]" />
              <div className="absolute border-[0.75px] border-[var(--neutral\/10,#3f3e47)] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
              <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
            </>
          ) : (
            <IllustrationMangoCoconut />
          )
        )}

        {drinkType === "Matcha Cream" && (
          <>
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[53px] left-[20px] top-0 w-[4px]" />
            <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(94,135,90,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className="absolute border-[0.75px] border-[var(--neutral\/10,#3f3e47)] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
          </>
        )}

        {drinkType === "Lychee Rose" && (
          <>
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[53px] left-[20px] top-0 w-[4px]" />
            <div className={`absolute bg-[#fb21f3] left-[6px] size-[4px] top-[42px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[14px] size-[4px] top-[42px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[10px] size-[4px] top-[34px] ${isLocked ? "opacity-0" : ""}`} />
            <div className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
              <div className="flex-none rotate-[14.41deg]">
                <div className={`bg-[#fb21f3] size-[4px] ${isLocked ? "opacity-0" : ""}`} />
              </div>
            </div>
            <div className={`absolute bg-[#fb21f3] left-[33px] size-[4px] top-[38px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[33px] size-[4px] top-[46px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[27px] size-[4px] top-[42px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[27px] size-[4px] top-[50px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[#fb21f3] left-[10px] size-[4px] top-[50px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(193,111,255,0.45)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className="absolute border-[0.75px] border-[var(--neutral\/10,#3f3e47)] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
          </>
        )}

        {drinkType === "Black Sesame" && (
          <>
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[53px] left-[20px] top-0 w-[4px]" />
            <div className={`absolute left-[6px] rounded-[10px] size-[4px] top-[42px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[14px] rounded-[10px] size-[4px] top-[42px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[10px] rounded-[10px] size-[4px] top-[34px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
              <div className="flex-none rotate-[14.41deg]">
                <div className={`rounded-[10px] size-[4px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
              </div>
            </div>
            <div className={`absolute left-[33px] rounded-[10px] size-[4px] top-[38px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[33px] rounded-[10px] size-[4px] top-[46px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[27px] rounded-[10px] size-[4px] top-[42px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[27px] rounded-[10px] size-[4px] top-[50px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute left-[10px] rounded-[10px] size-[4px] top-[50px] ${isLocked ? "bg-[var(--text\/quatrinary,#aeabb9)] opacity-0" : "bg-[var(--text\/primary,#232226)]"}`} />
            <div className={`absolute bg-[rgba(113,108,135,0.2)] h-[20px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[42px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(113,108,135,0.2)] h-[28px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[34px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(113,108,135,0.2)] h-[36px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[26px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className={`absolute bg-[rgba(113,108,135,0.2)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px] ${isLocked ? "opacity-0" : ""}`} />
            <div className="absolute border-[0.75px] border-[var(--neutral\/10,#3f3e47)] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" />
            <div className="absolute bg-[var(--neutral\/10,#3f3e47)] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" />
          </>
        )}
      </div>

      {/* Label */}
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[14px] tracking-[-0.28px] whitespace-nowrap" style={labelStyle}>
        {isLocked ? "?" : drinkType}
      </p>
    </div>
  );
}
