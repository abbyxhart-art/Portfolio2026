import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import FriendsCard from "../components/FriendsCard";
import OfflineCard from "../components/OfflineCard";
import DrinkCard from "../components/DrinkCard";
import about1 from "../../assets/project/about/about_1.jpg";
import about3 from "../../assets/project/about/about_3.png";
import about4 from "../../assets/project/about/about_4.png";

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
];

const photos = [
  { caption: "Me + Lana @ CC Meet, we won!", img: about1 },
  { caption: "Charlotte, Miggi, Me, Troy, Lasya @ New Media Club", img: about3 },
  { caption: "Angie, Me, Ivo, TJ, @ NYC", img: about4 },
];


export default function About() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const quotesOuterRef = useRef<HTMLDivElement>(null);
  const quotesInnerRef = useRef<HTMLDivElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);
  const posRef      = useRef(-80);
  const shRef       = useRef(0);
  const visibleRef  = useRef(false);
  const prevTimeRef = useRef(0);
  const rafRef      = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const outer = quotesOuterRef.current;
    const inner = quotesInnerRef.current;
    if (!outer || !inner) return;

    const SPEED = 25;

    const tick = (time: number) => {
      if (visibleRef.current && prevTimeRef.current) {
        const dt = time - prevTimeRef.current;
        posRef.current += (SPEED * dt) / 1000;

        const sh = shRef.current;
        if (sh > 0) {
          if (posRef.current >= sh)  posRef.current -= sh;
          if (posRef.current < -sh)  posRef.current += sh;
        }

        inner.style.transform = `translateY(-${posRef.current}px)`;

        if (sh > 0) {
          const norm = ((posRef.current % sh) + sh) % sh;
          const idx  = Math.floor((norm / sh) * quotes.length) % quotes.length;
          setActiveQuote(idx);
        }
      }
      prevTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(() => {
      shRef.current = inner.offsetHeight / 2;
      rafRef.current = requestAnimationFrame(tick);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) prevTimeRef.current = 0;
      },
      { threshold: 0.1 }
    );
    observer.observe(outer);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY <= 0) return;
      posRef.current += e.deltaY * 0.6;
      const sh = shRef.current;
      if (sh > 0 && posRef.current >= sh) posRef.current -= sh;
      inner.style.transform = `translateY(-${posRef.current}px)`;
    };
    outer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      outer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
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
              background: "linear-gradient(to bottom, rgba(23,23,23,0.98) 0%, rgba(23,23,23,0.85) 25%, rgba(23,23,23,0.35) 55%, rgba(23,23,23,0) 100%)",
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

      {/* Page content */}
      <div className="px-[8vw] pt-[100px] pb-[14vh] flex flex-col gap-[75px]">

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-[16px] items-stretch">

          {/* Left: Backstory box */}
          <motion.div
            className="border border-[#302f34] rounded-[12px] p-[32px] flex flex-col gap-[36px] h-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >

            <p
              className="font-['Inter_Tight',sans-serif] leading-[1.1] text-white font-normal"
              style={{ fontSize: "52px" }}
            >
              I design to help people navigate and interact with tools and worlds
            </p>

            {/* My skills */}
            <div className="flex flex-col gap-[16px]">
              <p className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[14px] leading-[1.5]">My skills</p>
              <div className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[17px] font-light">
                <p className="leading-[1.65] mb-[16px]">I'm Abby, interdisciplinary designer</p>
                <p className="leading-[1.65]">
                  I love branding and shipping fast. Wearing many hats never gets boring; my roles across internships
                  and teams have spanned interaction, motion, and documentation. My "creative technologist" title was
                  given by Hye-Jin Nae, my professor at RIT :D
                </p>
              </div>
            </div>

            {/* How I got started */}
            <div className="flex flex-col gap-[24px]">
              <p className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[14px] leading-[1.5]">How I got started</p>
              <p className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[17px] font-light leading-[1.65]">
                My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with algorithms.
                I opened Figma to pitch our local hackathon for kids, and that journey eventually led me to RIT and
                some incredibly inspiring friends.
              </p>
            </div>

            {/* Photo gallery */}
            <div className="flex flex-col gap-[24px]">
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
                  {photos.map(({ caption, img }, i) => (
                    <SwiperSlide key={i} style={{ width: "calc(100% - 80px)" }}>
                      <div className="flex flex-col gap-[24px]">
                        <img
                          src={img}
                          alt={caption}
                          className="aspect-[2/1] rounded-[8px] w-full object-cover"
                        />
                        <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] text-center w-full">
                          {caption}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex gap-[8px] items-center justify-center">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    className="w-[6px] h-[6px] rounded-[1px] cursor-pointer border-0 p-0 transition-colors duration-150"
                    style={{ background: i === activePhoto ? "#9a47ff" : "#585564" }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-[16px] h-full">

            {/* Top squares */}
            <motion.div
              className="flex gap-[16px]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex-1"><OfflineCard /></div>
              <div className="flex-1"><DrinkCard /></div>
            </motion.div>

            {/* Quote / Ethos box */}
            <motion.div
              className="border border-[#302f34] rounded-[12px] overflow-clip relative"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              style={{ height: "402px" }}
            >
              {/* Top gradient */}
              <div
                className="absolute inset-x-0 top-0 h-[200px] z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #161617 45%, rgba(22,22,23,0))" }}
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 h-[76px] z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, #161617, rgba(22,22,23,0))" }}
              />

              {/* Header */}
              <div className="absolute top-[24px] left-[16px] z-20 flex flex-col gap-[6px]">
                <p className="font-['Inter_Tight',sans-serif] text-[#faf9ff] text-[14px] font-[300] leading-none">Ethos</p>
                <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-none" style={{ color: "rgba(144,142,153,0.5)" }}>
                  Design + Life philosophy
                </p>
              </div>

              {/* Separator */}
              <div
                className="absolute inset-x-[16px] z-20"
                style={{ top: "72px", height: "1px", background: "#302f34" }}
              />

              {/* Quote counter */}
              <p
                className="absolute left-[16px] z-20 font-['Inter_Tight',sans-serif] text-[14px] leading-none"
                style={{ top: "84px", color: "rgba(144,142,153,0.5)" }}
              >
                Quote {activeQuote + 1}/{quotes.length}
              </p>

              {/* Scrolling quotes */}
              <div ref={quotesOuterRef} className="h-full overflow-hidden">
                <div
                  ref={quotesInnerRef}
                  className="flex flex-col gap-[50px] px-[16px]"
                  style={{ paddingTop: "145px", paddingBottom: "25px" }}
                >
                  {[...quotes, ...quotes].map((q, i) => (
                    <div key={i} className="flex flex-col gap-[8px]">
                      <p className="font-['Inter_Tight',sans-serif] leading-[1.3] text-[#faf9ff] text-[20px] whitespace-pre-line">
                        {q.text}
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px]">
                        {q.attribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Friends Card */}
            <motion.div
              className="border border-[#302f34] rounded-[12px] flex-1 overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            >
              <FriendsCard />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
