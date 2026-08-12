import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateQuote, formatQuoteDetails } from "../../data/pricingData";

function StepFive({ formData, setFormData, tablesNeeded, onValidate }) {
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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
      errors.phone = "WhatsApp number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid Kenyan phone number";
    }

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!termsAccepted) {
      errors.terms = "Please accept the terms and conditions";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  }, [formData.name, formData.phone, formData.email, termsAccepted]);

  useEffect(() => {
    setValidationErrors(formValidation.errors);
  }, [formValidation]);

  useEffect(() => {
    if (onValidate) {
      onValidate(formValidation.isValid);
    }
  }, [formValidation, onValidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createWhatsAppMessage = () => {
    const quote = calculateQuote(formData, tablesNeeded);
    const details = formatQuoteDetails(formData, quote);

    const tentDetails = formData.tentType
      ? quote.tentRequiresReview
        ? `${details.tentDetails} — Price to be confirmed`
        : details.tentDetails
      : "None";

    const message = `
Hello! I'd like to request a quote for my event.

*EVENT DETAILS*
Date: ${formData.eventDate}
Guests: ${formData.guestCount}
Venue: ${formData.venueName || "Not specified"}
Location: ${
      formData.location === "nairobi" ? "Within Nairobi" : "Outside Nairobi"
    }

*SEATING & TABLES*
Chairs: ${details.chairDetails}
Tables: ${quote.tablesNeeded} dressed tables
Table Settings: ${details.tableSettingsDetails}

*BACKDROPS & SIGNAGE*
Backdrops: ${details.backdropsDetails}
Welcome Sign: ${details.welcomeSignDetails}

*CENTERPIECES & EXTRAS*
Centerpieces: ${details.centerpieceDetails}
Extras: ${details.extrasDetails}

*TENT*
${tentDetails}

*ESTIMATED QUOTE*
Subtotal: KES ${quote.subtotal.toLocaleString()}
50% Deposit: KES ${quote.deposit.toLocaleString()}
Balance: KES ${quote.balance.toLocaleString()}

*SERVICE FEES*
Transport: KES ${quote.transportCost.toLocaleString()}
Setup & Labour: KES ${quote.labourCost.toLocaleString()}

*CONTACT*
Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ""}

Theme Colours: ${formData.themeColors || "Not specified"}

Special Requests:
${formData.specialRequests || "None"}

I'd like to proceed with this quote and confirm availability.
    `.trim();

    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    if (!formValidation.isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const message = createWhatsAppMessage();

    /*
     * Replace this with the business WhatsApp number.
     *
     * Format:
     * 2547XXXXXXXX
     *
     * Do not include +, spaces or the leading 0.
     */
    const businessWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    if (!businessWhatsAppNumber) {
      alert("WhatsApp is not configured yet. Please contact us directly.");
      return;
    }

    const whatsappUrl = `https://wa.me/${businessWhatsAppNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    navigate("/quote/confirmation", {
      state: {
        formData,
      },
    });
  };

  return (
    <div>
      <h2 className="step__title">Let's Get in Touch</h2>

      <p className="step__description">
        Your quote is ready. Just give us your contact details and we'll
        continue the conversation on WhatsApp.
      </p>

      <div className="form">
        {/*  NAME */}
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Full Name <span className="form__required">*</span>
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="e.g., Jane Wanjiru"
            className={`form__input ${
              validationErrors.name ? "form__input--error" : ""
            }`}
            required
          />

          {validationErrors.name && (
            <span className="form__error">{validationErrors.name}</span>
          )}
        </div>

        {/*  PHONE  */}
        <div className="form__group">
          <label htmlFor="phone" className="form__label">
            WhatsApp Number <span className="form__required">*</span>
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="e.g., 0712 345 678"
            className={`form__input ${
              validationErrors.phone ? "form__input--error" : ""
            }`}
            required
          />

          <span className="form__hint">
            We'll use WhatsApp to confirm availability, pricing and any final
            details.
          </span>

          {validationErrors.phone && (
            <span className="form__error">{validationErrors.phone}</span>
          )}
        </div>

        {/*  EMAIL  */}
        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Email Address <span className="form__hint-inline">(Optional)</span>
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="e.g., jane@example.com"
            className={`form__input ${
              validationErrors.email ? "form__input--error" : ""
            }`}
          />

          <span className="form__hint">
            Optional — WhatsApp will be our main way of communicating.
          </span>

          {validationErrors.email && (
            <span className="form__error">{validationErrors.email}</span>
          )}
        </div>

        {/* THEME */}
        <div className="form__group">
          <label htmlFor="themeColors" className="form__label">
            Theme Colours
          </label>

          <input
            type="text"
            id="themeColors"
            name="themeColors"
            value={formData.themeColors || ""}
            onChange={handleChange}
            placeholder="e.g., Blush pink and gold"
            className="form__input"
          />

          <span className="form__hint">
            Optional — helps us understand your vision.
          </span>
        </div>

        {/* SPECIAL REQUESTS */}
        <div className="form__group">
          <label htmlFor="specialRequests" className="form__label">
            Special Requests{" "}
            <span className="form__hint-inline">(Optional)</span>
          </label>

          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests || ""}
            onChange={handleChange}
            placeholder="Anything else you'd like us to know?"
            className="form__textarea"
            rows="4"
          />
        </div>

        {/*  TERMS */}
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
                    document.getElementById("terms-content")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="terms-link"
                >
                  terms and conditions
                </button>
                <span className="form__required"> *</span>
              </span>
            </label>

            {validationErrors.terms && (
              <span className="form__error">{validationErrors.terms}</span>
            )}

            <div id="terms-content" className="terms-content">
              <h3>Terms &amp; Conditions</h3>

              <ul>
                <li>50% deposit is required to confirm your booking.</li>

                <li>Balance payment is due after event setup is completed.</li>

                <li>
                  Cancellations made on the day of the event are non-refundable.
                </li>

                <li>
                  Setup generally takes 2–4 hours before the event. The venue
                  must be accessible.
                </li>

                <li>
                  Setdown is scheduled for the following morning after the
                  event.
                </li>

                <li>
                  Damaged rented items may be charged at replacement cost.
                </li>

                <li>
                  Final pricing may be adjusted after site assessment or
                  confirmation of requirements.
                </li>

                <li>
                  Tent pricing is subject to availability and confirmation.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== WHATSAPP CTA ==================== */}
        <div className="form__group">
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={!formValidation.isValid}
            className="submit-quote-button"
          >
            {formValidation.isValid
              ? "Continue to WhatsApp →"
              : "⚠ Please complete the required fields"}
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
              {!formData.phone && "WhatsApp number is required. "}
              {!termsAccepted && "Please accept the terms & conditions."}
            </p>
          )}
        </div>

        <div className="privacy-notice">
          <p className="privacy-notice__text">
            🔒 Your information is only used to prepare your quote and
            communicate with you about your event.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StepFive;
