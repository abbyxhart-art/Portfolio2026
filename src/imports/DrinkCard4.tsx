import { useState } from "react";
import IllustrationMangoCoconut from "./IllustrationMangoCoconut";
import { useDrink } from "../app/context/DrinkContext";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties} className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
      <div className="flex-none rotate-[14.41deg]">{children}</div>
    </div>
  );
}

export default function DrinkCard() {
  const [hoveredDrink, setHoveredDrink] = useState<string | null>(null);
  const { selectedDrink, setSelectedDrink } = useDrink();

  return (
    <div className="content-stretch flex flex-col gap-[42px] items-center p-[36px] relative rounded-[12px] size-full" data-name="Drink Card 4">
      <div aria-hidden="true" className="absolute border border-[#b6b1c8] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]" />
      <div className="content-stretch flex flex-col font-['Inter_Tight:Regular',sans-serif] font-normal items-center leading-[1.5] relative shrink-0 text-[18px]" data-name="Title">
        <p className="relative shrink-0 text-[#232226] whitespace-nowrap">Thanks for visiting, have a drink while you look around :D</p>
        <p className="min-w-full relative shrink-0 text-[#7E7C87] text-center w-[min-content]">Visit again to unlock more flavors</p>
      </div>
      <div className="content-stretch flex gap-[36px] items-center relative shrink-0 w-full" data-name="Boba Frame">
        <div 
          className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[94px] cursor-pointer" 
          data-name="Mango Coconut"
          onMouseEnter={() => setHoveredDrink('mango')}
          onMouseLeave={() => setHoveredDrink(null)}
          onClick={() => setSelectedDrink('mango')}
        >
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Mango Coconut">
            <IllustrationMangoCoconut />
          </div>
          <p className={`font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] tracking-[-0.28px] w-[min-content] transition-colors duration-200 ${selectedDrink === 'mango' ? 'text-[#232226]' : hoveredDrink === 'mango' ? 'text-[#232226]' : 'text-[#a29db6]'}`}>Mango Coconut</p>
        </div>
        <div 
          className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[86px] cursor-pointer" 
          data-name="Matcha Cream"
          onMouseEnter={() => setHoveredDrink('matcha')}
          onMouseLeave={() => setHoveredDrink(null)}
          onClick={() => setSelectedDrink('matcha')}
        >
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Matcha Cream">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px]" data-name="Matcha" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
          <p className={`font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] tracking-[-0.28px] w-[min-content] transition-colors duration-200 ${selectedDrink === 'matcha' ? 'text-[#232226]' : hoveredDrink === 'matcha' ? 'text-[#232226]' : 'text-[#a29db6]'}`}>Matcha Cream</p>
        </div>
        <div 
          className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[74px] cursor-pointer" 
          data-name="Lychee Rose"
          onMouseEnter={() => setHoveredDrink('lychee')}
          onMouseLeave={() => setHoveredDrink(null)}
          onClick={() => setSelectedDrink('lychee')}
        >
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Lychee Rose">
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
          <p className={`font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] tracking-[-0.28px] w-[min-content] transition-colors duration-200 ${selectedDrink === 'lychee' ? 'text-[#232226]' : hoveredDrink === 'lychee' ? 'text-[#232226]' : 'text-[#a29db6]'}`}>Lychee Rose</p>
        </div>
        <div 
          className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[82px] cursor-pointer" 
          data-name="Black Sesame"
          onMouseEnter={() => setHoveredDrink('sesame')}
          onMouseLeave={() => setHoveredDrink(null)}
          onClick={() => setSelectedDrink('sesame')}
        >
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Black Sesame">
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
          <p className={`font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[14px] tracking-[-0.28px] w-[min-content] transition-colors duration-200 ${selectedDrink === 'sesame' ? 'text-[#232226]' : hoveredDrink === 'sesame' ? 'text-[#232226]' : 'text-[#a29db6]'}`}>Black Sesame</p>
        </div>
      </div>
    </div>
  );
}