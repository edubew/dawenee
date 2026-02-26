import React from "react";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects";
import "./FeaturedWork.scss";

function FeaturedWork() {
  return (
    <section className="featured-work" id="featured-work">
      <div className="container">
        <h2 className="featured-work__title">Featured Projects</h2>

        <div className="featured-work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
