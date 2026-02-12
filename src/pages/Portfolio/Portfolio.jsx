import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Portfolio.scss";

function Portfolio() {
  return (
    <div className="portfolio-page">
      <Navbar />

      <main className="portfolio">
        <section className="portfolio__hero">
          <div className="container">
            <h1 className="portfolio__title">Our Work</h1>
            <p className="portfolio__subtitle">
              Every event tells a story. These are just a few of the
              celebrations we've had the honor of bringing to life.
            </p>
          </div>
        </section>

        <section className="portfolio__grid">
          <div className="container">
            <p
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "#8a7e7a",
              }}
            >
              Projects coming soon...
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Portfolio;
