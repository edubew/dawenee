import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedWork from "../../components/FeaturedProjects/FeaturedWork";
import ProcessAndServices from "../../components/Services/ProcessAndServices";
import Testimonials from "../../components/Testimonials/Testimonials";
import Cta from "../../components/Footer/Cta";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <ProcessAndServices />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
}

export default Home;
