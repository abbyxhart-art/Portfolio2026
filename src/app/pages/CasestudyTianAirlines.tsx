import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import UpNext from "../components/UpNext";
import ButtonBasic from "../components/ButtonBasic";
const imgTokenSystem = new URL("../../assets/project/tianair/Tian_TokenSystem.png", import.meta.url).href;
const imgComponentSystem = new URL("../../assets/project/tianair/Tian_ComponentSystem.png", import.meta.url).href;
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
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
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
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const gallerySlides: { caption: string; video: string }[] = [
    { caption: "Booking: progressive flow — cities then passengers; bottom nav optimized for speed + consistency", video: vidBooking },
    { caption: "Calendar: setting solid visual cues for available dates, travel dates, and trip length", video: vidCalendar },
    { caption: "Tickets: making each interactive item a light gray; setting clear, obvious hover states!", video: vidTickets },
    { caption: "Passenger Forms: setting 54 key variables to each text field; great for peer testing", video: vidForms },
    { caption: "End Flow: making sure the passenger has all the information they want", video: vidEndscreen },
  ];

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
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) setScrollingUp(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 10) setScrollingUp(false);
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf9ff] overflow-x-clip">
      <HomeButton />
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(232,231,240,0.95) 0%, rgba(232,231,240,0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      <div className="flex flex-col items-center px-[10px] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[8vh] items-center w-full max-w-[886px]">

          {/* ── Hero ── */}
          <motion.div
            ref={heroRef}
            className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
            style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={heroVideo} />
          </motion.div>

          {/* ── Content below hero (moves with it) ── */}
          <motion.div style={{ y: contentY }} className="flex flex-col gap-[8vh] items-center w-full">

          {/* ── Overview ── */}
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="border-b border-[#d1cedc] flex flex-col gap-[8px] items-start pb-[32px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
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
                  <p className="font-normal leading-[1.5] text-[#232226]">Figma</p>
                </div>
                <div className="flex flex-col gap-[12px] items-start w-[156px]">
                  <p className="leading-none text-[#908e99]">Role</p>
                  <div className="font-normal leading-[1.5] text-[#232226]">
                    <p className="mb-0">Design System</p>
                    <p className="mb-0">Token Library</p>
                    <p className="mb-0">Component Properties</p>
                    <p>Prototyping Logic</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px] items-start w-[60px]">
                  <p className="leading-none text-[#908e99]">Timeline</p>
                  <p className="font-normal leading-[1.65] text-[#232226]">4 Weeks</p>
                </div>
              </div>

              {/* Right: Interface / Notes */}
              <div className="flex flex-1 flex-col gap-[32px] items-start min-w-0">
                <div className="flex flex-col gap-[12px] items-start font-['Inter_Tight',sans-serif] text-[16px]">
                  <p className="leading-none text-[#908e99]">Interface</p>
                  <p className="font-normal leading-[1.65] text-[#232226]">Desktop</p>
                </div>
                <div className="flex flex-col gap-[12px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Notes</p>
                  <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#232226] text-[16px] w-full">
                    <p className="mb-[16px]">Applying atomic design principles by Brad Frost to problem solving and design thinking.</p>
                    <p>The DS and prototype were built out side by side, using tokens, booleans, and calculator switches within Figma.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── The Design System ── */}
          <div className="flex flex-col gap-[8vh] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">The Design System</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
                Organized for anyone to use
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                The design system covers typography, color, illustration styles, icon sizing, and component library of forms, buttons, and cards.
              </p>
              <ButtonBasic label="View Design System" size="Default" />
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

          {/* ── Section: Prototype System ── */}
          <div className="flex flex-col gap-[8vh] items-start w-full">

            {/* Tokens + Components two-column */}
            <div className="flex gap-[24px] items-stretch w-full">
              {/* Left: Figma Variables */}
              <div className="flex flex-col justify-between gap-[32px] flex-1 min-w-0">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">Figma Variables</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">Tons of tokens and styles</p>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
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
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">Figma calculators + if/else</p>
                  <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
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
            <div className="flex flex-col gap-[32px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px]">Flight Planning</p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                  Making a working flight table
                </p>
              </div>
              <div className="bg-[#eeedf5] border border-[#e8e7f0] flex flex-col gap-[16px] items-start p-[24px] rounded-[8px] w-full overflow-clip">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Hey ChatGPT...</p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] w-full">
                  {`Make Beijing the central hub to all flights. Beijing → Chengdu have 2 looping flights, Beijing → Shanghai  2 looping flights, and Beijing → Singapore has 1 looping flight.`}
                </p>
              </div>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-black text-[16px] tracking-[-0.32px] w-full">
                After Chat GPT, I stored every unique flight code, city, travel time, and price within a ticket component and a switch, setting up the system for success.
              </p>
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
          <div className="flex flex-col gap-[8vh] items-start w-full">

            {/* Final design clips */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Final design clips</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
                Where am I, where do I want to go, how do I get there?
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                After testing peers, I made sure to have better cues for testing and layout for Figma to handle interactivity.
              </p>
              {/* Paginated gallery */}
              <div className="flex flex-col gap-[24px] items-center w-full">
                <div className="w-full overflow-x-clip">
                <Swiper
                  modules={[Mousewheel]}
                  mousewheel={{ forceToAxis: true, thresholdDelta: 20 }}
                  centeredSlides
                  centeredSlidesBounds
                  slidesPerView="auto"
                  spaceBetween={24}
                  speed={400}
                  onSwiper={(s) => {
                    swiperRef.current = s;
                    s.on("slideChange", () => {
                      s.allowSlideNext = false;
                      s.allowSlidePrev = false;
                      setTimeout(() => {
                        s.allowSlideNext = true;
                        s.allowSlidePrev = true;
                      }, 400);
                    });
                  }}
                  onSlideChange={(s) => setActiveSlide(s.activeIndex)}
                  className="w-full"
                  style={{ overflow: "visible" }}
                >
                  {gallerySlides.map((slide, i) => (
                    <SwiperSlide key={i} style={{ width: "calc(100% - 120px)" }}>
                      <div className="flex flex-col gap-[16px]">
                        <div className="aspect-[2/1] bg-[#eeedf5] rounded-[8px] w-full overflow-hidden">
                          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={slide.video} />
                        </div>
                        <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">
                          {slide.caption}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
                {/* Dots */}
                <div className="flex gap-[8px] items-center justify-center">
                  {gallerySlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => swiperRef.current?.slideTo(i)}
                      className="w-[10px] h-[10px] rounded-[2px] cursor-pointer border-0 p-0 transition-colors duration-150"
                      style={{ background: i === activeSlide ? "#9a47ff" : "#d1cedc" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Reflection */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">Looking back</p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
                It's a methodical practice, high prototyping and logic
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                {`Creating this system required a mix of code informed thinking and design. It's powered by Figma calculators and layered conditional logic. Bringing this level of complexity to life is so exciting!`}
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.65] text-[#585564] text-[18px]">
                Applying it to "real life"
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                {`While this isn't a product that will be used by an airline, I really enjoyed the practice of deep design thinking. For benchmarking, we tested amongst peers and I was able to find the gaps in the design system and make it usable.`}
              </p>
            </div>
          </div>

          <UpNext currentId="tian-airlines" />

          </motion.div>{/* end content wrapper */}

        </div>
      </div>
    </div>
  );
}
