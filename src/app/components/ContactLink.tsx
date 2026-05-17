import { useState } from "react";

export default function ContactLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <p
      className="fixed bottom-[16px] left-[16px] z-50 font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] text-[14px] tracking-[-0.28px] whitespace-nowrap cursor-pointer"
      style={{ color: isHovered ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 150ms ease-out" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Contact
    </p>
  );
}
