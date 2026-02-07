import React from "react";
import "./ServiceCard.scss";

function ServiceCard({ service }) {
  const { title, description, image, icon } = service;
  return (
    <div className="service-card">
      <div className="service-card__image">
        <img src={image} alt={title} />

        <div className="service-card__icon">{icon}</div>
      </div>

      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
