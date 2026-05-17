import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import CasestudyNavigation from "../components/CasestudyNavigation";
import UpNext from "../components/UpNext";
import CasestudyMiniMenu from "../components/CasestudyMiniMenu";

const FIGMA_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-design", label: "Design" },
  { id: "cs-review", label: "Reflections" },
];
const figbuildMacstudioVideo = new URL("../../assets/project/figbuild/figbuild_macstudio_2x1.mp4", import.meta.url).href;
import imgSlackInspired from "../../assets/project/figbuild/slack_inspired.png";
import imgDocumentation from "../../assets/project/figbuild/documentation_2x1.png";
import imgSlackJoanna from "../../assets/project/figbuild/slack_joanna.png";
import imgFigmaMake from "../../assets/project/figbuild/figmamake.png";
import imgFigmaMCP from "../../assets/project/figbuild/figmamcp.png";
import claudeSvg from "../../assets/claude.svg";
import figmaMakeSvg from "../../assets/figmamake.svg";
import imgFigmafam from "../../assets/project/figbuild/figmafam.png";
import badge01 from "../../assets/project/figbuild/badge01.png";
import badge02 from "../../assets/project/figbuild/badge02.png";
import badge03 from "../../assets/project/figbuild/badge03.png";
import badge04 from "../../assets/project/figbuild/badge04.png";
import badge05 from "../../assets/project/figbuild/badge05.png";

const badges = [badge01, badge02, badge03, badge04, badge05];

