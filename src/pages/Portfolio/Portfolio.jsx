import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import { broadCategories, portfolioProjects } from "../../data/portfolioData";
import "./Portfolio.scss";

function Portfolio() {
  // Track active filter category
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.broadCategory === activeCategory,
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
              {broadCategories.map((category) => (
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
                  <PortfolioCard key={project.id} project={project} />
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
