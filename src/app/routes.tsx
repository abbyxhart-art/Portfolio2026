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

function RootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
      <DrinkFloater />
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