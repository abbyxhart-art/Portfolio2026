import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import icons from "../../assets/icons/icons.json";

import munsonVideo from "../../assets/project/booth/munson.mp4";
import munsonInstallation from "../../assets/project/booth/munson-installation.png";
import beyondDefault from "../../assets/project/booth/beyondfashion_default.png";
import beyondHover from "../../assets/project/booth/beyondfashion_hover.JPG";
import beyondInstallation from "../../assets/project/booth/beyondfashion-installation.jpeg";
import beyondTest from "../../assets/project/booth/beyondfashion-test.jpeg";
import beyondRehearsal from "../../assets/project/booth/beyondfashion-rehearsal.jpeg";
import marcFinal from "../../assets/project/booth/marc-final.png";
import marcFinal2 from "../../assets/project/booth/marc-final2.png";
import marcModel1 from "../../assets/project/booth/marc-model1.png";
import marcModel2 from "../../assets/project/booth/marc-model2.png";
import marcNodes from "../../assets/project/booth/marc-nodes.jpeg";
import marcNotes from "../../assets/project/booth/marc-notes.jpg";
import marcShot from "../../assets/project/booth/marc-shot.png";
import irisDefault from "../../assets/project/booth/iris_default.png";
import irisHover from "../../assets/project/booth/iris_hover.MOV";
import irisGroup from "../../assets/project/booth/iris-group.jpg";
import irisNotes from "../../assets/project/booth/iris-notes.png";
import irisFlow from "../../assets/project/booth/iris-flow.png";
import irisPrototype1 from "../../assets/project/booth/iris-protoype1.png";
import sgOlivia from "../../assets/project/booth/sg_olivia.png";
import sgGaby from "../../assets/project/booth/sg_gaby.png";
import sgPole from "../../assets/project/booth/sg_pole.png";
import tianBooking from "../../assets/project/booth/tian-booking.mp4";
import tianCalendar from "../../assets/project/booth/tian-calendar.mp4";
import tianComponentSystem from "../../assets/project/booth/tian-componentsystem.png";
import tianForms from "../../assets/project/booth/tian-forms.mp4";
import tianMilitaryTime from "../../assets/project/booth/tian-militarytime.png";
import tianPrototyping from "../../assets/project/booth/tian-prototyping.png";
import tianTokenSystem from "../../assets/project/booth/tian-tokensystem.png";
import tianVariables from "../../assets/project/booth/tian-variables.png";
import figmaRitFashion from "../../assets/project/booth/figmarit-fashion.png";
import figmaRitKpop from "../../assets/project/booth/figmarit-kpop.png";
import figmaRitLeaders from "../../assets/project/booth/figmarit-leaders.jpg";
import figmaRitWorkshop from "../../assets/project/booth/figmarit-workshop.png";
import batesDean from "../../assets/project/booth/bates-dean.jpg";
import batesIllustrator from "../../assets/project/booth/bates-illustrator.jpg";
import batesIndesign from "../../assets/project/booth/bates-indesign.jpg";
import batesReal1 from "../../assets/project/booth/bates-real1.jpg";
import batesReal2 from "../../assets/project/booth/bates-real2.jpg";
import dragonFigmaMake from "../../assets/project/booth/dragondoodle-figmamake.MOV";
import dragonText from "../../assets/project/booth/dragondoodle-text.jpg";
import dragonTesting from "../../assets/project/booth/dragondoodle-testing.mov";
import dragonBones from "../../assets/project/booth/dragondoodle-bones.png";
import dragonCode from "../../assets/project/booth/dragondoodle-code.png";
import dragonRiveTimeline from "../../assets/project/booth/dragondoodle-rivetimeline.png";
import dragonAssets from "../../assets/project/booth/dragondoodle-assets.png";

