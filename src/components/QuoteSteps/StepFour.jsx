import React from "react";
import OptionCard from "../QuoteSteps/OptionCard";
import { PRICING } from "../../data/pricingData";

import basicCenterpiece from "../../assets/images/centerpieces/basic.jpg";
import premiumCenterpiece from "../../assets/images/centerpieces/premium.jpg";
import luxuryCenterpiece from "../../assets/images/centerpieces/luxury.jpg";

import "../../pages/Quote/Quote.scss";

const centerpieceOptions = [
  {
    id: "basic",
    name: "Basic",
    image: basicCenterpiece,
    description: "Simple floral arrangements",
    price: PRICING.centerpieces.basic,
  },
  {
    id: "premium",
    name: "Premium",
    image: premiumCenterpiece,
    description: "Elegant floral arrangements with accents",
    price: PRICING.centerpieces.premium,
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    image: luxuryCenterpiece,
    description: "Statement pieces with premium flowers",
    price: PRICING.centerpieces.luxury,
  },
];

const tentOptions = [
  {
    id: "bLine",
    name: PRICING.tents.bLine.label,
    description:
      "A structured tent option suitable for elegant outdoor events.",
  },
  {
    id: "canopy",
    name: PRICING.tents.canopy.label,
    description:
      "A versatile canopy option for outdoor celebrations and gatherings.",
  },
  {
    id: "custom",
    name: PRICING.tents.custom.label,
    description:
      "Have another tent style in mind? Tell us what you need and we'll confirm availability and pricing.",
  },
];

