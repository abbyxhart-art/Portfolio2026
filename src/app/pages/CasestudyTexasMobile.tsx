import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import CasestudyNavigation from "../components/CasestudyNavigation";
import UpNext from "../components/UpNext";
import CasestudyMiniMenu from "../components/CasestudyMiniMenu";

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

const imgGlassCheckpoint = "https://www.figma.com/api/mcp/asset/ab781397-5a0f-4eb4-adaa-52b6b1aaf9fb";
const texasIdVideo = new URL("../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4", import.meta.url).href;
const cardLayersVideo = new URL("../../assets/project/texasid/cardlayers.mov", import.meta.url).href;
const cardFlipVideo = new URL("../../assets/project/texasid/cardflip.mov", import.meta.url).href;
const fullIdVideo = new URL("../../assets/project/texasid/fullid.mp4", import.meta.url).href;
const ageIdVideo = new URL("../../assets/project/texasid/ageid.mp4", import.meta.url).href;
const fullCodeVideo = new URL("../../assets/project/texasid/fullcode.mp4", import.meta.url).href;
const ageCodeVideo = new URL("../../assets/project/texasid/agecode.mp4", import.meta.url).href;
import imgCardTypes from "../../assets/project/texasid/cardtypes.png";
import imgIterationExploration from "../../assets/project/texasid/iterationexploration.png";

const TEXAS_SECTIONS = [
  { id: "cs-overview",   label: "Overview"        },
  { id: "cs-card",       label: "The Card"        },
  { id: "cs-system",     label: "System + Color"  },
  { id: "cs-reflection", label: "Reflection"      },
];

