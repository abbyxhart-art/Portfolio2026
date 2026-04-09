import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import ButtonBasic from "../components/ButtonBasic";
import UpNext from "../components/UpNext";
const figbuildMacstudioVideo = new URL("../../assets/project/figbuild/figbuild_macstudio_2x1.mp4", import.meta.url).href;
import imgSlackInspired from "../../assets/project/figbuild/slack_inspired.png";
import imgDocumentation from "../../assets/project/figbuild/documentation_2x1.png";
import imgSlackJoanna from "../../assets/project/figbuild/slack_joanna.png";
import imgFigmafam from "../../assets/project/figbuild/figmafam.png";
import badge01 from "../../assets/project/figbuild/badge01.png";
import badge02 from "../../assets/project/figbuild/badge02.png";
import badge03 from "../../assets/project/figbuild/badge03.png";
import badge04 from "../../assets/project/figbuild/badge04.png";
import badge05 from "../../assets/project/figbuild/badge05.png";

const badges = [badge01, badge02, badge03, badge04, badge05];
const imgEllipseRight = "https://www.figma.com/api/mcp/asset/7e4c0ecc-d966-49e5-a90d-2abf77e4fb79";
const imgEllipseLeft = "https://www.figma.com/api/mcp/asset/3dd2db2e-ae82-4d9a-8cc2-3c76c0b2c071";
const imgEllipseRight2 = "https://www.figma.com/api/mcp/asset/2723c383-f0ba-4c93-b4d9-a7fff39445ab";

