/** @format */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

export const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  const isCalendar = location.pathname === "/calendar";

  const logoColor = isCalendar ? "black" : "white";
  const menuColor = isCalendar ? "black" : "white";

  const handleNav = () => {
    setMenu((prev) => !prev);
    document.body.style.overflow = !menu ? "hidden" : "scroll";
  };

  const closeNav = () => {
    setMenu(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <div className="absolute w-full flex justify-between p-4 items-center z-30">
      <h1 style={{ color: logoColor }} className="text-2xl z-20">
        髪を切る
      </h1>

      <HiMenuAlt3
        style={{ color: menuColor }}
        onClick={handleNav}
        className="z-20 cursor-pointer"
        size={25}
      />

      <div
        className={
          menu
            ? "fixed text-gray-300 left-0 top-0 w-full h-full bg-black/90 px-4 py-7 flex-col z-10 duration-300"
            : "fixed text-gray-300 left-[-100%] top-0 w-full h-full bg-black/90 px-4 py-7 flex-col z-10 duration-300"
        }>
        <ul className="flex flex-col w-full h-full items-center justify-center cursor-pointer">
          {/* Home: route to landing page root */}
          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <Link to="/">Home</Link>
          </li>

          {/* These can stay anchors for now – simple and works */}
          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <a href="/#information">Information</a>
          </li>

          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <a href="/#location">Location</a>
          </li>

          {/* Reservation: real route to /calendar */}
          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <Link to="/calendar">Reservation</Link>
          </li>

          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <a href="/#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
