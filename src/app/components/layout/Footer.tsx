import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import icons from "../../../assets/icons/icons.json";
import LSystemGarden, { LSystemGardenHandle } from "../LSystemGarden";

const FOOTER_PHRASES = [
  "Got a cool project?",
  "Grab a matcha?",
  "Got good Beli recs?",
  "Want to know how I made stuff?",
];

const COPY_EMAIL = "abbyxhart@gmail.com";

const navLinks = [
  { label: "Work", to: "/" },
  { label: "About", to: "/about" },
];

const socialLinks = [
  { key: "instagram", href: "https://instagram.com/abbyxhart.art", label: "Instagram", icon: icons.social.instagram, stroke: false, iconViewBox: "1 1 16 16" },
  { key: "linkedin", href: "https://www.linkedin.com/in/abbyxhart/", label: "LinkedIn", icon: icons.social.linkedin, stroke: false, iconViewBox: "0 0 24 24" },
  { key: "email", href: "mailto:abbyxhart@gmail.com?subject=Love%20your%20work%2C%20let%27s%20chat", label: "Email", icon: icons.social.email, stroke: true, iconViewBox: "1 1 16 16" },
  { key: "twitter", href: "https://x.com/abbyxhart", label: "Twitter", icon: icons.social.twitter, stroke: false, iconViewBox: "1 1 16 16" },
];

type IconData = { viewBox: string; paths: { d: string }[] };

function SocialPill({ href, label, icon, stroke, iconViewBox }: { href: string; label: string; icon: IconData; stroke: boolean; iconViewBox: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(88,85,100,0.4)" : "rgba(88,85,100,0.2)",
        borderRadius: 24,
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.15s ease",
      }}
    >
      <svg width="18" height="18" viewBox={iconViewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        {icon.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={stroke ? "none" : "var(--color-text-primary)"}
            stroke={stroke ? "var(--color-text-primary)" : "none"}
            strokeWidth={stroke ? 1.5 : undefined}
            strokeLinecap={stroke ? "round" : undefined}
            strokeLinejoin={stroke ? "round" : undefined}
          />
        ))}
      </svg>
    </a>
  );
}

