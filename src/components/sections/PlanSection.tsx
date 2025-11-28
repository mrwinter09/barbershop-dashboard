/** @format */

import planOne from "../../assets/plan1.jpg";
import planTwo from "../../assets/plan2.jpg";
import planThree from "../../assets/plan3.jpg";
import planFour from "../../assets/plan4.jpg";
import planFive from "../../assets/plan5.jpg";

const PlanSection = () => {
  return (
    <div
      id="information"
      className="max-w-[1400px] m-auto py-16 px-4 grid lg:grid-cols-2 gap-4">
      {/*  */}
      <div className="grid grid-cols-2 grid-rows-6 h-[80vh]">
        <img
          className="row-span-3 object-cover w-full h-full p-2"
          src={planOne}
          alt="Interior barbershop 1"
          loading="lazy"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src={planTwo}
          alt="Interior barbershop 2"
          loading="lazy"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src={planThree}
          alt="Interior barbershop 3"
          loading="lazy"
        />
        <img
          className="row-span-3 object-cover w-full h-full p-2"
          src={planFour}
          alt="Interior barbershop 4"
          loading="lazy"
        />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          src={planFive}
          alt="Interior barbershop 5"
          loading="lazy"
        />
      </div>
      {/* Right Side */}
      <div className="flex flex-col h-full justify-center">
        <h3 className="text-5xl md:text-6xl font-bold">
          Plan Your Next Appointment
        </h3>
        <p className="text-2xl py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          nam?
        </p>
        <p className="pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          ullamcorper lectus vel orci feugiat posuere. Vestibulum mattis eros
          eget viverra elementum. Morbi quis dignissim lacus. Morbi sapien eros,
          fringilla efficitur.
        </p>
        <div>
          {" "}
          <button className="border-black mr-4 hover:shadow-md">
            Learn More
          </button>
          <button className="bg-black text-white hover:shadow-md">
            Book Your Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanSection;
