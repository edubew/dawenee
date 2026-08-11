import React from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import projects from "../../data/projects";
import { EucalyptusBranch } from "../Botanicals/Botanicals";
import "./FeaturedWork.scss";

function FeaturedWork() {
  return (
    <section className="work" id="featured-work">
      <EucalyptusBranch
        className="work__botanical"
        style={{
          position: "absolute",
          bottom: "-2rem",
          right: "-1.5rem",
          width: "260px",
          transform: "rotate(30deg)",
        }}
        opacity={0.13}
      />

      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">Portfolio</span>
          <h2 className="section-header__title">
            Recent moments, <em>real clients</em>
          </h2>
          <p className="section-header__subtitle">
            A look at the celebrations we've styled across Nairobi — from
            intimate picnics to full-room transformations.
          </p>
        </div>

        <div className="work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="work__cta">
          <Link
            to="https://instagram.com/daweneedecor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--text"
          >
            See more on Instagram →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
