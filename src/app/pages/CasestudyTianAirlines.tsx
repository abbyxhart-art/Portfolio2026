import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import CasestudyNavigation from "../components/CasestudyNavigation";
import UpNext from "../components/UpNext";
import CasestudyMiniMenu from "../components/CasestudyMiniMenu";
import imgGlassCheckpoint from "../../assets/project/gentlemonster/glass_checkpoint.svg";

const TIAN_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-design-system", label: "Design System" },
  { id: "cs-flight-planning", label: "Flight Planning" },
  { id: "cs-final-designs", label: "Prototype" },
];
const imgTokenSystem = new URL("../../assets/project/tianair/Tian_TokenSystem.png", import.meta.url).href;
const imgComponentSystem = new URL("../../assets/project/tianair/Tian_ComponentSystem.png", import.meta.url).href;
const imgBradFrostTweet = new URL("../../assets/project/tianair/bradfrost_tweet.png", import.meta.url).href;
const imgMilitaryTime = new URL("../../assets/project/tianair/tian_militarytime.png", import.meta.url).href;
const imgVariables = new URL("../../assets/project/tianair/tian_variables.png", import.meta.url).href;
const imgPrototyping = new URL("../../assets/project/tianair/tian_prototyping.png", import.meta.url).href;
const imgFlightSchedule = new URL("../../assets/project/tianair/tian_flightschedule.png", import.meta.url).href;
const imgFlightPaths = new URL("../../assets/project/tianair/tian_flightpaths.png", import.meta.url).href;
const heroVideo = new URL("../../assets/project/tianair/tian_fullflow_macstudio_2x1.mp4", import.meta.url).href;
const vidBooking = new URL("../../assets/project/tianair/tian_booking_2x1.mp4", import.meta.url).href;
const vidCalendar = new URL("../../assets/project/tianair/tian_calendar_2x1.mp4", import.meta.url).href;
const vidTickets = new URL("../../assets/project/tianair/tian_tickets_2x1.mp4", import.meta.url).href;
const vidForms = new URL("../../assets/project/tianair/tian_forms_2x1.mp4", import.meta.url).href;
const vidEndscreen = new URL("../../assets/project/tianair/tian_endscreen_2x1.mp4", import.meta.url).href;

