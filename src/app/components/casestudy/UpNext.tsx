import { useEffect, useState } from "react";
import { Link } from "react-router";
import aixelsMeImg from "../../../assets/project/aixels/me.JPG";
import gmTeaserVideo from "../../../assets/project/gentlemonster/GM_Teaser_2x1.mp4";

const figbuildVideo  = new URL("../../../assets/project/figbuild/figbuild_macstudio_2x1.mp4", import.meta.url).href;
const capitolVideo   = new URL("../../../assets/project/capitol/capitol_fullflow.mp4", import.meta.url).href;
const texasVideo     = new URL("../../../assets/project/texasid/FullPrototype_1200x600_30fps.mp4", import.meta.url).href;

type CasestudyEntry = {
  id: string;
  title: string;
  path: string;
  mediaType: "video" | "image" | null;
  mediaSrc?: string;
};

const ALL: CasestudyEntry[] = [
  { id: "gentle-monster",    title: "Gentle Monster Kiosk", path: "/casestudy/gentle-monster",    mediaType: "video", mediaSrc: gmTeaserVideo },
  { id: "capitol-aluminum",  title: "Capitol Aluminum",     path: "/casestudy/capitol-aluminum",  mediaType: "video", mediaSrc: capitolVideo },
  { id: "texas-mobile",      title: "Texas Mobile",         path: "/casestudy/texas-mobile",      mediaType: "video", mediaSrc: texasVideo },
  { id: "figma-rit",         title: "FigBuild 2026",        path: "/casestudy/figma-rit",         mediaType: "video", mediaSrc: figbuildVideo },
  { id: "aixels",            title: "AIXELS",               path: "/casestudy/aixels",            mediaType: "image", mediaSrc: aixelsMeImg },
];

const VISITED_KEY = (id: string) => `visited_${id}`;

export default function UpNext({ currentId }: { currentId: string }) {
  const [next, setNext] = useState<CasestudyEntry | null>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    localStorage.setItem(VISITED_KEY(currentId), "true");

    const others = ALL.filter((c) => c.id !== currentId);
    const unvisited = others.filter((c) => !localStorage.getItem(VISITED_KEY(c.id)));
    setNext(unvisited.length > 0 ? unvisited[0] : others[0]);
  }, [currentId]);

  if (!next) return null;

  return (
    <div className="flex flex-col items-start pt-[100px] pb-[100px] w-full">
      <Link
        to={next.path}
        className="flex flex-col gap-[17px] items-start w-full no-underline"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* Label */}
        <div className="flex items-center px-[16px]">
          <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] whitespace-nowrap">
            Up next
          </p>
        </div>

        {/* Card */}
        <div className="relative flex flex-col gap-[16px] items-start p-[16px] w-full">
          {/* Animation frame */}
          <div
            className="absolute pointer-events-none rounded-[8px] border border-[#d1cedc] transition-all duration-300 ease-out"
            style={{
              inset: isHover ? "0px" : "8px",
              opacity: isHover ? 1 : 0,
            }}
          />

          {/* Title */}
          <p
            className="font-['Inter_Tight',sans-serif] font-normal leading-[1.25] text-[20px] whitespace-nowrap transition-colors duration-300 ease-out"
            style={{ color: isHover ? "var(--text\\/primary, #faf9ff)" : "#585564" }}
          >
            {next.title}
          </p>

          {/* Image */}
          <div className="aspect-[2/1] rounded-[8px] w-full overflow-hidden bg-[#d9d9d9]">
            {next.mediaType === "video" && next.mediaSrc && (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={next.mediaSrc} />
            )}
            {next.mediaType === "image" && next.mediaSrc && (
              <img src={next.mediaSrc} className="w-full h-full object-cover" alt={next.title} />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
