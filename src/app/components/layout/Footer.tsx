import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import iconArrow from "../../../assets/icons/icon-arrow.svg";
import undoArrow from "../../../assets/icons/undo-arrow.svg";
import LSystemGarden, { LSystemGardenHandle } from "../LSystemGarden";

const connectLinks = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/abbyxhart/" },
  { label: "Instagram", href: "https://instagram.com/abbyxhart.art" },
  { label: "Email",     href: "mailto:abbyxhart@gmail.com?subject=Love%20your%20work%2C%20let%27s%20chat" },
];

const navLinks = [
  { label: "Work",  to: "/" },
  { label: "About", to: "/about" },
];

function AnimatedLink({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative shrink-0 w-full no-underline font-['Inter_Tight',sans-serif] font-[300] text-[14px] leading-none"
      style={{ color: isHovered ? "var(--color-accent-default)" : "var(--color-text-primary)", transition: "color 100ms ease" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
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
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hidden md:flex absolute bottom-[16px] right-[16px] gap-[9px] items-center pl-[12px] pr-[16px] py-[8px] rounded-[24px] cursor-pointer"
      style={{
        backgroundColor: hovered ? "var(--color-surface-secondary-hover)" : "var(--color-surface-fill3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--color-border-dark)",
        transition: "background-color 0.15s ease",
      }}
    >
      <div className="relative shrink-0 size-[24px] overflow-clip">
        <div className="absolute inset-[20.83%_12.5%]">
          <img alt="" src={undoArrow} className="block" style={{ position: "absolute", inset: "-4.07% -3.17%", maxWidth: "none", width: "100%", height: "100%", filter: "brightness(0) saturate(0) opacity(0.5)" }} />
        </div>
      </div>
      <div className="flex gap-[2px] items-center">
        {["shift", "X"].map((key) => (
          <div key={key} className={`h-[24px] rounded-[4px] flex items-center justify-center ${key === "shift" ? "px-[8px]" : "w-[24px]"}`} style={{ backgroundColor: "var(--color-surface-fill2)" }}>
            <span className="font-['Inter_Tight',sans-serif] text-[12px]" style={{ color: "var(--color-text-secondary)" }}>{key}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

export default function Footer() {
  const [hasFlowers, setHasFlowers] = useState(false);
  const gardenRef = useRef<LSystemGardenHandle>(null);

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

  return (
    <footer className="bg-[var(--color-surface-primary-default)] border-t border-[var(--color-border-default)] flex flex-col h-auto md:h-[402px] items-start justify-between overflow-clip pb-[16px] pt-[48px] md:pt-[100px] relative w-full gap-[32px] md:gap-0">
      {/* Garden background — desktop only */}
      <div className="hidden md:block absolute inset-0">
        <LSystemGarden ref={gardenRef} onHasFlowers={setHasFlowers} />
      </div>

      {/* Purple Gradient — desktop only */}
      <div
        className="hidden md:block absolute inset-x-0 bottom-0 h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 420px at 50% 100%, rgba(243, 155, 139, 0.18) 0%, rgba(220, 110, 190, 0.12) 28%, rgba(154, 71, 255, 0.06) 55%, transparent 100%)",
        }}
      />

      {/* Navigation Row */}
      <div className="flex flex-col md:flex-row h-auto md:h-[118px] items-start justify-between px-[16px] md:px-[100px] relative shrink-0 w-full gap-[32px] md:gap-0">
        {/* Left: tagline + design info */}
        <div className="flex flex-col h-full items-start justify-between relative shrink-0 gap-[16px] md:gap-0">
          <div className="flex flex-col gap-[4px] items-start shrink-0 w-[235px]">
            <p className="font-['Inter_Tight',sans-serif] font-[350] leading-none text-[14px] md:text-[17px] w-full" style={{ color: "var(--color-text-primary)" }}>
              I design for connection.
            </p>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <img src={iconArrow} alt="" className="shrink-0 size-[18px]" style={{ filter: "brightness(0) saturate(0) opacity(0.4)" }} />
              <p className="font-['Inter_Tight',sans-serif] font-[350] leading-none text-[14px] md:text-[17px] whitespace-nowrap" style={{ color: "var(--color-text-primary)" }}>
                It was nice to meet you!
              </p>
            </div>
          </div>
          <div className="flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[8px] items-start leading-none shrink-0 text-[14px] whitespace-nowrap">
            <div className="flex gap-[3px] items-center shrink-0">
              <p style={{ color: "var(--color-text-secondary)" }}>Typeset</p>
              <p style={{ color: "var(--color-text-secondary)" }}>Inter Tight</p>
            </div>
            <div className="flex gap-[3px] items-center shrink-0">
              <p style={{ color: "var(--color-text-secondary)" }}>Last edit: May 2026</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-[24px] items-start leading-none shrink-0">
          {/* Connect */}
          <div className="flex flex-col gap-[32px] items-start shrink-0 w-[61px]">
            <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-none w-full" style={{ color: "var(--color-text-secondary)" }}>Connect</p>
            <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
              {connectLinks.map(({ label, href }) => (
                <AnimatedLink key={label} label={label} href={href} />
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className="flex flex-col gap-[32px] items-start shrink-0 w-[61px]">
            <p className="font-['Inter_Tight',sans-serif] text-[12px] leading-none w-full" style={{ color: "var(--color-text-secondary)" }}>Navigation</p>
            <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
              {navLinks.map(({ label, to }) => (
                <AnimatedNavLink key={label} label={label} to={to} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Directions — desktop only */}
      <div className="hidden md:flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[5px] items-center leading-none shrink-0 text-[14px] w-full whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>
        <p className="shrink-0">Play around. You never know what may grow!</p>
        <p className="shrink-0">Hover based on the book: the algorithmic beauty of plants</p>
      </div>

      {/* RIT Info */}
      <div className="md:absolute md:bottom-[15px] md:left-[99px] flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[8px] items-start leading-none px-[16px] md:px-0 text-[14px] whitespace-nowrap">
        <p style={{ color: "var(--color-text-primary)" }}>Rochester Institute of Technology</p>
        <div className="flex gap-[3px] items-center shrink-0">
          <p style={{ color: "var(--color-text-secondary)" }}>BFA</p>
          <p style={{ color: "var(--color-text-primary)" }}>New Media Design</p>
        </div>
        <div className="flex gap-[3px] items-center shrink-0 w-full">
          <p style={{ color: "var(--color-text-secondary)" }}>Minors</p>
          <p style={{ color: "var(--color-text-primary)" }}>Mobile Design and Development, Fine Arts</p>
        </div>
      </div>

      {hasFlowers && (
        <ClearGardenButton onClick={clearGarden} />
      )}
    </footer>
  );
}
