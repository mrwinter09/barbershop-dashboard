/** @format */

import Hero from "../components/sections/HeroSection";
import ImageSlider from "../components/sections/ImageSliderSection";
import Offers from "../components/sections/OffersSection";
import Plan from "../components/sections/PlanSection";
import Shops from "../components/sections/ShopSection";
import "../styles/global.css";

function LandingPage() {
  return (
    <>
      <Hero />
      <Offers />
      <Plan />
      <Shops />
      <ImageSlider />
    </>
  );
}

export default LandingPage;
