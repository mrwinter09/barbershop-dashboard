/** @format */

import HeroSection from "../components/sections/HeroSection";
import ImageSliderSection from "../components/sections/ImageSliderSection";
import OffersSection from "../components/sections/OffersSection";
import PlanSection from "../components/sections/PlanSection";
import ShopSection from "../components/sections/ShopSection";
import "../styles/global.css";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <OffersSection />
      <PlanSection />
      <ShopSection />
      <ImageSliderSection />
    </>
  );
}
