import React from "react";
import { Link } from "react-router-dom";
import { TerracottaBranch } from "../Botanicals/Botanicals";
import "./ProcessAndServices.scss";

const steps = [
  {
    number: 1,
    title: "Tell us your vision",
    description:
      "Share your date, guest count, style and budget — takes less than 2 minutes.",
  },
  {
    number: 2,
    title: "Get an instant quote",
    description:
      "Pick from the services below, see real-time pricing, and customise your package.",
  },
  {
    number: 3,
    title: "Pay & relax",
    description:
      "Secure your date with a 50% deposit via M-Pesa. We handle setup and teardown. You just enjoy.",
  },
];

const services = [
  "Backdrop & focal-point styling",
  "Table styling & centerpieces",
  "Balloons & decorative installations",
  "Props & themed décor",
  "Venue styling & setup",
  "On-site installation",
];

function ProcessAndServices() {
  return (
    <section className="process">
      <TerracottaBranch
        className="process__botanical"
        style={{
          position: "absolute",
          top: "-1rem",
          left: "-1.5rem",
          width: "180px",
        }}
        opacity={0.15}
      />

      <div className="container">
        <div className="section-header">
          <span className="section-header__eyebrow">How it works</span>
          <h2 className="section-header__title">
            From your vision to <em>the final setup</em>
          </h2>
        </div>

        <div className="process__grid">
          {/* Steps timeline */}
          <ol className="steps">
            {steps.map((step) => (
              <li className="step" key={step.number}>
                <div className="step__number">{step.number}</div>
                <div>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__description">{step.description}</p>
                </div>
              </li>
            ))}

            <div className="steps__cta">
              <Link to="/quote" className="btn btn--primary">
                Start your quote now
              </Link>
              <p className="steps__note">Pricing in under 2 minutes</p>
            </div>
          </ol>

          {/* Services card */}
          <div className="services-card">
            <h3 className="services-card__title">What's included</h3>
            <p className="services-card__subtitle">
              Depending on your package we can handle:
            </p>

            <ul className="service-row__description-list">
              {services.map((service) => (
                <li key={service} className="service-row__description-item">
                  <span className="service-row__icon">✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessAndServices;
