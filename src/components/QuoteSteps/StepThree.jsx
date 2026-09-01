import React from "react";
import OptionCard from "../QuoteSteps/OptionCard";
import { PRICING } from "../../data/pricingData";

import balloonBackdrop from "../../assets/images/backdrops/balloonBackdrop.jpg";
import doubleBackdrop from "../../assets/images/backdrops/doubleBackdrop.jpg";
import floralBackdrop from "../../assets/images/backdrops/floralBackdrop.jpg";
import floralBalloon from "../../assets/images/backdrops/floralBalloon.jpg";
import shimmerBackdrop from "../../assets/images/backdrops/shimmer.jpg";
import floralSign from "../../assets/images/backdrops/floralSign.png";
import balloonSign from "../../assets/images/backdrops/balloonSign.jpg";

import "../../pages/Quote/Quote.scss";

const backdropOptions = [
  {
    id: "singleBalloon",
    name: "Single + Balloon",
    price: PRICING.backdrops.singleBalloon,
    description:
      "A beautiful single backdrop paired with a balloon installation.",
    image: balloonBackdrop,
    popular: true,
  },
  {
    id: "doubleBalloon",
    name: "Double + Balloon",
    price: PRICING.backdrops.doubleBalloon,
    description:
      "A fuller two-backdrop installation with a statement balloon arrangement.",
    image: doubleBackdrop,
    popular: false,
  },
  {
    id: "floral",
    name: "Floral Backdrop",
    price: PRICING.backdrops.floral,
    description:
      "An elegant floral backdrop for a softer, more romantic atmosphere.",
    image: floralBackdrop,
    popular: false,
  },
  {
    id: "floralBalloon",
    name: "Floral + Balloon",
    price: PRICING.backdrops.floralBalloon,
    description:
      "A beautiful combination of florals and balloons for a layered look.",
    image: floralBalloon,
    popular: false,
  },
  {
    id: "shimmerWall",
    name: "Shimmer Wall",
    price: PRICING.backdrops.shimmerWall,
    description:
      "A statement shimmer wall that catches the light beautifully in photos.",
    image: shimmerBackdrop,
    popular: false,
  },
];

const welcomeSignOptions = [
  {
    id: "balloon",
    name: "Balloon Welcome Sign",
    price: PRICING.welcomeSigns.balloon,
    description:
      "A welcoming balloon installation paired with personalised signage.",
    image: balloonSign,
    popular: true,
  },
  {
    id: "floral",
    name: "Floral + Balloon Welcome Sign",
    price: PRICING.welcomeSigns.floral,
    description:
      "A more elaborate welcome display combining florals, balloons and signage.",
    image: floralSign,
    popular: false,
  },
];

