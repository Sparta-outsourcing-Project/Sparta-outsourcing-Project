import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import List from '../pages/List';
import Error from '../pages/Error';
import Detail from '../components/detail/Detail';
import MyPage from '../pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/list/:keyword',
    element: <List />
  },
  {
    path: '/list/:keyword/:id',
    element: <Detail />
  },
  {
    path: '/mypage',
    element: <MyPage />
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
