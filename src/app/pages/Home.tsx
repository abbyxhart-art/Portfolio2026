import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { Link } from "react-router";
import Navigation from "../../imports/Navigation";
import CardDrinks, { CardDrinksProperty } from "../components/CardDrinks";
import CardCasestudy, { AccentType } from "../components/CardCasestudy";
import { useDrink } from "../context/DrinkContext";
import aixelsMeImg from "../../assets/project/aixels/me.JPG";
const figbuildMacstudioVideo = new URL("../../assets/project/figbuild/figbuild_macstudio_2x1.mp4", import.meta.url).href;
import gmTeaserVideo from "../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";


const caseStudies: {
  accentType: AccentType;
  title: string;
  description: string;
  date: string;
  tag1Label: string;
  tag2Label: string;
  image?: string;
  video?: string;
}[] = [
  {
    accentType: "2",
    title: "Figma at RIT",
    description: "Bringing a digital playground to students with Figma for Edu",
    date: "Spring 2026",
    tag1Label: "Agentic Design",
    tag2Label: "Brand Activation",
    video: figbuildMacstudioVideo,
  },
  {
    accentType: "1",
    title: "Gentle Monster Kiosk",
    description: "Incepting a luxury kiosk with research and design systems",
    date: "Spring 2025",
    tag1Label: "Research",
    tag2Label: "Design Systems",
    video: gmTeaserVideo,
  },
  {
    accentType: "3",
    title: "Tian Airways",
    description: "Bringing a digital playground to students with Figma for Edu",
    date: "Fall 2025",
    tag1Label: "Agentic Design",
    tag2Label: "Designathon",
  },
  {
    accentType: "4",
    title: "AIXELS",
    description: "Winning Creative Collision with a pixel mirror made of AI logos",
    date: "Fall 2025",
    tag1Label: "Agentic Design",
    tag2Label: "Designathon",
    image: aixelsMeImg,
  },
];

export default function Home() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [unlockedCount, setUnlockedCount] = useState(3);
  const { setSelectedDrink } = useDrink();

  useEffect(() => {
    const stored = localStorage.getItem("visitCount");
    if (!stored) {
      // Seed as if 3 visits have already happened
      localStorage.setItem("visitCount", "3");
      sessionStorage.setItem("visitedThisSession", "true");
    }
    const alreadyVisited = sessionStorage.getItem("visitedThisSession");
    let count = parseInt(localStorage.getItem("visitCount") || "3", 10);
    if (!alreadyVisited) {
      count = Math.min(count + 1, 4);
      localStorage.setItem("visitCount", String(count));
      sessionStorage.setItem("visitedThisSession", "true");
    }
    setUnlockedCount(count);
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
      {/* Top Purple Gradient */}
      <div
        className="absolute inset-x-0 z-0 h-[800px] pointer-events-none"
        style={{
          top: "-500px",
          background: "radial-gradient(ellipse 80% 600px at 50% 50%, rgba(190,170,255,0.35) 0%, rgba(220,210,255,0.15) 50%, rgba(250,249,255,0) 100%)",
        }}
      />

      {/* Scroll fade gradient */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(232, 231, 240, 0.95) 0%, rgba(232, 231, 240, 0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      {/* Main body */}
      <div className="flex flex-col gap-[50px] items-start pt-[150px] pb-[10vh] px-[8vw] relative w-full">

        {/* Landing Page Section */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="h-[640px] relative shrink-0 w-full"
        >

          {/* Macscreen mockup */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1217px] h-[609px]">

            {/* Desktop Outer frame */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1167px] h-[568px] bg-[var(--surface\/primary,#faf9ff)] border border-[var(--border\/default,#d1cedc)] border-solid flex flex-col items-start justify-center p-[8px] rounded-[var(--border-radius\/large,12px)] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.15)] overflow-clip">

              {/* Desktop Inner */}
              <div className="flex-[1_0_0] min-h-px min-w-px w-full relative overflow-clip rounded-[var(--border-radius\/default,8px)] border border-[var(--border\/default,#d1cedc)] border-solid bg-[var(--surface\/primary,#faf9ff)] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.15)]">

                {/* Browser nav bar */}
                <div
                  className="absolute left-[-1px] top-[-1px] right-[-1px] flex items-center justify-between p-[16px]"
                  style={{
                    background: "linear-gradient(to right, #e8e7f0 0%, #faf9ff 50%, #e8e7f0 100%)",
                  }}
                >
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-[8px] h-[17px]">
                    <div className="w-[12px] h-[12px] rounded-full bg-[var(--neutral\/50,#b8b4c5)]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[var(--neutral\/50,#b8b4c5)]" />
                    <div className="w-[12px] h-[12px] rounded-full bg-[var(--neutral\/50,#b8b4c5)]" />
                  </div>
                  {/* Plus icon */}
                  <div className="flex items-center justify-end w-[82px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="#7e7c87" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom fade gradient — fades macbook into page background */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[1217px] h-[230px] pointer-events-none"
            style={{
              top: "379px",
              background: "linear-gradient(to top, #faf9ff 46.957%, rgba(250,249,255,0) 100%)",
            }}
          />

          {/* Hero text + drink card */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[150px] w-[658px] flex flex-col gap-[42px] items-center">
            <div
              className="w-full text-center text-[color:var(--text\/primary,#232226)] text-[length:var(--text-size\/largest,50px)] tracking-[-1px] font-[450] leading-[1.2]"
              style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)" }}
            >
              <p>I'm Abby :D</p>
              <p>I design visual systems to direct and delight</p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <CardDrinks
                className="border border-[#b6b1c8] border-solid flex flex-col gap-[42px] items-center p-[36px] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)] shrink-0"
                property1={`Drink ${unlockedCount} Unlocked` as CardDrinksProperty}
                onDrinkClick={(drink) => setSelectedDrink(drink)}
              />
            </motion.div>
          </div>

        </motion.div>

        {/* Case study cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
          className="flex flex-wrap gap-[64px] items-start w-full"
        >
          {caseStudies.map((cs, i) => {
            const card = (
              <CardCasestudy
                key={i}
                className="content-stretch flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-full"
                accentType={cs.accentType}
                title={cs.title}
                description={cs.description}
                date={cs.date}
                tag1Label={cs.tag1Label}
                tag2Label={cs.tag2Label}
                image={cs.image}
                video={cs.video}
              />
            );
            if (i === 0) {
              return (
                <Link key={i} to="/casestudy/figma-rit" className="w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 1) {
              return (
                <Link key={i} to="/casestudy/gentle-monster" className="w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 2) {
              return (
                <Link key={i} to="/casestudy/tian-airlines" className="w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 3) {
              return (
                <Link key={i} to="/casestudy/aixels" className="w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            return <div key={i} className="w-[calc(50%-32px)]">{card}</div>;
          })}
        </motion.div>

      </div>
    </div>
  );
}