export default function CasestudyTexasMobile() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
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

      <div className="flex flex-col items-center px-[20vw] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[110px] items-center w-full">

          {/* ── Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[75px] items-start w-full">

            {/* Hero */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] w-full overflow-hidden"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            >
              <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={texasIdVideo} />
            </motion.div>
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.2] text-[color:var(--text\/secondary,#908e99)] text-[14px]">
              Prototype Full Flow
            </p>

            {/* Title + metadata */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">
              <div className="border-b border-[#585564] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px] w-full">
                  Texas ID
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[color:var(--text\/secondary,#908e99)] text-[20px] w-full">
                  Creating a dynamic, safe alternative to traditional physical IDs
                </p>
              </div>

              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline */}
                <div className="flex flex-col gap-[32px] items-start shrink-0 w-[93px]">
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">Tools</p>
                    <p className="leading-none text-[color:var(--text\/primary,#faf9ff)] text-[17px]">Figma</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">Timeline</p>
                    <div className="text-[color:var(--text\/primary,#faf9ff)] text-[17px]">
                      <p className="leading-none mb-[12px]">4 weeks,</p>
                      <p className="leading-none">Spring 2024</p>
                    </div>
                  </div>
                </div>

                {/* Right: Problem */}
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">Problem</p>
                  <div className="font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[17px] w-full">
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

          {/* ── Tailored design decisions ── */}
          <div id="cs-card" className="flex flex-col gap-[64px] w-full">

            {/* Checkpoint: Tailored design decisions */}
            <div className="flex gap-[16px] items-center w-full relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
              <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
                Tailored design decisions
              </p>
            </div>

            {/* Row 1: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0 text-[color:var(--text\/primary,#faf9ff)]">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[24px] w-full">Full age view for the law</p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">This design prioritizes the user's name, ID number, and age, which are <span style={{ textShadow: "0px 0px 20px white", color: "#faf9ff" }}>key details identified as the primary focus for law enforcement.</span> It's also best for users who need all their information at their fingertips.</p>
                  <p>Information is structured into four categories: User, Address, Vehicle, and Anatomy, ensuring clarity and accessibility.</p>
                </div>
              </div>
              <PhoneVideo src={fullIdVideo} />
            </div>

            {/* Row 2: phone left, text right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <PhoneVideo src={ageIdVideo} />
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0 text-[color:var(--text\/primary,#faf9ff)]">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[24px] w-full">Age only for small checks</p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  <p className="mb-[16px]">Tons of people cover their ID information when just getting age checked; this enables users to prioritize age, hiding any private information that's not necessary.</p>
                  <p>A verifier would be able to tap back to see more information if they needed it.</p>
                </div>
              </div>
            </div>

            {/* Row 3: text left, phone right */}
            <div className="flex gap-[50px] items-center justify-center w-full">
              <div className="flex flex-col gap-[25px] items-start w-[380px] shrink-0 text-[color:var(--text\/primary,#faf9ff)]">
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.25] text-[24px] w-full">Instant access and verification</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[17px] text-[color:var(--text\/secondary,#908e99)] w-full">
                  I integrated a QR code scan option, easily accessible from the navigation. The information that will be shared is shown on the ticket.
                </p>
              </div>
              <PhoneVideo src={ageCodeVideo} />
            </div>

          </div>

          {/* ── Checkpoint: The card ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
              The card
            </p>
          </div>

          {/* ── Card sections ── */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px] w-full">
                  Card design features 3 versions based upon age
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[16px] tracking-[-0.32px] w-full">
                  I explored color and texture as a way to instantly verify age, instead of the friction of searching for a birthday.
                </p>
              </div>

              {/* Full ID vs Age ID */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">What's the difference?</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px]">Full ID vs Age ID</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[17px]">
                    A full ID is the basic ID. In order to showcase age only, the user flips the card to hide private information and showcase their most basic information for store clerks, hiding more personal information like address or blood type.
                  </p>
                </div>
                <img src={imgCardTypes} alt="" className="w-full rounded-[8px] object-cover" />
              </div>

              {/* Two-column video layout */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <video autoPlay loop muted playsInline className="w-full aspect-square rounded-[8px] object-cover" src={cardLayersVideo} />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[14px]">
                    Split layers of color, texture, and information
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[24px] items-start min-w-0">
                  <video autoPlay loop muted playsInline className="w-full aspect-square rounded-[8px] object-cover" src={cardFlipVideo} />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[color:var(--text\/secondary,#908e99)] text-[14px]">
                    With a simple tap can users change the information shown
                  </p>
                </div>
              </div>


              {/* If at first you don't succeed */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">Mobile Iterations</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px]">If at first you don't succeed</p>
                </div>
                <img src={imgIterationExploration} alt="" className="w-full rounded-[8px] object-cover" />
              </div>
            </div>
          </div>

          {/* ── Checkpoint: Texas by Texas ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
              Texas by Texas
            </p>
          </div>

          {/* ── TxT section ── */}
          <div className="flex flex-col gap-[31px] items-start w-full">
            <div className="bg-[#d9d9d9] shrink-0 size-[82px] rounded-[4px]" />
            <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[17px] w-full">
              <p className="mb-[16px]">Texas has a mobile app called Texas by Texas (or TxT).</p>
              <p>TxT can renew licenses, as well as order a lost or stolen card, but TxT does not replace physical identification. The goal became to create a newer, solid brand that builds off the old TxT.</p>
            </div>
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">State Rollout</p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px] w-full">
                Why stop at driver's licenses? The app could become a central hub for all gov issued IDs, cards, renewals, DMV locations... all in one place.
              </p>
            </div>
          </div>

          {/* ── Checkpoint: System + Color ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[435px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
              System + Color
            </p>
          </div>

          {/* ── System + Color sections ── */}
          <div id="cs-system" className="flex flex-col gap-[40px] w-full">
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px] w-full">
                  Locked and loaded for Figma variables
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[400] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[16px] tracking-[-0.32px] w-full">
                  Taking TxT's influence, I created a slightly softer blue / orange palette.
                </p>
              </div>

              {[
                { tag: "Color System" },
                { tag: "Documentation for dynamic components" },
              ].map(({ tag }, i) => (
                <div key={i} className="flex flex-col gap-[24px] items-start w-full">
                  <div className="aspect-[2/1] bg-[#1c1b1f] rounded-[8px] w-full" />
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">{tag}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Checkpoint: Final UI + design decisions ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[435px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
              Final UI + design decisions
            </p>
          </div>

          <div className="flex flex-col gap-[40px] items-start w-full">
            {[
              { tag: "Documentation for dynamic components" },
              { tag: "Documentation for dynamic components" },
            ].map(({ tag }, i) => (
              <div key={i} className="flex flex-col gap-[24px] items-start w-full">
                <div className="aspect-[2/1] bg-[#1c1b1f] rounded-[8px] w-full" />
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">{tag}</p>
              </div>
            ))}
          </div>

          {/* ── Checkpoint: Reflection ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[32px] relative">
              Reflection
            </p>
          </div>

          {/* ── Reflection ── */}
          <div id="cs-reflection" className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[16px]">The overall takeaway</p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[24px]">Iterate</p>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[17px]">Don't force things to work</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[17px] w-full">
                  {`If it hasn't worked already there's probably something wrong with the fundamental concept... try something else, turn things around. If (and only if) that doesn't work, return to the original problem/idea.`}
                </p>
              </div>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[17px]">Peer Eval</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[17px] w-full">
                  I reformulated my design after Peer Eval, and the final product is cleaner. However, I want to continue fixing this project until it's something that looks more professional and better for users! I don't think this story is over.
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="texas-mobile" />

        </div>
      </div>
    </div>
  );
}
