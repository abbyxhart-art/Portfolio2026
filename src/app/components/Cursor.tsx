import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type CursorInstance =
  | "Default"
  | "Internal Link"
  | "External Link"
  | "Internal Information"
  | "External Information";

type CursorProps = {
  x: number;
  y: number;
  instance?: CursorInstance;
  label?: string;
};

const instanceStyles: Record<CursorInstance, string> = {
  "Default": "size-[28px] rounded-full bg-[rgba(200,196,215,0.2)]",
  "Internal Link": "size-[28px] rounded-[18.667px] bg-[rgba(35,34,38,0.2)] overflow-clip",
  "External Link": "size-[28px] rounded-full bg-[rgba(154,71,255,0.1)]",
  "Internal Information":
    "px-[12px] py-[8px] rounded-[16px] bg-[#faf9ff] border border-[#e8e7f0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]",
  "External Information":
    "px-[12px] py-[8px] rounded-[16px] bg-[#f3e9ff] border border-[#dbbdfe] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]",
};

const labelColor: Partial<Record<CursorInstance, string>> = {
  "Internal Information": "#908e99",
  "External Information": "#9a47ff",
};

export default function Cursor({ x, y, instance = "Internal Link", label }: CursorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y]);

  const isInfo = instance === "Internal Information" || instance === "External Information";

  return createPortal(
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))` }}
    >
      <div className={`flex items-center justify-center ${instanceStyles[instance]}`}>
        {isInfo && label && (
          <span
            className="font-['Inter',sans-serif] font-normal text-[14px] leading-[1.1] whitespace-nowrap"
            style={{ color: labelColor[instance] }}
          >
            {label}
          </span>
        )}
      </div>
    </div>,
    document.body
  );
}
