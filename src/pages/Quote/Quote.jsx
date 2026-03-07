import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Quote.scss";
import { Link } from "react-router-dom";
import StepOne from "../../components/QuoteSteps/StepOne";
import StepTwo from "../../components/QuoteSteps/StepTwo";
import StepThree from "../../components/QuoteSteps/StepThree";
import StepFour from "../../components/QuoteSteps/StepFour";
import StepFive from "../../components/QuoteSteps/StepFive";
import QuoteSummary from "../../components/QuoteSteps/QuoteSummary";

function Quote() {
  // Track the steps
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 5;

  // Form data state
  const [formData, setFormData] = useState({
    eventDate: "",
    guestCount: 10,
    venueName: "",
    location: "Nairobi",
    chairTpye: "",
    // Seating & Tables
    chairQuantity: 0,
    tableSettings: {
      fullPackage: false,
      napkins: false,
      wineGlasses: false,
      chargerPlates: false,
      tableMats: false,
      tableRunners: false,
      candles: false,
    },
    // Backdrops & Signage
    backdrops: [],
    welcomeSign: "",
    // Centerpieces and extras
    centerpieceTier: "",
    extras: {},
    // Contact details
    name: "",
    phone: "",
    email: "",
    themeColors: "",
    specialRequests: "",
  });

  const tablesNeeded = Math.ceil(formData.guestCount / 7);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="quote-page">
      <Navbar />

      <main className="quote">
        <div className="container">
          <div className="quote__header">
            <h1 className="quote__title">Get Your Instant Quote</h1>
            <p className="quote__subtitle">
              Tell us about your event and see real-time pricing
            </p>
          </div>

          <div className="quote__progress">
            <div className="quote__progress-bar">
              <div
                className="quote__progress-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="quote__progress-steps">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`quote__progress-step ${currentStep === step ? "quote__progress-step--active" : ""} ${currentStep > step ? "quote__progress-step--completed" : ""}`}
                >
                  {step}
                </button>
              ))}
            </div>
            <p className="quote__progress-text">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <div className="quote__content">
            {currentStep === 5 ? (
              <div className="quote__step-with-summary">
                <div className="quote__step-main">
                  <div className="quote__step">
                    <StepFive formData={formData} setFormData={setFormData} />
                  </div>
                </div>
                <div className="quote__summary-sidebar">
                  <QuoteSummary
                    formData={formData}
                    tablesNeeded={tablesNeeded}
                  />
                </div>
              </div>
            ) : (
              <div className="quote__step">
                {currentStep === 1 && (
                  <StepOne
                    formData={formData}
                    setFormData={setFormData}
                    tablesNeeded={tablesNeeded}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwo
                    formData={formData}
                    setFormData={setFormData}
                    tablesNeeded={tablesNeeded}
                  />
                )}

                {currentStep === 3 && (
                  <StepThree formData={formData} setFormData={setFormData} />
                )}

                {currentStep === 4 && (
                  <StepFour
                    formData={formData}
                    setFormData={setFormData}
                    tablesNeeded={tablesNeeded}
                  />
                )}
              </div>
            )}

            {/* <div className="quote__step">
              {currentStep === 1 && (
                <StepOne
                  formData={formData}
                  setFormData={setFormData}
                  tablesNeeded={tablesNeeded}
                />
              )}

              {currentStep === 2 && (
                <StepTwo
                  formData={formData}
                  setFormData={setFormData}
                  tablesNeeded={tablesNeeded}
                />
              )}

              {currentStep === 3 && (
                <StepThree formData={formData} setFormData={setFormData} />
              )}

              {currentStep === 4 && (
                <StepFour
                  formData={formData}
                  setFormData={setFormData}
                  tablesNeeded={tablesNeeded}
                />
              )}

              {currentStep === 5 && (
                <>
                  <div className="quote__step-with-summary">
                    <div className="quote__step-content">
                      <StepFive formData={formData} setFormData={setFormData} />
                    </div>
                    <div className="quote__summary-sidebar">
                      <QuoteSummary
                        formData={formData}
                        tablesNeeded={tablesNeeded}
                      />
                    </div>
                  </div>
                </>
              )}
            </div> */}

            <div className="quote__navigation">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="quote__nav-button quote__nav-button--back"
                >
                  ← Back
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="quote__nav-button quote__nav-button--next"
                >
                  Next Step →
                </button>
              ) : (
                <button className="quote__nav-button quote__nav-button--submit">
                  Review Quote
                </button>
              )}
            </div>
          </div>

          <div className="quote__footer">
            <Link to="/" className="quote__back-link">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Quote;