function StepThree({ formData, setFormData }) {
  const selectedBackdrop = formData.backdrops?.[0] || "";

  const calculateBackdropCost = () => {
    if (!selectedBackdrop) return 0;

    return PRICING.backdrops[selectedBackdrop] || 0;
  };

  const calculateWelcomeSignCost = () => {
    if (!formData.welcomeSign) return 0;

    return PRICING.welcomeSigns[formData.welcomeSign] || 0;
  };

  const handleBackdropSelect = (backdropId) => {
    setFormData((prev) => {
      const isSame = prev.backdrops?.[0] === backdropId;

      return {
        ...prev,
        backdrops: isSame ? [] : [backdropId],
      };
    });
  };

  const handleCustomBackdropSelect = () => {
    setFormData((prev) => ({
      ...prev,
      backdrops: [],
      customBackdropRequest: !prev.customBackdropRequest,
    }));
  };

  const handleWelcomeSignSelect = (signId) => {
    setFormData((prev) => ({
      ...prev,
      welcomeSign: prev.welcomeSign === signId ? "" : signId,
    }));
  };

  const backdropCost = calculateBackdropCost();
  const welcomeSignCost = calculateWelcomeSignCost();

  const hasBackdrop =
    Boolean(selectedBackdrop) || Boolean(formData.customBackdropRequest);

  return (
    <div>
      <h2 className="step__title">Step 3: Backdrops &amp; Welcome Signage</h2>

      <p className="step__description">
        Create the perfect photo moment and welcome your guests in style
      </p>

      <div className="form">
        {/* BACKDROPS */}
        <div className="form__group">
          <label className="form__label">Choose Your Backdrop</label>

          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Choose a style below, or tell us what you have in mind if you want
            something customised.
          </p>

          <div className="option-grid option-grid--two-col">
            {backdropOptions.map((backdrop) => (
              <OptionCard
                key={backdrop.id}
                name={backdrop.name}
                description={backdrop.description}
                image={backdrop.image}
                price={backdrop.price}
                priceSuffix="starting from"
                popular={backdrop.popular}
                isSelected={selectedBackdrop === backdrop.id}
                onSelect={() => handleBackdropSelect(backdrop.id)}
              />
            ))}

            {/* CUSTOM OPTION */}
            <button
              type="button"
              onClick={handleCustomBackdropSelect}
              className={`option-card option-card--custom ${
                formData.customBackdropRequest ? "option-card--selected" : ""
              }`}
              aria-pressed={Boolean(formData.customBackdropRequest)}
            >
              {formData.customBackdropRequest && (
                <span className="option-card__selected-indicator">✓</span>
              )}

              <h3 className="option-card__name">Something Else in Mind?</h3>

              <p className="option-card__description">
                Have a theme, idea or installation you'd love us to create? Tell
                us about it.
              </p>

              <div className="option-card__custom-label">Custom request</div>
            </button>
          </div>

          {/* CUSTOM REQUEST */}
          {formData.customBackdropRequest && (
            <div className="custom-request">
              <label htmlFor="customBackdropDetails" className="form__label">
                Tell us what you're envisioning
              </label>

              <p className="form__hint">
                It can be a Pinterest inspiration, a theme, colours, a specific
                installation, or simply an idea you have.
              </p>

              <textarea
                id="customBackdropDetails"
                name="customBackdropDetails"
                value={formData.customBackdropDetails || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customBackdropDetails: e.target.value,
                  }))
                }
                className="form__textarea"
                placeholder="e.g. I would love a pink and white princess-themed backdrop with lots of balloons and florals..."
                rows={4}
              />

              <div className="form__info-box">
                <div className="form__info-box-header">
                  <h4 className="form__info-box-title">
                    Don't see exactly what you want?
                  </h4>
                </div>

                <p className="form__info-box-text">
                  That's okay. Dawenee is happy to explore ideas outside our
                  standard catalogue. We'll review your request and confirm the
                  pricing with you.
                </p>
              </div>
            </div>
          )}

          {/* SELECTED BACKDROP COST */}
          {backdropCost > 0 && (
            <div className="form__calculation">
              <span className="form__calculation-text">
                Backdrop:
                <strong> KES {backdropCost.toLocaleString()}</strong>
              </span>
            </div>
          )}

          {formData.customBackdropRequest && (
            <div className="form__calculation form__calculation--review">
              <span className="form__calculation-text">
                Custom backdrop request:
                <strong> Pricing to be confirmed</strong>
              </span>
            </div>
          )}
        </div>

        {/* WELCOME SIGNAGE */}
        <div className="form__group">
          <label className="form__label">
            Welcome Signage <span className="form__optional">(Optional)</span>
          </label>

          <p className="form__hint" style={{ marginBottom: "1rem" }}>
            Give your guests a beautiful first impression as they arrive.
          </p>

          <div className="option-grid option-grid--two-col">
            {welcomeSignOptions.map((sign) => (
              <OptionCard
                key={sign.id}
                name={sign.name}
                description={sign.description}
                image={sign.image}
                price={sign.price}
                priceSuffix="starting from"
                popular={sign.popular}
                isSelected={formData.welcomeSign === sign.id}
                onSelect={() => handleWelcomeSignSelect(sign.id)}
              />
            ))}
          </div>

          {welcomeSignCost > 0 && (
            <div className="form__calculation">
              <span className="form__calculation-text">
                Welcome signage:
                <strong> KES {welcomeSignCost.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        {/* NOTHING SELECTED */}
        {!hasBackdrop && !formData.welcomeSign && (
          <div className="form__info-box">
            <div className="form__info-box-header">
              <h4 className="form__info-box-title">
                Not sure what you want yet?
              </h4>
            </div>

            <p className="form__info-box-text">
              You can skip this step and come back to it later. You can also
              choose a custom idea and let the Dawenee team help bring it to
              life.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepThree;
