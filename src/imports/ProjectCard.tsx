import imgCasestudyImage from "figma:asset/e5076f9a0ed3ba84a00e1bfeb85050f0bfbf58b8.png";
import { motion } from "motion/react";
import { useState } from "react";
import Tags from "./Tags-15-83";

export default function ProjectCard({ textColor = "#9A47FF", gradientColor = "#9A47FF" }: { textColor?: string; gradientColor?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert hex to RGB for the solid background
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div 
      className="bg-[rgba(247,246,251,0.8)] content-stretch flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-full h-auto overflow-hidden" 
      data-name="Project Card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute" 
        data-name="Background Gradient Hover" 
        style={{ backgroundColor: `rgba(${hexToRgb(gradientColor)}, 0.1)` }}
        animate={{ 
          top: isHovered ? "-5px" : "20px",
          right: isHovered ? "-5px" : "20px",
          bottom: isHovered ? "-5px" : "20px",
          left: isHovered ? "-5px" : "20px",
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-tl-[4.155px] rounded-tr-[4.155px] shrink-0 w-full" data-name="Card">
        <div className="relative shrink-0 w-full" style={{ paddingBottom: '50%' }} data-name="Casestudy image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCasestudyImage} />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text">
        <p 
          className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] min-w-full opacity-78 relative shrink-0 text-[#232226] text-[18px] w-[min-content]"
        >
          Tian Air
        </p>
        <motion.p 
          className="font-['Inter_Tight:Regular',sans-serif] font-normal leading-[1.5] min-w-full opacity-78 relative shrink-0 text-[16px] w-[min-content]"
          animate={{ color: isHovered ? textColor : "#7E7C87" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          An experimental design system working on variables, tokens, and interaction within a fictional airline
        </motion.p>
        <Tags />
      </div>
    </div>
  );
}