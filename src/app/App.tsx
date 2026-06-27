import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/layout/CustomCursor';
import ThemeToggle from './components/layout/ThemeToggle';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <ThemeProvider>
      <DrinkProvider>
        <CustomCursor />
        <div className="hidden md:flex fixed top-[15px] right-[calc(4.5vw+16px)] z-[100] items-center">
          <ThemeToggle />
        </div>
        <RouterProvider router={router} />
      </DrinkProvider>
    </ThemeProvider>
  );
}
