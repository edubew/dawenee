import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { categories, portfolioProjects } from "../../data/portfolioData";
import "./Portfolio.scss";

function Portfolio() {
  // Track active filter category
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory,
        );

  // Handle category filter click
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

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

        <section className="portfolio__filters">
          <div className="container">
            <div className="portfolio__filter-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`portfolio__filter-btn ${
                    activeCategory === category.id
                      ? "portfoli__filter-btn--active"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.label}
                  <span className="portfolio__filter-count">
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio__grid">
          <div className="container">
            {/* Show filtered projects */}
            {filteredProjects.length === 0 ? (
              <p className="portfolio__empty">
                No projects found in this category.
              </p>
            ) : (
              <div className="portfolio__projects">
                {filteredProjects.map((project) => (
                  <article key={project.id} className="portfolio__card">
                    <div className="portfolio__card-image-wrapper">
                      <img
                        src={project.media}
                        alt={project.title}
                        className="portfolio__card-image"
                      />
                    </div>

                    <div className="portfolio__card-overlay">
                      <div className="portfolio__card-overlay-content">
                        <span className="portfolio__card-guest-count">
                          {project.guestCount}{" "}
                          {project.guestCount === 1 ? "Guest" : "Guests"}
                        </span>
                        <p className="portfolio__card-description">{project.description}</p>
                      </div>
                    </div>

                    <div className="portfolio__card-content">
                      <h3 className="portfolio__card-title">{project.title}</h3>
                      <p className="portfolio__card-event-type">
                        {categories.find(cat => cat.id ===project.category) ?.label || project.eventType}
                      </p>

                      <div className="portfolio__card-tags">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="portfolio__card-tag">
                            {tag.replace(/-/g, '')}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="portfolio__card-tag portfolio__card-tag--more">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Portfolio;
