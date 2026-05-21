import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import CasestudyNavigation from "../components/CasestudyNavigation";
import UpNext from "../components/UpNext";
import CasestudyMiniMenu from "../components/CasestudyMiniMenu";

import imgUpdate1 from "../../assets/project/fragrantica/update_1.png";
import imgUpdate2 from "../../assets/project/fragrantica/update_2.png";
import imgUpdate3 from "../../assets/project/fragrantica/update_3.png";
import imgHome1 from "../../assets/project/fragrantica/home_1.png";
import imgHome2 from "../../assets/project/fragrantica/home_2.png";
import imgHome3 from "../../assets/project/fragrantica/home_3.png";
import imgScent1 from "../../assets/project/fragrantica/scent_1.png";
import imgScent2 from "../../assets/project/fragrantica/scent_2.png";
import imgScent3 from "../../assets/project/fragrantica/scent_3.png";

const imgGlassCheckpoint = "https://www.figma.com/api/mcp/asset/cd9f6a3e-7f0c-4776-b131-125030b74110";

const FRAG_SECTIONS = [
  { id: "cs-overview",   label: "Overview"   },
  { id: "cs-redesign",   label: "Redesign"   },
  { id: "cs-reflection", label: "Reflection" },
];

export default function CasestudyFragrantica() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10 && y > lastScrollY);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <HomeButton />
      <CasestudyNavigation title="Fragrantica" />
      <CasestudyMiniMenu sections={FRAG_SECTIONS} />

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(23,23,23,0.98) 0%, rgba(23,23,23,0.85) 25%, rgba(23,23,23,0.35) 55%, rgba(23,23,23,0.05) 80%, rgba(23,23,23,0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled ? "8px" : "16px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[20px] right-[20px] z-50"
        style={{ top: "16px" }}
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[20vw] pt-[15vh] pb-[15vh]"
      >
        <div className="flex flex-col gap-[110px] items-center w-full">

          {/* ── Overview ── */}
          <div id="cs-overview" className="flex flex-col gap-[75px] items-start w-full">

            {/* Hero */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] bg-[#1c1b1f] w-full overflow-hidden"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            />

            {/* Title + metadata */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">
              <div className="border-b border-[#302f34] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Fragrantica
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.25] text-[color:var(--text\/secondary,#908e99)] text-[16px] md:text-[20px] w-full">
                  Refreshing a site with 22 million users
                </p>
              </div>

              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline */}
                <div className="flex flex-col gap-[32px] items-start shrink-0">
                  <div className="flex flex-col gap-[12px] items-start">
                    <p className="leading-none text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[14px]">Tools</p>
                    <div className="text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[16px]">
                      <p className="leading-none mb-[12px]">Figma</p>
                      <p className="leading-none">Claude</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px] items-start">
                    <p className="leading-none text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[14px]">Timeline</p>
                    <p className="leading-none text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[16px]">2 weeks</p>
                  </div>
                </div>

                {/* Right: Problem */}
                <div className="flex flex-1 flex-col gap-[12px] items-start min-w-0">
                  <p className="leading-none text-[color:var(--text\/tertiary,#585564)] text-[12px] md:text-[14px]">Problem</p>
                  <div className="font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] w-full">
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">
                      My friend Gaby loves niche fragrances and uses this site to save perfumes she wants to try someday. While showing me her favorite scents, she said, “Ugh, I hate how ugly this is.”

                    </p>
                    <p className="font-['Inter_Tight',sans-serif]">
We laughed and I wondered how the experience could feel more curated, expressive, and enjoyable for people who love scent.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Checkpoint: Redesign ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[24px] md:text-[32px] relative">
              Redesign
            </p>
          </div>

          {/* ── Redesign sections ── */}
          <div id="cs-redesign" className="flex flex-col gap-[40px] w-full">

            {/* Before / Afters */}
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <div className="flex flex-col gap-[8px] items-start pb-[18px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  Before / Afters
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] w-full">
                  Some of Fragrantica had to be repackaged to redesign
                </p>
              </div>

              {[
                {
                  label: "Pages",
                  title: "All pages aren't the same...",
                  body: (
                    <>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] mb-[16px]">
                        There are 2 types of pages: recommendations by Fragrantica and opinion pieces/stories written by any user (like Substack). They were both styled the same.
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65]">
                        Now, they're distinct: recommendations → "collections" and pieces → "articles", improving content recognition.
                      </p>
                    </>
                  ),
                  img: imgUpdate1,
                },
                {
                  label: "Note Links",
                  title: "Wait...these are buttons?",
                  body: (
                    <>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] mb-[16px]">
                        Notes are spaced and grouped by their respective note categories helping users understand scent structure at a glance.
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65]">
                        Each note is styled as a clearly recognizable button and make interactions more understandable.
                      </p>
                    </>
                  ),
                  img: imgUpdate2,
                },
                {
                  label: "Note Links",
                  title: "Ratings are up!",
                  body: (
                    <>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] mb-[16px]">
                        Puts each pro into cards for better scanning, and keeps the original green / red for pro / con.
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65]">
                        You can also see numbers and scale to better understand rating!
                      </p>
                    </>
                  ),
                  img: imgUpdate3,
                },
              ].map(({ label, title, body, img }, i) => (
                <div key={i} className="flex gap-[24px] items-start w-full">
                  <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">{label}</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">{title}</p>
                    <div className="text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[16px] w-full">{body}</div>
                  </div>
                  <div className="flex flex-1 min-w-0">
                    {img ? (
                      <img src={img} alt="" className="w-full rounded-[8px] object-cover" />
                    ) : (
                      <div className="aspect-square bg-[#1c1b1f] rounded-[8px] w-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Redesigning the two main pages */}
            <div className="bg-gradient-to-b from-[rgba(88,85,100,0.15)] to-[rgba(22,22,23,0.1)] border border-[#302f34] flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] pb-[18px] w-full">
                Redesigning the two main pages
              </p>

              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Home Page</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">Giving the user more control</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] w-full">
                  New ability to organize different types of content, distills product details to what matters most, and leverages color as a navigational and organizational tool.
                </p>
                <div className="grid grid-cols-3 gap-[24px] w-full">
                  <img src={imgHome1} alt="" className="w-full rounded-[8px] object-cover" />
                  <img src={imgHome2} alt="" className="w-full rounded-[8px] object-cover" />
                  <img src={imgHome3} alt="" className="w-full rounded-[8px] object-cover" />
                </div>
              </div>

              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Scent Page</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">Clarify user choices</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] w-full">
                  Groups content into clearer categories (scent, scent education, with ratings presented last), reduces visual noise with standardized buttons and clearer affordances for interactions!
                </p>
                <div className="grid grid-cols-3 gap-[24px] w-full">
                  <img src={imgScent1} alt="" className="w-full rounded-[8px] object-cover" />
                  <img src={imgScent2} alt="" className="w-full rounded-[8px] object-cover" />
                  <img src={imgScent3} alt="" className="w-full rounded-[8px] object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Checkpoint: Reflection ── */}
          <div className="flex gap-[16px] items-center w-full relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[78px] w-[228px] bg-[#d9d9d9] blur-[50px] opacity-10 pointer-events-none" />
            <img src={imgGlassCheckpoint} alt="" className="relative shrink-0 size-[36px]" />
            <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.1] text-white text-[24px] md:text-[32px] relative">
              Reflection
            </p>
          </div>

          {/* ── Reflection ── */}
          <div id="cs-reflection" className="flex flex-col gap-[75px] items-start w-full">

            {/* Discovery */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">Discovery</p>
                <div className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px] w-full">
                  <p className="mb-0">How do fashion sites organize different categories?</p>
                  <p className="mb-0">How do other sites organize different forms of media or products?</p>
                  <p className="mb-0">What's the best flow for organized discovery?</p>
                </div>
              </div>
              <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px] w-full">
                I looked at multiple sites to see how other sites are answering these questions. Studying these helped my discovery a lot!
              </p>
            </div>

            {/* Simplify */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-none text-[color:var(--text\/secondary,#908e99)] text-[14px] md:text-[16px]">The overall takeaway</p>
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.3] text-[color:var(--text\/primary,#faf9ff)] text-[18px] md:text-[24px]">Simplify</p>
              </div>

              <div className="bg-[rgba(219,189,254,0.05)] border border-[#302f34] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[2.05] text-[color:var(--text\/secondary,#908e99)] text-[12px] md:text-[14px] shrink-0">1</p>
                <div className="flex flex-col gap-[8px] items-start flex-1">
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/primary,#faf9ff)] text-[14px] md:text-[17px]">Take notes</p>
                  <p className="font-['Inter_Tight',sans-serif] font-[300] leading-[1.65] text-[color:var(--text\/secondary,#b8b4c5)] text-[14px] md:text-[16px] tracking-[-0.32px] w-full">
                    I asked my peers what they liked/disliked, what they thought was confusing! Super helpful and reinforced my design path and decisions as the right ones!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UpNext currentId="fragrantica" />

        </div>
      </motion.div>
    </div>
  );
}
