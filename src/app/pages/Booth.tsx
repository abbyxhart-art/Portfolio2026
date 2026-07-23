import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useLocation, useNavigate } from "react-router";
import Lenis from "lenis";
import { useLenis } from "../context/LenisContext";
import icons from "../../assets/icons/icons.json";

import munsonVideo from "../../assets/project/booth/munson.mp4";
import munsonDefault from "../../assets/project/booth/munson_default.png";
import munsonInstallation from "../../assets/project/booth/munson-installation.png";
import munsonMe from "../../assets/project/booth/munson-me.JPG";
import beyondCover from "../../assets/project/booth/beyondfashion-cover.mp4";
import beyondVolunteerTeam from "../../assets/project/booth/beyondfashion_hover.JPG";
import beyondRehearsal from "../../assets/project/booth/beyondfashion-rehearsal.jpeg";
import beyondTest from "../../assets/project/booth/beyondfashion-test.jpeg";
import beyondInstallation from "../../assets/project/booth/beyondfashion-installation.jpeg";
import marcCover from "../../assets/project/booth/marc-cover.png";
import marcShot from "../../assets/project/booth/marc-shot.png";
import marcNotes from "../../assets/project/booth/marc-notes.jpg";
import marcNodes from "../../assets/project/booth/marc-nodes.jpeg";
import marcModel1 from "../../assets/project/booth/marc-model1.png";
import marcModel2 from "../../assets/project/booth/marc-model2.png";
import marcLightingStudy from "../../assets/project/booth/cos2_2x1.png";
import irisCover from "../../assets/project/booth/iris-cover.mp4";
import irisGroup from "../../assets/project/booth/iris-group.jpg";
import irisHover from "../../assets/project/booth/iris_hover.MOV";
import irisFeedback2 from "../../assets/project/booth/IRIS-feedback2.mp4";
import irisNotes from "../../assets/project/booth/iris-notes.png";
import irisFlow1 from "../../assets/project/booth/iris-flow1.png";
import irisFlow2 from "../../assets/project/booth/iris-flow2.png";
import irisPrototype1 from "../../assets/project/booth/iris-protoype1.png";
import sgCover from "../../assets/project/booth/sg-cover.png";
import sgOlivia from "../../assets/project/booth/sg_olivia.png";
import sgGaby from "../../assets/project/booth/sg_gaby.png";
import sgPole from "../../assets/project/booth/sg_pole.png";
import tianCover from "../../assets/project/booth/tian-cover.mp4";
import tianCalendar from "../../assets/project/booth/tian-calendar.mp4";
import tianComponentSystem from "../../assets/project/booth/tian-componentsystem.png";
import tianForms from "../../assets/project/booth/tian-forms.mp4";
import tianMilitaryTime from "../../assets/project/booth/tian-militarytime.png";
import tianPrototyping from "../../assets/project/booth/tian-prototyping.png";
import tianTickets from "../../assets/project/booth/tian-tickets.mp4";
import tianConfirmed from "../../assets/project/booth/tian-confirmed.mp4";
import tianTokenSystem from "../../assets/project/booth/tian-tokensystem.png";
import tianVariables from "../../assets/project/booth/tian-variables.png";
import kpopCover from "../../assets/project/booth/kpop-cover.mp4";
import figmaRitFashion from "../../assets/project/booth/figmarit-fashion.png";
import figmaRitKpop from "../../assets/project/booth/figmarit-kpop.png";
import figmaRitLeaders from "../../assets/project/booth/figmarit-leaders.jpg";
import cosCover from "../../assets/project/booth/cos_cover.png";
import batesReal1 from "../../assets/project/booth/bates-real1.jpg";
import batesReal2 from "../../assets/project/booth/bates-real2.jpg";
import batesDean from "../../assets/project/booth/bates-dean.jpg";
import batesIllustrator from "../../assets/project/booth/bates-illustrator.jpg";
import batesIndesign from "../../assets/project/booth/bates-indesign.jpg";
import dragonCover from "../../assets/project/booth/dragondoodle-cover.mp4";
import dragonBones from "../../assets/project/booth/dragondoodle-bones.png";
import dragonCode from "../../assets/project/booth/dragondoodle-code.png";
import dragonAssets from "../../assets/project/booth/dragondoodle-assets.png";
import dragonRiveTimeline from "../../assets/project/booth/dragondoodle-rivetimeline.png";
import dragonTesting from "../../assets/project/booth/dragondoodle-testing.mov";
import dragonText from "../../assets/project/booth/dragondoodle-text.jpg";

