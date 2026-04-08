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

  const borderColor = disabled ? "#aeabb9" : isHover ? "#232226" : "#d1cedc";
  const textColor = disabled ? "#aeabb9" : isHover ? "#232226" : "#585564";

  return (
    <>
      <button
        className={
          className ||
          `border flex items-center justify-center px-[12px] py-[8px] rounded-[4px] bg-transparent ${isHover ? "cursor-none" : "cursor-pointer"} ${sizeText[size]}`
        }
        style={{
          borderColor,
          color: textColor,
          borderWidth: "1px",
          transition: "border-color 150ms ease, color 150ms ease",
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => !disabled && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <span className="font-['Inter_Tight',sans-serif] font-normal leading-none whitespace-nowrap">
          {label}
        </span>
      </button>
      {isHover && !disabled && (
        <Cursor x={mousePos.x} y={mousePos.y} instance="Internal Link" />
      )}
    </>
  );
}
