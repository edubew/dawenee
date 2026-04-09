import React, { useEffect, useMemo } from "react";
import "./StepOne.scss";
import "../../pages/Quote/Quote.scss";

function StepOne({ formData, setFormData, tablesNeeded, onValidate }) {
  const validateStepOne = (formData) => {
    const errors = [];

    if (!formData.eventDate) {
      errors.push("Please select an event date");
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0);

      if (selectedDate < today) {
        errors.push("Event date must be in the future");
      }
    }

    if (!formData.location) {
      errors.push("Please select a location");
    }

    return errors;
  };

  const errors = useMemo(() => {
    return validateStepOne(formData);
  }, [formData]);

  // Notify parent of validation status
  useEffect(() => {
    if (onValidate) {
      onValidate(errors.length === 0);
    }
  }, [errors, onValidate]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuestCountChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      guestCount: parseInt(e.target.value),
    }));
  };

  return (
    <div className="step">
      <h2 className="step__title">Step 1: Event Details</h2>
      <p className="step__description">
        Let's start with the basics about your event so we can give you accurate
        pricing
      </p>

      <div className="form">
        <div className="form__group">
          <label htmlFor="eventDate" className="form__label">
            Event Date <span className="form__required">*</span>
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="form__input"
            min={new Date().toISOString().split("T")[0]} // Today or later
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="guestCount" className="form__label">
            Number of Guests <span className="form__required">*</span>
          </label>
          <div className="form__slider-container">
            <input
              type="range"
              id="guestCount"
              name="guestCount"
              min="1"
              max="500"
              step="3"
              value={formData.guestCount}
              onChange={handleGuestCountChange}
              className="form__slider"
            />
            <div className="form__slider-value">
              <span className="form__slider-number">{formData.guestCount}</span>
              <span className="form__slider-label">guests</span>
            </div>
          </div>

          <div className="form__calculation">
            <span className="form__calculation-icon">📋</span>
            <span className="form__calculation-text">
              Tables needed: <strong>{tablesNeeded}</strong> (6 guests per
              table)
            </span>
          </div>
        </div>

        <div className="form__group">
          <label className="form__label">
            Location <span className="form__required">*</span>
          </label>
          <div className="form__radio-group">
            <label className="form__radio">
              <input
                type="radio"
                name="location"
                value="nairobi"
                checked={formData.location === "nairobi"}
                onChange={handleChange}
              />
              <span className="form__radio-label">
                <strong>Nairobi</strong>
                <small>Within Nairobi County</small>
              </span>
            </label>

            <label className="form__radio">
              <input
                type="radio"
                name="location"
                value="outside-nairobi"
                checked={formData.location === "outside-nairobi"}
                onChange={handleChange}
              />
              <span className="form__radio-label">
                <strong>Outside Nairobi</strong>
                <small>Beyond Nairobi County</small>
              </span>
            </label>
          </div>
        </div>

        <div className="form__group">
          <label htmlFor="venueName" className="form__label">
            Venue Name <span className="form__required">*</span>
          </label>

          <input
            type="text"
            id="venueName"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            placeholder="e.g., Marula Manor, Karen Country Club"
            className="form__input"
            required
          />
          <span className="form__hint">
            Filter by venue type, select from suggestions, or enter your own
          </span>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="validation-errors">
          <div className="validation-errors__icon">⚠️</div>
          <ul className="validation-errors__list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StepOne;
