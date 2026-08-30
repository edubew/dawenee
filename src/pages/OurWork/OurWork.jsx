import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaInstagram,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Cta from "../../components/Footer/Cta";
import Footer from "../../components/Footer/Footer";
import projects from "../../data/projects";
import "./OurWork.scss";

const filters = ["All", "Dinner", "Birthday", "Wedding", "Graduation"];

function OurWork() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSlide, setActiveSlide] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleProjects = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.eventType === activeFilter);

  const closeGallery = () => setActiveSlide(null);
  const showPrevious = () => setActiveSlide((current) =>
    (current - 1 + visibleProjects.length) % visibleProjects.length);
  const showNext = () => setActiveSlide((current) =>
    (current + 1) % visibleProjects.length);

  useEffect(() => {
    if (activeSlide === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveSlide(null);
      if (event.key === "ArrowLeft") {
        setActiveSlide((current) =>
          (current - 1 + visibleProjects.length) % visibleProjects.length);
      }
      if (event.key === "ArrowRight") {
        setActiveSlide((current) =>
          (current + 1) % visibleProjects.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSlide, visibleProjects.length]);

  return (
    <div className="our-work-page min-h-screen">
      <Navbar />

      <main>
        <section className="work-hero">
          <div className="container work-hero__inner">
            <div className="work-hero__copy">
              <span className="work-hero__eyebrow">Our work</span>
              <h1>See the moment before<br /><em>it becomes your memory.</em></h1>
              <p>
                Look beyond the décor. Imagine the entrance, the reactions and
                the photographs from a space shaped around your own story.
              </p>
              <a href="#portfolio" className="work-hero__scroll">
                Find my inspiration <FaArrowRight />
              </a>
            </div>

            <div className="work-hero__collage">
              <figure className="work-hero__photo work-hero__photo--one">
                <img src={projects[0].image} alt={projects[0].alt} />
              </figure>
              <figure className="work-hero__photo work-hero__photo--two">
                <img src={projects[1].image} alt={projects[1].alt} />
              </figure>
              <figure className="work-hero__photo work-hero__photo--three">
                <img src={projects[4].image} alt={projects[4].alt} />
              </figure>
              <span className="work-hero__note">Made with care<br />for your moment</span>
            </div>
          </div>
        </section>

        <section className="portfolio" id="portfolio">
          <div className="container">
            <div className="portfolio__heading">
              <div>
                <span className="portfolio__eyebrow">Selected celebrations</span>
                <h2>A glimpse into <em>the moments</em></h2>
              </div>
              <p>
                No two hosts, milestones or guest lists are the same. That is
                why every celebration begins with listening—not a template.
              </p>
            </div>

            <div className="portfolio__filters" role="group" aria-label="Filter projects by event type">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={activeFilter === filter ? "portfolio__filter portfolio__filter--active" : "portfolio__filter"}
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveSlide(null);
                  }}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="portfolio__grid" aria-live="polite">
              {visibleProjects.map((project, index) => (
                <article className={`portfolio-piece portfolio-piece--${(index % 3) + 1}`} key={project.id}>
                  <button
                    type="button"
                    className="portfolio-piece__image-wrap"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Open gallery at ${project.title}`}
                  >
                    <img src={project.image} alt={project.alt} loading="lazy" />
                    <span className="portfolio-piece__index">0{project.id}</span>
                    <span className="portfolio-piece__open"><FaExpand /> View gallery</span>
                  </button>
                  <div className="portfolio-piece__caption">
                    <span>{project.eventType}</span>
                    <h3>{project.title}</h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="portfolio__instagram">
              <p>More recent celebrations, details and behind-the-scenes moments live on Instagram.</p>
              <a href="https://instagram.com/daweneedecor" target="_blank" rel="noreferrer" className="btn btn--secondary">
                <FaInstagram /> Follow our work
              </a>
            </div>
          </div>
        </section>

        <section className="work-values">
          <div className="container work-values__inner">
            <div className="work-values__statement">
              <span>Our signature</span>
              <h2>Styled to feel like <em>you</em>—never copied, never ordinary.</h2>
            </div>
            <div className="work-values__list">
              <div><span>01</span><h3>Personal</h3><p>Your story and preferences guide every creative choice.</p></div>
              <div><span>02</span><h3>Cohesive</h3><p>Every element works together, from the entrance to the tablescape.</p></div>
              <div><span>03</span><h3>Considered</h3><p>Beautiful design balanced with your space, guests and budget.</p></div>
            </div>
            <Link to="/services" className="work-values__link">Explore our services <FaArrowRight /></Link>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />

      {activeSlide !== null && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Event portfolio gallery">
          <button type="button" className="gallery-modal__backdrop" onClick={closeGallery} aria-label="Close gallery" />
          <div className="gallery-modal__dialog">
            <div className="gallery-modal__topbar">
              <div>
                <span>{visibleProjects[activeSlide].eventType}</span>
                <h2>{visibleProjects[activeSlide].title}</h2>
              </div>
              <span className="gallery-modal__count">
                {String(activeSlide + 1).padStart(2, "0")} / {String(visibleProjects.length).padStart(2, "0")}
              </span>
              <button type="button" className="gallery-modal__close" onClick={closeGallery} aria-label="Close gallery"><FaTimes /></button>
            </div>

            <div className="gallery-modal__stage">
              <button type="button" className="gallery-modal__arrow gallery-modal__arrow--prev" onClick={showPrevious} aria-label="Previous image"><FaChevronLeft /></button>
              <img src={visibleProjects[activeSlide].image} alt={visibleProjects[activeSlide].alt} />
              <button type="button" className="gallery-modal__arrow gallery-modal__arrow--next" onClick={showNext} aria-label="Next image"><FaChevronRight /></button>
            </div>

            <div className="gallery-modal__thumbnails" aria-label="Choose gallery image">
              {visibleProjects.map((project, index) => (
                <button
                  type="button"
                  key={project.id}
                  className={index === activeSlide ? "gallery-modal__thumb gallery-modal__thumb--active" : "gallery-modal__thumb"}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`View ${project.title}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                >
                  <img src={project.image} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OurWork;
