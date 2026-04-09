import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import ButtonFilled from "../components/ButtonFilled";
import Cursor from "../components/Cursor";
import about1 from "../../assets/project/about/about_1.jpg";
import about3 from "../../assets/project/about/about_3.png";
import about4 from "../../assets/project/about/about_4.png";
import imgFood from "../../assets/project/about/food.png";
import imgFashion from "../../assets/project/about/fashion.png";
import imgMusic from "../../assets/project/about/music.png";
import imgGraffiti from "../../assets/project/about/graffti.png";
import imgRunning from "../../assets/project/about/running.png";
import imgEtsy from "../../assets/project/about/etsy.JPG";

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
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const quotesOuterRef = useRef<HTMLDivElement>(null);
  const quotesInnerRef = useRef<HTMLDivElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);
  const [offlineLabel, setOfflineLabel] = useState<string | null>(null);
  const [offlineMousePos, setOfflineMousePos] = useState({ x: 0, y: 0 });

  const posRef      = useRef(-80);   // start below so first quote has time to be read
  const shRef       = useRef(0);     // single-set height (half of inner height)
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
      if (currentScrollY < lastScrollY) setScrollingUp(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 10) setScrollingUp(false);
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

    const SPEED = 25; // px per second

    const tick = (time: number) => {
      if (visibleRef.current && prevTimeRef.current) {
        const dt = time - prevTimeRef.current;
        posRef.current += (SPEED * dt) / 1000;

        const sh = shRef.current;
        if (sh > 0) {
          if (posRef.current >= sh)   posRef.current -= sh;
          if (posRef.current < -sh)   posRef.current += sh;
        }

        inner.style.transform = `translateY(-${posRef.current}px)`;

        // update quote counter from position
        if (sh > 0) {
          const norm = ((posRef.current % sh) + sh) % sh;
          const idx  = Math.floor((norm / sh) * quotes.length) % quotes.length;
          setActiveQuote(idx);
        }
      }
      prevTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    // measure after first paint so offsetHeight is accurate
    rafRef.current = requestAnimationFrame(() => {
      shRef.current = inner.offsetHeight / 2;
      rafRef.current = requestAnimationFrame(tick);
    });

    // only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) prevTimeRef.current = 0;
      },
      { threshold: 0.1 }
    );
    observer.observe(outer);

    // wheel — scroll the animation, resume from that point
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY <= 0) return; // only allow scrolling forward
      posRef.current += e.deltaY * 0.6;
      const sh = shRef.current;
      if (sh > 0 && posRef.current >= sh) posRef.current -= sh;
      inner.style.transform = `translateY(-${posRef.current}px)`;
    };
    outer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      outer.removeEventListener('wheel', handleWheel);
    };
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
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      {/* Page content */}
      <div className="flex justify-center px-[10px] pt-[calc(15vh+60px)] pb-[15vh]">
        <div className="flex flex-col gap-[75px] items-start w-full max-w-[728px]">

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
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#232226] text-[18px]">
                  Highschool → RIT
                </p>
                <div className="flex gap-[3px] items-center">
                  <p className="font-['Inter_Tight',sans-serif] leading-[1.5] text-[#908e99] text-[16px] whitespace-nowrap">
                    Let's start the
                  </p>
                  <ButtonFilled
                    label="next chapter"
                    size="Default"
                    type="Default"
                    cursor="Black"
                    onClick={() => window.open(`mailto:abbyxhart@gmail.com?subject=${encodeURIComponent("Loved your portfolio, let's chat!")}`)}
                  />
                </div>
              </div>
              <div className="font-['Inter_Tight',sans-serif] text-[#232226] text-[18px] w-full">
                <p className="leading-[1.65] mb-[16px]">My friend Lana and I found our calling in AP Compsci; me with mini GUI applets and her with algorithms and robotics.</p>
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
                  {[
                    { caption: "Me + Lana @ CC Meet, we won!", img: about1 },
                    { caption: "Charlotte, Miggi, Me, Troy, Lasya @ New Media Club", img: about3 },
                    { caption: "Angie, Me, Ivo, TJ, Leah @ NYC", img: about4 },
                  ].map(({ caption, img }, i) => (
                    <SwiperSlide key={i} style={{ width: "calc(100% - 120px)" }}>
                      <div className="flex flex-col gap-[24px]">
                        <img src={img} alt={caption} className="aspect-[2/1] rounded-[4px] w-full object-cover" />
                        <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] text-center w-full">
                          {caption}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Dots */}
              <div className="flex gap-[8px] items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    className="w-[6px] h-[6px] rounded-[1px] cursor-pointer border-0 p-0 transition-colors duration-150"
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
              {[
                { img: imgFood,     label: "Found my fav cafe" },
                { img: imgFashion,  label: "Books + Fashion!" },
                { img: imgMusic,    label: "Planning my next concert" },
                { img: imgGraffiti, label: "Noticing stickers / art!" },
                { img: imgRunning,  label: "Ran a marathon" },
                { img: imgEtsy,     label: "Had a 5 star etsy in hs!" },
              ].map(({ img, label }, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="aspect-square rounded-[4px] w-full object-cover cursor-none"
                  onMouseEnter={() => setOfflineLabel(label)}
                  onMouseLeave={() => setOfflineLabel(null)}
                  onMouseMove={(e) => setOfflineMousePos({ x: e.clientX, y: e.clientY })}
                />
              ))}
            </div>
            {offlineLabel && (
              <Cursor x={offlineMousePos.x} y={offlineMousePos.y} instance="Text" label={offlineLabel} />
            )}
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
                style={{ background: "linear-gradient(to bottom, #eeedf5 40%, rgba(238,237,245,0))" }} />
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[76px] z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, #eeedf5, rgba(238,237,245,0))" }} />

              {/* Quote counter */}
              <p className="absolute top-[11px] left-[14px] z-20 font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px]">
                Quote {activeQuote + 1}/{quotes.length}
              </p>

              {/* Animated quotes list */}
              <div ref={quotesOuterRef} className="h-full overflow-hidden">
                <div
                  ref={quotesInnerRef}
                  className="flex flex-col gap-[50px] px-[24px] py-[25px]"
                >
                  {[...quotes, ...quotes].map((q, i) => (
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
