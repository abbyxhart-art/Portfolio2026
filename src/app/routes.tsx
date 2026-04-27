import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home";
import InteractiveWebpage from "./components/InteractiveWebpage";
import CasestudyFigmaRIT from "./pages/CasestudyFigmaRIT";
import CasestudyAixels from "./pages/CasestudyAixels";
import CasestudyTianAirlines from "./pages/CasestudyTianAirlines";
import CasestudyGentleMonster from "./pages/CasestudyGentleMonster";
import Booth from "./pages/Booth";
import About from "./pages/About";
import DrinkFloater from "./components/DrinkFloater";
import Footer from "./components/Footer";

function RootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
      <DrinkFloater drinkType="lychee" />
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
        path: "/booth",
        Component: Booth,
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
]);