import { useState } from "react";
import iconStar from "../../assets/project/about/icon_star.svg";
import iconHeart from "../../assets/project/about/icon_heart.svg";
import iconPaint from "../../assets/project/about/icon_paint.svg";
import iconEye from "../../assets/project/about/icon_eye.png";
import star1 from "../../assets/project/about/star_1.png";
import star2 from "../../assets/project/about/star_2.png";
import star3 from "../../assets/project/about/star_3.png";
import heart1 from "../../assets/project/about/heart_1.png";
import heart2 from "../../assets/project/about/heart_2.png";
import heart3 from "../../assets/project/about/heart_3.png";
import art1 from "../../assets/project/about/art_1.png";
import art2 from "../../assets/project/about/art_2.png";
import art3 from "../../assets/project/about/art_3.png";
import eye1 from "../../assets/project/about/eye_1.png";
import eye2 from "../../assets/project/about/eye_2.png";
import eye3 from "../../assets/project/about/eye_3.png";

type Category = "star" | "heart" | "art" | "eye";

const PILL_LEFT: Record<Category, number> = {
  star:  8,
  heart: 84,
  art:   158,
  eye:   235,
};

const INDICATOR_LEFT: Record<Category, number> = {
  star:  28,
  heart: 103,
  art:   178,
  eye:   254,
};

const BUTTONS: { id: Category; icon: string }[] = [
  { id: "star",  icon: iconStar  },
  { id: "heart", icon: iconHeart },
  { id: "art",   icon: iconPaint },
  { id: "eye",   icon: iconEye   },
];

const STAR_IMAGES  = [star1, star2, star3];
const STAR_TITLES  = ["I graduated!", "I ran a marathon!", "I stood on a 10 ft frozen wave!"];

const HEART_IMAGES = [heart1, heart2, heart3];
const HEART_TITLES = ["Picnic with professors", "Figma at RIT", "New Media Club Formal"];

const ART_IMAGES   = [art1, art2, art3];
const ART_TITLES   = ["Had a 5 star Etsy", "Dabbled in calligraphy", "Tried ink"];

const EYE_IMAGES   = [eye1, eye2, eye3];
const EYE_TITLES   = ["Looking for my next concert", "Reading books + zines", null];

export default function OfflineCard() {
  const [hovered, setHovered]       = useState(false);
  const [selected, setSelected]     = useState<Category>("star");
  const [hoveredBtn, setHoveredBtn] = useState<Category | null>(null);
  const [starIndex, setStarIndex]   = useState(0);
  const [heartIndex, setHeartIndex] = useState(0);
  const [artIndex, setArtIndex]     = useState(0);
  const [eyeIndex, setEyeIndex]     = useState(0);
  const [beliHovered, setBeliHovered] = useState(false);

  const isStar  = selected === "star";
  const isHeart = selected === "heart";
  const isArt   = selected === "art";
  const isEye   = selected === "eye";
  const isClickable = isStar || isHeart || isArt || isEye;

  function handleCardClick() {
    if (isStar)  setStarIndex((i)  => (i + 1) % STAR_IMAGES.length);
    if (isHeart) setHeartIndex((i) => (i + 1) % HEART_IMAGES.length);
    if (isArt)   setArtIndex((i)   => (i + 1) % ART_IMAGES.length);
    if (isEye)   setEyeIndex((i)   => (i + 1) % EYE_IMAGES.length);
  }

  function renderCaption() {
    if (!hovered) return "Offline";
    if (isStar)  return STAR_TITLES[starIndex];
    if (isHeart) return HEART_TITLES[heartIndex];
    if (isArt)   return ART_TITLES[artIndex];
    if (isEye) {
      if (eyeIndex === 2) {
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
                fontWeight: beliHovered ? 500 : 300,
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
      return EYE_TITLES[eyeIndex];
    }
    return "Offline";
  }

  return (
    <div
      className="relative w-full rounded-[8px] overflow-hidden"
      style={{ aspectRatio: "1 / 1", background: "#2c2c2c", cursor: isClickable ? "pointer" : "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isClickable ? handleCardClick : undefined}
    >
      {/* Star images */}
      {STAR_IMAGES.map((src, i) => (
        <img key={`star-${i}`} src={src} alt={STAR_TITLES[i]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isStar && starIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
      ))}

      {/* Heart images */}
      {HEART_IMAGES.map((src, i) => (
        <img key={`heart-${i}`} src={src} alt={HEART_TITLES[i]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isHeart && heartIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
      ))}

      {/* Art images */}
      {ART_IMAGES.map((src, i) => (
        <img key={`art-${i}`} src={src} alt={ART_TITLES[i]}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isArt && artIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
      ))}

      {/* Eye images */}
      {EYE_IMAGES.map((src, i) => (
        <img key={`eye-${i}`} src={src} alt={`eye ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isEye && eyeIndex === i ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
      ))}

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

      {/* Caption */}
      <div className="absolute top-[16px] left-[16px]">
        <p className="font-['Inter_Tight',sans-serif] font-[300] text-[#faf9ff] text-[14px] leading-none">
          {renderCaption()}
        </p>
      </div>

      {/* Button menu */}
      <div
        className="absolute h-[48px] w-[307px] rounded-[100px] p-[8px]"
        style={{
          bottom: "16px",
          left: "50%",
          background: "rgba(144,142,153,0.38)",
          backdropFilter: "blur(12px)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(-50%)" : "translateX(-50%) translateY(8px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sliding pill */}
        <div
          className="absolute top-1/2 h-[36px] w-[64px] rounded-[24px]"
          style={{
            background: "rgba(209,206,220,0.3)",
            left: `${PILL_LEFT[selected]}px`,
            transform: "translateY(-50%)",
            transition: "left 0.2s ease",
          }}
        />

        {/* Indicator bar */}
        <div
          className="absolute h-[2px] w-[25px] rounded-b-[4px]"
          style={{
            background: "#d9d9d9",
            bottom: "-2px",
            left: `${INDICATOR_LEFT[selected]}px`,
            transition: "left 0.2s ease",
          }}
        />

        {/* Border + buttons */}
        <div
          className="absolute inset-0 rounded-[100px] flex items-center justify-between px-[24px]"
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
                    filter: selected === id || hoveredBtn === id ? "brightness(1)" : "brightness(0.2)",
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