function AnimatedNavLink({ label, to }: { label: string; to: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={to}
      className="relative shrink-0 w-full no-underline font-['Inter_Tight',sans-serif] font-[300] text-[14px] leading-none"
      style={{ color: isHovered ? "var(--color-accent-default)" : "var(--color-text-primary)", transition: "color 100ms ease" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </Link>
  );
}

function ClearGardenButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const icon = icons.navigation["arrow-undo-left"];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Clear garden"
      className="hidden md:flex absolute bottom-[16px] right-[16px] items-center gap-[8px] cursor-pointer"
      style={{
        backgroundColor: hovered ? "var(--color-surface-secondary-hover)" : "var(--color-surface-fill3)",
        borderRadius: 24,
        padding: "6px 12px 6px 10px",
        border: "none",
        flexShrink: 0,
        transition: "background-color 0.15s ease",
      }}
    >
      <svg width="16" height="16" viewBox={icon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={icon.paths[0].d}
          stroke="var(--color-text-secondary)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex gap-[2px] items-center">
        {["shift", "X"].map((key) => (
          <div key={key} className={`h-[20px] rounded-[4px] flex items-center justify-center ${key === "shift" ? "px-[6px]" : "w-[20px]"}`} style={{ backgroundColor: "var(--color-surface-fill2)" }}>
            <span className="font-['Inter_Tight',sans-serif] text-[11px]" style={{ color: "var(--color-text-secondary)" }}>{key}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

export default function Footer() {
  const [hasFlowers, setHasFlowers] = useState(false);
  const gardenRef = useRef<LSystemGardenHandle>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Typewriter animation state
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState(FOOTER_PHRASES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const displayRef = useRef(FOOTER_PHRASES[0]);
  const [inView, setInView] = useState(false);

  // Cursor hover state
  const [pillHovered, setPillHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  const clearGarden = useCallback(() => {
    gardenRef.current?.reset();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "x") clearGarden();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [clearGarden]);

  // Track whether footer is visible
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset to first phrase each time footer enters view
          setPhraseIdx(0);
          displayRef.current = FOOTER_PHRASES[0];
          setDisplayText(FOOTER_PHRASES[0]);
          setIsAnimating(false);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cycle through phrases only when in view
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPhraseIdx(i => (i + 1) % FOOTER_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [inView]);

  // Typewriter effect on phrase change
  useEffect(() => {
    const target = FOOTER_PHRASES[phraseIdx];
    if (target === displayRef.current) return;
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      setIsAnimating(true);
      let curr = displayRef.current;

      while (curr.length > 0 && !cancelled) {
        curr = curr.slice(0, -1);
        displayRef.current = curr;
        setDisplayText(curr);
        await delay(28);
      }

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

  const handlePhraseClick = () => {
    navigator.clipboard.writeText(COPY_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer ref={footerRef} className="bg-[var(--color-surface-primary-default)] border-t border-[var(--color-border-default)] flex flex-col items-start overflow-clip px-[16px] md:px-[50px] pb-[16px] pt-[50px] relative w-full gap-[32px] md:gap-[80px]">

      {/* Garden background — desktop only */}
      <div className="hidden md:block absolute inset-0">
        <LSystemGarden ref={gardenRef} onHasFlowers={setHasFlowers} />
      </div>

      {/* Purple Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 420px at 50% 100%, rgba(243, 155, 139, 0.18) 0%, rgba(220, 110, 190, 0.12) 28%, rgba(154, 71, 255, 0.06) 55%, transparent 100%)",
        }}
      />

      {/* Top Row: Left side + Nav */}
      <div className="flex flex-col md:flex-row items-start justify-between relative shrink-0 w-full gap-[32px] md:gap-0">

        {/* Left Side */}
        <div className="flex flex-col gap-[42px] items-start shrink-0">

          {/* Tagline */}
          <div className="flex flex-col gap-[4px] items-start shrink-0 w-[235px]">
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[17px] w-full" style={{ color: "var(--color-text-primary)" }}>
              I design for connection
            </p>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <svg width="18" height="18" viewBox={icons.navigation.arrowUp.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d={icons.navigation.arrowUp.paths[0].d} stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[17px] whitespace-nowrap" style={{ color: "var(--color-text-primary)" }}>
                It was nice to meet you!
              </p>
            </div>
          </div>

          {/* Contact blurb + social pills */}
          <div className="flex flex-col gap-[16px] items-start shrink-0">
            <div className="flex flex-col gap-[8px] items-start font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px]">
              {/* Animated cycling phrase */}
              <p
                className="cursor-none select-none"
                style={{ color: "var(--color-text-primary)", minWidth: 200 }}
                onMouseEnter={() => setPillHovered(true)}
                onMouseLeave={() => setPillHovered(false)}
                onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
                onClick={handlePhraseClick}
              >
                {displayText}{isAnimating && <span style={{ opacity: 0.6 }}>|</span>}
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>I can be easily reached at your convenience!</p>
            </div>
            <div className="flex gap-[8px] items-center shrink-0">
              {socialLinks.map((s) => (
                <SocialPill key={s.key} href={s.href} label={s.label} icon={s.icon} stroke={s.stroke} iconViewBox={s.iconViewBox} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Main nav */}
        <div className="flex flex-col gap-[32px] items-start shrink-0">
          <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-none" style={{ color: "var(--color-text-secondary)" }}>Main</p>
          <div className="flex flex-col gap-[16px] items-start shrink-0">
            {navLinks.map(({ label, to }) => (
              <AnimatedNavLink key={label} label={label} to={to} />
            ))}
          </div>
        </div>
      </div>

      {/* Hover Directions — desktop only, centered */}
      <div className="hidden md:flex flex-col gap-[5px] items-center font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px] w-full whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>
        <p>Play around, you never know what may grow from it!</p>
        <p>Hover based on the book: the algorithmic beauty of plants</p>
      </div>

      {/* Made with */}
      <div className="md:absolute md:bottom-[15px] md:left-[50px] flex flex-col gap-[8px] items-start font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px]">
        <p style={{ color: "var(--color-text-primary)" }}>Made with</p>
        <p style={{ color: "var(--color-text-secondary)" }}>
          {'Figma {Design, Motion, MCP} → Claude → Git → Vercel'}
        </p>
      </div>

      {hasFlowers && <ClearGardenButton onClick={clearGarden} />}

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
            borderRadius: 6,
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "Email Copied!" : "Copy Email"}
        </div>
      )}
    </footer>
  );
}
