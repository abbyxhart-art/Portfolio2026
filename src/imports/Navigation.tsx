import { useState } from "react";
import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/booth", label: "The Booth", end: false },
];

export default function Navigation({ scrolledDown = false }: { scrolledDown?: boolean }) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div
      className={`hidden md:flex h-[36px] justify-center w-full font-['Inter_Tight',sans-serif] text-[16px] font-normal leading-none tracking-[0] ${scrolledDown ? "items-start py-[8px]" : "items-center"}`}
      style={{
        gap: scrolledDown ? "16px" : "24px",
        transition: "gap 0.4s cubic-bezier(0.4,0,0.2,1)"
      }}
    >
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={({ isActive }) => ({
            color: isActive || hoveredLink === to ? "#EEEDF5" : "#B8B4C5",
            transition: "color 0.2s",
          })}
          className="relative shrink-0 text-[16px] no-underline cursor-pointer"
          onMouseEnter={() => setHoveredLink(to)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
