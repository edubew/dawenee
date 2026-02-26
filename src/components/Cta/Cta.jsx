import React from "react";
import { Link } from "react-router-dom";
import "./Cta.scss";

function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__content">
          <h2 className="cta__title">
            Ready to Make Your Event Unforgettable?
          </h2>

          <p className="cta__subtitle">
            Get your instant quote in under 2 minutes. No hidden fees, no
            pressure—just honest pricing and beautiful results.
          </p>

          <div className="cta__buttons">
            <Link to="/quote" className="cta__button cta__button--primary">
              Get an Instant Quote
            </Link>
            <a
              href="tel:+254715784287"
              className="cta__button cta__button--secondary"
            >
              <span className="cta__button-icon">📞</span>
              Call: 0715 784 287
            </a>
          </div>

          <div className="cta__trust">
            <span className="cta__trust-item">✓ 30+ Events Styled</span>
            <span className="cta__trust-divider">•</span>
            <span className="cta__trust-item">✓ Same-Day Quotes</span>
            <span className="cta__trust-divider">•</span>
            <span className="cta__trust-item">✓ 50% Deposit Only</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
