import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Form from './components/Form';
import Prime from './components/Prime';
import Submitted from './components/Submitted';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Form />,
  },
  {
    path: '/submitted',
    element: <Submitted />,
  },
  {
    path: '/:number',
    element: <Prime />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
