import MiniInteractionMangoCoconut from "./MiniInteractionMangoCoconut";
import MiniInteractionMatchaCream from "./MiniInteractionMatchaCream";
import MiniInteractionLycheeRose from "./MiniInteractionLycheeRose";
import MiniInteractionBlackSesame from "./MiniInteractionBlackSesame";
import { useState } from "react";

interface DrinkFloaterProps {
  drinkType: 'mango' | 'matcha' | 'lychee' | 'sesame';
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties} className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
      <div className="flex-none rotate-[14.41deg]">{children}</div>
    </div>
  );
}

export default function DrinkFloater({ drinkType }: DrinkFloaterProps) {
  const [isSipHovered, setIsSipHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  
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
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px]" data-name="Matcha" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
      case 'lychee':
        return (
          <div className="h-[62px] relative w-[42px]">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[#fb21f3] left-[6px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[14px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[10px] size-[4px] top-[34px]" data-name="Boba" />
            <Wrapper>
              <div className="bg-[#fb21f3] size-[4px]" data-name="Boba" />
            </Wrapper>
            <div className="absolute bg-[#fb21f3] left-[33px] size-[4px] top-[38px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[33px] size-[4px] top-[46px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[27px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[27px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[#fb21f3] left-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[rgba(193,111,255,0.45)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Lychee" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
      case 'sesame':
        return (
          <div className="h-[62px] relative w-[42px]">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-black left-[6px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-black left-[14px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-black left-[10px] rounded-[10px] size-[4px] top-[34px]" data-name="Boba" />
            <Wrapper>
              <div className="bg-black rounded-[10px] size-[4px]" data-name="Boba" />
            </Wrapper>
            <div className="absolute bg-black left-[33px] rounded-[10px] size-[4px] top-[38px]" data-name="Boba" />
            <div className="absolute bg-black left-[33px] rounded-[10px] size-[4px] top-[46px]" data-name="Boba" />
            <div className="absolute bg-black left-[27px] rounded-[10px] size-[4px] top-[42px]" data-name="Boba" />
            <div className="absolute bg-black left-[27px] rounded-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-black left-[10px] rounded-[10px] size-[4px] top-[50px]" data-name="Boba" />
            <div className="absolute bg-[rgba(113,108,135,0.2)] h-[20px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[42px] w-[37px]" data-name="Black Sesame" />
            <div className="absolute bg-[rgba(113,108,135,0.2)] h-[28px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[34px] w-[37px]" data-name="Black Sesame" />
            <div className="absolute bg-[rgba(113,108,135,0.2)] h-[36px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[26px] w-[37px]" data-name="Black Sesame" />
            <div className="absolute bg-[rgba(113,108,135,0.2)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Black Sesame" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
        );
    }
  };

  return (
    <div
      className="fixed bottom-[16px] h-[129px] left-[16px] w-[85px] z-50 animate-[fadeIn_0.4s_ease-out]"
    >
      <div className="relative size-full">
        <div className="absolute top-0 left-0">
          {drinkType === 'mango' && <MiniInteractionMangoCoconut />}
          {drinkType === 'matcha' && <MiniInteractionMatchaCream />}
          {drinkType === 'lychee' && <MiniInteractionLycheeRose />}
          {drinkType === 'sesame' && <MiniInteractionBlackSesame />}
        </div>
        <p
          className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] left-0 text-[14px] top-[101px] tracking-[-0.28px] whitespace-nowrap cursor-pointer"
          style={{ color: isContactHovered ? "var(--text-primary)" : "var(--text-tertiary)", transition: "color 150ms ease-out" }}
          onMouseEnter={() => setIsContactHovered(true)}
          onMouseLeave={() => setIsContactHovered(false)}
        >Contact</p>
      </div>
    </div>
  );
}