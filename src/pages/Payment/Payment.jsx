// src/pages/Payment/Payment.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
import "./Payment.scss";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, subtotal, deposit, quoteRef } = location.state || {};

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Redirect if no data
  useEffect(() => {
    if (!formData || !deposit) {
      navigate("/quote");
    }
  }, [formData, deposit, navigate]);

  if (!formData || !deposit) {
    return null;
  }

  // Pre-fill phone from formData
  useEffect(() => {
    if (formData.phone) {
      const cleaned = formData.phone.replace(/[\s-]/g, "");
      setPhoneNumber(cleaned);
    }
  }, [formData.phone]);

  const formatPhoneNumber = (phone) => {
    // Remove any non-digit characters
    let cleaned = phone.replace(/\D/g, "");

    // If starts with 0, replace with 254
    if (cleaned.startsWith("0")) {
      cleaned = "254" + cleaned.slice(1);
    }

    // If doesn't start with 254, add it
    if (!cleaned.startsWith("254")) {
      cleaned = "254" + cleaned;
    }

    return cleaned;
  };

  const handlePayNow = async () => {
    if (!phoneNumber) {
      alert("Please enter your M-Pesa phone number");
      return;
    }

    // Validate phone number
    const formatted = formatPhoneNumber(phoneNumber);
    if (formatted.length !== 12) {
      alert("Please enter a valid Kenyan phone number");
      return;
    }

    setIsProcessing(true);
    setShowInstructions(true);

    // TODO: This is where you'll integrate with your backend M-Pesa API
    // For now, we'll simulate the process

    // Simulate API call delay
    setTimeout(() => {
      // In production, you'd make an API call here like:
      // const response = await fetch('/api/mpesa/stk-push', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     phone: formatted,
      //     amount: deposit,
      //     reference: quoteRef,
      //     email: formData.email
      //   })
      // });

      // For now, navigate to success page after 3 seconds
      setTimeout(() => {
        navigate("/quote/payment-success", {
          state: {
            formData,
            subtotal,
            deposit,
            quoteRef,
            phoneNumber: formatted,
          },
        });
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/quote/confirmation", { state: { formData } });
  };

  return (
    <div className="payment-page">
      <Navbar />

      <main className="payment">
        <div className="container">
          <div className="payment__header">
            <h1 className="payment__title">Complete Your Booking</h1>
            <p className="payment__subtitle">
              Pay 50% deposit to secure your event date
            </p>
          </div>

          <div className="payment__content">
            {/* Left Column - Payment Form */}
            <div className="payment__form-section">
              <div className="payment-card">
                <h2 className="payment-card__title">M-Pesa Payment Details</h2>

                {/* Amount Display */}
                <div className="amount-display">
                  <div className="amount-display__row">
                    <span className="amount-display__label">Total Amount:</span>
                    <span className="amount-display__value">
                      KES {subtotal?.toLocaleString()}
                    </span>
                  </div>
                  <div className="amount-display__row amount-display__row--deposit">
                    <span className="amount-display__label">
                      Deposit (50%):
                    </span>
                    <span className="amount-display__value">
                      KES {deposit?.toLocaleString()}
                    </span>
                  </div>
                  <p className="amount-display__note">
                    Balance of KES {(subtotal - deposit).toLocaleString()} due
                    after your event setup is complete
                  </p>
                </div>

                {/* Phone Number Input */}
                <div className="form-group">
                  <label htmlFor="mpesa-phone" className="form-group__label">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    id="mpesa-phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., 0712 345 678"
                    className="form-group__input"
                    disabled={isProcessing}
                  />
                  <span className="form-group__hint">
                    Enter the phone number registered with M-Pesa
                  </span>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayNow}
                  disabled={isProcessing || !phoneNumber}
                  className="payment-button"
                >
                  {isProcessing ? (
                    <>
                      <span className="payment-button__spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>Pay KES {deposit?.toLocaleString()} via M-Pesa</>
                  )}
                </button>

                {/* Instructions (shown when processing) */}
                {showInstructions && (
                  <div className="payment-instructions">
                    <h3 className="payment-instructions__title">
                      Check Your Phone
                    </h3>
                    <p className="payment-instructions__text">
                      An M-Pesa payment request has been sent to{" "}
                      <strong>{phoneNumber}</strong>
                    </p>
                    <ol className="payment-instructions__steps">
                      <li>Check your phone for the M-Pesa prompt</li>
                      <li>Enter your M-Pesa PIN</li>
                      <li>Confirm the payment</li>
                      <li>Wait for confirmation</li>
                    </ol>
                    <p className="payment-instructions__note">
                      Request expires in 60 seconds
                    </p>
                  </div>
                )}

                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="cancel-button"
                  disabled={isProcessing}
                >
                  Cancel Payment
                </button>
              </div>

              {/* Security Notice */}
              <div className="security-notice">
                <div className="security-notice__icon">🔒</div>
                <p className="security-notice__text">
                  Your payment is secure. We use Safaricom's M-Pesa for safe and
                  reliable transactions.
                </p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="payment__summary-section">
              <div className="order-summary">
                <h2 className="order-summary__title">Order Summary</h2>

                <div className="order-summary__item">
                  <span className="order-summary__label">Quote Reference:</span>
                  <span className="order-summary__value">{quoteRef}</span>
                </div>

                <div className="order-summary__item">
                  <span className="order-summary__label">Event Date:</span>
                  <span className="order-summary__value">
                    {new Date(formData.eventDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="order-summary__item">
                  <span className="order-summary__label">Guests:</span>
                  <span className="order-summary__value">
                    {formData.guestCount}
                  </span>
                </div>

                <div className="order-summary__item">
                  <span className="order-summary__label">Venue:</span>
                  <span className="order-summary__value">
                    {formData.venueName || "To be confirmed"}
                  </span>
                </div>

                <div className="order-summary__divider"></div>

                <div className="order-summary__item order-summary__item--total">
                  <span className="order-summary__label">Total:</span>
                  <span className="order-summary__value">
                    KES {subtotal?.toLocaleString()}
                  </span>
                </div>

                <div className="order-summary__item order-summary__item--deposit">
                  <span className="order-summary__label">Paying Now:</span>
                  <span className="order-summary__value">
                    KES {deposit?.toLocaleString()}
                  </span>
                </div>

                <p className="order-summary__note">
                  ✓ Your date will be secured immediately after payment
                </p>
              </div>

              {/* What Happens After Payment */}
              <div className="after-payment">
                <h3 className="after-payment__title">After Payment</h3>
                <ul className="after-payment__list">
                  <li>Instant booking confirmation via SMS</li>
                  <li>Email with booking details & receipt</li>
                  <li>We'll call to finalize arrangements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
{/* 
      <Footer /> */}
    </div>
  );
}

export default Payment;
