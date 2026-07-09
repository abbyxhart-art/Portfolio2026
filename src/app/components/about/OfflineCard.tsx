import { useState } from "react";
import iconStar from "../../../assets/project/about/icon_star.svg";
import iconHeart from "../../../assets/project/about/icon_heart.svg";
import iconPaint from "../../../assets/project/about/icon_paint.svg";
import iconEye from "../../../assets/project/about/icon_eye.png";
import star1 from "../../../assets/project/about/star_1.png";
import star2 from "../../../assets/project/about/star_2.png";
import star3 from "../../../assets/project/about/star_3.png";
import heart1 from "../../../assets/project/about/heart_1.png";
import heart2 from "../../../assets/project/about/heart_2.png";
import heart3 from "../../../assets/project/about/heart_3.png";
import art1 from "../../../assets/project/about/art_1.JPG";
import art2 from "../../../assets/project/about/art_2.png";
import art3 from "../../../assets/project/about/art_3.png";
import eye1 from "../../../assets/project/about/eye_1.png";
import eye2 from "../../../assets/project/about/eye_2.png";
import eye3 from "../../../assets/project/about/eye_3.png";

type Category = "star" | "heart" | "art" | "eye";

// Mobile: percentage-based (stretches to fill card width)
const PILL_LEFT: Record<Category, string> = {
  star:  "8%",
  heart: "29.3%",
  art:   "50.7%",
  eye:   "72%",
};
const INDICATOR_LEFT: Record<Category, string> = {
  star:  "13.95%",
  heart: "35.25%",
  art:   "56.65%",
  eye:   "77.95%",
};

// Desktop: fixed pixel positions for a 220px-wide bar w/ justify-evenly
const PILL_LEFT_PX: Record<Category, number> = {
  star:  9,
  heart: 60,
  art:   110,
  eye:   161,
};
const INDICATOR_LEFT_PX: Record<Category, number> = {
  star:  24,
  heart: 75,
  art:   125,
  eye:   176,
};

const BUTTONS: { id: Category; icon: string }[] = [
  { id: "star",  icon: iconStar  },
  { id: "heart", icon: iconHeart },
  { id: "art",   icon: iconPaint },
  { id: "eye",   icon: iconEye   },
];

const STAR_IMAGES  = [star1, star2, star3];
const STAR_TITLES  = ["I graduated!", "I ran a marathon!", "I stood on a frozen wave!"];

const HEART_IMAGES = [heart1, heart2, heart3];
const HEART_TITLES = ["Picnic with professors", "Figma at RIT", "New Media Club Formal"];

const ART_IMAGES   = [art1, art2, art3];
const ART_TITLES   = ["Had a 5 star Etsy", "Dabbled in calligraphy", "Tried ink"];

const EYE_IMAGES   = [eye1, eye2, eye3];
const EYE_TITLES   = ["Looking for my next concert", "Reading books + zines", null];

