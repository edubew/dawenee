import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroSlides from "../../data/heroSlides";
import "./Hero.scss";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

          <div className="hero__trust-signals">
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✓</span>
              <span className="hero__trust-text">30+ Events Styled</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✓</span>
              <span className="hero__trust-text">Same-Day Quotes</span>
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-icon">✓</span>
              <span className="hero__trust-text">From as low as Kes 8,000</span>
            </div>
          </div>

          <div className="hero__ctas">
            <Link to="/quote" className="hero__cta hero__cta--primary">
              Get Instant Quote
            </Link>

            <button
              onClick={() => scrollToSection("featured-work")}
              className="hero__cta hero__cta--secondary"
            >
              View Our Work
            </button>
          </div>

          <div className="hero__testimonial">
            <div className="hero__stars">⭐⭐⭐⭐⭐</div>
            <p className="hero__testimonial-text">
              "Best decor in Nairobi! Made our day perfect."
            </p>
            <span className="hero__testimonial-author">- Sarah M.</span>
          </div>
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
                className={`hero__carousel-slide ${index === currentSlide ? "hero__carousel-slide--active" : ""}`}
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
