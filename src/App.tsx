/** @format */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShellLayout from "./components/layout/AppShellLayout";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AboutPage from "./pages/AbountPage";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
  {
    element: <AppShellLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
