import svgPaths from "./svg-qwgiba3qvl";
import { useEffect, useRef, useState } from "react";

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

type SectionBoothProps = {
  showGradient?: boolean;
};

export default function SectionBooth({ showGradient = true }: SectionBoothProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [gradientOpacity, setGradientOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start fading when section top is at 50% of viewport (rect.top = windowHeight * 0.5)
      // Full opacity when section top reaches top of page (rect.top = 0)
      let opacity = 0;
      if (rect.top <= windowHeight * 0.5) {
        const fadeRange = windowHeight * 0.5;
        const progress = (windowHeight * 0.5 - rect.top) / fadeRange;
        opacity = Math.min(1, Math.max(0, progress));
      }

      setGradientOpacity(showGradient ? opacity : 0);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showGradient]);

  return (
    <div ref={sectionRef} className="relative size-full" data-name="Section Booth">
      <div 
        className="-translate-x-1/2 absolute h-[400px] left-[calc(50%+0.5px)] top-[-240px] w-[1805px] transition-opacity duration-300 ease-out" 
        data-name="Top Gradient"
        style={{ opacity: gradientOpacity }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1805 278">
          <ellipse cx="902.5" cy="139" fill="url(#paint0_radial_37_1225)" fillOpacity="0.3" id="Top Gradient" opacity="0.8" rx="902.5" ry="139" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(902.5 139) rotate(180) scale(902.5 139)" gradientUnits="userSpaceOnUse" id="paint0_radial_37_1225" r="1">
              <stop stopColor="#45424E" />
              <stop offset="0.5" stopColor="#45424E" stopOpacity="0.5" />
              <stop offset="1" stopColor="#45424E" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] left-1/2 -translate-x-1/2 text-[#272727] text-[32px] top-[30px] whitespace-nowrap">Booth</p>
      <div className="-translate-x-1/2 absolute gap-x-[42px] gap-y-[100px] grid-cols-[repeat(3,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] inline-grid left-1/2 top-[280px]" data-name="Booth Cards">
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
      <div className="absolute content-stretch flex gap-[13px] items-center left-1/2 -translate-x-1/2 top-[108px]">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Filter Selection">
          <Text1 text="Interactions" />
          <Text1 text="Illustrations" />
          <Text1 text="Interfaces" />
          <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] relative shrink-0 text-[#232226] text-[20px] whitespace-nowrap">,</p>
          <Text1 text="All" />
        </div>
        <p className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.25] relative shrink-0 text-[#272727] text-[20px] whitespace-nowrap">made in Booth 1303</p>
        <div className="absolute content-stretch flex items-center justify-end left-[458px] top-[27px]">
          <div className="overflow-clip relative shrink-0 size-[18px]" data-name="arrow-up">
            <div className="absolute inset-[20.83%]" data-name="Icon">
              <div className="absolute inset-[-7.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path d={svgPaths.p3607bf00} id="Icon" stroke="var(--stroke-0, #7E7C87)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#7e7c87] text-[14px] text-center whitespace-nowrap">RIT's New Media Design lab</p>
        </div>
      </div>
    </div>
  );
}