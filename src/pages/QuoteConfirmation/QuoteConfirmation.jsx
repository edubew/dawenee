import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  PRICING,
  calculateTransport,
  calculateLabour,
} from "../../data/pricingData";
import "./QuoteConfirmation.scss";

function QuoteConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  // const [showPaymentOption, setPaymentOption] = useState(false);

  // If no form data, redirect to quote page
  useEffect(() => {
    if (!formData) {
      navigate("/quote");
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  // Calculate totals
  const tablesNeeded = Math.ceil(formData.guestCount / 6);

  const chairCost = formData.chairType
    ? (PRICING.chairs[formData.chairType] || 0) * formData.chairQuantity
    : 0;

  const hasTableSettings =
    formData.tableSettings &&
    Object.values(formData.tableSettings).some((val) => val === true);
  const tableCost =
    formData.chairType || hasTableSettings
      ? tablesNeeded * PRICING.tables.dressed
      : 0;

  const calculateTableSettingsCost = () => {
    let total = 0;
    const guestCount = formData.guestCount;
    const settings = formData.tableSettings || {};

    const hasFullPackage =
      settings.fullPackage ||
      (settings.napkins &&
        settings.wineGlasses &&
        settings.chargerPlates &&
        settings.tableMats &&
        settings.tableRunners &&
        settings.candles);

    if (hasFullPackage) {
      total += guestCount * PRICING.tableSettings.napkinsAndRings;
      total += guestCount * PRICING.tableSettings.wineGlasses;
      total += guestCount * PRICING.tableSettings.chargerPlates;
      total += guestCount * PRICING.tableSettings.tableMats;
      total += tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
      total += tablesNeeded * PRICING.tableSettingsPerTable.candlesAndHolders;
    } else {
      if (settings.napkins)
        total += guestCount * PRICING.tableSettings.napkinsAndRings;
      if (settings.wineGlasses)
        total += guestCount * PRICING.tableSettings.wineGlasses;
      if (settings.chargerPlates)
        total += guestCount * PRICING.tableSettings.chargerPlates;
      if (settings.tableMats)
        total += guestCount * PRICING.tableSettings.tableMats;
      if (settings.tableRunners)
        total += tablesNeeded * PRICING.tableSettingsPerTable.tableRunners;
      if (settings.candles)
        total += tablesNeeded * PRICING.tableSettingsPerTable.candlesAndHolders;
    }

    return total;
  };

  const tableSettingsCost = calculateTableSettingsCost();

  // Backdrops
  const backdropCost = (formData.backdrops || []).reduce(
    (total, backdropId) => {
      return total + (PRICING.backdrops[backdropId] || 0);
    },
    0,
  );

  // Welcome Sign
  const welcomeSignCost = formData.welcomeSign
    ? PRICING.welcomeSigns[formData.welcomeSign] || 0
    : 0;

  // Centerpieces
  const centerpieceCost = formData.centerpieceTier
    ? (PRICING.centerpieces[formData.centerpieceTier] || 0) * tablesNeeded
    : 0;

  // Extras
  const calculateExtrasCost = () => {
    let total = 0;
    const extras = formData.extras || {};

    if (extras.cakeStand) total += PRICING.extras.cakeStand;
    if (extras.dessertTable) total += PRICING.extras.dessertTable;
    if (extras.redCarpet) total += PRICING.extras.redCarpet;
    if (extras.cardBox) total += PRICING.extras.cardBox;
    if (extras.lightingPackage) total += PRICING.extras.lightingPackage;
    if (extras.individualCards && extras.cardQuantity) {
      total += PRICING.extras.individualCards * extras.cardQuantity;
    }

    return total;
  };

  const extrasCost = calculateExtrasCost();

  // Backdrop-only check
  const hasChairs = Boolean(formData.chairType);
  const hasCenterpieces = Boolean(formData.centerpieceTier);
  const hasExtras =
    formData.extras &&
    Object.values(formData.extras).some((val) => val === true);
  const hasBackdropsOrSigns =
    (formData.backdrops && formData.backdrops.length > 0) ||
    formData.welcomeSign;
  const isBackdropOnly =
    hasBackdropsOrSigns &&
    !hasChairs &&
    tableSettingsCost === 0 &&
    !hasCenterpieces &&
    !hasExtras;

  // Transport & Labour
  const hasFurniture = hasChairs;
  const transportCost = calculateTransport(
    formData.location,
    hasFurniture,
    isBackdropOnly,
  );
  const hasTableSetup = hasChairs;
  const labourCost = calculateLabour(
    formData.guestCount,
    hasTableSetup,
    isBackdropOnly,
  );

  // Totals
  const subtotal =
    chairCost +
    tableCost +
    tableSettingsCost +
    backdropCost +
    welcomeSignCost +
    centerpieceCost +
    extrasCost +
    transportCost +
    labourCost;

  const deposit = Math.round(subtotal * 0.5);

  // Generate a simple quote reference number
  const quoteRef = `DWN-${Date.now().toString().slice(-8)}`;

  // Format event date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditQuote = () => {
    navigate("/quote", { state: { formData, currentStep: 1 } });
  };

  const handlePayDeposit = () => {
    navigate("/quote/payment", {
      state: {
        formData,
        subtotal,
        deposit,
        quoteRef,
      },
    });
  };

  // const handlePayLater = () => {
  //   setShowPaymentOption(false);
  //   // Optionally show a message that quote has been saved
  // };

  const handleWhatsApp = () => {
    const message = `Hi! I just submitted a quote request on your website (Ref: ${quoteRef}). Event date: ${formData.eventDate}, Guests: ${formData.guestCount}. Looking forward to hearing from you!`;
    const whatsappUrl = `https://wa.me/254715784287?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNewQuote = () => {
    navigate("/quote");
  };

  return (
    <div className="confirmation-page">
      <Navbar />

      <main className="confirmation">
        <div className="container">
          <div className="confirmation__success">
            <div className="confirmation__success-icon">✓</div>
            <h1 className="confirmation__title">
              Quote Submitted Successfully!
            </h1>
            <p className="confirmation__subtitle">
              Thank you, <strong>{formData.name}</strong>! We've received your
              quote request.
            </p>
            <div className="confirmation__reference">
              <span className="confirmation__reference-label">
                Quote Reference:
              </span>
              <span className="confirmation__reference-number">{quoteRef}</span>
            </div>
          </div>

          {/* Payment option */}
          <div className="booking-options">
            <h2 className="booking-options__title">Secure Your Date Now</h2>
            <p className="booking-options__subtitle">
              Pay 50% deposit now to instantly book your event, or receive a
              quote via email
            </p>

            <div className="booking-cards">
              <div className="booking-card booking-card--primary">
                <div className="booking-card__badge">⚡ Instant Booking</div>
                <h3 className="booking-card__title">Pay Deposit Now</h3>
                <p className="booking-card__description">
                  Secure your event date immediately with a 50% deposit
                </p>

                <div className="booking-card__price">
                  <span className="booking-card__price-label">Total:</span>
                  <span className="booking-card__price-value">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="booking-card__deposit">
                  <span className="booking-card__deposit-label">
                    Pay Now (50%):
                  </span>
                  <span className="booking-card__deposit-value">
                    KES {deposit.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handlePayDeposit}
                  className="booking-card__button booking-card__button--primary"
                >
                  💳 Pay Deposit via M-Pesa
                </button>

                <ul className="booking-card__benefits">
                  <li>✓ Instant booking confirmation</li>
                  <li>✓ Date secured immediately</li>
                  <li>✓ No waiting for quote email</li>
                </ul>
              </div>

              {/* Option 2: Wait for quote */}
              <div className="booking-card">
                <h3 className="booking-card__title">Receive Quote via Email</h3>
                <p className="booking-card__description">
                  We'll send a detailed quote and call you to discuss
                </p>

                <div className="booking-card__timeline">
                  <div className="timeline-item">
                    <span className="timeline-item__number">1</span>
                    <span className="timeline-item__text">
                      Quote sent within 2-4 hours
                    </span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-item__number">2</span>
                    <span className="timeline-item__text">
                      We'll call to discuss details
                    </span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-item__number">3</span>
                    <span className="timeline-item__text">
                      Pay deposit to book
                    </span>
                  </div>
                </div>

                <button
                  // onClick={handlePayLater}
                  className="booking-card__button booking-card__button--secondary"
                >
                  📧 Wait for Email Quote
                </button>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          {/* <div className="confirmation__next-steps">
            <h2 className="confirmation__section-title">What Happens Next?</h2>

            <div className="next-steps-timeline">
              <div className="timeline-step">
                <div className="timeline-step__number">1</div>
                <div className="timeline-step__content">
                  <h3 className="timeline-step__title">We Review Your Quote</h3>
                  <p className="timeline-step__description">
                    Our team will review your requirements and prepare a
                    detailed quote within 1-2 hours during business hours.
                  </p>
                  <span className="timeline-step__time">Within 1-2 hours</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-step__number">2</div>
                <div className="timeline-step__content">
                  <h3 className="timeline-step__title">
                    You'll Receive Your Quote
                  </h3>
                  <p className="timeline-step__description">
                    We'll send a detailed quote and invoice to{" "}
                    <strong>{formData.email}</strong> and call you on{" "}
                    <strong>{formData.phone}</strong> to discuss details.
                  </p>
                  <span className="timeline-step__time">Same day</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-step__number">3</div>
                <div className="timeline-step__content">
                  <h3 className="timeline-step__title">
                    Book with 50% Deposit
                  </h3>
                  <p className="timeline-step__description">
                    Secure your date by paying a 50% deposit via M-Pesa. We'll
                    send payment instructions in your quote email.
                  </p>
                  <span className="timeline-step__time">When ready</span>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-step__number">4</div>
                <div className="timeline-step__content">
                  <h3 className="timeline-step__title">
                    We Prepare for Your Event
                  </h3>
                  <p className="timeline-step__description">
                    Final payment due after your event setup is complete. We'll
                    coordinate delivery, setup, and ensure everything is
                    perfect!
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="edit-quote-section">
            <h3 className="edit-quote-section__title">Need to Make Changes?</h3>
            <p className="edit-quote-section__description">
              You can edit your quote details before we process it
            </p>
            <button onClick={handleEditQuote} className="edit-quote-button">
              ✎ Edit Quote Details
            </button>
          </div>

          {/* Event Summary Card */}
          <div className="confirmation__summary">
            <h2 className="confirmation__section-title">Your Event Summary</h2>

            <div className="summary-card">
              <div className="summary-card__row">
                <span className="summary-card__label">Event Date</span>
                <span className="summary-card__value">
                  {formatDate(formData.eventDate)}
                </span>
              </div>

              <div className="summary-card__row">
                <span className="summary-card__label">Number of Guests</span>
                <span className="summary-card__value">
                  {formData.guestCount} guests
                </span>
              </div>

              <div className="summary-card__row">
                <span className="summary-card__label">Venue</span>
                <span className="summary-card__value">
                  {formData.venueName || "Not specified"}
                  {formData.location &&
                    ` (${formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi"})`}
                </span>
              </div>

              {formData.chairType && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Seating</span>
                  <span className="summary-card__value">
                    {formData.chairQuantity}{" "}
                    {formData.chairType === "dressedPlastic"
                      ? "Dressed Plastic"
                      : formData.chairType === "chiavari"
                        ? "Chiavari"
                        : "Luxe"}{" "}
                    chairs + {tablesNeeded} tables
                  </span>
                </div>
              )}

              {formData.backdrops && formData.backdrops.length > 0 && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Backdrops</span>
                  <span className="summary-card__value">
                    {formData.backdrops.length} backdrop(s) selected
                  </span>
                </div>
              )}

              {formData.centerpieceTier && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Centerpieces</span>
                  <span className="summary-card__value">
                    {formData.centerpieceTier.charAt(0).toUpperCase() +
                      formData.centerpieceTier.slice(1)}{" "}
                    tier
                  </span>
                </div>
              )}

              {formData.themeColors && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Theme Colors</span>
                  <span className="summary-card__value">
                    {formData.themeColors}
                  </span>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="summary-card__pricing">
                <h4 className="summary-card__pricing-title">
                  Pricing Breakdown
                </h4>
                {chairCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Chairs</span>
                    <span className="summary-card__value">
                      KES {chairCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {tableCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Tables</span>
                    <span className="summary-card__value">
                      KES {tableCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {tableSettingsCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Table Settings</span>
                    <span className="summary-card__value">
                      KES {tableSettingsCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {backdropCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Backdrops</span>
                    <span className="summary-card__value">
                      KES {backdropCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {welcomeSignCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Welcome Sign</span>
                    <span className="summary-card__value">
                      KES {welcomeSignCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {centerpieceCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Centerpieces</span>
                    <span className="summary-card__value">
                      KES {centerpieceCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {extrasCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Extras</span>
                    <span className="summary-card__value">
                      KES {extrasCost.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="summary-card__row summary-card__row--price">
                  <span className="summary-card__label">Transport</span>
                  <span className="summary-card__value">
                    KES {transportCost.toLocaleString()}
                  </span>
                </div>
                <div className="summary-card__row summary-card__row--price">
                  <span className="summary-card__label">Labour</span>
                  <span className="summary-card__value">
                    {labourCost > 0
                      ? `KES ${labourCost.toLocaleString()}`
                      : "Included ✓"}
                  </span>
                </div>

                <div className="summary-card__row summary-card__row--total">
                  <span className="summary-card__label">Total</span>
                  <span className="summary-card__value">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Actions */}
          {/* <div className="confirmation__actions">
            <h2 className="confirmation__section-title">Need Help?</h2>

            <div className="contact-grid">
              <button
                onClick={handleWhatsApp}
                className="contact-card contact-card--whatsapp"
              >
                <div className="contact-card__icon">💬</div>
                <h3 className="contact-card__title">WhatsApp Us</h3>
                <p className="contact-card__description">
                  Get instant support on WhatsApp
                </p>
                <span className="contact-card__cta">Chat Now →</span>
              </button>

              <a
                href="tel:+254715784287"
                className="contact-card contact-card--phone"
              >
                <div className="contact-card__icon">📞</div>
                <h3 className="contact-card__title">Call Us</h3>
                <p className="contact-card__description">0715 784 287</p>
                <span className="contact-card__cta">Call Now →</span>
              </a>

              <a
                href="mailto:info@daweneedecor.com"
                className="contact-card contact-card--email"
              >
                <div className="contact-card__icon">✉️</div>
                <h3 className="contact-card__title">Email Us</h3>
                <p className="contact-card__description">
                  info@daweneedecor.com
                </p>
                <span className="contact-card__cta">Send Email →</span>
              </a>

              <button
                onClick={handlePrint}
                className="contact-card contact-card--print"
              >
                <div className="contact-card__icon">🖨️</div>
                <h3 className="contact-card__title">Print Quote</h3>
                <p className="contact-card__description">
                  Save this page as PDF
                </p>
                <span className="contact-card__cta">Print →</span>
              </button>
            </div>
          </div> */}
          <div className="quick-contact">
            <h3 className="quick-contact__title">Need Help?</h3>
            <div className="quick-contact__buttons">
              <button
                onClick={handleWhatsApp}
                className="quick-contact__btn quick-contact__btn--whatsapp"
              >
                💬 WhatsApp
              </button>
              <a
                href="tel:+254715784287"
                className="quick-contact__btn quick-contact__btn--phone"
              >
                📞 Call Us
              </a>
              <a
                href="mailto:info@daweneedecor.com"
                className="quick-contact__btn quick-contact__btn--email"
              >
                ✉️ Email
              </a>
            </div>
          </div>

          {/* Business Hours */}
          {/* <div className="confirmation__info">
            <div className="info-box">
              <h3 className="info-box__title">⏰ Business Hours</h3>
              <p className="info-box__text">
                Monday - Sunday: 8:00 AM - 7:00 PM
              </p>
              <p className="info-box__note">
                Quotes submitted outside business hours will be processed the
                next business day.
              </p>
            </div>
          </div> */}

          {/* Bottom Actions */}
          <div className="confirmation__bottom-actions">
            <button
              onClick={() => navigate("/")}
              className="bottom-action bottom-action--secondary"
            >
              ← Back to Homepage
            </button>
            <button
              onClick={handleNewQuote}
              className="bottom-action bottom-action--primary"
            >
              Get Another Quote →
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default QuoteConfirmation;
