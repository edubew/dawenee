import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroSlides from "../../data/heroSlides";
import { PampasGrass, TerracottaBranch } from "../Botanicals/Botanicals";
import "./Hero.scss";

const SLIDE_DURATION = 6000;

const captions = [
  {
    eyebrow: "Dusty Rose & Sage",
    title: "Garden brunch, Karen",
    desc: "Our most-requested palette this season.",
  },
  {
    eyebrow: "Terracotta & Cream",
    title: "Birthday celebration, Westlands",
    desc: "Earthy tones for milestone moments.",
  },
  {
    eyebrow: "Berry & Golden",
    title: "Intimate picnic, Lavington",
    desc: "Warm hues for relaxed afternoons.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroSlides.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(id);
  }, [isPaused]);

  const caption = captions[currentSlide] || captions[0];

  return (
    <section className="hero">
      {/* Botanical decorations */}
      <PampasGrass
        className="hero__botanical-pampas"
        style={{
          position: "absolute",
          top: "-20px",
          right: "-10px",
          width: "260px",
        }}
        opacity={0.22}
      />
      <TerracottaBranch
        className="hero__botanical-branch"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "160px",
          transform: "rotate(180deg) scaleX(-1)",
        }}
        opacity={0.16}
      />

      <div className="container hero__inner">
        {/* ── Content ── */}
        <div className="hero__content">
          <span className="hero__tag">Event DÉCOR &amp; Styling · Nairobi</span>

          <h1 className="hero__title">
            We turn your celebration
            <br />
            into a
            <br />
            <em>space worth remembering.</em>
          </h1>

          <p className="hero__description">
            From intimate showers to milestone birthdays, graduations, weddings
            and corporate events, we design and style memorable spaces around
            your vision.
          </p>

          <div className="hero__facts">
            <div className="hero__fact">
              <span className="hero__fact-value">30+</span>
              <span className="hero__fact-label">Events styled</span>
            </div>
            <div className="hero__fact">
              <span className="hero__fact-value">Same-day</span>
              <span className="hero__fact-label">Quotes</span>
            </div>
            <div className="hero__fact">
              <span className="hero__fact-value">50%</span>
              <span className="hero__fact-label">Deposit only</span>
            </div>
          </div>

          <div className="hero__ctas">
            <Link to="/quote" className="btn btn--primary">
              Plan My Event
            </Link>
            <button
              onClick={() => scrollTo("featured-work")}
              className="btn btn--secondary"
            >
              View our work
            </button>
          </div>
        </div>

        <div
          className="hero__visual"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="hero__progress">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                className={`hero__progress-seg ${
                  i === currentSlide
                    ? "hero__progress-seg--active"
                    : i < currentSlide
                      ? "hero__progress-seg--done"
                      : ""
                }`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="hero__progress-fill"
                  style={
                    i === currentSlide && !isPaused
                      ? { animationDuration: `${SLIDE_DURATION}ms` }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>

          <div className="hero__collage">
            {/* Primary photo frame */}
            <div className="hero__frame">
              {heroSlides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={`hero__slide ${i === currentSlide ? "hero__slide--active" : ""}`}
                >
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ))}
            </div>

            <div className="hero__frame-secondary">
              {heroSlides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={`hero__slide ${i === currentSlide ? "hero__slide--active" : ""}`}
                >
                  <img
                    src={slide.image}
                    alt=""
                    aria-hidden="true"
                    className="hero__frame-secondary-img"
                  />
                </div>
              ))}
            </div>

            <div className="hero__caption">
              <div className="hero__caption-eyebrow">{caption.eyebrow}</div>
              <div className="hero__caption-title">{caption.title}</div>
              <div className="hero__caption-desc">{caption.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