function StepFour({ formData, setFormData, tablesNeeded }) {
  const extras = formData.extras || {};

  const handleCenterpieceSelect = (tier) => {
    setFormData((prev) => ({
      ...prev,
      centerpieceTier: prev.centerpieceTier === tier ? "" : tier,
    }));
  };

  const handleExtraToggle = (extraName) => {
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extraName]: !prev.extras[extraName],
      },
    }));
  };

  const handleTentSelect = (tentId) => {
    setFormData((prev) => ({
      ...prev,
      tentType: prev.tentType === tentId ? "" : tentId,
    }));
  };

  const centerpiecePrice = formData.centerpieceTier
    ? PRICING.centerpieces[formData.centerpieceTier] || 0
    : 0;

  const centerpieceTotal = centerpiecePrice * tablesNeeded;

  const extrasTotal =
    (extras.cakeStand ? PRICING.extras.cakeStand : 0) +
    (extras.dessertTable ? PRICING.extras.dessertTable : 0) +
    (extras.redCarpet ? PRICING.extras.redCarpet : 0) +
    (extras.lightingPackage ? PRICING.extras.lightingPackage : 0);

  const hasExtras = extrasTotal > 0;

  return (
    <div>
      <h2 className="step__title">Centerpieces, Extras &amp; Tents</h2>

      <p className="step__description">
        Add the finishing touches and outdoor essentials for your event
      </p>

      <div className="form">
        {/*  CENTERPIECES */}
        <div className="form__group">
          <label className="form__label">Centerpieces (Optional)</label>

          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Choose one centerpiece tier for all {tablesNeeded} tables
          </p>

          <div className="option-grid">
            {centerpieceOptions.map((tier) => (
              <OptionCard
                key={tier.id}
                name={tier.name}
                description={tier.description}
                image={tier.image}
                imageFit="contain"
                price={tier.price}
                priceSuffix="per table"
                popular={tier.popular}
                totalLabel={`Total: KES ${(
                  tier.price * tablesNeeded
                ).toLocaleString()}`}
                isSelected={formData.centerpieceTier === tier.id}
                onSelect={() => handleCenterpieceSelect(tier.id)}
              />
            ))}
          </div>

          {formData.centerpieceTier && (
            <div className="form__calculation">
              <span className="form__calculation-text">
                {tablesNeeded} tables × KES {centerpiecePrice.toLocaleString()}{" "}
                = <strong>KES {centerpieceTotal.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        {/*  EXTRAS */}
        <div className="form__group">
          <label className="form__label">Additional Extras (Optional)</label>

          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Add any additional items you'd like for your event
          </p>

          <div className="extras-list">
            {/* Cake Stand */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.cakeStand || false}
                onChange={() => handleExtraToggle("cakeStand")}
              />

              <div className="extra-item__content">
                <div className="extra-item__header">
                  <div className="extra-item__details">
                    <span className="extra-item__name">Cake Stand</span>

                    <span className="extra-item__description">
                      Elegant display for your cake
                    </span>
                  </div>
                </div>

                <span className="extra-item__price">
                  KES {PRICING.extras.cakeStand.toLocaleString()}
                </span>
              </div>
            </label>

            {/* Dessert Table */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.dessertTable || false}
                onChange={() => handleExtraToggle("dessertTable")}
              />

              <div className="extra-item__content">
                <div className="extra-item__header">
                  <div className="extra-item__details">
                    <span className="extra-item__name">
                      Dessert Table Setup
                    </span>

                    <span className="extra-item__description">
                      Complete dessert display with decorations
                    </span>
                  </div>
                </div>

                <span className="extra-item__price">
                  KES {PRICING.extras.dessertTable.toLocaleString()}
                </span>
              </div>
            </label>

            {/* Red Carpet */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.redCarpet || false}
                onChange={() => handleExtraToggle("redCarpet")}
              />

              <div className="extra-item__content">
                <div className="extra-item__header">
                  <div className="extra-item__details">
                    <span className="extra-item__name">
                      Red Carpet (10 meters)
                    </span>

                    <span className="extra-item__description">
                      Classic red carpet entrance
                    </span>
                  </div>
                </div>

                <span className="extra-item__price">
                  KES {PRICING.extras.redCarpet.toLocaleString()}
                </span>
              </div>
            </label>

            {/* Lighting */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.lightingPackage || false}
                onChange={() => handleExtraToggle("lightingPackage")}
              />

              <div className="extra-item__content">
                <div className="extra-item__header">
                  <div className="extra-item__details">
                    <span className="extra-item__name">Lighting Package</span>

                    <span className="extra-item__description">
                      Ambient lighting to enhance your venue
                    </span>
                  </div>
                </div>

                <span className="extra-item__price">
                  KES {PRICING.extras.lightingPackage.toLocaleString()}
                </span>
              </div>
            </label>
          </div>

          {hasExtras && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>

              <span className="form__calculation-text">
                Extras cost: <strong>KES {extrasTotal.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        {/*  TENTS  */}
        <div className="form__group">
          <label className="form__label">Tent (Optional)</label>

          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Need a tent for your event? Select your preferred option and we'll
            confirm availability and final pricing with you.
          </p>

          <div className="option-grid">
            {tentOptions.map((tent) => {
              const isSelected = formData.tentType === tent.id;

              return (
                <button
                  key={tent.id}
                  type="button"
                  onClick={() => handleTentSelect(tent.id)}
                  className={`option-card ${
                    isSelected ? "option-card--selected" : ""
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <span className="option-card__check" aria-hidden="true">
                      ✓
                    </span>
                  )}

                  <h3 className="option-card__name">{tent.name}</h3>

                  <p className="option-card__description">{tent.description}</p>

                  <div className="option-card__price">
                    Price to be confirmed
                  </div>
                </button>
              );
            })}
          </div>

          {formData.tentType && (
            <div className="form__info-box">
              <div className="form__info-box-header">
                <span className="form__info-box-icon">⛺</span>

                <h4 className="form__info-box-title">
                  Tent pricing requires confirmation
                </h4>
              </div>

              <p className="form__info-box-text">
                We've recorded your tent preference. Tent availability and
                pricing will be confirmed with you on WhatsApp.
              </p>

              <p
                className="form__info-box-text"
                style={{ marginTop: "0.5rem" }}
              >
                A <strong>KES 7,000 tent transport surcharge</strong> is added
                to the transport cost when a tent is selected.
              </p>
            </div>
          )}
        </div>

        {/* EMPTY STATE */}
        {!formData.centerpieceTier && !hasExtras && !formData.tentType && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>

              <h4 className="form__info-box-title">
                These additions are optional
              </h4>
            </div>

            <p className="form__info-box-text">
              You can skip this step if you don't need centerpieces, extras, or
              a tent. Your selections and estimated total are shown in your
              quote summary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepFour;
