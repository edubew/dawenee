import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Quote.scss";
import { Link } from "react-router-dom";

function Quote() {
  // Track the steps
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
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
            <div className="quote__step">
              {currentStep === 1 && (
                <div className="step">
                  <h2 className="step__title">Step 1: Event Details</h2>
                  <p className="step__description">
                    Let's start with the basics about your event
                  </p>
                  <div className="step__placeholder">
                    <p>
                      Event date, guest count, venue, location form fields
                      coming next...
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step">
                  <h2 className="step__title">Step 2: Seating & Tables</h2>
                  <p className="step__description">
                    Choose your chairs and table settings
                  </p>
                  <div className="step__placeholder">
                    <p>Chair selection, table settings coming next...</p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step">
                  <h2 className="step__title">Step 3: Backdrops & Signage</h2>
                  <p className="step__description">
                    Select your backdrop and welcome signs
                  </p>
                  <div className="step__placeholder">
                    <p>Backdrop selection coming next...</p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="step">
                  <h2 className="step__title">Step 4: Centerpieces & Extras</h2>
                  <p className="step__description">
                    Add finishing touches to your event
                  </p>
                  <div className="step__placeholder">
                    <p>
                      Centerpieces, dessert table, lighting, etc. coming next...
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="step">
                  <h2 className="step__title">Step 5: Your Details</h2>
                  <p className="step__description">
                    Almost done! We just need your contact information
                  </p>
                  <div className="step__placeholder">
                    <p>Name, phone, email, special requests coming next...</p>
                  </div>
                </div>
              )}
            </div>

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
