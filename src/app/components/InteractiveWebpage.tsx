import { useState, useEffect, useRef } from 'react';
import Webpage from '../../imports/Webpage';
import DropdownNav from '../../imports/DropdownNav';
import svgPaths from "../../imports/svg-b2qpao3xh9";

function Frame1000001344Helper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties} className="absolute flex items-center justify-center left-0 size-[32px] top-0">
      <div className="-rotate-90 flex-none">{children}</div>
    </div>
  );
}

export default function InteractiveWebpage() {
  const [currentSection, setCurrentSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevSectionRef = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const scrollCenter = scrollTop + (viewportHeight / 2);
      
      // Section heights based on updated design
      const section1Height = 1400;
      const section2Height = 1400;
      const section3Height = 1400;
      
      // Determine current section based on what's at the center of the viewport
      if (scrollCenter < section1Height) {
        // Section 1
        setCurrentSection(1);
        setProgress(Math.min(scrollCenter / section1Height, 1));
      } else if (scrollCenter < section1Height + section2Height) {
        // Section 2
        setCurrentSection(2);
        setProgress(Math.min((scrollCenter - section1Height) / section2Height, 1));
      } else {
        // Section 3
        setCurrentSection(3);
        setProgress(Math.min((scrollCenter - section1Height - section2Height) / section3Height, 1));
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate stroke-dashoffset for circular progress
  // Circle circumference ≈ 2 * π * r where r ≈ 14.5 (32px diameter / 2 - stroke width)
  const radius = 14.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Check if section changed to disable transition during reset
  const sectionChanged = prevSectionRef.current !== currentSection;
  if (sectionChanged) {
    prevSectionRef.current = currentSection;
  }

  return (
    <div className="relative size-full">
      {/* Dropdown Menu - 8px above the nav button */}
      <div 
        className="fixed left-[24px] bottom-[82px] w-[250px] h-[130px] z-10 overflow-hidden transition-all duration-500 ease-in-out origin-bottom"
        style={{ 
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? 'scaleY(1)' : 'scaleY(0)',
        }}
      >
        <DropdownNav 
          currentSection={currentSection} 
          onBackToTop={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>
      
      {/* Fixed Progress Nav Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed left-[24px] bottom-[24px] w-[250px] h-[50px] z-10 group cursor-pointer"
      >
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[16px] py-[9px] relative rounded-[100px] size-full" data-name="Progress Nav Button">
          <div aria-hidden="true" className="absolute border border-[#c8c4d7] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)]" />
          <div className="relative shrink-0 size-[32px]">
            <Frame1000001344Helper>
              <div className="relative size-[32px]" data-name="Progress Bar">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <path d={svgPaths.p10ca06b0} opacity="0.3" stroke="#716C87" strokeWidth="3" />
                </svg>
              </div>
            </Frame1000001344Helper>
            <Frame1000001344Helper>
              <div className="relative size-[32px]" data-name="Active Progress">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <path 
                    d={svgPaths.p10ca06b0} 
                    stroke="#3D384E" 
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ 
                      transition: sectionChanged ? 'none' : 'stroke-dashoffset 0.1s linear',
                      transformOrigin: 'center',
                    }}
                  />
                </svg>
              </div>
            </Frame1000001344Helper>
            <Frame1000001344Helper>
              <div className="relative size-[32px]" data-name="Base Ellipse">
                <div className="absolute inset-[45.31%_0_42.47%_90.54%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.02866 3.91051">
                    <path d={svgPaths.p393ece00} stroke="#3D384E" strokeLinecap="round" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            </Frame1000001344Helper>
            <p className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-none left-[calc(50%-3px)] text-[#3d384e] text-[16px] top-[calc(50%-8px)] whitespace-nowrap transition-all duration-75 ease-in-out">{currentSection}</p>
          </div>
          <p className="flex-[1_0_0] font-['Inter_Tight:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px relative text-[#3d384e] text-[16px] text-left transition-all duration-75 ease-in-out">
            Section {currentSection}
          </p>
          <div 
            className={`overflow-clip relative shrink-0 size-[18px] transition-all duration-300 ease-in-out ${
              isMenuOpen || undefined ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
            data-name="arrow-up"
          >
            <div className="absolute inset-[20.83%]" data-name="Icon">
              <div className="absolute inset-[-7.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <path d={svgPaths.p3607bf00} stroke="#8B86A0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Scrollable content */}
      <div ref={containerRef} className="size-full overflow-y-auto">
        <Webpage />
      </div>
    </div>
  );
}