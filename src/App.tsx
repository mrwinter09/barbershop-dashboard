/** @format */

import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import TourPage from "./pages/TourPage";
import PressPage from "./pages/PressPage";
import BookingPage from "./pages/BookingPage";
import ExperiencePage from "./pages/ExperiencePage";
import NotFoundPage from "./pages/NotFoundPage";

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/video", element: <VideoPage /> },
      { path: "/tour", element: <TourPage /> },
      { path: "/press", element: <PressPage /> },
      { path: "/booking", element: <BookingPage /> },
      { path: "/experience", element: <ExperiencePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
