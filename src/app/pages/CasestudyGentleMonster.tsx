import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/HomeButton";
import ButtonBasic from "../components/ButtonBasic";
import UpNext from "../components/UpNext";
import Cursor from "../components/Cursor";
const vidGmScene = new URL("../../assets/project/gentlemonster/gmscene_2x1.mp4", import.meta.url).href;
const vidDesignDoc = new URL("../../assets/project/gentlemonster/designdoc_16x9.mp4", import.meta.url).href;
const vidOjo01 = new URL("../../assets/project/gentlemonster/ojo01_16x9.mp4", import.meta.url).href;
const imgKioskFlowFull = new URL("../../assets/project/gentlemonster/kioskflow_full_2x1.png", import.meta.url).href;
const imgKioskFlowBag = new URL("../../assets/project/gentlemonster/kioskflow_bag_2x1.png", import.meta.url).href;
const imgKioskFlowPrescription = new URL("../../assets/project/gentlemonster/kioskflow_prescription_2x1.png", import.meta.url).href;
const imgKioskBuild = new URL("../../assets/project/gentlemonster/kioskbuild_2x1.png", import.meta.url).href;
const imgKioskSpace = new URL("../../assets/project/gentlemonster/kioskspace_2x1.png", import.meta.url).href;
const imgKioskPrintTest = new URL("../../assets/project/gentlemonster/kioskprinttest_2x1.png", import.meta.url).href;
const imgCrowd = new URL("../../assets/project/gentlemonster/crowd_2x1.png", import.meta.url).href;
const imgTaichi = new URL("../../assets/project/gentlemonster/taichi_2x1.png", import.meta.url).href;
const imgHirise = new URL("../../assets/project/gentlemonster/hirise_2x1.png", import.meta.url).href;
const imgAr = new URL("../../assets/project/gentlemonster/ar_2x1.png", import.meta.url).href;
const imgStickyDesktop = new URL("../../assets/project/gentlemonster/sticky_desktop.png", import.meta.url).href;

