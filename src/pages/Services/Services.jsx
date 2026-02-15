import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Services.scss";

function Services() {
  return (
    <div className="services-page">
      <Navbar />

      <main className="services">
        <section className="services__hero">
          <div className="container">
            <h1 className="services__title">Our Services</h1>
            <p className="services__subtitle">
              From intimate gatherings to grand celebrations, we bring your
              vision to life with creativity, precision, and heart. Every detail
              matters, and every event tells a story.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Services;
