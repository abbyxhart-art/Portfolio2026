import { useCallback, useEffect, useRef, useState } from "react";
import icons from "../../../assets/icons/icons.json";
import LSystemGarden, { LSystemGardenHandle } from "../LSystemGarden";
import { useIsMobile } from "../ui/use-mobile";
import ThemeToggle from "./ThemeToggle";

const FOOTER_PHRASES = [
  "Got a cool project?",
  "Grab a matcha?",
  "Got good Beli recs?",
  "Want to know how I made stuff?",
];

const COPY_EMAIL = "abbyxhart@gmail.com";

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
        border: "1px solid var(--color-border-default)",
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

function ClearGardenButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const icon = icons.navigation["arrow-undo-left"];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Clear garden"
      className="hidden md:flex absolute bottom-[64px] right-[16px] items-center gap-[8px] cursor-pointer"
      style={{
        backgroundColor: hovered ? "var(--color-surface-fill2)" : "var(--color-surface-fill3)",
        borderRadius: 24,
        padding: "6px 12px 6px 10px",
        border: "1px solid var(--color-border-default)",
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
  const isMobile = useIsMobile();
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

  // Scroll-gated reveal: the footer is a fixed full-screen panel, off-screen
  // by default. Page scrolling is blocked once it's open; scrolling down at
  // the very bottom of the page opens it, scrolling back up while it's open
  // closes it and hands normal scrolling back to the page.
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const cooldownRef = useRef(false);

  const openFooter = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);
    document.body.style.overflow = "hidden";
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 500);
  }, []);

  const closeFooter = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    document.body.style.overflow = "";
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 500);
  }, []);

  useEffect(() => {
    const AT_BOTTOM_EPS = 4;
    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - AT_BOTTOM_EPS;

    const handleWheel = (e: WheelEvent) => {
      if (cooldownRef.current) { e.preventDefault(); return; }
      if (openRef.current) {
        e.preventDefault();
        if (e.deltaY < -8) closeFooter();
        return;
      }
      if (e.deltaY > 0 && isAtBottom()) {
        e.preventDefault();
        openFooter();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (cooldownRef.current) { e.preventDefault(); return; }
      if (openRef.current) {
        e.preventDefault();
        if (deltaY < -8) closeFooter();
        touchStartY = currentY;
        return;
      }
      if (deltaY > 8 && isAtBottom()) {
        e.preventDefault();
        openFooter();
      }
      touchStartY = currentY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = "";
    };
  }, [openFooter, closeFooter]);

  return (
    <footer
      ref={footerRef}
      className="fixed inset-x-0 bottom-0 z-40 h-screen bg-gradient-to-b from-[rgba(22,22,23,0.4)] via-[rgba(35,34,37,0.4)] to-[rgba(45,39,52,0.4)] backdrop-blur-[5px] flex flex-col items-start justify-end overflow-clip px-[16px] md:px-[50px] pb-[calc(110px+env(safe-area-inset-bottom)+16px)] md:pb-[16px] pt-[48px] md:pt-[50px] w-full gap-[20px] md:gap-[80px]"
      style={{
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 500ms cubic-bezier(0.33, 0, 0, 1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >

      {/* Garden background — desktop only */}
      <div className="hidden md:block absolute inset-0">
        <LSystemGarden ref={gardenRef} onHasFlowers={setHasFlowers} />
      </div>

      {/* Purple Gradient — mobile: recentered further below the box's own
          bottom edge (rather than exactly on it) so the visible slice at the
          footer's true bottom sits well inside the gradient's full-intensity
          belly instead of right at its tapering edge. Radius widened (420px
          -> 600px) so the belly stays visible far enough up to still glow
          behind the fixed Casestudies Nav pill, instead of tapering to
          nothing above it. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none"
        style={{
          background: isMobile
            ? "radial-gradient(ellipse 70% 600px at 50% 130%, rgba(243, 155, 139, 0.18) 0%, rgba(220, 110, 190, 0.12) 28%, rgba(154, 71, 255, 0.06) 55%, transparent 100%)"
            : "radial-gradient(ellipse 70% 420px at 50% 100%, rgba(243, 155, 139, 0.18) 0%, rgba(220, 110, 190, 0.12) 28%, rgba(154, 71, 255, 0.06) 55%, transparent 100%)",
        }}
      />

      {/* Desktop: 4 columns in a row, bottom-aligned, evenly spaced —
          matches the Figma frame's exact x-offsets (42 / 624 / 1119 / 1603
          on a 1728px frame), which work out to a plain justify-between. */}
      <div className="hidden md:flex flex-row items-end justify-between relative shrink-0 w-full">

        {/* Column 1: Social pills + contact phrase */}
        <div className="flex flex-col gap-[16px] items-start shrink-0">
          <div className="flex gap-[8px] items-center shrink-0">
            {socialLinks.map((s) => (
              <SocialPill key={s.key} href={s.href} label={s.label} icon={s.icon} stroke={s.stroke} iconViewBox={s.iconViewBox} />
            ))}
          </div>
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
        </div>

        {/* Column 2: Play around */}
        <div className="flex flex-col gap-[4px] items-start shrink-0 font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px] whitespace-nowrap">
          <p style={{ color: "var(--color-text-primary)" }}>Play around!</p>
          <div className="flex gap-[4px] items-center shrink-0">
            <svg width="18" height="18" viewBox={icons.navigation.arrowUp.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d={icons.navigation.arrowUp.paths[0].d} stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ color: "var(--color-text-secondary)" }}>You never know what may grow</p>
          </div>
        </div>

        {/* Column 3: Made with */}
        <div className="flex flex-col gap-[4px] items-start shrink-0 font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px]">
          <p style={{ color: "var(--color-text-primary)" }}>Made with</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {'Figma {Design, Motion, MCP} → Claude → Git → Vercel'}
          </p>
        </div>

        {/* Column 4: Mode toggle */}
        <div className="flex relative z-[1] shrink-0">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile: columns 1 and 3 stacked (2 and 4 are desktop-only — no
          hoverable garden or theme toggle on mobile). */}
      <div className="flex md:hidden flex-col gap-[20px] items-start relative shrink-0 w-full">
        <div className="flex flex-col gap-[16px] items-start shrink-0">
          <div className="flex gap-[8px] items-center shrink-0">
            {socialLinks.map((s) => (
              <SocialPill key={`m-${s.key}`} href={s.href} label={s.label} icon={s.icon} stroke={s.stroke} iconViewBox={s.iconViewBox} />
            ))}
          </div>
          <div className="flex flex-col gap-[8px] items-start font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px]">
            <p
              className="select-none"
              style={{ color: "var(--color-text-primary)" }}
              onClick={handlePhraseClick}
            >
              {displayText}{isAnimating && <span style={{ opacity: 0.6 }}>|</span>}
            </p>
            <p style={{ color: "var(--color-text-secondary)" }}>I can be easily reached at your convenience!</p>
          </div>
        </div>
        <div className="flex flex-col gap-[4px] items-start font-['Inter_Tight',sans-serif] font-[300] leading-none text-[14px]">
          <p style={{ color: "var(--color-text-primary)" }}>Made with</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {'Figma {Design, Motion, MCP} → Claude → Git → Vercel'}
          </p>
        </div>
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
