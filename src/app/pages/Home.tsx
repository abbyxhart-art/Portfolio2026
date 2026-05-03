import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { Link } from "react-router";
import Navigation from "../../imports/Navigation";
import CardCasestudy, { AccentType } from "../components/CardCasestudy";
import aixelsMeImg from "../../assets/project/aixels/me.JPG";
const figbuildMacstudioVideo = new URL("../../assets/project/figbuild/figbuild_macstudio_2x1.mp4", import.meta.url).href;
import gmTeaserVideo from "../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";
const tianHeroVideo = new URL("../../assets/project/tianair/tian_fullflow_macstudio_2x1.mp4", import.meta.url).href;

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
    description: "Defining a design language for air travel",
    date: "Fall 2025",
    tag1Label: "Design Systems",
    tag2Label: "UI Prototype",
    video: tianHeroVideo,
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
        animate={{ opacity: 1, y: 0, top: scrolled ? "8px" : "16px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[20px] right-[20px] z-50"
        style={{ top: "16px" }}
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      {/* Main body */}
      <div className="flex flex-col gap-[0px] items-start pt-[80px] pb-[10vh] px-[8vw] relative w-full">

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col gap-[36px] pt-[60px] pb-[48px] w-full"
        >
          <div
            className="text-left text-[color:var(--text\/primary,#232226)] text-[40px] tracking-[-1px] font-[400] leading-[1]"
            style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)" }}
          >
            <p className="mb-0">I'm Abby :D</p>
            <p className="mb-0">I design visual systems</p>
            <p className="mb-0">to delight and direct</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col gap-[8px] text-left font-[400] tracking-[0]"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            <p className="text-[18px] text-[#3f3e47] leading-none mb-0">Building communities with Figma Campus</p>
            <p className="text-[18px] text-[#3f3e47] leading-none mb-0">Previously refreshed Capitol Aluminum's design system</p>
            <p className="text-[14px] text-[#3f3e47] opacity-50 leading-[1.5] mb-0">+ Wrapping up my New Media Design BFA @ RIT</p>
          </motion.div>
        </motion.div>

        {/* Case study cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
          className="flex flex-wrap gap-[32px] sm:gap-[60px] items-start w-full"
        >
          {caseStudies.map((cs, i) => {
            const card = (
              <CardCasestudy
                key={i}
                className="content-stretch flex flex-col gap-[18.990px] items-start p-[14.246px] relative rounded-[8.31px] w-full"
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
                <Link key={i} to="/casestudy/figma-rit" className="w-full sm:w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 1) {
              return (
                <Link key={i} to="/casestudy/gentle-monster" className="w-full sm:w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 2) {
              return (
                <Link key={i} to="/casestudy/tian-airlines" className="w-full sm:w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 3) {
              return (
                <Link key={i} to="/casestudy/aixels" className="w-full sm:w-[calc(50%-32px)] no-underline">
                  {card}
                </Link>
              );
            }
            return <div key={i} className="w-full sm:w-[calc(50%-32px)]">{card}</div>;
          })}
        </motion.div>

      </div>

    </div>
  );
}
