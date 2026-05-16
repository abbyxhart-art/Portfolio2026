import { useState, useEffect } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import ButtonFilled from "../components/ButtonFilled";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
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
              background: "linear-gradient(to bottom, rgba(232,231,240,0.95) 0%, rgba(232,231,240,0) 100%)",
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

      <div className="flex flex-col gap-[75px] items-center px-[25vw] pt-[15vh] pb-[15vh]">

        {/* Header */}
        <div className="flex flex-col font-['Inter_Tight',sans-serif] font-normal gap-[32px] items-start w-full">
          <p className="leading-[1.25] text-[#272727] text-[24px]">
            The Booth
          </p>
          <div className="leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">
            <p className="mb-[16px] text-[color:var(--text\/secondary,#585564)]">Booth 1303 is RIT's New Media Lab.</p>
            <p>It's where I make most of my interactions, illustrations, and interfaces. Here, you can chill at booth and scroll 4 blocks of the works.</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[75px] items-start w-full">

          {/* Interactive Experiences — 3 portrait */}
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px]">Interactive Experiences</p>
              <p className="font-normal leading-[1.5] text-[#908e99] text-[16px]">Fashion shows to university wide events</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">

              {/* Munson — autoplay video */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-[1080/1920] rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
                  <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={munsonVideo} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[14px] w-full">
                  Mograph Wall and Kiosk Takeaways. DJ Munson's Last Spin, 2025
                </p>
              </div>

              {/* Beyond Fashion */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-[1080/1920] rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
                  <img
                    src={imgBeyondDefault}
                    alt="Beyond Fashion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[14px] w-full">
                  Beyond Fashion 2025
                </p>
              </div>

              {/* IRIS — autoplay video */}
              <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                <div className="aspect-[1080/1920] rounded-[4px] w-full overflow-hidden bg-[#d9d9d9]">
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
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[14px] w-full">
                  IRIS : An AI planner gone wrong, Creative Collision 2024
                </p>
              </div>

            </div>
          </div>

          {/* College of Science — 2 landscape */}
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px]">College of Science</p>
              <p className="font-normal leading-[1.5] text-[#908e99] text-[16px]">Multimedia work promoting COS for students, faculty, and staff</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">
              {[
                { caption: "Bates Study Center gave me the opportunity to create playful site branding alongside a math-centered logo!", img: imgCos1 },
                { caption: "COS Strategic Plan: Released to staff and faculty, sprinted in Figma, designed in InDesign", img: imgCos2 },
              ].map(({ caption, img }, i) => (
                <div key={i} className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <img src={img} alt={caption} className="aspect-[2/1] rounded-[4px] w-full object-cover" />
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[14px] w-full">{caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Government — 3 landscape 4:3 */}
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start w-full">
              <p className="leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px]">Student Government</p>
              <p className="font-normal leading-[1.5] text-[#908e99] text-[16px]">Promoting SG's free popcorn feature with merch still in production :D</p>
            </div>
            <div className="flex gap-[24px] items-start w-full">
              {[
                { caption: "Olivia's Macbook, 2025", img: imgSgOlivia },
                { caption: "Gaby's Macbook, 2024", img: imgSgGaby },
                { caption: "Phone pole, 2023", img: imgSgPole },
              ].map(({ caption, img }, i) => (
                <div key={i} className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <img src={img} alt={caption} className="aspect-[400/300] rounded-[4px] w-full object-cover" />
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.5] text-[#908e99] text-[14px] w-full">{caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* It doesn't stop here */}
          <div className="flex flex-col gap-[32px] items-start w-full">
            <div className="flex flex-col gap-[8px] items-start w-full max-w-[576px]">
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[color:var(--text\/primary,#eeedf5)] text-[17px]">
                It doesn't stop here!
              </p>
              <div className="flex gap-[8px] items-center">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#908e99] text-[16px] whitespace-nowrap">
                  I post all of my creativity on
                </p>
                <ButtonFilled label="Instagram" type="Purple" size="Default"                    
                 onClick={() => window.open(`https://www.instagram.com/abbyxhart.art`)}
 />
              </div>
            </div>
            {/* 3 IG blocks — ig_2 takes double width */}
            <div className="flex gap-[24px] items-center w-full">
              <div className="flex-1 min-w-0 rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                <img src={igImg1} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-[2] min-w-0 rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" src={igVid2} />
              </div>
              <div className="flex-1 min-w-0 rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                <img src={igImg4} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
