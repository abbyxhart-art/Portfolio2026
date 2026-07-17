import { useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, useScroll, useTransform, useMotionValue, useInView, useAnimationControls } from "@/lib/motion";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";

const AIXELS_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-process", label: "Process" },
  { id: "cs-review", label: "Reflections" },
];

import vidPass1 from "../../assets/project/aixels/pass1.mov";
import imgPass2 from "../../assets/project/aixels/pass2.png";
import imgPass3 from "../../assets/project/aixels/pass3.png";
import imgPass4 from "../../assets/project/aixels/pass4.png";
import imgStructure from "../../assets/project/aixels/structure_2x1.png";
import imgSetup from "../../assets/project/aixels/setup_2x1.png";
import imgSogniai from "../../assets/project/aixels/sogniai.jpeg";
import imgMe from "../../assets/project/aixels/me.JPG";
import imgFeedback from "../../assets/project/aixels/feedback.png";
import imgUserInputs from "../../assets/project/aixels/user-inputs.png";
const vidHero = new URL("../../assets/project/aixels/Aixels_1920x960_29.99fps.mp4", import.meta.url).href;
const vidPixelLayer = new URL("../../assets/project/aixels/PixelLayer_Match.mp4", import.meta.url).href;
const vidSoundGrid = new URL("../../assets/project/aixels/SoundGrid_Match.mp4", import.meta.url).href;

const blobAIX = "radial-gradient(ellipse at center, rgba(255,130,80,0.06) 0%, rgba(255,130,80,0) 70%)";

