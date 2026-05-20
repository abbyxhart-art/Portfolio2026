import { useState } from "react";

type CardCasestudyProps = {
  className?: string;
  accentType?: string;
  date?: string;
  description?: string;
  image?: string;
  video?: string;
  tag1Label?: string;
  tag2Label?: string;
  title?: string;
  readTime?: string;
};

export default function CardCasestudy({
  className,
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

  const tagColor = "#908e99";
  const tagOpacity = isHover ? 0.8 : 1;

  return (
    <div
      className={className || "flex flex-col gap-[18.994px] items-start p-[14.246px] relative rounded-[8.31px] w-[614.935px] bg-background"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Hover overlay */}
      <div
        className="absolute pointer-events-none rounded-[8px] border transition-all duration-300 ease-out"
        style={{
          inset: isHover ? "0px" : "8px",
          borderColor: "#302f34",
          backgroundColor: isHover ? "rgba(88,85,100,0.15)" : "transparent",
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
      <div className="flex flex-col gap-[8px] items-start relative w-full">

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
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-normal text-[14px] whitespace-nowrap"
                style={{ color: "#faf9ff" }}>
                {readTime}
              </p>
              <div className="w-[3px] h-[3px] rounded-full shrink-0" style={{ backgroundColor: "#faf9ff" }} />
            </div>
          )}
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-normal text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: tagOpacity, transition: 'opacity 0.3s' }}>
            {tag1Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0"
            style={{ backgroundColor: tagColor, opacity: tagOpacity, transition: 'opacity 0.3s' }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-normal text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: tagOpacity, transition: 'opacity 0.3s' }}>
            {tag2Label}
          </p>
          <div className="w-[3px] h-[3px] rounded-full shrink-0"
            style={{ backgroundColor: tagColor, opacity: tagOpacity, transition: 'opacity 0.3s' }} />
          <p className="font-['Inter_Tight',sans-serif] font-normal leading-normal text-[14px] whitespace-nowrap"
            style={{ color: tagColor, opacity: tagOpacity, transition: 'opacity 0.3s' }}>
            {date}
          </p>
        </div>

        {/* Title + description */}
        <div className="flex flex-col font-['Inter_Tight',sans-serif] gap-[8px] items-start leading-[1.5] w-full">
          <p className="text-[18px] text-[color:var(--text\/primary,#eeedf5)]">
            {title}
          </p>
          <p
            className="font-normal text-[16px] transition-colors duration-300"
            style={{ color: isHover ? "#faf9ff" : "#908e99" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
