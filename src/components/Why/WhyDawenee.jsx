import React from "react";
import { BerrySprig } from "../Botanicals/Botanicals";

import "./WhyDawenee.scss";

const reasons = [
  {
    number: "01",
    title: "Thoughtful styling",
    text: "We don't just fill a space. Every detail is considered so the colours, textures and finishing touches feel intentional together.",
  },
  {
    number: "02",
    title: "Clear pricing",
    text: "Build your estimate around what you actually want, with straightforward pricing that helps you understand your investment before you commit.",
  },
  {
    number: "03",
    title: "Personal attention",
    text: "Your celebration isn't treated like a template. We work around your vision, venue and occasion to create something that feels like yours.",
  },
];

function WhyDawenee() {
  return (
    <section className="why-dawenee">
      <BerrySprig
        className="why-dawenee__botanical"
        style={{
          position: "absolute",
          bottom: "-1rem",
          right: "-1rem",
          width: "180px",
          transform: "rotate(180deg)",
        }}
        opacity={0.1}
      />

      <div className="container">
        <div className="why-dawenee__intro">
          <div>
            <span className="why-dawenee__eyebrow">The Dawenee difference</span>

            <h2 className="why-dawenee__title">
              Beautiful isn't enough.
              <br />
              <em>It should feel intentional.</em>
            </h2>
          </div>

          <p className="why-dawenee__intro-text">
            From the first idea to the final setup, we care about the details
            that turn a decorated space into an experience worth remembering.
          </p>
        </div>

        <div className="why-dawenee__grid">
          {reasons.map((reason) => (
            <article className="why-dawenee__card" key={reason.number}>
              <span className="why-dawenee__number">{reason.number}</span>

              <div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDawenee;
