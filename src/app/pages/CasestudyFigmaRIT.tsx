import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "@/lib/motion";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import CasestudyMiniMenu from "../components/casestudy/CasestudyMiniMenu";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";

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
import claudeSvg from "../../assets/icons/claude.svg";
import icons from "../../assets/icons/icons.json";
import imgIterations from "../../assets/project/figbuild/iterations.png";
import imgUserflow from "../../assets/project/figbuild/userflow.png";
import imgFigmafam from "../../assets/project/figbuild/figmafam.png";
import badge01 from "../../assets/project/figbuild/badge01.png";
import badge02 from "../../assets/project/figbuild/badge02.png";
import badge03 from "../../assets/project/figbuild/badge03.png";
import badge04 from "../../assets/project/figbuild/badge04.png";
import badge05 from "../../assets/project/figbuild/badge05.png";
import badge06 from "../../assets/project/figbuild/badge06.png";
import badge07 from "../../assets/project/figbuild/badge07.png";
import badge08 from "../../assets/project/figbuild/badge08.png";
import badge09 from "../../assets/project/figbuild/badge09.png";
import badge10 from "../../assets/project/figbuild/badge10.png";
import badge11 from "../../assets/project/figbuild/badge11.png";

const badges = [badge01, badge02, badge03, badge04, badge05, badge06, badge07, badge08, badge09, badge10, badge11];

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
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10 && y > lastScrollY);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
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
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[9vh] items-center w-full">

          {/* Title + subtitle */}
          <div className="flex flex-col gap-[10px] items-center w-full">
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.2] text-[#faf9ff] text-[32px] md:text-[40px] text-center">
              FigBuild 2026 Badges
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.4] text-[#908e99] text-[16px] md:text-[20px] text-center">
              A brand activation for students across the world
            </p>
          </div>

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
              <div className="w-full border-t border-[#302f34]" />

              {/* Metadata columns */}
              <div className="flex gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline + Role */}
                <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[32px] items-start shrink-0 w-[210px]">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">Team</p>
                    <div className="text-[14px] md:text-[17px] w-full">
                      <p className="leading-none mb-[12px]">
                        <span className="text-[color:var(--text\/primary,#eeedf5)]">Troy Ramiscal </span>
                        <span className="text-[#908e99]"> Motion, UX</span>
                      </p>
                      <p className="leading-none mb-[12px]">
                        <span className="text-[color:var(--text\/primary,#eeedf5)]">Lasya Josyula </span>
                        <span className="text-[#908e99]"> UX, Dev</span>
                      </p>
                      <p className="leading-none">
                        <span className="text-[color:var(--text\/primary,#eeedf5)]">Charlotte </span>
                        <span className="text-[#908e99]"> UX</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">Timeline</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[14px] md:text-[17px] w-full">1 Week</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">Role</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[14px] md:text-[17px] w-full">Design Lead</p>
                  </div>
                </div>

                {/* Right: Interface + Notes + Button */}
                <div className="flex flex-1 flex-col gap-[32px] items-start min-w-0">
                  <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[16px] items-start w-[126px]">
                    <p className="leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">Interface</p>
                    <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[14px] md:text-[17px] w-full">Desktop, Mobile</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">Notes</p>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[14px] md:text-[17px] w-full">
                      <p className="mb-[16px]">
                        FigBuild is Figma's annual hackathon, bringing students together to push the bounds of their creativity! 
                      </p>
                      <p className="mb-[16px]">
                        Figma at RIT 2026 (Troy, Lasya, Charlotte, and I) were unable to participate (our spring breaks clashed). From that friction, we wanted to create something that could bring students together, regardless of location and time. We were able to do this because of TK and Joanna at the Figma for Edu team! Huge thank you :D
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
                    style={{ background: badgeBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.3)" }}
                  >
                    <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[12px] md:text-[14px]">Build your FigBuild Badge</span>
                  </button>
                </div>
              </div>
            </div>

          {/* ── Section: Statistics ── */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px] w-full">
              Our impact
            </p>
            <div className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.2] text-[color:var(--text\/primary,#faf9ff)] text-[32px] md:text-[40px] w-full">
              <p className="mb-[4px]">690+ international teams</p>
              <p className="mb-[4px]">2,000+ participants</p>
              <p>Thousands of impressions</p>
            </div>
          </div>

          <div className="w-full border-t border-[#302f34]" />

          {/* ── Section: Design ── */}
          <div id="cs-design" className="flex flex-col gap-[75px] items-start w-full">
            {/* Section header */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px] w-full text-center">Wireframes</p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.2] text-[#faf9ff] text-[32px] md:text-[40px] w-full">Sprinting to be ready for Figbuild on Super Bowl Sunday</p>
            </div>

            {/* The Flow */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">The Flow</p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px] w-full">
                  The flow was meant to be easy, and we narrowed our scope.
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px] w-full">
                  While we originally wanted users to have two options: make from scratch or scan their in person ID's and create a digital replica, we very quickly realized we couldn't do that in the 3 day scope.
                </p>
              </div>
              <img src={imgUserflow} className="aspect-[2/1] rounded-[8px] w-full object-cover" alt="User flow" />
            </div>

            {/* Iterations — two column */}
            <div className="flex flex-col md:flex-row gap-[24px] items-start w-full">
              <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">Iterations</p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px] w-full">After the initial call, we built for just one flow.</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px] w-full">
                  We knew we wanted all the work to be on one screen, but with so many interactions, finding a clear way to organize them all was difficult.
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px] w-full">
                  In the end, we followed a bento box approach!
                </p>
              </div>
              <img src={imgIterations} className="flex-1 min-w-0 rounded-[8px] object-cover" alt="Iterations" />
            </div>

            {/* Design Proposal */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">Design Proposal</p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px] w-full">Finalizing wireframes and design proposal for branding</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px] w-full">
                  I took the basic concepts from Troy's Figma Flowers, and laid out the mobile and desktop bento box design, flow chart, and design proposal within 4-6 hours, taking a break to watch Bad Bunny's Halftime performance :D
                </p>
              </div>
              <img src={imgDocumentation} className="aspect-[2/1] rounded-[8px] w-full object-cover" alt="Documentation" />
            </div>

            {/* Card: Workflow */}
            <div className="border border-[#302f34] flex flex-col gap-[75px] items-start pb-[32px] pt-[24px] px-[24px] rounded-[8px] w-full" style={{ background: "#161617" }}>

              {/* Header */}
              <div className="flex flex-col gap-[24px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">Workflow</p>
                {/* Icons with glow */}
                <div className="flex gap-[8px] items-center">
                  <svg height="44" viewBox={icons.brands["figma-make"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "auto" }}>
                    <path d={icons.brands["figma-make"].paths[0].d} fill="#FCFCFC" />
                  </svg>
                  <img src={claudeSvg} alt="" className="h-[44px] w-auto" />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px] w-full">
                  Figma Make → Figma MCP + Claude
                </p>
              </div>

              {/* Flow 1: 3 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">3 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">Lasya put our work into Figma Make</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px]">
                    Once our wireframes were Figma Branded, we began our development journey with Figma Make, which gave us basic files and templates to see how everything worked.
                  </p>
                </div>
                <img src={imgFigmaMake} className="flex-1 min-w-0 rounded-[8px] object-cover" alt="Figma Make workflow" />
              </div>

              {/* Flow 2: 2 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">2 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">We sprinted for 2 days and 2 nights making it all work.</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px]">
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
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[14px] md:text-[16px]">Results</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#faf9ff] text-[16px] md:text-[20px]">
                Students across the world getting excited for FigBuild
              </p>
            </div>
            <div className="flex flex-col gap-[16px] items-start w-full">
              <button
                onClick={() => window.open(`https://www.linkedin.com/search/results/all/?keywords=%23figbuild2026&origin=GLOBAL_SEARCH_HEADER`)}
                onMouseEnter={() => setLinkedinBtnHovered(true)}
                onMouseLeave={() => setLinkedinBtnHovered(false)}
                className="flex items-center justify-center px-[16px] py-[10px] rounded-[24px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150"
                style={{ background: linkedinBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.3)" }}
              >
                <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[12px] md:text-[14px]">Follow the hashtag on LinkedIn</span>
              </button>
              <div className="overflow-hidden rounded-b-[8px] w-full">
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .badge-marquee { animation: marquee 18s linear infinite; }
                `}</style>
                <div className="badge-marquee flex items-center" style={{ gap: "16px", width: "max-content" }}>
                  {[...badges, ...badges].map((src, i) => (
                    <div key={i} className="h-[180px] w-auto shrink-0 flex items-center">
                      <img src={src} alt={`Badge ${(i % badges.length) + 1}`} className="h-full w-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Review ── */}
          <div id="cs-review" className="flex flex-col gap-[24px] items-start w-full">
            <CasestudySectionHeader
              eyebrow="Reflections"
              headline="Turning physical digital"
              subtitle="What we shipped and what we learned"
            />

            {/* Point 1 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start mt-[16px] p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.3)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">1</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">AI can carry you far</p>
                <p className="font-[300] text-[#908e99] w-full">
                  But this wouldn't have happened if Lasya and I didn't have prior knowledge of development! I'm so grateful I had Lasya to rely on and we helped eachother with our double credits LOL
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.3)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">2</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">My Figma fam</p>
                <p className="font-[300] text-[#908e99] w-full">
                  TY Charlotte, Troy, + Lasya, I couldn't have asked for a better group of people to start Figma at RIT with
                </p>
                <img src={imgFigmafam} className="aspect-[2/1] rounded-[4px] w-[255px] object-cover" alt="Figma fam" />
              </div>
            </div>

            {/* Point 3 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.3)" }}>
              <p className="font-[300] leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">3</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[17px] min-w-0">
                <p className="text-[#faf9ff] whitespace-nowrap">Leaving RIT's impact :D</p>
                <p className="font-[300] text-[#908e99] w-full">
                  I really wanted RIT's first year in the program to be great for other cohorts after us! It's so awesome seeing other schools being inspired by us and vice versa!
                </p>
                <img src={imgSlackInspired} className="aspect-[393/127] rounded-[4px] w-full max-w-[393px] object-cover" alt="Slack inspired" />
                <p className="font-[300] text-[#908e99] text-[12px] md:text-[14px] w-full leading-[1.5]">
                  Username and other information hidden for privacy
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="figma-rit" />

          </motion.div>{/* end content wrapper */}

        </div>
      </motion.div>
    </div>
  );
}
