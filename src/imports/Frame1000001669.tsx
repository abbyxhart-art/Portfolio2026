import svgPaths from "./svg-yw2pw97xtv";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="-translate-x-1/2 absolute h-[62px] left-[calc(50%+0.5px)] top-0 w-[42px]" data-name="Illustration Mango Coconut">
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
      <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] left-0 text-[14px] text-black top-[101px] tracking-[-0.28px] whitespace-nowrap">Contact</p>
      <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] left-[calc(50%-9.5px)] text-[#716c87] text-[14px] top-[68px] tracking-[-0.28px] whitespace-nowrap">Sip</p>
    </div>
  );
}