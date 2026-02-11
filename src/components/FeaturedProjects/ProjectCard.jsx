import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  const { title, category, image, size, categoryColor } = project;

  return (
    <div className={`project-card project-card--${size}`}>
      <div className="project-card__image">
        <img src={image} alt={title} />
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