export default function CasestudyFigmaRIT() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [badgeBtnHovered, setBadgeBtnHovered] = useState(false);
  const [linkedinBtnHovered, setLinkedinBtnHovered] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <HomeButton />
      <CasestudyNavigation title="FigBuild Badges 2026" />
      <CasestudyMiniMenu sections={FIGMA_SECTIONS} />
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(23, 23, 23, 0.98) 0%, rgba(23, 23, 23, 0.85) 25%, rgba(23, 23, 23, 0.35) 55%, rgba(23, 23, 23, 0.05) 80%, rgba(23, 23, 23, 0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled ? "8px" : "16px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[20px] right-[20px] z-50"
        style={{ top: "16px" }}
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      <div className="flex flex-col items-center px-[20vw] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[75px] items-end w-full">

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

            <div id="cs-overview" className="flex flex-col gap-[32px] items-start w-full">
              {/* Title + subtitle */}
              <div className="border-b border-[#302f34] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px] w-full">
                  FigBuild 2026 Badges
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
                    <div className="text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">
                      <p className="leading-none mb-[12px]">Figma</p>
                      <p className="leading-none mb-[12px]">Figma MCP</p>
                      <p className="leading-none">Claude</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Timeline</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">1 Week</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Role</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">Design Lead</p>
                  </div>
                </div>

                {/* Right: Interface + Notes + Button */}
                <div className="flex flex-1 flex-col gap-[32px] items-start min-w-0">
                  <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[16px] items-start w-[126px]">
                    <p className="leading-none text-[#908e99] text-[16px] w-full">Interface</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">Desktop, Mobile</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">Notes</p>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">
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
                  <button
                    onClick={() => window.open(`https://axh2451.github.io/figbuildbadgegh/`)}
                    onMouseEnter={() => setBadgeBtnHovered(true)}
                    onMouseLeave={() => setBadgeBtnHovered(false)}
                    className="flex items-center justify-center px-[16px] py-[10px] rounded-[24px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150"
                    style={{ background: badgeBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.2)" }}
                  >
                    <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[14px]">Build your FigBuild Badge</span>
                  </button>
                </div>
              </div>
            </div>

          {/* ── Section: Design ── */}
          <div id="cs-design" className="flex flex-col gap-[75px] items-start w-full">
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">
                  Wireframes
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px] w-full">
                  Sprinting to be ready for Figbuild on Super Bowl Sunday
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[17px] w-full">
                  I took the basic concepts from Troy and laid out the mobile and desktop bento box design, flow chart, and design proposal within 4-6 hours, taking a break to watch Bad Bunny's Halftime performance :D
                </p>
              </div>
              <img src={imgDocumentation} className="aspect-[2/1] rounded-[8px] w-full object-cover" alt="Documentation" />
            </div>

            {/* Card: Workflow */}
            <div className="border border-[#302f34] flex flex-col gap-[75px] items-start pb-[32px] pt-[24px] px-[24px] rounded-[8px] w-full" style={{ background: "#161617" }}>

              {/* Header */}
              <div className="flex flex-col gap-[24px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Workflow</p>
                {/* Icons with glow */}
                <div className="relative flex gap-[8px] items-center">
                  <div className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 h-[120px] w-[220px] blur-[48px]" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(160,130,255,0.35) 0%, rgba(221,251,170,0.2) 60%, rgba(160,130,255,0) 100%)" }} />
                  <img src={figmaMakeSvg} alt="" className="relative h-[44px] w-auto" />
                  <img src={claudeSvg} alt="" className="relative h-[44px] w-auto" />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px] w-full">
                  Figma Make → Figma MCP + Claude
                </p>
              </div>

              {/* Flow 1: 3 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">3 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">Lasya put our work into Figma Make</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[17px]">
                    Once our wireframes were Figma Branded, we began our development journey with Figma Make, which gave us basic files and templates to see how everything worked.
                  </p>
                </div>
                <img src={imgFigmaMake} className="flex-1 min-w-0 rounded-[8px] object-cover" alt="Figma Make workflow" />
              </div>

              {/* Flow 2: 2 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">2 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">We sprinted for 2 days and 2 nights making it all work.</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[17px]">
                    We used Claude for higher interaction and to be ready for Git sites.
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[16px] min-w-0">
                  <img src={imgFigmaMCP} className="w-full rounded-[8px]" alt="Figma MCP workflow" />
                  <img src={imgSlackJoanna} className="rounded-[4px] w-[278px]" alt="Slack message from Joanna" />
                </div>
              </div>

            </div>
          </div>

          {/* ── Card: Results ── */}
          <div className="border border-[#302f34] flex flex-col gap-[32px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full" style={{ background: "#161617" }}>
            <div className="flex flex-col gap-[16px] items-start relative shrink-0">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Results</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#faf9ff] text-[20px]">
                Students across the world getting excited for FigBuild
              </p>
            </div>
            <div className="flex flex-col gap-[16px] items-start w-full">
              <button
                onClick={() => window.open(`https://www.linkedin.com/search/results/all/?keywords=%23figbuild2026&origin=GLOBAL_SEARCH_HEADER`)}
                onMouseEnter={() => setLinkedinBtnHovered(true)}
                onMouseLeave={() => setLinkedinBtnHovered(false)}
                className="flex items-center justify-center px-[16px] py-[10px] rounded-[24px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150"
                style={{ background: linkedinBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.2)" }}
              >
                <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[14px]">Follow the hashtag on LinkedIn</span>
              </button>
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
          </div>

          {/* ── Section: Review ── */}
          <div id="cs-review" className="flex flex-col gap-[16px] items-start w-full">
            <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
              Reflections
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px]">
              Turning physical digital
            </p>

            {/* Point 1 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start mt-[16px] p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.2)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">1</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">AI can carry you far</p>
                <p className="font-[300] text-[#908e99] w-full">
                  But this wouldn't have happened if Lasya and I didn't have prior knowledge of development! I'm so grateful I had Lasya to rely on and we helped eachother with our double credits LOL
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.2)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">2</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">My Figma fam</p>
                <p className="font-[300] text-[#908e99] w-full">
                  TY Charlotte, Troy, + Lasya, I couldn't have asked for a better group of people to start Figma at RIT with
                </p>
                <img src={imgFigmafam} className="aspect-[2/1] rounded-[4px] w-[255px] object-cover" alt="Figma fam" />
              </div>
            </div>

            {/* Point 3 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.2)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">3</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">Leaving RIT's impact :D</p>
                <p className="font-[300] text-[#908e99] w-full">
                  I really wanted RIT's first year in the program to be great for other cohorts after us! It's so awesome seeing other schools being inspired by us and vice versa!
                </p>
                <img src={imgSlackInspired} className="aspect-[393/127] rounded-[4px] w-full max-w-[393px] object-cover" alt="Slack inspired" />
                <p className="font-[300] text-[#908e99] text-[14px] w-full leading-[1.5]">
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
