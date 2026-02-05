import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedWork from "../components/FeaturedProjects/FeaturedWork";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedWork />
    </div>
  );
};

export default Home;
