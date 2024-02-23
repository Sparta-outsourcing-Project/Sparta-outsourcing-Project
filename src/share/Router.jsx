import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import List from '../pages/List';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/list',
    element: <List />
  },
  {
    path: '*',
    element: <Navigate replace to="/" />
  }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
