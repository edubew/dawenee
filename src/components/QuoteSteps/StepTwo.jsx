import React from "react";
import ChairCard from "./ChairCard";
import { PRICING } from "../../data/pricingData";
import plasticDressed from "../../assets/images/seats/plasticDressed.jpg";
import chiavariSeat from "../../assets/images/seats/chiavariSeat.jpg";
import luxeSeat from "../../assets/images/seats/luxeSeat.jpg";
import "../../pages/Quote/Quote.scss";

const chairOptions = [
  {
    id: "dressedPlastic",
    name: "Dressed Plastic Chairs",
    price: PRICING.chairs.dressedPlastic,
    description: "Classic white plastic chairs with elegant fabric covers",
    image: plasticDressed,
    popular: true,
  },
  {
    id: "chiavari",
    name: "Chiavari Chairs",
    price: PRICING.chairs.chiavari,
    description: "Elegant chiavari chairs, perfect for upscale events",
    image: chiavariSeat,
    popular: false,
  },
  {
    id: "luxe",
    name: "Luxe Chairs",
    price: PRICING.chairs.luxe,
    description: "Premium luxury seating for sophisticated celebrations",
    image: luxeSeat,
    popular: false,
  },
];

function StepTwo({ formData, setFormData, tablesNeeded }) {
  const calculateChairCost = () => {
    if (!formData.chairTpye) return 0;
    const pricePerChair = PRICING.chairs[formData.chairTpye] || 0;
    return pricePerChair * formData.chairQuantity;
  };

  const calculateTableCost = () => {
    return tablesNeeded * PRICING.tables.dressed;
  };

  const handleChairSelect = (chairId) => {
    setFormData((prev) => ({
      ...prev,
      chairTpye: chairId,
      chairQuantity: prev.guestCount,
    }));
  };

  const handleChairQuantityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      chairQuantity: parseInt(e.target.value) || 0,
    }));
  };

  return (
    <div className="step">
      <h2 className="step__title">Step 2: Seating & Tables</h2>
      <p className="step__description">
        Select the chair style that matches your event aesthetic
      </p>

      <div className="form">
        <div className="form__group">
          <label className="form__label">
            Chair Type <span className="form__required">*</span>
          </label>

          <div className="chair-selector">
            {chairOptions.map((chair) => (
              <ChairCard
                key={chair.id}
                chair={chair}
                isSelected={formData.chairTpye === chair.id}
                onSelect={handleChairSelect}
              />
            ))}
          </div>
        </div>

        {formData.chairTpye && (
          <div className="form__group">
            <label htmlFor="chairQuantity" className="form__label">
              Number of Chairs
            </label>
            <input
              type="number"
              id="chairQuantity"
              name="chairQuantity"
              min="0"
              max="1000"
              value={formData.chairQuantity}
              onChange={handleChairQuantityChange}
              className="form__input"
            />
            <span className="form__hint">
              Auto-filled based on {formData.guestCount} guests. Adjust if
              needed.
            </span>

            <div className="form__calculation">
              <span className="form__calculation-icon">💰</span>
              <span className="form__calculation-text">
                Chair cost:{" "}
                <strong>KES {calculateChairCost().toLocaleString()}</strong>
              </span>
            </div>
          </div>
        )}

        {formData.chairTpye && (
          <div className="form__group">
            <div className="form__info-box">
              <div className="form__info-box-header">
                <h4 className="form__info-box-title">Tables Included</h4>
              </div>
              <p className="form__info-box-text">
                <strong>{tablesNeeded} dressed tables</strong> are automatically
                included with your chair selection (KES{" "}
                {PRICING.tables.dressed.toLocaleString()} per table).
              </p>
              <div className="form__calculation">
                <span className="form__calculation-icon">💰</span>
                <span className="form__calculation-text">
                  Table cost:{" "}
                  <strong>KES {calculateTableCost().toLocaleString()}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {formData.chairTpye && (
          <div className="step__total">
            <span className="step__total-label">Seating & Tables Total:</span>
            <span className="step__total-amount">
              KES{" "}
              {(calculateChairCost() + calculateTableCost()).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepTwo;
