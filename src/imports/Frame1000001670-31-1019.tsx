import svgPaths from "./svg-d0qdjysyww";

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="graduation-hat-02">
          <div className="absolute inset-[14.83%_8.33%_12.92%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-3.03%_-2.62%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.05 18.391">
                <path d={svgPaths.p30bdfa00} id="Icon" stroke="var(--stroke-0, #232226)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black whitespace-nowrap">New Media Design @ Rochester Institute of Tech</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0">
        <div className="relative shrink-0 size-[24px]" data-name="pointer-01">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="pointer-01">
              <path d={svgPaths.p3384ab00} id="Icon" stroke="var(--stroke-0, #232226)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.975" />
            </g>
          </svg>
        </div>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] text-black whitespace-nowrap">
          <span className="leading-[1.5]">{`Designing for communities @ College of Science + `}</span>
          <span className="leading-[1.5] text-[#9a47ff]">Figma at RIT</span>
        </p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="widget">
          <div className="absolute h-[16.585px] left-[3.5px] top-[3.41px] w-[17.085px]" data-name="Icon">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0854 16.5848">
              <path d={svgPaths.p3c1babc0} fill="var(--fill-0, #232226)" id="Icon" />
            </svg>
          </div>
        </div>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] text-black whitespace-nowrap">
          <span className="leading-[1.5]">{`Making time for `}</span>
          <span className="leading-[1.5] text-[#9a47ff]">playful</span>
          <span className="leading-[1.5]">{` design work @ `}</span>
          <span className="leading-[1.5] text-[#9a47ff]">Winter Swan</span>
        </p>
      </div>
    </div>
  );
}