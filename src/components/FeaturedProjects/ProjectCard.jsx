import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ project }) {
  const { title, eventType, image, alt, location, style, } = project;

  return (
    <article className="work-card">
      <img src={image} alt={alt || title} loading="lazy"/>
      <span className="work-card__tag">{eventType}</span>
      <div className="work-card__caption">
        <div className="work-card__caption-title">{title}</div>

        {(location || style) && (
          <div className="work-card__caption-meta">
            {[location, style]
              .filter(Boolean)
            .join(".")}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
