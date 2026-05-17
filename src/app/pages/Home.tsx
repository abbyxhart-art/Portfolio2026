import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { Link } from "react-router";
import { useCursor } from "../context/CursorContext";
import linkedInIcon from "../../assets/linkedin.svg";
import Navigation from "../../imports/Navigation";

function LinkedInButton() {
  useEffect(() => {
    let lastKey = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        lastKey = "c";
      } else if (e.key.toLowerCase() === "v" && lastKey === "c") {
        window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer");
        lastKey = "";
      } else {
        lastKey = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setHover = (el: HTMLButtonElement) => { el.style.backgroundColor = "#28262b"; };
  const setDefault = (el: HTMLButtonElement) => { el.style.backgroundColor = "#1f1e21"; };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="fixed top-[16px] right-[16px] z-50 p-[4px]"
    >
      <button
        onClick={() => window.open("https://linkedin.com/in/abbyxhart", "_blank", "noopener,noreferrer")}
        onMouseEnter={e => setHover(e.currentTarget)}
        onMouseLeave={e => setDefault(e.currentTarget)}
        onMouseDown={e => setHover(e.currentTarget)}
        onMouseUp={e => setHover(e.currentTarget)}
        className="flex items-center gap-[9px] pl-[12px] pr-[16px] py-[8px] rounded-[24px] cursor-pointer select-none"
        style={{
          border: "1px solid #302f34",
          backgroundColor: "#1f1e21",
          transition: "background-color 0.15s ease",
          fontFamily: "'Inter Tight', sans-serif",
          outline: "none",
        }}
      >
        <div className="flex items-center gap-[9px]" style={{ pointerEvents: "none" }}>
          <div className="relative shrink-0 size-[24px]">
            <div className="absolute inset-[6.25%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={linkedInIcon} />
            </div>
          </div>
          <div className="flex gap-[2px] items-center">
            {["C", "V"].map(key => (
              <div key={key} className="content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[4px] shrink-0 size-[24px]" style={{ backgroundColor: "rgba(144,142,153,0.2)" }}>
                <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[12px] text-center whitespace-nowrap" style={{ color: "#b8b4c5" }}>
                  <p className="leading-[normal]">{key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </button>
    </motion.div>
  );
}
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
  readTime: string;
  image?: string;
  video?: string;
}[] = [
  {
    accentType: "2",
    title: "FigBuild 2026 Badges",
    description: "Bringing a digital playground to students with Figma for Edu",
    date: "Spring 2026",
    tag1Label: "Agentic Design",
    tag2Label: "Brand Activation",
    readTime: "2 min read",
    video: figbuildMacstudioVideo,
  },
  {
    accentType: "1",
    title: "Gentle Monster Kiosk",
    description: "Incepting a luxury kiosk with research and design systems",
    date: "Spring 2025",
    tag1Label: "Research",
    tag2Label: "Design Systems",
    readTime: "6 min read",
    video: gmTeaserVideo,
  },
  {
    accentType: "3",
    title: "Tian Airways",
    description: "Defining a design language for air travel",
    date: "Fall 2025",
    tag1Label: "Design Systems",
    tag2Label: "UI Prototype",
    readTime: "3 min read",
    video: tianHeroVideo,
  },
  {
    accentType: "4",
    title: "AIXELS",
    description: "Winning Creative Collision with a pixel mirror made of AI logos",
    date: "Fall 2025",
    tag1Label: "Agentic Design",
    tag2Label: "Designathon",
    readTime: "2 min read",
    image: aixelsMeImg,
  },
];

type TrailDot = { id: number; x: number; y: number; createdAt: number };

const GRID = 15;
const FADE_MS = 700;

export default function Home() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const { setIsInHero } = useCursor();
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      setTrail(prev => {
        if (prev.length === 0) return prev;
        return prev.filter(t => now - t.createdAt < FADE_MS);
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / GRID) * GRID;
    const y = Math.floor((e.clientY - rect.top)  / GRID) * GRID;
    const now = Date.now();
    setTrail(prev => {
      const last = prev[prev.length - 1];
      if (last && last.x === x && last.y === y) return prev;
      return [...prev, { id: trailIdRef.current++, x, y, createdAt: now }];
    });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      {/* Top Purple Gradient */}
      <div
        className="absolute inset-x-0 z-0 h-[800px] pointer-events-none"
        style={{
          top: "-620px",
          background: "radial-gradient(ellipse 80% 500px at 50% 50%, rgba(154,71,255,0.3) 0%, rgba(154,71,255,0) 80%)",
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
              background: "linear-gradient(to bottom, rgba(23, 23, 23, 0.98) 0%, rgba(23, 23, 23, 0.85) 25%, rgba(23, 23, 23, 0.35) 55%, rgba(23, 23, 23, 0.05) 80%, rgba(23, 23, 23, 0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <LinkedInButton />

      {/* Name plate */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        className="fixed top-[16px] left-[16px] z-50 flex flex-col items-start leading-[1.5] pointer-events-none"
        style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)", color: "#b8b4c5" }}
      >
        <p className="mb-0 text-[17px]" style={{ fontWeight: 350 }}>Abby Hart</p>
        <p className="mb-0 text-[12px] leading-[1.5]" style={{ color: "#7e7c87" }}>UX, Product</p>
      </motion.div>

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
      <div className="flex flex-col gap-[0px] items-center pt-[140px] pb-[14vh] px-[5vw] relative w-full">

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center text-center gap-[6px] pt-[8px] pb-[96px] w-full relative"
          style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)" }}
          onMouseMove={handleHeroMouseMove}
          onMouseEnter={() => setIsInHero(true)}
          onMouseLeave={() => setIsInHero(false)}
        >
          {(() => {
            const now = Date.now();
            return trail.map(t => {
              const opacity = Math.max(0, 1 - (now - t.createdAt) / FADE_MS);
              return (
                <div
                  key={t.id}
                  className="absolute pointer-events-none"
                  style={{ left: t.x, top: t.y, width: GRID, height: GRID, background: "#9a47ff", opacity }}
                />
              );
            });
          })()}
          <div
            className="text-[color:var(--text\/primary,#eeedf5)] leading-[1.1] whitespace-nowrap"
            style={{ fontSize: "82px", fontWeight: 350 }}
          >
            <p className="mb-0">{`I'm a creative technologist`}</p>
            {/* <p className="mb-0">i'm a creative echnologist.</p> */}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col items-center gap-[8px] w-auto"
          >
            <div className="flex flex-col text-[color:var(--text\/secondary,#908e99)] text-[20px] leading-[1.65] whitespace-nowrap">
              <p className="mb-0" style={{ fontWeight: 300 }}>designing visual systems to delight and direct + building communities with Figma Campus</p>
            </div>
            <p className="text-[14px] leading-[1.5] mb-0 font-[300] text-[color:var(--text\/tertiary,#7e7c87)]">
              {`+ Wrapping up my `}
              <Link
                to="/booth"
                className="decoration-dotted underline-offset-[4px] transition-colors duration-150"
                style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", color: "inherit" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#faf9ff")}
                onMouseLeave={e => (e.currentTarget.style.color = "inherit")}
              >New Media Design</Link>
              {` BFA @ RIT`}
            </p>
          </motion.div>
        </motion.div>

        {/* Case study cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
          className="flex flex-wrap gap-[16px] items-start w-full px-[4vw]"
        >
          {caseStudies.map((cs, i) => {
            const card = (
              <CardCasestudy
                key={i}
                className="content-stretch flex flex-col gap-[10px] items-start p-[8px] relative rounded-[8.31px] w-full"
                accentType={cs.accentType}
                title={cs.title}
                description={cs.description}
                date={cs.date}
                tag1Label={cs.tag1Label}
                tag2Label={cs.tag2Label}
                readTime={cs.readTime}
                image={cs.image}
                video={cs.video}
              />
            );
            if (i === 0) {
              return (
                <Link key={i} to="/casestudy/figma-rit" className="w-full sm:w-[calc(50%-8px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 1) {
              return (
                <Link key={i} to="/casestudy/gentle-monster" className="w-full sm:w-[calc(50%-8px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 2) {
              return (
                <Link key={i} to="/casestudy/tian-airlines" className="w-full sm:w-[calc(50%-8px)] no-underline">
                  {card}
                </Link>
              );
            }
            if (i === 3) {
              return (
                <Link key={i} to="/casestudy/aixels" className="w-full sm:w-[calc(50%-8px)] no-underline">
                  {card}
                </Link>
              );
            }
            return <div key={i} className="w-full sm:w-[calc(50%-8px)]">{card}</div>;
          })}
        </motion.div>

      </div>

    </div>
  );
}
