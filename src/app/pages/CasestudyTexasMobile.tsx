import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, useScroll, useTransform, useMotionValue } from "@/lib/motion";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";
import VideoControls from "../components/VideoControls";


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
          <span className={`font-['Inter_Tight',sans-serif] leading-none text-[12px] md:text-[14px] transition-colors ${active === "after" ? "font-medium text-[#faf9ff]" : "font-regular text-[#908e99]"}`}>After</span>
        </button>
        <button onClick={() => onChange("before")} className="flex h-[32px] w-[64px] items-center justify-center rounded-[24px]">
          <span className={`font-['Inter_Tight',sans-serif] leading-none text-[12px] md:text-[14px] transition-colors ${active === "before" ? "font-medium text-[#faf9ff]" : "font-regular text-[#908e99]"}`}>Before</span>
        </button>
      </div>
    </div>
  );
}

function PhoneVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative shrink-0" style={{ width: 242, aspectRatio: "242/526" }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        className="w-full h-full object-cover"
        style={{ mixBlendMode: "screen" }}
        src={src}
      />
      <VideoControls videoRef={videoRef} />
    </div>
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
import imgCursor02 from "../../assets/icons/cursor-02.svg";

const TEXAS_SECTIONS = [
  { id: "cs-card",         label: "Highlights"            },
  { id: "cs-explorations", label: "Explorations"          },
  { id: "cs-component",    label: "Component Redesign"    },
  { id: "cs-final",        label: "Final Designs"         },
  { id: "cs-reflection",   label: "Reflection"            },
];

