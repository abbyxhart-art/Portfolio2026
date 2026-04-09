import { createContext, useContext, useState, ReactNode } from 'react';

type CursorContextType = {
  hoveredProject: number | null;
  setHoveredProject: (project: number | null) => void;
  isPurple: boolean;
  setIsPurple: (value: boolean) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isPurple, setIsPurple] = useState(false);

  return (
    <CursorContext.Provider value={{ hoveredProject, setHoveredProject, isPurple, setIsPurple }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
