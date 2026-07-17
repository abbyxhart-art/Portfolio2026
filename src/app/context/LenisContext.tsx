import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.12 });
    setLenis(instance);
    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => instance.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

// Components that need to pause/resume smooth scroll (e.g. an open bottom
// sheet) call lenis.stop()/lenis.start() on the returned instance — CSS
// overflow:hidden alone doesn't block scroll since Lenis drives it manually.
export function useLenis() {
  return useContext(LenisContext);
}
