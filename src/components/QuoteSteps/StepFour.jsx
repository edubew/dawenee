import React from "react";
import OptionCard from "../QuoteSteps/OptionCard";
import { PRICING } from "../../data/pricingData";

const centerpieceOptions = [
  {
    id: "basic",
    name: "Basic",
    icon: "🌼",
    description: "Simple floral arrangements",
    price: PRICING.centerpieces.basic,
  },
  {
    id: "premium",
    name: "Premium",
    icon: "🌺",
    description: "Elegant floral arrangements with accents",
    price: PRICING.centerpieces.premium,
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: "💐",
    description: "Statement pieces with premium flowers",
    price: PRICING.centerpieces.luxury,
  },
];

function StepFour({ formData, setFormData, tablesNeeded }) {
  const extras = formData.extras || {};

  const calculateCenterpieceCost = () => {
    if (!formData.centerpieceTier) return 0;
    return (PRICING.centerpieces[formData.centerpieceTier] || 0) * tablesNeeded;
  };

  const calculateExtrasCost = () => {
    let total = 0;
    if (extras.cakeStand) total += PRICING.extras.cakeStand;
    if (extras.dessertTable) total += PRICING.extras.dessertTable;
    if (extras.redCarpet) total += PRICING.extras.redCarpet;
    if (extras.lightingPackage) total += PRICING.extras.lightingPackage;
    if (extras.individualCards && extras.cardQuantity) {
      total += PRICING.extras.individualCards * extras.cardQuantity;
    }
    return total;
  };

  const handleCenterpieceSelect = (tier) => {
    setFormData((prev) => ({
      ...prev,
      centerpieceTier: prev.centerpieceTier === tier ? "" : tier,
    }));
  };

  const handleExtraToggle = (extraName) => {
    setFormData((prev) => ({
      ...prev,
      extras: { ...prev.extras, [extraName]: !prev.extras[extraName] },
    }));
  };

  const handleCardQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      extras: { ...prev.extras, cardQuantity: quantity },
    }));
  };

  return (
    <div className="step">
      <h2 className="step__title">Centerpieces &amp; Extra Touches</h2>
      <p className="step__description">
        Add the finishing touches that make your event truly special
      </p>

      <div className="form">
        <div className="form__group">
          <label className="form__label">Centerpieces (Optional)</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Choose one tier for all {tablesNeeded} tables
          </p>

          <div className="option-grid">
            {centerpieceOptions.map((tier) => (
              <OptionCard
                key={tier.id}
                name={tier.name}
                description={tier.description}
                icon={tier.icon}
                price={tier.price}
                priceSuffix="per table"
                popular={tier.popular}
                totalLabel={`Total: KES ${(tier.price * tablesNeeded).toLocaleString()}`}
                isSelected={formData.centerpieceTier === tier.id}
                onSelect={() => handleCenterpieceSelect(tier.id)}
              />
            ))}
          </div>

          {formData.centerpieceTier && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                {tablesNeeded} tables × KES{" "}
                {PRICING.centerpieces[
                  formData.centerpieceTier
                ].toLocaleString()}{" "}
                ={" "}
                <strong>
                  KES {calculateCenterpieceCost().toLocaleString()}
                </strong>
              </span>
            </div>
          )}
        </div>

        <div className="form__group">
          <label className="form__label">Additional Extras (Optional)</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Select any additional items you'd like to add
          </p>

          <div className="extras-list">
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.individualCards || false}
                onChange={() => handleExtraToggle("individualCards")}
              />
              <div className="extra-item__content">
                <div className="extra-item__header">
                  <div className="extra-item__details">
                    <span className="extra-item__name">Individual Cards</span>
                    <span className="extra-item__description">
                      Place cards, or thank you cards
                    </span>
                  </div>
                </div>
                <span className="extra-item__price">
                  KES {PRICING.extras.individualCards.toLocaleString()} each
                </span>
              </div>
            </label>

            {extras.individualCards && (
              <div className="card-quantity">
                <label htmlFor="cardQuantity" className="card-quantity__label">
                  Number of Cards
                </label>
                <input
                  type="number"
                  id="cardQuantity"
                  min="1"
                  max="1000"
                  value={extras.cardQuantity || ""}
                  onChange={handleCardQuantityChange}
                  placeholder="Enter quantity"
                  className="card-quantity__input"
                />
                {extras.cardQuantity > 0 && (
                  <span className="card-quantity__total">
                    = KES{" "}
                    {(
                      PRICING.extras.individualCards * extras.cardQuantity
                    ).toLocaleString()}
                  </span>
                )}
              </div>
            )}

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

          {calculateExtrasCost() > 0 && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                Extras cost:{" "}
                <strong>KES {calculateExtrasCost().toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        {!formData.centerpieceTier && calculateExtrasCost() === 0 && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>
              <h4 className="form__info-box-title">
                Centerpieces &amp; Extras are Optional
              </h4>
            </div>
            <p className="form__info-box-text">
              You can skip this step if you don't need centerpieces or
              additional extras. Click "Next Step" to continue with your contact
              details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepFour;