export default function CasestudyAixels() {
  const shouldAnimate = useNavEntrance();

  const { scrollY } = useScroll();
  const heroCompleted = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroExtraHeight = useMotionValue(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const cardControls = useAnimationControls();
  const cardInView = useInView(cardRef, { amount: 0.5 });

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
    if (cardInView) {
      cardControls.start({
        x:      [0, -4,  4,  -3,  3,  -1.5, 0],
        rotate: [0, -2,  2,  -1.5, 1.5, -0.5, 0],
        transition: {
          duration: 0.7,
          times: [0, 0.15, 0.3, 0.48, 0.64, 0.82, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3.5,
        },
      });
    } else {
      cardControls.stop();
      cardControls.set({ x: 0, rotate: 0 });
    }
  }, [cardInView]);

  return (
    <div className="relative min-h-screen overflow-x-clip" style={{ backgroundColor: "#161617" }}>
      <CasestudyNavigation title="AIXELS" />
      <SectionNavigation sections={AIXELS_SECTIONS} title="AIXELS Casestudy Navigation" />


      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[150px] items-center w-full">

          {/* ── Section: Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[150px] items-center w-full">

            {/* Hero video */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            >
              <video
                autoPlay loop muted playsInline preload="auto"
                className="w-full h-full object-cover"
                src={vidHero}
              />
            </motion.div>

            {/* Overview text */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">

              {/* Title */}
              <div className="border-b border-[#302f34] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  AIXELS
                </p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[0] text-[color:var(--text\/secondary,#908e99)] text-[16px] md:text-[20px] w-full">
                  <p className="leading-[1.25] mb-0">Designathon winner;</p>
                  <p className="leading-[1.25]">Poke the bear: Explore with AI</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">

                {/* Left: My role + Team + Timeline */}
                <div className="flex flex-col gap-[32px] items-start shrink-0 w-[159px]">
                  <div className="flex flex-col gap-[16px] items-start leading-none">
                    <p className="text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] w-full">My role</p>
                    <p className="text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px] w-full">Team Lead</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] w-full">Team</p>
                    <div className="leading-[0] text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px] w-full">
                      <p className="leading-none mb-[12px]">Mars Cazer</p>
                      <p className="leading-none mb-[12px]">Hannah Lewis</p>
                      <p className="leading-none mb-[12px]">Isabella Byabato</p>
                      <p className="leading-none">Srushti Dabir</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start leading-none">
                    <p className="text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] w-full">Timeline</p>
                    <p className="text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px] w-full">2 Days</p>
                  </div>
                </div>

                {/* Right: Context */}
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] w-full">Context</p>
                  <div className="font-[300] leading-[0] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.65] mb-[16px]">Teams in Creative Collision have a mix of 1 - 4th years to combine skills and mentorship! Our team was mostly sick, and I scaled the project back to fit two people.</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.65] mb-[16px]">During the final day, College of Art and Design students, faculty, and alumni are invited to explore the projects New Media Design have been developing.</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.65]">Our designathon this year was sponsored by Sogni.AI, a startup designed to democratize AI by Mauvis Ledford.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section Overview card — pushback + response combined */}
            <motion.div
              ref={cardRef}
              className="border border-[#302f34] flex flex-col gap-[32px] items-start overflow-clip p-[32px] relative rounded-[4px] w-full"
              style={{ backgroundColor: "#161617" }}
              animate={cardControls}
            >
              {/* The pushback */}
              <div className="flex flex-col gap-[16px] items-start relative w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px] w-full">
                  The pushback
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Wait..a creative collision has AI??
                </p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[0] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                  <p className="leading-[1.65] mb-[16px] text-[#faf9ff]">This was the first year students were mixed in their opinion with the prompt.</p>
                  <p className="leading-[1.65]">While other teams had people interact with AI, we strayed away from interactions with filters, generated content, or chatbots and rather used Claude and Figma Make in our workflow to make something cool.</p>
                </div>
              </div>

              {/* The response */}
              <div className="flex flex-col gap-[16px] items-start relative w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px] w-full">
                    The response
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                    AI is a mirror
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                  Our professors believe that AI is nothing without taste. My fellow team lead, Mars, responded with AI is a mirror. We took that concept and ran with it, conceptualizing different ideas the first few hours until we landed on a grid of color and pixel art.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Section: Process Work ── */}
          <div id="cs-process" className="flex flex-col gap-[100px] items-start w-full">

            <CasestudySectionHeader
              eyebrow="Process Work"
              headline="Four layers of pixels that shift based on sound"
              subtitle="We wanted noise for users to shout at AI, to scream, to laugh, to feel large emotions"
            />

            {/* Section Flows — bordered gradient card */}
            <div
              className="border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] relative rounded-[8px] w-full"
              style={{
                background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)",
              }}
            >
              {/* Card header text */}
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Four layers of "pixels" that shift based on sound
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                  We wanted noise for users to shout at AI, to scream, to laugh, to feel large emotions, which affected the pixels.
                </p>
              </div>

              {/* Flow 1 — Pixel size and color */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                    Pixel size and color
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                    Pixels are based on the tone of the room, and shift with sharp noises
                  </p>
                </div>
                {/* Two square images side by side */}
                <div className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                    <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-[#1c1b1f]">
                      <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={vidPixelLayer} />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[15px] w-full">
                      Color — 4 layers with so much possibility
                    </p>
                  </div>
                  <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                    <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-[#1c1b1f]">
                      <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={vidSoundGrid} />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[15px] w-full">
                      Scale — 4 levels of scale
                    </p>
                  </div>
                </div>
              </div>

              {/* Flow 2 — Delighting with sound + screenshots */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                    User Inputs
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                    Delighting with sound + screenshots
                  </p>
                  <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[0] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                    <p className="leading-[1.65] mb-[16px]">I noticed people typically wanted to put their palms out in the beginning, and included digital sounds to surprise and delight users.</p>
                    <p className="leading-[1.65]">We also gave them the option to screenshot, and share the images later to print out</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-[#1c1b1f] border border-[#302f34]">
                    <img src={imgUserInputs} className="w-full h-full object-cover" alt="User interaction at the booth" />
                  </div>
                </div>
              </div>

              {/* Flow 3 — Color Choices */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                    Color Choices
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                    Color Options
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                    Using lots of if/else switches, I also studied top booking sites peers enjoyed (we all love AirBnB)
                  </p>
                </div>
                <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#1c1b1f] border border-[#302f34]">
                  <img src={imgStructure} className="w-full h-full object-cover" alt="Color options" />
                </div>
              </div>

              {/* Day 1 — Testing the grid, 2×2 */}
              <div className="flex flex-col gap-[36px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px] w-full">
                    Day 1
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                    Testing the grid
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[75px] w-full">
                  {[
                    { caption: "Pass 1 — Layering and shape tests; weak background–foreground contrast", media: "pass1" },
                    { caption: "Pass 2 — Introducing AI logos and removing midtones to isolate darks and lights", media: "pass2" },
                    { caption: "Pass 3 — Reintroducing midtones and control layering with thicker shapes", media: "pass3" },
                    { caption: "Pass 4 — Testing colors; evaluating light vs. dark backgrounds w/ Prof Mike", media: "pass4" },
                  ].map(({ caption, media }, i) => (
                    <div key={i} className="flex flex-col gap-[4px] items-start">
                      {media === "pass1" ? (
                        <video autoPlay loop muted playsInline className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" src={vidPass1} />
                      ) : media === "pass2" ? (
                        <img src={imgPass2} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                      ) : media === "pass3" ? (
                        <img src={imgPass3} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                      ) : (
                        <img src={imgPass4} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                      )}
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] w-full pt-[12px]">
                        {caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Setup */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                    Final Setup
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                    A macbook and a dream
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                    The whole experience ran off my macbook and a chrome browser!
                  </p>
                </div>
                <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#1c1b1f] border border-[#302f34]">
                  <img src={imgSetup} className="w-full h-full object-cover" alt="Final setup" />
                </div>
              </div>
            </div>

          </div>

          {/* ── Section: Results + Reflections ── */}
          <div id="cs-review" className="flex flex-col gap-[100px] items-start w-full">

            <CasestudySectionHeader
              eyebrow="Results + Reflections"
              headline="5 hours of nonstop fun"
              subtitle="Building something people wanted to stay at"
            />

            {/* 5 hours of nonstop fun */}
            <div className="flex gap-[24px] items-start w-full">
              <div className="flex-1 min-w-0">
                <div className="aspect-square w-full overflow-hidden rounded-[4px] bg-[#1c1b1f] border border-[#302f34]">
                  <img src={imgFeedback} className="w-full h-full object-cover" alt="5 hours of nonstop fun at the booth" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                  The results
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                  5 hours of nonstop fun
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[17px] w-full">
                  Our booth was never without a crowd of people. Everyone had something fun and nice to say about our project, even a potential promise to come back to the project later.
                </p>
              </div>
            </div>

            {/* Replay */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                Replay
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                First time using Claude!
              </p>

              {/* Point 1 */}
              <div className="bg-[rgba(235,250,213,0.03)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[15px] shrink-0">1</p>
                <div className="flex flex-col gap-[8px] items-start flex-1">
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px]">Simplicity &gt; Complexity</p>
                  <p className="font-['Inter',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] tracking-[-0.32px] w-full">
                    The response was incredible! Our work ended up being the lightest project in the showcase, with other teams having lots of touch points and long flows to work with over two days
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-[rgba(235,250,213,0.03)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[15px] shrink-0">2</p>
                <div className="flex flex-col gap-[8px] items-start flex-1">
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px]">Winning T-Shirts!</p>
                  <p className="font-['Inter',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] tracking-[-0.32px] w-full">
                    THANK YOU Mauvis and Grace @ Sogni.AI! I really learned a lot from Mauvis especially sharing his personal story and motivation to start Sogni.AI!
                  </p>
                  <img src={imgSogniai} className="aspect-[2/1] rounded-[4px] object-cover w-[255px]" alt="Sogni.AI" />
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-[rgba(235,250,213,0.03)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[15px] shrink-0">3</p>
                <div className="flex flex-col gap-[8px] items-start flex-1">
                  <p className="font-['Inter_Tight',sans-serif] font-[350] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[15px] md:text-[17px]">Side questing music beats with Strudel</p>
                  <p className="font-['Inter',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[16px] tracking-[-0.32px] w-full">
                    I also made a custom beat for our experience! It was so fun being able to experiment, though music producer will never be in my future LOL
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UpNext currentId="aixels" />

        </div>
      </motion.div>
    </div>
  );
}
