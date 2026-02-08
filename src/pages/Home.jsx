import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedWork from "../components/FeaturedProjects/FeaturedWork";
import Services from "../components/Services/Services";
import Cta from "../components/Cta/Cta";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <Cta />
    </div>
  );
};

export default Home;
