import React from "react";
import { Link } from "react-router-dom";
import "./Cta.scss";
import ctaImage from "../../assets/images/services/table-setups.jpg";

function Cta() {
  return (
    <section className="cta">
      <div className="cta__background">
        <img src={ctaImage} alt="" />
      </div>

      <div className="container cta__content">
        <h2 className="cta__title">
          Ready to Make Your Celebration Unforgettable?
        </h2>

        <p className="cta__subtitle">Let's bring your vision to life</p>

        <Link to="/booking" className="cta__button">
          Book a Consultation
        </Link>
      </div>
    </section>
  );
}

export default Cta;
