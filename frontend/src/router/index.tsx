import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProducts from '../components/AllProducts';
import GetSingleProduct from '../components/GetSingleProduct';
import CreateProductPage from '../components/CreateProductPage';
import UpdateAProduct from '../components/UpdateAProduct';
import ShoppingCartPage from '../components/ShoppingCartPage';
import FavoritesPage from '../components/FavoritesPage';
import GetSingleTransaction from '../components/GetSingleTransaction';
import PurchasedPage from '../components/PurchasedPage';

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
      {
        path: '/shoppingcart',
        element: <ShoppingCartPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,

        path: '/singletransaction/:id',
        element: <GetSingleTransaction />,
      },
      {
        path: '/purchased',
        element: <PurchasedPage />,
      },
    ],
  },
]);
