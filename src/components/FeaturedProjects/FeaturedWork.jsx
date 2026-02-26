import React from "react";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects";
import "./FeaturedWork.scss";
import { Link } from "react-router-dom";

function FeaturedWork() {
  return (
    <section className="featured-work" id="featured-work">
      <div className="container">
        <div className="featured-work__header">
          <h2 className="featured-work__title">Recent Events We've Styled</h2>
          <p className="featured-work__subtitle">
            Real celebrations, real clients, real results
          </p>
        </div>

        <div className="featured-work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="featured-work__cta">
          <Link
            to="https://instagram.com/daweneedecor"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-work__button"
          >
            See More on TikTok →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
