import { useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion } from "@/lib/motion";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";
import VideoControls from "../components/VideoControls";

const GM_SECTIONS = [
  { id: "cs-flow", label: "Flow" },
  { id: "cs-research", label: "Research" },
  { id: "cs-heuristics", label: "Heuristics" },
  { id: "cs-specs", label: "Specs" },
  { id: "cs-reflection", label: "Reflections" },
];
const vidGmScene = new URL("../../assets/project/gentlemonster/gmscene_2x1.mp4", import.meta.url).href;
const vidGmSceneBeginning = new URL("../../assets/project/gentlemonster/gm-scene-beginning.mp4", import.meta.url).href;
const vidOjo01 = new URL("../../assets/project/gentlemonster/ojo01_16x9.mp4", import.meta.url).href;
const imgKioskBuild = new URL("../../assets/project/gentlemonster/kioskbuild_2x1.png", import.meta.url).href;
const imgKioskSpace = new URL("../../assets/project/gentlemonster/kioskspace_2x1.png", import.meta.url).href;
const imgKioskPrintTest = new URL("../../assets/project/gentlemonster/kioskprinttest_2x1.png", import.meta.url).href;
const imgTaichi = new URL("../../assets/project/gentlemonster/taichi_2x1.png", import.meta.url).href;
const imgHirise = new URL("../../assets/project/gentlemonster/hirise_2x1.png", import.meta.url).href;
const imgInsight1 = new URL("../../assets/project/gentlemonster/insight-1.png", import.meta.url).href;
const imgInsight2 = new URL("../../assets/project/gentlemonster/insight-2.png", import.meta.url).href;
const imgUserResearch = new URL("../../assets/project/gentlemonster/user-research.png", import.meta.url).href;
const vidFlowBestmatch = new URL("../../assets/project/gentlemonster/flow_bestmatch.mp4", import.meta.url).href;
const vidFlowBestMatchHero = new URL("../../assets/project/gentlemonster/flow-best-match.mp4", import.meta.url).href;
const imgUserFlow1 = new URL("../../assets/project/gentlemonster/user-flow-1.png", import.meta.url).href;
const vidFlowMymatch = new URL("../../assets/project/gentlemonster/flow-my-match.mp4", import.meta.url).href;
const vidFlowLenses = new URL("../../assets/project/gentlemonster/flow_lenses.mp4", import.meta.url).href;
const vidFlowFourmatches = new URL("../../assets/project/gentlemonster/flow_fourmatches.mp4", import.meta.url).href;
const vidFlowGlasses = new URL("../../assets/project/gentlemonster/flow_glasses.mp4", import.meta.url).href;
const imgModellingGlasses = new URL("../../assets/project/gentlemonster/modellingglasses.JPG", import.meta.url).href;