const NAV_ITEMS = [
  { id: "dragon-doodle", label: "Dragon Doodle — Rive" },
  { id: "iris", label: "IRIS — An AI Planner" },
  { id: "figma-rit", label: "Figma at RIT — Workshops" },
  { id: "dj-munson", label: "DJ Munson — RIT NMD x CAB" },
  { id: "marc-jacobs", label: "Marc Jacobs Daisy — 3D" },
  { id: "beyond-fashion", label: "Beyond Fashion — Touch Designer" },
  { id: "sg-stickers", label: "Popcorn Stickers — SG" },
  { id: "tian-airlines", label: "Tian Airlines — Figma" },
  { id: "college-of-science", label: "College of Science — Print" },
];

function Divider() {
  return <div className="w-full h-px bg-[rgba(255,255,255,0.12)] shrink-0" />;
}

function IrisCasestudyButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://www.alexa-contreras.com/iris"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(88,85,100,0.4)" : "rgba(88,85,100,0.2)",
        borderRadius: 24,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
        transition: "background 0.15s ease",
      }}
    >
      <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-none" style={{ color: "var(--color-text-primary)" }}>
        read Alexa's full casestudy
      </span>
    </a>
  );
}

function FigmaRitInstagramButton() {
  const [hovered, setHovered] = useState(false);
  const ig = icons.social.instagram;
  return (
    <a
      href="https://www.instagram.com/figmaatrit/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(88,85,100,0.4)" : "rgba(88,85,100,0.2)",
        borderRadius: 24,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        transition: "background 0.15s ease",
      }}
    >
      <svg width="16" height="16" viewBox="1 1 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        {ig.paths.map((p, i) => (
          <path key={i} d={p.d} fill="var(--color-text-primary)" />
        ))}
      </svg>
      <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-none" style={{ color: "var(--color-text-primary)" }}>
        @figmaatrit
      </span>
    </a>
  );
}

function GalleryItem({
  caption,
  width,
  children,
}: {
  caption: string;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[16px] items-start shrink-0" style={{ width }}>
      <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[20px] tracking-[0.108px] text-[#908e99]">
        {caption}
      </p>
      <div className="h-[303px] w-full rounded-[12px] overflow-hidden bg-[#2a2930]">
        {children}
      </div>
    </div>
  );
}


function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      src={src}
      className={className}
    />
  );
}

