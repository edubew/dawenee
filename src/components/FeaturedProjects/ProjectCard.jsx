import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  const { title, eventType, image, alt } = project;

  return (
    <div className="work-card">
      <img src={image} alt={alt || title} />
      <span className="work-card__tag">{eventType}</span>
      <div className="work-card__caption">
        <div className="work-card__caption-title">{title}</div>
      </div>
    </div>
  );
}

export default ProjectCard;
