import { useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, useScroll, useTransform, useMotionValue } from "@/lib/motion";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";

const KPOP_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-workshop", label: "Workshop" },
  { id: "cs-review", label: "Reflections" },
];

import imgText from "../../assets/project/kpop/text.png";
import imgCover2 from "../../assets/project/kpop/kpop_cover2.png";
import vidRecord1 from "../../assets/project/kpop/record_1.mov";
import vidPhotocard1 from "../../assets/project/kpop/photocard_1.mov";
import imgPhotocard2 from "../../assets/project/kpop/photocard_2.png";
import vidCharms1 from "../../assets/project/kpop/charms_1.mov";
import imgCharms2 from "../../assets/project/kpop/charms_2.png";
import imgPoster1 from "../../assets/project/kpop/poster_1.png";
import imgPoster2 from "../../assets/project/kpop/poster_2.png";
import imgRecord2 from "../../assets/project/kpop/record_2.png";



const FLOWS: {
  label: string; title: string; body: string;
  leftVideo?: string; rightVideo?: string;
  leftImg?: string; rightImg?: string;
  leftVideoZoom?: number;
  leftImgContain?: boolean; leftImgBg?: string;
  hideRight?: boolean;
}[] = [
  {
    label: "Video + Audio",
    title: "CDs and Records",
    body: "A big asset with Figma is you can add sound to prototypes! I wanted students to know how much they could mess around with sound and add it to their own records.",
    leftVideo: vidRecord1,
    leftVideoZoom: 1.25,
    rightImg: imgRecord2,
  },
  {
    label: "Components",
    title: "Photocards",
    body: "I wanted to give students the ability to create their own photocards! Photocards also have little cases for their photos, and it was a super fun way to introduce layering, animations, and nested components.",
    leftVideo: vidPhotocard1,
    rightImg: imgPhotocard2,
  },
  {
    label: "Figma Make",
    title: "Charms",
    body: "Sometimes charms represent an idol's concept, or fans use charms to decorate. I made sure to provide prompts to students to get them started!",
    leftVideo: vidCharms1,
    rightImg: imgCharms2,
  },
  {
    label: "Figma Community + Plugins",
    title: "Posters",
    body: "The wealth of Figma lies in community. I used posters to showcase textures, cloners, etc. It was by far the most popular, and here's some of the student work!",
    leftImg: imgPoster1,
    hideRight: true,
  },
];

