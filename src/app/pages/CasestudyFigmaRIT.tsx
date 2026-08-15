import { useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, useScroll, useTransform, useMotionValue } from "@/lib/motion";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";
import VideoControls from "../components/VideoControls";

const FIGMA_SECTIONS = [
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
  const { scrollY } = useScroll();
  const heroCompleted = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroExtraHeight = useMotionValue(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const badgeMarqueeRef = useRef<HTMLDivElement>(null);
  const badgeHoveredRef = useRef(false);

  const heroScale = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 1;
    const progress = Math.min(latest / 400, 1);
    if (progress >= 1) heroCompleted.current = true;
    return 1.35 - 0.35 * progress;
  });
  // Title row width — tracks the hero's scale as real layout width rather
  // than a transform, so text never scales. The two columns keep their
  // fixed widths, so as the row narrows/widens, the gap between them
  // (produced by justify-between) narrows/widens with it for free.
  const titleWidth = useTransform(heroScale, (s) => `${s * 100}%`);
  const heroBorderRadius = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 24;
    return 24 * Math.min(latest / 400, 1);
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

  // Badge marquee — driven by rAF (rather than a CSS animation) so hovering
  // eases the speed down instead of snapping to an abrupt stop.
  useEffect(() => {
    const el = badgeMarqueeRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    const LOOP_SECONDS = 42; // higher = slower base scroll speed
    const baseSpeed = halfWidth / LOOP_SECONDS;

    let offset = 0;
    let currentSpeed = baseSpeed;
    let lastTime: number | null = null;
    let rafId: number;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const targetSpeed = badgeHoveredRef.current ? baseSpeed * 0.15 : baseSpeed;
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(delta * 2.5, 1);

      offset -= currentSpeed * delta;
      if (offset <= -halfWidth) offset += halfWidth;
      el.style.transform = `translateX(${offset}px)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <SectionNavigation sections={FIGMA_SECTIONS} title="FigBuild Badges 2026 Casestudy Navigation" />

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[24vw] pt-[20vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[75px] items-center w-full">

          {/* ── Title + Hero — fixed 32px between them regardless of scale. ── */}
          <div className="flex flex-col gap-[32px] items-center w-full">

            {/* Title — text stays at its normal size; only the row's own
                layout width tracks the hero's scale below, so justify-between
                narrows/widens the gap between the two columns with it. */}
            <motion.div
              className="flex flex-col md:flex-row items-start justify-between md:gap-[24px] w-full font-['Inter_Tight',sans-serif]"
              style={{ width: titleWidth }}
            >
              {/* Left side */}
              <div className="flex flex-col gap-[16px] items-start w-full md:w-[565px] shrink-0">
                <p className="font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] w-full">
                  FigBuild 2026 Badges
                </p>
                <div className="font-regular text-[#908e99] text-[length:var(--typography-body-default-font-size)] w-full">
                  <p className="leading-[1.65] mb-[16px]">FigBuild 2026 is the second year of Figma's student hackathon.</p>
                  <p className="leading-[1.65]">We proposed a brand activation (big thanks to TK and Joanna) as RIT's contribution since couldn't participate since it was Spring Break. I kept all our Figma files neat, token system locked for Claude, and Github conflict free!</p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-[32px] self-stretch shrink-0 font-regular text-[length:var(--typography-body-default-font-size)]">
                <div className="flex flex-col gap-[16px] items-start h-full">
                  <p className="leading-[1.65] font-medium text-[#faf9ff]">Team</p>
                  <div className="text-[#908e99] leading-none">
                    <p className="mb-[12px]">Troy Ramiscal</p>
                    <p className="mb-[12px]">Charlotte Raith</p>
                    <p>Lasya Josyula</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[32px] items-start h-full">
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-[1.65] font-medium text-[#faf9ff]">Scope</p>
                    <div className="text-[#908e99] leading-none">
                      <p className="mb-[12px]">Desktop, Mobile</p>
                      <p>Figma, Claude</p>
                    </div>
                  </div>
                  <p className="text-[#908e99] leading-none">2026</p>
                </div>
              </div>
            </motion.div>

            {/* Hero */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] bg-[#505050] w-full overflow-hidden relative"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            >
              <video ref={heroVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={figbuildMacstudioVideo} />
              <VideoControls videoRef={heroVideoRef} />
            </motion.div>

          </div>

          {/* ── Content below hero (moves with it) ── */}
          <motion.div style={{ y: contentY }} className="flex flex-col gap-[75px] items-start w-full">

          {/* ── Section: Statistics ── */}
          <div className="flex flex-col gap-[16px] items-center w-full">
            <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full text-center">
              Our impact
            </p>
            <div className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.2] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[32px] md:text-[40px] w-full text-center">
              <p className="mb-[4px]">690+ international teams</p>
              <p className="mb-[4px]">2,000+ participants</p>
              <p>Thousands of impressions</p>
            </div>
          </div>

          {/* ── Card: Results ── */}
          <div className="border border-[#302f34] flex flex-col gap-[32px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full" style={{ background: "#161617" }}>
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div
                className="overflow-hidden rounded-b-[8px] w-full"
                onMouseEnter={() => { badgeHoveredRef.current = true; }}
                onMouseLeave={() => { badgeHoveredRef.current = false; }}
              >
                <div ref={badgeMarqueeRef} className="flex items-center" style={{ gap: "16px", width: "max-content" }}>
                  {[...badges, ...badges].map((src, i) => (
                    <div key={i} className="h-[210px] shrink-0 flex items-center">
                      <img
                        src={src}
                        alt={`Badge ${(i % badges.length) + 1}`}
                        className="rounded-[var(--radius-component-image)]"
                        style={{ height: "210px", width: "auto", maxWidth: "none", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-[#302f34]" />

          {/* ── Section: Design ── */}
          <div id="cs-design" className="flex flex-col gap-[75px] items-start w-full">
            {/* Section header */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full text-center">Wireframes</p>
              <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.2] text-[#faf9ff] text-[32px] md:text-[40px] w-full">Sprinting to be ready for Figbuild on Super Bowl Sunday</p>
            </div>

            {/* The Flow */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">The Flow</p>
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  The flow was meant to be easy, and we narrowed our scope.
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  While we originally wanted users to have two options: make from scratch or scan their in person ID's and create a digital replica, we very quickly realized we couldn't do that in the 3 day scope.
                </p>
              </div>
              <img src={imgUserflow} className="aspect-[2/1] rounded-[var(--radius-component-image)] w-full object-cover" alt="User flow" />
            </div>

            {/* Iterations — two column */}
            <div className="flex flex-col md:flex-row gap-[24px] items-start w-full">
              <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Iterations</p>
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">After the initial call, we built for just one flow.</p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  We knew we wanted all the work to be on one screen, but with so many interactions, finding a clear way to organize them all was difficult.
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  In the end, we followed a bento box approach!
                </p>
              </div>
              <img src={imgIterations} className="flex-1 min-w-0 rounded-[var(--radius-component-image)] object-cover" alt="Iterations" />
            </div>

            {/* Design Proposal */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Design Proposal</p>
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">Finalizing wireframes and design proposal for branding</p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  I took the basic concepts from Troy's Figma Flowers, and laid out the mobile and desktop bento box design, flow chart, and design proposal within 4-6 hours, taking a break to watch Bad Bunny's Halftime performance :D
                </p>
              </div>
              <img src={imgDocumentation} className="aspect-[2/1] rounded-[var(--radius-component-image)] w-full object-cover" alt="Documentation" />
            </div>

            {/* Card: Workflow */}
            <div className="border border-[#302f34] flex flex-col gap-[75px] items-start pb-[32px] pt-[24px] px-[24px] rounded-[8px] w-full" style={{ background: "#161617" }}>

              {/* Header */}
              <div className="flex flex-col gap-[24px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Workflow</p>
                {/* Icons with glow */}
                <div className="flex gap-[8px] items-center">
                  <svg height="44" viewBox={icons.brands["figma-make"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "auto" }}>
                    <path d={icons.brands["figma-make"].paths[0].d} fill="#FCFCFC" />
                  </svg>
                  <img src={claudeSvg} alt="" className="h-[44px] w-auto" />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-[1.3] font-medium text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  Figma Make → Figma MCP + Claude
                </p>
              </div>

              {/* Flow 1: 3 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">3 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] font-medium text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">Lasya put our work into Figma Make</p>
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Once our wireframes were Figma Branded, we began our development journey with Figma Make, which gave us basic files and templates to see how everything worked.
                  </p>
                </div>
                <img src={imgFigmaMake} className="flex-1 min-w-0 rounded-[var(--radius-component-image)] object-cover" alt="Figma Make workflow" />
              </div>

              {/* Flow 2: 2 Days left — 2 columns */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">2 Days left...</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] font-medium text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">We sprinted for 2 days and 2 nights making it all work.</p>
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    We used Claude for higher interaction and to be ready for Git sites.
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[16px] min-w-0">
                  <img src={imgFigmaMCP} className="w-full rounded-[var(--radius-component-image)]" alt="Figma MCP workflow" />
                  <img src={imgSlackJoanna} className="rounded-[var(--radius-component-image)] w-[278px]" alt="Slack message from Joanna" />
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
              <p className="font-regular leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">1</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] min-w-0">
                <p className="font-medium text-[#faf9ff] whitespace-nowrap">AI can carry you far</p>
                <p className="font-regular text-[#908e99] w-full">
                  But this wouldn't have happened if Lasya and I didn't have prior knowledge of development! I'm so grateful I had Lasya to rely on and we helped eachother with our double credits LOL
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.3)" }}>
              <p className="font-regular leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">2</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] min-w-0">
                <p className="font-medium text-[#faf9ff] whitespace-nowrap">My Figma fam</p>
                <p className="font-regular text-[#908e99] w-full">
                  TY Charlotte, Troy, + Lasya, I couldn't have asked for a better group of people to start Figma at RIT with
                </p>
                <img src={imgFigmafam} className="aspect-[2/1] rounded-[var(--radius-component-image)] w-[255px] object-cover" alt="Figma fam" />
              </div>
            </div>

            {/* Point 3 */}
            <div className="border border-[#302f34] flex font-['Inter_Tight',sans-serif] gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.3)" }}>
              <p className="font-regular leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">3</p>
              <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] min-w-0">
                <p className="font-medium text-[#faf9ff] whitespace-nowrap">Leaving RIT's impact :D</p>
                <p className="font-regular text-[#908e99] w-full">
                  I really wanted RIT's first year in the program to be great for other cohorts after us! It's so awesome seeing other schools being inspired by us and vice versa!
                </p>
                <img src={imgSlackInspired} className="aspect-[393/127] rounded-[var(--radius-component-image)] w-full max-w-[393px] object-cover" alt="Slack inspired" />
                <p className="font-regular text-[#908e99] text-[12px] md:text-[14px] w-full leading-[1.5]">
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
