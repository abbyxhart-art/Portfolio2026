import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import iconArrow from "../../assets/icon-arrow.svg";
import undoArrow from "../../assets/undo-arrow.svg";
import { useCursor } from "../context/CursorContext";
import LSystemGarden, { LSystemGardenHandle } from "./LSystemGarden";

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
  const { setIsPurple } = useCursor();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative shrink-0 w-full no-underline font-['Inter_Tight',sans-serif] font-[300] text-[14px] leading-none"
      style={{ color: isHovered ? "#9a47ff" : "#faf9ff", transition: "color 100ms ease" }}
      onMouseEnter={() => { setIsHovered(true); setIsPurple(true); }}
      onMouseLeave={() => { setIsHovered(false); setIsPurple(false); }}
    >
      {label}
    </a>
  );
}

function AnimatedNavLink({ label, to }: { label: string; to: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsPurple } = useCursor();

  return (
    <Link
      to={to}
      className="relative shrink-0 w-full no-underline font-['Inter_Tight',sans-serif] font-[300] text-[14px] leading-none"
      style={{ color: isHovered ? "#9a47ff" : "#faf9ff", transition: "color 100ms ease" }}
      onMouseEnter={() => { setIsHovered(true); setIsPurple(true); }}
      onMouseLeave={() => { setIsHovered(false); setIsPurple(false); }}
    >
      {label}
    </Link>
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
    <footer className="bg-[#171717] border-t border-[#585564] flex flex-col h-[402px] items-start justify-between overflow-clip pb-[16px] pt-[100px] relative w-full">
      {/* Garden background */}
      <div className="absolute inset-0">
        <LSystemGarden ref={gardenRef} onHasFlowers={setHasFlowers} />
      </div>

      {/* Purple Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 600px at 50% 100%, rgba(190,170,255,0.08) 0%, rgba(220,210,255,0.04) 50%, rgba(250,249,255,0) 100%)",
        }}
      />

      {/* Navigation Row */}
      <div className="flex h-[118px] items-start justify-between px-[100px] relative shrink-0 w-full">
        {/* Left: tagline + design info */}
        <div className="flex flex-col h-full items-start justify-between relative shrink-0">
          <div className="flex flex-col gap-[4px] items-start shrink-0 w-[235px]">
            <p className="font-['Inter_Tight',sans-serif] font-[350] leading-none text-[color:var(--text\/primary,#eeedf5)] text-[17px] w-full">
              I design for connection.
            </p>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <img src={iconArrow} alt="" className="shrink-0 size-[18px]" />
              <p className="font-['Inter_Tight',sans-serif] font-[350] leading-none text-[#faf9ff] text-[17px] whitespace-nowrap">
                It was nice to meet you!
              </p>
            </div>
          </div>
          <div className="flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[8px] items-start leading-none shrink-0 text-[14px] whitespace-nowrap">
            <div className="flex gap-[3px] items-center shrink-0">
              <p className="text-[#908e99]">Typeset</p>
              <p className="text-[#908e99]">Inter Tight</p>
            </div>
            <div className="flex gap-[3px] items-center shrink-0">
              <p className="text-[#908e99]">Made with</p>
              <p className="text-[#908e99]">Figma + Claude → Github + Vercel</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-[24px] items-start leading-none shrink-0">
          {/* Connect */}
          <div className="flex flex-col gap-[32px] items-start shrink-0 w-[61px]">
            <p className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[12px] leading-none w-full">Connect</p>
            <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
              {connectLinks.map(({ label, href }) => (
                <AnimatedLink key={label} label={label} href={href} />
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className="flex flex-col gap-[32px] items-start shrink-0 w-[61px]">
            <p className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[12px] leading-none w-full">Navigation</p>
            <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
              {navLinks.map(({ label, to }) => (
                <AnimatedNavLink key={label} label={label} to={to} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Directions */}
      <div className="flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[5px] items-center leading-none shrink-0 text-[#b8b4c5] text-[14px] w-full whitespace-nowrap">
        <p className="shrink-0">Play around. You never know what may grow!</p>
        <p className="shrink-0">Hover based on the book: the algorithmic beauty of plants</p>
      </div>

      {/* RIT Info */}
      <div className="absolute bottom-[15px] flex flex-col font-['Inter_Tight',sans-serif] font-[300] gap-[8px] items-start leading-none left-[99px] text-[14px] whitespace-nowrap">
        <p className="text-[#faf9ff]">Rochester Institute of Technology</p>
        <div className="flex gap-[3px] items-center shrink-0">
          <p className="text-[#908e99]">BFA</p>
          <p className="text-[#faf9ff]">New Media Design</p>
        </div>
        <div className="flex gap-[3px] items-center shrink-0 w-full">
          <p className="text-[#908e99]">Minors</p>
          <p className="text-[#faf9ff]">Mobile Design and Development, Fine Arts</p>
        </div>
      </div>

      {hasFlowers && (
        <button
          onClick={clearGarden}
          className="absolute bottom-[16px] right-[16px] flex gap-[9px] items-center pl-[12px] pr-[16px] py-[8px] rounded-[24px] cursor-pointer backdrop-blur-md bg-[rgba(23,23,23,0.3)] hover:bg-[rgba(88,85,100,0.2)] transition-colors duration-150"
          style={{ border: "0.75px solid #302f34" }}
        >
          <div className="relative shrink-0 size-[24px] overflow-clip">
            <div className="absolute inset-[20.83%_12.5%]">
              <img alt="" src={undoArrow} className="block" style={{ position: 'absolute', inset: '-4.07% -3.17%', maxWidth: 'none', width: '100%', height: '100%' }} />
            </div>
          </div>
          <div className="flex gap-[2px] items-center">
            {["shift", "X"].map((key) => (
              <div key={key} className={`h-[24px] rounded-[4px] flex items-center justify-center ${key === "shift" ? "px-[8px]" : "w-[24px]"}`} style={{ background: "rgba(144,142,153,0.15)" }}>
                <span className="font-['Inter_Tight',sans-serif] text-[12px] text-[#b8b4c5]">{key}</span>
              </div>
            ))}
          </div>
        </button>
      )}
    </footer>
  );
}
