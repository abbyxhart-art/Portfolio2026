import svgPaths from "./svg-ifh7tf13u6";

export default function SectionLanding() {
  return (
    <div className="overflow-clip relative rounded-[2px] size-full" data-name="Section Landing">
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[32px] items-center left-1/2 top-[479px]" data-name="Visual Systems">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[320px]" data-name="Blurb RIT">
          <div aria-hidden="true" className="absolute border-[1.25px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex-[1_0_0] h-[45px] min-h-px min-w-px overflow-clip relative" data-name="book-open-01">
            <div className="absolute inset-[12.5%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-2.08%_-1.87%_-2.08%_-1.88%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.9062 35.1562">
                  <path d={svgPaths.p5111a00} id="Icon" stroke="var(--stroke-0, #13A42E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.40625" />
                </svg>
              </div>
            </div>
          </div>
          <div className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black whitespace-nowrap">
            <p className="mb-0">New Media Design</p>
            <p>@ Rochester Institute of Tech</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] shrink-0 w-[320px]" data-name="Blurb Design">
          <div aria-hidden="true" className="absolute border-[1.25px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="relative shrink-0 size-[45px]" data-name="Variable value">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
              <g id="Variable value">
                <path d={svgPaths.p16791780} id="Vector 3633" stroke="var(--stroke-0, #FB21F3)" strokeLinecap="round" strokeWidth="1.77778" />
                <circle cx="22.5381" cy="22.5381" fill="var(--fill-0, #FB21F3)" id="Ellipse 2852" r="3" />
              </g>
            </svg>
          </div>
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black w-[209px]">Interdisciplinary designer with playable prototypes</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute font-['Inter_Tight:Medium',sans-serif] font-[450] leading-[0] left-[calc(25%+432px)] text-[#232226] text-[50px] text-center top-[229px] tracking-[-1px] w-[650px]">
        <p className="leading-[1.2] mb-0">I’m Abby :D</p>
        <p>
          <span className="leading-[1.2]">{`I design `}</span>
          <span className="leading-[1.2] text-[#9a47ff]">visual systems</span>
          <span className="leading-[1.2]">{` to `}</span>
          <span className="leading-[1.2] text-[#a29db6]">direct</span>
          <span className="leading-[1.2]">{` + `}</span>
          <span className="leading-[1.2] text-[#a29db6]">delight</span>
        </p>
      </div>
      <div className="-translate-x-1/2 absolute h-[533px] left-[calc(50%+0.5px)] top-[-273px] w-[1805px]" data-name="Top Gradient">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1805 533">
          <ellipse cx="902.5" cy="266.5" fill="url(#paint0_radial_6_182)" fillOpacity="0.3" id="Ellipse 54" opacity="0.8" rx="902.5" ry="266.5" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(902.5 266.5) rotate(180) scale(902.5 266.5)" gradientUnits="userSpaceOnUse" id="paint0_radial_6_182" r="1">
              <stop stopColor="#9A47FF" />
              <stop offset="1" stopColor="#9A47FF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}