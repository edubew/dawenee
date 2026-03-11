import React from "react";
import "./StepThree.scss";
import { PRICING } from "../../data/pricingData";
import balloonBackdrop from "../../assets/images/backdrops/balloonBackdrop.jpg";
import floralBackdrop from "../../assets/images/backdrops/floralBackdrop.jpg";
import drapedBackdrop from "../../assets/images/backdrops/drapedBackdrop.jpg";
import shimmerBackdrop from "../../assets/images/backdrops/shimmer.jpg";

const backdropOptions = [
  {
    id: "basicBalloon",
    name: "Basic Balloon Backdrop",
    price: PRICING.backdrops.basicBalloon,
    description: "Beautiful balloon arrangement perfect for photos",
    image: balloonBackdrop,
    popular: true,
  },
  {
    id: "floral",
    name: "Floral Backdrop",
    price: PRICING.backdrops.floral,
    description: "Elegant fresh or artificial flowers",
    image: floralBackdrop,
    popular: false,
  },
  {
    id: "draped",
    name: "Draped Backdrop",
    price: PRICING.backdrops.draped,
    description: "Luxurious fabric draping",
    image: drapedBackdrop,
    popular: false,
  },
  {
    id: "shimmerWall",
    name: "Shimmer Wall",
    price: PRICING.backdrops.shimmerWall,
    description: "Stunning metallic shimmer wall",
    image: shimmerBackdrop,
    popular: false,
  },
];

const welcomeSignOptions = [
  {
    id: "floral",
    name: "Floral Welcome Sign",
    price: PRICING.welcomeSigns.floral,
    description: "Beautiful floral arrangement with custom signage",
    image: floralBackdrop,
  },
  {
    id: "balloon",
    name: "Balloon Welcome Sign",
    price: PRICING.welcomeSigns.balloon,
    description: "Eye-catching balloon display with signage",
    image: balloonBackdrop,
  },
];

function StepThree({ formData, setFormData }) {
  const calculateBackdropCost = () => {
    if (!formData.backdrops || formData.backdrops.length === 0) return 0;

    return formData.backdrops.reduce((total, backdropId) => {
      const price = PRICING.backdrops[backdropId] || 0;
      return total + price;
    }, 0);
  };

  const calculateWelcomeSignCost = () => {
    if (!formData.welcomeSign) return 0;
    return PRICING.welcomeSigns[formData.welcomeSign] || 0;
  };

  const handleBackdropToggle = (backdropId) => {
    setFormData((prev) => {
      const backdrops = prev.backdrops || [];
      const isSelected = backdrops.includes(backdropId);

      if (isSelected) {
        return {
          ...prev,
          backdrops: backdrops.filter((id) => id !== backdropId),
        };
      } else {
        return {
          ...prev,
          backdrops: [...backdrops, backdropId],
        };
      }
    });
  };

  const handleWelcomeSignSelect = (signId) => {
    setFormData((prev) => ({
      ...prev,
      welcomeSign: prev.welcomeSign === signId ? "" : signId, // Toggle off if clicking same sign
    }));
  };

  // Check if backdrop is selected
  const isBackdropSelected = (backdropId) => {
    return formData.backdrops && formData.backdrops.includes(backdropId);
  };

  // Calculate total for step
  const stepTotal = calculateBackdropCost() + calculateWelcomeSignCost();
  return (
    <div className="step">
      <h2 className="step__title">Backdrops & Welcome Signage</h2>
      <p className="step__description">
        Create the perfect photo moment and welcome your guests in style
      </p>

      <div className="form">
        <div className="form__group">
          <label className="form__label">Backdrops</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Select one or more backdrops for different areas of your event
          </p>

          <div className="backdrop-selector">
            {backdropOptions.map((backdrop) => (
              <button
                key={backdrop.id}
                type="button"
                onClick={() => handleBackdropToggle(backdrop.id)}
                className={`backdrop-card ${isBackdropSelected(backdrop.id) ? "backdrop-card--selected" : ""}`}
              >
                {backdrop.popular && (
                  <span className="backdrop-card__badge">Most Popular</span>
                )}
                {isBackdropSelected(backdrop.id) && (
                  <span className="backdrop-card__selected-badge">
                    ✓ Selected
                  </span>
                )}
                <div className="backdrop-card__image">
                  <img src={backdrop.image} alt={backdrop.name} />
                </div>
                <h3 className="backdrop-card__name">{backdrop.name}</h3>
                <p className="backdrop-card__description">
                  {backdrop.description}
                </p>
                <div className="backdrop-card__price">
                  KES {backdrop.price.toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {formData.backdrops && formData.backdrops.length > 0 && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                {formData.backdrops.length} backdrop
                {formData.backdrops.length > 1 ? "s" : ""} selected:
                <strong> KES {calculateBackdropCost().toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        <div className="form__group">
          <label className="form__label">Welcome Sign (Optional)</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Greet your guests with a beautiful welcome display
          </p>

          <div className="welcome-sign-selector">
            {welcomeSignOptions.map((sign) => (
              <button
                key={sign.id}
                type="button"
                onClick={() => handleWelcomeSignSelect(sign.id)}
                className={`welcome-sign-card ${formData.welcomeSign === sign.id ? "welcome-sign-card--selected" : ""}`}
              >
                {formData.welcomeSign === sign.id && (
                  <span className="welcome-sign-card__selected-badge">
                    ✓ Selected
                  </span>
                )}
                <div className="welcome-sign-card__image">
                  <img src={sign.image} alt={sign.name} />
                </div>
                <h3 className="welcome-sign-card__name">{sign.name}</h3>
                <p className="welcome-sign-card__description">
                  {sign.description}
                </p>
                <div className="welcome-sign-card__price">
                  KES {sign.price.toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {formData.welcomeSign && (
            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                Welcome sign cost:{" "}
                <strong>
                  KES {calculateWelcomeSignCost().toLocaleString()}
                </strong>
              </span>
            </div>
          )}
        </div>

        {stepTotal === 0 && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>
              <h4 className="form__info-box-title">
                Backdrops & Signs are Optional
              </h4>
            </div>
            <p className="form__info-box-text">
              You can skip this step if you don't need backdrops or welcome
              signs. Click "Next Step" to continue with centerpieces and extras.
            </p>
          </div>
        )}

        {/* Total for this step */}
        {stepTotal > 0 && (
          <div className="step__total">
            <span className="step__total-label">
              Backdrops & Signage Total:
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

export default StepThree;
