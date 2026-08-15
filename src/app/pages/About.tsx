import { useState, useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import OfflineCard, { OfflineMiniCard } from "../components/about/OfflineCard";
import EthosMiniCard from "../components/about/EthosMiniCard";
import DrinkCard from "../components/drinks/DrinkCard";
import SpotifyPlayer from "../components/about/SpotifyPlayer";
import about1 from "../../assets/project/about/about_1.jpg";
import about3 from "../../assets/project/about/about_3.png";
import about4 from "../../assets/project/about/about_4.png";
import about5 from "../../assets/project/about/about_5.JPG";
import PhotoStack from "../components/about/PhotoStack";
import { useTheme } from "../context/ThemeContext";
import ArtGallery from "../components/about/ArtGallery";
import ResumeCard from "../components/layout/ResumeCard";
import { STICKY_WIDGET_BOTTOM } from "../components/layout/mobileNavLayout";
import { getDotBackground } from "../utils/dotBackground";

// Mobile-only: measures its own cell width so DrinkCard's pixel-based
// illustration scales to fill it (DrinkCard takes an explicit `size`, not a
// percentage). SpotifyPlayer needs no such measurement — it's `inset-0`.
function MobileDrinkPlaylistRow() {
  const drinkCellRef = useRef<HTMLDivElement>(null);
  const [drinkSize, setDrinkSize] = useState(110);

  useEffect(() => {
    const el = drinkCellRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setDrinkSize(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex gap-[16px] items-start animate-[fadeSlideIn_0.5s_ease-out_both]">
      <div ref={drinkCellRef} className="flex-1" style={{ aspectRatio: "1/1" }}>
        <DrinkCard size={drinkSize} labelSize={12} />
      </div>
      <div className="relative flex-[2] rounded-[8px] overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <SpotifyPlayer labelSize={12} />
      </div>
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [resumeCollapsed, setResumeCollapsed] = useState(true);
  const [stackPeek, setStackPeek] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const checkFooter = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      setFooterVisible(footer.getBoundingClientRect().top < window.innerHeight);
    };
    checkFooter();
    window.addEventListener('scroll', checkFooter, { passive: true });
    return () => window.removeEventListener('scroll', checkFooter);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.scrollY <= 60) setResumeCollapsed(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 60) setResumeCollapsed(true);
      if (y > 60) setStackPeek(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-clip" style={getDotBackground(isDark)}>

      {/* ══ Section 1: 100vh — bio, side panels, DrinkCard ══ */}
      <div className="relative px-[16px] md:px-[2vw] pt-[56px] md:pt-[140px]" style={{ minHeight: "100vh" }}>

        {/* Resume card — desktop: page-centered, bottom of section */}
        <motion.div
          className="hidden xl:block fixed z-10 overflow-hidden"
          style={{ bottom: 16, left: 0, right: 0, marginLeft: "auto", marginRight: "auto", width: 520, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: footerVisible ? 0 : 1, pointerEvents: footerVisible ? "none" : "auto", borderRadius: resumeCollapsed ? 999 : 8 }}
          transition={{ opacity: footerVisible ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }, borderRadius: { duration: 0.35, ease: [0.33, 0, 0, 1] } }}
        >
          <ResumeCard collapsed={resumeCollapsed} onToggle={() => setResumeCollapsed(v => !v)} isDark={isDark} />
        </motion.div>

        {/* Resume card — mobile: fixed near the bottom, 16px side margins,
            resting above MobileMainNav's permanent row, sharing the same
            resumeCollapsed/footerVisible state as the desktop version.
            z-70 (not z-40) so it sits above MobileMainNav's z-[65] progressive
            blur, matching SectionNavigation/MobileCasestudyNav's convention —
            otherwise that blur (which extends 80px above the nav bar) reads
            through and blurs the card itself. */}
        <motion.div
          className="md:hidden fixed z-[70] overflow-hidden"
          style={{ left: 16, right: 16, bottom: STICKY_WIDGET_BOTTOM, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: footerVisible ? 0 : 1, y: 0, pointerEvents: footerVisible ? "none" : "auto", borderRadius: resumeCollapsed ? 999 : 8 }}
          transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
        >
          <ResumeCard collapsed={resumeCollapsed} onToggle={() => setResumeCollapsed(v => !v)} isDark={isDark} />
        </motion.div>

        {/* Desktop xl */}
        <div className="hidden xl:block">
          <div className="relative" style={{ minHeight: "calc(100vh - 140px)" }}>

            {/* Left: SpotifyPlayer — top aligned with the bio text */}
            <div className="absolute" style={{ left: 0, top: 30, width: 260 }}>
              <div className="w-full relative overflow-hidden" style={{ borderRadius: 8, aspectRatio: "1/1" }}>
                <SpotifyPlayer />
              </div>
            </div>

            {/* Left: EthosMiniCard — left edge at the playlist's right edge, bottom aligned */}
            <div className="absolute" style={{ left: 260, bottom: 50, width: 130, aspectRatio: "1/1" }}>
              <EthosMiniCard />
            </div>

            {/* Right: OfflineCard — top aligned with the bio text */}
            <div className="absolute" style={{ right: 0, top: 30, width: 260 }}>
              <OfflineCard />
            </div>

            {/* Right: DrinkCard — right edge at the offline card's left edge, bottom aligned */}
            <div className="absolute" style={{ right: 260, bottom: 50 }}>
              <DrinkCard size={130} />
            </div>

            {/* Centered primary content */}
            <div className="relative mx-auto" style={{ maxWidth: 520, paddingBottom: 48 }}>
              <div className="flex flex-col gap-[40px]">
                  <div className="flex flex-col gap-[24px] items-start">
                    <div className="flex flex-col gap-[4px] items-start w-full">
                      <p className="font-['Inter_Tight',sans-serif] text-foreground text-[length:var(--typography-display-title-smallest-font-size)] leading-[1.45]">
                        Hey, I'm Abby!
                      </p>
                      <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[length:var(--typography-body-default-font-size)] leading-[1.65]">
                        product designer / creative technologist
                      </p>
                    </div>
                    <div className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[length:var(--typography-body-default-font-size)]">
                      <p className="leading-[1.65] mb-[16px]">
                        The work I'm most proud of is at the intersection of design, technology, and human connection.
                        I love creating things to help people navigate and explore tools, products, and worlds.
                      </p>
                      <p className="leading-[1.65]">
                        My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with robotics.
                        I opened Figma to pitch our local hackathon for kids, which eventually led me to RIT and
                        some inspiring friends.
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ marginTop: stackPeek ? 0 : -76 }}
                    transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
                  >
                    <PhotoStack
                      images={[about1, about3, about4, about5]}
                      captions={[
                        "Lana & Me @ CC Meet (our team won!)",
                        "Charlotte, Miggi, Troy, Me & Lasya @ Figma x NMC",
                        "Angie, Me, Ivo, TJ, & Leah @ NYC",
                        "Cathy & Me @ Magic Studio",
                      ]}
                      peekVisible={stackPeek}
                    />
                  </motion.div>
                </div>
            </div>

          </div>
        </div>

        {/* Tablet md–xl */}
        <div className="hidden md:block xl:hidden">
          <div className="relative" style={{ minHeight: "calc(100vh - 140px)" }}>

            {/* Right: OfflineCard */}
            <div
              className="absolute"
              style={{ right: 0, top: 0, width: 190 }}
            >
              <OfflineCard />
            </div>

            {/* Right: DrinkCard */}
            <div
              className="absolute"
              style={{ right: 190, bottom: 50 }}
            >
              <DrinkCard size={95} />
            </div>


            {/* Centered primary content */}
            <div className="relative mx-auto" style={{ maxWidth: 520, paddingBottom: 48 }}>
              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[24px] items-start">
                  <div className="flex flex-col gap-[4px] items-start w-full">
                    <p className="font-['Inter_Tight',sans-serif] text-foreground text-[length:var(--typography-display-title-smallest-font-size)] leading-[1.45]">
                      Hey, I'm Abby!
                    </p>
                    <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[length:var(--typography-body-default-font-size)] leading-[1.65]">
                      product designer / creative technologist
                    </p>
                  </div>
                  <div className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[length:var(--typography-body-default-font-size)]">
                    <p className="leading-[1.65] mb-[16px]">
                      The work I'm most proud of is at the intersection of design, technology, and human connection.
                      I love creating things to help people navigate and explore tools, products, and worlds.
                    </p>
                    <p className="leading-[1.65]">
                      My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with robotics.
                      I opened Figma to pitch our local hackathon for kids, which eventually led me to RIT and
                      some inspiring friends.
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ marginTop: stackPeek ? 0 : -76 }}
                  transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
                >
                  <PhotoStack
                      images={[about1, about3, about4, about5]}
                      captions={[
                        "Lana & Me @ CC Meet (our team won!)",
                        "Charlotte, Miggi, Troy, Me & Lasya @ Figma x NMC",
                        "Angie, Me, Ivo, TJ, & Leah @ NYC",
                        "Cathy & Me @ Magic Studio",
                      ]}
                      peekVisible={stackPeek}
                    />
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-[40px] md:hidden pt-[20px] pb-[40px]">
          <div className="flex flex-col gap-[24px] items-start">
            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className="font-['Inter_Tight',sans-serif] text-foreground text-[length:var(--typography-display-title-smallest-font-size)] leading-[1.45]">
                Hey, I'm Abby!
              </p>
              <p className="font-['Inter_Tight',sans-serif] text-muted-foreground text-[length:var(--typography-body-default-font-size)] leading-[1.65]">
                product designer / creative technologist
              </p>
            </div>
            <div className="font-['Inter_Tight',sans-serif] font-regular text-foreground text-[length:var(--typography-body-default-font-size)]">
              <p className="leading-[1.65] mb-[16px]">
                The work I'm most proud of is at the intersection of design, technology, and human connection.
                I love creating things to help people navigate and explore tools, products, and worlds.
              </p>
              <p className="leading-[1.65]">
                My friend Lana and I found our thing in AP CompSci: me with mini GUI applets, her with robotics.
                I opened Figma to pitch our local hackathon for kids, which eventually led me to RIT and
                some inspiring friends.
              </p>
            </div>
          </div>
          <motion.div
            animate={{ marginTop: stackPeek ? 0 : -76 }}
            transition={{ duration: 0.5, ease: [0.33, 0, 0, 1] }}
          >
            <PhotoStack
              images={[about1, about3, about4, about5]}
              captions={[
                "Lana & Me @ CC Meet (our team won!)",
                "Charlotte, Miggi, Troy, Me & Lasya @ Figma x NMC",
                "Angie, Me, Ivo, TJ, & Leah @ NYC",
                "Cathy & Me @ Magic Studio",
              ]}
              peekVisible={stackPeek}
            />
          </motion.div>

          {/* Offline — split into 3 tap-to-cycle mini cards */}
          <div className="flex gap-[16px] animate-[fadeSlideIn_0.5s_ease-out_both]">
            <OfflineMiniCard category="heart" className="flex-1" />
            <OfflineMiniCard category="star" className="flex-1" />
            <OfflineMiniCard category="eye" className="flex-1" />
          </div>

          {/* Drink card + Playlist (2x drink card width) */}
          <MobileDrinkPlaylistRow />
        </div>
      </div>

      {/* ══ Section 2: Art Gallery ══ */}
      <div className="px-[16px] md:px-[2vw] pt-[2vh] pb-[14vh]">
        <ArtGallery />
      </div>
    </div>
  );
}