const LAB_CARDS = [
  { id: "dragon-doodle", category: "Interaction", title: "Dragon Doodle", year: "2025", video: dragonCover },
  { id: "beyond-fashion", category: "Motion", title: "Beyond Fashion", year: "2024", video: beyondCover },
  { id: "tian-airlines", category: "Advanced Figma Logic", title: "Tian Air", year: "2025", video: tianCover },
  { id: "iris", category: "Experience", title: "IRIS AI", year: "2024", video: irisCover, hasAudio: true },
  { id: "figma-rit", category: "Workshop", title: "Figma at RIT", year: "2025", video: kpopCover },
  { id: "marc-jacobs", category: "Illustration", title: "Marc Jacobs Daisy Haze", year: "2023", image: marcCover },
  { id: "dj-munson", category: "Installation", title: "DJ Munson's Last Spin", year: "2025", video: munsonVideo },
  { id: "sg-stickers", category: "Illustration", title: "Popcorn Stickers", year: "2023", image: sgCover },
  { id: "college-of-science", category: "Graphic", title: "College of Science", year: "2023", image: cosCover },
];

// Small pill overlay toggling a video's mute state — rendered as a <span>
// with role="button" rather than a real <button> because LazyVideo is used
// inside LabCard, which is itself a <button>; nesting real buttons is invalid
// HTML. stopPropagation on both mousedown and click keeps a click here from
// also opening the modal (LabCard) or starting a drag (ImageRow's scroller).
function VolumeButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  const icon = muted ? icons.media["volume-off"] : icons.media["volume-on"];
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={muted ? "Unmute video" : "Mute video"}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          e.preventDefault();
          onToggle();
        }
      }}
      className="absolute bottom-[12px] right-[12px] z-10 flex items-center justify-center size-[32px] rounded-full border border-solid cursor-pointer"
      style={{
        background: "rgba(48,47,52,0.4)",
        borderColor: "rgba(174,171,185,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <svg width="16" height="16" viewBox={icon.viewBox} fill="none">
        <path d={icon.paths[0].d} stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function LazyVideo({
  src,
  className,
  showVolumeToggle,
}: {
  src: string;
  className?: string;
  showVolumeToggle?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isIntersecting = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reload in place when the source changes (e.g. switching tabs) instead of
  // forcing a full remount — lighter on the browser and lets a clip that was
  // already fetched once come back from cache instead of re-downloading.
  useEffect(() => {
    const el = ref.current;
    if (!el || !isIntersecting.current) return;
    el.load();
    el.play().catch(() => { });
  }, [src]);

  const toggleMuted = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <>
      <video
        ref={ref}
        loop
        muted={muted}
        playsInline
        // "none" meant the browser had no idea of the video's natural
        // dimensions until it actually started loading, so w-auto containers
        // would pop from a 0/placeholder size to their real size right as
        // playback kicked in — a visible jump. "metadata" fetches just enough
        // to know real dimensions up front (cheap) without downloading the
        // full clip until it's actually in view and play() is called.
        preload="metadata"
        src={src}
        className={className}
      />
      {showVolumeToggle && <VolumeButton muted={muted} onToggle={toggleMuted} />}
    </>
  );
}

function LabCard({
  category,
  title,
  year,
  image,
  video,
  showVolumeToggle,
  onClick,
  background,
}: {
  category: string;
  title: string;
  year: string;
  image?: string;
  video?: string;
  showVolumeToggle?: boolean;
  onClick?: () => void;
  background?: string;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "open" }))}
      onMouseLeave={() => document.dispatchEvent(new CustomEvent("cursor:variant", { detail: "default" }))}
      className="relative aspect-square rounded-[16px] overflow-hidden shrink-0 text-left border border-solid"
      style={{ background: background ?? "var(--color-surface-fill4)", borderColor: "var(--color-border-default)" }}
    >
      {video ? (
        <LazyVideo src={video} className="absolute inset-0 w-full h-full object-cover" showVolumeToggle={showVolumeToggle} />
      ) : image ? (
        <img src={image} alt={title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      ) : null}
      <div className="absolute bottom-0 left-0 flex flex-col items-start p-[16px]">
        <div className="flex flex-col gap-[4px] items-start font-['Inter_Tight',sans-serif] font-light leading-[1.65]">
          <p className="text-[12px] text-[#908e99]">
            {category} {year}
          </p>
          <p className="text-[16px] text-[#faf9ff]">{title}</p>
        </div>
      </div>
    </button>
  );
}