function VimeoPlayer({ src, title }: { src: string; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const next = !muted;
    iframe.contentWindow.postMessage(
      JSON.stringify({ method: "setVolume", value: next ? 0 : 1 }),
      "https://player.vimeo.com"
    );
    setMuted(next);
  };

  const mutedSrc = `${src}&muted=1&api=1`;

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        src={mutedSrc}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        style={{ border: "none" }}
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full"
        title={title}
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-[8px] right-[8px] w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-white transition-all duration-200"
        style={{ background: "rgba(88,85,100,0.55)", backdropFilter: "blur(8px)" }}
        title={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5H4.5L7.5 2.5V11.5L4.5 9H2V5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
            <path d="M10 4.5L12 6.5M12 4.5L10 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5H4.5L7.5 2.5V11.5L4.5 9H2V5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
            <path d="M9.5 4.5C10.5 5.2 11 6 11 7C11 8 10.5 8.8 9.5 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Gallery({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const dragOrigin = useRef({ x: 0, scrollLeft: 0 });
  const [dragging, setDragging] = useState(false);
  const updateArrows = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    el.addEventListener("scroll", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !ref.current) return;
      ref.current.scrollLeft = dragOrigin.current.scrollLeft - (e.clientX - dragOrigin.current.x);
    };
    const onUp = () => { isDragging.current = false; setDragging(false); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    dragOrigin.current = { x: e.clientX, scrollLeft: ref.current?.scrollLeft ?? 0 };
    e.preventDefault();
  };

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-[12px] w-full">
      {(canScrollLeft || canScrollRight) && (
        <div className="flex gap-[8px] items-center py-[6px]">
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-white transition-all duration-200 disabled:opacity-25"
            style={{ background: "rgba(88,85,100,0.35)", backdropFilter: "blur(8px)" }}
          >
            <ChevronLeft />
          </button>
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-white transition-all duration-200 disabled:opacity-25"
            style={{ background: "rgba(88,85,100,0.35)", backdropFilter: "blur(8px)" }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        className={`flex gap-[24px] items-start overflow-x-auto no-scrollbar w-full select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Booth() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("dragon-doodle");
  const [dragonExpanded, setDragonExpanded] = useState(false);
  const [irisExpanded, setIrisExpanded] = useState(false);
  const [figmaRitExpanded, setFigmaRitExpanded] = useState(false);
  const [tianExpanded, setTianExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-background">

      {/* Fixed sidebar */}
      <aside
        className="fixed left-0 top-0 h-full w-[228px] flex flex-col gap-[24px] p-[16px] z-[45] overflow-y-auto no-scrollbar"
        style={{ background: "rgba(88,85,100,0.15)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex flex-col gap-[16px]">
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.5] text-[#908e99]">
            Lab / Booth 1303
          </p>
          <p className="font-['Inter_Tight',sans-serif] font-light text-[16px] leading-[1.5] text-[#908e99]">
            The lab is where I made all my interactions, illustrations, and interfaces at RIT.
          </p>
        </div>

        <Divider />

        <div className="flex items-center gap-[8px]">
          <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-white">
            Scroll to
          </p>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20.5 12.5L15.5 17.5L10.5 12.5M15.5 17.5V9.7002C15.5 8.58009 15.5 8.01962 15.282 7.5918C15.0903 7.21547 14.7845 6.90973 14.4082 6.71799C13.9804 6.5 13.4199 6.5 12.2998 6.5H2.49981" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <nav className="flex flex-col gap-[9px]">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5] text-left w-full transition-colors duration-200 ${activeId === id ? "text-[#faf9ff]" : "text-[#908e99] hover:text-[#c5c3ce]"
                }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

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

      {/* Main scrollable content */}
      <main className="ml-[228px] pt-[160px] pb-[120px] pl-[54px] pr-[40px]">
        <div className="flex flex-col gap-[61px]">

          {/* Dragon Doodle */}
          <section id="dragon-doodle" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">Dragon Doodle</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(254,225,189,0.87)" }}>
                Collect mooncakes and make music
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-[12px] max-w-[925px]">
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                This dragon collects mooncakes based on your ability to sing the notes of "Twinkle, Twinkle, Little Star."
                The workflow combined Figma vector assets, Rive animations, and Claude-generated logic to drive the
                interactions. The two hardest parts were deciding how accurately and how quickly players had to match each
                pitch before moving to the next note, and rigging the bones in Rive.
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                It was later recreated in Figma Make for a design-a-thon, with up/down keys, which is one of the videos below.
              </p>
              <button
                onClick={() => setDragonExpanded(!dragonExpanded)}
                className="flex items-center gap-[6px] text-[#908e99] hover:text-[#faf9ff] transition-colors duration-200 w-fit"
              >
                <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5]">How it works</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: dragonExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {dragonExpanded && (
                  <motion.div
                    key="dragon-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden flex flex-col gap-[12px]"
                  >
                    <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                      The problem with music is it's time based and frequency (Hz) changes between low tones (very little
                      difference) and high (very high difference). There were issues with voices being at different octaves
                      and tempo, making it a little jittery.
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                      In Rive, I created 6 different timelines → 6 different "levels" on the Y-Axis for the dragon. Each
                      timeline increments the Y-Axis by 200, starting from 250 and going to 1250. The animation is 300ms.
                      There's 1 single numerical input: NoteSung, which is used for "if" statements between each noodle
                      connection on the timelines. ChatGPT created an analyzer to sense what its frequency is, changes the
                      math to convert it to Hz, then to notes I can read and compare through Strings. From there, I set if
                      statements for notes C, C# – A, A#, and then sets the NoteSung value on a range of 1–6.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Divider />
            <Gallery>
              <GalleryItem caption="Figma Make" width={400}>
                <LazyVideo src={dragonFigmaMake} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Feedback" width={249}>
                <img src={dragonText} alt="Feedback" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Feedback Testing Note Sensitivity" width={303}>
                <LazyVideo src={dragonTesting} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Rive State Machine" width={611}>
                <img src={dragonRiveTimeline} alt="Rive Timeline" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Dragon Bones" width={471}>
                <img src={dragonBones} alt="Dragon Bones" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Code" width={282}>
                <img src={dragonCode} alt="Code" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Dragon Assets" width={730}>
                <img src={dragonAssets} alt="Dragon Assets" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* IRIS */}
          <section id="iris" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-row items-end justify-between w-full">
              <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
                <p className="font-light text-[20px] text-[#faf9ff]">IRIS</p>
                <p className="font-light text-[20px]" style={{ color: "rgba(254,189,242,0.87)" }}>
                  An AI planner turned mean
                </p>
              </div>
              <IrisCasestudyButton />
            </div>
            <Divider />
            <div className="flex flex-col gap-[12px] max-w-[925px]">
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                IRIS was 2024 Creative Collision, created and pushed to play in 2 short days. It was a huge success, with lines for all 5 hours. I was on the Product Team and Design Team, in charge of what our product would be, how to organize the team, the flow and interface.
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                From Phil Sierzega @ BUCK (RIT alum) came the theme "Opposing Forces — the intersection of conflict, synthesis of design, humanity, and AI". Our installation examined trust in machines, and what can happen when we rely on models that don't always have our best interests in mind, further exploring machines that have bias embedded in a funny way: the AI assistant thinks the user is lazy and useless the more the game continues!
              </p>
              <button
                onClick={() => setIrisExpanded(!irisExpanded)}
                className="flex items-center gap-[6px] text-[#908e99] hover:text-[#faf9ff] transition-colors duration-200 w-fit"
              >
                <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5]">BTS</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: irisExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {irisExpanded && (
                  <motion.div
                    key="iris-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                      Built with Cinema 4D, Figma, Resolume Arena, and audio, the project came together right up to the deadline. It was a true team effort, held together by a little magic: someone literally hiding behind the screen to troubleshoot during the event.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Divider />
            <Gallery>

              <div className="flex flex-col gap-[16px] items-start shrink-0">
                <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[20px] tracking-[0.108px] text-[#908e99]">IRIS Feedback</p>
                <div className="h-[303px] rounded-[12px] overflow-hidden bg-[#2a2930]" style={{ aspectRatio: "4/5" }}>
                  <VimeoPlayer
                    src="https://player.vimeo.com/video/1206289226?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1"
                    title="IRIS Feedback"
                  />
                </div>
              </div>
              <GalleryItem caption="IRIS Group" width={500}>
                <img src={irisGroup} alt="IRIS group" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Resolume testing" width={170}>
                <LazyVideo src={irisHover} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Design poster" width={198}>
                <img src={irisDefault} alt="IRIS poster" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Narrowing the scope down" width={440}>
                <img src={irisNotes} alt="IRIS notes" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Full flow" width={733}>
                <img src={irisFlow} alt="IRIS flow" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Prototype 1" width={409}>
                <img src={irisPrototype1} alt="IRIS prototype 1" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* Figma at RIT */}
          <section id="figma-rit" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-row items-end justify-between w-full">
              <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
                <p className="font-light text-[20px] text-[#faf9ff]">Figma at RIT</p>
                <p className="font-light text-[20px]" style={{ color: "rgba(251,202,157,0.87)" }}>
                  Designing workshops
                </p>
              </div>
              <FigmaRitInstagramButton />
            </div>
            <Divider />
            <div className="flex flex-col gap-[12px] max-w-[925px]">
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                With Figma at RIT, we connected creatively to new communities with KPop and Fashion clubs! I designed workshops for those clubs specifically.
              </p>
              <button
                onClick={() => setFigmaRitExpanded(!figmaRitExpanded)}
                className="flex items-center gap-[6px] text-[#908e99] hover:text-[#faf9ff] transition-colors duration-200 w-fit"
              >
                <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5]">Workshop details</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: figmaRitExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {figmaRitExpanded && (
                  <motion.div
                    key="figmarit-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                      With KPop Club, I created tutorials about how to create your own photo card, create a component that loops a spin with music in the background, charms in Figma Make, and provided lots of assets, showing the importance of plugins and Figma Community. With Fashion Club, we made zines people could use to focus on their interests!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Divider />
            <Gallery>
              <GalleryItem caption="Charlotte, Me, Troy, Lasya" width={455}>
                <img src={figmaRitLeaders} alt="Figma at RIT leaders" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Fashion Club" width={338}>
                <img src={figmaRitFashion} alt="Fashion club workshop" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Workshop" width={455}>
                <img src={figmaRitWorkshop} alt="Workshop" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Record" width={561}>
                <img src={figmaRitKpop} alt="Record" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* DJ Munson */}
          <section id="dj-munson" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">DJ Munson's Last Spin</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(219,189,254,0.73)" }}>
                A dance battle / party! 700+ attendees, 1500 votes
              </p>
            </div>
            <Divider />
            <div className="flex gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start shrink-0" style={{ width: 380 }}>
                <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[20px] tracking-[0.108px] text-[#908e99]">70 ft installation</p>
                <div className="h-[303px] w-full rounded-[12px] overflow-hidden bg-[#2a2930]">
                  <LazyVideo src={munsonVideo} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-[16px] items-start shrink-0" style={{ width: 656 }}>
                <p className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[20px] tracking-[0.108px] text-[#908e99]">Installation</p>
                <div className="h-[303px] w-full rounded-[12px] overflow-hidden bg-[#2a2930]">
                  <img src={munsonInstallation} alt="Munson installation" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Marc Jacobs Daisy */}
          <section id="marc-jacobs" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">Marc Jacobs Daisy Haze</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(255,201,253,0.87)" }}>
                A 3D based advertisement
              </p>
            </div>
            <Divider />
            <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff] max-w-[715px]">
              Based on Marc Jacob's Daisy line, I used this opportunity to explore 3D, lighting environments, and caustics! I studied photographer youtube videos as well as tutorials to understand lighting. This was my first attempt at 3D and I spent so many nights figuring out the perfect balance of frosted glass and plastic.
            </p>
            <Divider />
            <Gallery>
              <GalleryItem caption="End Result" width={170}>
                <img src={marcFinal} alt="Marc Jacobs final render" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="End Result 2" width={170}>
                <img src={marcFinal2} alt="Marc Jacobs final render 2" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Shot" width={539}>
                <img src={marcShot} alt="Marc Jacobs shot" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Model 1: Still learning" width={539}>
                <img src={marcModel1} alt="Marc Jacobs model angle 1" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Model 2: Much better!" width={539}>
                <img src={marcModel2} alt="Marc Jacobs model angle 2" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Material Nodes: Playing around" width={404}>
                <img src={marcNodes} alt="Marc Jacobs 3D nodes" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Sketches" width={373}>
                <img src={marcNotes} alt="Marc Jacobs sketches" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* Beyond Fashion */}
          <section id="beyond-fashion" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">Beyond Fashion 2025</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(189,240,254,0.87)" }}>
                Fashion show interactive experience — Team 1
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-[16px] max-w-[925px]">
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                Beyond Fashion is a student-led fashion show supporting local artists, with each team creating visuals for a designer or club. Our team partnered with Metals & Jewelry, using Cinema 4D, After Effects, and Resolume Arena to create motion visuals.
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                I also helped build a 20-foot interactive installation for the theme Off the Table: Vignelli, using TouchDesigner and a hidden camera to let hand movements control rotating Vignelli cups.
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                When the event was short-staffed, I volunteered backstage to help run the final show.
              </p>
            </div>
            <Divider />
            <Gallery>
              <GalleryItem caption="Beyond Fashion Poster" width={170}>
                <img src={beyondDefault} alt="Beyond Fashion default" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Volunteer Team" width={193}>
                <img src={beyondHover} alt="Beyond Fashion hover" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Installation" width={450}>
                <img src={beyondInstallation} alt="Beyond Fashion installation" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Test" width={171}>
                <img src={beyondTest} alt="Beyond Fashion test" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Rehearsal" width={227}>
                <img src={beyondRehearsal} alt="Beyond Fashion rehearsal" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* Popcorn Stickers — SG */}
          <section id="sg-stickers" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">Popcorn Stickers</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(254,234,189,0.87)" }}>
                Student Government — merch still in production :D
              </p>
            </div>
            <Divider />
            <Gallery>
              <GalleryItem caption="Olivia's Macbook, 2025" width={400}>
                <img src={sgOlivia} alt="Olivia's Macbook" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Gaby's Macbook, 2024" width={400}>
                <img src={sgGaby} alt="Gaby's Macbook" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Phone pole, 2023" width={400}>
                <img src={sgPole} alt="Phone pole" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>


          {/* Tian Airlines */}
          <section id="tian-airlines" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">Tian Airlines</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(189,210,254,0.87)" }}>
                Figma interaction design
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-[12px] max-w-[925px]">
              <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                Tian Airlines is a study on hi-fi prototyping and design systems within Figma. All the flight information works, with proper checking of time and potential departure / arrivals.
              </p>
              <button
                onClick={() => setTianExpanded(!tianExpanded)}
                className="flex items-center gap-[6px] text-[#908e99] hover:text-[#faf9ff] transition-colors duration-200 w-fit"
              >
                <span className="font-['Inter_Tight',sans-serif] font-light text-[12px] leading-[1.5]">How it works</span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-300"
                  style={{ transform: tianExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {tianExpanded && (
                  <motion.div
                    key="tian-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff]">
                      The whole thing was built off of Figma "calculators", or frames switching back and forth to create a small listener. This was also a fun moment of play, and creating light / dark modes of colors and such. ChatGPT helped create a flight itinerary.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Divider />
            <Gallery>
              <GalleryItem caption="Booking flow" width={606}>
                <LazyVideo src={tianBooking} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Component system" width={606}>
                <img src={tianComponentSystem} alt="Component system" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Calendar" width={606}>
                <LazyVideo src={tianCalendar} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Token system" width={606}>
                <img src={tianTokenSystem} alt="Token system" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Forms" width={606}>
                <LazyVideo src={tianForms} className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Military time" width={606}>
                <img src={tianMilitaryTime} alt="Military time" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Prototyping" width={606}>
                <img src={tianPrototyping} alt="Prototyping" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Variables" width={606}>
                <img src={tianVariables} alt="Variables" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>

          {/* College of Science */}
          <section id="college-of-science" className="flex flex-col gap-[16px] items-start w-full scroll-mt-[120px]">
            <div className="flex flex-col font-['Inter_Tight',sans-serif] leading-[1.45]">
              <p className="font-light text-[20px] text-[#faf9ff]">College of Science</p>
              <p className="font-light text-[20px]" style={{ color: "rgba(189,254,210,0.87)" }}>
                Multimedia work promoting COS — Print
              </p>
            </div>
            <Divider />
            <p className="font-['Inter_Tight',sans-serif] font-light text-[14px] leading-[1.5] text-[#faf9ff] max-w-[715px]">
              Bates Study Center wanted a math-based logo and decals for the room to promote better resource awareness for students and math study habits. We did 3 windows and two doors, each with their own decal layouts.
            </p>
            <Divider />
            <Gallery>
              <GalleryItem caption="Window 1" width={447}>
                <img src={batesReal1} alt="Bates installation 1" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Door 1" width={250}>
                <img src={batesReal2} alt="Bates installation 2" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Dean Hudson / Mr. Andre" width={244}>
                <img src={batesDean} alt="Bates dean card" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="Illustrator file with annotations!" width={479}>
                <img src={batesIllustrator} alt="Bates illustrator file" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
              <GalleryItem caption="InDesign file" width={241}>
                <img src={batesIndesign} alt="Bates InDesign file" loading="lazy" className="w-full h-full object-cover" />
              </GalleryItem>
            </Gallery>
          </section>


        </div>
      </main>
    </div>
  );
}
