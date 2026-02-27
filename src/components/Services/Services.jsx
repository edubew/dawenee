import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import services from "../../data/services";
import "./Services.scss";

function Services() {
  return (
    <section className="services-preview">
      <div className="container">
        <div className="services-preview__header">
          <h2 className="services-preview__title">What We Offer</h2>
          <p className="services-preview__subtitle">
            Mix and match to create your perfect celebration
          </p>
        </div>

        <div className="services-preview__grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="services-preview__cta">
          <Link to="/quote" className="services-preview__button">
            Get a Custom Quote
          </Link>
          <p className="services-preview__note">
            See exact pricing for your event in under 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
