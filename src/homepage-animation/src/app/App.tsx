import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

// MARKER-MAKE-KIT-INVOKED

const FULL_WIDTH = 1100;
const HALF_WIDTH = 520;
const PANEL_HEIGHT = 363;

export default function App() {
  const [unfold, setUnfold] = useState(false);
  const [barStarted, setBarStarted] = useState(false);
  const widthControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    async function run() {
      await new Promise((r) => setTimeout(r, 500));

      // Fade out photo + description as bar begins
      setBarStarted(true);

      // Phase 1 — bar grows to half width
      await widthControls.start({
        width: HALF_WIDTH,
        transition: { duration: 1.8, ease: [0.4, 0, 0.2, 1] },
      });

      // Fade "loading..." text
      textControls.start({ opacity: 0, transition: { duration: 0.3 } });
      await new Promise((r) => setTimeout(r, 350));

      // Phase 2 — unfold + continue widening simultaneously
      setUnfold(true);
      widthControls.start({
        width: FULL_WIDTH,
        transition: { duration: 1.7, ease: [0.25, 0.46, 0.45, 0.94] },
      });
    }

    run();
  }, []);

  return (
    <div className="size-full bg-[#161617] overflow-hidden relative flex flex-col items-center">
      {/* Purple gradient */}
      <div className="absolute top-0 left-0 right-0 h-[410px] opacity-50 bg-gradient-to-b from-[#afa4d8] to-[rgba(22,22,23,0.2)]" />

      {/* Photo */}
      <motion.div
        animate={{ opacity: barStarted ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-[218px] size-[40px] shrink-0 z-10"
      >
        <svg className="block size-full" fill="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="#D9D9D9" r="20" />
        </svg>
      </motion.div>

      {/* Description */}
      <motion.p
        animate={{ opacity: barStarted ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mt-[24px] font-['Inter_Tight',sans-serif] font-normal text-[24px] text-center text-white w-[344px] leading-none whitespace-pre-wrap"
      >
        {`abby hart is a product designer and  creative technologist`}
      </motion.p>

      {/* Bar + Panel — width container wraps both */}
      <motion.div
        animate={widthControls}
        initial={{ width: 0 }}
        className="relative z-10 mt-[57px] overflow-visible"
        style={{ flexShrink: 0 }}
      >
        {/* The hinge bar — always visible, 3px tall */}
        <div style={{ height: 3, backgroundColor: "#d9d9d9", width: "100%" }} />

        {/*
          Perspective wrapper is a direct parent of the rotating panel.
          perspectiveOrigin "50% 0%" puts the vanishing point at the hinge line
          so the panel swings toward the viewer like a laptop screen opening.
        */}
        <div
          style={{
            width: "100%",
            perspective: "900px",
            perspectiveOrigin: "50% 0%",
            overflow: "visible",
          }}
        >
          {/*
            Panel is rendered from the start at rotateX(-90deg) — edge-on,
            invisible. When `unfold` becomes true, it animates to 0deg.
            No height animation: perspective foreshortening does the visual
            work of making it appear to grow as it rotates toward the viewer.
          */}
          <motion.div
            animate={{ rotateX: unfold ? 0 : -90 }}
            initial={{ rotateX: -90 }}
            transition={{
              duration: 1.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              height: PANEL_HEIGHT,
              backgroundColor: "#d9d9d9",
              width: "100%",
              transformOrigin: "top center",
            }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        animate={textControls}
        initial={{ opacity: 1 }}
        className="relative z-10 mt-[30px] font-['Inter_Tight',sans-serif] font-normal text-[14px] text-center text-white"
      >
        loading...
      </motion.p>
    </div>
  );
}
