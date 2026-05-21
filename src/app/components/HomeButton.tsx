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
    <Link
      to="/"
      className="hidden md:flex fixed top-[16px] right-[16px] z-50 no-underline gap-[9px] items-center pl-[12px] pr-[16px] py-[8px] rounded-[24px] transition-colors duration-150"
      style={{
        border: "0.75px solid #302f34",
        background: hovered ? "rgba(88,85,100,0.2)" : "#161617",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 10.75L12.5 4L20.5 10.75V21C20.5 21.2761 20.2761 21.5 20 21.5H16V16H9V21.5H5C4.72386 21.5 4.5 21.2761 4.5 21V10.75Z"
          stroke="#908e99"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex gap-[2px] items-center">
        <div
          className="flex items-center justify-center h-[24px] px-[6px] rounded-[4px]"
          style={{ background: "rgba(144,142,153,0.2)" }}
        >
          <p className="font-['Inter_Tight',sans-serif] text-[12px] text-[#908e99] leading-none">shift</p>
        </div>
        <div
          className="flex items-center justify-center size-[24px] rounded-[4px]"
          style={{ background: "rgba(144,142,153,0.2)" }}
        >
          <p className="font-['Inter_Tight',sans-serif] text-[12px] text-[#908e99] leading-none">A</p>
        </div>
      </div>
    </Link>
  );
}
