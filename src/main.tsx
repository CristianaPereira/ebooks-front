'use client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout";
import Users from './pages/users';
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
        path: "users",
        element: <Users />,
      },
      {
        path: "ebooks",
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
