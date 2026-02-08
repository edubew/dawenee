import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedWork from "../components/FeaturedProjects/FeaturedWork";
import Services from "../components/Services/Services";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Services />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
