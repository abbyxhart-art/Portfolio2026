import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type MutableRefObject } from "react";
import { createBrowserRouter, useLocation, useOutlet } from "react-router";
import { motion, AnimatePresence, useIsPresent } from "@/lib/motion";
import Home from "./pages/Home";
import InteractiveWebpage from "./components/InteractiveWebpage";
import CasestudyFigmaRIT from "./pages/CasestudyFigmaRIT";
import CasestudyAixels from "./pages/CasestudyAixels";
import CasestudyTianAirlines from "./pages/CasestudyTianAirlines";
import CasestudyGentleMonster from "./pages/CasestudyGentleMonster";
import CasestudyFigmaKPop from "./pages/CasestudyFigmaKPop";
import CasestudyFragrantica from "./pages/CasestudyFragrantica";
import CasestudyTexasMobile from "./pages/CasestudyTexasMobile";
import CasestudyCapitol from "./pages/CasestudyCapitol";
import Booth from "./pages/Booth";
import About from "./pages/About";
import DrinkFloater from "./components/drinks/DrinkFloater";
import Footer from "./components/layout/Footer";
import MobileMainNav from "./components/layout/MobileMainNav";
import MainNavigation from "../imports/MainNavigation";

const BLUR_LAYERS = [
  { blur: 2,  mask: "linear-gradient(to bottom, black 0%,   transparent 25%)" },
  { blur: 4,  mask: "linear-gradient(to bottom, black 12%,  transparent 40%)" },
  { blur: 8,  mask: "linear-gradient(to bottom, black 25%,  transparent 60%)" },
  { blur: 12, mask: "linear-gradient(to bottom, black 40%,  transparent 80%)" },
];

const PAGE_FADE_EASE = [0.45, 0, 0.55, 1] as const;
// Total crossfade window. Opacity keyframes below carve this into a quick
// fade, a held blank moment, and a quick fade — rather than a linear ramp.
const PAGE_FADE_DURATION = 0.6;

const pageFadeVariants = {
  initial: { opacity: 0 },
  // Stay invisible until 70% through, then fade in fast over the last 30%.
  animate: {
    opacity: [0, 0, 1],
    transition: { duration: PAGE_FADE_DURATION, times: [0, 0.7, 1], ease: PAGE_FADE_EASE },
  },
  // Fade out fast over the first 30%, then hold invisible for the rest.
  exit: {
    opacity: [1, 0, 0],
    transition: { duration: PAGE_FADE_DURATION, times: [0, 0.3, 1], ease: PAGE_FADE_EASE },
  },
};

function PageFade({
  children,
  exitScrollY,
}: {
  children: ReactNode;
  exitScrollY: MutableRefObject<number>;
}) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      className="page-content"
      variants={pageFadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={
        isPresent
          ? undefined
          : {
              // Freeze the outgoing page exactly where the user left it while
              // it dissolves, so the incoming page can sit at the top underneath.
              position: "fixed",
              top: -exitScrollY.current,
              left: 0,
              right: 0,
              zIndex: 10,
              pointerEvents: "none",
            }
      }
    >
      {children}
    </motion.div>
  );
}

function RootLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  // Snapshot the scroll offset at the moment of navigation (before the
  // scroll-to-top below runs) so the exiting page can be pinned in place.
  const exitScrollY = useRef(0);
  const prevPathname = useRef(pathname);
  if (prevPathname.current !== pathname) {
    exitScrollY.current = window.scrollY;
    prevPathname.current = pathname;
  }

  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 1 }));
  }, [pathname]);

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // On the home page's first-ever visit, wait for the card entrance animation before showing the toggle.
  // On all other pages (or return visits), show immediately.
  const [navReady, setNavReady] = useState(pathname !== "/");

  useEffect(() => {
    if (navReady) return;
    const handler = () => setNavReady(true);
    document.addEventListener("home:nav:ready", handler);
    return () => document.removeEventListener("home:nav:ready", handler);
  }, [navReady]);

  return (
    <>
      {isDesktop && (
        <motion.div
          initial={false}
          animate={{
            opacity: navReady ? 1 : 0,
            y: navReady ? 0 : -16,
          }}
          transition={{
            opacity: { duration: 1.5, ease: [0.33, 0, 0, 1], delay: navReady ? 0.2 : 0 },
            y: { duration: 1.5, ease: [0.33, 0, 0, 1], delay: navReady ? 0.2 : 0 },
          }}
          className="hidden md:block fixed left-[32px] right-[32px] z-50"
          style={{ top: "16px" }}
        >
          <MainNavigation scrolledDown={scrolled} />
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        <PageFade key={pathname} exitScrollY={exitScrollY}>
          {outlet}
          <Footer />
        </PageFade>
      </AnimatePresence>
      {isDesktop && (
        <div
          className="flex fixed inset-x-0 top-0 pointer-events-none"
          style={{ height: "100px", zIndex: 45 }}
        >
          {BLUR_LAYERS.map(({ blur, mask }, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(var(--color-background-fade),0.85) 0%, rgba(var(--color-background-fade),0.4) 50%, transparent 100%)",
            }}
          />
        </div>
      )}
      <DrinkFloater />
      <MobileMainNav />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/project",
        Component: InteractiveWebpage,
      },
      {
        path: "/casestudy/figma-rit",
        Component: CasestudyFigmaRIT,
      },
      {
        path: "/casestudy/aixels",
        Component: CasestudyAixels,
      },
      {
        path: "/casestudy/tian-airlines",
        Component: CasestudyTianAirlines,
      },
      {
        path: "/casestudy/gentle-monster",
        Component: CasestudyGentleMonster,
      },
      {
        path: "/casestudy/fragrantica",
        Component: CasestudyFragrantica,
      },
      {
        path: "/casestudy/figma-kpop",
        Component: CasestudyFigmaKPop,
      },
      {
        path: "/casestudy/texas-mobile",
        Component: CasestudyTexasMobile,
      },
      {
        path: "/casestudy/capitol-aluminum",
        Component: CasestudyCapitol,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/lab",
        Component: Booth,
      },
    ],
  },
]);