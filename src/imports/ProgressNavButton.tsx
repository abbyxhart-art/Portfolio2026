import svgPaths from "./svg-b2qpao3xh9";

function Frame1000001344Helper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties} className="absolute flex items-center justify-center left-0 size-[32px] top-0">
      <div className="-rotate-90 flex-none">{children}</div>
    </div>
  );
}

export default function ProgressNavButton() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[9px] relative rounded-[100px] size-full" data-name="Progress Nav Button">
      <div aria-hidden="true" className="absolute border border-[#c8c4d7] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)]" />
      <div className="relative shrink-0 size-[32px]">
        <Frame1000001344Helper>
          <div className="relative size-[32px]" data-name="Progress Bar">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p10ca06b0} id="Progress Bar" opacity="0.3" stroke="var(--stroke-0, #716C87)" strokeWidth="3" />
            </svg>
          </div>
        </Frame1000001344Helper>
        <Frame1000001344Helper>
          <div className="relative size-[32px]" data-name="Base Ellipse">
            <div className="absolute inset-[45.31%_0_42.47%_90.54%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.02866 3.91051">
                <path d={svgPaths.p393ece00} id="Base Ellipse" stroke="var(--stroke-0, #3D384E)" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </Frame1000001344Helper>
        <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-[calc(50%-3px)] text-[#3d384e] text-[16px] top-[calc(50%-8px)] whitespace-nowrap">1</p>
      </div>
      <p className="flex-[1_0_0] font-['Inter_Tight:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px relative text-[#3d384e] text-[16px]">Section 1</p>
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="arrow-up">
        <div className="absolute inset-[20.83%]" data-name="Icon">
          <div className="absolute inset-[-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p3607bf00} id="Icon" stroke="var(--stroke-0, #8B86A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}