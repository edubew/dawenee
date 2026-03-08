import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./SharedQuote.scss";

function SharedQuote() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const encodedData = searchParams.get("data");
      if (encodedData) {
        const decoded = JSON.parse(decodeURIComponent(encodedData));
        setQuoteData(decoded);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error parsing quote data:", err);
      setError(true);
    }
  }, [searchParams]);

  const handleGetYourQuote = () => {
    navigate("/quote");
  };

  if (error) {
    return (
      <div className="shared-quote-page">
        <Navbar />
        <main className="shared-quote">
          <div className="container">
            <div className="error-state">
              <div className="error-state__icon">⚠️</div>
              <h1 className="error-state__title">Invalid Quote Link</h1>
              <p className="error-state__text">
                This quote link is invalid or has expired. Please request a new
                quote.
              </p>
              <button onClick={handleGetYourQuote} className="cta-button">
                Get Your Quote →
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!quoteData) {
    return (
      <div className="shared-quote-page">
        <Navbar />
        <main className="shared-quote">
          <div className="container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading quote...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="shared-quote-page">
      <Navbar />

      <main className="shared-quote">
        <div className="container">
          <div className="shared-quote__header">
            <div className="shared-quote__badge">Shared Quote</div>
            <h1 className="shared-quote__title">Event Quote Summary</h1>
            <p className="shared-quote__subtitle">
              Reference: <strong>{quoteData.ref}</strong>
            </p>
          </div>

          {/* Quote Details Card */}
          <div className="quote-card">
            <div className="quote-card__section">
              <h2 className="quote-card__section-title">Event Details</h2>

              <div className="quote-detail">
                <span className="quote-detail__label">Event Date</span>
                <span className="quote-detail__value">
                  {formatDate(quoteData.eventDate)}
                </span>
              </div>

              <div className="quote-detail">
                <span className="quote-detail__label">Number of Guests</span>
                <span className="quote-detail__value">{quoteData.guests}</span>
              </div>

              {quoteData.venue && (
                <div className="quote-detail">
                  <span className="quote-detail__label">Venue</span>
                  <span className="quote-detail__value">{quoteData.venue}</span>
                </div>
              )}
            </div>

            <div className="quote-card__section">
              <h2 className="quote-card__section-title">Pricing</h2>

              <div className="quote-detail">
                <span className="quote-detail__label">Total Amount</span>
                <span className="quote-detail__value quote-detail__value--large">
                  KES {quoteData.total?.toLocaleString()}
                </span>
              </div>

              <div className="quote-detail quote-detail--deposit">
                <span className="quote-detail__label">50% Deposit to Book</span>
                <span className="quote-detail__value quote-detail__value--deposit">
                  KES {quoteData.deposit?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="quote-card__cta">
              <p className="quote-card__cta-text">
                Love this quote? Get yours customized!
              </p>
              <button onClick={handleGetYourQuote} className="cta-button">
                Get Your Own Quote →
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <h3 className="info-box__title">💡 About This Quote</h3>
            <p className="info-box__text">
              This is a shared quote reference from Dawenee Decor & Events.
              Actual pricing may vary based on specific requirements, date
              availability, and current market rates. Get your own personalized
              quote for accurate pricing.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="contact-cta">
            <h3 className="contact-cta__title">Questions About This Quote?</h3>
            <div className="contact-cta__buttons">
              <a
                href={`https://wa.me/254715784287?text=${encodeURIComponent(`Hi! I'm viewing quote ${quoteData.ref} and have some questions.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-cta__btn contact-cta__btn--whatsapp"
              >
                💬 WhatsApp Us
              </a>
              <a
                href="tel:+254715784287"
                className="contact-cta__btn contact-cta__btn--phone"
              >
                📞 Call: 0715 784 287
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SharedQuote;
