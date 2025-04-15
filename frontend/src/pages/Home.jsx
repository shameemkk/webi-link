import React from "react";
import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import Benefits from "../components/Benefits";
import PricingCTA from "../components/PricingCTA";

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
