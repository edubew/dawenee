import React, { useState } from "react";
import "./StepFive.scss";
import { useNavigate } from "react-router-dom";

function StepFive({ formData, setFormData }) {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate required fields
  const isFormValid = () => {
    return formData.name && formData.phone && formData.email && termsAccepted;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields and accept the terms.");
      return;
    }

    // Navigate directly to confirmation
    navigate("/quote/confirmation", { state: { formData } });
  };

  return (
    <div className="step">
      <h2 className="step__title">Your Contact Details</h2>
      <p className="step__description">
        Almost done! Just a few details so we can send you your quote and get in
        touch
      </p>

      <div className="form">
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Full Name <span className="form__required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Dawenee Decor"
            className="form__input"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="phone" className="form__label">
            Phone Number <span className="form__required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 0712 345 678"
            className="form__input"
            required
          />
          <span className="form__hint">
            We'll call to confirm details and arrange a consultation
          </span>
        </div>

        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Email Address <span className="form__required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., jane@example.com"
            className="form__input"
            required
          />
          <span className="form__hint">
            We'll send your detailed quote and invoice here
          </span>
        </div>

        <div className="form__group">
          <label htmlFor="themeColors" className="form__label">
            Theme Colors
          </label>
          <input
            type="text"
            id="themeColors"
            name="themeColors"
            value={formData.themeColors}
            onChange={handleChange}
            placeholder="e.g., Blush pink and gold, Navy and white"
            className="form__input"
          />
          <span className="form__hint">
            Help us match your event's color scheme
          </span>
        </div>

        <div className="form__group">
          <label htmlFor="specialRequests" className="form__label">
            Special Requests or Notes (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any specific requirements, preferences, or questions you'd like us to know about..."
            className="form__textarea"
            rows="5"
          />
          <span className="form__hint">
            Let us know if you have any special requirements or questions
          </span>
        </div>

        {/* Terms and conditions */}
        <div className="form__group">
          <div className="terms-section">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="terms-checkbox__text">
                I accept the{" "}
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("terms-content")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="terms-link"
                >
                  terms and conditions
                </button>
                <span className="form__required"> *</span>
              </span>
            </label>

            <div id="terms-conteent" className="terms-content">
              <h3>Terms & Conditions</h3>
              <ul>
                <li>50% deposit required to confirm booking</li>
                <li>Balance payment due after the event setup is done</li>
                <li>Cancellations made on the day of the event: No refund</li>
                <li>
                  Setup time: 2-4 hours before event (venue must be accessible)
                </li>
                <li>Setdown: The following morning after your event date</li>
                <li>
                  Damages to rented items will be charged at replacement cost
                </li>
                <li>We are not responsible for venue-related issues</li>
                <li>Final quote may be adjusted based on site visit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="form__group">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="submit-quote-button"
          >
            {isFormValid()
              ? "✓ Submit Quote Request →"
              : "⚠ Please fill required fields"}
          </button>
          {!isFormValid() && (
            <p
              className="form__hint"
              style={{
                color: "#c85a54",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              {!formData.name && "Name is required. "}
              {!formData.phone && "Phone is required. "}
              {!formData.email && "Email is required. "}
              {!termsAccepted && "Please accept terms & conditions."}
            </p>
          )}
        </div>

        <div className="privacy-notice">
          <p className="privacy-notice__text">
            🔒 Your information is secure. We'll only use it to prepare your
            quote and contact you about your event. We never share your details
            with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepFive;