export default function CasestudyGentleMonster() {
  const shouldAnimate = useNavEntrance();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Video refs
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const flowGlassesRef = useRef<HTMLVideoElement>(null);
  const flowMymatchRef = useRef<HTMLVideoElement>(null);
  const flowFourmatchesRef = useRef<HTMLVideoElement>(null);
  const flowBestmatchRef = useRef<HTMLVideoElement>(null);
  const flowLensesRef = useRef<HTMLVideoElement>(null);
  const ojo01Ref = useRef<HTMLVideoElement>(null);
  const gmSceneRef = useRef<HTMLVideoElement>(null);
  const gmSceneBeginningRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver play/pause-on-scroll for the flow/design-doc/glasses videos
  useEffect(() => {
    const refs = [flowGlassesRef, flowMymatchRef, flowFourmatchesRef, flowBestmatchRef, flowLensesRef, ojo01Ref, gmSceneRef, gmSceneBeginningRef];
    const observers: IntersectionObserver[] = [];
    refs.forEach((r) => {
      const el = r.current;
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play() : el.pause(); }, { threshold: 0.25 });
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <SectionNavigation sections={GM_SECTIONS} title="Gentle Monster Casestudy Navigation" />

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[16vw] pt-[20vh] pb-[15vh] relative z-[1]"
      >

        {/* Segment 1: Title + Hero */}
        <div className="flex flex-col gap-[40px] items-center w-full">

          <motion.div
            className="flex flex-col md:flex-row items-start justify-between md:gap-[24px] w-full font-['SF_Pro_Display',sans-serif]"
          >

            {/* Left side */}
            <div className="flex flex-col gap-[16px] items-start w-full md:w-[460px] shrink-0">
              <p className="font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                Gentle Monster Kiosk
              </p>
              <div className="font-regular text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                <p className="leading-[1.65] mb-[16px]">
                  Do you wonder if glasses <span className="italic">actually</span> fit your face?
                </p>
                <p className="leading-[1.65] mb-[16px]">
                  Gentle Monster is a popular luxury eyewear brand. <span className="font-bold" style={{ color: "var(--color-text-between)" }}>Stores are overrun with long queues and limited time to try glasses on in-store.</span> This project overall asks how a kiosk can lift the burden and help users find their perfect match.
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-[32px] items-start justify-center max-w-[65ch] w-full md:w-[323px] shrink-0 font-regular text-[length:var(--typography-body-default-font-size)]">
              <div className="flex flex-col gap-[16px] items-start">
                <p className="leading-[1.65] font-medium text-[#faf9ff]">Scope</p>
                <div className="text-[#908e99] leading-none">
                  <p className="mb-[12px]">UX Research, Activation, Prototype + 3D</p>
                  <p>{`22 x 11 " (small screen), 44 x 22" (large screen)`}</p>
                </div>
              </div>
              <p className="text-[#908e99] leading-none">2024</p>
            </div>

          </motion.div>

          {/* ── Hero + Hero row 2 — even 16px gaps. ── */}
          <div className="flex flex-col gap-[16px] items-center w-full">
            <div className="aspect-[3/2] bg-[#505050] w-full overflow-hidden relative" style={{ borderRadius: "var(--radius-component-image)" }}>
              <video ref={heroVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidFlowBestMatchHero} />
              <VideoControls videoRef={heroVideoRef} />
            </div>

            <div className="flex gap-[16px] items-center w-full">
              <div className="aspect-[3/4] bg-[#505050] rounded-[var(--radius-component-image)] overflow-hidden relative" style={{ flex: 1 }}>
                <img src={imgUserFlow1} alt="" className="w-full h-full object-cover" />
              </div>
              {/* flex 1:2 (not the old 314:542) — the ratio that makes width/aspectRatio
                  come out equal for both panels now that they're 3/4 and 3/2. */}
              <div className="relative" style={{ flex: 2 }}>
                <div className="aspect-[3/2] bg-[#505050] rounded-[var(--radius-component-image)] overflow-hidden relative w-full">
                  <video ref={gmSceneBeginningRef} loop muted playsInline className="w-full h-full object-cover" src={vidGmSceneBeginning} />
                </div>
                {/* Absolutely positioned below the video (top: 100%) so it takes
                    no layout height — keeps this panel exactly as tall as the
                    aspect-[3/4] image beside it. */}
                <p
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "100%",
                    marginTop: 8,
                    fontFamily: "var(--typography-label-caption-font-family)",
                    fontSize: "var(--typography-label-caption-font-size)",
                    fontWeight: "var(--typography-label-caption-font-weight)",
                    lineHeight: "var(--typography-label-caption-line-height)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Modelled in C4D
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Segment 2: rest of content */}
        <div className="flex flex-col gap-[var(--gap-section)] items-center w-full mt-[var(--gap-section)]">

          {/* ── 4. Section: Flow ── */}
          <div id="cs-flow" className="flex flex-col gap-[var(--gap-section)] items-start w-full scroll-mt-[100px]">

            {/* Flows container */}
            <div className="flex flex-col gap-[75px] items-start w-full font-['SF_Pro_Display',sans-serif]">
              {/* Flow 1/5 */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-regular leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Core Flow + Concept</p>
                  <p className="font-medium leading-[1.4] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                    Two screens: one for reflection, one for touch
                  </p>
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    The main screen works with a camera and acts as a mirror, with the smaller screen holding the main interface and flow.
                  </p>
                </div>
                <div className="aspect-[3/2] bg-[#d9d9d9] rounded-[var(--radius-component-image)] w-full overflow-hidden relative">
                  <video
                    ref={flowGlassesRef}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowGlasses}
                  />
                  <VideoControls videoRef={flowGlassesRef} />
                </div>
              </div>

              {/* Flow 2/5 */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-regular leading-[1.5] text-[#908e99] text-[14px]">Flow 1/4 : The Profile</p>
                  <p className="font-medium leading-[1.25] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                    Share filters as matches
                  </p>
                  <p className="font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                   Right after scanning their face, users see a personalized profile with pre-matched materials and lens tints. The profile uses complimentary, open-ended language to help users explore without feeling locked into recommendations that don’t resonate with them.
                  </p>
                </div>
                <div className="aspect-[3/2] bg-[#d9d9d9] rounded-[var(--radius-component-image)] w-full overflow-hidden relative">
                  <video
                    ref={flowMymatchRef}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowMymatch}
                  />
                  <VideoControls videoRef={flowMymatchRef} />
                </div>
              </div>

              {/* Flow 3/5 */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-regular leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Flow 2/4</p>
                  <p className="font-medium leading-[1.25] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                    Displaying only four matches at a time
                  </p>
                  <p className="font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Four matches were seen as the most optimal, with three feeling limiting, and five feeling cramped. Navigation is positioned at the bottom to minimize hand movement/fatigue.
                  </p>
                </div>
                <div className="aspect-[3/2] bg-[#d9d9d9] rounded-[var(--radius-component-image)] w-full overflow-hidden relative">
                  <video
                    ref={flowFourmatchesRef}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowFourmatches}
                  />
                  <VideoControls videoRef={flowFourmatchesRef} />
                </div>
              </div>

              {/* Flow 4/5 */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-regular leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Flow 3/4</p>
                  <p className="font-medium leading-[1.25] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                    Bring professional language to the user
                  </p>
                  <p className="font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Users can interpret the match percentage through four familiar criteria commonly used by lens specialists to distinguish a good fit from a poor one. Lower matches are considerately worded; higher matches are framed to feel confidence-boosting!
                  </p>
                </div>
                <div className="aspect-[3/2] bg-[#d9d9d9] rounded-[var(--radius-component-image)] w-full overflow-hidden relative">
                  <video
                    ref={flowBestmatchRef}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowBestmatch}
                  />
                  <VideoControls videoRef={flowBestmatchRef} />
                </div>
              </div>

              {/* Flow 5/5 */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <p className="font-regular leading-none text-[#908e99] text-[14px] tracking-[0.126px]">Snippet / Flow 2 / Glasses Customization</p>
                  <p className="font-medium leading-[1.25] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                    One decision opens up the next one.
                  </p>
                  <p className="font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Each decision should feel like a natural progression, and UI should not overflow. Information is really only displayed when necessary, like this lens tint feature.
                  </p>
                </div>
                <div className="aspect-[3/2] bg-[#d9d9d9] rounded-[var(--radius-component-image)] w-full overflow-hidden relative">
                  <video
                    ref={flowLensesRef}
                    loop muted playsInline className="w-full h-full object-cover" src={vidFlowLenses}
                  />
                  <VideoControls videoRef={flowLensesRef} />
                </div>
              </div>

            </div>

          </div>

          {/* ── 5. Section: Research ── */}
          <div id="cs-research" className="flex flex-col gap-[var(--gap-section)] items-start w-full scroll-mt-[100px] font-['SF_Pro_Display',sans-serif]">

            {/* Research Stage 1 */}
            <div className="flex flex-col gap-[38px] items-start w-full">
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Research Stage 1</p>
                <p className="font-medium leading-[1.25] text-[#faf9ff] text-[20px]">
                  "An expensive mistake to make with prescription lenses"
                </p>
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  Users have flooded Yelp and Reddit with frustrations and advice for the perfect pair and / or Gentle Monster. Most friction stems from limited local inventory and busy sales associates.
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-[var(--radius-component-image)]">
                <img src={imgUserResearch} alt="User research" className="w-full h-auto block" />
              </div>
            </div>

            {/* Research Stage 2 */}
            <div className="flex flex-col gap-[38px] items-start w-full">
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Research Stage 2</p>
                <p className="font-medium leading-[1.25] text-[#faf9ff] text-[20px]">
                  "Hey Chat, can you AI me a pair of glasses that fit my face?"
                </p>
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  Users have flooded Yelp and Reddit with frustrations and advice for the perfect pair and / or Gentle Monster. Most friction stems from limited local inventory and busy sales associates.
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-[var(--radius-component-image)]">
                <img src={imgUserResearch} alt="User research" className="w-full h-auto block" />
              </div>
            </div>

            {/* Research Insight Fixes */}
            <div className="flex flex-col md:flex-row items-start md:items-stretch gap-[24px] md:gap-[16px] w-full">
              <div className="flex flex-col md:justify-between gap-[24px] w-full md:flex-1 md:min-w-0">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Insight #1</p>
                  <p className="font-medium leading-[1.45] text-[#faf9ff] text-[20px]">
                    Tell me <span className="italic">exactly</span> what makes these a match
                  </p>
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Each product page surfaces the four key fit categories eye care professionals use, giving essential information at a glance
                  </p>
                </div>
                <div className="h-[417px] w-full overflow-hidden rounded-[var(--radius-component-image)] shrink-0">
                  <img src={imgInsight1} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col md:justify-between gap-[24px] w-full md:flex-1 md:min-w-0">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Insight #2</p>
                  <p className="font-medium leading-[1.45] text-[#faf9ff] text-[20px]">Fixed information delay</p>
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Each product displays match rate, availability, and color options. Although GM's website prioritizes minimalism, I reintroduced these key details to help users compare products more efficiently.
                  </p>
                </div>
                <div className="h-[417px] w-full overflow-hidden rounded-[var(--radius-component-image)] shrink-0">
                  <img src={imgInsight2} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Card Highlight */}
            <div className="flex flex-col gap-[24px] items-start p-[24px] rounded-[8px] w-full" style={{ background: "#242326" }}>
              <div className="leading-[1.65] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                <p className="font-medium text-[#c4c3cb]">After this, I went out to test two kiosks.</p>
                <p className="font-regular text-[#908e99]">I found 2 things: kiosks use too much of their height for it to be comfortable with top navigation. Kiosks also had too much information at one time, becoming cramped.</p>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex flex-col md:flex-row gap-[24px] md:gap-[16px] items-start w-full">
              <div className="flex flex-col gap-[24px] items-start w-full md:flex-1 md:min-w-0">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Kiosk Feedback: A dispensary</p>
                  <p className="font-regular leading-[1.45] text-[#faf9ff] text-[20px]">Quickly compare products</p>
                  <div className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    <p className="mb-[16px]">Large product catalogs overwhelmed users, especially when they were unsure what they wanted or how products differed.</p>
                    <p>To reduce load, I introduced a comparison menu that lets users quickly compare products.</p>
                  </div>
                </div>
                <div className="aspect-[827/810] w-full rounded-[var(--radius-component-image)]" style={{ background: "#2f2e32" }} />
              </div>
              <div className="flex flex-col gap-[24px] items-start w-full md:flex-1 md:min-w-0">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Kiosk 2 Feedback: A restaurant</p>
                  <p className="font-regular leading-[1.45] text-[#faf9ff] text-[20px] max-w-[65ch] w-full">Help users find what they already want</p>
                  <div className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    <p className="mb-[16px]">Large menus and sections were barely helped with a poor search system.</p>
                    <p>Creating a clear and intuitive search experience helped users find products faster with less effort.</p>
                  </div>
                </div>
                <div className="aspect-[827/810] w-full rounded-[var(--radius-component-image)]" style={{ background: "#2f2e32" }} />
              </div>
            </div>

            {/* Brand Research */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:0.875rem]">Brand Considerations</p>
                <p className="font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] max-w-[65ch] w-full">
                  I categorized every product and major UI elements in Gentle Monster's website and created a 50+ doc of my findings
                </p>
                <p className="font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  This was all to understand how Gentle Monster and the kiosk's relationship would work. While I stayed true to most of Gentle Monster, I made note of where some changes could be made.
                </p>
              </div>
              <div className="aspect-[3/2] w-full rounded-[8px]" style={{ background: "#747474" }} />
            </div>

          </div>

          {/* ── 6. Section: Heuristic Research ── */}
          <div id="cs-heuristics" className="flex flex-col gap-[var(--gap-section)] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Heuristics"
              headline="Clarity from asking questions"
              subtitle="a metric helping to identify usability problems in interface design"
              divider={false}
            />

            {/* Title block */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                General Kiosk Research and Heuristics
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">
                Clarity from asking questions
              </p>
              <p className="font-['SF_Pro_Display',sans-serif]font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">
                I went out in search of what makes kiosks so frustrating to users by testing the heuristics of 2 kiosks and interviewing GenZ peers (the group most familiar with kiosks)
              </p>
            </div>

            {/* Two-column location cards */}
            <div className="flex gap-[16px] items-center w-full">
              {/* Hi-Rise Dispensary */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgHirise} alt="Hi-Rise Dispensary" className="aspect-[2/1] w-full object-cover rounded-[var(--radius-component-image)]" />
                <div className="flex flex-col gap-[4px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.5] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Hi-Rise Dispensary
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Organization and Introducing new information
                  </p>
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                  Studying the structure of information; great feedback and organized sections for beginners
                </p>
              </div>
              {/* Taichi Tea */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgTaichi} alt="Taichi Tea" className="aspect-[2/1] w-full object-cover rounded-[var(--radius-component-image)]" />
                <div className="flex flex-col gap-[4px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.5] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Taichi Tea
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Customization options
                  </p>
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
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
                <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] relative z-10">
                  The key problem
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.4] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">
                  Navigation is inconsistent, people hate scrolling, + range of motion is tiring.
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#585564] text-[12px] md:text-[14px] relative z-10">
                  Top 3 gaps compiled after asking 12 peers to test out Hi-Rise and Taichi Tea
                </p>
              </div>

              {/* Gap 1 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Gap 1</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Large product categories = scrolls and decision confusion. Present only a few options!
                  </p>
                </div>
              </div>

              {/* Gap 2 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Gap 2</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Inconsistent menu placement popped up and often too high to be in good click zone
                  </p>
                </div>
              </div>

              {/* Gap 3 */}
              <div className="flex items-start p-[24px] relative rounded-[4px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="flex flex-col gap-[16px]">
                  <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Gap 3</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Large kiosks utilize full width and height, ignoring fatigue from full range of motion
                  </p>
                </div>
              </div>

              {/* Solution card */}
              <div className="flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-bl-[24px] rounded-br-[24px] rounded-tl-[8px] rounded-tr-[8px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
                <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "196px", top: "calc(50% + 99px)", transform: "translateY(-50%)" }}>
                  <div style={{ width: "100%", height: "100%", background: "radial-gradient(ellipse at center, rgba(175,164,216,0.2) 0%, rgba(175,164,216,0) 70%)" }} />
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] relative z-10">
                  The obvious solution
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.4] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">
                  Provide simple menus and large margins, centering the experience.
                </p>
              </div>

            </div>

          </div>

          {/* ── 7. Section: Specs + Modelling ── */}
          <div id="cs-specs" className="flex flex-col gap-[var(--gap-section)] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Specs"
              headline="Planning for the real world"
              subtitle="Where physical meets digital"
              divider={false}
            />

            <div className="flex flex-col gap-[75px] items-start w-full">

              {/* Header */}
              <div className="flex flex-col gap-[16px] items-start w-full pb-[42px]">
                <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                  Modelling for...
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">
                  Both physical dimensions and C4D environments
                </p>
              </div>

              {/* Kiosk */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Kiosk
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">
                    Testing button sizes in the real world and creating rules for kiosk build.
                  </p>
                </div>
                <div className="font-['SF_Pro_Display',sans-serif] font-normal leading-[0] text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  <p className="leading-[1.65] mb-[16px]">I created 3 different heights for the kiosks based on mirror height recommendations for short, middle, and tall people! The kiosk width is 22 x 11 inches, and aspect ratio is 1920x1080 for the kiosk.</p>
                  <p className="leading-[1.65] mb-[16px]">I wanted the kiosk to be shaped like lenses, round and soft, and be inspired by the 2024 jewelry collection, which uses pearls and purple gems.</p>
                  <p className="leading-[1.65]">I also tested buttons, important interactive cards, and text in the real world!</p>
                </div>
                {/* Full-width image + caption */}
                <div className="flex flex-col gap-[10px] items-start w-full">
                  <div className="aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#d9d9d9]">
                    <img src={imgKioskBuild} alt="Kiosk build" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                    A summary of the kiosk! More in the design document.
                  </p>
                </div>
                {/* Two-column images + captions */}
                <div className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#d9d9d9]">
                      <img src={imgKioskSpace} alt="Kiosk space" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                      Kiosk Space, designed for experiential flow of people
                    </p>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#d9d9d9]">
                      <img src={imgKioskPrintTest} alt="Kiosk print test" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px] max-w-[65ch] w-full">
                      <p className="mb-0">Kiosk prints: testing button sizes IRL with printed boards.</p>
                      <p>Alas, the physical print was given to prof Joel and never returned LOL</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glasses */}
              <div className="flex flex-col gap-[40px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    Glasses
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">
                    Modelling a pair in C4D.
                  </p>
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">
                  Luckily, Gentle Monster has beautiful side and front shots of each and every product so I was able to replicate everything within C4D pretty accurately!
                </p>
                <div className="flex gap-[24px] items-start w-full">
                  {/* Left: glasses video */}
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full rounded-[var(--radius-component-image)] overflow-hidden bg-[#d9d9d9] relative">
                      <video
                        ref={ojo01Ref}
                        loop muted playsInline className="w-full h-full object-cover" src={vidOjo01}
                      />
                      <VideoControls videoRef={ojo01Ref} />
                    </div>
                    <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
                      Ojo 01 Glasses (Black Acetate)
                    </p>
                  </div>
                  {/* Right: GM scene */}
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <div className="aspect-[2/1] w-full rounded-[var(--radius-component-image)] overflow-hidden bg-[#d9d9d9] relative">
                      <video
                        ref={gmSceneRef}
                        loop muted playsInline className="w-full h-full object-cover" src={vidGmScene}
                      />
                      <VideoControls videoRef={gmSceneRef} />
                    </div>
                    <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[12px] md:text-[14px]">
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
              <p className="font-['SF_Pro_Display',sans-serif] leading-none text-[#908e99] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                Thank you for shopping with us!
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">
                Combining skillsets &gt;&gt;
              </p>
            </div>

            {/* Card 1 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                1
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                  Balancing a lot of moving pieces
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">
                  I got the opportunity to explore my love of design systems and branding, but also use my muscles in 3D / motion! Every decision had weight, consideration, and heavy documentation! I loved it :D
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                2
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                  Time Saver + Art Installation? Say less!
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">
                  Exploring heuristics and problem solving to then blend it with a luxury experience/art installation was super exciting!
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#302f34] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[12px] md:text-[14px] shrink-0">
                3
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                  Motion, the start of something new
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-normal leading-[1.65] text-[#b8b4c5] text-[14px] md:text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">
                  It was so fun to learn, I'd love to build a more fully realized concept next and dive deeper into what C4D can do. Definitely a new hobby, and so rewarding staying up into the AM's figuring things out!
                </p>
                <div className="w-[119px] h-[119px] rounded-[var(--radius-component-image)] overflow-hidden shrink-0">
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
