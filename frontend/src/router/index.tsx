import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProducts from '../components/AllProducts';
import GetSingleProduct from '../components/GetSingleProduct';
import CreateProductPage from '../components/CreateProductPage';
import UpdateAProduct from '../components/UpdateAProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/:id",
        element: <GetSingleProduct />,
      },
      {
        path: "/products/create",
        element: <CreateProductPage />,
      },
      {
        path: '/products/:id/update',
        element: <UpdateAProduct />,
      },
    ],
  },
]);
