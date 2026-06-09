import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/layout/HomeButton";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import CasestudyMiniMenu from "../components/casestudy/CasestudyMiniMenu";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";
import imgFaceSmile from "../../assets/icons/face-smile.svg";

const GM_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-flow", label: "Flow" },
  { id: "cs-research", label: "Research" },
  { id: "cs-heuristics", label: "Heuristics" },
  { id: "cs-specs", label: "Specs" },
  { id: "cs-reflection", label: "Reflections" },
];
const vidGmScene = new URL("../../assets/project/gentlemonster/gmscene_2x1.mp4", import.meta.url).href;
const vidGmFullflow = new URL("../../assets/project/gentlemonster/gm_fullflow_1920x906_30fps.mp4.mp4", import.meta.url).href;
const vidDesignDoc = new URL("../../assets/project/gentlemonster/designdoc_16x9.mp4", import.meta.url).href;
const vidOjo01 = new URL("../../assets/project/gentlemonster/ojo01_16x9.mp4", import.meta.url).href;
const imgKioskFlowFull = new URL("../../assets/project/gentlemonster/kioskflow_full_2x1.png", import.meta.url).href;
const imgKioskFlowBag = new URL("../../assets/project/gentlemonster/kioskflow_bag_2x1.png", import.meta.url).href;
const imgKioskFlowPrescription = new URL("../../assets/project/gentlemonster/kioskflow_prescription_2x1.png", import.meta.url).href;
const imgKioskBuild = new URL("../../assets/project/gentlemonster/kioskbuild_2x1.png", import.meta.url).href;
const imgKioskSpace = new URL("../../assets/project/gentlemonster/kioskspace_2x1.png", import.meta.url).href;
const imgKioskPrintTest = new URL("../../assets/project/gentlemonster/kioskprinttest_2x1.png", import.meta.url).href;
const imgCrowd = new URL("../../assets/project/gentlemonster/crowd_2x1.png", import.meta.url).href;
const imgTaichi = new URL("../../assets/project/gentlemonster/taichi_2x1.png", import.meta.url).href;
const imgHirise = new URL("../../assets/project/gentlemonster/hirise_2x1.png", import.meta.url).href;
const imgAr = new URL("../../assets/project/gentlemonster/ar_2x1.png", import.meta.url).href;
const imgStickyDesktop = new URL("../../assets/project/gentlemonster/sticky_desktop.png", import.meta.url).href;
const imgStickyMobile = new URL("../../assets/project/gentlemonster/sticky_mobile.png", import.meta.url).href;
const vidFlowBestmatch = new URL("../../assets/project/gentlemonster/flow_bestmatch.mp4", import.meta.url).href;
const vidFlowMymatch = new URL("../../assets/project/gentlemonster/flow_mymatch.mp4", import.meta.url).href;
const vidFlowLenses = new URL("../../assets/project/gentlemonster/flow_lenses.mp4", import.meta.url).href;
const vidFlowFourmatches = new URL("../../assets/project/gentlemonster/flow_fourmatches.mp4", import.meta.url).href;
const vidFlowGlasses = new URL("../../assets/project/gentlemonster/flow_glasses.mp4", import.meta.url).href;
const imgModellingGlasses = new URL("../../assets/project/gentlemonster/modellingglasses.JPG", import.meta.url).href;


const blobGM_pink_left  = "radial-gradient(ellipse at center, rgba(175,164,216,0.2) 0%, rgba(175,164,216,0) 70%)";

const blobGM_lav_right  = "radial-gradient(ellipse at center, rgba(175,164,216,0.2) 0%, rgba(175,164,216,0) 70%)";


