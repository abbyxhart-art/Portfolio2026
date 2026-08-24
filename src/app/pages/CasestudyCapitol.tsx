import { useState, useEffect, useRef } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion } from "@/lib/motion";
import UpNext from "../components/casestudy/UpNext";
import SectionNavigation from "../components/casestudy/SectionNavigation";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";
import VideoControls from "../components/VideoControls";

const imgFiftyBrowsers = new URL("../../assets/project/capitol/fifty-browsers.png", import.meta.url).href;
const imgTemplate1 = new URL("../../assets/project/capitol/5.5x8.5template_1.png", import.meta.url).href;
const imgPrintPacket = new URL("../../assets/project/capitol/printpacket.png", import.meta.url).href;
const imgBrochure = new URL("../../assets/project/capitol/8.5x22 brochure.png", import.meta.url).href;
const imgTemplate2 = new URL("../../assets/project/capitol/5.5x8.5template_2.png", import.meta.url).href;
const imgBrandingBook = new URL("../../assets/project/capitol/branding-book.png", import.meta.url).href;
const imgWebsite = new URL("../../assets/project/capitol/website.jpg", import.meta.url).href;
const imgPostCards = new URL("../../assets/project/capitol/5x7postcards.png", import.meta.url).href;
const imgPages8x11 = new URL("../../assets/project/capitol/8.5x11pages.png", import.meta.url).href;
const imgLetterhead = new URL("../../assets/project/capitol/letterhead.png", import.meta.url).href;
const imgLogo = new URL("../../assets/project/capitol/logo.png", import.meta.url).href;
const imgNewLogo = new URL("../../assets/project/capitol/new-logo.png", import.meta.url).href;
const imgOldLogo = new URL("../../assets/project/capitol/old-logo.png", import.meta.url).href;
const imgPrimaryColor = new URL("../../assets/project/capitol/primarycolor.png", import.meta.url).href;
const imgSecondaryColor = new URL("../../assets/project/capitol/secondarycolor.png", import.meta.url).href;
const imgIcons = new URL("../../assets/project/capitol/icons.png", import.meta.url).href;
const imgSlides35 = new URL("../../assets/project/capitol/8.5x3.5slides.png", import.meta.url).href;
const vidEntrance = new URL("../../assets/project/capitol/entrancepage_1920_860.mp4", import.meta.url).href;
const imgTimeline = new URL("../../assets/project/capitol/capitol_timeline.png", import.meta.url).href;
const vidNavigation = new URL("../../assets/project/capitol/navigation_1920x860.mp4", import.meta.url).href;
const vidProductPage = new URL("../../assets/project/capitol/productpage_1920x860.mp4", import.meta.url).href;

const CAPITOL_SECTIONS = [
  { id: "cs-highlights", label: "Highlights" },
  { id: "cs-context", label: "Context" },
  { id: "cs-research", label: "Research" },
  { id: "cs-branding", label: "Branding" },
  { id: "cs-prints", label: "Prints" },
  { id: "cs-website", label: "Website" },
  { id: "cs-reflection", label: "Reflections" },
];

const vidCapitol = new URL("../../assets/project/capitol/captiol-01.mp4", import.meta.url).href;

const blobBottom = "radial-gradient(ellipse at center, rgba(88,85,100,0.35) 0%, rgba(88,85,100,0) 70%)";
const blobTop = "radial-gradient(ellipse at center, rgba(175,164,216,0.15) 0%, rgba(175,164,216,0) 70%)";
const blobBlue = "radial-gradient(ellipse at center, rgba(90,150,220,0.18) 0%, rgba(90,150,220,0) 70%)";

