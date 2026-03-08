import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Quote.scss";
import StepOne from "../../components/QuoteSteps/StepOne";
import StepTwo from "../../components/QuoteSteps/StepTwo";
import StepThree from "../../components/QuoteSteps/StepThree";
import StepFour from "../../components/QuoteSteps/StepFour";
import StepFive from "../../components/QuoteSteps/StepFive";
import QuoteSummary from "../../components/QuoteSteps/QuoteSummary";
import {
  saveCurrentQuote,
  getCurrentQuote,
  clearCurrentQuote,
} from "../../utils/localStorage";

function Quote() {
  const location = useLocation();

  const initializeQuoteState = () => {
    if (location.state?.formData) {
      return {
        showPrompt: false,
        savedData: null,
        formData: location.state.formData,
        currentStep: location.state.currentStep || 1,
      };
    }

    // Otherwise, check localStorage
    const saved = getCurrentQuote();
    if (saved && saved.formData) {
      return {
        showPrompt: true,
        savedData: saved,
        formData: saved.formData,
        currentStep: saved.currentStep,
      };
    }

    return {
      showPrompt: false,
      savedData: null,
      formData: {
        eventDate: "",
        guestCount: 50,
        venueName: "",
        location: "nairobi",
        chairType: "",
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
        backdrops: [],
        welcomeSign: "",
        centerpieceTier: "",
        extras: {
          cakeStand: false,
          dessertTable: false,
          redCarpet: false,
          cardBox: false,
          individualCards: false,
          cardQuantity: 0,
          lightingPackage: false,
        },
        name: "",
        phone: "",
        email: "",
        themeColors: "",
        specialRequests: "",
      },
      currentStep: 1,
    };
  };

  const [initialState] = useState(initializeQuoteState);
  const [showResumePrompt, setShowResumePrompt] = useState(
    initialState.showPrompt,
  );
  const [savedQuoteData] = useState(initialState.savedData);
  const [currentStep, setCurrentStep] = useState(initialState.currentStep);
  const [formData, setFormData] = useState(initialState.formData);

  const totalSteps = 5;
  const tablesNeeded = Math.ceil(formData.guestCount / 7);

  const stepValidation = {
    1: false,
    2: true,
    3: true,
    4: true,
    5: false,
  };

  // Validate step 1
  const validateStepOne = useCallback(() => {
    if (!formData.eventDate) return false;

    const selectedDate = new Date(formData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return false;
    if (formData.guestCount < 10) return false;
    if (!formData.location) return false;

    return true;
  }, [formData]);

  // Validate step 5
  const validateStepFive = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?254|0)?[17]\d{8}$/;

    if (!formData.name || formData.name.trim().length < 2) return false;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, "")))
      return false;
    if (!formData.email || !emailRegex.test(formData.email)) return false;

    return true;
  }, [formData]);

  useEffect(() => {
    if (!showResumePrompt) {
      const hasStartedForm =
        formData.name ||
        formData.email ||
        formData.phone ||
        formData.chairType ||
        formData.backdrops.length > 0;

      if (hasStartedForm) {
        const timeoutId = setTimeout(() => {
          saveCurrentQuote(formData, currentStep);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [formData, currentStep, showResumePrompt]);


  // Auto-save progress as user fills the form
  useEffect(() => {
    if (!showResumePrompt) {
      const hasStartedForm =
        formData.name ||
        formData.email ||
        formData.phone ||
        formData.chairType ||
        formData.backdrops.length > 0;

      if (hasStartedForm) {
        const timeoutId = setTimeout(() => {
          saveCurrentQuote(formData, currentStep);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [formData, currentStep, showResumePrompt]);

  const handleResumeQuote = () => {
    if (savedQuoteData) {
      setFormData(savedQuoteData.formData);
      setCurrentStep(savedQuoteData.currentStep);
      setShowResumePrompt(false);
    }
  };

  const handleStartFresh = () => {
    clearCurrentQuote();
    setFormData({
      eventDate: '',
      guestCount: 50,
      venueName: '',
      location: 'nairobi',
      chairType: '',
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
      backdrops: [],
      welcomeSign: '',
      centerpieceTier: '',
      extras: {
        cakeStand: false,
        dessertTable: false,
        redCarpet: false,
        cardBox: false,
        individualCards: false,
        cardQuantity: 0,
        lightingPackage: false,
      },
      name: '',
      phone: '',
      email: '',
      themeColors: '',
      specialRequests: '',
    });
    setCurrentStep(1);
    setShowResumePrompt(false);
  };

  const nextStep = () => {
    const isCurrentStepValid = currentStep === 1 ? validateStepOne() : currentStep === 5 ? validateStepFive() : stepValidation[currentStep];
    if (!isCurrentStepValid) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="quote-page">
      <Navbar />

      {/* resume quote prompt */}
      {showResumePrompt && (
        <div className="resume-prompt-overlay">
          <div className="resume-prompt">
            <h2 className="resume-prompt__title">Welcome Back!</h2>
            <p className="resume-prompt__text">
              We found a quote you started on{" "}
              {new Date(savedQuoteData.savedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p className="resume-prompt__subtext">
              You were on Step {savedQuoteData.currentStep} of {totalSteps}
            </p>
            <div className="resume-prompt__buttons">
              <button
                onClick={handleResumeQuote}
                className="resume-prompt__btn resume-prompt__btn--primary"
              >
                ✓ Resume Quote
              </button>
              <button
                onClick={handleStartFresh}
                className="resume-prompt__btn resume-prompt__btn--secondary"
              >
                Start Fresh Quote
              </button>
            </div>
          </div>
        </div>
      )}

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
            
            {!stepValidation[currentStep] && currentStep !== 5 && (
              <div className="step-validation-warning">
                <span className="step-validation-warning__icon">⚠️</span>
                <span className="step-validation-warning__text">
                  Please complete all required fields to proceed
                </span>
              </div>
            )}

            <div className="quote__navigation">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="quote__nav-button quote__nav-button--back"
                >
                  ← Back
                </button>
              )}

              {currentStep < totalSteps && (
                <button
                  onClick={nextStep}
                  className="quote__nav-button quote__nav-button--next"
                >
                  Next Step →
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
