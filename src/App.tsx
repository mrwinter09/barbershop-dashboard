/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShellLayout from "./components/layout/AppShellLayout";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import AboutPage from "./pages/AboutPage";
import SubmitPage from "./pages/SubmitPage";
import RecommendPage from "./pages/RecommendPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <AppShellLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/stories", element: <StoriesPage /> },
      { path: "/stories/:id", element: <StoryDetailPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/submit", element: <SubmitPage /> },
      { path: "/recommend", element: <RecommendPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