export default function CasestudyGentleMonster() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [activeJourneyTab, setActiveJourneyTab] = useState<"Full Flow" | "Checkout" | "Prescription">("Full Flow");
  const [hoveredJourneyTab, setHoveredJourneyTab] = useState<string | null>(null);
  const [reachOutHovered, setReachOutHovered] = useState(false);
  const journeyTabs = ["Full Flow", "Checkout", "Prescription"] as const;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Hero scale animation — latches at 1.0 once reached, never scales back up
  const { scrollY } = useScroll();
  const heroScaleDone = useRef(false);
  const heroScale = useTransform(scrollY, (y) => {
    if (heroScaleDone.current) return 1;
    const s = Math.max(1, 1.2 - (y / 400) * 0.2);
    if (s === 1) heroScaleDone.current = true;
    return s;
  });

  // Sticky scroll
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ["start start", "end end"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-1050px"]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 z-0 h-[600px] pointer-events-none"
        style={{ top: 0, background: "linear-gradient(to top, rgba(22,22,23,0.2), #afa4d8)", opacity: 0.5 }}
      />
      <HomeButton />
      <CasestudyNavigation title="Gentle Monster" />
      <CasestudyMiniMenu sections={GM_SECTIONS} />
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

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh] relative z-[1]"
      >

        {/* Segment 1: Hero + Overview */}
        <div className="flex flex-col gap-[9vh] items-center w-full">

          {/* ── Title ── */}
          <div className="flex flex-col gap-[10px] items-center w-full">
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[48px] text-[#faf9ff] text-[32px] md:text-[40px] text-center">
              Gentle Monster Kiosk
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.4] text-[#908e99] text-[16px] md:text-[20px] text-center">
              Spring 2024
            </p>
          </div>

          {/* ── Hero ── */}
          <motion.div
            className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
            style={{ scale: heroScale, borderRadius: 4, transformOrigin: "top center" }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidGmFullflow} />
          </motion.div>

          {/* ── Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[75px] items-start w-full scroll-mt-[100px]">

            {/* Divider */}
            <div className="w-full border-t border-[#302f34]" />

            {/* Two-column overview */}
            <div className="flex gap-[80px] items-start w-full font-['Inter_Tight',sans-serif]">

              {/* Left: metadata */}
              <div className="flex flex-col gap-[24px] items-start shrink-0">
                {/* Interface */}
                <div className="flex flex-col gap-[17px] items-start pb-[32px]">
                  <p className="font-[300] leading-none text-[#c1becb] text-[14px]">Interface</p>
                  <div className="font-[300] text-[#908e99] text-[16px]">
                    <p className="leading-[1.5] mb-[8px]">22 x 11 " (small screen)</p>
                    <p className="leading-[1.5]">44 x 22" (large screen)</p>
                  </div>
                </div>
                {/* Tools */}
                <div className="flex flex-col gap-[17px] items-start pb-[32px]">
                  <p className="font-[300] leading-none text-[#c1becb] text-[14px]">Tools</p>
                  <div className="font-[300] text-[#908e99] text-[16px]">
                    <p className="leading-[1.5] mb-[8px]">Figma</p>
                    <p className="leading-[1.5] mb-[8px]">Adobe Suite</p>
                    <p className="leading-[1.5]">C4D</p>
                  </div>
                </div>
                {/* Timeline */}
                <div className="flex flex-col gap-[17px] items-start pb-[32px]">
                  <p className="font-[300] leading-none text-[#c1becb] text-[14px]">Timeline</p>
                  <p className="font-[300] leading-[1.5] text-[#908e99] text-[16px]">10 Weeks</p>
                </div>
              </div>

              {/* Right: context */}
              <div className="flex flex-col gap-[17px] items-start flex-1 min-w-0 pb-[32px]">
                <p className="font-[300] leading-none text-[#faf9ff] text-[14px] w-full">
                  Overview
                </p>
                <div className="font-[300] text-[#908e99] text-[16px] w-full">
                  <p className="leading-[1.65] mb-[16px]">This project spans UI, research, and blending it with 3D and motion to create a more realistic concept than just a screen on a page.</p>
                  <p className="leading-[1.65]">The project overall asks how can a kiosk create clear choices, avoid fatigue, and best represent the brand's design system — ultimately gifting shoppers a fun experience to find their perfect match!</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── 3. Gentle Monster Sticky Scroll — FULL WIDTH ── */}
        <div ref={stickyRef} className="mt-[9vh] -ml-4 -mr-4 md:-ml-[20vw] md:-mr-[20vw] w-screen" style={{ height: "4000px", position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: "calc(50vh - 397px)",
            }}
          >
            {/* Frame */}
            <div
              style={{
                height: "795px",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <motion.div
                style={{
                  y: contentY,
                  position: "relative",
                  height: "1900px",
                  width: "100%",
                }}
              >
                {/* ── Desktop 2-column layout (hidden on mobile) ── */}
                {/* Row 1 — Unblurring (left) + Gentle Monster (right) */}
                <p
                  style={{ position: "absolute", top: "381px", left: "27%", transform: "translateX(-50%)" }}
                  className="hidden md:block font-['Inter_Tight'] font-[300] text-[50px] leading-[1.5] text-[color:var(--text\/primary,#eeedf5)] whitespace-nowrap"
                >
                  Unblurring
                </p>
                <p
                  style={{ position: "absolute", top: "381px", left: "68%" }}
                  className="hidden md:block font-['Inter_Tight'] font-[300] text-[50px] leading-none text-[color:var(--text\/primary,#eeedf5)] whitespace-nowrap"
                >
                  Gentle Monster
                </p>

                {/* Row 2 — What is GM (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "900px", left: "27%", transform: "translateX(-50%)" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)] whitespace-nowrap"
                >
                  What is GM
                </p>
                <p
                  style={{ position: "absolute", top: "900px", left: "68%", width: "300px" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[14px] md:text-[16px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  Known for unique and avant-garde concepts/products, their flagship stores blur the lines between art and retail.
                </p>

                {/* Row 3 — Why (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "1179px", left: "27%", transform: "translateX(-50%)" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)] whitespace-nowrap"
                >
                  Why
                </p>
                <p
                  style={{ position: "absolute", top: "1179px", left: "68%", width: "300px" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[14px] md:text-[16px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  By adding facial scanning technology with Gentle Monster's existing products, I envision a kiosk that blends utility with art.
                </p>

                {/* Row 4 — Goals (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "1435px", left: "27%", transform: "translateX(-50%)" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)] whitespace-nowrap"
                >
                  Goals
                </p>
                <p
                  style={{ position: "absolute", top: "1435px", left: "68%", width: "300px" }}
                  className="hidden md:block font-['Inter_Tight'] font-normal text-[14px] md:text-[16px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  Following similar concepts like Jin's (where user's can get frames + prescriptions same-day) I see a kiosk experience for users to find their perfect fit, with a secondary goal of inputting existing prescriptions.
                </p>

                {/* ── Mobile 1-column layout (hidden on desktop) ── */}
                <p
                  style={{ position: "absolute", top: "596px", left: "15%" }}
                  className="block md:hidden font-['Inter_Tight'] font-[300] text-[32px] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)]"
                >
                  Unblurring
                </p>
                <p
                  style={{ position: "absolute", top: "646px", left: "15%" }}
                  className="block md:hidden font-['Inter_Tight'] font-[300] text-[32px] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)]"
                >
                  Gentle Monster
                </p>

                <p
                  style={{ position: "absolute", top: "866px", left: "15%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[18px] md:text-[24px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)]"
                >
                  What is GM
                </p>
                <p
                  style={{ position: "absolute", top: "916px", left: "15%", width: "55%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  Known for unique and avant-garde concepts/products, their flagship stores blur the lines between art and retail.
                </p>

                <p
                  style={{ position: "absolute", top: "1126px", left: "15%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[18px] md:text-[24px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)]"
                >
                  Why
                </p>
                <p
                  style={{ position: "absolute", top: "1176px", left: "15%", width: "55%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  By adding facial scanning technology with Gentle Monster's existing products, I envision a kiosk that blends utility with art.
                </p>

                <p
                  style={{ position: "absolute", top: "1386px", left: "15%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[18px] md:text-[24px] leading-[1.25] text-[color:var(--text\/primary,#eeedf5)]"
                >
                  Goals
                </p>
                <p
                  style={{ position: "absolute", top: "1436px", left: "15%", width: "55%" }}
                  className="block md:hidden font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)]"
                >
                  Following similar concepts like Jin's (where user's can get frames + prescriptions same-day) I see a kiosk experience for users to find their perfect fit, with a secondary goal of inputting existing prescriptions.
                </p>
              </motion.div>
            </div>

            {/* Top frame — masks text at top edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "var(--background)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />

            {/* Bottom frame — masks text at bottom edge */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "var(--background)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />

            {/* sticky_desktop image overlay — desktop only */}
            <div
              className="hidden md:block"
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "795px", pointerEvents: "none", zIndex: 10 }}
            >
              <img src={imgStickyDesktop} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* sticky_mobile image overlay — mobile only */}
            <div
              className="block md:hidden"
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "795px", pointerEvents: "none", zIndex: 10 }}
            >
              <img src={imgStickyMobile} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>

        {/* Segment 2: rest of content */}
        <div className="flex flex-col gap-[9vh] items-center w-full mt-[9vh]">

          {/* ── 4. Section: Flow ── */}
          <div id="cs-flow" className="flex flex-col gap-[9vh] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Flow Highlights"
              headline="The simple flow"
              subtitle="Scan. Glasses Found. Checkout."
              accentColor="#afa4d8"
            />

            {/* Flows container */}
            <div
              className="flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34] font-['Inter_Tight',sans-serif]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >
              {/* Header */}
              <p className="font-[300] leading-[1.3] text-[#faf9ff] text-[24px] pb-[42px] w-full">
                Exploring how users can find the one
              </p>

              {/* Flow 1/5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-[300] leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Flow 1/5</p>
                  <p className="font-[300] leading-[1.4] text-[#faf9ff] text-[20px]">
                    Showcasing the shorter main flow inside the kiosk.
                  </p>
                  <p className="font-[300] leading-[1.65] text-[#908e99] text-[17px] w-full">
                    The flow displays two screens working in tandem! The ultimate goal is to help users find their best match and have a sales associate save them at the counter!
                  </p>
                </div>
                <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full overflow-hidden">
                  <video
                    ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 }); o.observe(el); }}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowGlasses}
                  />
                </div>
              </div>

              {/* Flow 2/5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-[300] leading-[1.5] text-[#908e99] text-[14px]">Flow 2/5</p>
                  <p className="font-[300] leading-[1.25] text-[#faf9ff] text-[20px]">
                    Use smaller filters as matches.
                  </p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                    This feature replaces filters by presenting personalized, pre-matched options instead of requiring people to sort through presets themselves (although the filter button still exists should people want to use it!).
                  </p>
                </div>
                <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full overflow-hidden">
                  <video
                    ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 }); o.observe(el); }}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowMymatch}
                  />
                </div>
              </div>

              {/* Flow 3/5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-[300] leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Flow 3/5</p>
                  <p className="font-[300] leading-[1.25] text-[#faf9ff] text-[20px]">
                    Don't overload people.
                  </p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                    Initially display five glasses to reduce decision paralysis! Users can scroll to explore lower-ranked matches, maintaining momentum without overwhelming them. Navigation is positioned at the bottom to minimize hand movement/fatigue.
                  </p>
                </div>
                <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full overflow-hidden">
                  <video
                    ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 }); o.observe(el); }}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowFourmatches}
                  />
                </div>
              </div>

              {/* Flow 4/5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-[300] leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Flow 4/5</p>
                  <p className="font-[300] leading-[1.25] text-[#faf9ff] text-[20px]">
                    Show people how it matches.
                  </p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                    Users can interpret the match percentage through four familiar criteria commonly used by lens specialists to distinguish a good fit from a poor one. Lower matches are considerate; higher matches are framed to feel confidence-boosting!
                  </p>
                </div>
                <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full overflow-hidden">
                  <video
                    ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 }); o.observe(el); }}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowBestmatch}
                  />
                </div>
              </div>

              {/* Flow 5/5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-[300] leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Snippet / Flow 2 / Glasses Customization</p>
                  <p className="font-[300] leading-[1.25] text-[#faf9ff] text-[20px]">
                    One decision opens up the next one.
                  </p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                    Each decision should feel like a natural progression, and UI should not overflow. Information is really only displayed when necessary, like this lens tint feature.
                  </p>
                </div>
                <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full overflow-hidden">
                  <video
                    ref={(el) => { if (!el) return; const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 }); o.observe(el); }}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowLenses}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* ── 5. Section: Brand Research + Flow ── */}
          <div id="cs-research" className="flex flex-col gap-[75px] items-start w-full scroll-mt-[100px] font-['Inter_Tight',sans-serif]">

            <CasestudySectionHeader
              eyebrow="Research"
              headline="Real eyes realize real potential"
              subtitle="Studying the existing brand, main users, and existing kiosks."
              accentColor="#afa4d8"
            />

            {/* Brand Considerations */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-[300] leading-[20px] text-[#908e99] text-[14px]">Brand Considerations</p>
                <p className="font-[300] leading-[1.45] text-[#faf9ff] text-[20px] w-full">
                  I categorized every product and major UI elements in Gentle Monster's website, visited 2 locations, and created a 50+ page doc of my findings.
                </p>
                <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                  This was all to really understand Gentle Monster's design system and how people buy glasses. The biggest goal was to make the kiosk feel like it really was part of GM.
                </p>
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <button
                  onClick={() => window.open(`mailto:abbyxhart@gmail.com?subject=${encodeURIComponent("Loved Gentle Monster, let's chat!")}`)}
                  onMouseEnter={() => setReachOutHovered(true)}
                  onMouseLeave={() => setReachOutHovered(false)}
                  className="flex items-center justify-center px-[16px] py-[8px] rounded-[24px] cursor-pointer border-none transition-colors duration-150"
                  style={{ background: reachOutHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)" }}
                >
                  <span className="font-[300] leading-[1.5] text-white text-[14px] whitespace-nowrap">Full doc? Email me!</span>
                </button>
                <div className="aspect-[2/1] bg-[#747474] rounded-[8px] w-full overflow-hidden">
                  <video
                    ref={(el) => {
                      if (!el) return;
                      const observer = new IntersectionObserver(
                        ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                        { threshold: 0.25 }
                      );
                      observer.observe(el);
                    }}
                    loop muted playsInline className="w-full h-full object-contain" src={vidDesignDoc}
                  />
                </div>
              </div>
            </div>

            {/* User Journey */}
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-[300] leading-[20px] text-[#908e99] text-[14px]">User Journey</p>
                <p className="font-[300] leading-[1.45] text-[#faf9ff] text-[20px] w-full">
                  I created a comprehensive flow for product view, checkout, create account, prescription, and a few others.
                </p>
                <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[17px] w-full">
                  I designed the full flow with first-time users in mind, limiting choices and content to keep it manageable.
                </p>
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full">
                {/* Slider switcher */}
                <div className="flex flex-col items-start">
                  <div
                    className="relative flex gap-[10px] h-[48px] items-start p-[8px] rounded-[100px]"
                    style={{ width: "340px", background: "rgba(88,85,100,0.2)", border: "1px solid #302f34" }}
                  >
                    <div
                      className="absolute top-[8px] h-[32px] w-[100px] rounded-[24px] pointer-events-none"
                      style={{
                        background: "rgba(144,142,153,0.2)",
                        left: "8px",
                        transform: `translateX(${journeyTabs.indexOf(activeJourneyTab) * 110}px)`,
                        transition: "transform 200ms ease-out",
                      }}
                    />
                    {journeyTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveJourneyTab(tab)}
                        onMouseEnter={() => setHoveredJourneyTab(tab)}
                        onMouseLeave={() => setHoveredJourneyTab(null)}
                        className="relative flex h-[32px] w-[100px] items-center justify-center px-[8px] py-[4px] rounded-[24px] shrink-0 bg-transparent border-none cursor-pointer"
                      >
                        <span
                          className="font-[300] text-[14px] leading-none whitespace-nowrap"
                          style={{
                            color: activeJourneyTab === tab || hoveredJourneyTab === tab ? "#faf9ff" : "#908e99",
                            transition: "color 150ms ease-out",
                          }}
                        >
                          {tab}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div
                    className="h-[2px] w-[48px] rounded-b-[4px]"
                    style={{
                      background: "#d9d9d9",
                      marginLeft: "29px",
                      transform: `translateX(${journeyTabs.indexOf(activeJourneyTab) * 110}px)`,
                      transition: "transform 200ms ease-out",
                    }}
                  />
                </div>
                {/* Image */}
                <div
                  className="aspect-[2/1] w-full rounded-[8px] overflow-hidden bg-[#747474]"
                  style={{ boxShadow: "0px 0px 30px 0px rgba(154,71,255,0.2)" }}
                >
                  <img
                    src={
                      activeJourneyTab === "Full Flow" ? imgKioskFlowFull :
                      activeJourneyTab === "Checkout" ? imgKioskFlowBag :
                      imgKioskFlowPrescription
                    }
                    alt={activeJourneyTab}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Two prescription cards */}
              <div className="flex gap-[8px] items-stretch w-full">
                <div className="flex-1 min-w-0 flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-tl-[24px] rounded-bl-[24px] rounded-tr-[4px] rounded-br-[4px] border border-[#302f34]" style={{ background: "#161617" }}>
                  <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.08) 0%, rgba(175,164,216,0) 70%)" }} />
                  </div>
                  <p className="font-[300] leading-[20px] text-[14px] relative z-10">
                    <span style={{ color: "#908e99" }}>Defining prescription flow: </span>
                    <span style={{ color: "#b8b4c5" }}>The kiosk is</span>
                  </p>
                  <p className="font-[300] leading-[1.45] text-[#b8b4c5] text-[20px] relative z-10">An avenue to get new prescriptions</p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[16px] tracking-[-0.32px] relative z-10">
                    Gentle Monster glasses come with plastic lenses, requiring a second trip to fill them. Why not provide in-house lens cutting like other Korean stores?
                  </p>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-tr-[24px] rounded-br-[24px] rounded-tl-[4px] rounded-bl-[4px] border border-[#302f34]" style={{ background: "#161617" }}>
                  <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.08) 0%, rgba(175,164,216,0) 70%)" }} />
                  </div>
                  <p className="font-[300] leading-[20px] text-[14px] relative z-10">
                    <span style={{ color: "#908e99" }}>Defining prescription flow: </span>
                    <span style={{ color: "#b8b4c5" }}>The kiosk isn't</span>
                  </p>
                  <p className="font-[300] leading-[1.45] text-[#b8b4c5] text-[20px] relative z-10">A full prescription service</p>
                  <p className="font-[300] leading-[1.65] text-[#b8b4c5] text-[16px] tracking-[-0.32px] relative z-10">
                    The kiosk will not measure prescriptions but provide an avenue for it. The ability to measure prescriptions and users ability to input are contradictory.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Break */}
            <div className="flex w-full justify-center">
              <div className="flex gap-[10px] items-start">
                {/* Smiley pill */}
                <div className="flex items-center justify-center shrink-0 rounded-[50px]" style={{ width: 45, height: 44, background: "rgba(175,164,216,0.15)" }}>
                  <img src={imgFaceSmile} alt="" className="size-[24px]" />
                </div>
                {/* Speech bubble */}
                <div
                  className="py-[8px] px-[16px]"
                  style={{ background: "rgba(175,164,216,0.15)", borderRadius: "24px 24px 24px 0px" }}
                >
                  <p className="font-[300] leading-[1.65] text-[#c1becb] text-[17px] text-left">
                    Wait, why are you even doing this? Like what's the opportunity with GM and glasses?
                  </p>
                </div>
              </div>
            </div>

            {/* Did you know card */}
            <div className="flex flex-col gap-[24px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full border border-[#302f34]" style={{ background: "#161617" }}>
              <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.08) 0%, rgba(175,164,216,0) 70%)" }} />
              </div>
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.08) 0%, rgba(175,164,216,0) 70%)" }} />
              </div>
              <div className="flex flex-col gap-[16px] items-start relative z-10 w-full">
                <p className="font-[300] leading-[20px] text-[#908e99] text-[14px]">Did you know?</p>
                <p className="font-[300] leading-[1.45] text-[#faf9ff] text-[20px] w-full">
                  The average time to look for glasses is 15 - 30 minutes. People who know their face frame are able to pick a style in under 10.
                </p>
                <p className="font-[300] leading-[1.65] text-[#908e99] text-[17px] w-full">
                 I saw this as a fun brand activation that also does more! My reseaerch from eye care locations suggests it could help GM shoppers move faster through decisions, reduce friction, and drive more conversions.
                </p>
              </div>
            </div>

            {/* Opportunity */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-[300] leading-[20px] text-[#908e99] text-[14px]">The opportunity</p>
                <p className="font-[300] leading-[1.45] text-[#faf9ff] text-[20px]">Try more and wait less.</p>
                <div className="font-[300] text-[#b8b4c5] text-[17px] w-full">
                  <p className="leading-[1.65] mb-[16px]">With growing popularity, Gentle Monster has queued lines stretching outside the storefront in both locations I went to (Toronto, ON) (New York, New York).</p>
                  <p className="leading-[1.65]">I noticed shoppers often waiting for sales associates or to try on different pairs, introducing the opportunity for a second path that both enhances user delight and storefront efficiency.</p>
                </div>
              </div>
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <img src={imgCrowd} alt="Crowds at GM" className="aspect-[2/1] w-full object-cover rounded-[8px]" />
                  <p className="font-[300] leading-[1.5] text-[#585564] text-[14px]">Huge crowds are the norm for GM! Bratz pop-up in LA, Spring 2025</p>
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <img src={imgAr} alt="AR experience at GM" className="aspect-[2/1] w-full object-cover rounded-[8px]" />
                  <p className="font-[300] leading-[1.5] text-[#585564] text-[14px]">Not afraid of fun experiences! AR Bratz mo-cap experience in LA</p>
                </div>
              </div>
            </div>

            {/* Typical GM shopper card */}
            <div className="flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full border border-[#302f34]" style={{ background: "#161617" }}>
              <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                <div style={{ width: "100%", height: "100%", background: blobGM_pink_left }} />
              </div>
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                <div style={{ width: "100%", height: "100%", background: blobGM_lav_right }} />
              </div>
              <div className="flex flex-col gap-[16px] items-start relative z-10 w-full">
                <p className="font-[300] leading-[20px] text-[#908e99] text-[14px]">The typical Gentle Monster shopper</p>
                <p className="font-[300] leading-[1.45] text-[#faf9ff] text-[20px]">Young, trendy, self-aware 18-34 year olds are 64% of GM's market</p>
                <p className="font-[300] leading-[1.65] text-[#908e99] text-[16px] tracking-[-0.32px]">
                  My users are people who are familiar with technology and care deeply about aesthetics and visuals! It was important the kiosk reflected the brand and felt minimal / clean, hence lots of documentation!
                </p>
              </div>
            </div>

          </div>

          {/* ── 6. Section: Heuristic Research ── */}
          <div id="cs-heuristics" className="flex flex-col gap-[9vh] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Heuristics"
              headline="Clarity from asking questions"
              subtitle="a metric helping to identify usability problems in interface design"
              accentColor="#afa4d8"
            />

            {/* Title block */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">
                General Kiosk Research and Heuristics
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[18px] md:text-[24px]">
                Clarity from asking questions
              </p>
              <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[14px] md:text-[16px] tracking-[-0.32px]">
                I went out in search of what makes kiosks so frustrating to users by testing the heuristics of 2 kiosks and interviewing GenZ peers (the group most familiar with kiosks)
              </p>
            </div>

            {/* Two-column location cards */}
            <div className="flex gap-[16px] items-center w-full">
              {/* Hi-Rise Dispensary */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgHirise} alt="Hi-Rise Dispensary" className="aspect-[2/1] w-full object-cover rounded-[8px]" />
                <div className="flex flex-col gap-[4px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#faf9ff] text-[14px] md:text-[17px]">
                    Hi-Rise Dispensary
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[17px]">
                    Organization and Introducing new information
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px]">
                  Studying the structure of information; great feedback and organized sections for beginners
                </p>
              </div>
              {/* Taichi Tea */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgTaichi} alt="Taichi Tea" className="aspect-[2/1] w-full object-cover rounded-[8px]" />
                <div className="flex flex-col gap-[4px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#faf9ff] text-[14px] md:text-[17px]">
                    Taichi Tea
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[17px]">
                    Customization options
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[14px] md:text-[17px]">
                  Viewing customization steps for what works and what definitely doesn't  [scrolling &gt;:(]
                </p>
              </div>
            </div>

            {/* Problem + Gaps + Solution — unified stack */}
            <div className="flex flex-col gap-[8px] items-start w-full">

              {/* Problem card */}
              <div className="flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[4px] rounded-br-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "531px", top: "calc(50% - 108px)", transform: "translateY(-50%)" }}>
                  <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.2) 0%, rgba(175,164,216,0) 70%)" }} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px] relative z-10">
                  The key problem
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.4] text-[#faf9ff] text-[16px] md:text-[20px] relative z-10">
                  Navigation is inconsistent, people hate scrolling, + range of motion is tiring.
                </p>
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#585564] text-[12px] md:text-[14px] relative z-10">
                  Top 3 gaps compiled after asking 12 peers to test out Hi-Rise and Taichi Tea
                </p>
              </div>

              {/* Gap 1 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">Gap 1</p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                    Large product categories = scrolls and decision confusion. Present only a few options!
                  </p>
                </div>
              </div>

              {/* Gap 2 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">Gap 2</p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                    Inconsistent menu placement popped up and often too high to be in good click zone
                  </p>
                </div>
              </div>

              {/* Gap 3 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">Gap 3</p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                    Large kiosks utilize full width and height, ignoring fatigue from full range of motion
                  </p>
                </div>
              </div>

              {/* Solution card */}
              <div className="flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-bl-[24px] rounded-br-[24px] rounded-tl-[8px] rounded-tr-[8px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "196px", top: "calc(50% + 99px)", transform: "translateY(-50%)" }}>
                  <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.2) 0%, rgba(175,164,216,0) 70%)" }} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px] relative z-10">
                  The obvious solution
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.4] text-[#faf9ff] text-[16px] md:text-[20px] relative z-10">
                  Provide simple menus and large margins, centering the experience.
                </p>
              </div>

            </div>

          </div>

          {/* ── 7. Section: Specs + Modelling ── */}
          <div id="cs-specs" className="flex flex-col gap-[9vh] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Specs"
              headline="Planning for the real world"
              subtitle="Where physical meets digital"
              accentColor="#afa4d8"
            />

            <div
              className="flex flex-col gap-[75px] items-start pb-[32px] pt-[24px] px-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.2) 0%, rgb(22,22,23) 37%)" }}
            >

              {/* Header */}
              <div className="flex flex-col gap-[16px] items-start w-full pb-[42px]">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">
                  Modelling for...
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">
                  Both physical dimensions and C4D environments
                </p>
              </div>

              {/* Kiosk */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">
                    Kiosk
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">
                    Testing button sizes in the real world and creating rules for kiosk build.
                  </p>
                </div>
                <div className="font-['Inter_Tight',sans-serif] font-normal leading-[0] text-[#908e99] text-[14px] md:text-[17px] w-full">
                  <p className="leading-[1.65] mb-[16px]">I created 3 different heights for the kiosks based on mirror height recommendations for short, middle, and tall people! The kiosk width is 22 x 11 inches, and aspect ratio is 1920x1080 for the kiosk.</p>
                  <p className="leading-[1.65] mb-[16px]">I wanted the kiosk to be shaped like lenses, round and soft, and be inspired by the 2024 jewelry collection, which uses pearls and purple gems.</p>
                  <p className="leading-[1.65]">I also tested buttons, important interactive cards, and text in the real world!</p>
                </div>
                {/* Full-width image + caption */}
                <div className="flex flex-col gap-[10px] items-start w-full">
                  <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                    <img src={imgKioskBuild} alt="Kiosk build" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                    A summary of the kiosk! More in the design document.
                  </p>
                </div>
                {/* Two-column images + captions */}
                <div className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                      <img src={imgKioskSpace} alt="Kiosk space" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                      Kiosk Space, designed for experiential flow of people
                    </p>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                      <img src={imgKioskPrintTest} alt="Kiosk print test" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px] w-full">
                      <p className="mb-0">Kiosk prints: testing button sizes IRL with printed boards.</p>
                      <p>Alas, the physical print was given to prof Joel and never returned LOL</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glasses */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">
                    Glasses
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">
                    Modelling a pair in C4D.
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[16px] tracking-[-0.32px]">
                  Luckily, Gentle Monster has beautiful side and front shots of each and every product so I was able to replicate everything within C4D pretty accurately!
                </p>
                <div className="flex gap-[24px] items-start w-full">
                  {/* Left: glasses video */}
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                      <video
                        ref={(el) => {
                          if (!el) return;
                          const observer = new IntersectionObserver(
                            ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                            { threshold: 0.25 }
                          );
                          observer.observe(el);
                        }}
                        loop muted playsInline className="w-full h-full object-cover" src={vidOjo01}
                      />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                      Ojo 01 Glasses (Black Acetate)
                    </p>
                  </div>
                  {/* Right: GM scene */}
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                      <video
                        ref={(el) => {
                          if (!el) return;
                          const observer = new IntersectionObserver(
                            ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                            { threshold: 0.25 }
                          );
                          observer.observe(el);
                        }}
                        loop muted playsInline className="w-full h-full object-cover" src={vidGmScene}
                      />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                      GM Scene and Kiosks
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── 8. Section: Reflection ── */}
          <div id="cs-reflection" className="flex flex-col gap-[24px] items-start w-full scroll-mt-[100px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[16px]">
                Thank you for shopping with us!
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[#faf9ff] text-[18px] md:text-[24px]">
                Combining skillsets &gt;&gt;
              </p>
            </div>

            {/* Card 1 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                1
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                  Balancing a lot of moving pieces
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[16px] tracking-[-0.32px]">
                  I got the opportunity to explore my love of design systems and branding, but also use my muscles in 3D / motion! Every decision had weight, consideration, and heavy documentation! I loved it :D
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                2
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                  Time Saver + Art Installation? Say less!
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[16px] tracking-[-0.32px]">
                  Exploring heuristics and problem solving to then blend it with a luxury experience/art installation was super exciting!
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                3
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#faf9ff] text-[14px] md:text-[17px]">
                  Motion, the start of something new
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[16px] tracking-[-0.32px]">
                  It was so fun to learn, I'd love to build a more fully realized concept next and dive deeper into what C4D can do. Definitely a new hobby, and so rewarding staying up into the AM's figuring things out!
                </p>
                <div className="w-[119px] h-[119px] rounded-[4px] overflow-hidden shrink-0">
                  <img src={imgModellingGlasses} alt="Modelling glasses" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <UpNext currentId="gentle-monster" />

        </div>
      </motion.div>
    </div>
  );
}
