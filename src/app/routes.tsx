import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home";
import InteractiveWebpage from "./components/InteractiveWebpage";
import CasestudyFigmaRIT from "./pages/CasestudyFigmaRIT";
import CasestudyAixels from "./pages/CasestudyAixels";
import CasestudyTianAirlines from "./pages/CasestudyTianAirlines";
import CasestudyGentleMonster from "./pages/CasestudyGentleMonster";
import CasestudyFigmaKPop from "./pages/CasestudyFigmaKPop";
import CasestudyFragrantica from "./pages/CasestudyFragrantica";
import CasestudyTexasMobile from "./pages/CasestudyTexasMobile";
import Booth from "./pages/Booth";
import About from "./pages/About";
import DrinkFloater from "./components/DrinkFloater";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

const BLUR_LAYERS = [
  { blur: 2,  mask: "linear-gradient(to bottom, black 0%,   transparent 25%)" },
  { blur: 4,  mask: "linear-gradient(to bottom, black 12%,  transparent 40%)" },
  { blur: 8,  mask: "linear-gradient(to bottom, black 25%,  transparent 60%)" },
  { blur: 12, mask: "linear-gradient(to bottom, black 40%,  transparent 80%)" },
];

function RootLayout() {
  return (
    <>
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