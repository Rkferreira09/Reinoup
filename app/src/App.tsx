import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastHost } from './components/ui/ToastHost';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastHost />
    </>
  );
}

export default App;
