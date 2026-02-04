import React from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";

function Hero() {
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

        <div className="hero__image">
          <div className="hero__placeholder">
            <span>Hero Image Spot</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
