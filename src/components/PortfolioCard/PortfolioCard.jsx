import React from "react";
import { broadCategories } from "../../data/portfolioData";
import "./PortfolioCard.scss";

function PortfolioCard({ project }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-card__image-wrapper">
        <img
          src={project.media}
          alt={project.title}
          className="portfolio-card__image"
        />

        {/* Hover Overlay */}
        <div className="portfolio-card__overlay">
          <div className="portfolio-card__overlay-content">
            <span className="portfolio-card__guest-count">
              {project.guestCount}{" "}
              {project.guestCount === 1 ? "Guest" : "Guests"}
            </span>
            <p className="portfolio-card__description">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="portfolio-card__content">
        <h3 className="portfolio-card__title">{project.title}</h3>
        <p className="portfolio-card__event-type">
          {broadCategories.find((cat) => cat.id === project.broadCategory)
            ?.label || project.eventType}
        </p>

        <div className="portfolio-card__tags">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="portfolio-card__tag">
              {tag.replace(/-/g, "")}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="portfolio-card__tag portfolio-card__tag--more">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
