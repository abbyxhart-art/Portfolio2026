import { useState } from "react";

export type AccentType = "1" | "2" | "3" | "4";

type CardCasestudyProps = {
  className?: string;
  accentType?: AccentType;
  date?: string;
  description?: string;
  image?: string;
  video?: string;
  tag1Label?: string;
  tag2Label?: string;
  title?: string;
};

const animationFrameColor: Record<AccentType, string> = {
  "1": "#dbbdfe",
  "2": "#ffc9fd",
  "3": "#c6d6ff",
  "4": "#fbc0bf",
};

const hoverTextColor: Record<AccentType, string> = {
  "1": "#9a47ff",
  "2": "#fb21f3",
  "3": "#2b51ff",
  "4": "#ff2600",
};

export default function CardCasestudy({
  className,
  accentType = "4",
  date = "Fall 2025",
  description = "Winning Creative Collision with a pixel mirror made of AI logos",
  image,
  video,
  tag1Label = "Agentic Design",
  tag2Label = "Designathon",
  title = "Figma at RIT",
}: CardCasestudyProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={className || "flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-[614.935px]"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Animation Frame */}
      <div
        className="absolute pointer-events-none rounded-[8px] border transition-all duration-300 ease-out"
        style={{
          inset: isHover ? "0px" : "8px",
          borderColor: animationFrameColor[accentType],
          opacity: isHover ? 1 : 0,
        }}
      />

      {/* Case study image */}
      <div className="aspect-[400/200] relative rounded-t-[8px] shrink-0 w-full overflow-hidden bg-[#e8e7f0]">
        {video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 max-w-none object-cover size-full"
            src={video}
          />
        ) : image ? (
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src={image}
          />
        ) : null}
      </div>

      {/* Text container */}
      <div className="flex flex-col gap-[12px] items-start w-full">
        {/* Specs: tag1 · tag2 · date */}
        <div className="flex gap-[8px] items-center">
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#7e7c87] text-[14px] whitespace-nowrap">
            {tag1Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#7e7c87] shrink-0" />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#7e7c87] text-[14px] whitespace-nowrap">
            {tag2Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full bg-[#7e7c87] shrink-0" />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#7e7c87] text-[14px] whitespace-nowrap">
            {date}
          </p>
        </div>

        {/* Title + description */}
        <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[4px] items-start leading-[1.5] w-full">
          <p className="opacity-[0.78] text-[#232226] text-[18px]">
            {title}
          </p>
          <p
            className="font-normal opacity-[0.78] text-[16px] transition-colors duration-300"
            style={{ color: isHover ? hoverTextColor[accentType] : "#7e7c87" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
