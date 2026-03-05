import React from "react";
import "./StepFive.scss";

function StepFive({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        {/* What happens next */}
        <div className="form__info-box">
          <div className="form__info-box-header">
            <span className="form__info-box-icon">📋</span>
            <h4 className="form__info-box-title">What Happens Next?</h4>
          </div>
          <div className="next-steps">
            <div className="next-step">
              <span className="next-step__number">1</span>
              <div className="next-step__content">
                <h5 className="next-step__title">Review Your Quote</h5>
                <p className="next-step__description">
                  See a complete breakdown of all items and pricing
                </p>
              </div>
            </div>

            <div className="next-step">
              <span className="next-step__number">2</span>
              <div className="next-step__content">
                <h5 className="next-step__title">We'll Contact You</h5>
                <p className="next-step__description">
                  Our team will call within 24 hours to discuss details
                </p>
              </div>
            </div>

            <div className="next-step">
              <span className="next-step__number">3</span>
              <div className="next-step__content">
                <h5 className="next-step__title">Book with 50% Deposit</h5>
                <p className="next-step__description">
                  Secure your date with a 50% deposit via M-Pesa
                </p>
              </div>
            </div>
          </div>
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
