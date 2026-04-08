import { createBrowserRouter, Outlet } from "react-router";
import Home from "./pages/Home";
import InteractiveWebpage from "./components/InteractiveWebpage";
import CasestudyFigmaRIT from "./pages/CasestudyFigmaRIT";
import CasestudyAixels from "./pages/CasestudyAixels";
import CasestudyTianAirlines from "./pages/CasestudyTianAirlines";
import CasestudyGentleMonster from "./pages/CasestudyGentleMonster";
import Booth from "./pages/Booth";
import About from "./pages/About";
import { useDrink } from "./context/DrinkContext";
import DrinkFloater from "./components/DrinkFloater";
import ContactLink from "./components/ContactLink";
import Footer from "./components/Footer";

function RootLayout() {
  const { selectedDrink } = useDrink();

  return (
    <>
      <Outlet />
      <Footer />
      <ContactLink />
      {selectedDrink && <DrinkFloater drinkType={selectedDrink} />}
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