import React from "react";
import OptionCard from "../QuoteSteps/OptionCard";
import { PRICING } from "../../data/pricingData";
import balloonBackdrop from "../../assets/images/backdrops/balloonBackdrop.jpg";
import floralBackdrop from "../../assets/images/backdrops/floralBackdrop.jpg";
import drapedBackdrop from "../../assets/images/backdrops/drapedBackdrop.jpg";
import shimmerBackdrop from "../../assets/images/backdrops/shimmer.jpg";
import floralSign from "../../assets/images/backdrops/floralSign.png";
import balloonSign from "../../assets/images/backdrops/balloonSign.jpg";

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
    image: floralSign,
  },
  {
    id: "balloon",
    name: "Balloon Welcome Sign",
    price: PRICING.welcomeSigns.balloon,
    description: "Eye-catching balloon display with signage",
    image: balloonSign,
  },
];

function StepThree({ formData, setFormData }) {
  const calculateBackdropCost = () => {
    if (!formData.backdrops || formData.backdrops.length === 0) return 0;
    return formData.backdrops.reduce(
      (total, backdropId) => total + (PRICING.backdrops[backdropId] || 0),
      0,
    );
  };

  const calculateWelcomeSignCost = () => {
    if (!formData.welcomeSign) return 0;
    return PRICING.welcomeSigns[formData.welcomeSign] || 0;
  };

  const handleBackdropToggle = (backdropId) => {
    setFormData((prev) => {
      const backdrops = prev.backdrops || [];
      const isSelected = backdrops.includes(backdropId);
      return {
        ...prev,
        backdrops: isSelected
          ? backdrops.filter((id) => id !== backdropId)
          : [...backdrops, backdropId],
      };
    });
  };

  const handleWelcomeSignSelect = (signId) => {
    setFormData((prev) => ({
      ...prev,
      welcomeSign: prev.welcomeSign === signId ? "" : signId,
    }));
  };

  const isBackdropSelected = (backdropId) =>
    formData.backdrops && formData.backdrops.includes(backdropId);

  return (
    <div className="step">
      <h2 className="step__title">Backdrops &amp; Welcome Signage</h2>
      <p className="step__description">
        Create the perfect photo moment and welcome your guests in style
      </p>

      <div className="form">
        <div className="form__group">
          <label className="form__label">Backdrops</label>
          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Select one or more backdrops for different areas of your event
          </p>

          <div className="option-grid option-grid--two-col">
            {backdropOptions.map((backdrop) => (
              <OptionCard
                key={backdrop.id}
                name={backdrop.name}
                description={backdrop.description}
                image={backdrop.image}
                price={backdrop.price}
                popular={backdrop.popular}
                isSelected={isBackdropSelected(backdrop.id)}
                onSelect={() => handleBackdropToggle(backdrop.id)}
              />
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

          <div className="option-grid option-grid--two-col">
            {welcomeSignOptions.map((sign) => (
              <OptionCard
                key={sign.id}
                name={sign.name}
                description={sign.description}
                image={sign.image}
                price={sign.price}
                isSelected={formData.welcomeSign === sign.id}
                onSelect={() => handleWelcomeSignSelect(sign.id)}
              />
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

        {calculateBackdropCost() === 0 && calculateWelcomeSignCost() === 0 && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <span className="form__info-box-icon">ℹ️</span>
              <h4 className="form__info-box-title">
                Backdrops &amp; Signs are Optional
              </h4>
            </div>
            <p className="form__info-box-text">
              You can skip this step if you don't need backdrops or welcome
              signs. Click "Next Step" to continue with centerpieces and extras.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepThree;