function TianTabSlider({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="relative bg-[rgba(48,47,52,0.4)] border border-[#302f34] p-[8px] rounded-[100px] flex gap-[10px] items-start shrink-0">
      <div
        className="absolute top-[8px] h-[32px] w-[100px] rounded-[24px] bg-[rgba(144,142,153,0.2)] transition-[left] duration-300 ease-in-out"
        style={{ left: `${8 + active * 110}px` }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[39px] h-[2px] w-[48px] bg-[#d9d9d9] rounded-bl-[4px] rounded-br-[4px]" />
      </div>
      {tabs.map((label, i) => (
        <button
          key={label}
          onClick={() => onChange(i)}
          className="relative h-[32px] w-[100px] flex items-center justify-center rounded-[24px]"
        >
          <span
            className={`font-['Inter_Tight',sans-serif] font-light leading-none text-[14px] transition-colors duration-200 ${active === i ? "text-[#faf9ff]" : "text-[#908e99]"
              }`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

const TIAN_TABS = ["Booking", "Dates", "Tickets", "Forms", "Confirmed"];

const TIAN_TAB_MEDIA: { type: "video" | "image"; src: string }[] = [
  { type: "video", src: tianCover },
  { type: "video", src: tianCalendar },
  { type: "video", src: tianTickets },
  { type: "video", src: tianForms },
  { type: "video", src: tianConfirmed },
];

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Same pill shape, size, blur, and hover state as HomeButton — the "esc"
// keycap doubles as the actual keyboard shortcut that closes the modal.
function ClosePill({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-[6px] items-center pl-[10px] pr-[12px] py-[6px] rounded-[24px] border border-solid"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: hovered ? "var(--color-surface-fill2)" : "var(--color-button-default-fill)",
        borderColor: "var(--color-border-default)",
        transition: "background 0.15s ease",
      }}
    >
      <CloseIcon />
      <div
        className="flex items-center justify-center h-[18px] px-[5px] rounded-[3px]"
        style={{ background: "rgba(144,142,153,0.2)" }}
      >
        <p className="font-['Inter_Tight',sans-serif] text-[10px] text-[#908e99] leading-none">esc</p>
      </div>
    </button>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M3.5 9h11M10 4.5L14.5 9 10 13.5"
        stroke="var(--color-text-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Prev/next pill pair — replaces the old breadcrumb dots. Sits above the
// gallery, directly under the section divider. Each side dims and stops
// responding to clicks when there's nowhere left to go (non-looping rows).
function GalleryNav({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  const pillStyle = { background: "rgba(48,47,52,0.4)", borderColor: "rgba(174,171,185,0.15)" };
  return (
    <div className="flex items-center gap-[3px]">
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous photo"
        className="flex items-center justify-center size-[32px] rounded-tl-[24px] rounded-bl-[24px] rounded-tr-[4px] rounded-br-[4px] border border-solid disabled:opacity-30"
        style={pillStyle}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next photo"
        className="flex items-center justify-center size-[32px] rounded-tr-[24px] rounded-br-[24px] rounded-tl-[4px] rounded-bl-[4px] border border-solid disabled:opacity-30"
        style={pillStyle}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

// A row of images/videos that share a height (so they line up) but keep their
// own natural aspect ratio — width just follows from that, nothing is cropped.
// Drag-to-scroll like the old Gallery component, plus a prev/next pill that
// steps one item at a time via the browser's own scrollIntoView — no manual
// width/offset measuring, no clones. `loop` (default true) controls whether
// next/prev wrap around at the ends or just stop there.
function ImageRow({
  items,
  height = 300,
  layout = "auto",
  loop = true,
}: {
  items: { src: string; alt: string; video?: boolean; hasAudio?: boolean }[];
  height?: number;
  // "fill": exactly 2 rectangular photos stretch to fill the width, no scroll.
  // "auto" (default): photos keep their own aspect ratio; the row only
  // becomes a scroller — with a prev/next pill — if it actually overflows.
  layout?: "auto" | "fill";
  loop?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [overflowing, setOverflowing] = useState(false);
  const [index, setIndex] = useState(0);
  const isDragging = useRef(false);
  const dragOrigin = useRef({ x: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);
  const canNav = layout === "auto" && items.length > 1;

  // Watching only the container was the bug behind "some modals don't have
  // the buttons": images/videos have no intrinsic size until they load, so
  // the row's scrollWidth is ~0 on first measure and never overflows. The
  // container's own box doesn't resize when its content grows past it, so a
  // ResizeObserver on just the container never fires again once the media
  // finishes loading. Observing each item too means overflow gets
  // re-checked as soon as any of them gains its real size.
  useEffect(() => {
    if (layout === "fill") return;
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));
    return () => ro.disconnect();
  }, [items.length, layout]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollRef.current) return;
      scrollRef.current.scrollLeft = dragOrigin.current.scrollLeft - (e.clientX - dragOrigin.current.x);
    };
    const onUp = () => {
      isDragging.current = false;
      setDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    dragOrigin.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 };
    e.preventDefault();
  };

  const goTo = (i: number) => {
    setIndex(i);
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const goNext = () => {
    if (!canNav) return;
    if (index + 1 < items.length) goTo(index + 1);
    else if (loop) goTo(0);
  };

  const goPrev = () => {
    if (!canNav) return;
    if (index - 1 >= 0) goTo(index - 1);
    else if (loop) goTo(items.length - 1);
  };

  const renderItem = (item: { src: string; alt: string; video?: boolean; hasAudio?: boolean }, i: number) => (
    <div
      key={i}
      ref={(el) => { itemRefs.current[i] = el; }}
      className="flex flex-col gap-[16px] items-start shrink-0"
    >
      <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5] text-[#908e99]">{item.alt}</p>
      <div className="relative rounded-[12px] overflow-hidden bg-[#2c2c2c]" style={{ height }}>
        {item.video ? (
          <LazyVideo
            src={item.src}
            className="h-full w-auto object-contain pointer-events-none"
            showVolumeToggle={item.hasAudio}
          />
        ) : (
          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-auto object-contain pointer-events-none" />
        )}
      </div>
    </div>
  );

  if (layout === "fill") {
    return (
      <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] w-full">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
            <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5] text-[#908e99]">{item.alt}</p>
            <div className="aspect-[1200/600] w-full rounded-[12px] overflow-hidden bg-[#2c2c2c]">
              {item.video ? (
                <LazyVideo src={item.src} className="w-full h-full object-cover" />
              ) : (
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {overflowing && items.length > 1 && (
        <GalleryNav
          onPrev={goPrev}
          onNext={goNext}
          prevDisabled={!loop && index === 0}
          nextDisabled={!loop && index === items.length - 1}
        />
      )}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        className={`flex flex-nowrap items-start gap-[16px] sm:gap-[24px] w-full overflow-x-auto no-scrollbar select-none ${dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
      >
        {items.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  );
}

function ModalSection({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  // A plain string renders as a single paragraph (every existing caller).
  // Passing multiple <p> elements (e.g. a fragment) instead renders them
  // stacked with the same shared text styling, for bodies with more than
  // one paragraph.
  body?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[32px] items-start w-full">
      <div className="flex flex-col gap-[16px] items-start w-full font-['Inter_Tight',sans-serif] not-italic">
        <div className="flex flex-col gap-[8px] items-start w-full">
          <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">{eyebrow}</p>
          <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">{title}</p>
        </div>
        {body && (typeof body === "string" ? (
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99] w-full">{body}</p>
        ) : (
          <div className="flex flex-col gap-[16px] font-light text-[16px] leading-[1.75] text-[#908e99] w-full">{body}</div>
        ))}
      </div>
      {children && (
        <>
          <div className="w-full h-px bg-[rgba(174,171,185,0.15)]" />
          {children}
        </>
      )}
    </div>
  );
}

// Shared shell for every project modal: its own Lenis instance (scrolling
// feels identical to the rest of the site), wheel events that miss the
// scroller get forwarded into it (so scrolling anywhere moves the modal, not
// the page), and the close pill pinned top-right.
function ModalFrame({
  onClose,
  overview,
  expandBy = 150,
  children,
}: {
  onClose: () => void;
  overview: React.ReactNode;
  // How much taller the modal grows once the user starts scrolling.
  expandBy?: number;
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const modalLenisRef = useRef<Lenis | null>(null);
  const [overviewHeight, setOverviewHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  const modalHeightRef = useRef(0);

  // Measure the overview block itself instead of hardcoding a height — the
  // collapsed modal is always exactly 32px top + overview + 32px bottom,
  // however tall the overview happens to render (with or without a tab
  // menu, at any viewport width), and stays correct if that content ever
  // changes.
  useLayoutEffect(() => {
    const el = overviewRef.current;
    if (!el) return;
    const update = () => setOverviewHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const baseHeight = (overviewHeight ?? 0) + 64;
  const modalHeight = expanded ? baseHeight + expandBy : baseHeight;
  const thumbHeight = 32;

  // Keep a ref mirroring the latest modal height so the Lenis scroll handler
  // below (registered once) can read it without needing to be recreated on
  // every height change.
  useEffect(() => {
    modalHeightRef.current = modalHeight;
  }, [modalHeight]);

  useEffect(() => {
    const wrapper = scrollRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;
    const instance = new Lenis({ wrapper, content, lerp: 0.12 });
    modalLenisRef.current = instance;
    instance.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      // Lenis fires this roughly once per animation frame while scrolling.
      // Routing both values through React state meant the whole modal
      // subtree — every image and video in it — re-rendered at that rate,
      // which is what made scrolling feel laggy. The expand toggle only
      // actually changes twice per scroll session, so gate it to real
      // transitions; the thumb position changes every frame by design, so
      // it's pushed straight to the DOM instead of through state.
      const isExpanded = scroll > 8;
      if (isExpanded !== expandedRef.current) {
        expandedRef.current = isExpanded;
        setExpanded(isExpanded);
      }
      const progress = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
      const trackHeight = Math.max(0, modalHeightRef.current - 32);
      const top = 16 + progress * Math.max(0, trackHeight - thumbHeight);
      if (thumbRef.current) thumbRef.current.style.top = `${top}px`;
    });
    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      modalLenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scroller = scrollRef.current;
      if (!scroller) return;
      if (e.target instanceof Node && scroller.contains(e.target)) return;
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      const lenis = modalLenisRef.current;
      if (lenis) {
        lenis.scrollTo(lenis.targetScroll + delta);
      } else {
        scroller.scrollTop += delta;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1, height: modalHeight }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
        height: { duration: 0.5, ease: [0.33, 0, 0, 1] },
      }}
      className="relative bg-[#161617] border border-[rgba(174,171,185,0.15)] rounded-[12px] w-[min(1223px,92vw)] max-h-[90vh] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute right-[32px] top-[32px] z-10">
        <ClosePill onClick={onClose} />
      </div>

      {/* Scroll progress thumb — moves down the right side as you scroll.
          Position is set directly on the DOM node (see the Lenis "scroll"
          handler above) rather than through React state. */}
      <div
        ref={thumbRef}
        className="absolute right-[7px] w-[8px] rounded-[12px] z-10 pointer-events-none"
        style={{ height: thumbHeight, top: 16, background: "rgba(144,142,153,0.2)" }}
      />

      {/* One continuous scroll region driven by the modal's own Lenis instance.
          Lenis needs a single content element to measure, hence the inner div. */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar"
        style={{ overscrollBehavior: "contain" }}
      >
        <div
          ref={contentRef}
          className="flex flex-col items-start gap-[150px] pt-[32px] px-[32px] pb-[80px]"
        >
          <div ref={overviewRef} className="w-full">
            {overview}
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function TianModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState(0);
  const active = TIAN_TAB_MEDIA[tab];

  const overview = (
    <div className="flex flex-col gap-[15px] w-full items-start">
      <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
        <div className="relative w-full lg:w-[700px] lg:h-[467px] rounded-[12px] overflow-hidden bg-white shrink-0">
          <AnimatePresence>
            <motion.div
              key={active.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {active.type === "video" ? (
                <LazyVideo src={active.src} className="w-full h-full object-cover" />
              ) : (
                <img src={active.src} alt={TIAN_TABS[tab]} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-[50px] justify-center w-full lg:flex-1 min-w-0">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
              <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
              <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Tian Design System</p>
            </div>
            <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.75] text-[#908e99]">
              Tian Airlines is a study on hi-fi prototyping and design systems within Figma. All flight information works, with proper checking of time and potential departure / arrivals.
            </p>
          </div>
          <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
            <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
              Runs on calculator switches in Figma (like a mouse listener) Created Tian / Heaven alongside Nebula design system
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[700px] flex justify-center shrink-0">
        <TianTabSlider tabs={TIAN_TABS} active={tab} onChange={setTab} />
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Figma"
          title="Design System and Logic"
          body="I used 5 different calculators full of if/else statements and a special collection of variables to keep this all running plus the regular design system collections"
        >
          <ImageRow
            items={[
              { src: tianVariables, alt: "Variables" },
              { src: tianPrototyping, alt: "Prototyping" },
              { src: tianMilitaryTime, alt: "Military time" },
              { src: tianTokenSystem, alt: "Token system" },
              { src: tianComponentSystem, alt: "Cards" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function DragonModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <LazyVideo src={dragonCover} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Dragon Doodle</p>
          </div>
          <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
              This dragon collects mooncakes based on your ability to sing the notes of "Twinkle, Twinkle, Little Star."
            </p>
            <p className="font-light text-[12px] leading-[1.5] text-[#908e99]">
              It was later recreated in Figma Make, which you can see in the video!
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
            Figma vectors, Rive animations, Claude generated logic
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="The beginning"
          title="Music, tempo, and frequency"
          body="The problem with music is it's time based and frequency (Hz) changes between low tones (very little difference) and high (very high difference). There were issues with voices being at different octaves and tempo, making it a little jittery."
        >
          <ImageRow
            items={[
              { src: dragonTesting, alt: "Feedback Testing Note Sensitivity", video: true },
              { src: dragonAssets, alt: "Dragon Assets" },
              { src: dragonText, alt: "Feedback" },
              { src: dragonBones, alt: "Dragon Bones" },
              { src: dragonRiveTimeline, alt: "Rive State Machine" },
              { src: dragonCode, alt: "Code" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

// Credit line under a modal's overview media — prefix in text-secondary,
// name in text-primary, whole thing linking out to the credited person.
function CreditLine({ prefix, name, href }: { prefix: string; name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] no-underline"
    >
      <span style={{ color: "var(--color-text-secondary)" }}>{prefix} </span>
      <span style={{ color: "var(--color-text-primary)" }}>{name}</span>
    </a>
  );
}

function BeyondFashionModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
        <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
          <LazyVideo src={beyondCover} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
              <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
              <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Beyond Fashion : Off the Table</p>
            </div>
            <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
              <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
                A student-led fashion show supporting local artists, with each team creating visuals for a designer or club.
              </p>
              <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
                The year's theme was Vignelli's dishware.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
            <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">
              Cinema 4D, After Effects, Resolume Arena
            </p>
          </div>
        </div>
      </div>
      <CreditLine prefix="Graphics by" name="Jackson Palmer" href="https://www.linkedin.com/in/jacksonpalmer04/" />
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Side Quests"
          title="Touch Designer experiments"
          body="I also helped build a 20-foot interactive installation for the theme Off the Table: Vignelli, using TouchDesigner and a hidden camera to let hand movements control rotating Vignelli cups. When the event was short-staffed, I volunteered backstage to help run the final show."
        >
          <ImageRow
            loop={false}
            items={[
              { src: beyondVolunteerTeam, alt: "Volunteer Team" },
              { src: beyondRehearsal, alt: "Rehearsal" },
              { src: beyondTest, alt: "Test" },
              { src: beyondInstallation, alt: "Installation" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function MarcJacobsModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <img src={marcCover} alt="Marc Jacobs" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Marc Jacobs</p>
          </div>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
            An imaginary perfume joining the Marc Jacobs Daisy line.
          </p>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Cinema 4D, Photoshop</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="3D"
          title="Light"
          body="I explored lighting environments, and caustics and learned so much about treating light as a medium. I spent so many nights figuring out the perfect balance of frosted glass and plastic."
        >
          <ImageRow
            items={[
              { src: marcShot, alt: "Shot" },
              { src: marcNotes, alt: "Sketches" },
              { src: marcNodes, alt: "Material Nodes" },
              { src: marcModel1, alt: "Model 1" },
              { src: marcModel2, alt: "Model 2" },
              { src: marcLightingStudy, alt: "Lighting Study" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function SgModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <img src={sgCover} alt="Free Popcorn Truck" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2023</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Free Popcorn Truck</p>
          </div>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
            SG had a free popcorn truck
          </p>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Adobe Illustrator</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Through the years"
          title="Found on campus"
          body="It's been fun seeing people enjoy this sticker year after year!"
        >
          <ImageRow
            loop={false}
            items={[
              { src: sgOlivia, alt: "Olivia's Macbook, 2025" },
              { src: sgGaby, alt: "Gaby's Macbook, 2024" },
              { src: sgPole, alt: "Phone pole, 2023" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function IrisModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col gap-[8px] w-full">
      <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
        <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
          <LazyVideo src={irisCover} className="absolute inset-0 w-full h-full object-cover" showVolumeToggle />
        </div>
        <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
              <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2023</p>
              <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">IRIS AI</p>
            </div>
            <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
              IRIS was 2024 Creative Collision, created and pushed to play in 2 short days. It was a huge success, with lines for all 5 hours. I was on the Product Team and 2D Team!
            </p>
          </div>
          <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
            <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Figma, Adobe</p>
          </div>
        </div>
      </div>
      <CreditLine prefix="3d by" name="Jackson Palmer" href="https://www.linkedin.com/in/jacksonpalmer04/" />
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Prompt from Alumni: Phil Sierzoga @ BUCK"
          title="“Opposing Forces, the intersection of conflict, synthesis of design, humanity, and AI”"
          body="Our installation examined trust in machines, and what can happen when we rely on models that don't always have our best interests in mind, further exploring machines that have bias embedded in a funny way: the AI assistant thinks the user is lazy and useless the more the game continues!"
        >
          <ImageRow
            items={[
              { src: irisGroup, alt: "IRIS Group" },
              { src: irisHover, alt: "Resolume testing", video: true },
              { src: irisFeedback2, alt: "IRIS Feedback", video: true, hasAudio: true },
              { src: irisNotes, alt: "Narrowing the scope down" },
              { src: irisFlow1, alt: "Phase 1: Passive Aggressive" },
              { src: irisFlow2, alt: "Phase 3: Cruel" },
              { src: irisPrototype1, alt: "Prototype 1" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function CollegeOfScienceModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <img src={cosCover} alt="Bates Study Center" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2023</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Bates Study Center</p>
          </div>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
            Bates Study center needed a refresh to attract more students, and also spread awareness of the help!
          </p>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Illustrator, InDesign</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection eyebrow="Installed" title="As great in real life">
          <ImageRow
            loop={false}
            items={[
              { src: batesReal1, alt: "Window 1" },
              { src: batesReal2, alt: "Door 1" },
              { src: batesDean, alt: "Dean Hudson / Mr. Andre" },
              { src: batesIllustrator, alt: "Illustrator Workspace" },
              { src: batesIndesign, alt: "InDesign Layout" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function FigmaRitModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <LazyVideo src={kpopCover} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">Figma at RIT</p>
          </div>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
            Breaking Figma into new spaces like KPop and Fashion: strong communities driven by creativity.
          </p>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Figma CL's</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Troy Ramiscal, Lasya Josyula, Charlotte Raith</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Workshops"
          title="Custom workshops!"
          body="I designed workshops for two of our events and coordinated with student photographer Leah Healy to photograph them!"
        >
          <ImageRow
            items={[
              { src: figmaRitFashion, alt: "Make Your Own Zine Workshop" },
              { src: figmaRitKpop, alt: "Album Covers Workshop" },
              { src: figmaRitLeaders, alt: "Figma at RIT Leaders" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

function MunsonModal({ onClose }: { onClose: () => void }) {
  const overview = (
    <div className="flex flex-col lg:flex-row gap-[64px] items-center w-full pr-[32px]">
      <div className="relative w-full aspect-[1200/800] flex-1 rounded-[12px] overflow-hidden bg-white shrink-0">
        <LazyVideo src={munsonVideo} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[50px] justify-center w-full lg:w-[435px] shrink-0">
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[8px] w-full font-['Inter_Tight',sans-serif] not-italic">
            <p className="font-light text-[16px] leading-[1.65] text-[#908e99]">2025</p>
            <p className="font-normal text-[18px] leading-[1.45] text-[#faf9ff]">DJ Munson's Last Spin</p>
          </div>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.65] text-[#908e99]">
            Celebrating DJ Munson's career at RIT through a dance challenge festival and immersive experiences!
          </p>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-['Inter_Tight',sans-serif] not-italic">
          <p className="font-light text-[16px] leading-[1.65] text-[#c1becb]">Tools / Skills</p>
          <p className="font-light text-[16px] leading-[1.75] text-[#908e99]">Adobe</p>
        </div>
      </div>
    </div>
  );

  return (
    <ModalFrame onClose={onClose} overview={overview}>
      <div className="flex flex-col gap-[100px] items-start w-full px-[36px]">
        <ModalSection
          eyebrow="Workshops"
          title="Motion graphics and resolume"
          body={
            <>
              <p>We transformed Munson's past four orientation videos and CAB assets into an immersive room where visitors could experience in a new way.</p>
              <p>I kept our 4 AE files organized and managed 2 of DJ Munson's videos!</p>
            </>
          }
        >
          <ImageRow
            items={[
              { src: munsonDefault, alt: "Event Poster" },
              { src: munsonInstallation, alt: "Immersive Installation" },
              { src: munsonMe, alt: "Me at the event" },
            ]}
          />
        </ModalSection>
      </div>
    </ModalFrame>
  );
}

const LAB_MODALS: Record<string, (props: { onClose: () => void }) => React.ReactElement> = {
  "dragon-doodle": DragonModal,
  "tian-airlines": TianModal,
  "beyond-fashion": BeyondFashionModal,
  "marc-jacobs": MarcJacobsModal,
  "sg-stickers": SgModal,
  "iris": IrisModal,
  "college-of-science": CollegeOfScienceModal,
  "figma-rit": FigmaRitModal,
  "dj-munson": MunsonModal,
};

export default function Booth() {
  const [scrolled, setScrolled] = useState(false);
  const [openLab, setOpenLab] = useState<string | null>(null);
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Arriving here from the home page's "want to see more?" teaser passes the
  // id of the lab item that was clicked so it opens directly, instead of
  // opening it inline on the home page itself.
  useEffect(() => {
    const state = location.state as { openLab?: string } | null;
    if (state?.openLab) {
      setOpenLab(state.openLab);
      navigate(".", { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lenis drives the page scroll manually, so CSS overflow:hidden alone can't
  // stop it — lenis.stop() does the real work; the CSS is kept as a fallback
  // for input Lenis doesn't intercept (see LenisContext). Hiding overflow also
  // removes the scrollbar, which narrows the viewport and shifts everything
  // left — compensating with matching padding keeps the page from jumping.
  useEffect(() => {
    if (!openLab) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenLab(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [openLab, lenis]);

  return (
    <div className="relative min-h-screen bg-background">

      {/* Scroll gradient */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(23,23,23,0.98) 0%, rgba(23,23,23,0.85) 25%, rgba(23,23,23,0.35) 55%, rgba(23,23,23,0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Main scrollable content — recedes slightly when a modal is open so focus goes to it.
          Animates marginTop rather than y/transform: a transform on this ancestor — even
          translateY(0px) at rest — creates a new containing block and breaks position:sticky
          on the filter/view row nested inside. */}
      <motion.main
        animate={{ marginTop: openLab ? 24 : 0 }}
        transition={{ duration: 0.35, ease: [0.33, 0, 0, 1] }}
        className="pt-[160px] pb-[120px] px-[40px] lg:px-[54px]"
      >
        <div className="max-w-[1296px] mx-auto flex flex-col gap-[61px]">

          {/* Lab grid */}
          <section className="flex flex-col gap-[64px] items-center w-full">
            <div className="flex flex-col gap-[32px] items-center w-full">
              <div className="flex flex-col items-center gap-0 text-center font-['Inter_Tight',sans-serif] font-normal text-[20px] leading-[1.45] text-[#faf9ff]">
                <p>The Lab is Booth 1303 @ RIT.</p>
                <p>It’s where I spent about 44% of my week for 4 years</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full max-w-[1296px] mx-auto">
              {LAB_CARDS.map(({ id, category, title, year, image, video, hasAudio }) => (
                <LabCard
                  key={id}
                  category={category}
                  title={title}
                  year={year}
                  image={image}
                  video={video}
                  showVolumeToggle={hasAudio}
                  background={id === "sg-stickers" ? "var(--color-surface-primary)" : undefined}
                  onClick={() => setOpenLab(id)}
                />
              ))}
            </div>
          </section>

        </div>
      </motion.main>

      {/* z-47 sits below the fixed nav's z-50, so the nav stays fully opaque
          and clickable (topmost hit-test wins) while the modal is open. */}
      <AnimatePresence>
        {openLab && LAB_MODALS[openLab] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[47] flex items-center justify-center p-[24px]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", touchAction: "none" }}
            onClick={() => setOpenLab(null)}
          >
            {(() => {
              const Modal = LAB_MODALS[openLab];
              return <Modal onClose={() => setOpenLab(null)} />;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
