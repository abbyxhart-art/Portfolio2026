import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import BoothDial from "../components/BoothDial";
import imgCos1 from "../../assets/project/booth/cos1_2x1.png";
import imgCos2 from "../../assets/project/booth/cos2_2x1.png";
import munsonVideo from "../../assets/project/booth/munson.mp4";
import irisHoverVideo from "../../assets/project/booth/iris_hover.MOV";
import imgBeyondDefault from "../../assets/project/booth/beyondfashion_default.png";
import imgSgOlivia from "../../assets/project/booth/sg_olivia.png";
import imgSgGaby from "../../assets/project/booth/sg_gaby.png";
import imgSgPole from "../../assets/project/booth/sg_pole.png";
import igImg1 from "../../assets/project/booth/ig_1.png";
import igVid2 from "../../assets/project/booth/ig_2.mov";
import igImg4 from "../../assets/project/booth/ig_4.jpg";

export default function Booth() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
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
        className="hidden md:block fixed left-[20px] right-[20px] z-50"
        style={{ top: "16px" }}
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      <div className="flex flex-col pt-[15vh]">

        {/* Header */}
        <motion.div
          className="flex flex-col gap-[32px] items-start w-full px-[16px] md:px-[25vw] pb-[75px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.1] text-white text-[32px]">
            Booth 1303 is RIT's New Media Lab.
          </p>
          <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.65] text-[#faf9ff] text-[15px] md:text-[17px]">
            It's where I make most of my interactions, illustrations, and interfaces. Here, you can chill through 3 blocks of work.
          </p>
        </motion.div>

        {/* Horizontal scroll content */}
        <div ref={scrollContainerRef} className="w-full md:overflow-x-auto pb-[15vh] no-scrollbar md:snap-x md:snap-mandatory md:scroll-pl-[25vw]" style={{ scrollbarWidth: 'none' }}>
          <div className="flex flex-col gap-[64px] md:flex-row md:gap-[160px]">
            <div className="hidden md:block shrink-0 md:w-[25vw]" />

          {/* Interactive Experiences — 3 portrait */}
          <motion.div
            className="w-full md:shrink-0 md:w-[50vw] flex flex-col gap-[32px] items-start px-[16px] md:px-0 md:snap-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
          >
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="font-light leading-none text-[color:var(--text\/primary,#eeedf5)] text-[15px] md:text-[17px]">Interactive Experiences</p>
              <p className="font-light leading-[1.5] text-[#908e99] text-[16px]">Fashion shows to university wide events</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">

              {/* Munson — autoplay video */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-square rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
                  <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={munsonVideo} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.5] text-[#908e99] text-[14px] w-full">
                  Mograph Wall and Kiosk Takeaways. DJ Munson's Last Spin, 2025
                </p>
              </div>

              {/* Beyond Fashion */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-square rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
                  <img
                    src={imgBeyondDefault}
                    alt="Beyond Fashion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.5] text-[#908e99] text-[14px] w-full">
                  Beyond Fashion 2025
                </p>
              </div>

              {/* IRIS — autoplay video */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-square rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    src={irisHoverVideo}
                  />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.5] text-[#908e99] text-[14px] w-full">
                  IRIS : An AI planner gone wrong, Creative Collision 2024
                </p>
              </div>

            </div>
          </motion.div>

          {/* College of Science — 2 landscape */}
          <motion.div
            className="w-full md:shrink-0 md:w-[50vw] flex flex-col gap-[32px] items-start px-[16px] md:px-0 md:snap-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="font-light leading-none text-[color:var(--text\/primary,#eeedf5)] text-[15px] md:text-[17px]">College of Science</p>
              <p className="font-light leading-[1.5] text-[#908e99] text-[16px]">Multimedia work promoting COS for students, faculty, and staff</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">
              {[
                { caption: "Bates Study Center gave me the opportunity to create playful site branding alongside a math-centered logo!", img: imgCos1 },
                { caption: "COS Strategic Plan: Released to staff and faculty, sprinted in Figma, designed in InDesign", img: imgCos2 },
              ].map(({ caption, img }, i) => (
                <div key={i} className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <img src={img} alt={caption} className="aspect-[2/1] rounded-[4px] w-full object-cover" />
                  <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.5] text-[#908e99] text-[14px] w-full">{caption}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student Government — 3 landscape 4:3 */}
          <motion.div
            className="w-full md:shrink-0 md:w-[50vw] flex flex-col gap-[32px] items-start px-[16px] md:px-0 md:snap-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
          >
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="font-light leading-none text-[color:var(--text\/primary,#eeedf5)] text-[15px] md:text-[17px]">Student Government</p>
              <p className="font-light leading-[1.5] text-[#908e99] text-[16px]">Promoting SG's free popcorn feature with merch still in production :D</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">
              {[
                { caption: "Olivia's Macbook, 2025", img: imgSgOlivia },
                { caption: "Gaby's Macbook, 2024", img: imgSgGaby },
                { caption: "Phone pole, 2023", img: imgSgPole },
              ].map(({ caption, img }, i) => (
                <div key={i} className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <img src={img} alt={caption} className="aspect-[400/300] rounded-[4px] w-full object-cover" />
                  <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.5] text-[#908e99] text-[14px] w-full">{caption}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* It doesn't stop here */}
          <motion.div
            className="w-full md:shrink-0 md:w-[50vw] flex flex-col gap-[32px] items-start px-[16px] md:px-0 md:snap-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          >
            <div className="flex flex-col gap-[8px] items-start w-full max-w-[576px]">
              <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[15px] md:text-[17px]">
                It doesn't stop here!
              </p>
              <div className="flex gap-[8px] items-center">
                <p className="font-['Inter_Tight',sans-serif] font-light leading-[1.65] text-[#908e99] text-[16px] whitespace-nowrap">
                  I post all of my creativity on
                </p>
                <a
                  href="https://www.instagram.com/abbyxhart.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Inter_Tight',sans-serif] font-light leading-[1.65] text-[#908e99] text-[16px] underline decoration-dotted underline-offset-4 hover:text-white transition-colors duration-200"
                >Instagram</a>
              </div>
            </div>
            {/* 3 IG blocks — ig_2 takes double width */}
            <div className="flex gap-[24px] items-start w-full">
              <div className="flex-1 min-w-0 aspect-[4/5] rounded-[4px] overflow-hidden bg-[#1c1b1f]">
                <img src={igImg1} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-[2] min-w-0 aspect-[2/1] rounded-[4px] overflow-hidden bg-[#1c1b1f]">
                <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={igVid2} />
              </div>
              <div className="flex-1 min-w-0 aspect-[4/5] rounded-[4px] overflow-hidden bg-[#1c1b1f]">
                <img src={igImg4} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

            <div className="hidden md:block shrink-0 md:w-[75vw]" />
          </div>
        </div>
      </div>

      {/* Dial */}
      <div className="hidden md:block fixed bottom-[-80px] left-1/2 -translate-x-1/2 z-50">
        <BoothDial scrollRef={scrollContainerRef} />
      </div>
    </div>
  );
}
