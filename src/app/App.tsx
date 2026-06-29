import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/layout/CustomCursor';
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
        <RouterProvider router={router} />
      </DrinkProvider>
    </ThemeProvider>
  );
}
