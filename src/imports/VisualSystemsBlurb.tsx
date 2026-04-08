import svgPaths from "./svg-508abvee8z";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  );
}

export default function VisualSystemsBlurb() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="Visual Systems Blurb">
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0" data-name="Rochester Institute of Technology">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="graduation-hat-02">
          <div className="absolute inset-[14.83%_8.33%_12.92%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-3.46%_-3%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2 18.541">
                <path d={svgPaths.pd809180} id="Icon" stroke="var(--stroke-0, #232226)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black whitespace-nowrap">New Media Design @ Rochester Institute of Tech</p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0" data-name="Design Work">
        <Wrapper>
          <g id="pointer-01">
            <path d={svgPaths.p3384ab00} id="Icon" stroke="var(--stroke-0, #232226)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </g>
        </Wrapper>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[18px] text-black whitespace-nowrap">
          <span className="leading-[1.5]">{`Designing for communities @ College of Science + `}</span>
          <span className="leading-[1.5] text-[#9a47ff]">Figma at RIT</span>
        </p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center relative rounded-[8px] shrink-0" data-name="Outside Work">
        <Wrapper>
          <g id="widget">
            <path d={svgPaths.p130ac980} fill="var(--fill-0, #232226)" id="Icon" />
          </g>
        </Wrapper>
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