const imgEllipse2865 = "https://www.figma.com/api/mcp/asset/903ebcb5-ff08-428f-ac7d-800cd1b2c670";
const imgEllipse2866 = "https://www.figma.com/api/mcp/asset/52719bb5-57d0-4e7e-b213-302d881c5232";
const imgEllipse2867 = "https://www.figma.com/api/mcp/asset/e1e42d5a-9601-4fc2-990f-a44386029ac9";
const imgEllipse2868 = "https://www.figma.com/api/mcp/asset/3ec10b7a-0dd2-423b-9ed4-8c77ca7fad2b";
const imgEllipse2869 = "https://www.figma.com/api/mcp/asset/29253ed0-15ec-4e7d-b067-2c5130447547";
const imgEllipse2870 = "https://www.figma.com/api/mcp/asset/9322bac1-14ce-460b-a511-9210527a31f5";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
    <path d="M5 13L13 5M13 5H7M13 5V11" stroke="#908e99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CasestudyGentleMonster() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [activeJourneyTab, setActiveJourneyTab] = useState<"Full Flow" | "Checkout" | "Prescription">("Full Flow");
  const [hoveredJourneyTab, setHoveredJourneyTab] = useState<string | null>(null);
  const [journeyMousePos, setJourneyMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Hero scale animation
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
  const heroContentY = useTransform(() => {
    if (heroCompleted.current) return 0;
    const progress = Math.min(scrollY.get() / 400, 1);
    return heroExtraHeight.get() * (1 - progress);
  });

  useEffect(() => {
    const measure = () => {
      if (heroRef.current) heroExtraHeight.set(heroRef.current.offsetHeight * 0.35);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [heroExtraHeight]);

  // Sticky scroll
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stickyRef, offset: ["start start", "end end"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-1050px"]);

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
        initial={shouldAnimate ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0, top: scrolled && !scrollingUp ? "0px" : "12px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed left-[24px] right-[24px] z-50"
        style={{ top: "12px" }}
      >
        <Navigation scrolledDown={scrolled && !scrollingUp} />
      </motion.div>

      <div className="flex flex-col items-center px-[10px] pt-[15vh] pb-[15vh]">

        {/* Segment 1: Hero + Overview */}
        <div className="flex flex-col gap-[9vh] items-center w-full max-w-[886px]">

          {/* ── 1. Hero ── */}
          <motion.div
            ref={heroRef}
            className="aspect-[2/1] bg-[#505050] w-full overflow-hidden"
            style={{ scale: heroScale, borderRadius: heroBorderRadius, transformOrigin: "top center" }}
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidGmScene} />
          </motion.div>

          {/* ── 2. Overview ── */}
          <motion.div style={{ y: heroContentY }} className="flex flex-col gap-[32px] items-start w-full">

            {/* Tagline — negative margin cancels the 9vh gap, leaving exactly 16px below the scaled video */}
            <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] w-full text-left" style={{ marginTop: "calc(-9vh + 16px)" }}>
              Modelled, built, and animated in C4D
            </p>
            {/* Title + subtitle */}
            <div className="border-b border-[#d1cedc] flex flex-col gap-[8px] items-start pb-[32px] w-full">
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px] w-full">
                Gentle Monster Kiosk
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.25] text-[#908e99] text-[20px] w-full">
                A brand activation + study on heuristics and choice; ultimately gifting shoppers a fun experience to find their perfect match!
              </p>
            </div>

            {/* Metadata */}
            <div className="flex font-['Inter_Tight',sans-serif] gap-[57px] items-start w-full">
              {/* Left column */}
              <div className="flex flex-col gap-[32px] items-start shrink-0">
                {/* Tools */}
                <div className="flex flex-col gap-[4px] items-start">
                  <p className="font-normal leading-none text-[#aeabb9] text-[14px]">Tools</p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] w-[84px]">
                    Figma / Adobe Suite / C4D
                  </p>
                </div>
                {/* Role */}
                <div className="flex flex-col gap-[4px] items-start">
                  <p className="font-normal leading-none text-[#aeabb9] text-[14px]">Role</p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] w-[151px]">
                    Research / User Journey / Flow / Hi-fi Prototype / 3D Modelling / Motion
                  </p>
                </div>
                {/* Timeline */}
                <div className="flex flex-col gap-[4px] items-start">
                  <p className="font-normal leading-none text-[#aeabb9] text-[14px]">Timeline</p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] w-[66px]">
                    10 Weeks
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-[32px] items-start flex-1 min-w-0">
                {/* Interface */}
                <div className="flex flex-col gap-[4px] items-start">
                  <p className="font-normal leading-none text-[#aeabb9] text-[14px]">Interface</p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] w-[148px]">
                    22 x 11" and 44 x 22"
                  </p>
                </div>
                {/* The Mistake */}
                <div className="flex flex-col gap-[8px] items-start">
                  <p className="font-normal leading-none text-[#aeabb9] text-[14px]">The Mistake</p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] mb-[16px]">
                    Even the best brands have bad kiosks.
                  </p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px] mb-[16px]">
                    There's not a day where shoppers don't interact with a kiosk and experience a confusing integration of a brand.
                  </p>
                  <p className="font-normal leading-[1.65] text-[#232226] text-[16px]">
                    The project overall asks how can a kiosk create clear choices, avoid fatigue, and best represent the brand's design system.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── 3. Gentle Monster Sticky Scroll — FULL WIDTH ── */}
        <div ref={stickyRef} className="w-full mt-[9vh]" style={{ height: "4000px", position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: "calc(50vh - 397px)",
            }}
          >
            {/* Frame */}
            <div
              style={{
                height: "795px",
                overflow: "hidden",
                width: "100%",
              }}
            >
              <motion.div
                style={{
                  y: contentY,
                  position: "relative",
                  height: "1900px",
                  width: "100%",
                }}
              >
                {/* Row 1 — Unblurring (left) + Gentle Monster (right) */}
                <p
                  style={{ position: "absolute", top: "381px", left: "27%", transform: "translateX(-50%)" }}
                  className="font-['Inter_Tight'] font-[450] text-[50px] leading-[1.5] text-[#232226] whitespace-nowrap"
                >
                  Unblurring
                </p>
                <p
                  style={{ position: "absolute", top: "381px", left: "68%" }}
                  className="font-['Inter_Tight'] font-[450] text-[50px] leading-none text-[#232226] whitespace-nowrap"
                >
                  Gentle Monster
                </p>

                {/* Row 2 — What is GM (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "900px", left: "27%", transform: "translateX(-50%)" }}
                  className="font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[#232226] whitespace-nowrap"
                >
                  What is GM
                </p>
                <p
                  style={{ position: "absolute", top: "900px", left: "68%", width: "300px" }}
                  className="font-['Inter_Tight'] font-normal text-[16px] leading-[1.65] text-[#585564]"
                >
                  Known for unique and avant-garde concepts/products, their flagship stores blur the lines between art and retail.
                </p>

                {/* Row 3 — Why (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "1179px", left: "27%", transform: "translateX(-50%)" }}
                  className="font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[#232226] whitespace-nowrap"
                >
                  Why
                </p>
                <p
                  style={{ position: "absolute", top: "1179px", left: "68%", width: "300px" }}
                  className="font-['Inter_Tight'] font-normal text-[16px] leading-[1.65] text-[#585564]"
                >
                  By adding facial scanning technology with Gentle Monster's existing products, I envision a kiosk that blends utility with art.
                </p>

                {/* Row 4 — Goals (left) + body (right) */}
                <p
                  style={{ position: "absolute", top: "1435px", left: "27%", transform: "translateX(-50%)" }}
                  className="font-['Inter_Tight'] font-normal text-[32px] leading-[1.25] text-[#232226] whitespace-nowrap"
                >
                  Goals
                </p>
                <p
                  style={{ position: "absolute", top: "1435px", left: "68%", width: "300px" }}
                  className="font-['Inter_Tight'] font-normal text-[16px] leading-[1.65] text-[#585564]"
                >
                  Following similar concepts like Jin's (where user's can get frames + prescriptions same-day) I see a kiosk experience for users to find their perfect fit, with a secondary goal of inputting existing prescriptions.
                </p>
              </motion.div>
            </div>

            {/* Top frame — masks text at top edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "#faf9ff",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />

            {/* Bottom frame — masks text at bottom edge */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "#faf9ff",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />

            {/* sticky_desktop image overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "795px",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <img
                src={imgStickyDesktop}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Segment 2: rest of content */}
        <div className="flex flex-col gap-[9vh] items-center w-full max-w-[886px] mt-[9vh]">

          {/* ── 4. Basic Flow Card ── */}
          <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
            {/* Left blob */}
            <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
              <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2865} />
            </div>
            {/* Right blob */}
            <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
              <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2867} />
            </div>
            {/* Content */}
            <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] relative z-10">
              Basic Flow
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
              Scan → Glasses Found → Checkout
            </p>
            <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px] relative z-10">
              Sharing key clips of the main flow and summarizing design decisions
            </p>
            <button className="border border-[#d1cedc] flex gap-[8px] items-center px-[12px] py-[8px] rounded-[4px] relative z-10">
              <span className="font-['Inter_Tight',sans-serif] text-[#908e99] text-[18px]">Skip to UX Research</span>
              <ArrowIcon />
            </button>
          </div>

          {/* ── 5. Section: Brand Research + Flow ── */}
          <div className="flex flex-col gap-[9vh] items-start w-full">

            {/* Opportunity */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                  Opportunity
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
                  Try more and wait less.
                </p>
                <div className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] w-full">
                  <p className="mb-[16px]">With growing popularity, Gentle Monster has queued lines stretching outside the storefront in both locations I went to (Toronto, ON) (New York, New York).</p>
                  <p>I noticed shoppers often waiting for sales associates or to try on different pairs, introducing the opportunity for a second path that both enhances user delight and storefront efficiency.</p>
                </div>
              </div>
              {/* 2 landscape images with captions */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <img src={imgCrowd} alt="Crowds at GM" className="aspect-[2/1] w-full object-cover rounded-[4px]" />
                  <p className="font-['Inter_Tight',sans-serif] font-normal text-[14px] leading-none text-[#232226]">
                    Huge crowds are the norm for GM! Bratz pop-up in LA, Spring 2025
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <img src={imgAr} alt="AR experience at GM" className="aspect-[2/1] w-full object-cover rounded-[4px]" />
                  <p className="font-['Inter_Tight',sans-serif] font-normal text-[14px] leading-none text-[#232226]">
                    Not afraid of fun experiences! AR Bratz mo-cap experience in LA
                  </p>
                </div>
              </div>
            </div>

            {/* Typical GM shopper card */}
            <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
              {/* Left blob */}
              <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2865} />
              </div>
              {/* Right blob */}
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2867} />
              </div>
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] relative z-10">
                The typical Gentle Monster shopper
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
                Young, trendy, self-aware 18-34 year olds are 64% of GM's market
              </p>
              <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] relative z-10">
                My users are people who are familiar with technology and care deeply about aesthetics and visuals. It was important to make everything feel clean and cool.
              </p>
            </div>

            {/* Brand Considerations card */}
            <div className="border border-[#d1cedc] flex flex-col gap-[24px] items-start overflow-clip p-[24px] relative rounded-[12px] w-full">
              {/* Left blob large */}
              <div className="absolute pointer-events-none" style={{ width: "611px", height: "743px", left: "-274.5px", top: "calc(50% - 11.75px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2869} />
              </div>
              {/* Right blob large */}
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "673px", right: "-171.5px", top: "calc(50% + 217.25px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2870} />
              </div>
              {/* Text content */}
              <div className="flex flex-col gap-[16px] items-start relative z-10 w-full">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                  Brand Considerations
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
                  I categorized every product and major UI elements in Gentle Monster's website, visited 2 locations, and created a 50+ page doc of my findings.
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                  This was all to really understand Gentle Monster's design system and how people buy glasses. The biggest goal was to make the kiosk feel like it really was part of GM.
                </p>
                <ButtonBasic label="Want to read? Reach out!" size="Default" />
              </div>
              {/* Bottom video flush */}
              <div className="aspect-video bg-[#747474] rounded-bl-[8px] rounded-br-[8px] w-full relative z-10 overflow-hidden">
                <video
                  ref={(el) => {
                    if (!el) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                      { threshold: 0.25 }
                    );
                    observer.observe(el);
                  }}
                  loop muted playsInline className="w-full h-full object-contain" src={vidDesignDoc}
                />
              </div>
            </div>

            {/* User Journey */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                User Journey
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
                I created a comprehensive flow for product view, checkout, create account, prescription, and a few others.
              </p>
              <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                I designed the full flow with first-time users in mind, limiting choices and content to keep it manageable.
              </p>
              {/* Tab buttons */}
              <div className="flex gap-[8px] items-center">
                {(["Full Flow", "Checkout", "Prescription"] as const).map((tab) => {
                  const isActive = activeJourneyTab === tab;
                  const isHovered = hoveredJourneyTab === tab;
                  let bg = "#e8e7f0";
                  let color = "#585564";
                  let transition = "background 200ms ease-out, color 200ms ease-out";
                  if (isActive) { bg = "#232226"; color = "#e8e7f0"; transition = "background 300ms ease-out, color 300ms ease-out"; }
                  else if (isHovered) { bg = "#d1cedc"; color = "#3f3e47"; }
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveJourneyTab(tab)}
                      onMouseEnter={() => setHoveredJourneyTab(tab)}
                      onMouseLeave={() => setHoveredJourneyTab(null)}
                      onMouseMove={(e) => setJourneyMousePos({ x: e.clientX, y: e.clientY })}
                      className={`font-['Inter_Tight',sans-serif] font-normal leading-none text-[14px] px-[8px] py-[4px] rounded-[2px] border-0 ${isHovered || isActive ? "cursor-none" : "cursor-pointer"}`}
                      style={{ background: bg, color, transition }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              {hoveredJourneyTab && (
                <Cursor x={journeyMousePos.x} y={journeyMousePos.y} instance="Internal Link" />
              )}
              {/* Image */}
              <div className="aspect-[2/1] w-full rounded-[4px] overflow-hidden bg-[#d9d9d9]">
                <img
                  src={
                    activeJourneyTab === "Full Flow" ? imgKioskFlowFull :
                    activeJourneyTab === "Checkout" ? imgKioskFlowBag :
                    imgKioskFlowPrescription
                  }
                  alt={activeJourneyTab}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Two column prescription flow */}
            <div className="flex gap-[32px] items-start w-full">
              {/* Left card */}
              <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] flex-1 min-w-0">
                <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                  <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2866} />
                </div>
                <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                  <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2868} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[16px] relative z-10">
                  <span className="text-[#908e99]">Defining prescription flow: </span>
                  <span className="text-[#585564]">The kiosk is</span>
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
                  An avenue to get new prescriptions
                </p>
                <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] relative z-10">
                  Gentle Monster glasses come with plastic lenses, requiring a second trip to fill them. Why not provide in-house lens cutting like other Korean stores?
                </p>
              </div>
              {/* Right card */}
              <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] flex-1 min-w-0">
                <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                  <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2866} />
                </div>
                <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                  <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2868} />
                </div>
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[16px] relative z-10">
                  <span className="text-[#908e99]">Defining prescription flow:</span>
                  <span className="text-[#585564]"> The kiosk isn't</span>
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
                  A full prescription service
                </p>
                <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px] relative z-10">
                  The kiosk will not measure prescriptions but provide an avenue for it. The ability to measure prescriptions and users ability to input are contradictory.
                </p>
              </div>
            </div>

          </div>

          {/* ── 6. Section: Heuristic Research ── */}
          <div className="flex flex-col gap-[9vh] items-start w-full">

            {/* Title block */}
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                General Kiosk Research and Heuristics
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
                Clarity from asking questions
              </p>
              <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                I went out in search of what makes kiosks so frustrating to users by testing the heuristics of 2 kiosks and interviewing GenZ peers (the group most familiar with kiosks)
              </p>
            </div>

            {/* Two-column location cards */}
            <div className="flex gap-[16px] items-start w-full">
              {/* Hi-Rise Dispensary */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgHirise} alt="Hi-Rise Dispensary" className="aspect-[2/1] w-full object-cover rounded-[8px] border border-[#e8e7f0]" />
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#232226] text-[20px]">
                    Hi-Rise Dispensary
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px]">
                    Organization and Introducing new information
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#908e99] text-[18px]">
                  Studying the structure of information; great feedback and organized sections for beginners
                </p>
              </div>
              {/* Taichi Tea */}
              <div className="flex flex-col gap-[16px] items-start flex-1 min-w-0">
                <img src={imgTaichi} alt="Taichi Tea" className="aspect-[2/1] w-full object-cover rounded-[8px] border border-[#e8e7f0]" />
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#232226] text-[20px]">
                    Taichi Tea
                  </p>
                  <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px]">
                    Customization options
                  </p>
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#908e99] text-[18px]">
                  Viewing customization steps for what works and what definitely doesn't  [scrolling &gt;:(]
                </p>
              </div>
            </div>

            {/* The key problem card */}
            <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
              {/* Left blob */}
              <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2866} />
              </div>
              {/* Right blob */}
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2868} />
              </div>
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] relative z-10">
                The key problem
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
                Navigation is inconsistent + difficult and range of motion is tiring.
              </p>
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px] relative z-10">
                Top 3 gaps compiled after asking 12 peers to test out Hi-Rise and Taichi Tea
              </p>
            </div>

            {/* Gap cards — 3 equal columns */}
            <div className="flex gap-[15px] items-start w-full">
              {/* Gap 1 */}
              <div className="border border-[#d1cedc] flex flex-col gap-[8px] items-start flex-1 min-w-0 p-[24px] rounded-[4px]">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px]">Gap 1</p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px]">
                  Overload of Content
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px]">
                  In complex product menus, scrolls and hidden submenus created cognitive friction.
                </p>
              </div>
              {/* Gap 2 */}
              <div className="border border-[#d1cedc] flex flex-col gap-[8px] items-start flex-1 min-w-0 p-[24px] rounded-[4px]">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px]">Gap 2</p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px]">
                  Menu Placement
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px]">
                  Inconsistent menu placement popped up and often too high to be in good click zone
                </p>
              </div>
              {/* Gap 3 */}
              <div className="border border-[#d1cedc] flex flex-col gap-[8px] items-start flex-1 min-w-0 p-[24px] rounded-[4px]">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#aeabb9] text-[14px]">Gap 3</p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px]">
                  Fatigue
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px]">
                  Kiosks utilize full range of motion, causing fatigue
                </p>
              </div>
            </div>

            {/* The obvious solution card */}
            <div className="bg-[#faf9ff] border border-[#e8e7f0] flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full">
              {/* Left blob */}
              <div className="absolute pointer-events-none" style={{ width: "545px", height: "306px", left: "-274px", top: "calc(50% + 42px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2866} />
              </div>
              {/* Right blob */}
              <div className="absolute pointer-events-none" style={{ width: "528px", height: "306px", right: "-144px", top: "calc(50% - 55px)", transform: "translateY(-50%)" }}>
                <img alt="" className="absolute block max-w-none size-full" src={imgEllipse2868} />
              </div>
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px] relative z-10">
                The obvious solution
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.4] text-[#585564] text-[20px] relative z-10">
                Provide simple menus and large margins, centering the experience.
              </p>
            </div>

          </div>

          {/* ── 7. Section: Specs + Modelling ── */}
          <div className="flex flex-col gap-[9vh] items-start w-full">

            {/* Kiosk */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              {/* Title */}
              <div className="flex flex-col gap-[16px] items-start">
                <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                  Kiosk
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-black text-[24px]">
                  Shaping real specs
                </p>
              </div>
              {/* Body */}
              <div className="font-['Inter_Tight',sans-serif]font-normal leading-[0] text-[#585564] text-[16px] tracking-[-0.32px] w-full">
                <p className="leading-[1.65] mb-[16px]">I created 3 different heights for the kiosks based on mirror height recommendations for short, middle, and tall people! The kiosk width is 22 x 11 inches, and aspect ratio is 1920x1080 for the kiosk.</p>
                <p className="leading-[1.65] mb-[16px]">I wanted the kiosk to be shaped like lenses, round and soft, and be inspired by the 2024 jewelry collection, which uses pearls and purple gems.</p>
                <p className="leading-[1.65]">I also tested buttons, important interactive cards, and text in the real world!</p>
              </div>
              {/* Full-width image + caption */}
              <div className="flex flex-col gap-[10px] items-start w-full">
                <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                  <img src={imgKioskBuild} alt="Kiosk build" className="w-full h-full object-cover" />
                </div>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">
                  A summary of the kiosk! More in the design document.
                </p>
              </div>
              {/* Two-column images + captions */}
              <div className="flex gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                    <img src={imgKioskSpace} alt="Kiosk space" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px]">
                    Kiosk Space, designed for experiential flow of people
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <div className="aspect-[2/1] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
                    <img src={imgKioskPrintTest} alt="Kiosk print test" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-['Inter_Tight',sans-serif] font-normal leading-none text-[#908e99] text-[14px] w-full">
                    <p className="mb-[4px]">Kiosk prints: testing button sizes IRL with printed boards.</p>
                    <p>Alas, the physical print was given to prof Joel and never documented LOL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glasses */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                Glasses
              </p>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
                  Modelling a pair in C4d
                </p>
                <p className="font-['Inter_Tight',sans-serif]font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                  Luckily, Gentle Monster has beautiful side and front shots of each and every product so I was able to replicate everything within C4D pretty accurately!
                </p>
              </div>
              <div className="aspect-video bg-[#d9d9d9] w-full rounded-[4px] overflow-hidden">
                <video
                  ref={(el) => {
                    if (!el) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                      { threshold: 0.25 }
                    );
                    observer.observe(el);
                  }}
                  loop muted playsInline className="w-full h-full object-contain" src={vidOjo01}
                />
              </div>
            </div>

          </div>

          {/* ── 8. Section: Reflection ── */}
          <div className="flex flex-col gap-[24px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] leading-none text-[#908e99] text-[16px]">
                Thank you for shopping with us!
              </p>
              <p className="font-['Inter_Tight',sans-serif] font-[450] leading-[1.3] text-[#232226] text-[24px]">
                Combining skillsets &gt;&gt;
              </p>
            </div>

            {/* Card 1 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#d1cedc] w-full" style={{ background: "rgba(219,189,254,0.2)" }}>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[14px] shrink-0">
                1
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px]">
                  Balancing a lot of moving pieces
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                  I got the opportunity to explore my love of design systems and branding, but also use my muscles in 3D / motion! Every decision had weight, consideration, and heavy documentation! I loved it :D
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] border border-[#d1cedc] w-full" style={{ background: "rgba(245,189,254,0.2)" }}>
              <p className="font-['Inter_Tight',sans-serif] font-normal leading-[2.05] text-[#908e99] text-[14px] shrink-0">
                2
              </p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[18px]">
                  Time Saver + Art Installation? Say less!
                </p>
                <p className="font-['Inter_Tight',sans-serif] font-normal leading-[1.65] text-[#585564] text-[16px] tracking-[-0.32px]">
                  Exploring heuristics and problem solving to then blend it with a luxury experience/art installation was super exciting!
                </p>
              </div>
            </div>
          </div>

          <UpNext currentId="gentle-monster" />

        </div>
      </div>
    </div>
  );
}
