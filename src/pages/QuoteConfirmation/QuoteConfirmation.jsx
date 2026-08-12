import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { calculateQuote } from "../../data/pricingData";
import { saveQuoteToHistory } from "../../utils/localStorage";
import { FaWhatsapp } from "react-icons/fa";
import "./QuoteConfirmation.scss";

function QuoteConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state?.formData;

  // Keep the same reference while this confirmation page is mounted.
  const quoteRef = useMemo(() => `DWN-${Date.now().toString().slice(-6)}`, []);

  useEffect(() => {
    if (!formData) {
      navigate("/quote");
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  const tablesNeeded = Math.ceil(formData.guestCount / 6);

  // Use the SAME pricing engine used by the sidebar.
  const quote = calculateQuote(formData, tablesNeeded);

  useEffect(() => {
    saveQuoteToHistory(formData, quoteRef, quote.subtotal, quote.deposit);
  }, [formData, quoteRef, quote.subtotal, quote.deposit]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-KE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditQuote = () => {
    navigate("/quote", {
      state: {
        formData,
        currentStep: 1,
      },
    });
  };

  const handleNewQuote = () => {
    navigate("/quote");
  };

  const handleWhatsApp = () => {
    const message = `Hi Dawenee Decor! I have submitted my quote request.

Quote Reference: ${quoteRef}
Event Date: ${formatDate(formData.eventDate)}
Guests: ${formData.guestCount}
Venue: ${formData.venueName || "Not specified"}

Estimated Total: KES ${quote.subtotal.toLocaleString()}
50% Deposit: KES ${quote.deposit.toLocaleString()}

I'd like to proceed with my booking. Please confirm availability and the next steps.`;

    const whatsappUrl = `https://wa.me/254715784287?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="confirmation-page">
      <Navbar />

      <main className="confirmation">
        <div className="container">
          {/* SUCCESS */}
          <section className="confirmation__success">
            <div className="confirmation__success-icon">✓</div>

            <h1 className="confirmation__title">Your Quote Is Ready!</h1>

            <p className="confirmation__subtitle">
              Thank you, <strong>{formData.name}</strong>. Your quote has been
              prepared and your details are ready for the next step.
            </p>

            <div className="confirmation__reference">
              <span className="confirmation__reference-label">
                Quote Reference
              </span>

              <span className="confirmation__reference-number">{quoteRef}</span>
            </div>
          </section>

          {/* NEXT STEP */}
          <section className="next-step-card">
            <div className="next-step-card__icon">
              <FaWhatsapp />
            </div>

            <div className="next-step-card__content">
              <h2 className="next-step-card__title">What's Next?</h2>

              <p className="next-step-card__text">
                Your quote details have been sent to WhatsApp. Dawenee Decor
                will review your request, confirm availability, and guide you
                through the booking and payment process.
              </p>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="next-step-card__button"
              >
                <FaWhatsapp />
                Continue to WhatsApp
              </button>
            </div>
          </section>

          {/* QUICK EVENT SUMMARY */}
          <section className="confirmation__section">
            <h2 className="confirmation__section-title">Your Event</h2>

            <div className="event-summary">
              <div className="event-summary__item">
                <span className="event-summary__label">Event Date</span>

                <span className="event-summary__value">
                  {formatDate(formData.eventDate)}
                </span>
              </div>

              <div className="event-summary__item">
                <span className="event-summary__label">Guests</span>

                <span className="event-summary__value">
                  {formData.guestCount}
                </span>
              </div>

              <div className="event-summary__item">
                <span className="event-summary__label">Venue</span>

                <span className="event-summary__value">
                  {formData.venueName || "Not specified"}
                </span>
              </div>

              <div className="event-summary__item">
                <span className="event-summary__label">Location</span>

                <span className="event-summary__value">
                  {formData.location === "nairobi"
                    ? "Within Nairobi"
                    : "Outside Nairobi"}
                </span>
              </div>
            </div>
          </section>

          {/* PRICE */}
          <section className="confirmation__section">
            <h2 className="confirmation__section-title">Quote Estimate</h2>

            <div className="price-summary">
              <div className="price-summary__row">
                <span>Estimated Total</span>

                <strong>KES {quote.subtotal.toLocaleString()}</strong>
              </div>

              <div className="price-summary__row price-summary__row--deposit">
                <span>50% Deposit to Book</span>

                <strong>KES {quote.deposit.toLocaleString()}</strong>
              </div>

              <p className="price-summary__note">
                Final pricing may be adjusted after confirmation of your event
                requirements or site details.
              </p>
            </div>
          </section>

          {/* WHAT HAPPENS NEXT */}
          <section className="confirmation__section">
            <h2 className="confirmation__section-title">What Happens Next?</h2>

            <div className="process-steps">
              <div className="process-step">
                <span className="process-step__number">1</span>

                <div>
                  <h3>Quote Review</h3>
                  <p>
                    Dawenee Decor reviews your selections and event
                    requirements.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span className="process-step__number">2</span>

                <div>
                  <h3>Confirmation</h3>
                  <p>
                    We'll confirm availability and clarify any details where
                    necessary.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <span className="process-step__number">3</span>

                <div>
                  <h3>Secure Your Date</h3>
                  <p>
                    Once everything is confirmed, you'll be guided through the
                    50% deposit payment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EDIT */}
          <section className="edit-quote-section">
            <h3 className="edit-quote-section__title">
              Need to make a change?
            </h3>

            <p className="edit-quote-section__description">
              You can return to your quote and update your selections.
            </p>

            <button
              type="button"
              onClick={handleEditQuote}
              className="edit-quote-button"
            >
              ✎ Edit My Quote
            </button>
          </section>

          {/* BOTTOM ACTIONS */}
          <div className="bottom-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bottom-action bottom-action--secondary"
            >
              ← Back to Homepage
            </button>

            <button
              type="button"
              onClick={handleNewQuote}
              className="bottom-action bottom-action--primary"
            >
              Get Another Quote →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuoteConfirmation;