export default function CasestudyCapitol() {
  const shouldAnimate = useNavEntrance();
  const [templateTab, setTemplateTab] = useState<1 | 2>(1);
  const [hoveredTemplateTab, setHoveredTemplateTab] = useState<1 | 2 | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const entranceVideoRef = useRef<HTMLVideoElement>(null);
  const navigationVideoRef = useRef<HTMLVideoElement>(null);
  const productPageVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#FAF9FF" }}>
      <SectionNavigation sections={CAPITOL_SECTIONS} title="CAPITOL Casestudy Navigation" />


      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-[16px] md:px-[16vw] pt-[20vh] pb-[15vh] relative z-[1]"
      >
        {/* ── Title + Hero ── */}
        <div className="flex flex-col gap-[32px] items-center w-full">

          <motion.div
            className="flex flex-col md:flex-row items-start justify-between md:gap-[24px] w-full font-['SF_Pro_Display',sans-serif]"
          >
            {/* Left side */}
            <div className="flex flex-col gap-[16px] items-start w-full md:w-[565px] shrink-0">
              <p className="font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                Capitol Aluminum
              </p>
              <div className="font-regular text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                <p className="leading-[1.65] mb-[16px]">Capitol Aluminum is a small company in Ohio.</p>
                <p className="leading-[1.65]">Working directly with the people who's opinions mattered (sales and marketing), I built a brand identity from the ground up that could scale across every touchpoint.</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-[32px] items-start justify-center max-w-[65ch] w-full md:w-[323px] shrink-0 font-regular text-[length:var(--typography-body-default-font-size)]">
              <div className="flex flex-col gap-[16px] items-start">
                <p className="leading-[1.65] font-medium text-[#faf9ff]">Scope</p>
                <div className="text-[#908e99] leading-none">
                  <p className="mb-[12px]">Solo Designer</p>
                  <p className="mb-[12px]">Branding, Research</p>
                  <p>Print, Web, Digital design</p>
                </div>
              </div>
              <p className="text-[#908e99] leading-none">2024</p>
            </div>
          </motion.div>

          {/* ── Hero ── */}
          <div
            className="aspect-[3/2] bg-[#2c2c2c] w-full overflow-hidden relative"
            style={{ borderRadius: "var(--radius-component-image)" }}
          >
            <video ref={heroVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidCapitol} />
            <VideoControls videoRef={heroVideoRef} />
          </div>

        </div>

        {/* ── Main sections ── */}
        <div className="flex flex-col gap-[100px] items-center w-full mt-[100px]">

          {/* ── Section: Highlights ── */}
          <div id="cs-highlights" className="flex flex-col gap-[100px] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Highlights"
              headline="A four phase brand refresh"
              subtitle="Research, Logo, Graphics, Website"
            />

            <div
              className="flex flex-col gap-[75px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px] pb-[42px] max-w-[65ch] w-full">
                A full brand experience that's consistent at every touchpoint.
              </p>

              {/* Flow 1 — Print */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Print</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">The packet</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    The packet was created to be clear, stackable + flexible for different clients, and easy to update.
                  </p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "1920 / 735" }}>
                  <img src={imgPrintPacket} alt="Brochure design" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Flow 2 — Site */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Site</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">The site</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    Designed over a span of 3 weeks.
                  </p>
                </div>
                <div className="aspect-[3/2] rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]">
                  <img src={imgWebsite} alt="Capitol website" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Flow 3 — Brand + Guidelines */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Brand + Guidelines</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">The document</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] max-w-[65ch] w-full">
                    The brand guidelines doc was the backbone of everything. It defined every decision — color, type, spacing — before a single layout was touched.
                  </p>
                </div>
                <div className="aspect-[3/2] rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]">
                  <img src={imgBrandingBook} alt="Brand guidelines document" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section: Context ── */}
          <div id="cs-context" className="flex flex-col gap-[100px] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Context"
              headline="Growth was being held back by confusing communication"
              subtitle="Capitol is a family-owned manufacturing company in Ohio. Their work is in every county in Ohio, but they still couldn't attract new clients."
            />

            {/* Problems */}
            <div className="flex flex-col items-start w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px] pb-[42px] text-center max-w-[65ch] w-full">
                The brand wasn't keeping up with Capitol's level of craft and care
              </p>
              <div className="flex flex-col md:flex-row gap-[24px] items-stretch w-full">

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -148, top: "calc(50% + 141px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBottom }} />
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px] relative z-10">Problem 1</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">Usual client base was gone</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Basically, their products were too good (products last 25–30 years). Traditional spaces were drying up.
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -148, top: "calc(50% + 141px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBottom }} />
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px] relative z-10">Problem 2</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">Competition in Michigan</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Capitol's products were just as good if not better, but their marketing wasn't.
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -148, top: "calc(50% + 141px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBottom }} />
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px] relative z-10">Problem 3</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">Clients were confused</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Capitol's benefits were so broad that it became overwhelming and unfocused.
                  </p>
                </div>

              </div>
            </div>

            {/* Goals */}
            <div className="flex flex-col items-center w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px] pb-[42px] max-w-[65ch] w-full text-center">Goals for the summer</p>
              <div className="flex flex-col md:flex-row gap-[24px] items-stretch w-full">

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -157, top: "calc(50% - 78px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBlue }} />
                  </div>
                  <div className="font-['SF_Pro_Display',sans-serif] font-regular flex gap-[16px] items-start leading-[1.45] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">
                    <p className="text-[#908e99]">01</p>
                    <p className="font-medium text-[#faf9ff]">Learn from sales</p>
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Proactively stayed in touch with the sales team, asking what felt right and what would help them do their job.
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -158, top: "calc(50% - 78px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBlue }} />
                  </div>
                  <div className="font-['SF_Pro_Display',sans-serif] font-regular flex gap-[16px] items-start leading-[1.45] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">
                    <p className="text-[#908e99]">02</p>
                    <p className="font-medium text-[#faf9ff]">Build on reputation</p>
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Those who worked with Capitol were never disappointed. We had to show the results.
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                  <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -158, top: "calc(50% - 78px)", transform: "translateY(-50%)" }}>
                    <div style={{ width: "100%", height: "100%", background: blobBlue }} />
                  </div>
                  <div className="font-['SF_Pro_Display',sans-serif] font-regular flex gap-[16px] items-start leading-[1.45] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">
                    <p className="text-[#908e99]">03</p>
                    <p className="font-medium text-[#faf9ff]">Shape accessible info</p>
                  </div>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                    Make the products easier to understand across audiences and industries.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ── Section: Research ── */}
          <div id="cs-research" className="flex flex-col gap-[100px] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Research"
              headline="Understanding where we want to go"
              subtitle="Before touching a single pixel, I did internal interviews and found their competition."
            />

            {/* Brand positioning */}
            <div className="flex flex-col gap-[79px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Brand positioning</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">50 browser tabs of window companies</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">
                  Capitol had an idea of what they wanted, but struggled to clearly define it. I studied companies they wanted to match and compete with, breaking down what resonated and how it could translate into their brand. One in particular clarified Capitol's direction and improved how we communicated it.
                </p>
              </div>
              <div className="aspect-[3/2] rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]">
                <img src={imgFiftyBrowsers} alt="Brand positioning research" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Client groups */}
            <div className="flex flex-col md:flex-row gap-[24px] items-stretch w-full">

              <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -62, top: "calc(50% - 98px)", transform: "translateY(-50%)" }}>
                  <div style={{ width: "100%", height: "100%", background: blobTop }} />
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px] relative z-10">Client group 1</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">Architects, Project managers</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                  Their focus was on specs and functionality; if the product worked for their specific project.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0 overflow-clip p-[24px] relative rounded-[12px] border border-[#302f34] bg-[#161617]">
                <div className="absolute pointer-events-none" style={{ width: 545, height: 306, left: -57, top: "calc(50% - 92px)", transform: "translateY(-50%)" }}>
                  <div style={{ width: "100%", height: "100%", background: blobBottom }} />
                </div>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px] relative z-10">Client group 2</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)] relative z-10">Business and building owners</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] relative z-10">
                  The focus was on benefits, both monetary and aesthetic, rather than technical details.
                </p>
              </div>

            </div>

            {/* Capitol Operations card */}
            <div className="flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] w-full border border-[#302f34]" style={{ background: "rgba(88,85,100,0.15)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Capitol Operations</p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">
                Capitol secures deals through word of mouth and a manila folder of papers
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)]">
                While the website was originally the priority, print became the focus for the summer based on how the sales team actually operated and closed deals.
              </p>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-[42px] items-start w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Timeline</p>
              <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]">
                <img src={imgTimeline} alt="Project timeline" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>

          {/* ── Section: Branding ── */}
          <div id="cs-branding" className="flex flex-col gap-[75px] items-start w-full scroll-mt-[100px]">

            <div className="w-full border-t border-[#302f34]" />

            {/* Center Title */}
            <div className="flex flex-col gap-[24px] items-center w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[16.5px] text-[#908e99] text-[12px] text-center tracking-[0.1px] uppercase">
                branding
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[48px] text-[#faf9ff] text-[40px] text-center">
                A renovation
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] text-center">
                But keeping the reno within the original frames
              </p>
            </div>

            {/* Brand Document */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Lockup / Logo</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">A change in perspective</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Grounded and solid: no more lines or isometric angle. Custom kerning on the lockup text, plus a tagline version at Gail's request.</p>
              </div>
              <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                <img src={imgLogo} alt="Brand document" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Color + Secondary Colors */}
            <div
              className="flex flex-col gap-[42px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Color Choices</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">86 the red</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)]">For a company centered around cooling and comfort, the red branding felt too inflammatory.</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgPrimaryColor} alt="Primary color choices" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Secondary colors</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">Chosen to compliment glass, buildings, and sky</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgSecondaryColor} alt="Secondary color choices" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Logo + Project Spotlights */}
            {/* Custom Icons */}
            <div
              className="flex flex-col gap-[24px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Custom Icons</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">A few specific icons for Capitol</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Beyond providing a default icon set, IIn designed custom icons around the 8 product features that came up most in print.</p>
              </div>
              <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "1920 / 277" }}>
                <img src={imgIcons} alt="Capitol custom icons" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>

          {/* ── Section: Prints ── */}
          <div id="cs-prints" className="flex flex-col gap-[75px] items-start w-full scroll-mt-[100px]">

            <CasestudySectionHeader
              eyebrow="Prints"
              headline="Replacing the manilla folder"
              subtitle="Designing interlocking pieces of work at varied sizes and needs"
            />

            {/* The Packet */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">The Packet</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">A modular, stackable packet for on-the-go use</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">We narrowed down papers into 5 distinct pieces</p>
              </div>
              <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "1920 / 735" }}>
                <img src={imgPrintPacket} alt="The packet" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Gradient card — the 5 pieces */}
            <div
              className="flex flex-col gap-[42px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >

              {/* The Brochure */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">The Brochure</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">The brochure was the biggest piece for Capitol</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Each page focuses on one thing to give a complete image of Capitol.</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgBrochure} alt="The brochure" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* 5.5x11 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">5.5x11</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">What we do for you</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">"Made for, built for, designed for" — everything to give context. Each page has its own structure, shaping around the photos.</p>
                </div>
                {/* Tab switcher */}
                <div className="flex flex-col items-start">
                  <div
                    className="relative flex gap-[4px] h-[48px] items-start p-[8px] rounded-[100px]"
                    style={{ width: "220px", background: "rgba(88,85,100,0.2)", border: "1px solid #302f34" }}
                  >
                    <div
                      className="absolute top-[8px] h-[32px] w-[100px] rounded-[24px] pointer-events-none"
                      style={{
                        background: "rgba(144,142,153,0.2)",
                        left: "8px",
                        transform: `translateX(${(templateTab - 1) * 104}px)`,
                        transition: "transform 200ms ease-out",
                      }}
                    />
                    {([1, 2] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTemplateTab(tab)}
                        onMouseEnter={() => setHoveredTemplateTab(tab)}
                        onMouseLeave={() => setHoveredTemplateTab(null)}
                        className="relative flex h-[32px] w-[100px] items-center justify-center px-[8px] py-[4px] rounded-[24px] shrink-0 bg-transparent border-none cursor-pointer"
                      >
                        <span
                          className="font-['SF_Pro_Display',sans-serif] font-regular text-[14px] leading-none whitespace-nowrap"
                          style={{
                            color: templateTab === tab || hoveredTemplateTab === tab ? "#faf9ff" : "#908e99",
                            transition: "color 150ms ease-out",
                          }}
                        >
                          {tab === 1 ? "Default" : "+ Color"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div
                    className="h-[2px] w-[48px] rounded-b-[4px]"
                    style={{
                      background: "#d9d9d9",
                      marginLeft: "34px",
                      transform: `translateX(${(templateTab - 1) * 104}px)`,
                      transition: "transform 200ms ease-out",
                    }}
                  />
                </div>
                <div className="aspect-[3/2] rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]">
                  <img
                    src={templateTab === 1 ? imgTemplate1 : imgTemplate2}
                    alt={`5.5x11 template ${templateTab}`}
                    className="w-full h-full object-cover"
                    style={{ transition: "opacity 0.25s ease" }}
                  />
                </div>
              </div>

              {/* Project Spotlights */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Project Spotlights (8.5x11)</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">An in-depth paper focusing on projects similar to the client</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Jon from sales had already started the idea, I built it into a consistent template the whole team could use.</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgPages8x11} alt="8.5x11 project spotlight pages" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Post Cards */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Post Cards (5 x 7)</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">Specific benefits and features</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">This also included company taglines like One Source, One Call, or Design, Manufacture, Install.</p>

                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "1920 / 516" }}>
                  <img src={imgPostCards} alt="5x7 post cards" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* 8.5x3.5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Post Cards (8.5 x 3.5)</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">A different layout with focused information</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Less focus on location, more on products</p>

                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgSlides35} alt="8.5x3.5 slides" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Business Cards and Mailers */}
              <div className="flex flex-col gap-[16px] items-start pb-[42px] w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">Business Cards and Mailers</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">All the information wrapped nicely</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c]" style={{ aspectRatio: "3 / 2" }}>
                  <img src={imgLetterhead} alt="Business cards and mailers" className="w-full h-full object-cover" />
                </div>
              </div>

            </div>
          </div>

          {/* ── Section: Website ── */}
          <div id="cs-website" className="flex flex-col gap-[75px] items-start w-full scroll-mt-[100px]">

            <div className="w-full border-t border-[#302f34]" />

            {/* Center Title */}
            <div className="flex flex-col gap-[24px] items-center w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[16.5px] text-[#908e99] text-[12px] text-center tracking-[0.1px] uppercase">
                website
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[48px] text-[#faf9ff] text-[40px] text-center">
                Simple to replicate and templatize
              </p>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#908e99] text-[length:var(--typography-body-default-font-size)] text-center">
                Designed to be super easy to develop and maintain
              </p>
            </div>

            {/* Website highlights card */}
            <div
              className="flex flex-col gap-[42px] items-start p-[24px] rounded-[8px] w-full border border-[#302f34]"
              style={{ background: "linear-gradient(to bottom, rgba(88,85,100,0.15) 0%, rgba(22,22,23,0.1) 50%)" }}
            >
              <div className="flex flex-col gap-[8px] items-start pb-[32px] w-full">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.45] text-[#faf9ff] text-[length:var(--typography-display-title-smallest-font-size)]">Website highlights and features</p>
                <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">I simplified the experience and emphasized promotional offers and design benefits.</p>
              </div>

              {/* 1/3 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">1/3</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">Each category page has a comparison of products</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c] relative" style={{ aspectRatio: "1920 / 860" }}>
                  <video ref={entranceVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidEntrance} />
                  <VideoControls videoRef={entranceVideoRef} />
                </div>
              </div>

              {/* 2/3 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">2/3</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">From 5 tabs and a few submenus to one clean navigation</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Now products and information is grouped in a simpler format!</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c] relative" style={{ aspectRatio: "1920 / 860" }}>
                  <video ref={navigationVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidNavigation} />
                  <VideoControls videoRef={navigationVideoRef} />
                </div>
              </div>

              {/* 3/3 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="flex flex-col gap-[16px] items-start w-full">
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">3/3</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">Product Pages</p>
                  <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)]">Now designed with images and quotes from projects where those products were used</p>
                </div>
                <div className="rounded-[var(--radius-component-image)] w-full overflow-hidden bg-[#2c2c2c] relative" style={{ aspectRatio: "1920 / 860" }}>
                  <video ref={productPageVideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" src={vidProductPage} />
                  <VideoControls videoRef={productPageVideoRef} />
                </div>
              </div>
            </div>

          </div>

          {/* ── Section: Reflections ── */}
          <div id="cs-reflection" className="flex flex-col gap-[24px] items-start w-full scroll-mt-[100px]">
            <div className="w-full border-t border-[#302f34]" />
            <div className="flex flex-col gap-[16px] items-start w-full">
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[20px] text-[#908e99] text-[14px]">What I learned</p>
              <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.3] text-[#faf9ff] text-[24px]">Working as the sole designer</p>
            </div>

            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] w-full border border-[#302f34]" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[2.05] text-[#908e99] text-[14px] shrink-0">1</p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)]">Your design system is only as good as your ability to communicate it</p>
                <p className="font-['Inter',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">Designing templates and intuitive layouts that people could use, duplicate, and reuse was one of my favorite challenges, and communicating those challenges and choices clearly was so important!</p>
              </div>
            </div>

            <div className="flex gap-[16px] items-start p-[16px] rounded-[8px] w-full border border-[#302f34]" style={{ background: "rgba(219,189,254,0.05)" }}>
              <p className="font-['SF_Pro_Display',sans-serif] font-regular leading-[2.05] text-[#908e99] text-[14px] shrink-0">2</p>
              <div className="flex flex-col gap-[8px] items-start flex-1 min-w-0">
                <p className="font-['SF_Pro_Display',sans-serif] font-medium leading-[1.65] text-[#faf9ff] text-[length:var(--typography-body-default-font-size)]">Get feedback in moderation</p>
                <p className="font-['Inter',sans-serif] font-regular leading-[1.65] text-[#b8b4c5] text-[length:var(--typography-body-default-font-size)] tracking-[-0.32px]">Some of the best designs came from feedback, but also there were times it was important to trust my gut. Luckily, my team trusted me and we made it work!</p>
              </div>
            </div>
          </div>

          <UpNext currentId="capitol-aluminum" />
        </div>
      </motion.div>
    </div>
  );
}
