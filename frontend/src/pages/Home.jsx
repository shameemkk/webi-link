import React from "react";
import Hero from "../components/Home/Hero";
import FeaturedEvents from "../components/Home/FeaturedEvents";
import Benefits from "../components/Home/Benefits";
import PricingCTA from "../components/Home/PricingCTA";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedEvents />
      <Benefits />
      <PricingCTA />
    </>
  );
};

export default Home;
