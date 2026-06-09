import { useState, useEffect } from "react";
import { useNavEntrance } from "../hooks/useNavEntrance";
import { motion } from "motion/react";
import Navigation from "../../imports/Navigation";
import HomeButton from "../components/layout/HomeButton";
import CasestudyNavigation from "../components/casestudy/CasestudyNavigation";
import UpNext from "../components/casestudy/UpNext";
import CasestudyMiniMenu from "../components/casestudy/CasestudyMiniMenu";
import CasestudySectionHeader from "../components/casestudy/CasestudySectionHeader";

const CAPITOL_SECTIONS = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-research", label: "Research" },
  { id: "cs-brand", label: "Brand System" },
  { id: "cs-reflection", label: "Reflections" },
];

const vidCapitol = new URL("../../assets/project/capitol/capitol_fullflow.mp4", import.meta.url).href;

export default function CasestudyCapitol() {
  const shouldAnimate = useNavEntrance();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="relative bg-background min-h-screen" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#FAF9FF" }}>
      <HomeButton />
      <CasestudyNavigation title="CAPITOL" />

      {/* Nav */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: -16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.33, 0, 0, 1], delay: 0.1 }}
        className="hidden md:block fixed top-[16px] left-[20px] right-[20px] z-50"
      >
        <Navigation scrolledDown={scrolled} />
      </motion.div>

      <CasestudyMiniMenu sections={CAPITOL_SECTIONS} />

      {/* Hero video */}
      <div style={{ width: "100%", aspectRatio: "2 / 1", overflow: "hidden", backgroundColor: "rgba(88,85,100,0.1)" }}>
        <video
          src={vidCapitol}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 4.5vw" }}>

        {/* Overview */}
        <section id="cs-overview" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ fontSize: 12, color: "#908E99", letterSpacing: "0.08em", textTransform: "uppercase" }}>Overview</p>
            <h1 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.2, margin: 0, maxWidth: 700 }}>
              Capitol Aluminum Rebrand
            </h1>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.7, color: "#C1BECB", maxWidth: 600, margin: 0 }}>
              As the sole design hire at Capitol Aluminum, I led the company's complete brand transformation across three phases — foundational research, brand system development, and print/digital/web rollout.
            </p>
            <div style={{ display: "flex", gap: 40, paddingTop: 16 }}>
              {[
                { label: "Role", value: "Product Design Co-op" },
                { label: "Timeline", value: "Summer 2024" },
                { label: "Scope", value: "Branding · Print · Web" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <p style={{ fontSize: 11, color: "#585564", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 14, color: "#FAF9FF", fontWeight: 300, margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: 1, backgroundColor: "#302f34" }} />

        {/* Research */}
        <section id="cs-research" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <CasestudySectionHeader
            eyebrow="Research"
            headline="Understanding the foundation"
            subtitle="Before touching a single pixel, auditing assets, interviewing stakeholders, and analyzing the competitive landscape."
          />
        </section>

        <div style={{ height: 1, backgroundColor: "#302f34" }} />

        {/* Brand system */}
        <section id="cs-brand" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <CasestudySectionHeader
            eyebrow="Brand System"
            headline="Building the system"
            subtitle="Logo, typography, color, and iconography designed to scale across print, digital, and web."
          />
          <div style={{ marginTop: 40, width: "100%", aspectRatio: "2 / 1", backgroundColor: "rgba(88,85,100,0.1)", borderRadius: 8, overflow: "hidden" }}>
            <video
              src={vidCapitol}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </section>

        <div style={{ height: 1, backgroundColor: "#302f34" }} />

        {/* Reflection */}
        <section id="cs-reflection" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <CasestudySectionHeader eyebrow="Reflections" headline="What I learned" subtitle="Working as the sole designer taught me how to own decisions end-to-end, communicate design rationale to non-designers, and ship work that sticks — even after you leave." />
        </section>

        <UpNext currentId="capitol-aluminum" />
      </div>
    </div>
  );
}