export default function CasestudyFigmaKPop() {
  const shouldAnimate = useNavEntrance();

  const { scrollY } = useScroll();
  const heroCompleted = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroExtraHeight = useMotionValue(0);

  const heroScale = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 1;
    const progress = Math.min(latest / 400, 1);
    if (progress >= 1) heroCompleted.current = true;
    return 1.35 - 0.35 * progress;
  });
  const heroBorderRadius = useTransform(scrollY, (latest) => {
    if (heroCompleted.current) return 8;
    return 8 * Math.min(latest / 400, 1);
  });
  const contentY = useTransform(() => {
    if (heroCompleted.current) return 0;
    const progress = Math.min(scrollY.get() / 400, 1);
    return heroExtraHeight.get() * (1 - progress);
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const measure = () => {
      if (heroRef.current) heroExtraHeight.set(heroRef.current.offsetHeight * 0.35);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [heroExtraHeight]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <CasestudyNavigation title="Figma K-Pop" />
      <SectionNavigation sections={KPOP_SECTIONS} title="Figma K-Pop Casestudy Navigation" />

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh] relative z-[1]"
      >
        <div className="flex flex-col gap-[110px] items-center w-full">

          {/* ── Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[75px] items-start w-full">

            {/* Hero */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] bg-[#1c1b1f] w-full overflow-hidden"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            >
              <img src={imgCover2} alt="" className="w-full h-full object-cover" />
            </motion.div>

            {/* Title + metadata */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">
              <div className="border-b border-[#302f34] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Figma at RIT x KPOP Club
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.25] text-[color:var(--text\/secondary,#908e99)] text-[16px] md:text-[20px] w-full">
                  Breaking Figma into a new space
                </p>
              </div>

              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
                {/* Tools */}
                <div className="flex flex-col gap-[12px] items-start shrink-0">
                  <p className="leading-none text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[14px]">Tools</p>
                  <p className="leading-[1.5] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[16px]">Figma!</p>
                </div>

                {/* Context */}
                <div className="flex flex-1 flex-col gap-[12px] items-start min-w-0">
                  <p className="leading-none text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[14px]">Context</p>
                  <div className="font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[16px] w-full">
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">
                      I wanted student organizations with strong communities and an appreciation for visuals, creativity, and participation. KPop Club and Nova (a K-Pop dance club) stood out immediately.
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">
                      The KPop community already has a strong culture like customizing lightsticks to making stickers for concerts.
                    </p>
                    <p className="font-['Inter_Tight',sans-serif]">
                      Our original idea with Nova was a Figma-branded dance challenge for swag, but we pivoted to KPop Club to create a more hands-on experience centered around actual Figma products and collaboration.
                    </p>
                  </div>
                  <img src={imgText} alt="" className="w-[280px] rounded-[8px] object-cover mt-[8px]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Checkpoint: Workshop ── */}
          <CasestudySectionHeader
            eyebrow="Workshop"
            headline="A custom workshop for inclusions"
            subtitle="K-pop inclusions are bonus items packaged inside physical albums, like posters and photocards."
          />

          {/* ── Workshop ── */}
          <div id="cs-workshop" className="w-full">
            <div className="bg-gradient-to-b from-[#302f34] to-[#161617] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] pb-[18px] w-full">
                A workshop made in 3 hours? Challenge accepted.
              </p>

              {FLOWS.map(({ label, title, body, leftVideo, rightVideo, leftImg, rightImg, leftVideoZoom, leftImgContain, leftImgBg, hideRight }, i) => (
                <div key={i} className="flex flex-col gap-[24px] items-start w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">
                      {label}
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                      {title}
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] tracking-[-0.32px] w-full">
                      {body}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-[24px] w-full">
                    {/* Left slot */}
                    {leftVideo ? (
                      <div className="aspect-square rounded-[8px] w-full overflow-hidden">
                        <video
                          autoPlay loop muted playsInline
                          className="w-full h-full object-cover"
                          style={leftVideoZoom ? { transform: `scale(${leftVideoZoom})` } : undefined}
                          src={leftVideo}
                        />
                      </div>
                    ) : leftImg ? (
                      <div
                        className="aspect-square rounded-[8px] w-full overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: leftImgBg ?? "#1c1b1f" }}
                      >
                        <img src={leftImg} alt="" className={`w-full h-full ${leftImgContain ? "object-contain" : "object-cover"}`} />
                      </div>
                    ) : (
                      <div className="aspect-square bg-[#1c1b1f] rounded-[8px] w-full" />
                    )}
                    {/* Right slot */}
                    {!hideRight && (rightVideo ? (
                      <video autoPlay loop muted playsInline className="aspect-square rounded-[8px] w-full object-cover" src={rightVideo} />
                    ) : rightImg ? (
                      <img src={rightImg} alt="" className="aspect-square rounded-[8px] w-full object-cover" />
                    ) : (
                      <div className="aspect-square bg-[#1c1b1f] rounded-[8px] w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Checkpoint: Final Thoughts ── */}
          <CasestudySectionHeader
            eyebrow="Reflections"
            headline="Final Thoughts"
            subtitle="More fun and less fear"
          />

          {/* ── Reflections ── */}
          <div id="cs-review" className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">
                The overall takeaway
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">
                More fun and less fear
              </p>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">
                  Getting people involved
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#b8b4c5)] text-[14px] md:text-[16px] tracking-[-0.32px] w-full">
                  Designing a workshop around KPop was one of the most fun parts of the project. Instead of asking, "How do we make this community fit into Figma?" I focused on the opposite: "How can Figma fit them?" Here's a sneek peek; we saw students play with all 4 categories!
                </p>
                <img src={imgPoster2} alt="" className="rounded-[8px] w-1/2 object-cover mt-[8px]" />
              </div>
            </div>

            <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">
                  Making it easier to ask questions
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#b8b4c5)] text-[14px] md:text-[16px] tracking-[-0.32px] w-full">
                  By creating a fun space, students were more comfortable asking questions and / or making mistakes. A photocard is way less stressful than creating a website, but the same principles of Figma prototyping applies!
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="figma-kpop" />

        </div>
      </motion.div>
    </div>
  );
}
