import React from "react";
import "./ServiceCard.scss";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  const { title, description, image, icon } = service;
  return (
    <div className="service-preview-card">
      <div className="service-preview-card__image-wrapper">
        <img src={image} alt={title} className="service-preview-card__image" />

        <div className="service-preview-card__icon">{icon}</div>
      </div>
      <div className="service-preview-card__content">
        <h3 className="service-preview-card__title">{title}</h3>
        <p className="service-preview-card__description">{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
