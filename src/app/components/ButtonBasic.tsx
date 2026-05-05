import { useState } from "react";
import Cursor from "./Cursor";

type ButtonBasicProps = {
  className?: string;
  label?: string;
  size?: "Large" | "Default" | "Smallest";
  disabled?: boolean;
  onClick?: () => void;
};

const sizeText: Record<"Large" | "Default" | "Smallest", string> = {
  Large: "text-[18px]",
  Default: "text-[16px]",
  Smallest: "text-[14px]",
};

export default function ButtonBasic({
  className,
  label = "Button",
  size = "Default",
  disabled = false,
  onClick,
}: ButtonBasicProps) {
  const [isHover, setIsHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const borderColor = disabled
    ? "var(--text/quatrinary, #aeabb9)"
    : isHover
    ? "var(--border/dark, #b8b4c5)"
    : "var(--border/default, #d1cedc)";

  const textColor = disabled
    ? "var(--text/quatrinary, #aeabb9)"
    : "var(--text/primary, #37363c)";

  const bg = isHover && !disabled ? "var(--surface/secondary, #eeedf5)" : "transparent";

  return (
    <>
      <button
        className={
          className ||
          `border flex items-center justify-center px-[12px] py-[8px] rounded-[24px] bg-transparent ${isHover ? "cursor-none" : "cursor-pointer"} ${sizeText[size]}`
        }
        style={{
          borderColor,
          borderWidth: "1px",
          color: textColor,
          backgroundColor: bg,
          transition: "border-color 250ms ease-out, color 250ms ease-out, background-color 250ms ease-out",
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => !disabled && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <span
          className={`font-['Inter_Tight',sans-serif] font-normal leading-none whitespace-nowrap ${sizeText[size]}`}
        >
          {label}
        </span>
      </button>
      {isHover && !disabled && (
        <Cursor x={mousePos.x} y={mousePos.y} instance="Black" />
      )}
    </>
  );
}
