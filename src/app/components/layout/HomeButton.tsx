import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function HomeButton() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "A") navigate("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="hidden md:flex fixed top-[16px] left-[16px] z-50">
      <Link
        to="/"
        className="flex no-underline gap-[6px] items-center pl-[10px] pr-[12px] py-[6px] rounded-[24px] transition-colors duration-150"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: hovered ? "var(--color-surface-secondary-hover)" : "var(--color-surface-fill3)",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.5 10.75L12.5 4L20.5 10.75V21C20.5 21.2761 20.2761 21.5 20 21.5H16V16H9V21.5H5C4.72386 21.5 4.5 21.2761 4.5 21V10.75Z"
            stroke="var(--color-text-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex gap-[2px] items-center">
          <div
            className="flex items-center justify-center h-[18px] px-[5px] rounded-[3px]"
            style={{ background: "rgba(144,142,153,0.2)" }}
          >
            <p className="font-['Inter_Tight',sans-serif] text-[10px] leading-none" style={{ color: hovered ? "var(--color-text-primary)" : "#908e99", transition: "color 0.15s ease" }}>shift</p>
          </div>
          <div
            className="flex items-center justify-center size-[18px] rounded-[3px]"
            style={{ background: "rgba(144,142,153,0.2)" }}
          >
            <p className="font-['Inter_Tight',sans-serif] text-[10px] leading-none" style={{ color: hovered ? "var(--color-text-primary)" : "#908e99", transition: "color 0.15s ease" }}>A</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
