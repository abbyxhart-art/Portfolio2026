import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import { ThemeProvider } from './context/ThemeContext';
import { LenisProvider } from './context/LenisContext';

export default function App() {
  return (
    <ThemeProvider>
      <DrinkProvider>
        <LenisProvider>
          <RouterProvider router={router} />
        </LenisProvider>
      </DrinkProvider>
    </ThemeProvider>
  );
}
