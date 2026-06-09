import MiniInteractionMangoCoconut from "./MiniInteractionMangoCoconut";
import MiniInteractionMatchaCream from "./MiniInteractionMatchaCream";
import MiniInteractionLycheeRose from "./MiniInteractionLycheeRose";
import MiniInteractionBlackSesame from "./MiniInteractionBlackSesame";
import { useState } from "react";
import { useDrink } from "../../context/DrinkContext";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties} className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
      <div className="flex-none rotate-[14.41deg]">{children}</div>
    </div>
  );
}

export default function DrinkFloater() {
  const { selectedDrink } = useDrink();
  const [isSipHovered, setIsSipHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  // Hidden until the user picks a drink on the About page
  if (!selectedDrink) return null;

  const drinkType = selectedDrink;
  
  const getDrinkIllustration = () => {
    switch (drinkType) {
      case 'mango':
        return (
          <div className="h-[62px] relative w-[42px]">
            <IllustrationMangoCoconut />
          </div>
        );
      case 'matcha':
        return (
          <div className="h-[62px] relative w-[42px]">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[rgba(251,192,191,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px]" data-name="Peach" />
            <div className="absolute bg-[rgba(251,192,191,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px]" data-name="Peach" />
            <div className="absolute bg-[rgba(251,192,191,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Peach" />
            <div className="absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px]" data-name="Matcha" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
      case 'lychee':
        return (
          <div className="h-[62px] relative w-[42px]">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[#9a47ff] left-[6px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[14px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[10px] size-[4px] top-[34px]" data-name="Boba" />
            <Wrapper>
              <div className="bg-[#9a47ff] size-[4px]" data-name="Boba" />
            </Wrapper>
            <div className="absolute bg-[#9a47ff] left-[33px] size-[4px] top-[38px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[33px] size-[4px] top-[46px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[27px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[27px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[#9a47ff] left-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[rgba(193,111,255,0.45)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Lychee" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
      case 'sesame':
        return (
          <div className="h-[62px] relative w-[42px]">
            <div className="absolute bg-[#7e7c87] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[#161617] left-[6px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[14px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[34px]" data-name="Boba" />
            <Wrapper>
              <div className="bg-[#161617] rounded-[10px] size-[4px]" data-name="Boba" />
            </Wrapper>
            <div className="absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[38px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[33px] rounded-[10px] size-[4px] top-[46px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[27px] rounded-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[#161617] left-[10px] rounded-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[rgba(224,110,69,0.5)] h-[20px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[42px] w-[37px]" data-name="Thai Tea" />
            <div className="absolute bg-[rgba(224,110,69,0.5)] h-[28px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[34px] w-[37px]" data-name="Thai Tea" />
            <div className="absolute bg-[rgba(224,110,69,0.5)] h-[36px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[26px] w-[37px]" data-name="Thai Tea" />
            <div className="absolute bg-[rgba(224,110,69,0.5)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Thai Tea" />
            <div className="absolute border-[#7e7c87] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#7e7c87] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
    }
  };

  return (
    <div className="hidden md:flex fixed bottom-[16px] left-[16px] z-50 flex-col items-start gap-[8px] animate-[fadeIn_0.4s_ease-out]">
      {drinkType === 'mango' && <MiniInteractionMangoCoconut />}
      {drinkType === 'matcha' && <MiniInteractionMatchaCream />}
      {drinkType === 'lychee' && <MiniInteractionLycheeRose />}
      {drinkType === 'sesame' && <MiniInteractionBlackSesame />}
      <p
        className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] tracking-[-0.28px] whitespace-nowrap cursor-pointer"
        style={{ color: isContactHovered ? "#faf9ff" : "#908e99", transition: "color 150ms ease-out" }}
        onMouseEnter={() => setIsContactHovered(true)}
        onMouseLeave={() => setIsContactHovered(false)}
      >Contact</p>
    </div>
  );
}