export default function CasestudyFigmaRIT() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const { scrollY } = useScroll();
  const heroCompleted = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroExtraHeight = useMotionValue(0);

  const heroScale = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 1;
    const progress = Math.min(latest / 400, 1);
    if (progress >= 1) heroCompleted.current = true;
    return 1.35 - 0.35 * progress;
  });
  const heroBorderRadius = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 8;
    return 8 * Math.min(latest / 400, 1);
  });
  const contentY = useTransform(() => {
    if (heroCompleted.current) return 0;
    const progress = Math.min(scrollY.get() / 400, 1);
    return heroExtraHeight.get() * (1 - progress);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (heroRef.current) heroExtraHeight.set(heroRef.current.offsetHeight * 0.35);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [heroExtraHeight]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) setScrollingUp(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 10) setScrollingUp(false);
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf9ff] overflow-x-clip">
      <HomeButton />
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(232,231,240,0.95) 0%, rgba(232,231,240,0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      <div className="flex flex-col items-center px-[10px] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[75px] items-end w-full max-w-[891px]">

          {/* ── Hero ── */}
          <motion.div
            ref={heroRef}
            className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
            style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={figbuildMacstudioVideo} />
          </motion.div>

          {/* ── Content below hero (moves with it) ── */}
          <motion.div style={{ y: contentY }} className="flex flex-col gap-[75px] items-start w-full">

            <div className="flex flex-col gap-[32px] items-start w-full">
              {/* Title + subtitle */}
              <div className="border-b border-[#d1cedc] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                  FigBuild 2026
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.25] text-[#908e99] text-[20px] w-full">
                  I got to build a brand activation for students across the world
                </p>
              </div>

              {/* Metadata columns */}
              <div className="flex gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline + Role */}
                <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[32px] items-start shrink-0 w-[159px]">
                  <div className="flex flex-col gap-[16px] items-start w-[90px]">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Tools</p>
                    <div className="text-[#232226] text-[18px] w-full">
                      <p className="leading-none mb-[12px]">Figma</p>
                      <p className="leading-none mb-[12px]">Figma MCP</p>
                      <p className="leading-none">Claude</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Timeline</p>
                    <p className="leading-none text-[#232226] text-[18px] w-full">1 Week</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Role</p>
                    <p className="leading-none text-[#232226] text-[18px] w-full">Design Lead</p>
                  </div>
                </div>

                {/* Right: Interface + Notes + Button */}
                <div className="flex flex-1 flex-col gap-[32px] items-start min-w-0">
                  <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[16px] items-start w-[126px]">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Interface</p>
                    <p className="leading-none text-[#232226] text-[18px] w-full">Desktop, Mobile</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">Notes</p>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#232226] text-[18px] w-full">
                      <p className="mb-[16px]">
                        FigBuild is Figma's annual hackathon, bringing students together with this year's challenge of creating something with Figma Make.
                      </p>
                      <p className="mb-[16px]">
                        Figma at RIT 2026 (Troy, Lasya, Charlotte, and I) were able to do this because of TK and Joanna at the Figma for Edu team! Huge thank you :D
                      </p>
                      <p>
                        I kept all our Figma files neat, token system locked for Claude, and Github conflict free!
                      </p>
                    </div>
                  </div>
                  <ButtonBasic label="Build your FigBuild Badge" size="Default" />
                </div>
              </div>
            </div>

          {/* ── Section: Design ── */}
          <div className="flex flex-col gap-[75px] items-start w-full">
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">
                  Wireframes
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                  Sprinting to be ready for Figbuild on Super Bowl Sunday
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                  I took the basic concepts from Troy and laid out the mobile and desktop bento box design, flow chart, and design proposal within 4-6 hours, taking a break to watch Bad Bunny's Halftime performance :D
                </p>
              </div>
              <img src={imgDocumentation} className="aspect-[2/1] rounded-[8px] w-full object-cover" alt="Documentation" />
            </div>

            {/* Card: Workflow */}
            <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
              <div className="-translate-y-1/2 absolute h-[306px] right-[487.5px] top-[calc(50%-130px)] w-[528px] pointer-events-none">
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipseRight} />
              </div>
              <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[16px] items-start relative shrink-0">
                <p className="leading-none text-[#908e99] text-[16px]">Workflow</p>
                <p className="font-[450] leading-[1.4] text-[#232226] text-[20px]">
                  Figma Make → Figma MCP + Claude
                </p>
              </div>
              <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] relative text-[#585564] text-[18px] w-full">
                <p className="mb-[16px]">
                  Once our wireframes were Figma Branding approved, we began our development journey with Figma Make, which gave us the basic template files.
                </p>
                <p>
                  Next we used Claude and Figma MCP for higher level interaction and be ready for hosting on Git sites.
                </p>
              </div>
              <img src={imgSlackJoanna} className="rounded-[4px] w-[278px]" alt="Slack message from Joanna" />
            </div>
          </div>

          {/* ── Card: Results ── */}
          <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
            <div className="-translate-y-1/2 absolute h-[306px] left-[-274px] top-[calc(50%+41.63px)] w-[545px] pointer-events-none">
              <img alt="" className="absolute block max-w-none size-full" src={imgEllipseLeft} />
            </div>
            <div className="-translate-y-1/2 absolute h-[306px] right-[-144px] top-[calc(50%-55.38px)] w-[528px] pointer-events-none">
              <img alt="" className="absolute block max-w-none size-full" src={imgEllipseRight2} />
            </div>
            <div className="flex flex-col gap-[16px] items-start relative shrink-0">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Results</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#232226] text-[20px]">
                Students across the world getting excited for FigBuild
              </p>
            </div>
            <ButtonBasic label="Follow the hashtag on LinkedIn" size="Default" />
            <div className="overflow-hidden rounded-b-[8px] w-full">
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .badge-marquee { animation: marquee 18s linear infinite; }
              `}</style>
              <div className="badge-marquee flex" style={{ gap: "16px", width: "max-content" }}>
                {[...badges, ...badges].map((src, i) => (
                  <img key={i} src={src} alt={`Badge ${(i % badges.length) + 1}`} className="h-[180px] w-auto" />
                ))}
              </div>
            </div>
          </div>

          {/* ── Section: Review ── */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
              Reflections
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
              Turning physical digital
            </p>

            {/* Point 1 */}
            <div className="bg-[#f8fad5] border border-[#e8e7f0] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="leading-[2.05] text-[#908e99] text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1 leading-[1.65] text-[#585564] text-[18px]">
                <p className="whitespace-nowrap">THANK YOU TK AND JOANNA!</p>
                <p className="w-full">
                  This opportunity was so fun and seeing kids' badges pop up was so amazing to see! Everybody had such unique badges and it set the tone for the 2nd ever FigBuild
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-[#ebfad5] border border-[#e8e7f0] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[#908e99] text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px]">My Figma fam</p>
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px] w-full">
                  TY Charlotte, Troy, + Lasya, I couldn't have asked for a better group of people to start Figma at RIT with
                </p>
                <img src={imgFigmafam} className="aspect-[2/1] rounded-[4px] w-[255px] object-cover" alt="Figma fam" />
              </div>
            </div>

            {/* Point 3 */}
            <div className="bg-[#d5ffd6] border border-[#e8e7f0] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[#908e99] text-[14px] shrink-0">3</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px]">Leaving RIT's impact :D</p>
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px] w-full">
                  I really wanted RIT's first year in the program to be great for other cohorts after us! It's so awesome seeing other schools being inspired by us and vice versa!
                </p>
                <img src={imgSlackInspired} className="aspect-[393/127] rounded-[4px] w-full max-w-[393px] object-cover" alt="Slack inspired" />
                <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#585564] text-[14px] w-full">
                  Username and other information hidden for privacy
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="figma-rit" />

          </motion.div>{/* end content wrapper */}

        </div>
      </div>
    </div>
  );
}
