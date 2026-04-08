import svgPaths from "./svg-tymib1u8ud";
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="bg-[#e8e7f0] content-stretch flex items-center justify-center px-[4px] relative rounded-[2px] shrink-0">
      <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] relative shrink-0 text-[#232226] text-[20px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type TextProps = {
  text: string;
  text1: string;
};

function Text({ text, text1 }: TextProps) {
  return (
    <div className="content-stretch flex flex-col font-['Inter_Tight:Regular',sans-serif] font-normal gap-[7.427px] items-start leading-[1.35] relative shrink-0 w-full">
      <p className="relative shrink-0 text-[#232226] text-[18px] w-full">{text}</p>
      <p className="relative shrink-0 text-[#7e7c87] text-[16px] w-full">{text1}</p>
    </div>
  );
}

export default function SectionBooth() {
  return (
    <div className="relative size-full" data-name="Section Booth">
      <div className="-translate-x-1/2 absolute h-[278px] left-[calc(50%+0.5px)] top-[-138px] w-[1805px]" data-name="Top Gradient">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1805 278">
          <ellipse cx="902.5" cy="139" fill="url(#paint0_radial_37_1225)" fillOpacity="0.3" id="Top Gradient" opacity="0.8" rx="902.5" ry="139" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(902.5 139) rotate(180) scale(902.5 139)" gradientUnits="userSpaceOnUse" id="paint0_radial_37_1225" r="1">
              <stop stopColor="#45424E" />
              <stop offset="1" stopColor="#45424E" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] left-[822px] text-[#272727] text-[32px] top-[66px] whitespace-nowrap">Booth</p>
      <div className="absolute content-stretch flex items-center justify-end left-[958px] top-[174px]">
        <div className="overflow-clip relative shrink-0 size-[18px]" data-name="arrow-up">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                <path d={svgPaths.p3607bf00} id="Icon" stroke="var(--stroke-0, #7E7C87)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#7e7c87] text-[14px] text-center whitespace-nowrap">RIT’s New Media Design lab</p>
      </div>
      <div className="-translate-x-1/2 absolute gap-x-[42px] gap-y-[100px] grid-cols-[repeat(3,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] inline-grid left-1/2 top-[344px]" data-name="Booth Cards">
        <div className="col-1 content-stretch flex flex-col gap-[20px] items-start relative row-1 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="bg-white h-[438px] shrink-0 w-[350px]" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
        <div className="col-2 content-stretch flex flex-col gap-[20px] items-start relative row-1 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="bg-white h-[438px] shrink-0 w-[350px]" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
        <div className="col-3 content-stretch flex flex-col gap-[20px] items-start relative row-1 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="bg-white h-[438px] shrink-0 w-[350px]" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
        <div className="col-1 content-stretch flex flex-col gap-[20px] items-start relative row-2 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="aspect-[200/100] bg-white shrink-0 w-full" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
        <div className="col-2 content-stretch flex flex-col gap-[20px] items-start relative row-2 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="aspect-[200/100] bg-white shrink-0 w-full" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
        <div className="col-3 content-stretch flex flex-col gap-[20px] items-start relative row-2 self-start shrink-0 w-[350px]" data-name="Booth Card">
          <div className="aspect-[200/100] bg-white shrink-0 w-full" data-name="Image" />
          <Text text="Project Title" text1="This is a sentence about the title" />
        </div>
      </div>
      <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] left-[958px] text-[#272727] text-[20px] top-[144px] whitespace-nowrap">made in Booth 1303</p>
      <div className="absolute content-stretch flex gap-[8px] items-center left-[570px] top-[144px]" data-name="Filter Selection">
        <Text1 text="Interactions" />
        <Text1 text="Illustrations" />
        <Text1 text="Interfaces" />
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] relative shrink-0 text-[#232226] text-[20px] whitespace-nowrap">,</p>
        <Text1 text="All" />
      </div>
    </div>
  );
}