export default function CasestudyTianAirlines() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [designSysBtnHovered, setDesignSysBtnHovered] = useState(false);
  const [bradFrostBtnHovered, setBradFrostBtnHovered] = useState(false);
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
      <HomeButton />
      <CasestudyNavigation title="Tian Airways" />
      <CasestudyMiniMenu sections={TIAN_SECTIONS} />
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
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh]"
      >
        <div className="flex flex-col items-center w-full">

          {/* ── Hero video (scaled) ── */}
          <motion.div
            ref={heroRef}
            className="w-full"
            style={{ scale: heroScale, transformOrigin: "top center" }}
          >
            <motion.div
              className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
              style={{ borderRadius: heroBorderRadius }}
            >
              <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={heroVideo} />
            </motion.div>
          </motion.div>

          {/* ── Caption + content (y-translated, not scaled) ── */}
          <motion.div style={{ y: contentY }} className="flex flex-col gap-[8vh] items-center w-full pt-[8px]">

            <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.2] text-[#908e99] text-[14px] w-full">
              Prototype Full Flow
            </p>

            {/* ── Overview ── */}
            <div id="cs-overview" className="flex flex-col gap-[32px] items-start w-full">
              <div className="border-b border-[#302f34] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px] w-full">
                  Tian Airlines
                </p>
                <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.25] text-[#908e99] text-[20px] w-full">
                  <p className="mb-0">Building a design system for a small airline;</p>
                  <p>creating clear prototypes coordinating flights to model a functional end-to-end system.</p>
                </div>
              </div>

              <div className="flex gap-[57px] items-start w-full">
                {/* Left: Tools / Role / Timeline */}
                <div className="flex flex-col gap-[32px] items-start shrink-0 font-['Inter_Tight',sans-serif] text-[16px]">
                  <div className="flex flex-col gap-[12px] items-start w-[43px]">
                    <p className="leading-none text-[#908e99]">Tools</p>
                    <p className="font-normal leading-[1.5] text-[color:var(--text\/primary,#eeedf5)]">Figma</p>
                  </div>
                  <div className="flex flex-col gap-[12px] items-start w-[156px]">
                    <p className="leading-none text-[#908e99]">Role</p>
                    <div className="font-normal leading-[1.5] text-[color:var(--text\/primary,#eeedf5)]">
                      <p className="mb-0">Design System</p>
                      <p className="mb-0">Token Library</p>
                      <p className="mb-0">Component Properties</p>
                      <p>Prototyping Logic</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px] items-start w-[60px]">
                    <p className="leading-none text-[#908e99]">Timeline</p>
                    <p className="font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)]">4 Weeks</p>
                  </div>
                </div>

                {/* Right: Interface / Notes */}
                <div className="flex flex-1 flex-col gap-[32px] items-start min-w-0">
                  <div className="flex flex-col gap-[12px] items-start font-['Inter_Tight',sans-serif] text-[16px]">
                    <p className="leading-none text-[#908e99]">Interface</p>
                    <p className="font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)]">Desktop</p>
                  </div>
                  <div className="flex flex-col gap-[12px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Notes</p>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[16px] w-full">
                      <p className="mb-[16px]">Applying atomic design principles by Brad Frost to problem solving and design thinking.</p>
                      <p>The DS and prototype were built out side by side, using tokens, booleans, and calculator switches within Figma.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── The Design System ── */}
            <div id="cs-design-system" className="flex flex-col gap-[8vh] items-start w-full scroll-mt-[100px]">
              {/* Divider */}
              <div className="w-full border-t border-[#302f34]" />
              {/* Title row */}
              <div className="flex gap-[16px] items-center relative w-full">
                <div className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 h-[160px] w-full blur-[80px]" style={{ background: "radial-gradient(ellipse at 15% 50%, rgba(200,185,255,0.28) 0%, rgba(200,185,255,0) 65%)" }} />
                <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
                <p className="font-['Inter_Tight',sans-serif] leading-[1.1] text-[#faf9ff] text-[32px] relative z-10 whitespace-nowrap">Design System</p>
              </div>
              <div className="flex flex-col gap-[32px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Nebula: Heaven / Tian's System</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px]">
                    Organized for anyone to use
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[15px] md:text-[17px] w-full">
                    The design system covers typography, color, illustration styles, icon sizing, and component library of forms, buttons, and cards.
                  </p>
                  <button
                    onClick={() => window.open(`https://www.figma.com/design/klzJHuTEUAFke7SwbRHEZy/Nebula-Design-System?node-id=856-7474&t=P15LHVMJLglg45wM-1`)}
                    onMouseEnter={() => setDesignSysBtnHovered(true)}
                    onMouseLeave={() => setDesignSysBtnHovered(false)}
                    className="flex items-center justify-center px-[16px] py-[10px] rounded-[24px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150"
                    style={{ background: designSysBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.2)" }}
                  >
                    <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[14px]">View Design System</span>
                  </button>
                </div>

                {/* Image container: 2 stacked 2:1 photos */}
                <div className="flex flex-col gap-[21.578px] items-start w-full">
                <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                  <img src={imgTokenSystem} alt="Tian Token System" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                  <img src={imgComponentSystem} alt="Tian Component System" className="w-full h-full object-cover" />
                </div>
              </div>
              </div>
            </div>

            {/* ── Section: Prototype System ── */}
            <div className="flex flex-col gap-[8vh] items-start w-full">

              {/* Tokens + Components two-column */}
              <div className="flex gap-[24px] items-stretch w-full">
                {/* Left: Figma Variables */}
                <div className="flex flex-col justify-between gap-[32px] flex-1 min-w-0">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">Figma Variables</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px] w-full">Tons of tokens and styles</p>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[15px] md:text-[17px] w-full">
                      I worked with four major collections: Primitive Color, Semantic Color, Typography, and Box Model (to handle border radius and spacing).
                    </p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                      <img src={imgVariables} alt="Tian Variables" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] w-full">Variable Scope, Tokens, and Color, oh my!</p>
                  </div>
                </div>
                {/* Right: Components and Prototyping */}
                <div className="flex flex-col justify-between gap-[32px] flex-1 min-w-0">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">Components and Prototyping</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[color:var(--text\/primary,#eeedf5)] text-[24px] w-full">Figma calculators + if/else</p>
                    <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/tertiary,#7e7c87)] text-[15px] md:text-[17px] w-full">
                      <p className="mb-[16px]">{`I made components of two frames looping 10 ms to force a "listener" of sorts in Figma.`}</p>
                      <p>{`Each heavy process had its own special version set!`}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                      <img src={imgPrototyping} alt="Tian Prototyping" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] w-full">{`The calendar logic was the hardest but most rewarding!`}</p>
                  </div>
                </div>
              </div>

              {/* Flight Planning */}
              <div id="cs-flight-planning" className="flex flex-col gap-[8vh] items-start w-full scroll-mt-[100px]">
                {/* Divider */}
                <div className="w-full border-t border-[#302f34]" />
                {/* Title row */}
                <div className="flex gap-[16px] items-center relative w-full">
                  <div className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 h-[160px] w-full blur-[80px]" style={{ background: "radial-gradient(ellipse at 15% 50%, rgba(200,185,255,0.28) 0%, rgba(200,185,255,0) 65%)" }} />
                  <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.1] text-[#faf9ff] text-[32px] relative z-10 whitespace-nowrap">Flight Planning</p>
                </div>
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flight Planning</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px] w-full">
                      Making a working flight table
                    </p>
                  </div>
                  <div className="border border-[#302f34] flex flex-col gap-[16px] items-start overflow-clip p-[24px] rounded-[8px] w-full" style={{ background: "rgba(88,85,100,0.15)" }}>
                    <div className="flex flex-col gap-[16px] items-start w-full">
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#585564] text-[16px]">Hey ChatGPT...</p>
                      <p className="font-['Inter_Tight',sans-serif] leading-[1.4] text-[#faf9ff] text-[20px] w-full whitespace-pre-wrap">
                        {`Make Beijing the central hub to all flights. Beijing → Chengdu have 2 looping flights, Beijing → Shanghai  2 looping flights, and Beijing → Singapore has 1 looping flight.`}
                      </p>
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.5] text-[#908e99] text-[14px] w-full">
                      I stored every unique flight code, city, travel time, and price within a ticket component and a switch, setting up the system for success.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px] w-full">
                  <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                    <img src={imgMilitaryTime} alt="Tian Military Time" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">Military timeline view for component development</p>
                </div>
                <div className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] flex-1 min-w-0">
                    <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                      <img src={imgFlightSchedule} alt="Tian Flight Schedule" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">Unique flight codes and tags</p>
                  </div>
                  <div className="flex flex-col gap-[16px] flex-1 min-w-0">
                    <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                      <img src={imgFlightPaths} alt="Tian Flight Paths" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">Flight direction for peers to understand</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section: Reflection ── */}
            <div id="cs-final-designs" className="flex flex-col gap-[8vh] items-start w-full scroll-mt-[100px]">
              {/* Divider */}
              <div className="w-full border-t border-[#302f34]" />
              {/* Title row */}
              <div className="flex gap-[16px] items-center relative w-full">
                <div className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 h-[160px] w-full blur-[80px]" style={{ background: "radial-gradient(ellipse at 15% 50%, rgba(200,185,255,0.28) 0%, rgba(200,185,255,0) 65%)" }} />
                <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
                <p className="font-['Inter_Tight',sans-serif] leading-[1.1] text-[#faf9ff] text-[32px] relative z-10 whitespace-nowrap">Prototype</p>
              </div>

              {/* Final design flows card */}
              <div className="border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full" style={{ background: "linear-gradient(to bottom, #302f34 0%, #161617 65%)" }}>

                {/* Header */}
                <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px] w-full">
                    Where am I, where do I want to go, how do I get there?
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[15px] md:text-[17px] w-full">
                    After testing peers, I made sure to have better cues for interactivity
                  </p>
                </div>

                {/* Flow 1/5 */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flow 1/5</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">Too many choices → Progressive flow</p>
                  </div>
                  <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidBooking} />
                  </div>
                </div>

                {/* Flow 2/5 */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flow 2/5</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">Calendar + booking process</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#908e99] text-[15px] md:text-[17px] w-full">
                      Using lots of if/else switches, I also studied top booking sites peers enjoyed (we all love AirBnB)
                    </p>
                  </div>
                  <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidCalendar} />
                  </div>
                </div>

                {/* Flow 3/5 */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flow 3/5</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">Tickets</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">
                      Using color to signal direction, grouping information into cards, and creating clear interactive objects!
                    </p>
                  </div>
                  <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidTickets} />
                  </div>
                </div>

                {/* Flow 4/5 */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flow 4/5</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">Passenger Forms</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">
                      Setting 54 key variables to each text field; great for peer testing
                    </p>
                  </div>
                  <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidForms} />
                  </div>
                </div>

                {/* Flow 5/5 */}
                <div className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Flow 5/5</p>
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">End flow</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">
                      Pointing users to download receipt and flight information! Also providing flight prep and ticket information.
                    </p>
                  </div>
                  <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidEndscreen} />
                  </div>
                </div>

              </div>

              {/* Reflection */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#908e99] text-[16px]">Closing thoughts</p>
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[24px]">A methodical practice</p>
                </div>

                {/* Card 1 */}
                <div className="border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">1</p>
                  <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] min-w-0">
                    <p className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[15px] md:text-[17px] whitespace-nowrap">If/Else calculators</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">{`Creating this system required a mix of code informed thinking and design. It's powered by Figma calculators and layered conditional logic. Bringing this level of complexity to life is so exciting!`}</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">2</p>
                  <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] min-w-0">
                    <p className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[15px] md:text-[17px] whitespace-nowrap">Benchmarking with peers</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">{`While this isn't a product that will be used by an airline, I really enjoyed the practice of deep design thinking. For benchmarking, we tested amongst peers and I was able to find the gaps in the design system.`}</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full" style={{ background: "rgba(219,189,254,0.05)" }}>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[#908e99] text-[14px] shrink-0">3</p>
                  <div className="flex flex-1 flex-col gap-[8px] items-start leading-[1.65] min-w-0">
                    <p className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[15px] md:text-[17px] whitespace-nowrap">Brad Frost..</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] text-[#b8b4c5] text-[16px] tracking-[-0.32px] w-full">Atomic Design is a powerful mental model, and something we learn at RIT to better create scalable systems.</p>
                    <img src={imgBradFrostTweet} alt="Brad Frost tweet" className="w-1/2 rounded-[8px] mt-[8px]" />
                    <button
                      onClick={() => window.open(`https://www.figma.com/proto/3DhqBiGPZtzpBjf1EyxMRn/Presentation-1---Atomic-Design?node-id=1-2&viewport=228%2C141%2C0.15&t=ggJ48Y5qolLaOPbb-1&scaling=contain&content-scaling=fixed&page-id=0%3A1`)}
                      onMouseEnter={() => setBradFrostBtnHovered(true)}
                      onMouseLeave={() => setBradFrostBtnHovered(false)}
                      className="flex items-center justify-center px-[16px] py-[10px] rounded-[24px] border border-solid border-[#302f34] cursor-pointer transition-colors duration-150 mt-[8px]"
                      style={{ background: bradFrostBtnHovered ? "rgba(144,142,153,0.2)" : "rgba(88,85,100,0.2)" }}
                    >
                      <span className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[#faf9ff] text-[14px]">Checkout my presentation of Brad Frost</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <UpNext currentId="tian-airlines" />

          </motion.div>{/* end content wrapper */}

        </div>
      </motion.div>
    </div>
  );
}
