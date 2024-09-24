import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout";
import Users from './pages/users';
import Ebooks from './pages/ebooks';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: 'ups',

    children: [
      { index: true, element: <Home /> },
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
