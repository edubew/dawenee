import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedWork from "../../components/FeaturedProjects/FeaturedWork";
import ProcessAndServices from "../../components/Services/ProcessAndServices";
import Testimonials from "../../components/Testimonials/Testimonials";
import Cta from "../../components/Footer/Cta";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";
import WhyDawenee from "../../components/Why/WhyDawenee";
import Faq from "../../components/Faq/Faq";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <FeaturedWork />
      <ProcessAndServices />
      <WhyDawenee />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </div>
  );
}

export default Home;
