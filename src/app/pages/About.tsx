import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import OfflineCard from "../components/about/OfflineCard";
import DrinkCard from "../components/drinks/DrinkCard";
import SpotifyPlayer from "../components/about/SpotifyPlayer";
import WeatherCard from "../components/about/WeatherCard";
import about1 from "../../assets/project/about/about_1.jpg";
import about3 from "../../assets/project/about/about_3.png";
import about4 from "../../assets/project/about/about_4.png";
import about5 from "../../assets/project/about/about_5.JPG";
import about6 from "../../assets/project/about/about_6.JPG";
import PhotoStack from "../components/about/PhotoStack";
import QuoteCard from "../components/about/QuoteCard";
import sfVideo from "../../assets/project/about/sanfrancisco.mov";
import icons from "../../assets/icons/icons.json";
import { useTheme } from "../context/ThemeContext";
import ArtGallery from "../components/about/ArtGallery";

const PILL_PHRASES = [
  "Like the playlist?",
  "Got a cool project?",
  "Grab a matcha?",
];
const COPY_EMAIL = "abbyxhart@gmail.com";


const glassStyle: React.CSSProperties = {
  background: "rgba(144,142,153,0.5)",
  border: "1px solid #585564",
  borderRadius: 12,
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  padding: 6,
};

