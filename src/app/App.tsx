import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DrinkProvider } from './context/DrinkContext';
import CustomCursor from './components/layout/CustomCursor';

export default function App() {
  return (
    <DrinkProvider>
      <CustomCursor />
      <RouterProvider router={router} />
    </DrinkProvider>
  );
}
