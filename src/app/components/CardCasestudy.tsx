import { useState } from "react";

export type AccentType = "1" | "2" | "3" | "4" | "5" | "6" | "7";

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
  readTime?: string;
};

const defaultBorderColor: Record<AccentType, string> = {
  "1": "var(--brand\/purple\/20, #dbbdfe)",
  "2": "var(--brand\/pink\/20, #ffc9fd)",
  "3": "#c6d6ff",
  "4": "var(--brand\/red\/20, #fbc0bf)",
  "5": "rgba(255,198,43,0.2)",
  "6": "rgba(251,77,33,0.2)",
  "7": "rgba(65,218,169,0.2)",
};

const hoverBorderColor: Record<AccentType, string> = {
  "1": "rgba(154,71,255,0.2)",
  "2": "rgba(205,255,43,0.1)",
  "3": "rgba(43,81,255,0.2)",
  "4": "rgba(251,33,243,0.15)",
  "5": "rgba(255,198,43,0.1)",
  "6": "rgba(251,77,33,0.1)",
  "7": "rgba(65,218,169,0.1)",
};

const hoverBgColor: Record<AccentType, string> = {
  "1": "rgba(154,71,255,0.06)",
  "2": "rgba(205,255,43,0.02)",
  "3": "rgba(43,81,255,0.07)",
  "4": "rgba(251,33,243,0.05)",
  "5": "rgba(255,198,43,0.05)",
  "6": "rgba(251,77,33,0.05)",
  "7": "rgba(65,218,169,0.05)",
};

const hoverAccentColor: Record<AccentType, string> = {
  "1": "#d698ff",
  "2": "rgba(194,255,91,0.8)",
  "3": "#45d0ff",
  "4": "rgba(255,192,246,0.8)",
  "5": "rgba(255,198,43,0.9)",
  "6": "rgba(251,77,33,0.9)",
  "7": "rgba(65,218,169,0.9)",
};

const defaultDescColor: Record<AccentType, { color: string }> = {
  "1": { color: "#908E99" },
  "2": { color: "#908E99" },
  "3": { color: "#908E99" },
  "4": { color: "#908E99" },
  "5": { color: "#908E99" },
  "6": { color: "#908E99" },
  "7": { color: "#908E99" },
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
  readTime,
}: CardCasestudyProps) {
  const [isHover, setIsHover] = useState(false);

  const tagColor = isHover ? hoverAccentColor[accentType] : "#908E99";

  const descStyle = isHover
    ? { color: hoverAccentColor[accentType] }
    : { color: defaultDescColor[accentType].color };

  return (
    <div
      className={className || "flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-[614.935px] bg-background"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Animation frame */}
      <div
        className="absolute pointer-events-none rounded-[8px] border transition-all duration-300 ease-out"
        style={{
          inset: isHover ? "0px" : "8px",
          borderColor: hoverBorderColor[accentType],
          backgroundColor: isHover ? hoverBgColor[accentType] : "transparent",
          opacity: isHover ? 1 : 0,
        }}
      />

      {/* Case study image */}
      <div className="aspect-[2/1] relative shrink-0 w-full overflow-hidden bg-[#1c1b1f] rounded-[8px]">
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
      <div className="flex flex-col gap-[16px] items-start relative w-full">

        {/* Specs row */}
        <div className="flex gap-[8px] items-center">
          {/* Read time — slides in on hover */}
          {readTime && (
            <div
              className="flex items-center gap-[8px] overflow-hidden"
              style={{
                maxWidth: isHover ? '160px' : '0px',
                opacity: isHover ? 1 : 0,
                marginRight: isHover ? '0px' : '-8px',
                transition: isHover
                  ? 'max-width 0.45s ease-out, opacity 0.45s ease-out, margin-right 0.45s ease-out'
                  : 'max-width 0.15s ease-out, opacity 0.1s ease-out, margin-right 0.15s ease-out',
              }}
            >
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap"
                style={{ color: tagColor }}>
                {readTime}
              </p>
              <div className="w-[3px] h-[3px] rounded-full shrink-0" style={{ backgroundColor: tagColor }} />
            </div>
          )}
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: isHover ? 0.6 : 1, transition: 'color 0.3s, opacity 0.3s' }}>
            {tag1Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0"
            style={{ backgroundColor: tagColor, opacity: isHover ? 0.6 : 1, transition: 'background-color 0.3s, opacity 0.3s' }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: isHover ? 0.6 : 1, transition: 'color 0.3s, opacity 0.3s' }}>
            {tag2Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0"
            style={{ backgroundColor: tagColor, opacity: isHover ? 0.6 : 1, transition: 'background-color 0.3s, opacity 0.3s' }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: isHover ? 0.6 : 1, transition: 'color 0.3s, opacity 0.3s' }}>
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