export default function OfflineCard() {
  const [hovered, setHovered]         = useState(false);
  const [selected, setSelected]       = useState<Category>("star");
  const [hoveredBtn, setHoveredBtn]   = useState<Category | null>(null);
  const [starIndex, setStarIndex]     = useState(0);
  const [heartIndex, setHeartIndex]   = useState(0);
  const [artIndex, setArtIndex]       = useState(0);
  const [eyeIndex, setEyeIndex]       = useState(0);
  const [beliHovered, setBeliHovered] = useState(false);

  const isStar  = selected === "star";
  const isHeart = selected === "heart";
  const isArt   = selected === "art";
  const isEye   = selected === "eye";

  function handleCardClick() {
    if (isStar)  setStarIndex((i)  => (i + 1) % STAR_IMAGES.length);
    if (isHeart) setHeartIndex((i) => (i + 1) % HEART_IMAGES.length);
    if (isArt)   setArtIndex((i)   => (i + 1) % ART_IMAGES.length);
    if (isEye)   setEyeIndex((i)   => (i + 1) % EYE_IMAGES.length);
  }

  // Single label — "Offline" at rest, current image caption on hover
  function renderLabel() {
    if (!hovered) return "Offline";
    if (isStar)  return STAR_TITLES[starIndex];
    if (isHeart) return HEART_TITLES[heartIndex];
    if (isArt)   return ART_TITLES[artIndex];
    if (isEye) {
      if (eyeIndex === 2) return renderCafeLink();
      return EYE_TITLES[eyeIndex];
    }
    return "Offline";
  }

  function renderCafeLink() {
    return (
      <>
        Eating!{" "}
        <a
          href="https://share.google/Ora4lc2zrK4vUEhaS"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecorationLine: "underline",
            textDecorationStyle: "dotted",
            textDecorationColor: "#faf9ff",
            color: "#faf9ff",
            fontWeight: beliHovered ? 500 : 400,
            fontVariationSettings: beliHovered ? "'wght' 500" : "'wght' 400",
            transition: "font-weight 0.15s ease",
          }}
          onMouseEnter={(e) => { e.stopPropagation(); setBeliHovered(true); }}
          onMouseLeave={() => setBeliHovered(false)}
          onClick={(e) => e.stopPropagation()}
        >
          Cafe W in Queens
        </a>
      </>
    );
  }

  return (
    <div
      className="relative w-full rounded-[8px] overflow-hidden cursor-pointer"
      style={{ aspectRatio: "1 / 1", background: "#2c2c2c" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      {/* Active category images only */}
      {(isStar ? STAR_IMAGES : isHeart ? HEART_IMAGES : isArt ? ART_IMAGES : EYE_IMAGES).map((src, i) => {
        const activeIndex = isStar ? starIndex : isHeart ? heartIndex : isArt ? artIndex : eyeIndex;
        const titles = isStar ? STAR_TITLES : isHeart ? HEART_TITLES : isArt ? ART_TITLES : EYE_TITLES;
        return (
          <img key={`${selected}-${i}`} src={src} alt={titles[i] ?? ""}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: activeIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }}
          />
        );
      })}

      {/* Progressive blur */}
      <div
        className="absolute inset-x-0 top-0 h-[72px] pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-x-0 top-0 h-[100px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)" }}
      />

      {/* Caption — single line, crossfades between "Offline" and the image caption */}
      <div className="absolute top-[16px] left-[16px]">
        <p
          className="font-['Inter_Tight',sans-serif] font-[300] text-[#faf9ff] text-[14px] leading-none"
          style={{ transition: "opacity 0.25s ease" }}
        >
          {renderLabel()}
        </p>
      </div>

      {/* Button menu — mobile: stretches to fill card */}
      <div
        className="md:hidden absolute rounded-[100px] p-[8px]"
        style={{
          bottom: "8px",
          left: "8px",
          right: "8px",
          height: "48px",
          background: "rgba(144,142,153,0.38)",
          backdropFilter: "blur(12px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-1/2 rounded-[24px]"
          style={{
            background: "rgba(209,206,220,0.3)",
            left: PILL_LEFT[selected],
            width: "20.8%",
            height: "36px",
            transform: "translateY(-50%)",
            transition: "left 0.2s ease",
          }}
        />
        <div
          className="absolute h-[2px] rounded-b-[4px]"
          style={{
            background: "#d9d9d9",
            width: "8.1%",
            bottom: "-2px",
            left: INDICATOR_LEFT[selected],
            transition: "left 0.2s ease",
          }}
        />
        <div
          className="absolute inset-0 rounded-[100px] flex items-center justify-between px-[8%]"
          style={{ border: "1px solid #908e99" }}
        >
          {BUTTONS.map(({ id, icon }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className="relative flex items-center justify-center rounded-[24px] cursor-pointer border-0 bg-transparent p-0"
              style={{ width: "20%", aspectRatio: "1/1" }}
              onMouseEnter={() => setHoveredBtn(id)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <div className="relative w-[90%] h-[90%] overflow-hidden">
                <img
                  alt={id}
                  src={icon}
                  className="block w-full h-full object-contain"
                  style={{
                    filter: "brightness(1)",
                    transition: "filter 0.15s ease",
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Button menu — desktop: fixed 307px per Figma */}
      <div
        className="hidden md:block absolute rounded-[100px] p-[8px]"
        style={{
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "220px",
          height: "48px",
          background: "rgba(144,142,153,0.2)",
          backdropFilter: "blur(12px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sliding pill */}
        <div
          className="absolute top-1/2 rounded-[24px]"
          style={{
            background: "rgba(209,206,220,0.3)",
            left: `${PILL_LEFT_PX[selected]}px`,
            width: "50px",
            height: "36px",
            transform: "translateY(-50%)",
            transition: "left 0.2s ease",
          }}
        />

        {/* Indicator bar */}
        <div
          className="absolute h-[2px] rounded-b-[4px]"
          style={{
            background: "#d9d9d9",
            width: "20px",
            bottom: "-2px",
            left: `${INDICATOR_LEFT_PX[selected]}px`,
            transition: "left 0.2s ease",
          }}
        />

        {/* Border + buttons */}
        <div
          className="absolute inset-0 rounded-[100px] flex items-center justify-evenly"
          style={{ border: "1px solid #908e99" }}
        >
          {BUTTONS.map(({ id, icon }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className="relative flex items-center justify-center size-[32px] rounded-[24px] cursor-pointer border-0 bg-transparent p-0"
              onMouseEnter={() => setHoveredBtn(id)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <div className="relative size-[28px] overflow-hidden">
                <img
                  alt={id}
                  src={icon}
                  className="block w-full h-full object-contain"
                  style={{
                    filter: "brightness(1)",
                    transition: "filter 0.15s ease",
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
