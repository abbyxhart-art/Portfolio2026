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

const defaultBorderColor: Record<AccentType, string> = {
  "1": "var(--brand\/purple\/20, #dbbdfe)",
  "2": "var(--brand\/pink\/20, #ffc9fd)",
  "3": "#c6d6ff",
  "4": "var(--brand\/red\/20, #fbc0bf)",
};

const hoverBorderColor: Record<AccentType, string> = {
  "1": "rgba(154,71,255,0.2)",
  "2": "rgba(205,255,43,0.1)",
  "3": "rgba(43,81,255,0.2)",
  "4": "rgba(251,33,243,0.15)",
};

const hoverBgColor: Record<AccentType, string> = {
  "1": "rgba(154,71,255,0.1)",
  "2": "rgba(205,255,43,0.05)",
  "3": "rgba(43,81,255,0.08)",
  "4": "rgba(251,33,243,0.1)",
};

const hoverAccentColor: Record<AccentType, string> = {
  "1": "#d698ff",
  "2": "rgba(194,255,91,0.8)",
  "3": "#45d0ff",
  "4": "rgba(255,192,246,0.8)",
};

const defaultDescColor: Record<AccentType, { color: string }> = {
  "1": { color: "#908E99" },
  "2": { color: "#908E99" },
  "3": { color: "#908E99" },
  "4": { color: "#908E99" },
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

  const tagColor = isHover
    ? hoverAccentColor[accentType]
    : "#908E99";

  const descStyle = isHover
    ? { color: hoverAccentColor[accentType] }
    : { color: defaultDescColor[accentType].color };

  return (
    <div
      className={className || "flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-[614.935px]"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Animation frame */}
      <div
        className="absolute pointer-events-none rounded-[8px] border transition-all duration-300 ease-out"
        style={{
          inset: isHover ? "0px" : "8px",
          borderColor: isHover ? hoverBorderColor[accentType] : defaultBorderColor[accentType],
          backgroundColor: isHover ? hoverBgColor[accentType] : "transparent",
          opacity: isHover ? 1 : 0,
        }}
      />

      {/* Case study image */}
      <div className="aspect-[400/200] relative shrink-0 w-full overflow-hidden bg-[#e8e7f0] rounded-[8px]">
        {video ? (
          <video
            autoPlay loop muted playsInline preload="auto"
            className="absolute inset-0 max-w-none object-cover size-full"
            src={video}
          />
        ) : image ? (
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={image} />
        ) : null}
      </div>

      {/* Text container */}
      <div className="flex flex-col gap-[12px] items-start relative w-full">

        {/* Specs row */}
        <div className="flex gap-[8px] items-center">
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap transition-colors duration-300"
            style={{ color: tagColor }}>
            {tag1Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0 transition-colors duration-300"
            style={{ backgroundColor: tagColor }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap transition-colors duration-300"
            style={{ color: tagColor }}>
            {tag2Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0 transition-colors duration-300"
            style={{ backgroundColor: tagColor }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap transition-colors duration-300"
            style={{ color: tagColor }}>
            {date}
          </p>
        </div>

        {/* Title + description */}
        <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[4px] items-start leading-[1.5] w-full">
          <p className="text-[18px] text-[color:var(--text\/primary,#eeedf5)]">
            {title}
          </p>
          <p
            className="font-normal text-[16px] transition-colors duration-300"
            style={descStyle}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
