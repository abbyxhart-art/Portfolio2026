import svgPaths from "./svg-wvl1l36yrg";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties} className="absolute flex items-center justify-center left-[19px] size-[4.869px] top-[55px]">
      <div className="flex-none rotate-[14.41deg]">{children}</div>
    </div>
  );
}

export default function DrinkCard() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center p-[36px] relative rounded-[12px] size-full" data-name="Drink Card">
      <div aria-hidden="true" className="absolute border border-[#b6b1c8] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]" />
      <div className="content-stretch flex flex-col font-['Inter_Tight:Regular',sans-serif] font-normal gap-[6px] items-center leading-[1.2] relative shrink-0 text-[16px] tracking-[-0.32px]" data-name="Title">
        <p className="relative shrink-0 text-[#232226] whitespace-nowrap">Thanks for visiting, have a drink while you look around :D</p>
        <p className="min-w-full relative shrink-0 text-[#716c87] text-center w-[min-content]">Visit again to unlock more flavors</p>
      </div>
      <div className="content-stretch flex gap-[36px] items-center relative shrink-0 w-full" data-name="Boba Frame">
        <div className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[94px]" data-name="Mango Coconut">
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Mango Coconut">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 62">
              <g id="Illustration Mango Coconut">
                <rect fill="var(--fill-0, #302F33)" height="53" id="Straw" width="4" x="20" />
                <path d={svgPaths.p264f8680} fill="var(--fill-0, #FDD16E)" fillOpacity="0.7" id="Tea" />
                <path d={svgPaths.p1bc9db80} fill="var(--fill-0, #EAEAEA)" id="Cloud" />
                <path d={svgPaths.p3ea93df0} id="Cup" stroke="var(--stroke-0, #302F33)" strokeWidth="0.75" />
                <rect fill="var(--fill-0, #302F33)" height="4" id="Lid" rx="2" width="42" y="6" />
              </g>
            </svg>
          </div>
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#a29db6] text-[14px] tracking-[-0.28px] w-[min-content]">Mango Coconut</p>
        </div>
        <div className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[86px]" data-name="Matcha Cream">
          <div className="h-[62px] relative shrink-0 w-[42px]" data-name="Illustration Matcha Cream">
            <div className="absolute bg-[#302f33] h-[53px] left-[20px] top-0 w-[4px]" data-name="Straw" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[26px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[36px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[35px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[27px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(94,135,90,0.7)] h-[44px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[18px] w-[37px]" data-name="Matcha" />
            <div className="absolute bg-[rgba(255,255,255,0.7)] h-[17px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[45px] w-[37px]" data-name="Matcha" />
            <div className="absolute border-[#302f33] border-[0.75px] border-solid h-[53px] left-[3px] rounded-bl-[24px] rounded-br-[24px] top-[9px] w-[37px]" data-name="Cup" />
            <div className="absolute bg-[#302f33] h-[4px] left-0 rounded-[10px] top-[6px] w-[42px]" data-name="Lid" />
          </div>
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#a29db6] text-[14px] tracking-[-0.28px] w-[min-content]">Matcha Cream</p>
        </div>
        <div className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[74px]" data-name="Lychee Rose">
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
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#a29db6] text-[14px] tracking-[-0.28px] w-[min-content]">Lychee Rose</p>
        </div>
        <div className="content-stretch flex flex-col gap-[14px] items-center relative shrink-0 w-[82px]" data-name="Black Sesame">
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
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] min-w-full relative shrink-0 text-[#a29db6] text-[14px] tracking-[-0.28px] w-[min-content]">Black Sesame</p>
        </div>
      </div>
    </div>
  );
}