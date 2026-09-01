import React, { useEffect, useMemo } from "react";
import "../../pages/Quote/Quote.scss";

const EVENT_TYPES = [
  {
    value: "wedding",
    label: "Wedding",
  },
  {
    value: "birthday",
    label: "Birthday",
  },
  {
    value: "graduation",
    label: "Graduation",
  },
  {
    value: "baby-shower",
    label: "Baby Shower",
  },
  {
    value: "bridal-shower",
    label: "Bridal Shower",
  },
  {
    value: "corporate",
    label: "Corporate Event",
  },
  {
    value: "other",
    label: "Something Else",
  },
];

function StepOne({ formData, setFormData, tablesNeeded, onValidate }) {
  // Validations

  const validateStepOne = (data) => {
    const errors = [];

    // Event type
    if (!data.eventType) {
      errors.push("Please tell us what type of event you're planning");
    }

    // Custom event type
    if (data.eventType === "other" && !data.eventTypeOther?.trim()) {
      errors.push("Please tell us what type of event you're planning");
    }

    // Event date
    if (!data.eventDate) {
      errors.push("Please select your event date");
    } else {
      const selectedDate = new Date(`${data.eventDate}T00:00:00`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.push("Event date must be in the future");
      }
    }

    // Guest count
    if (!data.guestCount || data.guestCount < 1) {
      errors.push("Please enter your expected number of guests");
    }

    // Location
    if (!data.location) {
      errors.push("Please tell us where your event will take place");
    }

    return errors;
  };

  const errors = useMemo(() => validateStepOne(formData), [formData]);

  //  Notify parent of validation status

  useEffect(() => {
    if (onValidate) {
      onValidate(errors.length === 0);
    }
  }, [errors, onValidate]);

  // Handlers

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventTypeChange = (eventType) => {
    setFormData((prev) => ({
      ...prev,
      eventType,
      eventTypeOther: eventType === "other" ? prev.eventTypeOther : "",
    }));
  };

  const MIN_GUESTS = 1;
  const MAX_GUESTS = 500;

  const updateGuestCount = (value) => {
    const guestCount = Math.min(
      MAX_GUESTS,
      Math.max(MIN_GUESTS, Number(value) || MIN_GUESTS),
    );

    setFormData((prev) => ({
      ...prev,
      guestCount,
    }));
  };

  const handleGuestCountChange = (event) => {
    const value = event.target.value;

    // Allow the field to be temporarily empty while typing.
    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        guestCount: "",
      }));
      return;
    }

    updateGuestCount(value);
  };

  const decrementGuestCount = () => {
    updateGuestCount(formData.guestCount - 1);
  };

  const incrementGuestCount = () => {
    updateGuestCount(formData.guestCount + 1);
  };

  return (
    <div className="quote-step">
      <div className="quote-step__intro">
        <span className="quote-step__eyebrow">Step 1 · Your event</span>

        <h2 className="quote-step__title">
          Let's start with your <em>event</em>
        </h2>

        <p className="quote-step__description">
          Tell us a little about what you're planning. We'll use this to build
          an initial estimate tailored to your event.
        </p>
      </div>

      <div className="form">
        {/* EVENT TYPE */}
        <div className="form__group">
          <label className="form__label">
            What are you celebrating?
            <span className="form__required">*</span>
          </label>

          <div className="event-type-grid">
            {EVENT_TYPES.map((event) => (
              <button
                key={event.value}
                type="button"
                className={`event-type-card ${
                  formData.eventType === event.value
                    ? "event-type-card--selected"
                    : ""
                }`}
                onClick={() => handleEventTypeChange(event.value)}
                aria-pressed={formData.eventType === event.value}
              >
                {/* <span className="event-type-card__icon">{event.icon}</span> */}

                <span className="event-type-card__label">{event.label}</span>
              </button>
            ))}
          </div>

          {formData.eventType === "other" && (
            <input
              type="text"
              id="eventTypeOther"
              name="eventTypeOther"
              value={formData.eventTypeOther || ""}
              onChange={handleChange}
              className="form__input form__input--followup"
              placeholder="What are you celebrating?"
              maxLength={80}
            />
          )}
        </div>

        {/* EVENT DATE */}
        <div className="form__group">
          <label htmlFor="eventDate" className="form__label">
            When is the big day?
            <span className="form__required">*</span>
          </label>

          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="form__input"
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <span className="form__hint">
            We'll confirm availability with you before anything is finalized.
          </span>
        </div>

        {/* GUEST COUNT */}
        {/* GUEST COUNT */}
        <div className="form__group">
          <label htmlFor="guestCount" className="form__label">
            How many guests are you expecting?
            <span className="form__required">*</span>
          </label>

          <div className="form__guest-count">
            <button
              type="button"
              className="form__guest-count-btn"
              onClick={decrementGuestCount}
              disabled={Number(formData.guestCount) <= MIN_GUESTS}
              aria-label="Decrease guest count"
            >
              −
            </button>

            <div className="form__guest-count-value">
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                min={MIN_GUESTS}
                max={MAX_GUESTS}
                value={formData.guestCount}
                onChange={handleGuestCountChange}
                onBlur={() => {
                  if (!formData.guestCount) {
                    updateGuestCount(MIN_GUESTS);
                  }
                }}
                inputMode="numeric"
                aria-describedby="guest-count-hint"
              />
              <span>guests</span>
            </div>

            <button
              type="button"
              className="form__guest-count-btn"
              onClick={incrementGuestCount}
              disabled={Number(formData.guestCount) >= MAX_GUESTS}
              aria-label="Increase guest count"
            >
              +
            </button>
          </div>

          <span id="guest-count-hint" className="form__hint">
            Enter the number of guests expected. You can adjust it using + or −.
          </span>

          <div className="form__calculation">
            <span className="form__calculation-icon">◌</span>

            <span className="form__calculation-text">
              Estimated tables needed: <strong>{tablesNeeded}</strong>
              <small> · based on 7 guests per table</small>
            </span>
          </div>
        </div>

        {/* LOCATION */}
        <div className="form__group">
          <label className="form__label">
            Where will your event take place?
            <span className="form__required">*</span>
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

        {/* VENUE */}
        <div className="form__group">
          <label htmlFor="venueName" className="form__label">
            Venue
            <span className="form__optional">Optional</span>
          </label>

          <input
            type="text"
            id="venueName"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            placeholder="e.g. Karen Country Club"
            className="form__input"
            maxLength={120}
          />

          <span className="form__hint">
            Already have a venue? Tell us where. Still deciding? You can leave
            this blank.
          </span>
        </div>

        {/* EVENT VISION */}
        <div className="form__group">
          <label htmlFor="eventVision" className="form__label">
            What are you envisioning?
            <span className="form__optional">Optional</span>
          </label>

          <textarea
            id="eventVision"
            name="eventVision"
            value={formData.eventVision || ""}
            onChange={handleChange}
            className="form__textarea"
            rows="5"
            maxLength={1000}
            placeholder="Tell us about your theme, colours, mood, florals, balloons, or anything you'd love us to create..."
          />

          <span className="form__hint">
            Not sure yet? That's completely okay. Tell us what you know and
            we'll help you build from there.
          </span>
        </div>
      </div>

      {/* VALIDATION ERRORS */}
      {errors.length > 0 && (
        <div className="validation-errors" role="alert">
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
