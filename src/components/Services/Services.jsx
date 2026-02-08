import React from "react";
import ServiceCard from "./ServiceCard";
import services from "../../data/services";
import "./Services.scss";

function Services() {
  return (
    <section className="services">
      <div className="container">
        <h2 className="services__title">Our Services</h2>
        <p className="services__subtitle">
          From concept to execution, we bring your celebration to life
        </p>

        <div className="services__grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
