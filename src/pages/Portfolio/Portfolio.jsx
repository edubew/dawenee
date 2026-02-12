import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { portfolioProjects } from "../../data/portfolioData";
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
            <div className="portfolio__projects">
              {portfolioProjects.map((project) => (
                <article key={project.id} className="portfolio__card">
                  <div className="portfolio__card-image-wrapper">
                    <img
                      src={project.media}
                      alt={project.title}
                      className="portfolio__card-image"
                    />
                  </div>

                  <div className="portfolio__card-content">
                    <h3 className="portfolio__card-title">{project.title}</h3>
                    <p className="portfolio__card-event-type">
                      {project.eventType}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Portfolio;
