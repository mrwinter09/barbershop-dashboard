/** @format */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShellLayout from "./components/layout/AppShellLayout";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppShellLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: <App />,
        },
        {
          path: "/about",
          element: <App />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
