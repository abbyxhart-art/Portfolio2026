import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/layout/HomeButton";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import CasestudyMiniMenu from "../components/casestudy/CasestudyMiniMenu";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";


function BeforeAfterToggle({ active, onChange }: { active: "after" | "before"; onChange: (v: "after" | "before") => void }) {
  return (
    <div className="relative bg-[rgba(88,85,100,0.2)] border border-[#302f34] h-[48px] p-[8px] rounded-[100px] shrink-0 w-[154px]">
      <div
        className="absolute top-[8px] h-[32px] w-[64px] rounded-[24px] bg-[rgba(144,142,153,0.2)] transition-[left] duration-300 ease-in-out"
        style={{ left: active === "after" ? "8px" : "82px" }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[39px] h-[2px] w-[48px] bg-[#d9d9d9] rounded-bl-[4px] rounded-br-[4px]" />
      </div>
      <div className="absolute left-[-1px] top-[-1px] flex gap-[10px] p-[8px]">
        <button onClick={() => onChange("after")} className="flex h-[32px] w-[64px] items-center justify-center rounded-[24px]">
          <span className={`font-['Inter_Tight',sans-serif] font-[300] leading-none text-[12px] md:text-[14px] transition-colors ${active === "after" ? "text-[#faf9ff]" : "text-[#908e99]"}`}>After</span>
        </button>
        <button onClick={() => onChange("before")} className="flex h-[32px] w-[64px] items-center justify-center rounded-[24px]">
          <span className={`font-['Inter_Tight',sans-serif] font-[300] leading-none text-[12px] md:text-[14px] transition-colors ${active === "before" ? "text-[#faf9ff]" : "text-[#908e99]"}`}>Before</span>
        </button>
      </div>
    </div>
  );
}

function PhoneVideo({ src }: { src: string }) {
  return (
    <video
      autoPlay loop muted playsInline
      className="shrink-0 w-[242px] object-cover"
      style={{ aspectRatio: "242/526", mixBlendMode: "screen" }}
      src={src}
    />
  );
}

const texasIdVideo = new URL("../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4", import.meta.url).href;
const cardLayersVideo = new URL("../../assets/project/texasid/cardlayers.mov", import.meta.url).href;
const cardFlipVideo = new URL("../../assets/project/texasid/cardflip.mov", import.meta.url).href;
const fullIdVideo = new URL("../../assets/project/texasid/fullid.mp4", import.meta.url).href;
const ageIdVideo = new URL("../../assets/project/texasid/ageid.mp4", import.meta.url).href;
const fullCodeVideo = new URL("../../assets/project/texasid/fullcode.mp4", import.meta.url).href;
const ageCodeVideo = new URL("../../assets/project/texasid/agecode.mp4", import.meta.url).href;
import imgCardTypes from "../../assets/project/texasid/cardtypes.png";
import imgIterationExploration from "../../assets/project/texasid/iterationexploration.png";
import imgTxt from "../../assets/project/texasid/txt.png";

import imgPeer1 from "../../assets/project/texasid/peer_1.png";
import imgPeer2 from "../../assets/project/texasid/peer_2.png";
import imgComponent1 from "../../assets/project/texasid/component_1.png";
import imgComponent2 from "../../assets/project/texasid/component_2.png";
import imgComponent3 from "../../assets/project/texasid/component_3.png";
import imgComponent4 from "../../assets/project/texasid/component_4.png";
import imgComponent5 from "../../assets/project/texasid/component_5.png";
import imgCursor02 from "../../assets/cursor-02.svg";

const TEXAS_SECTIONS = [
  { id: "cs-overview",     label: "Overview"              },
  { id: "cs-card",         label: "Highlights"            },
  { id: "cs-explorations", label: "Explorations"          },
  { id: "cs-component",    label: "Component Redesign"    },
  { id: "cs-final",        label: "Final Designs"         },
  { id: "cs-reflection",   label: "Reflection"            },
];

export default function CasestudyTexasMobile() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [peerView, setPeerView] = useState<"after" | "before">("after");

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

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 z-0 h-[600px] pointer-events-none"
        style={{ top: 0, background: "linear-gradient(to top, rgba(22,22,23,0.2), #afa4d8)", opacity: 0.5 }}
      />
      <HomeButton />
      <CasestudyNavigation title="Texas Mobile" />
      <CasestudyMiniMenu sections={TEXAS_SECTIONS} />

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(23,23,23,0.98) 0%, rgba(23,23,23,0.85) 25%, rgba(23,23,23,0.35) 55%, rgba(23,23,23,0.05) 80%, rgba(23,23,23,0) 100%)",
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
        <div className="flex flex-col gap-[110px] items-center w-full">

          {/* ── Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[75px] items-start w-full">

            {/* Hero */}
            <div className="flex flex-col gap-[4px] w-full">
              <motion.div
                ref={heroRef}
                className="aspect-[2/1] w-full overflow-hidden"
                style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
              >
                <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={texasIdVideo} />
              </motion.div>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.2] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                Prototype Interaction
              </p>
            </div>

            {/* Title + metadata */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">
              <div className="border-b border-[#585564] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Texas ID
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[color:var(--text\/secondary,#908e99)] text-[16px] md:text-[20px] w-full">
                  Creating a dynamic, safe alternative to traditional physical IDs
                </p>
              </div>

              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline */}
                <div className="flex flex-col gap-[32px] items-start shrink-0 w-[93px]">
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Tools</p>
                    <p className="leading-none text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">Figma</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Timeline</p>
                    <div className="text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">
                      <p className="leading-none mb-[12px]">4 weeks,</p>
                      <p className="leading-none">Spring 2024</p>
                    </div>
                  </div>
                </div>

                {/* Right: Problem */}
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Problem</p>
                  <div className="font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px] text-[color:var(--text\/primary,#faf9ff)]">
                      Physical IDs are static, despite being used across many different contexts with varying informational needs.
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">
                      A user may not want to share their address or additional personal details when purchasing from a store clerk, while that same information may be necessary for a security officer.
                    </p>
                    <p className="font-['Inter_Tight',sans-serif]">
                      As the world shifts toward mobile experiences, traditionally physical systems are becoming digital. How can digital licenses be modernized to balance privacy, security, and adaptability? How can the interface feel trustworthy while also allowing clerks or officers to instantly verify authenticity?
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Highlights ── */}
          <div id="cs-card" className="flex flex-col gap-[64px] w-full">

            <CasestudySectionHeader
              eyebrow="Highlights"
              headline="Tailored design decisions"
              subtitle="Designing for the wallet, the wrist, and the law"
            />

            {/* Row 1: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">Full age view for the law</p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[14px] md:text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">This design prioritizes the user's name, ID number, and age, which are <span style={{ textShadow: "0px 0px 20px white", color: "#faf9ff" }}>key details identified as the primary focus for law enforcement.</span> It's also best for users who need all their information at their fingertips.</p>
                  <p>Information is structured into four categories: User, Address, Vehicle, and Anatomy, ensuring clarity and accessibility.</p>
                </div>
              </div>
              <PhoneVideo src={fullIdVideo} />
            </div>

            {/* Row 2: phone left, text right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <PhoneVideo src={ageIdVideo} />
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">Age only for small checks</p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[14px] md:text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">Tons of people cover their ID information when just getting age checked; this enables users to prioritize age, hiding any private information that's not necessary.</p>
                  <p>A verifier would be able to tap back to see more information if they needed it.</p>
                </div>
              </div>
            </div>

            {/* Row 3: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">Instant access and verification</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[14px] md:text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  I integrated a QR code scan option, easily accessible from the navigation. The information that will be shared is shown on the ticket.
                </p>
              </div>
              <PhoneVideo src={ageCodeVideo} />
            </div>

            {/* Texas by Texas */}
            <div className="flex flex-col gap-[31px] items-start w-full">
              <img src={imgTxt} alt="Texas by Texas" className="shrink-0 size-[82px] rounded-[4px] object-cover" />
              <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                <p className="mb-[16px]">Texas has a mobile app called Texas by Texas (or TxT).</p>
                <p>TxT can renew licenses, as well as order a lost or stolen card, but TxT does not replace physical identification. The goal became to <span style={{ color: "#faf9ff", textShadow: "0px 0px 20px white" }}>create a newer, solid brand that builds off the old TxT.</span></p>
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">An opportunity</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Why stop at driver's licenses? The app could become a central hub for all gov issued IDs, cards, renewals, DMV locations... all in one place.
                </p>
              </div>
            </div>

          </div>

          {/* ── Checkpoint: Wireframes ── */}
          <CasestudySectionHeader
            id="cs-explorations"
            eyebrow="Explorations"
            headline="Explorations and Decisions"
            subtitle="Creating additional pages to better TexID"
          />

          {/* ── Wireframes content ── */}
          <div className="flex flex-col gap-[48px] w-full">
            {/* Before Peer Eval image */}
            <div className="flex flex-col items-start w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Creating additional pages to better TexID
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                  For peer evaluations, I created a working prototype.
                </p>
              </div>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <img src={imgPeer1} alt="" className="w-full rounded-[8px] object-cover border border-[#302f34]" />
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Iteration #4 was submitted for review and testing
                </p>
              </div>
            </div>

            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
              Comments from 4/14
            </p>
            <div className="flex flex-col gap-[28px] w-full">

              {/* Bubble 1 */}
              <motion.div
                className="self-start ml-[20%] relative flex items-start bg-[rgba(88,85,100,0.15)] border border-[rgba(88,85,100,0.15)] pl-[16px] pr-[24px] py-[10px] rounded-bl-[18px] rounded-br-[40px] rounded-tr-[40px] max-w-[480px]"
                animate={{ x: [0, 9, -5, 14, -3, 7, -11, 4, 0], y: [0, -7, 11, 3, -10, 8, 2, -5, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }}
              >
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  The microanimations make it much more engaging — the transitions feel polished and intentional. Including other ID types, health info, and office locations on the home page is a great touch.
                </p>
                <div className="absolute left-[-18px] top-[-20px] size-[24px] pointer-events-none">
                  <img src={imgCursor02} alt="" width="24" height="24" />
                </div>
              </motion.div>

              {/* Bubble 2 */}
              <motion.div
                className="self-start ml-[50%] relative flex items-start bg-[rgba(88,85,100,0.15)] border border-[rgba(88,85,100,0.15)] pl-[16px] pr-[24px] py-[10px] rounded-bl-[18px] rounded-br-[40px] rounded-tr-[40px] max-w-[440px]"
                animate={{ x: [0, -8, 12, -4, 10, -6, 3, -11, 0], y: [0, 9, -4, 13, -2, 7, -9, 3, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }}
              >
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Very well made and professional. The separation of content is clear and the visual hierarchy guides the eye naturally. Excellent overall flow.
                </p>
                <div className="absolute left-[-18px] top-[-20px] size-[24px] pointer-events-none">
                  <img src={imgCursor02} alt="" width="24" height="24" />
                </div>
              </motion.div>

              {/* Bubble 3 */}
              <motion.div
                className="self-start ml-[10%] relative flex items-start bg-[rgba(88,85,100,0.15)] border border-[rgba(88,85,100,0.15)] pl-[16px] pr-[24px] py-[10px] rounded-bl-[18px] rounded-br-[40px] rounded-tr-[40px] max-w-[480px]"
                animate={{ x: [0, 11, -7, 5, -13, 8, -3, 10, 0], y: [0, -9, 6, -14, 4, -7, 11, -2, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }}
              >
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  <span style={{ color: "#faf9ff", textShadow: "0px 0px 20px white" }}>I was confused why details like eye color were still visible on the age-only screen.</span>{" "}
                  It might be cleaner to either show everything or nothing beyond the core age confirmation.
                </p>
                <div className="absolute left-[-18px] top-[-20px] size-[24px] pointer-events-none">
                  <img src={imgCursor02} alt="" width="24" height="24" />
                </div>
              </motion.div>

              {/* Bubble 4 */}
              <motion.div
                className="self-start ml-[40%] relative flex items-start bg-[rgba(88,85,100,0.15)] border border-[rgba(88,85,100,0.15)] pl-[16px] pr-[24px] py-[10px] rounded-bl-[18px] rounded-br-[40px] rounded-tr-[40px] max-w-[440px]"
                animate={{ x: [0, -6, 13, -9, 5, -12, 7, -3, 0], y: [0, 8, -11, 4, -7, 12, -5, 9, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 12, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }}
              >
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  I really enjoyed the dynamic color switching by age group — clever design choice. However,{" "}
                  <span style={{ color: "#faf9ff", textShadow: "0px 0px 20px white" }}>how to switch between age-only and full view wasn't immediately obvious.</span>
                </p>
                <div className="absolute left-[-18px] top-[-20px] size-[24px] pointer-events-none">
                  <img src={imgCursor02} alt="" width="24" height="24" />
                </div>
              </motion.div>

            </div>


          </div>

          {/* ── Checkpoint: The card ── */}
          <CasestudySectionHeader
            id="cs-component"
            eyebrow="Component Redesign"
            headline="Color, illustration, and dynamic components"
            subtitle="Building a system that feels native to Texas"
          />

          {/* ── Color, illustration, and dynamic components ── */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">

              <div className="flex flex-col items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Color, illustration, and dynamic components
                </p>
              </div>

              {/* Two square images */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent1} alt="" className="aspect-square rounded-[8px] w-full object-cover border border-[#302f34]" />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    Illustrations for the home page
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent2} alt="" className="aspect-square rounded-[8px] w-full object-cover border border-[#302f34]" />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    A dynamic navigation to only show buttons when necessary
                  </p>
                </div>
              </div>

              {/* Two square images — component 4 + 5 */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent4} alt="" className="aspect-square rounded-[8px] w-full object-cover border border-[#302f34]" />
                </div>
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent5} alt="" className="aspect-square rounded-[8px] w-full object-cover border border-[#302f34]" />
                </div>
              </div>

              {/* Full-width image */}
              <div className="flex flex-col gap-[4px] items-start w-full">
                <img src={imgComponent3} alt="" className="aspect-[2/1] rounded-[8px] w-full object-cover" />
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Color System (updated from TxT)
                </p>
              </div>

            </div>
          </div>

          {/* ── Card sections ── */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Card — An age reactive design
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                  I explored color and texture as a way to instantly verify age, instead of the friction of searching for a birthday.
                </p>
              </div>

              {/* Full ID vs Age ID */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">What's the difference?</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">Full ID vs Age ID</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">
                    A full ID is the basic ID. In order to showcase age only, the user flips the card to hide private information and showcase their most basic information for store clerks, hiding more personal information like address or blood type.
                  </p>
                </div>
                <img src={imgCardTypes} alt="" className="w-full rounded-[8px] object-cover" />
              </div>

              {/* Two-column video layout */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <video autoPlay loop muted playsInline className="w-full aspect-square rounded-[8px] object-cover" src={cardLayersVideo} />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    Split layers of color, texture, and information
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <video autoPlay loop muted playsInline className="w-full aspect-square rounded-[8px] object-cover" src={cardFlipVideo} />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    With a simple tap can users change the information shown
                  </p>
                </div>
              </div>

              {/* If at first you don't succeed */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Mobile Iterations</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">If at first you don't succeed</p>
                </div>
                <img src={imgIterationExploration} alt="" className="w-full rounded-[8px] object-cover" />
              </div>
            </div>
          </div>


          {/* ── Checkpoint: Final Designs ── */}
          <CasestudySectionHeader
            eyebrow="Final Designs"
            headline="Adding more breathing room and intention"
            subtitle="After peer evaluations, simplifying to what people really needed"
          />

          {/* ── Final Designs content ── */}
          <div id="cs-final" className="flex flex-col gap-[48px] w-full">
            <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                Adding more breathing room and intention
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                After peer evaluations, I focused on simplifying components and pages to their most basic form, reflecting what people really needed and what was intuitive.
              </p>
            </div>
            <div className="flex flex-col gap-[34px] items-end w-full">
              <div className="flex gap-[25px] items-center">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  In case you forgot what pre-peer eval was
                </p>
                <BeforeAfterToggle active={peerView} onChange={setPeerView} />
              </div>
              <div className="flex flex-col gap-[24px] w-full">
                <img
                  src={peerView === "after" ? imgPeer2 : imgPeer1}
                  alt=""
                  className="w-full rounded-[8px] object-cover border border-[#302f34]"
                />
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Iteration #5
                </p>
              </div>
            </div>
          </div>

          {/* ── Checkpoint: Reflection ── */}
          <CasestudySectionHeader
            eyebrow="Reflection"
            headline="Iterate"
            subtitle="Learning through doing and redoing"
          />

          {/* ── Reflection ── */}
          <div id="cs-reflection" className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">The overall takeaway</p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">Iterate</p>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">Don't force things to work</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                  {`If it hasn't worked already there's probably something wrong with the fundamental concept... try something else, turn things around. If (and only if) that doesn't work, return to the original problem/idea.`}
                </p>
              </div>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">Peer Eval</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[17px] w-full">
                 Feedback was amazing and I was able to find better solutions!
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="texas-mobile" />

        </div>
      </motion.div>
    </div>
  );
}
