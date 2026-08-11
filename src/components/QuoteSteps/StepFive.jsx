import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { calculateQuote, formatQuoteDetails } from "../../data/pricingData";

function StepFive({ formData, setFormData, tablesNeeded, onValidate }) {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\s/g, "");
    return /^(\+?254|0)?[17]\d{8}$/.test(cleaned);
  };

  const formValidation = useMemo(() => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid Kenyan phone number";
    }
    if (!formData.email) {
      errors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!termsAccepted) {
      errors.terms = "You must accept the terms and conditions";
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  }, [formData.name, formData.phone, formData.email, termsAccepted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setValidationErrors(formValidation.errors);
  }, [formValidation]);

  useEffect(() => {
    if (onValidate) {
      onValidate(formValidation.isValid);
    }
  }, [formValidation, onValidate]);

  // Send quote via EmailJS — pricing now comes from the SAME
  // calculateQuote() the sidebar uses, so the email can never
  // drift out of sync with what the customer saw on screen.
  const handleSubmit = async () => {
    if (!formValidation.isValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmittingQuote(true);

    try {
      const quote = calculateQuote(formData, tablesNeeded);
      const details = formatQuoteDetails(formData, quote);
      const quoteRef = `DWN-${Date.now().toString().slice(-6)}`;

      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const templateParams = {
        quote_ref: quoteRef,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        event_date: formData.eventDate,
        guest_count: formData.guestCount,
        venue_name: formData.venueName || "Not specified",
        location:
          formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi",
        chair_details: details.chairDetails,
        table_count: quote.tablesNeeded,
        table_settings: details.tableSettingsDetails,
        backdrops: details.backdropsDetails,
        welcome_sign: details.welcomeSignDetails,
        centerpieces: details.centerpieceDetails,
        extras: details.extrasDetails,
        theme_colors: formData.themeColors || "Not specified",
        special_requests: formData.specialRequests || "None",
        subtotal: quote.subtotal.toLocaleString(),
        deposit: quote.deposit.toLocaleString(),
        balance: quote.balance.toLocaleString(),
        transport: quote.transportCost.toLocaleString(),
        labour: quote.labourCost.toLocaleString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID,
        templateParams,
      );

      navigate("/quote/confirmation", { state: { formData } });
    } catch (error) {
      console.error("Error sending quote:", error);
      alert(
        "There was an issue submitting your quote. Please try again or contact us via WhatsApp.",
      );
    } finally {
      setIsSubmittingQuote(false);
    }
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
            placeholder="e.g., Jane Wanjiru"
            className={`form__input ${validationErrors.name ? "form__input--error" : ""}`}
            required
          />
          {validationErrors.name && (
            <span className="form__error">{validationErrors.name}</span>
          )}
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
            className={`form__input ${validationErrors.phone ? "form__input--error" : ""}`}
            required
          />
          <span className="form__hint">
            We'll call to confirm details and arrange a consultation
          </span>
          {validationErrors.phone && (
            <span className="form__error">{validationErrors.phone}</span>
          )}
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
            className={`form__input ${validationErrors.email ? "form__input--error" : ""}`}
            required
          />
          <span className="form__hint">
            We'll send your detailed quote and invoice here
          </span>
          {validationErrors.email && (
            <span className="form__error">{validationErrors.email}</span>
          )}
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

            <div id="terms-content" className="terms-content">
              <h3>Terms &amp; Conditions</h3>
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
            disabled={!formValidation.isValid || isSubmittingQuote}
            className="submit-quote-button"
          >
            {isSubmittingQuote ? (
              <>
                <span className="button-spinner"></span>
                Sending Quote...
              </>
            ) : formValidation.isValid ? (
              "✓ Submit Quote Request →"
            ) : (
              "⚠ Please fill required fields"
            )}
          </button>
          {!formValidation.isValid && (
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
