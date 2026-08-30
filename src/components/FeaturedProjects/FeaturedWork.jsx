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
          <span className="section-header__eyebrow">Our Work</span>
          <h2 className="section-header__title">
            Imagine your guests walking into <em>a moment made for you</em>
          </h2>
          <p className="section-header__subtitle">
            These are real Nairobi celebrations, each shaped around a different
            person, story and reason to gather. Yours should feel just as personal.
          </p>
        </div>

        <div className="work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="work__cta">
          <Link to="/our-work" className="btn btn--text">
            Find inspiration for my event →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
