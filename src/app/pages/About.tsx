import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";

const quotes = [
  {
    text: "What is this doing here? Do you need it? Get rid of it!",
    attribution: "Adam Smith, RIT professor",
  },
  {
    text: "Don't think about users as making errors.\nThink of the actions as approximations of what is desired.",
    attribution: "Don Norman, Design of Everyday Things",
  },
  {
    text: "Design is how to stop being lost.\nYour work should always answer where, next steps, and how.",
    attribution: "Mike Minerva, RIT professor",
  },
  {
    text: "Think about what you owe people in the design (direction? context?)\nThen think about how to make it work.",
    attribution: "Hye Jin Nae, RIT Professor",
  },
  {
    text: "Make everything super easy.",
    attribution: "Troy Ramiscal, teammate",
  },
];

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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


  // Track which quote is active
  useEffect(() => {
    const el = quotesRef.current;
    if (!el) return;
    const handleScroll = () => {
      const itemHeight = el.scrollHeight / quotes.length;
      const index = Math.round(el.scrollTop / itemHeight);
      setActiveQuote(Math.min(index, quotes.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
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

      {/* Page content */}
      <div className="flex justify-center px-[10px] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[75px] items-start w-full max-w-[640px]">

          {/* Intro */}
          <div className="font-['Inter_Tight',sans-serif] font-normal text-black text-[18px] w-full">
            <p className="leading-[1.65] mb-[16px]">Hi, I'm Abby :D</p>
            <p className="leading-[1.65] mb-[16px]">I design systems, products, and experiences to help people navigate and interact with tools and worlds.</p>
            <p className="leading-[1.65]">I'm an interdisciplinary designer who loves branding and shipping fast. Wearing many hats never gets boring; my roles across internships and teams have spanned interaction, motion, and documentation :D</p>
          </div>

          {/* Backstory */}
          <div className="flex flex-col gap-[24px] w-full">
            {/* Title + blurb + body */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#232226] text-[18px]">
                  Highschool → RIT
                </p>
                <div className="flex gap-[3px] items-center">
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px] whitespace-nowrap">
                    Let's start the
                  </p>
                  <div className="bg-[#e8e7f0] flex items-center justify-center px-[4px] py-[2px]">
                    <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px] whitespace-nowrap">
                      next chapter
                    </p>
                  </div>
                </div>
              </div>
              <div className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[18px] w-full">
                <p className="leading-[1.65] mb-[16px]">My friend Lana and I found our calling AP Compsci; me with mini GUI applets and her with algorithms and robotics.</p>
                <p className="leading-[1.65]">I opened Figma for the first time to propose our towns first hackathon, leading me to RIT where I've met so many talented and inspiring friends!</p>
              </div>
            </div>

            {/* Photo gallery */}
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
                  onSlideChange={(s) => setActivePhoto(s.activeIndex)}
                  className="w-full"
                  style={{ overflow: "visible" }}
                >
                  {["Me, Etc, Etc", "Me, Etc, Etc", "Me, Etc, Etc", "Me, Etc, Etc"].map((caption, i) => (
                    <SwiperSlide key={i} style={{ width: "calc(100% - 120px)" }}>
                      <div className="flex flex-col gap-[24px]">
                        <div className="aspect-[2/1] bg-[#d9d9d9] rounded-[4px] w-full" />
                        <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-black text-[16px] text-center w-full">
                          {caption}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Dots */}
              <div className="flex gap-[8px] items-center justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    className="w-[10px] h-[10px] rounded-[2px] cursor-pointer border-0 p-0 transition-colors duration-150"
                    style={{ background: i === activePhoto ? "#9a47ff" : "#d1cedc" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Offline */}
          <div className="flex flex-col gap-[42px] items-start w-full">
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#232226] text-[18px]">Offline</p>
              <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px]">Refueling mind and body</p>
            </div>
            <div className="grid grid-cols-3 gap-x-[16px] gap-y-[18px] w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-[#e8e7f0] rounded-[4px] w-full" />
              ))}
            </div>
          </div>

          {/* Ethos */}
          <div className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[12px] items-start">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#232226] text-[18px]">Ethos</p>
              <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px]">Life and design philosophy</p>
            </div>

            {/* Scrollable quotes with gradient fade */}
            <div className="relative h-[301px] w-full overflow-hidden rounded-[12px]">
              {/* Top gradient */}
              <div className="absolute inset-x-0 top-0 h-[76px] z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #eeedf5, rgba(238,237,245,0))" }} />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[76px] z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, #eeedf5, rgba(238,237,245,0))" }} />

              {/* Quote counter */}
              <p className="absolute top-[11px] left-[14px] z-20 font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px]">
                Quote {activeQuote + 1}/{quotes.length}
              </p>

              {/* Scrollable list */}
              <div
                ref={quotesRef}
                className="h-full overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="flex flex-col gap-[50px] px-[24px] pt-[122px] pb-[122px]">
                  {quotes.map((q, i) => (
                    <div key={i} className="flex flex-col gap-[8px] items-start">
                      <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-black text-[16px] whitespace-pre-line">
                        {q.text}
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px]">
                        {q.attribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
