import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { motion } from "@/lib/motion";
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
import MobileBottomNav from "./components/layout/MobileBottomNav";
import ThemeToggle from "./components/layout/ThemeToggle";

const BLUR_LAYERS = [
  { blur: 2,  mask: "linear-gradient(to bottom, black 0%,   transparent 25%)" },
  { blur: 4,  mask: "linear-gradient(to bottom, black 12%,  transparent 40%)" },
  { blur: 8,  mask: "linear-gradient(to bottom, black 25%,  transparent 60%)" },
  { blur: 12, mask: "linear-gradient(to bottom, black 40%,  transparent 80%)" },
];

function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.dispatchEvent(new CustomEvent("cursor:scale", { detail: 1 }));
  }, [pathname]);

  const isCasestudy = pathname.startsWith("/casestudy/");

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
      <motion.div
        className="hidden md:flex fixed top-[15px] z-[100] items-center"
        style={{ right: isCasestudy ? "16px" : "calc(4.5vw + 16px)" }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: navReady ? 1 : 0, y: navReady ? 0 : -16 }}
        transition={{ duration: 1.6, ease: [0.33, 0, 0, 1], delay: navReady ? 0.1 : 0 }}
      >
        <ThemeToggle />
      </motion.div>
      <div className="pb-[110px] md:pb-0">
        <Outlet />
        <Footer />
      </div>
      {/* Progressive blur under top nav — desktop only */}
      <div
        className="hidden md:flex fixed inset-x-0 top-0 pointer-events-none"
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
      <DrinkFloater />
      <MobileBottomNav />
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
    ],
  },
  {
    path: "/booth",
    element: (
      <>
        <Booth />
        <DrinkFloater />
      </>
    ),
  },
]);