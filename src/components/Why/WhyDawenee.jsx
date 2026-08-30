import React from "react";
import { BerrySprig } from "../Botanicals/Botanicals";

import "./WhyDawenee.scss";

const reasons = [
  {
    number: "01",
    title: "Thoughtful styling",
    text: "Your guests may not name every detail, but they will feel how beautifully it all belongs together.",
  },
  {
    number: "02",
    title: "Confidence before commitment",
    text: "See a starting estimate around the details you value, so you can make decisions with clarity before you commit.",
  },
  {
    number: "03",
    title: "Personal attention",
    text: "You are not choosing someone else's celebration. We listen for what matters to you and make that visible in the room.",
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
              The best celebrations do more than look beautiful.
              <br />
              <em>They make people feel something.</em>
            </h2>
          </div>

          <p className="why-dawenee__intro-text">
            Dawenee is for the host who wants guests to feel welcomed, the
            moment to feel personal, and the memories to outlast the décor.
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
