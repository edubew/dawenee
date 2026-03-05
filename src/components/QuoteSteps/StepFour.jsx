import React from "react";
import { PRICING } from "../../data/pricingData";
import "./StepFour.scss";

function StepFour({ formData, setFormData, tablesNeeded }) {
  // Initialize extras if not exists
  const extras = formData.extras || {};

  // Calculate centerpiece cost
  const calculateCenterpieceCost = () => {
    if (!formData.centerpieceTier) return 0;
    const pricePerTable = PRICING.centerpieces[formData.centerpieceTier] || 0;
    return pricePerTable * tablesNeeded;
  };

  // Calculate extras cost
  const calculateExtrasCost = () => {
    let total = 0;

    if (extras.cakeStand) total += PRICING.extras.cakeStand;
    if (extras.dessertTable) total += PRICING.extras.dessertTable;
    if (extras.redCarpet) total += PRICING.extras.redCarpet;
    if (extras.lightingPackage) total += PRICING.extras.lightingPackage;

    // Individual cards (quantity-based)
    if (extras.individualCards && extras.cardQuantity) {
      total += PRICING.extras.individualCards * extras.cardQuantity;
    }

    return total;
  };

  // Handle centerpiece tier selection
  const handleCenterpieceSelect = (tier) => {
    setFormData((prev) => ({
      ...prev,
      centerpieceTier: prev.centerpieceTier === tier ? "" : tier, // Toggle off if same
    }));
  };

  // Handle extra toggle
  const handleExtraToggle = (extraName) => {
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        [extraName]: !prev.extras[extraName],
      },
    }));
  };

  // Handle card quantity change
  const handleCardQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      extras: {
        ...prev.extras,
        cardQuantity: quantity,
      },
    }));
  };

  // Calculate total for step
  const stepTotal = calculateCenterpieceCost() + calculateExtrasCost();

  return (
    <div className="step">
      <h2 className="step__title">Centerpieces & Extra Touches</h2>
      <p className="step__description">
        Add the finishing touches that make your event truly special
      </p>

      <div className="form">
        {/* Centerpieces Section */}
        <div className="form__group">
          <label className="form__label">Centerpieces (Optional)</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Choose one tier for all {tablesNeeded} tables
          </p>

          <div className="centerpiece-selector">
            <button
              type="button"
              onClick={() => handleCenterpieceSelect("basic")}
              className={`centerpiece-card ${formData.centerpieceTier === "basic" ? "centerpiece-card--selected" : ""}`}
            >
              <div className="centerpiece-card__icon">🌼</div>
              <h3 className="centerpiece-card__name">Basic</h3>
              <p className="centerpiece-card__description">
                Simple florals arrangements
              </p>
              <div className="centerpiece-card__price-per">
                KES {PRICING.centerpieces.basic.toLocaleString()}{" "}
                <span>per table</span>
              </div>
              <div className="centerpiece-card__total">
                Total: KES{" "}
                {(PRICING.centerpieces.basic * tablesNeeded).toLocaleString()}
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleCenterpieceSelect("premium")}
              className={`centerpiece-card ${formData.centerpieceTier === "premium" ? "centerpiece-card--selected" : ""}`}
            >
              <span className="centerpiece-card__badge">Popular</span>
              <div className="centerpiece-card__icon">🌺</div>
              <h3 className="centerpiece-card__name">Premium</h3>
              <p className="centerpiece-card__description">
                Elegant floral arrangements with accents
              </p>
              <div className="centerpiece-card__price-per">
                KES {PRICING.centerpieces.premium.toLocaleString()}{" "}
                <span>per table</span>
              </div>
              <div className="centerpiece-card__total">
                Total: KES{" "}
                {(PRICING.centerpieces.premium * tablesNeeded).toLocaleString()}
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleCenterpieceSelect("luxury")}
              className={`centerpiece-card ${formData.centerpieceTier === "luxury" ? "centerpiece-card--selected" : ""}`}
            >
              <div className="centerpiece-card__icon">💐</div>
              <h3 className="centerpiece-card__name">Luxury</h3>
              <p className="centerpiece-card__description">
                Statement pieces with premium flowers
              </p>
              <div className="centerpiece-card__price-per">
                KES {PRICING.centerpieces.luxury.toLocaleString()}{" "}
                <span>per table</span>
              </div>
              <div className="centerpiece-card__total">
                Total: KES{" "}
                {(PRICING.centerpieces.luxury * tablesNeeded).toLocaleString()}
              </div>
            </button>
          </div>

          {formData.centerpieceTier && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                {tablesNeeded} tables × KES{" "}
                {PRICING.centerpieces[
                  formData.centerpieceTier
                ].toLocaleString()}{" "}
                =
                <strong>
                  {" "}
                  KES {calculateCenterpieceCost().toLocaleString()}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Additional Extras Section */}
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
                  <span className="extra-item__icon">🎴</span>
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

            {/* Card Quantity Input */}
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

            {/* Cake Stand */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.cakeStand || false}
                onChange={() => handleExtraToggle("cakeStand")}
              />
              <div className="extra-item__content">
                <div className="extra-item__header">
                  <span className="extra-item__icon">🍰</span>
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

            {/* Red Carpet */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.redCarpet || false}
                onChange={() => handleExtraToggle("redCarpet")}
              />
              <div className="extra-item__content">
                <div className="extra-item__header">
                  <span className="extra-item__icon">🔴</span>
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

            {/* Dessert Table */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.dessertTable || false}
                onChange={() => handleExtraToggle("dessertTable")}
              />
              <div className="extra-item__content">
                <div className="extra-item__header">
                  <span className="extra-item__icon">🎂</span>
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

            {/* Lighting Package */}
            <label className="extra-item">
              <input
                type="checkbox"
                checked={extras.lightingPackage || false}
                onChange={() => handleExtraToggle("lightingPackage")}
              />
              <div className="extra-item__content">
                <div className="extra-item__header">
                  <span className="extra-item__icon">✨</span>
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

          {/* Show extras cost */}
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

        {/* No selection message */}
        {stepTotal === 0 && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>
              <h4 className="form__info-box-title">
                Centerpieces & Extras are Optional
              </h4>
            </div>
            <p className="form__info-box-text">
              You can skip this step if you don't need centerpieces or
              additional extras. Click "Next Step" to continue with your contact
              details.
            </p>
          </div>
        )}

        {/* Total for this step */}
        {stepTotal > 0 && (
          <div className="step__total">
            <span className="step__total-label">
              Centerpieces & Extras Total:
            </span>
            <span className="step__total-amount">
              KES {stepTotal.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepFour;
