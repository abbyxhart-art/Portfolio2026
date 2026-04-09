import { useState } from "react";
import { Link } from "react-router";
import iconArrow from "../../assets/icon-arrow.svg";
import { useCursor } from "../context/CursorContext";

const connectLinks = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/abbyxhart/" },
  { label: "Instagram", href: "https://instagram.com/abbyxhart.art" },
  { label: "Email",     href: "mailto:abbyxhart@gmail.com" },
];

const navLinks = [
  { label: "Home",  to: "/" },
  { label: "About", to: "/about" },
  { label: "Booth", to: "/booth" },
];

function AnimatedLink({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsPurple } = useCursor();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative shrink-0 w-full no-underline"
      style={{ color: isHovered ? "#9a47ff" : "#232226", transition: "color 100ms ease" }}
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
      className="relative shrink-0 w-full no-underline"
      style={{ color: isHovered ? "#9a47ff" : "#232226", transition: "color 100ms ease" }}
      onMouseEnter={() => { setIsHovered(true); setIsPurple(true); }}
      onMouseLeave={() => { setIsHovered(false); setIsPurple(false); }}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border\/default,#d1cedc)] border-solid content-stretch flex flex-col h-[402px] items-start justify-between overflow-clip pb-[16px] pt-[100px] relative w-full">
      {/* Purple Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 600px at 50% 100%, rgba(190,170,255,0.35) 0%, rgba(220,210,255,0.15) 50%, rgba(250,249,255,0) 100%)",
        }}
      />

      {/* Navigation Row */}
      <div className="content-stretch flex h-[118px] items-start justify-between px-[100px] relative shrink-0 w-full">
        {/* Copyright + Design info */}
        <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[235px]">
            <p className="font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] leading-none not-italic relative shrink-0 text-[length:var(--text-size\/default,18px)] text-[color:var(--text\/primary,#232226)] w-full">
              I design for connection.
            </p>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <img src={iconArrow} alt="" className="shrink-0 size-[18px]" />
              <p className="font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] leading-none not-italic relative shrink-0 text-[color:var(--text\/primary,#232226)] text-[length:var(--text-size\/default,18px)] whitespace-nowrap">
                It was nice to meet you!
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[8px] items-start leading-none not-italic relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] whitespace-nowrap">
            <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
              <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Typeset</p>
              <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Inter Tight</p>
            </div>
            <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
              <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Made with</p>
              <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Figma + Claude → Github + Vercel</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="content-stretch flex font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[24px] items-start leading-none not-italic relative shrink-0">
          {/* Connect */}
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[61px]">
            <p className="relative shrink-0 text-[length:var(--text-size\/smallest,12px)] text-[color:var(--text\/primary,#232226)] w-full">Connect</p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] w-full">
              {connectLinks.map(({ label, href }) => (
                <AnimatedLink key={label} label={label} href={href} />
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[61px]">
            <p className="relative shrink-0 text-[length:var(--text-size\/smallest,12px)] text-[color:var(--text\/primary,#232226)] w-full">Navigation</p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-[length:var(--text-size\/extra-small,14px)] w-full">
              {navLinks.map(({ label, to }) => (
                <AnimatedNavLink key={label} label={label} to={to} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Directions */}
      <div className="content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[5px] items-center leading-none not-italic relative shrink-0 text-[color:var(--text\/secondary,#585564)] text-[length:var(--text-size\/extra-small,14px)] w-full whitespace-nowrap">
        <p className="relative shrink-0">Play around. You never know what may grow!</p>
        <p className="relative shrink-0">Hover based on the book: the algorithmic beauty of plants</p>
      </div>

      {/* RIT Info */}
      <div className="absolute bottom-[15px] content-stretch flex flex-col font-[family-name:var(--text-font\/default,'Inter_Tight:Regular',sans-serif)] gap-[8px] items-start leading-none left-[99px] not-italic text-[length:var(--text-size\/extra-small,14px)] w-[301px] whitespace-nowrap">
        <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Rochester Institute of Technology</p>
        <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
          <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">BFA</p>
          <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">New Media Design</p>
        </div>
        <div className="content-stretch flex gap-[3px] items-center relative shrink-0 w-full">
          <p className="relative shrink-0 text-[color:var(--text\/primary,#232226)]">Minors</p>
          <p className="relative shrink-0 text-[color:var(--text\/tertiary,#7e7c87)]">Mobile Design and Development, Fine Arts</p>
        </div>
      </div>
    </footer>
  );
}