function ResumeCard({ collapsed, onToggle, isDark }: { collapsed: boolean; onToggle: () => void; isDark: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewMoreExpanded, setViewMoreExpanded] = useState(false);
  const [viewMoreHovered, setViewMoreHovered] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(1);
  const [displayText, setDisplayText] = useState(PILL_PHRASES[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const displayRef = useRef(PILL_PHRASES[1]);
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx(i => (i + 1) % PILL_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = PILL_PHRASES[phraseIdx];
    if (target === displayRef.current) return;
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setIsAnimating(true);
      let curr = displayRef.current;

      // Delete phase — backspace char by char
      while (curr.length > 0 && !cancelled) {
        curr = curr.slice(0, -1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(28);
      }

      // Type phase — char by char
      while (curr.length < target.length && !cancelled) {
        curr = target.slice(0, curr.length + 1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(55);
      }

      if (!cancelled) setIsAnimating(false);
    };

    run();
    return () => { cancelled = true; };
  }, [phraseIdx]);

  const handlePillClick = () => {
    navigator.clipboard.writeText(COPY_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContentHeight(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const EXTRA_EXPERIENCES: { company: string; role: string; year: string }[] = [
    { company: "RIT College of Science", role: "Marketing Design", year: "2023-2026" },
    { company: "RIT Student Government", role: "Marketing Design", year: "2024" },
    { company: "KaleidoscopeMe", role: "Design Intern", year: "2023" },
  ];

  return (
    <div
      className="relative flex flex-col items-center w-full rounded-[8px]"
      style={{
        padding: 24,
        background: isDark ? "rgba(48,47,52,0.8)" : "rgba(233,232,239,0.8)",
      }}
    >
      {/* Chevron toggle — absolutely positioned at top center */}
      <button
        onClick={onToggle}
        className="absolute top-[2px] left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 z-10"
        style={{ width: 24, height: 24 }}
      >
        <motion.svg
          width="16"
          height="16"
          viewBox={icons.navigation.chevron.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
        >
          <path
            d={icons.navigation.chevron.paths[0].d}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Header pill — always visible */}
      <div
        className="flex items-center justify-between w-full px-[12px] py-[4px] rounded-[4px] cursor-none"
        style={{ background: pillHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", transition: "background 0.2s ease", position: "relative" }}
        onMouseEnter={() => setPillHovered(true)}
        onMouseLeave={() => setPillHovered(false)}
        onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
        onClick={handlePillClick}
      >
        <div className="flex gap-[8px] items-center">
          <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] whitespace-nowrap" style={{ color: "#302f34" }}>Abby Hart</p>
          <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] w-[63px]" style={{ color: "#302f34" }}>NYC/SF</p>
        </div>

        {/* Right side: scramble phrase + copy label inline */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            color: "#847f90",
            margin: 0,
            minWidth: 150,
            textAlign: "right",
          }}>
            {displayText}{isAnimating && <span style={{ opacity: 0.7 }}>|</span>}
          </p>
          <p style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            color: "rgba(132,127,144,0.7)",
            margin: 0,
          }}>
            {copied ? "Email Copied!" : "Copy Email"}
          </p>
        </div>

        {/* Custom cursor tooltip */}
        {pillHovered && (
          <div
            style={{
              position: "fixed",
              left: cursorPos.x + 12,
              top: cursorPos.y + 12,
              pointerEvents: "none",
              zIndex: 9999,
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 4,
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied!" : "Copy Email"}
          </div>
        )}
      </div>

      {/* Collapsible content */}
      <motion.div
        animate={{
          height: collapsed ? 0 : contentHeight,
          opacity: collapsed ? 0 : 1,
          marginTop: collapsed ? 0 : 17,
        }}
        transition={{ duration: collapsed ? 0.35 : 0.65, ease: [0.33, 0, 0, 1] }}
        style={{ overflow: "hidden", pointerEvents: collapsed ? "none" : "auto" }}
        className="w-full"
      >
            <div ref={contentRef} className="flex flex-col gap-[17px]">
              {/* Education */}
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5]" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>Rochester Institute of Technology</p>
                <div className="flex flex-col gap-[2px]">
                  <div className="flex gap-[4px] items-center w-full">
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] flex-1" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>New Media Design</p>
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#908e99" : "#847f90" }}>2026 BFA</p>
                  </div>
                  <div className="flex gap-[4px] items-center w-full">
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] flex-1" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>Mobile Design & Development, Fine Arts</p>
                    <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#908e99" : "#847f90" }}>Minors</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5]" style={{ color: isDark ? "#908e99" : "#847f90" }}>Experience</p>
                <div className="flex flex-col gap-[12px]">
                  {[
                    { company: "Figma", role: "Brand Activations / Campus Leadership", year: "2025" },
                    { company: "Vallure Agency", role: "Interdisciplinary Design (Contract)", year: "2025" },
                    { company: "Capitol Aluminum", role: "Product Design", year: "2024" },
                  ].map(({ company, role, year }) => (
                    <div key={company} className="flex gap-[42px] items-center w-full">
                      <div className="flex gap-[8px] items-center flex-1 min-w-0">
                        <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] shrink-0" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{company}</p>
                        <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] truncate" style={{ color: isDark ? "#908e99" : "#847f90" }}>{role}</p>
                      </div>
                      <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{year}</p>
                    </div>
                  ))}
                  <AnimatePresence initial={false}>
                    {viewMoreExpanded && EXTRA_EXPERIENCES.length > 0 && (
                      <motion.div
                        key="extra"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
                        style={{ overflow: "hidden" }}
                        className="flex flex-col gap-[12px]"
                      >
                        {EXTRA_EXPERIENCES.map(({ company, role, year }) => (
                          <div key={company} className="flex gap-[42px] items-center w-full">
                            <div className="flex gap-[8px] items-center flex-1 min-w-0">
                              <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] shrink-0" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{company}</p>
                              <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] truncate" style={{ color: isDark ? "#908e99" : "#847f90" }}>{role}</p>
                            </div>
                            <p className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.5] text-right shrink-0 w-[70px]" style={{ color: isDark ? "#faf9ff" : "#302f34" }}>{year}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setViewMoreExpanded(v => !v)}
                    onMouseEnter={() => setViewMoreHovered(true)}
                    onMouseLeave={() => setViewMoreHovered(false)}
                    className="font-['Inter_Tight',sans-serif] text-[12px] leading-[1.5] bg-transparent border-0 p-0 cursor-pointer text-left"
                    style={{
                      color: isDark ? (viewMoreHovered ? "#faf9ff" : "#908e99") : (viewMoreHovered ? "#302f34" : "#847f90"),
                      textDecoration: "underline",
                      textDecorationStyle: "dotted",
                      textDecorationColor: isDark ? (viewMoreHovered ? "#faf9ff" : "#908e99") : (viewMoreHovered ? "#302f34" : "#847f90"),
                      transition: "color 0.15s ease, text-decoration-color 0.15s ease",
                    }}
                  >
                    {viewMoreExpanded ? "View Less" : "View More"}
                  </button>
                </div>
              </div>
            </div>
      </motion.div>
    </div>
  );
}


export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [resumeCollapsed, setResumeCollapsed] = useState(true);
  const [stackPeek, setStackPeek] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 700);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const checkFooter = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      setFooterVisible(footer.getBoundingClientRect().top < window.innerHeight);
    };
    checkFooter();
    window.addEventListener('scroll', checkFooter, { passive: true });
    return () => window.removeEventListener('scroll', checkFooter);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.scrollY <= 60) setResumeCollapsed(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10 && y > lastScrollY);
      if (y > 60) setResumeCollapsed(true);
      if (y > 60) setStackPeek(true);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
          >
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 20%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 20%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 35%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 35%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 75%)" }} />
            <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(0.5px)", WebkitBackdropFilter: "blur(0.5px)", maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark
                ? "linear-gradient(to bottom, rgba(22,22,23,0.85) 0%, rgba(22,22,23,0.55) 30%, rgba(22,22,23,0.2) 65%, rgba(22,22,23,0) 100%)"
                : "linear-gradient(to bottom, rgba(242,242,246,0.75) 0%, rgba(242,242,246,0.48) 30%, rgba(242,242,246,0.18) 65%, rgba(242,242,246,0) 100%)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LinkedIn button — fixed top right */}
      <a
        href="https://linkedin.com/in/abbyxhart"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed z-50 items-center gap-[9px] p-[7px] pl-[12px] pr-[16px] rounded-[24px] select-none"
        style={{
          top: "calc(env(safe-area-inset-top) + 16px)",
          right: "calc(4.5vw + 100px)",
          backgroundColor: "var(--color-surface-fill3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          height: 32,
          fontFamily: "'Inter Tight', sans-serif",
          textDecoration: "none",
        }}
      >
        <div className="relative shrink-0 size-[18px]">
          <div className="absolute inset-[6.25%]">
            <svg width="100%" height="100%" viewBox={icons.social.linkedin.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={icons.social.linkedin.paths[0].d} fill="var(--color-text-primary)" />
            </svg>
          </div>
        </div>
        <div className="flex gap-[2px] items-center">
          {["C", "V"].map(key => (
            <div key={key} className="flex flex-col items-center justify-center rounded-[4px] shrink-0 size-[18px]" style={{ backgroundColor: "var(--color-surface-secondary-active)" }}>
              <p className="leading-[normal] text-[10px] text-center" style={{ color: "var(--color-text-secondary)", margin: 0 }}>{key}</p>
            </div>
          ))}
        </div>
      </a>

      {/* ══ Section 1: 100vh — bio, side panels, DrinkCard ══ */}
      <div className="relative px-[2vw]" style={{ paddingTop: 140, minHeight: "100vh" }}>

        {/* Resume card — desktop only, page-centered, bottom of section */}
        <motion.div
          className="hidden xl:block fixed z-10 overflow-hidden rounded-[8px]"
          style={{ bottom: 0, left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: 520, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: footerVisible ? 0 : 1, pointerEvents: footerVisible ? "none" : "auto" }}
          transition={{ opacity: footerVisible ? { duration: 0 } : { duration: 0.3, ease: "easeOut" } }}
        >
          <ResumeCard collapsed={resumeCollapsed} onToggle={() => setResumeCollapsed(v => !v)} isDark={isDark} />
        </motion.div>

        {/* Desktop xl */}
        <div className="hidden xl:block">
          <div className="relative" style={{ minHeight: "calc(100vh - 140px)" }}>

            {/* Left: SF video + weather */}
            <div
              className="absolute"
              style={{ left: 0, top: 30, width: 270 }}
            >
              <div className="relative w-full rounded-[8px] overflow-hidden" style={{ aspectRatio: "3/2", background: "#201f23" }}>
                <video ref={videoRef} src={sfVideo} muted loop playsInline preload="auto" onCanPlay={() => setVideoVisible(true)} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: videoVisible ? 1 : 0, transition: "opacity 0.5s ease" }} />
                <div
                  className="absolute inset-x-0 top-0 h-[72px] pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)" }}
                />
                <div className="absolute top-[14px] left-[14px] flex flex-col gap-[5px]">
                  <p className="font-[‘Inter_Tight’,sans-serif] text-[13px] leading-none" style={{ color: "#fff" }}>Hello from SF!</p>
                  <p className="font-[‘Inter_Tight’,sans-serif] text-[13px] leading-none" style={{ color: "rgba(255,255,255,0.65)" }}>
                   Config 2026
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <WeatherCard style={{ ...glassStyle, border: "none", aspectRatio: "1/1", width: 130 }} />
              </div>
            </div>

            {/* Left: SpotifyPlayer */}
            <div
              className="absolute"
              style={{ left: 130, bottom: 50, width: 260 }}
            >
              <div className="w-full relative overflow-hidden" style={{ borderRadius: 8, aspectRatio: "1/1" }}>
                <SpotifyPlayer />
              </div>
            </div>

            {/* Right: OfflineCard */}
            <div
              className="absolute"
              style={{ right: 0, top: 0, width: 260 }}
            >
              <OfflineCard />
            </div>

            {/* Right: DrinkCard */}
            <div
              className="absolute"
              style={{ right: 260, bottom: 50 }}
            >
              <DrinkCard size={130} />
            </div>


            {/* Centered primary content */}
            <div className="relative mx-auto" style={{ maxWidth: 520, paddingBottom: 48 }}>
              <div className="flex flex-col gap-[56px]">
                  <div className="flex flex-col gap-[24px]">
                    <p className="font-[‘Inter_Tight’,sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
                      Nice to meet you
                    </p>
                    <div className="font-[‘Inter’,sans-serif] font-regular text-foreground text-[17px]" style={{ letterSpacing: "-0.06em" }}>
                      <p className="leading-[1.65] mb-[16px]">Hey, I’m Abby! Product designer and creative technologist.</p>
                      <p className="leading-[1.65]">
                       The work I’m most proud of helps people navigate and explore tools, products, and worlds. To me, design is about connection.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[24px]">
                    <p className="font-[‘Inter_Tight’,sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
                      How I fell into it
                    </p>
                    <p className="font-[‘Inter_Tight’,sans-serif] font-regular text-foreground text-[16px] leading-[1.65]">
                      My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with algorithms.
                      I opened Figma to pitch our local hackathon for kids, and that road eventually led me to RIT and
                      some incredibly inspiring friends.
                    </p>
                  </div>
                  <motion.div
                    animate={{ marginTop: stackPeek ? 0 : -100 }}
                    transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
                  >
                    <PhotoStack
                      images={[about1, about3, about4, about5, about6]}
                      captions={[
                        "Lana & Me @ CC Meet (our team won!)",
                        "Charlotte, Miggi, Troy, Me & Lasya @ Figma x NMC",
                        "Angie, Me, Ivo, TJ, & Leah @ NYC",
                        "Cathy & Me @ Magic Studio",
                        "Shannon, Huilin & Me @ Izakaya Mew",
                      ]}
                      peekVisible={stackPeek}
                    />
                  </motion.div>
                </div>
            </div>

          </div>
          <div className="mx-auto" style={{ maxWidth: 520, paddingTop: 10 }}>
            <QuoteCard height={260} />
          </div>
        </div>

        {/* Tablet md–xl */}
        <div className="hidden md:block xl:hidden">
          <div className="relative" style={{ minHeight: "calc(100vh - 140px)" }}>

            {/* Right: OfflineCard */}
            <div
              className="absolute"
              style={{ right: 0, top: 0, width: 190 }}
            >
              <OfflineCard />
            </div>

            {/* Right: DrinkCard */}
            <div
              className="absolute"
              style={{ right: 190, bottom: 50 }}
            >
              <DrinkCard size={95} />
            </div>


            {/* Centered primary content */}
            <div className="relative mx-auto" style={{ maxWidth: 520, paddingBottom: 48 }}>
              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[24px]">
                  <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
                    Nice to meet you
                  </p>
                  <div className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[17px]">
                    <p className="text-[14px] leading-[1.65] mb-[16px]">Hey, I'm Abby! Product designer and creative technologist.</p>
                    <p className="leading-[1.65]">
                      The work I'm most proud of helps people navigate and explore tools, products, and worlds. To me, design is about connection.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
                    How I fell into it
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[17px] leading-[1.65]">
                    My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with algorithms.
                    I opened Figma to pitch our local hackathon for kids, and that road eventually led me to RIT and
                    some incredibly inspiring friends.
                  </p>
                </div>
                <motion.div
                  animate={{ marginTop: stackPeek ? 0 : -100 }}
                  transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
                >
                  <PhotoStack
                      images={[about1, about3, about4, about5, about6]}
                      captions={[
                        "Lana & Me @ CC Meet (our team won!)",
                        "Charlotte, Miggi, Troy, Me & Lasya @ Figma x NMC",
                        "Angie, Me, Ivo, TJ, & Leah @ NYC",
                        "Cathy & Me @ Magic Studio",
                        "Shannon, Huilin & Me @ Izakaya Mew",
                      ]}
                      peekVisible={stackPeek}
                    />
                </motion.div>
              </div>
            </div>

          </div>
          <div className="mx-auto" style={{ maxWidth: 520, paddingTop: 10 }}>
            <QuoteCard height={260} />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-[40px] md:hidden pt-[20px] pb-[40px]">
          <div className="flex flex-col gap-[24px]">
            <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
              Nice to meet you
            </p>
            <div className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[17px]">
              <p className="text-[14px] leading-[1.65] mb-[16px]">Hey, I'm Abby! Product designer and creative technologist.</p>
              <p className="leading-[1.65]">
                The work I'm most proud of helps people navigate and explore tools, products, and worlds. To me, design is about connection.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[14px] leading-[1.5]">
              How I fell into it
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[17px] leading-[1.65]">
              My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with algorithms.
              I opened Figma to pitch our local hackathon for kids, and that road eventually led me to RIT and
              some incredibly inspiring friends.
            </p>
          </div>
          <div className="animate-[fadeSlideIn_0.5s_ease-out_both]">
            <OfflineCard />
          </div>
          <div className="animate-[fadeSlideIn_0.5s_ease-out_both]">
            <DrinkCard />
          </div>
        </div>
      </div>

      {/* ══ Section 2: Art Gallery ══ */}
      <div className="px-[2vw] pt-[8vh] pb-[14vh]">
        <ArtGallery />
      </div>
    </div>
  );
}
