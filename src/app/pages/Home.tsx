import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { Link } from "react-router";
import Navigation from "../../imports/Navigation";
import CardCasestudy, { AccentType } from "../components/CardCasestudy";
import aixelsMeImg from "../../assets/project/aixels/me.JPG";
import meImg from "../../assets/project/about/me.png";
import sprayCanCursor from "../../assets/spray-can-cursor.svg";
import undoArrow from "../../assets/undo-arrow.svg";
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
    tag1Label: "Agentic Design",
    tag2Label: "Designathon",
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
  const [scrollingUp, setScrollingUp] = useState(false);
  const [sprayPos, setSprayPos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const selectedColorRef = useRef<string>('#9A47FF');

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      isDrawingRef.current = false;
      lastPosRef.current = null;
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'x') clearCanvas();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [clearCanvas]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawingRef.current) {
        const canvas = canvasRef.current;
        if (canvas && lastPosRef.current && selectedColorRef.current) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const radius = 28;
            const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
            const steps = Math.max(1, Math.floor(dist / 6));
            for (let i = 0; i <= steps; i++) {
              const t = i / steps;
              const px = lastPosRef.current.x + (x - lastPosRef.current.x) * t;
              const py = lastPosRef.current.y + (y - lastPosRef.current.y) * t;
              const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
              grad.addColorStop(0,   'rgba(154,71,255,0.18)');
              grad.addColorStop(0.5, 'rgba(154,71,255,0.06)');
              grad.addColorStop(1,   'rgba(154,71,255,0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(px, py, radius, 0, Math.PI * 2);
              ctx.fill();
              const numDots = 18;
              for (let d = 0; d < numDots; d++) {
                const angle = Math.random() * Math.PI * 2;
                const r = radius * Math.sqrt(Math.random());
                const dx = Math.cos(angle) * r;
                const dy = Math.sin(angle) * r;
                const distRatio = Math.hypot(dx, dy) / radius;
                const dotOpacity = (1 - distRatio) * 0.6 + 0.1;
                const dotRadius = Math.random() * 1.2 + 0.4;
                ctx.fillStyle = `rgba(154,71,255,${dotOpacity.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(px + dx, py + dy, dotRadius, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            lastPosRef.current = { x, y };
            setSprayPos({ x: e.clientX, y: e.clientY });
          }
        }
        return;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        setSprayPos(inside ? { x: e.clientX, y: e.clientY } : null);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        animate={{ opacity: 1, y: 0, top: scrolled ? "8px" : "16px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[20px] right-[20px] z-50"
        style={{ top: "16px" }}
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      {/* Main body */}
      <div className="flex flex-col gap-[0px] items-start pt-[80px] pb-[10vh] px-[8vw] relative w-full">

        {/* Landing Page Section */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="h-[340px] relative shrink-0 w-full"
        >

          {/* Macscreen mockup — skeuomorphic with 3D mouse tracking */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1400px] h-[320px]"
          >
            <div className="w-full h-full">
              {/* Outer frame */}
              <div
                className="absolute inset-0 bg-[#faf9ff] border border-[#d1cedc] rounded-[12px] overflow-hidden p-[8px]"
                style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.15)" }}
              >
                {/* Inner frame */}
                <div
                  className="w-full h-full bg-[#faf9ff] border border-[#d1cedc] rounded-[8px] relative overflow-hidden"
                  style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.15)" }}
                >
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ cursor: 'none' }}
                    onMouseDown={(e) => {
                      isDrawingRef.current = true;
                      const rect = canvasRef.current!.getBoundingClientRect();
                      lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                    }}
                  />
                  <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
                        className="absolute top-[12px] right-[12px] z-10"
                      >
                        <button
                          onClick={clearCanvas}
                          className="bg-[#faf9ff] border border-[#d1cedc] flex items-center gap-[9px] pl-[12px] pr-[16px] py-[8px] rounded-[24px]"
                          style={{ borderWidth: '0.75px' }}
                        >
                          <div className="relative shrink-0 size-[24px] overflow-clip">
                            <div className="absolute inset-[20.83%_12.5%]">
                              <img alt="" src={undoArrow} className="block w-full h-full" style={{ inset: '-4.07% -3.17%', position: 'absolute', maxWidth: 'none' }} />
                            </div>
                          </div>
                          <div className="flex items-center gap-[2px]">
                            {["shift", "X"].map(k => (
                              <div key={k} className={`bg-[#e8e7f0] h-[24px] rounded-[4px] flex items-center justify-center ${k === "shift" ? "px-[8px]" : "w-[24px]"}`}>
                                <span className="font-['Inter_Tight',sans-serif] text-[12px] text-[#585564]">{k}</span>
                              </div>
                            ))}
                          </div>
                        </button>
                      </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade gradient — fades macbook into page background */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[1600px] h-[240px] pointer-events-none"
            style={{
              top: "180px",
              background: "linear-gradient(to top, #faf9ff 52%, rgba(250,249,255,0) 100%)",
            }}
          />

          {/* Hero text — lives outside the macbook stacking context so it renders above the gradient */}
          <div className="absolute top-[32px] left-[calc(50%-652px)] z-[10] pointer-events-none flex flex-col gap-[36px]">
            <div
              className="text-left text-[color:var(--text\/primary,#232226)] text-[40px] tracking-[-1px] font-[400] leading-[1]"
              style={{ fontFamily: "var(--text-font/default, 'Inter Tight', sans-serif)" }}
            >
              <p className="flex items-center gap-[8px] mb-0">I'm Abby <img src={meImg} alt="" className="inline-block size-[37px] shrink-0 object-cover object-top" /> :D</p>
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
          </div>



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

      {/* Spray can cursor — follows mouse over canvas */}
      {sprayPos && (
        <img
          src={sprayCanCursor}
          alt=""
          style={{
            position: 'fixed',
            left: sprayPos.x,
            top: sprayPos.y,
            width: 21,
            height: 45,
            transform: 'translate(-10px, -1px)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}
