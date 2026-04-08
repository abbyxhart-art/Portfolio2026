import { createContext, useContext, useState, ReactNode } from 'react';

type DrinkType = 'mango' | 'matcha' | 'lychee' | 'sesame' | null;

interface DrinkContextType {
  selectedDrink: DrinkType;
  setSelectedDrink: (drink: DrinkType) => void;
}

const DrinkContext = createContext<DrinkContextType | undefined>(undefined);

export function DrinkProvider({ children }: { children: ReactNode }) {
  const [selectedDrink, setSelectedDrink] = useState<DrinkType>(null);

  return (
    <DrinkContext.Provider value={{ selectedDrink, setSelectedDrink }}>
      {children}
    </DrinkContext.Provider>
  );
}

export function useDrink() {
  const context = useContext(DrinkContext);
  if (context === undefined) {
    throw new Error('useDrink must be used within a DrinkProvider');
  }
  return context;
}
