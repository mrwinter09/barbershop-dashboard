/** @format */

import shopOne from "../../assets/shop1.jpg";
import shopTwo from "../../assets/shop2.jpg";
import shopThree from "../../assets/shop3.jpeg";

const ShopSection = () => {
  return (
    <div
      id="location"
      className="max-w-[1400px] h-[500px] bg-blue-100 mx-auto my-20 pt-16 lg:mb-[20%] md:mb-[35%] sm:mb-[35%] px-4 grid lg:grid-cols-3 gap-4">
      <div className="lg:top-20 relative lg:col-span-1 col-span-2">
        {" "}
        <h3 className="text-2xl font-bold">Fine Interior BarberShops</h3>
        <p className="pt-4">
          freestar Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ullamcorper lectus vel orci feugiat posuere. Vestibulum
          mattis eros eget viverra elementum. Morbi quis dignissim lacus. Morbi
          sapien eros, fringilla efficitur.
        </p>
      </div>
      <div className="grid grid-cols-2 col-span-2 h-[40vh]">
        <img className="object-cover w-full h-full p-2" alt="/" src={shopOne} />
        <img
          className="row-span-2 object-cover w-full h-full p-2"
          alt="/"
          src={shopTwo}
        />
        <img
          className="object-cover w-full h-full p-2"
          alt="/"
          src={shopThree}
        />
      </div>
    </div>
  );
};

export default ShopSection;
