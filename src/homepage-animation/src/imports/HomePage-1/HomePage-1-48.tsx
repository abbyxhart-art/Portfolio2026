import svgPaths from "./svg-xhpijvt5cg";

function Icon() {
  return (
    <div className="bg-[rgba(88,85,100,0.15)] content-stretch flex items-center justify-center p-[10px] relative rounded-[4px] shrink-0 size-[24px]" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="figma">
        <div className="absolute inset-[6.25%_20.83%]" data-name="Icon">
          <div className="absolute inset-[-3.57%_-5.36%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.625 16.875">
              <path d={svgPaths.p6b4b300} id="Icon" stroke="var(--stroke-0, #908E99)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Icon />
      <p className="[word-break:break-word] font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0.7] relative shrink-0 text-[#908e99] text-[12px] text-center whitespace-nowrap">Building communities @ Figma Campus</p>
    </div>
  );
}

function Building() {
  return (
    <div className="h-[13.21px] relative shrink-0 w-[16px]" data-name="Building">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0002 13.21">
        <g id="Building">
          <path d={svgPaths.p1b14ba00} fill="var(--fill-0, #908E99)" id="Vector" />
          <path d={svgPaths.pace5b80} fill="var(--fill-0, #908E99)" id="Vector_2" />
          <path d={svgPaths.p1c5ddba8} fill="var(--fill-0, #908E99)" id="Vector_3" />
          <path d={svgPaths.p19877b80} fill="var(--fill-0, #908E99)" id="Vector_4" />
          <path d={svgPaths.p31cf86c0} fill="var(--fill-0, #908E99)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[rgba(88,85,100,0.15)] content-stretch flex items-center justify-center p-[10px] relative rounded-[4px] shrink-0 size-[24px]">
      <Building />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame />
      <p className="[word-break:break-word] font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0.7] relative shrink-0 text-[#908e99] text-[12px] text-center whitespace-nowrap">Led a company rebrand @ Capitol</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-start justify-center left-[calc(50%+0.5px)] top-[219px] w-[277px]">
      <Frame1 />
      <Frame2 />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#161617] relative size-full" data-name="Home Page">
      <div className="-translate-x-1/2 absolute bg-gradient-to-t from-[rgba(22,22,23,0.2)] h-[410px] left-1/2 opacity-50 to-[#afa4d8] top-0 w-[1728px]" />
      <p className="[word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] left-[863.5px] text-[16px] text-black top-[451px] whitespace-nowrap">​</p>
      <div className="-translate-x-1/2 absolute bg-[#d9d9d9] h-[363px] left-[calc(50%-47.5px)] top-[395px] w-[1339px]" data-name="Loading screen" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0.7] left-[calc(50%+1px)] lowercase text-[12px] text-center text-white top-[62px] whitespace-nowrap">creative technologist / product designer</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[0.7] left-[865px] text-[50px] text-center text-white top-[91px] w-[344px]">Abby Hart</p>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter_Tight:Regular',sans-serif] font-normal h-[29px] leading-[0] left-[865px] text-[14px] text-center text-white top-[161px] w-[344px]">
        <p className="leading-[0.7] mb-[25.674419403076172px]">clarifying visual systems to guide.</p>
        <p className="leading-[0.7]">​</p>
      </div>
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[198px] w-[416px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 416 1">
            <line id="Line 4" stroke="var(--stroke-0, #302F34)" x2="416" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame3 />
    </div>
  );
}