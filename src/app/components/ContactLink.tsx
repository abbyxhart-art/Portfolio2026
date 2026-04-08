import { useState } from "react";

export default function ContactLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-[16px] h-[129px] left-[16px] w-[85px] z-50">
      <p
        className="absolute font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.2] left-0 text-[14px] top-[101px] tracking-[-0.28px] whitespace-nowrap cursor-pointer"
        style={{ color: isHovered ? "var(--text-primary)" : "var(--text-tertiary)", transition: "color 150ms ease-out" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Contact
      </p>
    </div>
  );
}
