import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  const { id, title, category, image, size, categoryColor } = project;

  return (
    <div className={`project-card project-card--${size}`}>
      <div className="project-card__image">
        <div className="project-card__placeholder">
          <span className="project-card__placeholder-text">{category}</span>
        </div>
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <span
          className={`project-card__category project-card__category--${categoryColor}`}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

export default ProjectCard;
