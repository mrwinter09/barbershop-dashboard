/** @format */
import hero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      {/* <NavBar /> */}
      <div className="w-full h-screen">
        <img
          className="top-0 left-0 w-full h-screen object-cover"
          alt="/"
          src={hero}
        />
        <div className="absolute top-0 left-0 w-full h-screen bg-black/30" />
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center text-white">
          <div className="md:left-[10%] max-w-[1100px] m-auto absolute p-4">
            <p>Your Ultimate Barber Booking Solution</p>
            <h1 className="drop-shadow-2xl">404 Page Not Found</h1>
            <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl"></p>
            <a href="/calender">
              <Link to={"/"}>
                <button className="text-black bg-white">Go back Home</button>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
