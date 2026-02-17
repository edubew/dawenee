import React from "react";
import "./ServicePage.scss";
import { services } from "../../data/servicesData";

function ServicePage() {
  return (
    <div className="services">
      <div className="services__cards">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-card__image-wrapper">
              <img
                src={service.image}
                alt={service.title}
                className="service-card__image"
              />
              <div className="service-card__icon">{service.icon}</div>
            </div>

            <div className="service-card__content">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__short-desc">
                {service.shortDescription}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ServicePage;