export default function CasestudyTexasMobile() {
  const shouldAnimate = useNavEntrance();
  const [peerView, setPeerView] = useState<"after" | "before">("after");

  const { scrollY } = useScroll();
  const heroCompleted = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroExtraHeight = useMotionValue(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const cardLayersVideoRef = useRef<HTMLVideoElement>(null);
  const cardFlipVideoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const measure = () => {
      if (heroRef.current) heroExtraHeight.set(heroRef.current.offsetHeight * 0.35);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [heroExtraHeight]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <SectionNavigation sections={TEXAS_SECTIONS} title="Texas Mobile Casestudy Navigation" />

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[24vw] pt-[20vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[var(--gap-section)] items-center w-full">

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
                  Texas Mobile
                </p>
                <div className="font-regular text-[#908e99] text-[length:var(--typography-body-default-font-size)] w-full">
                  <p className="leading-[1.65] mb-[16px]">Although mobile IDs are becoming more common, they remain largely static despite serving a variety of identity and privacy needs.</p>
                  <p className="leading-[1.65]">This concept explores a more flexible approach to digital IDs, allowing information to be displayed dynamically, giving users greater control over what they share.</p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-[32px] items-start justify-center w-full md:w-[323px] shrink-0 font-regular text-[length:var(--typography-body-default-font-size)]">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="leading-[1.65] font-medium text-[#faf9ff]">Scope</p>
                  <div className="text-[#908e99] leading-none">
                    <p className="mb-[12px]">Competetive Analysis</p>
                    <p className="mb-[12px]">User Research</p>
                    <p>Prototypes</p>
                  </div>
                </div>
                <p className="text-[#908e99] leading-none">2024</p>
              </div>
            </motion.div>

            {/* Hero */}
            <div className="flex flex-col gap-[4px] w-full">
              <motion.div
                ref={heroRef}
                className="aspect-[2/1] w-full overflow-hidden relative"
                style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
              >
                <video ref={heroVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={texasIdVideo} />
                <VideoControls videoRef={heroVideoRef} />
              </motion.div>
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.2] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                Prototype Interaction
              </p>
            </div>

          </div>

          {/* ── Highlights ── */}
          <motion.div id="cs-card" style={{ y: contentY }} className="flex flex-col gap-[64px] w-full">

            <CasestudySectionHeader
              eyebrow="Highlights"
              headline="Tailored design decisions"
              subtitle="Designing for the wallet, the wrist, and the law"
              divider={false}
            />

            {/* Texas by Texas */}
            <div className="flex flex-col gap-[31px] items-start w-full">
              <img src={imgTxt} alt="Texas by Texas" className="shrink-0 size-[82px] rounded-[var(--radius-component-image)] object-cover" />
              <div className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                <p className="mb-[16px]">Texas has a mobile app called Texas by Texas (or TxT).</p>
                <p>TxT can renew licenses, as well as order a lost or stolen card, but TxT does not replace physical identification. The goal became to create a newer, solid brand that builds off the old TxT.</p>
              </div>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">An opportunity</p>
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  Why stop at driver's licenses? The app could become a central hub for all gov issued IDs, cards, renewals, DMV locations... all in one place.
                </p>
              </div>
            </div>

            {/* Row 1: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">Full age view for the law</p>
                <div className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">This design prioritizes the user's name, ID number, and age, which are key details identified as the primary focus for law enforcement. It's also best for users who need all their information at their fingertips.</p>
                  <p>Information is structured into four categories: User, Address, Vehicle, and Anatomy, ensuring clarity and accessibility.</p>
                </div>
              </div>
              <PhoneVideo src={fullIdVideo} />
            </div>

            {/* Row 2: phone left, text right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <PhoneVideo src={ageIdVideo} />
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">Age only for small checks</p>
                <div className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">Tons of people cover their ID information when just getting age checked; this enables users to prioritize age, hiding any private information that's not necessary.</p>
                  <p>A verifier would be able to tap back to see more information if they needed it.</p>
                </div>
              </div>
            </div>

            {/* Row 3: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.25] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">Instant access and verification</p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[14px] md:text-[length:var(--typography-body-default-font-size)] text-[color:var(--text\/secondary,#908e99)] w-full">
                  I integrated a QR code scan option, easily accessible from the navigation. The information that will be shared is shown on the ticket.
                </p>
              </div>
              <PhoneVideo src={ageCodeVideo} />
            </div>

          </motion.div>

          {/* ── Checkpoint: Wireframes ── */}
          <CasestudySectionHeader
            id="cs-explorations"
            eyebrow="Explorations"
            headline="Explorations and Decisions"
            subtitle="Creating additional pages to better TexID"
            divider={false}
          />

          {/* ── Wireframes content ── */}
          <div className="flex flex-col gap-[48px] w-full">
            {/* Before Peer Eval image */}
            <div className="flex flex-col items-start w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  Creating additional pages to better TexID
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  For peer evaluations, I created a working prototype.
                </p>
              </div>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <img src={imgPeer1} alt="" className="w-full rounded-[var(--radius-component-image)] object-cover border border-[#302f34]" />
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Iteration #4 was submitted for review and testing
                </p>
              </div>
            </div>

            <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
              Comments from 4/14
            </p>
            <div className="flex flex-col gap-[28px] w-full">

              {/* Bubble 1 */}
              <motion.div
                className="self-start ml-[20%] relative flex items-start bg-[rgba(88,85,100,0.15)] border border-[rgba(88,85,100,0.15)] pl-[16px] pr-[24px] py-[10px] rounded-bl-[18px] rounded-br-[40px] rounded-tr-[40px] max-w-[480px]"
                animate={{ x: [0, 9, -5, 14, -3, 7, -11, 4, 0], y: [0, -7, 11, 3, -10, 8, 2, -5, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1] }}
              >
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
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
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
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
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  I was confused why details like eye color were still visible on the age-only screen.{" "}
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
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  I really enjoyed the dynamic color switching by age group — clever design choice. However,{" "}
                  how to switch between age-only and full view wasn't immediately obvious.
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
            divider={false}
          />

          {/* ── Color, illustration, and dynamic components ── */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">

              <div className="flex flex-col items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  Color, illustration, and dynamic components
                </p>
              </div>

              {/* Two square images */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent1} alt="" className="aspect-square rounded-[var(--radius-component-image)] w-full object-cover border border-[#302f34]" />
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    Illustrations for the home page
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent2} alt="" className="aspect-square rounded-[var(--radius-component-image)] w-full object-cover border border-[#302f34]" />
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    A dynamic navigation to only show buttons when necessary
                  </p>
                </div>
              </div>

              {/* Two square images — component 4 + 5 */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent4} alt="" className="aspect-square rounded-[var(--radius-component-image)] w-full object-cover border border-[#302f34]" />
                </div>
                <div className="flex flex-1 flex-col gap-[4px] items-start min-w-0">
                  <img src={imgComponent5} alt="" className="aspect-square rounded-[var(--radius-component-image)] w-full object-cover border border-[#302f34]" />
                </div>
              </div>

              {/* Full-width image */}
              <div className="flex flex-col gap-[4px] items-start w-full">
                <img src={imgComponent3} alt="" className="aspect-[2/1] rounded-[var(--radius-component-image)] w-full object-cover" />
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  Color System (updated from TxT)
                </p>
              </div>

            </div>
          </div>

          {/* ── Card sections ── */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                  Card — An age reactive design
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  I explored color and texture as a way to instantly verify age, instead of the friction of searching for a birthday.
                </p>
              </div>

              {/* Full ID vs Age ID */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">What's the difference?</p>
                  <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">Full ID vs Age ID</p>
                  <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">
                    A full ID is the basic ID. In order to showcase age only, the user flips the card to hide private information and showcase their most basic information for store clerks, hiding more personal information like address or blood type.
                  </p>
                </div>
                <img src={imgCardTypes} alt="" className="w-full rounded-[var(--radius-component-image)] object-cover" />
              </div>

              {/* Two-column video layout */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <div className="relative w-full aspect-square rounded-[var(--radius-component-image)] overflow-hidden">
                    <video ref={cardLayersVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={cardLayersVideo} />
                    <VideoControls videoRef={cardLayersVideoRef} />
                  </div>
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    Split layers of color, texture, and information
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <div className="relative w-full aspect-square rounded-[var(--radius-component-image)] overflow-hidden">
                    <video ref={cardFlipVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={cardFlipVideo} />
                    <VideoControls videoRef={cardFlipVideoRef} />
                  </div>
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                    With a simple tap can users change the information shown
                  </p>
                </div>
              </div>

              {/* If at first you don't succeed */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Mobile Iterations</p>
                  <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">If at first you don't succeed</p>
                </div>
                <img src={imgIterationExploration} alt="" className="w-full rounded-[var(--radius-component-image)] object-cover" />
              </div>
            </div>
          </div>


          {/* ── Checkpoint: Final Designs ── */}
          <CasestudySectionHeader
            eyebrow="Final Designs"
            headline="Adding more breathing room and intention"
            subtitle="After peer evaluations, simplifying to what people really needed"
            divider={false}
          />

          {/* ── Final Designs content ── */}
          <div id="cs-final" className="flex flex-col gap-[48px] w-full">
            <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px] w-full">
                Adding more breathing room and intention
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                After peer evaluations, I focused on simplifying components and pages to their most basic form, reflecting what people really needed and what was intuitive.
              </p>
            </div>
            <div className="flex flex-col gap-[34px] items-end w-full">
              <div className="flex gap-[25px] items-center">
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
                  In case you forgot what pre-peer eval was
                </p>
                <BeforeAfterToggle active={peerView} onChange={setPeerView} />
              </div>
              <div className="flex flex-col gap-[24px] w-full">
                <img
                  src={peerView === "after" ? imgPeer2 : imgPeer1}
                  alt=""
                  className="w-full rounded-[var(--radius-component-image)] object-cover border border-[#302f34]"
                />
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px]">
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
            divider={false}
          />

          {/* ── Reflection ── */}
          <div id="cs-reflection" className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">The overall takeaway</p>
              <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[length:var(--typography-body-default-font-size)] md:text-[24px]">Iterate</p>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Don't force things to work</p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
                  {`If it hasn't worked already there's probably something wrong with the fundamental concept... try something else, turn things around. If (and only if) that doesn't work, return to the original problem/idea.`}
                </p>
              </div>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-regular leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-medium leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[length:var(--typography-body-default-font-size)]">Peer Eval</p>
                <p className="font-['Inter_Tight',sans-serif] font-regular leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[length:var(--typography-body-default-font-size)] w-full">
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
