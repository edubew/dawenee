import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StepOne from "../../components/QuoteSteps/StepOne";
import StepTwo from "../../components/QuoteSteps/StepTwo";
import StepThree from "../../components/QuoteSteps/StepThree";
import StepFour from "../../components/QuoteSteps/StepFour";
import StepFive from "../../components/QuoteSteps/StepFive";
import QuoteSummary from "../../components/QuoteSteps/QuoteSummary";
import { EucalyptusBranch } from "../../components/Botanicals/Botanicals";
import {
  saveCurrentQuote,
  getCurrentQuote,
  clearCurrentQuote,
} from "../../utils/localStorage";
import "./Quote.scss";

const EMPTY_FORM_DATA = {
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
};

const TOTAL_STEPS = 5;

function Quote() {
  const initState = () => {
    const saved = getCurrentQuote();
    if (saved?.formData) {
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
      formData: EMPTY_FORM_DATA,
      currentStep: 1,
    };
  };

  const [init] = useState(initState);
  const [showResumePrompt, setShowResumePrompt] = useState(init.showPrompt);
  const [savedQuoteData] = useState(init.savedData);
  const [currentStep, setCurrentStep] = useState(init.currentStep);
  const [formData, setFormData] = useState(init.formData);
  const [stepOneValid, setStepOneValid] = useState(false);
  const [stepFiveValid, setStepFiveValid] = useState(false);

  const tablesNeeded = Math.ceil(formData.guestCount / 7);

  const isCurrentStepValid = () => {
    if (currentStep === 1) return stepOneValid;
    if (currentStep === 5) return stepFiveValid;
    return true;
  };

  // Single autosave effect
  useEffect(() => {
    if (showResumePrompt) return;
    const hasStarted =
      formData.name ||
      formData.email ||
      formData.phone ||
      formData.chairType ||
      formData.backdrops?.length > 0;
    if (!hasStarted) return;

    const id = setTimeout(() => {
      saveCurrentQuote(formData, currentStep);
    }, 1000);
    return () => clearTimeout(id);
  }, [formData, currentStep, showResumePrompt]);

  const handleResumeQuote = () => {
    setFormData(savedQuoteData.formData);
    setCurrentStep(savedQuoteData.currentStep);
    setShowResumePrompt(false);
  };

  const handleStartFresh = () => {
    clearCurrentQuote();
    setFormData(EMPTY_FORM_DATA);
    setCurrentStep(1);
    setShowResumePrompt(false);
  };

  const nextStep = () => {
    if (!isCurrentStepValid()) return;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="quote-page">
      <Navbar />

      {/* Resume prompt */}
      {showResumePrompt && (
        <div className="resume-overlay">
          <div className="resume-prompt">
            <span className="resume-prompt__tag">Welcome back</span>
            <h2 className="resume-prompt__title">
              Pick up where you left off?
            </h2>
            <p className="resume-prompt__text">
              We found a quote you started on{" "}
              {new Date(savedQuoteData.savedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p className="resume-prompt__sub">
              You were on Step {savedQuoteData.currentStep} of {TOTAL_STEPS}
            </p>
            <div className="resume-prompt__buttons">
              <button onClick={handleResumeQuote} className="btn btn--primary">
                Resume Quote
              </button>
              <button onClick={handleStartFresh} className="btn btn--secondary">
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="quote">
        <EucalyptusBranch
          className="quote__botanical"
          style={{
            position: "absolute",
            top: "-1rem",
            right: "-1rem",
            width: "200px",
            opacity: 0.12,
          }}
          opacity={0.12}
        />

        <div className="container">
          {/* Header */}
          <div className="quote__header">
            <span className="quote__eyebrow">Get your instant quote</span>
            <h1 className="quote__title">
              Tell us about your <em>event</em>
            </h1>
            <p className="quote__subtitle">
              See real-time pricing as you go — no waiting, no surprises
            </p>
          </div>

          {/* Progress bar */}
          <div className="quote__progress">
            <div className="quote__progress-track">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`quote__seg ${
                    currentStep === step
                      ? "quote__seg--active"
                      : currentStep > step
                        ? "quote__seg--done"
                        : ""
                  }`}
                  aria-label={`Go to step ${step}`}
                >
                  <span className="quote__seg-fill" />
                </button>
              ))}
            </div>
            <p className="quote__progress-text">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>

          {/* Layout: main + sidebar */}
          <div className="quote__layout">
            <div className="quote__main">
              <div className="quote__card">
                {currentStep === 1 && (
                  <StepOne
                    formData={formData}
                    setFormData={setFormData}
                    tablesNeeded={tablesNeeded}
                    onValidate={setStepOneValid}
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
                  <StepFive
                    formData={formData}
                    setFormData={setFormData}
                    tablesNeeded={tablesNeeded}
                    onValidate={setStepFiveValid}
                  />
                )}

                {/* Validation warning */}
                {!isCurrentStepValid() && currentStep !== 5 && (
                  <div className="quote__warning">
                    <span>⚠</span>
                    <span>Please complete all required fields to continue</span>
                  </div>
                )}

                {/* Navigation */}
                <div className="quote__nav">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="quote__nav-btn quote__nav-btn--back"
                    >
                      ← Back
                    </button>
                  )}
                  {currentStep < TOTAL_STEPS && (
                    <button
                      onClick={nextStep}
                      disabled={!isCurrentStepValid()}
                      className="quote__nav-btn quote__nav-btn--next"
                    >
                      Next Step →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Persistent summary sidebar */}
            <aside className="quote__sidebar">
              <QuoteSummary formData={formData} tablesNeeded={tablesNeeded} />
            </aside>
          </div>

          <div className="quote__footer-link">
            <Link to="/">← Back to Homepage</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Quote;
