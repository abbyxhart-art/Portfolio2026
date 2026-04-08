import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import UpNext from "../components/UpNext";

import vidPass1 from "../../assets/project/aixels/pass1.mov";
import imgPass2 from "../../assets/project/aixels/pass2.png";
import imgPass3 from "../../assets/project/aixels/pass3.png";
import imgPass4 from "../../assets/project/aixels/pass4.png";
import imgStructure from "../../assets/project/aixels/structure_2x1.png";
import imgSetup from "../../assets/project/aixels/setup_2x1.png";
import imgSogniai from "../../assets/project/aixels/sogniai.jpeg";
import imgMe from "../../assets/project/aixels/me.JPG";

const imgGradientOverlay = "https://www.figma.com/api/mcp/asset/a7a94903-cfd1-4c04-a17f-9db5c0552ed7";

export default function CasestudyAixels() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) setScrollingUp(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 10) setScrollingUp(false);
      setScrolled(currentScrollY > 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf9ff] overflow-x-clip">
      <HomeButton />
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-40 h-[10vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(232,231,240,0.95) 0%, rgba(232,231,240,0) 100%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      <div className="flex flex-col items-center px-[10px] pt-[15vh] pb-[15vh]">
        <div className="flex flex-col gap-[75px] items-center w-full max-w-[886px]">

          {/* ── Section: Overview ── */}
          <div className="flex flex-col gap-[75px] items-center w-full">

            {/* Hero */}
            <motion.div
              ref={heroRef}
              className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
              style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
            >
              <img src={imgMe} className="w-full h-full object-cover" alt="Aixels" />
            </motion.div>

            {/* Overview text */}
            <motion.div style={{ y: contentY }} className="flex flex-col gap-[32px] items-start w-full">
              {/* Title */}
              <div className="border-b border-[#d1cedc] flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                  AIXELS
                </p>
                <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.25] text-[#908e99] text-[20px] w-full">
                  <p className="mb-0">Designathon winner;</p>
                  <p>Poke the bear: Explore with AI</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
                {/* Left: Tools + Timeline + Role */}
                <div className="flex flex-col gap-[32px] items-start shrink-0 w-[159px]">
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#aeabb9] text-[16px] w-full">Tools</p>
                    <div className="text-[#232226] text-[18px] w-full">
                      <p className="leading-none mb-[12px]">Figma</p>
                      <p className="leading-none">Claude</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#aeabb9] text-[16px] w-full">Timeline</p>
                    <p className="leading-none text-[#232226] text-[18px] w-full">2 Days</p>
                  </div>
                  <div className="flex flex-col gap-[16px] items-start">
                    <p className="leading-none text-[#aeabb9] text-[16px] w-full">Role</p>
                    <p className="leading-none text-[#232226] text-[18px] w-full">Team Lead</p>
                  </div>
                </div>

                {/* Right: Context */}
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <p className="leading-none text-[#aeabb9] text-[16px] w-full">Context</p>
                  <div className="font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                    <p className="font-['Inter_Tight',sans-serif] font-[450] text-[#232226] mb-[16px]">Creative Collision is a 2-day sprint</p>
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">Teams in Creative Collision have a mix of 1 - 4th years to combine skills and mentorship! Each team typically has 6+ members.</p>
                    <p className="font-['Inter_Tight',sans-serif] mb-[16px]">During the final day, College of Art and Design students, faculty, and alumni are invited to explore the projects New Media Design have been developing.</p>
                    <p className="font-['Inter_Tight',sans-serif] font-[450] text-[#232226] mb-[16px]">Sogni.AI</p>
                    <p className="font-['Inter_Tight',sans-serif]">Our designathon this year was sponsored by Sogni.AI, a startup designed to democratize AI, made by Mavis Ledford, an RIT alum based in Singapore!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* The pushback + The response */}
            <div className="flex flex-col gap-[60px] items-start w-full">
              {/* Card: The pushback */}
              <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[24px] items-start overflow-clip p-[32px] relative rounded-[4px] w-full">
                <div className="absolute h-[312px] left-[-171px] top-[-71px] w-[609px] pointer-events-none">
                  <img alt="" className="absolute block max-w-none size-full" src={imgGradientOverlay} />
                </div>
                <div className="absolute h-[312px] left-[367px] top-[61px] w-[609px] pointer-events-none">
                  <img alt="" className="absolute block max-w-none size-full" src={imgGradientOverlay} />
                </div>
                <div className="flex flex-col gap-[16px] items-start relative w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">
                    The pushback
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#585564] text-[24px] w-full">
                    Wait..a creative collision has AI??
                  </p>
                </div>
                <div className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] relative text-[#585564] text-[18px] w-full">
                  <p className="mb-[16px]">This was the first year students were mixed in their opinion with the prompt.</p>
                  <p>While other teams had people interact with AI, we strayed away from interactions with filters, generated content, or chatbots and rather used Claude and Figma Make in our workflow to make something cool.</p>
                </div>
              </div>

              {/* The response */}
              <div className="flex flex-col gap-[16px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] w-full">
                    The response
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                    AI is a mirror
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] w-full">
                  Our professors believe that AI is nothing without taste. My fellow team lead, Mars, responded with AI is a mirror. We took that concept and ran with it, conceptualizing different ideas the first few hours until we landed on a grid of color and pixel art.
                </p>
              </div>
            </div>
          </div>

          {/* ── Section: Process Work ── */}
          <div className="flex flex-col gap-[36px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[14px] w-full">
                Process Work
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                Testing the grid
              </p>
            </div>

            {/* 2-column image grid */}
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[75px] w-full">
              {[
                { caption: "Pass 1 — Layering and shape tests; weak background–foreground contrast", media: "pass1" },
                { caption: "Pass 2 — Introducing AI logos and removing midtones to isolate darks and lights", media: "pass2" },
                { caption: "Pass 3 — Reintroducing midtones and control layering with thicker shapes", media: "pass3" },
                { caption: "Pass 4 — Testing colors; evaluating light vs. dark backgrounds w/ Prof Mike", media: "pass4" },
                { caption: "Four layers of varied densities affecting different values", media: "structure" },
                { caption: "The setup! Adding a second screen to guide people through the experience :D", media: "setup" },
              ].map(({ caption, media }, i) => (
                <div key={i} className="flex flex-col gap-[16px] items-start">
                  {media === "pass1" ? (
                    <video autoPlay loop muted playsInline className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" src={vidPass1} />
                  ) : media === "pass2" ? (
                    <img src={imgPass2} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                  ) : media === "pass3" ? (
                    <img src={imgPass3} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                  ) : media === "pass4" ? (
                    <img src={imgPass4} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                  ) : media === "structure" ? (
                    <img src={imgStructure} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                  ) : media === "setup" ? (
                    <img src={imgSetup} className="aspect-[485.5/242.75] rounded-[4px] w-full object-cover" alt={caption} />
                  ) : (
                    <div className="aspect-[485.5/242.75] bg-black rounded-[4px] w-full" />
                  )}
                  <p className="font-['Inter_Tight',sans-serif] leading-none text-[#585564] text-[14px] w-full">
                    {caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section: Review ── */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
              Replay
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
              First time using Claude!
            </p>

            {/* Point 1 */}
            <div className="bg-[#f4fad5] border border-[#e8e7f0] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[#908e99] text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px]">Simplicity &gt; Complexity</p>
                <p className="font-['Inter',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] w-full">
                  The response was incredible! Our work ended up being the lightest project in the showcase, with other teams having lots of touch points and long flows to work with over two days
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-[#ebfad5] border border-[#e8e7f0] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[#908e99] text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px]">Winning T-Shirts!</p>
                <p className="font-['Inter',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] w-full">
                  THANK YOU Mauvis and Grace @ Sogni.AI! I really learned a lot from Mauvis especially sharing his personal story and motivation to start Sogni.AI!
                </p>
                <img src={imgSogniai} className="aspect-[2/1] rounded-[4px] object-cover w-[255px]" alt="Sogni.AI" />
              </div>
            </div>

            {/* Point 3 */}
            <div className="bg-[#dbfad5] border border-[#e8e7f0] flex gap-[16px] items-start p-[16px] rounded-[8px] w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-[2.05] text-[#908e99] text-[14px] shrink-0">3</p>
              <div className="flex flex-col gap-[8px] items-start flex-1">
                <p className="font-['Inter_Tight',sans-serif] leading-[1.65] text-[#585564] text-[18px]">Side questing music beats with Strudel</p>
                <p className="font-['Inter',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] w-full">
                  I also made a custom beat for our experience! It was so fun being able to experiment, though music producer will never be in my future LOL
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="aixels" />

        </div>
      </div>
    </div>
  );
}
