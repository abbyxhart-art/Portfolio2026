import { useState } from "react";
import icons from "../../../assets/icons/icons.json";
import star1 from "../../../assets/project/about/star_1.png";
import star2 from "../../../assets/project/about/star_2.png";
import star3 from "../../../assets/project/about/star_3.png";
import heart1 from "../../../assets/project/about/heart_1.png";
import heart2 from "../../../assets/project/about/heart_2.png";
import heart3 from "../../../assets/project/about/heart_3.png";
import eye1 from "../../../assets/project/about/eye_1.png";
import eye2 from "../../../assets/project/about/eye_2.png";
import eye3 from "../../../assets/project/about/eye_3.png";

const STAR_IMAGES  = [star1, star2, star3];
const STAR_TITLES  = ["I graduated!", "I ran a marathon!", "I stood on a frozen wave!"];

const HEART_IMAGES = [heart1, heart2, heart3];
const HEART_TITLES = ["Picnic with professors", "Figma at RIT", "New Media Club Formal"];

const EYE_IMAGES   = [eye1, eye2, eye3];
const EYE_TITLES   = ["Looking for my next concert", "Reading books + zines", null];

type MiniCategory = "heart" | "star" | "eye";

const MINI_IMAGES: Record<MiniCategory, string[]> = {
  heart: HEART_IMAGES,
  star: STAR_IMAGES,
  eye: EYE_IMAGES,
};

const MINI_TITLES: Record<MiniCategory, (string | null)[]> = {
  heart: HEART_TITLES,
  star: STAR_TITLES,
  eye: EYE_TITLES,
};

// Mobile-only: 3 of these sit side by side in place of the single
// pill-switcher OfflineCard — each is locked to one category and just
// cycles its own images on tap, per the Figma "Early Days" mobile redesign.
// Label matches "Hello from SF!" (12px) for consistency across every square
// in this row: idle reads "Tap to cycle", then shows each photo's own
// caption once tapped (falling back to "Tap to cycle" if a photo has none).
export function OfflineMiniCard({ category, className }: { category: MiniCategory; className?: string }) {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const images = MINI_IMAGES[category];
  const titles = MINI_TITLES[category];
  const label = interacted ? (titles[index] ?? "Tap to cycle") : "Tap to cycle";

  return (
    <div
      className={`relative rounded-[var(--radius-component-card)] overflow-hidden cursor-pointer ${className ?? ""}`}
      style={{
        aspectRatio: "1 / 1",
        background: "var(--color-surface-fill1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      onClick={() => { setIndex((i) => (i + 1) % images.length); setInteracted(true); }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={titles[i] ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: index === i ? 1 : 0, transition: "opacity 0.3s ease" }}
        />
      ))}
      <div
        className="absolute inset-x-0 top-0 h-[40px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)" }}
      />
      <p
        className="absolute top-[6px] left-[6px] right-[6px] font-['Inter_Tight',sans-serif] text-[12px] leading-[1.3]"
        style={{ color: "var(--color-text-primary)" }}
      >
        {label}
      </p>
    </div>
  );
}

// All categories combined into a single click-through array — "Looking for
// my next concert" leads, then "I graduated!", per user order
const ORDERED_ITEMS: { src: string; title: string | null; isCafe?: boolean }[] = [
  { src: eye1,   title: EYE_TITLES[0] },
  { src: star1,  title: STAR_TITLES[0] },
  { src: star2,  title: STAR_TITLES[1] },
  { src: heart1, title: HEART_TITLES[0] },
  { src: star3,  title: STAR_TITLES[2] },
  { src: heart2, title: HEART_TITLES[1] },
  { src: heart3, title: HEART_TITLES[2] },
  { src: eye2,   title: EYE_TITLES[1] },
  { src: eye3,   title: EYE_TITLES[2], isCafe: true },
];
const ALL_IMAGES = ORDERED_ITEMS.map((item) => item.src);
const ALL_TITLES = ORDERED_ITEMS.map((item) => item.title);
const CAFE_INDEX = ORDERED_ITEMS.findIndex((item) => item.isCafe);

// Same pill treatment as SpotifyPlayer's skip-forward control — the whole
// card is already click-through, but that wasn't obvious, so this makes the
// affordance visible.
function SkipButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      className="absolute"
      style={{
        bottom: 12,
        left: 12,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        background: hovered ? "rgba(218,216,227,0.75)" : "rgba(218,216,227,0.5)",
        borderRadius: "100px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        transition: "background 0.15s ease",
      }}
    >
      <svg width="16" height="16" viewBox={icons.media["skip-forward"].viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={icons.media["skip-forward"].paths[0].d} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function OfflineCard() {
  const [hovered, setHovered]         = useState(false);
  const [index, setIndex]             = useState(0);
  const [beliHovered, setBeliHovered] = useState(false);

  function handleCardClick() {
    setIndex((i) => (i + 1) % ALL_IMAGES.length);
  }

  // Single label — "Offline" at rest, current image caption on hover
  function renderLabel() {
    if (!hovered) return "Offline";
    if (index === CAFE_INDEX) return renderCafeLink();
    return ALL_TITLES[index];
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
      {/* All images, crossfaded by click-through index */}
      {ALL_IMAGES.map((src, i) => (
        <img key={i} src={src} alt={ALL_TITLES[i] ?? ""}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: index === i ? 1 : 0, transition: "opacity 0.3s ease" }}
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

      {/* Caption — single line, crossfades between "Offline" and the image caption */}
      <div className="absolute top-[16px] left-[16px]">
        <p
          className="font-['Inter_Tight',sans-serif] font-[300] text-[#faf9ff] text-[14px] leading-none"
          style={{ transition: "opacity 0.25s ease" }}
        >
          {renderLabel()}
        </p>
      </div>

      <SkipButton onClick={handleCardClick} />
    </div>
  );
}
