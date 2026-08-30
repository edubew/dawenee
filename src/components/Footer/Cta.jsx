import React from "react";
import { Link } from "react-router-dom";
import { PampasGrass, BerrySprig } from "../Botanicals/Botanicals";
import "./Cta.scss";

function Cta() {
  return (
    <section className="cta">
      <PampasGrass
        className="cta__botanical-pampas"
        style={{
          position: "absolute",
          top: "-1rem",
          right: "-1rem",
          width: "240px",
        }}
        color="#E8C5D0"
        seedColor="#C4A35A"
        opacity={0.12}
      />
      <BerrySprig
        className="cta__botanical-sprig"
        style={{
          position: "absolute",
          bottom: "-1rem",
          left: "-1rem",
          width: "160px",
          transform: "rotate(180deg)",
        }}
        color="#E8C5D0"
        opacity={0.1}
      />

      <div className="container">
        <div className="cta__content">
          <span className="cta__eyebrow">Your date deserves a vision</span>

          <h2 className="cta__title">
            Give your guests more than a setting. <em>Give them a feeling.</em>
          </h2>

          <p className="cta__subtitle">
            Tell us what you are celebrating. In under two minutes, you can see
            a starting estimate and take the first step toward making it real.
          </p>

          <div className="cta__buttons">
            <Link to="/quote" className="btn btn--primary">
              Build my event estimate
            </Link>
            <a href="tel:+254715784287" className="btn btn--ghost-light">
              Call: 0715 784 287
            </a>
          </div>

          <div className="cta__reassurance">
            <span>No-obligation estimate</span>
            <span>Flexible packages</span>
            <span>50% deposit only</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
