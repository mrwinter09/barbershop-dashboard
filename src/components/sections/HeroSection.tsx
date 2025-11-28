/** @format */

import hero from "../../assets/hero.jpg";

const Hero = () => {
  return (
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
          <h1 className="drop-shadow-2xl">Kami o Kiru Booking</h1>
          <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            volutpat mauris. Suspendisse lobortis elementum hendrerit. Donec vel
            interdum nunc.
          </p>
          <a href="/calender">
            <button className="text-black bg-white">Book Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
