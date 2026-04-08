import { createContext, useContext, useState, ReactNode } from 'react';

type CursorContextType = {
  hoveredProject: number | null;
  setHoveredProject: (project: number | null) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <CursorContext.Provider value={{ hoveredProject, setHoveredProject }}>
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
