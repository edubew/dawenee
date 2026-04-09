import React, { useState, useMemo, useEffect } from "react";
import "./StepFive.scss";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function StepFive({ formData, setFormData }) {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  //Form validations
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\s/g, "");
    const re = /^(\+?254|0)?[17]\d{8}$/;
    return re.test(cleaned);
  };

  const isFormValid = useMemo(() => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValidationErrors(isFormValid.errors);
  }, [isFormValid]);


  // Calculate quote details for email
  const calculateQuoteDetails = () => {
    const tablesNeeded = Math.ceil(formData.guestCount / 6);

    // Chair cost
    const chairPrices = {
      dressedPlastic: 100,
      chiavari: 250,
      luxe: 450,
    };
    const chairCost = formData.chairType
      ? chairPrices[formData.chairType] * formData.chairQuantity
      : 0;

    // Tables cost
    const tableCost =
      formData.chairType || hasTableSettings() ? tablesNeeded * 700 : 0;

    // Table settings
    const perGuestSettings = [
      "napkins",
      "wineGlasses",
      "chargerPlates",
      "tableMats",
    ];
    const perTableSettings = ["tableRunners", "candles"];

    let tableSettingsCost = 0;
    if (formData.tableSettings.fullPackage) {
      tableSettingsCost = 240 * formData.guestCount + 260 * tablesNeeded;
    } else {
      perGuestSettings.forEach((item) => {
        if (formData.tableSettings[item]) {
          const prices = {
            napkins: 70,
            wineGlasses: 80,
            chargerPlates: 100,
            tableMats: 80,
          };
          tableSettingsCost += prices[item] * formData.guestCount;
        }
      });
      perTableSettings.forEach((item) => {
        if (formData.tableSettings[item]) {
          const prices = { tableRunners: 200, candles: 60 };
          tableSettingsCost += prices[item] * tablesNeeded;
        }
      });
    }

    // Backdrops
    const backdropPrices = {
      basicBalloon: 8500,
      floral: 14000,
      draped: 12000,
      shimmerWall: 15000,
    };
    const backdropCost = formData.backdrops.reduce(
      (sum, backdrop) => sum + (backdropPrices[backdrop] || 0),
      0,
    );

    // Welcome sign
    const welcomeSignPrices = { floral: 6500, balloon: 5500 };
    const welcomeSignCost = formData.welcomeSign
      ? welcomeSignPrices[formData.welcomeSign] || 0
      : 0;

    // Centerpieces
    const centerpiecePrices = { basic: 800, premium: 1500, luxury: 2500 };
    const centerpieceCost = formData.centerpieceTier
      ? centerpiecePrices[formData.centerpieceTier] * tablesNeeded
      : 0;

    // Extras
    const extraPrices = {
      cakeStand: 1800,
      dessertTable: 5000,
      redCarpet: 5000,
      individualCards: 120,
      lightingPackage: 5000,
    };

    let extrasCost = 0;
    Object.keys(formData.extras).forEach((extra) => {
      if (formData.extras[extra] && extra !== "cardQuantity") {
        if (extra === "individualCards") {
          extrasCost +=
            extraPrices[extra] * (formData.extras.cardQuantity || 0);
        } else {
          extrasCost += extraPrices[extra] || 0;
        }
      }
    });

    // Transport & Labour
    const hasBackdropsOrSigns = backdropCost > 0 || welcomeSignCost > 0;
    const hasFurniture = chairCost > 0 || tableCost > 0;
    const isBackdropOnly =
      hasBackdropsOrSigns &&
      !hasFurniture &&
      tableSettingsCost === 0 &&
      centerpieceCost === 0 &&
      extrasCost === 0;

    let transport = 0;
    if (isBackdropOnly) {
      transport = 1000;
    } else if (formData.location === "nairobi") {
      transport = hasFurniture ? 3000 : 2000;
    } else {
      transport = hasFurniture ? 4000 : 3000;
    }

    const labour = isBackdropOnly ? 0 : formData.guestCount < 50 ? 3000 : 4500;

    const subtotal =
      chairCost +
      tableCost +
      tableSettingsCost +
      backdropCost +
      welcomeSignCost +
      centerpieceCost +
      extrasCost +
      transport +
      labour;

    const deposit = Math.round(subtotal * 0.5);

    return {
      chairCost,
      tableCost,
      tableSettingsCost,
      backdropCost,
      welcomeSignCost,
      centerpieceCost,
      extrasCost,
      transport,
      labour,
      subtotal,
      deposit,
      tablesNeeded,
    };
  };

  const hasTableSettings = () => {
    return Object.values(formData.tableSettings).some((val) => val === true);
  };

  // Format details for email
  const formatQuoteDetails = () => {
    const costs = calculateQuoteDetails();

    let chairDetails = formData.chairType
      ? `${formData.chairQuantity}x ${formData.chairType} chairs (KES ${costs.chairCost.toLocaleString()})`
      : "None";

    let tableSettingsDetails = "None";
    if (formData.tableSettings.fullPackage) {
      tableSettingsDetails = "Full Package";
    } else if (hasTableSettings()) {
      const selected = [];
      if (formData.tableSettings.napkins) selected.push("Napkins & Rings");
      if (formData.tableSettings.wineGlasses) selected.push("Wine Glasses");
      if (formData.tableSettings.chargerPlates) selected.push("Charger Plates");
      if (formData.tableSettings.tableMats) selected.push("Table Mats");
      if (formData.tableSettings.tableRunners) selected.push("Table Runners");
      if (formData.tableSettings.candles) selected.push("Candles & Holders");
      tableSettingsDetails = selected.join(", ");
    }

    const backdropNames = {
      basicBalloon: "Basic Balloon Backdrop",
      floral: "Floral Backdrop",
      draped: "Draped Fabric Backdrop",
      shimmerWall: "Shimmer Wall Backdrop",
    };
    const backdropsDetails =
      formData.backdrops.length > 0
        ? formData.backdrops.map((b) => backdropNames[b]).join(", ")
        : "None";

    const welcomeSignNames = {
      floral: "Floral Welcome Sign",
      balloon: "Balloon Welcome Sign",
    };
    const welcomeSignDetails = formData.welcomeSign
      ? welcomeSignNames[formData.welcomeSign]
      : "None";

    const centerpieceNames = {
      basic: "Basic",
      premium: "Premium",
      luxury: "Luxury",
    };
    const centerpieceDetails = formData.centerpieceTier
      ? `${centerpieceNames[formData.centerpieceTier]} - ${costs.tablesNeeded} tables`
      : "None";

    const extrasSelected = [];
    if (formData.extras.cakeStand) extrasSelected.push("Elegant Cake Stand");
    if (formData.extras.dessertTable)
      extrasSelected.push("Dessert Table Setup");
    if (formData.extras.redCarpet) extrasSelected.push("Red Carpet Runner");
    if (formData.extras.cardBox) extrasSelected.push("Decorative Card Box");
    if (formData.extras.individualCards)
      extrasSelected.push(
        `Individual Cards (${formData.extras.cardQuantity || 0})`,
      );
    if (formData.extras.lightingPackage)
      extrasSelected.push("Uplighting Package");
    const extrasDetails =
      extrasSelected.length > 0 ? extrasSelected.join(", ") : "None";

    return {
      chairDetails,
      tableSettingsDetails,
      backdropsDetails,
      welcomeSignDetails,
      centerpieceDetails,
      extrasDetails,
      ...costs,
    };
  };

  // Send quote via EmailJS
  const handleSubmit = async () => {
    if (!isFormValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmittingQuote(true);

    try {
      const quoteDetails = formatQuoteDetails();
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
        chair_details: quoteDetails.chairDetails,
        table_count: quoteDetails.tablesNeeded,
        table_settings: quoteDetails.tableSettingsDetails,
        backdrops: quoteDetails.backdropsDetails,
        welcome_sign: quoteDetails.welcomeSignDetails,
        centerpieces: quoteDetails.centerpieceDetails,
        extras: quoteDetails.extrasDetails,
        theme_colors: formData.themeColors || "Not specified",
        special_requests: formData.specialRequests || "None",
        subtotal: quoteDetails.subtotal.toLocaleString(),
        deposit: quoteDetails.deposit.toLocaleString(),
        balance: (
          quoteDetails.subtotal - quoteDetails.deposit
        ).toLocaleString(),
        transport: quoteDetails.transport.toLocaleString(),
        labour: quoteDetails.labour.toLocaleString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID,
        templateParams,
      );

      // Navigate to confirmation
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
            placeholder="e.g., Dawenee Decor"
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

            <div id="terms-content" className="terms-content">
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
            disabled={!isFormValid || isSubmittingQuote}
            className="submit-quote-button"
          >
            {isSubmittingQuote ? (
              <>
                <span className="button-spinner"></span>
                Sending Quote...
              </>
            ) : isFormValid ? (
              "✓ Submit Quote Request →"
            ) : (
              "⚠ Please fill required fields"
            )} 
          </button>
          {!isFormValid.isValid && (
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
