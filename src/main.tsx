'use client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter, 
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout";
import UsersList from './pages/users/list';
import UserDetails from './pages/users/details';
import Register from './pages/users/register';
import Ebooks from './pages/ebooks';
import Home from './pages/home';
import Login from './pages/session/login';
import paths from './routes/paths';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: 'ups',

    children: [
      { index: true, element: <Home /> },
      {
        path: paths.LOGIN,
        element: <Login />,
      },
      {
        path: paths.REGISTER,
        element: <Register />,
      },
      {
        path: paths.USERS_PARAMS,
        element: <UserDetails />,
      },
      {
        path: paths.USERS,
        element: <UsersList />,
      },
      {
        path: paths.EBOOKS,
        element: <Ebooks />,
      }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
