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
            Celebrations we've styled, <em>moments we've helped create</em>
          </h2>
          <p className="section-header__subtitle">
            From intimate picnics to full-room transformations, here are some of
            the real celebrations we've brought to life across Nairobi.
          </p>
        </div>

        <div className="work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="work__cta">
          <a
            href="https://instagram.com/daweneedecor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--text"
          >
            See More of Our Work →
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
