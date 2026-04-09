import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

export type CursorInstance =
  | "Default"
  | "Shoutout"
  | "Black"
  | "Purple"
  | "Text"
  | "Text Purple";

type CursorProps = {
  x: number;
  y: number;
  instance?: CursorInstance;
  label?: string;
};

const circleStyles: Partial<Record<CursorInstance, string>> = {
  "Default":  "size-[28px] rounded-[18.667px] bg-[rgba(200,196,215,0.2)]",
  "Shoutout": "size-[28px] rounded-[18.667px] bg-[rgba(200,196,215,0.2)]",
  "Black":    "size-[28px] rounded-[18.667px] bg-[rgba(35,34,38,0.2)] overflow-clip",
  "Purple":   "size-[28px] rounded-[18.667px] bg-[rgba(154,71,255,0.2)] border-[0.75px] border-solid border-[#dbbdfe]",
};

const pillStyles: Partial<Record<CursorInstance, string>> = {
  "Text":        "px-[12px] py-[8px] rounded-[16px] bg-[#faf9ff] border-[0.75px] border-[#e8e7f0] border-solid shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]",
  "Text Purple": "px-[12px] py-[8px] rounded-[16px] bg-[#f3e9ff] border-[0.75px] border-[#dbbdfe] border-solid shadow-[0px_4px_4px_0px_rgba(0,0,0,0.07)]",
};

const labelColor: Partial<Record<CursorInstance, string>> = {
  "Text":        "#585564",
  "Text Purple": "#9a47ff",
};

export default function Cursor({ x, y, instance = "Black", label }: CursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isPill = instance === "Text" || instance === "Text Purple";
  const style = isPill ? pillStyles[instance] : circleStyles[instance] ?? "";

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(calc(${x}px - ${isPill ? "14px" : "50%"}), calc(${y}px - 50%))`;
    }
  }, [x, y, isPill]);

  return createPortal(
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ transform: `translate(calc(${x}px - ${isPill ? "14px" : "50%"}), calc(${y}px - 50%))` }}
    >
      {isPill && label ? (
        <motion.div
          initial={{ width: 28 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={`flex items-center justify-center h-[28px] overflow-hidden ${style}`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.15 }}
            className="font-['Inter',sans-serif] font-normal text-[14px] leading-[1.1] whitespace-nowrap"
            style={{ color: labelColor[instance] }}
          >
            {label}
          </motion.span>
        </motion.div>
      ) : (
        <div className={`flex items-center justify-center ${style}`} />
      )}
    </div>,
    document.body
  );
}
