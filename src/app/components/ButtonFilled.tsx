import { useState } from "react";
import { useCursor } from "../context/CursorContext";
import Cursor, { type CursorInstance } from "./Cursor";

type ButtonFilledProps = {
  label: string;
  size?: "Small" | "Default" | "Large";
  type?: "Default" | "Intense" | "Purple";
  cursor?: CursorInstance;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const sizeConfig = {
  Small:   { px: "8px",  py: "4px", radius: "2px", fontSize: "14px" },
  Default: { px: "6px",  py: "4px", radius: "2px", fontSize: "16px" },
  Large:   { px: "8px",  py: "4px", radius: "4px", fontSize: "18px" },
};

const largePaddingDefault = { px: "12px", py: "8px" };

export default function ButtonFilled({
  label,
  size = "Default",
  type = "Default",
  cursor,
  disabled = false,
  onClick,
  className,
}: ButtonFilledProps) {
  const [isHover, setIsHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setIsPurple } = useCursor();

  let bg = "#e8e7f0";
  let color = "#585564";

  if (disabled) {
    color = "#aeabb9";
  } else if (isHover) {
    if (type === "Purple") {
      bg = "#dbbdfe";
      color = "#9a47ff";
    } else {
      bg = "#d1cedc";
      color = "#3f3e47";
    }
  }

  const { px: basePx, py: basePy, radius, fontSize } = sizeConfig[size];
  const px = size === "Large" && type === "Default" ? largePaddingDefault.px : basePx;
  const py = size === "Large" && type === "Default" ? largePaddingDefault.py : basePy;

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHover(true);
    if (type === "Purple") setIsPurple(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (type === "Purple") setIsPurple(false);
  };

  return (
    <>
      <div
        className={`flex items-center justify-center shrink-0${className ? ` ${className}` : ""}`}
        style={{
          backgroundColor: bg,
          padding: `${py} ${px}`,
          borderRadius: radius,
          cursor: onClick && !disabled ? "pointer" : "default",
          transition: "background-color 200ms ease",
        }}
        onClick={!disabled ? onClick : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <span
          className="font-['Inter_Tight',sans-serif] font-normal leading-none whitespace-nowrap text-center"
          style={{ color, fontSize, transition: "color 200ms ease" }}
        >
          {label}
        </span>
      </div>

      {isHover && !disabled && cursor && (
        <Cursor x={mousePos.x} y={mousePos.y} instance={cursor} />
      )}
    </>
  );
}
