import { useState } from "react";
import { Link } from "react-router";
import Cursor from "../app/components/Cursor";

export default function Navigation({ scrolledDown = false }: { scrolledDown?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
  const handleMouseEnter = () => setShowCursor(true);
  const handleMouseLeave = () => setShowCursor(false);

  return (
    <>
      <div
        className={`flex h-[72px] justify-center w-full font-['Inter_Tight',sans-serif] text-[16px] font-normal leading-none tracking-[0] ${scrolledDown ? "items-start py-[16px]" : "items-end"}`}
        style={{
          gap: scrolledDown ? "16px" : "24px",
          transition: "gap 0.4s cubic-bezier(0.4,0,0.2,1)"
        }}
      >
        <Link
          to="/"
          className="relative shrink-0 text-[16px] text-[#7e7c87] hover:text-[#232226] transition-colors duration-200 no-underline cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Abby Hart
        </Link>
        <Link
          to="/about"
          className="relative shrink-0 text-[16px] text-[#7e7c87] hover:text-[#232226] transition-colors duration-200 no-underline cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          About
        </Link>
        <Link
          to="/booth"
          className="relative shrink-0 text-[16px] text-[#7e7c87] hover:text-[#232226] transition-colors duration-200 no-underline cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          The Booth
        </Link>
      </div>
      {showCursor && <Cursor x={mousePos.x} y={mousePos.y} instance="Black" />}
    </>
  );
}
