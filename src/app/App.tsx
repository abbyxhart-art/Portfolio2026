import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <CursorProvider>
      <DrinkProvider>
        <CustomCursor />
        <RouterProvider router={router} />
      </DrinkProvider>
    </CursorProvider>
  );
}