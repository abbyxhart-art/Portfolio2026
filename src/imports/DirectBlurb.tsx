import svgPaths from "./svg-bkooxghgdq";

export default function DirectBlurb() {
  return (
    <div className="bg-[rgba(247,246,251,0.8)] content-stretch flex gap-[24px] items-start pl-[42px] pr-[25px] py-[24px] relative rounded-[100px] size-full" data-name="Direct Blurb">
      <div aria-hidden="true" className="absolute border border-[#c8c4d7] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)]" />
      <div className="h-[102.474px] relative shrink-0 w-[100px]" data-name="Flower Illustration">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 102.474">
          <g id="Flower Illustration">
            <path d={svgPaths.p130d1080} id="Vector 20" stroke="var(--stroke-0, black)" strokeWidth="1.13636" />
            <path d="M50 101.989V41.7614" id="Vector 19" stroke="var(--stroke-0, black)" strokeWidth="1.13636" />
            <path d={svgPaths.p1b175580} id="Vector 21" stroke="var(--stroke-0, black)" strokeWidth="1.13636" />
            <rect height="38.7845" id="Rectangle 1138" rx="19.3922" stroke="var(--stroke-0, black)" strokeWidth="0.568182" width="99.4318" x="0.284091" y="63.4055" />
            <path d={svgPaths.p63f8700} id="Rectangle 1139" stroke="var(--stroke-0, black)" strokeWidth="0.568182" />
            <path d={svgPaths.p13255700} fill="url(#paint0_linear_7_443)" id="Union" />
            <path d={svgPaths.p3ff4aa80} fill="url(#paint1_linear_7_443)" id="Union_2" />
            <g id="Rectangle 1140">
              <mask fill="white" id="path-8-inside-1_7_443">
                <path d={svgPaths.p1a1b6e00} />
              </mask>
              <path d={svgPaths.p1a1b6e00} fill="var(--fill-0, #DCDEF0)" fillOpacity="0.8" />
              <path d={svgPaths.p3012e200} fill="var(--stroke-0, black)" mask="url(#path-8-inside-1_7_443)" />
            </g>
            <path d={svgPaths.p26360200} fill="var(--fill-0, #7D26F4)" id="Union_3" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_7_443" x1="76.7045" x2="76.7045" y1="37.5" y2="53.4091">
              <stop stopColor="#9D89FF" />
              <stop offset="1" stopColor="#9A47FF" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_7_443" x1="50" x2="50" y1="10.2273" y2="47.7273">
              <stop stopColor="#B477FF" />
              <stop offset="1" stopColor="#9A47FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[404px]" data-name="Text">
        <div className="content-stretch flex flex-col gap-[2px] items-start leading-[1.5] not-italic relative shrink-0 text-[20px] w-full" data-name="Work">
          <p className="font-['Inter_Display:Medium',sans-serif] opacity-78 relative shrink-0 text-[#232226] w-full">Looking for work Summer 2026 / Full Time</p>
          <p className="font-['Inter_Display:Regular',sans-serif] opacity-78 relative shrink-0 text-[#716c87] w-full">Keeping things human with taste and intention</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Button">
          <div className="backdrop-blur-[2.5px] bg-[#ecdcff] content-stretch flex flex-col items-start px-[12px] py-[6px] relative rounded-[24px] shrink-0" data-name="casestudy-tag-2">
            <div aria-hidden="true" className="absolute border-[#e5cfff] border-[0.75px] border-solid inset-0 pointer-events-none rounded-[24px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[#9a47ff] text-[13px] whitespace-nowrap">Send an email</p>
          </div>
          <div className="backdrop-blur-[2.5px] bg-[#e8e7f0] content-stretch flex flex-col items-start px-[16px] py-[6px] relative rounded-[100px] shrink-0" data-name="casestudy-tag-2">
            <div aria-hidden="true" className="absolute border-[#d0d0d0] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[100px]" />
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.2] not-italic relative shrink-0 text-[#716c87] text-[13px] whitespace-nowrap">Let’s connect</p>
          </div>
        </div>
      </div>
    </div>
  );
}