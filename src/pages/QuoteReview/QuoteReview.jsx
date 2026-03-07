import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import QuoteSummary from "../../components/QuoteSteps/QuoteSummary";
import "./QuoteReview.scss";
import { useLocation, useNavigate } from "react-router-dom";

function QuoteReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const [termsAccepted, setTermsAccepted] = useState(false);

  // If no form data, redirect back to calculator
  if (!formData) {
    navigate("/quote");
    return null;
  }

  const tablesNeeded = Math.ceil(formData.guestCount / 6);

  const handleEditSection = (step) => {
    navigate("/quote", { state: { formData, currentStep: step } });
  };

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }

    navigate("/quote/confirmation", { state: { formData } });
  };

  return (
    <div className="quote-review-page">
      <Navbar />

      <main className="quote-review">
        <div className="container">
          <div className="quote-review__header">
            <h1 className="quote-review__title">Review Your Quote</h1>
            <p className="quote-review__subtitle">
              Please review all details below. You can edit any section before
              submitting.
            </p>
          </div>

          <div className="quote-review__content">
            {/* Left column - editable sections */}
            <div className="quote-review__sections">
              <div className="review-section">
                <div className="review-section__header">
                  <h2 className="review-section__title">Event Details</h2>
                  <button
                    onClick={() => handleEditSection(1)}
                    className="review-section__edit-btn"
                  >
                    ✎ Edit
                  </button>
                </div>
                <div className="review-section__content">
                  <div className="detail-row">
                    <span className="detail-row__label">Event Date:</span>
                    <span className="detail-row__value">
                      {formData.eventDate || "Not selected"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Number of Guests:</span>
                    <span className="detail-row__value">
                      {formData.guestCount}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Venue:</span>
                    <span className="detail-row__value">
                      {formData.venueName || "Not specified"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Location:</span>
                    <span className="detail-row__value">
                      {formData.location === "nairobi"
                        ? "Within Nairobi"
                        : "Outside Nairobi"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seating and tables section */}
              {(formData.chairType ||
                (formData.tableSettings &&
                  Object.values(formData.tableSettings).some(
                    (val) => val === true,
                  ))) && (
                <div className="review-section">
                  <div className="review-section__header">
                    <h2 className="review-section__title">Seating & Tables</h2>
                    <button
                      onClick={() => handleEditSection(2)}
                      className="review-section__edit-btn"
                    >
                      ✎ Edit
                    </button>
                  </div>
                  <div className="review-section__content">
                    {formData.chairType && (
                      <div className="detail-row">
                        <span className="detail-row__label">
                          Chairs Selected:
                        </span>
                        <span className="detail-row__value">
                          {formData.chairQuantity}×{" "}
                          {formData.chairType === "dressedPlastic"
                            ? "Dressed Plastic"
                            : formData.chairType === "chiavari"
                              ? "Chiavari"
                              : "Luxe"}
                        </span>
                      </div>
                    )}
                    {(formData.chairType ||
                      (formData.tableSettings &&
                        Object.values(formData.tableSettings).some(
                          (val) => val === true,
                        ))) && (
                      <div className="detail-row">
                        <span className="detail-row__label">Tables:</span>
                        <span className="detail-row__value">
                          {tablesNeeded} dressed tables
                        </span>
                      </div>
                    )}
                    {formData.tableSettings?.fullPackage && (
                      <div className="detail-row">
                        <span className="detail-row__label">
                          Table Settings:
                        </span>
                        <span className="detail-row__value">Full Package</span>
                      </div>
                    )}
                    {!formData.tableSettings?.fullPackage &&
                      formData.tableSettings &&
                      Object.values(formData.tableSettings).some(
                        (val) => val === true,
                      ) && (
                        <div className="detail-row">
                          <span className="detail-row__label">
                            Table Settings:
                          </span>
                          <span className="detail-row__value">
                            Custom Selection
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Backdrops and Signage section */}
              {((formData.backdrops && formData.backdrops.length > 0) ||
                formData.welcomeSign) && (
                <div className="review-section">
                  <div className="review-section__header">
                    <h2 className="review-section__title">
                      Backdrops & Signage
                    </h2>
                    <button
                      onClick={() => handleEditSection(3)}
                      className="review-section__edit-btn"
                    >
                      ✎ Edit
                    </button>
                  </div>
                  <div className="review-section__content">
                    {formData.backdrops && formData.backdrops.length > 0 && (
                      <div className="detail-row">
                        <span className="detail-row__label">Backdrops:</span>
                        <span className="detail-row__value">
                          {formData.backdrops.length} selected
                        </span>
                      </div>
                    )}
                    {formData.welcomeSign && (
                      <div className="detail-row">
                        <span className="detail-row__label">Welcome Sign:</span>
                        <span className="detail-row__value">
                          {formData.welcomeSign === "floral"
                            ? "Floral"
                            : "Balloon"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Centerpieces & Extras Section */}
              {(formData.centerpieceTier ||
                (formData.extras &&
                  Object.values(formData.extras).some(
                    (val) => val === true,
                  ))) && (
                <div className="review-section">
                  <div className="review-section__header">
                    <h2 className="review-section__title">
                      Centerpieces & Extras
                    </h2>
                    <button
                      onClick={() => handleEditSection(4)}
                      className="review-section__edit-btn"
                    >
                      ✎ Edit
                    </button>
                  </div>
                  <div className="review-section__content">
                    {formData.centerpieceTier && (
                      <div className="detail-row">
                        <span className="detail-row__label">Centerpieces:</span>
                        <span className="detail-row__value">
                          {formData.centerpieceTier.charAt(0).toUpperCase() +
                            formData.centerpieceTier.slice(1)}{" "}
                          tier
                        </span>
                      </div>
                    )}
                    {formData.extras &&
                      Object.entries(formData.extras).filter(
                        ([key, val]) => val === true && key !== "cardQuantity",
                      ).length > 0 && (
                        <div className="detail-row">
                          <span className="detail-row__label">Extras:</span>
                          <span className="detail-row__value">
                            {
                              Object.entries(formData.extras).filter(
                                ([key, val]) =>
                                  val === true && key !== "cardQuantity",
                              ).length
                            }{" "}
                            items selected
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Contact Details Section */}
              <div className="review-section">
                <div className="review-section__header">
                  <h2 className="review-section__title">Contact Details</h2>
                  <button
                    onClick={() => handleEditSection(5)}
                    className="review-section__edit-btn"
                  >
                    ✎ Edit
                  </button>
                </div>
                <div className="review-section__content">
                  <div className="detail-row">
                    <span className="detail-row__label">Name:</span>
                    <span className="detail-row__value">{formData.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Phone:</span>
                    <span className="detail-row__value">{formData.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-row__label">Email:</span>
                    <span className="detail-row__value">{formData.email}</span>
                  </div>
                  {formData.themeColors && (
                    <div className="detail-row">
                      <span className="detail-row__label">Theme Colors:</span>
                      <span className="detail-row__value">
                        {formData.themeColors}
                      </span>
                    </div>
                  )}
                  {formData.specialRequests && (
                    <div className="detail-row detail-row--full">
                      <span className="detail-row__label">
                        Special Requests:
                      </span>
                      <p className="detail-row__value">
                        {formData.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and conditions */}
              <div className="terms-section">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="terms-checkbox__text">
                    I have reviewed all details above and accept the{" "}
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
                  </span>
                </label>

                <div id="terms-conteent" className="terms-content">
                  <h3>Terms & Conditions</h3>
                  <ul>
                    <li>50% deposit required to confirm booking</li>
                    <li>Balance payment due after the event setup is done</li>
                    <li>
                      Cancellations made on the day of the event: No refund
                    </li>
                    <li>
                      Setup time: 2-4 hours before event (venue must be
                      accessible)
                    </li>
                    <li>
                      Setdown: The following morning after your event date
                    </li>
                    <li>
                      Damages to rented items will be charged at replacement
                      cost
                    </li>
                    <li>We are not responsible for venue-related issues</li>
                    <li>Final quote may be adjusted based on site visit</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="review-actions">
                <button
                  onClick={() => navigate("/quote", { state: { formData } })}
                  className="review-actions__back"
                >
                  ← Back to Calculator
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!termsAccepted}
                  className="review-actions__submit"
                >
                  Confirm & Submit Quote →
                </button>
              </div>
            </div>

            {/* Right column - Quote Summary */}
            <div className="quote-review__summary">
              <QuoteSummary
                formData={formData}
                tablesNeeded={tablesNeeded}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default QuoteReview;
