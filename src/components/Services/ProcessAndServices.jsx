import React from "react";
import { Link } from "react-router-dom";
import { TerracottaBranch } from "../Botanicals/Botanicals";
import "./ProcessAndServices.scss";

const steps = [
  {
    number: 1,
    title: "Tell us about your event",
    description:
      "Share your date, guest count, venue and the look you're envisioning.",
  },
  {
    number: 2,
    title: "Build your estimate",
    description:
      "Choose the décor details you want and see your estimated investment as you go.",
  },
  {
    number: 3,
    title: "Let's make it happen",
    description:
      "We'll review your request, confirm availability and logistics, then guide you through securing your date.",
  },
];

const services = [
  {
    title: "Focal points",
    description:
      "Backdrops, balloon installations, welcome areas and statement pieces.",
  },
  {
    title: "Tablescapes",
    description:
      "Table settings, centrepieces, candles, runners and finishing details.",
  },
  {
    title: "Themed décor",
    description:
      "Birthday themes, baby showers, bridal showers and personalised setups.",
  },
  {
    title: "Full event styling",
    description:
      "A cohesive look from the entrance to the main celebration space.",
  },
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
          <span className="section-header__eyebrow">
            How it works & what we do
          </span>

          <h2 className="section-header__title">
            From your vision to <em>the final setup</em>
          </h2>
        </div>

        <div className="process__grid">
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

              <p className="steps__note">Get your quote in under 2 minutes</p>
            </div>
          </ol>

          <div className="services-card">
            <h3 className="services-card__title">Our event styling services</h3>

            <p className="services-card__subtitle">
              Depending on your package, we can take care of every detail from
              styling to setup.
            </p>

            <ul className="service-row__description-list">
              {services.map((service) => (
                <li
                  key={service.title}
                  className="service-row__description-item"
                >
                  <span className="service-row__icon">✓</span>
                  <span className="service-row__text">
                    <strong className="service-row__title">
                      {service.title}
                    </strong>
                    <span className="service-row__description">
                      {service.description}
                    </span>
                  </span>
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
