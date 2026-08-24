import { useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion } from "@/lib/motion";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import VideoControls from "../components/VideoControls";

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

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip" style={{ backgroundColor: "#161617" }}>
      <SectionNavigation sections={AIXELS_SECTIONS} title="AIXELS Casestudy Navigation" />


      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[16vw] pt-[20vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[var(--gap-section)] items-center w-full">

          {/* ── Title + Hero — fixed 32px between them regardless of scale. ── */}
          <div className="flex flex-col gap-[32px] items-center w-full">

            <motion.div
              className="flex flex-col md:flex-row items-start justify-between md:gap-[24px] w-full font-['SF_Pro_Display',sans-serif]"
            >
              {/* Left side */}
              <div className="flex flex-col gap-[16px] items-start w-full md:w-[565px] shrink-0">
                <p className="font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  Aixels
                </p>
                <div className="font-regular text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  <p className="leading-[1.65] mb-[16px]">RIT hosts a creative collision every year.</p>
                  <p className="leading-[1.65]">In just two days we created an installation that checks all the boxes: art, a line of people dancing, screaming, clapping for all 5 hours, and a working product.</p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-[32px] self-stretch shrink-0 font-regular text-[length:var(--typography-body-default-font-size)]">
                <div className="flex flex-col gap-[16px] items-start h-full">
                  <p className="leading-[1.65] font-medium text-[#faf9ff]">Team</p>
                  <div className="text-[#908e99] leading-none">
                    <p className="mb-[12px]">4 New Media Designers</p>
                    <p>2 Visual Communication</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[32px] items-start h-full">
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-[1.65] font-medium text-[#faf9ff]">Scope</p>
                    <p className="text-[#908e99] leading-none">Agentic Design</p>
                  </div>
                  <p className="text-[#908e99] leading-none">2026</p>
                </div>
              </div>
            </motion.div>

            {/* Hero video */}
            <div
              className="aspect-[3/2] bg-[#505050] w-full overflow-hidden relative"
              style={{ borderRadius: "var(--radius-component-image)" }}
            >
              <video
                ref={heroVideoRef}
                autoPlay loop muted playsInline preload="auto"
                className="w-full h-full object-cover"
                src={vidHero}
              />
              <VideoControls videoRef={heroVideoRef} />
            </div>

          </div>

          {/* ── Section: Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[var(--gap-section)] items-center w-full">

            {/* The result — 5 hours of nonstop fun */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                  The result
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                  5 hours of nonstop fun
                </p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[var(--typography-body-default-line-height)] text-[color:var(--text\/secondary,#908e99)] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                  Our booth was never without a crowd of people. Everyone had something fun and nice to say about our project, even a potential promise to come back to the project later.
                </p>
              </div>
              <div className="aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#242326] p-[16px]">
                <img src={imgFeedback} className="w-full h-full object-cover rounded-[var(--radius-component-image)]" alt="5 hours of nonstop fun at the booth" />
              </div>
            </div>

            {/* Section Overview — creative collision quote card */}
            <div
              className="flex gap-[24px] items-start p-[24px] rounded-[8px] w-full h-[132px]"
              style={{ backgroundColor: "#242326" }}
            >
              <img
                src={imgMe}
                className="h-full aspect-square rounded-[8px] object-cover shrink-0 bg-[#242326]"
                style={{ objectPosition: "85% 35%" }}
                alt="Presenting Aixels at the creative collision showcase"
              />
              <div className="flex flex-col items-start flex-1 min-w-0 font-['SF_Pro_Display',sans-serif] text-[length:var(--typography-body-default-font-size)]">
                <p className="font-[var(--typography-body-default-intense-font-weight)] leading-[var(--typography-body-default-intense-line-height)] text-[color:var(--text\/secondary,#D1CEDC)] max-w-[65ch] w-full">
                  Poke the bear: AI  →  this was the first year students were mixed in their opinion with the prompt
                </p>
                <p className="font-regular leading-[var(--typography-body-default-line-height)] text-[color:var(--text\/secondary,#908e99)] max-w-[65ch] w-full">
                  Student debate greatly narrowed our scope. We stayed away from interactions with filters, generated content, or chatbots! Mars, my teammate, said AI was a mirror to craft and we ran with that concept.
                </p>
              </div>
            </div>
          </div>

          {/* ── Section: Process Work ── */}
          <div id="cs-process" className="flex flex-col gap-[var(--gap-section)] items-start w-full">

            <div className="flex flex-col gap-[16px] items-center w-full font-['SF_Pro_Display',sans-serif]">
              <p className="font-regular text-[12px] tracking-[0.08em] leading-[16.5px] uppercase text-[#908e99] text-center">
                Process Work
              </p>
              <p className="font-medium text-[clamp(28px,4vw,40px)] leading-[1.2] text-[#faf9ff] text-center">
                Four layers of pixels that shift based on sound
              </p>
              <p className="font-regular text-[length:var(--typography-body-default-font-size)] leading-[1.65] text-[#908e99] text-center">
                We wanted noise for users to shout at AI, to scream, to laugh, to feel large emotions
              </p>
            </div>

            <div className="flex flex-col gap-[var(--gap-section)] items-start w-full">

              {/* Container: Pixels + Interactions */}
              <div
                className="border border-[#302f34] flex flex-col gap-[var(--gap-section)] items-start p-[24px] relative rounded-[8px] w-full"
                style={{ background: "linear-gradient(to bottom, rgba(55,54,61,0.1) 0%, rgba(22,22,23,0.1) 50%)" }}
              >
                <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)] max-w-[65ch] w-full">
                  Pixels + Interactions
                </p>

                {/* Pixel color + Pixel size — two independent columns, each with its own header above its own media */}
                <div className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[24px] items-start flex-1 min-w-0">
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                        Pixel color
                      </p>
                      <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                        Color is mapped to the tone of the room
                      </p>
                    </div>
                    <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#1c1b1f]">
                      <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={vidPixelLayer} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[24px] items-start flex-1 min-w-0">
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                        Pixel size
                      </p>
                      <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                        Size is mapped to volume
                      </p>
                    </div>
                    <div className="aspect-square w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#1c1b1f]">
                      <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={vidSoundGrid} />
                    </div>
                  </div>
                </div>

                {/* User inputs */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                      User inputs
                    </p>
                    <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                      Screenshot and delightful sound
                    </p>
                    <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                      Using Mediapipe, I mapped common hand signals, the most common being a screenshot for people to share later
                    </p>
                  </div>
                  <div className="w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#242326]">
                    <img src={imgUserInputs} className="w-full h-auto object-contain" alt="Hand signal inputs mapped to sounds" />
                  </div>
                </div>

                {/* Layers */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                      Layers
                    </p>
                    <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                      AI icons
                    </p>
                    <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                      Icons were chosen based on clarity of size, with Claude, Gemini, and ChatGPT going from light to dark
                    </p>
                  </div>
                  <div className="aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#242326]">
                    <img src={imgStructure} className="w-full h-full object-cover" alt="Four layers of the pixel system, from base color to AI icon overlay" />
                  </div>
                </div>
              </div>

              {/* Container: Testing the grid */}
              <div
                className="border border-[#302f34] flex flex-col gap-[var(--gap-section)] items-start p-[24px] relative rounded-[8px] w-full"
                style={{ background: "linear-gradient(to bottom, rgba(55,54,61,0.1) 0%, rgba(22,22,23,0.1) 50%)" }}
              >
                <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)] max-w-[65ch] w-full">
                  Testing the grid
                </p>

                <div className="grid grid-cols-2 gap-x-[16px] gap-y-[75px] w-full">
                  {[
                    { time: "10:00 AM Thursday", caption: "Pixels and maps", media: "pass1" },
                    { time: "2:00 PM Thursday", caption: "Layers and shapes", media: "pass2" },
                    { time: "1:00 AM Thursday", caption: "Midtones and sound", media: "pass3" },
                    { time: "8:00 AM Friday", caption: "Colors and logos ft. (prof) Mike", media: "pass4" },
                  ].map(({ time, caption, media }, i) => (
                    <div key={i} className="flex flex-col gap-[24px] items-start">
                      <div className="flex flex-col gap-[16px] items-start w-full">
                        <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                          {time}
                        </p>
                        <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                          {caption}
                        </p>
                      </div>
                      {media === "pass1" ? (
                        <div className="aspect-[2/1] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#242326]">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidPass1} />
                        </div>
                      ) : (
                        <img
                          src={media === "pass2" ? imgPass2 : media === "pass3" ? imgPass3 : imgPass4}
                          className="aspect-[2/1] rounded-[var(--radius-component-image)] w-full object-cover bg-[#242326]"
                          alt={caption}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Setup — sits directly in the flow, no card wrapper */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[15px]">
                    Final Setup
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-[350] leading-[var(--typography-display-title-smallest-line-height)] font-medium text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-display-title-smallest-font-size)]">
                    A macbook and a dream
                  </p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[15px] md:text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    The whole experience ran off my macbook and a chrome browser!
                  </p>
                </div>
                <div className="aspect-[3/2] w-full overflow-hidden rounded-[var(--radius-component-image)] bg-[#242326] p-[16px]">
                  <img src={imgSetup} className="w-full h-full object-cover rounded-[var(--radius-component-image)]" alt="Final setup" />
                </div>
              </div>

            </div>

          </div>

          {/* ── Section: Results + Reflections ── */}
          <div id="cs-review" className="flex flex-col gap-[16px] items-start w-full">

            <p className="font-['SF_Pro_Display',sans-serif] font-regular text-[12px] tracking-[0.08em] leading-[16.5px] uppercase text-[#908e99] text-center max-w-[65ch] w-full">
              Results + Reflections
            </p>

            {/* Replay */}
            <div className="flex flex-col gap-[16px] items-start w-full">

              {/* Point 1 */}
              <div className="bg-[#242326] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['SF_Pro_Display',sans-serif] leading-[2.05] text-[color:var(--text\/tertiary,#585564)] text-[14px] w-[10px] shrink-0">1</p>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <p className="font-['SF_Pro_Display',sans-serif] font-[var(--typography-body-default-intense-font-weight)] leading-[var(--typography-body-default-intense-line-height)] text-[color:var(--text\/between,#d1cedc)] text-[length:var(--typography-body-default-intense-font-size)] whitespace-nowrap">Simplicity &gt; Complexity</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[var(--typography-body-default-line-height)] text-[color:var(--text\/secondary,#908e99)] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    The response was incredible! Our work ended up being the lightest project in the showcase, with other teams having lots of touch points and long flows to work with over two days
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-[#242326] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['SF_Pro_Display',sans-serif] leading-[2.05] text-[color:var(--text\/tertiary,#585564)] text-[14px] w-[10px] shrink-0">2</p>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <p className="font-['SF_Pro_Display',sans-serif] font-[var(--typography-body-default-intense-font-weight)] leading-[var(--typography-body-default-intense-line-height)] text-[color:var(--text\/between,#d1cedc)] text-[length:var(--typography-body-default-intense-font-size)] whitespace-nowrap">Winning T-Shirts!</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[var(--typography-body-default-line-height)] text-[color:var(--text\/secondary,#908e99)] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    THANK YOU Mauvis and Grace @ Sogni.AI! I really learned a lot from Mauvis especially sharing his personal story and motivation to start Sogni.AI!
                  </p>
                  <img src={imgSogniai} className="aspect-[2/1] rounded-[var(--radius-component-image)] object-cover w-[255px] bg-[#242326] mt-[16px]" alt="Sogni.AI" />
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-[#242326] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['SF_Pro_Display',sans-serif] leading-[2.05] text-[color:var(--text\/tertiary,#585564)] text-[14px] w-[10px] shrink-0">3</p>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <p className="font-['SF_Pro_Display',sans-serif] font-[var(--typography-body-default-intense-font-weight)] leading-[var(--typography-body-default-intense-line-height)] text-[color:var(--text\/between,#d1cedc)] text-[length:var(--typography-body-default-intense-font-size)] whitespace-nowrap">Side questing music beats with Strudel</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[var(--typography-body-default-line-height)] text-[color:var(--text\/secondary,#908e99)] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
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
