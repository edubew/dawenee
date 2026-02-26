import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  const { title, eventType, image, guestCount, priceRange } = project;

  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        <img src={image} alt={title} className="project-card__image" />
        <div className="project-card__overlay">
          <span className="project-card__event-type">{eventType}</span>
        </div>
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <div className="project-card__details">
          <span className="project-card__guests">
            {guestCount} {guestCount === 1 ? "guest" : "guests"}
          </span>
          <span className="project-card__divider">•</span>
          <span className="project-card__price">{priceRange}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
