/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

export default function NavBar() {
  const [menu, setMenu] = useState(false);

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
      <Link to="/">
        <h1 style={{ color: "white" }} className="text-2xl z-20">
          髪を切る
        </h1>
      </Link>

      <HiMenuAlt3
        style={{ color: "white" }}
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
            <Link to="/appointments">Appointments</Link>
          </li>

          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <Link to="/users">Clients</Link>
          </li>

          <li className="font-bold text-3xl p-8" onClick={closeNav}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
