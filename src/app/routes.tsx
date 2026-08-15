import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type MutableRefObject } from "react";
import { createBrowserRouter, useLocation, useOutlet } from "react-router";
import { motion, AnimatePresence, useIsPresent } from "@/lib/motion";
import Home from "./pages/Home";
import InteractiveWebpage from "./components/InteractiveWebpage";
import CasestudyFigmaRIT from "./pages/CasestudyFigmaRIT";
import CasestudyAixels from "./pages/CasestudyAixels";
import CasestudyGentleMonster from "./pages/CasestudyGentleMonster";
import CasestudyFragrantica from "./pages/CasestudyFragrantica";
import CasestudyTexasMobile from "./pages/CasestudyTexasMobile";
import CasestudyCapitol from "./pages/CasestudyCapitol";
import Booth from "./pages/Booth";
import About from "./pages/About";
import DrinkFloater from "./components/drinks/DrinkFloater";
import Footer from "./components/layout/Footer";
import MobileMainNav from "./components/layout/MobileMainNav";
import MainNavigation from "../imports/MainNavigation";
import { NAV_TOP_REST, NAV_TOP_SCROLLED } from "./navPosition";

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

  // On the home page's first-ever visit, wait for the hero headline's icon
  // to start expanding before showing the nav at all — it appears as a ball
  // and morphs into the full pill (MainNavigation's `ballExpand`) in
  // lockstep with that same expand. On all other pages (or return visits),
  // show immediately, already expanded. Nav itself never moves — only the
  // hero text/card (Home.tsx) get lowered-then-risen.
  const [navReady, setNavReady] = useState(pathname !== "/");

  useEffect(() => {
    if (navReady) return;
    const handler = () => setNavReady(true);
    document.addEventListener("home:nav:expand", handler);
    return () => document.removeEventListener("home:nav:expand", handler);
  }, [navReady]);

  return (
    <>
      {isDesktop && (
        <motion.div
          initial={false}
          animate={{
            opacity: navReady ? 1 : 0,
            top: scrolled ? NAV_TOP_SCROLLED : NAV_TOP_REST,
          }}
          transition={{
            // Pops visible fast right as the ball starts expanding — the
            // pill morph itself (below) is what actually takes the visible
            // time, not this fade.
            opacity: { duration: 0.15, ease: [0.5, 0, 0.5, 1] },
            top: { duration: 0.4, ease: [0.33, 0, 0, 1] },
          }}
          className="hidden md:block fixed left-[32px] right-[32px] z-50"
        >
          <MainNavigation ballExpand={navReady} />
        </motion.div>
      )}
      <AnimatePresence initial={false}>
        <PageFade key={pathname} exitScrollY={exitScrollY}>
          {outlet}
          {/* Extra scroll distance required before the footer reveal
              triggers — Footer itself is `position: fixed` and doesn't
              occupy flow space, so this is the only thing standing between
              the page's real content and the bottom-of-document check. */}
          <div aria-hidden="true" style={{ height: "40vh" }} />
          <Footer />
        </PageFade>
      </AnimatePresence>
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
        path: "/casestudy/gentle-monster",
        Component: CasestudyGentleMonster,
      },
      {
        path: "/casestudy/fragrantica",
        Component: CasestudyFragrantica,
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