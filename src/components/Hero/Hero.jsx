import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroSlides from "../../data/heroSlides";
import "./Hero.scss";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  //Auto advance slides every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Go to specific slide when dot is clicked
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  //Previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__tag">Event Styling & Decor</p>

          <h1 className="hero__title">
            Beautiful Moments
            <br />
            don't need to
            <br />
            <em>cost a fortune</em>
          </h1>

          <p className="hero__description">
            We create stunning table setups, floral backdrops, and balloon
            installations that make every celebration feel magical at a price
            that feels good too
          </p>

          <Link to="/portfolio" className="hero__cta">
            Explore Our Work
          </Link>
        </div>

        {/* Image carousel */}
        <div
          className="hero__carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="hero__carousel-slides">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero__carousel-slides ${index === currentSlide ? "hero__carousel-slide--active" : ""}`}
              >
                <img src={slide.image} alt={slide.alt} />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className="hero__carousel-arrow hero__carousel-arrow--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="hero__carousel-arrow hero__carousel-arrow--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="hero__carousel-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero__carousel-dot 
                ${index === currentSlide ? "hero__carousel-dot--active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
