import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function HomeButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "A") navigate("/");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <Link
      to="/"
      className="fixed top-[16px] right-[16px] z-50 no-underline flex gap-[9px] items-center pl-[12px] pr-[16px] py-[8px] rounded-[24px] bg-[#faf9ff]"
      style={{ border: "0.75px solid #d1cedc" }}
    >
      {/* Home icon */}
      <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.5 10.75L12.5 4L20.5 10.75V21C20.5 21.2761 20.2761 21.5 20 21.5H16V16H9V21.5H5C4.72386 21.5 4.5 21.2761 4.5 21V10.75Z"
          stroke="#585564"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Keyboard shortcut badges */}
      <div className="flex gap-[2px] items-center">
        <div className="bg-[#e8e7f0] flex items-center justify-center px-[4px] h-[24px] rounded-[4px]">
          <span className="font-['Inter_Tight',sans-serif] font-normal text-[14px] text-[#585564] leading-none">shift</span>
        </div>
        <div className="bg-[#e8e7f0] flex items-center justify-center size-[24px] rounded-[4px]">
          <span className="font-['Inter_Tight',sans-serif] font-normal text-[14px] text-[#585564] leading-none">A</span>
        </div>
      </div>
    </Link>
  );
}
