import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import { ThemeProvider } from './context/ThemeContext';
import { LenisProvider } from './context/LenisContext';
import CustomCursor from './components/layout/CustomCursor';

export default function App() {
  return (
    <ThemeProvider>
      <DrinkProvider>
        <LenisProvider>
          <CustomCursor />
          <RouterProvider router={router} />
        </LenisProvider>
      </DrinkProvider>
    </ThemeProvider>
  );
}
