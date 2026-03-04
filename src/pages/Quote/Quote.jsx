import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Quote.scss";
import { Link } from "react-router-dom";
import { getMatchingVenues } from "../../data/venuesData";
import StepTwo from "../../components/QuoteSteps/StepTwo";

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

  // const chairOptions = [
  //   {
  //     id: "dressedPlastic",
  //     name: "Dressed Plastic Chairs",
  //     price: PRICING.chairs.dressedPlastic,
  //     description: "Classic white plastic chairs with elegant fabric covers",
  //     image: plasticDressed,
  //     popular: true,
  //   },
  //   {
  //     id: "chiavari",
  //     name: "Chiavari Chairs",
  //     price: PRICING.chairs.chiavari,
  //     description: "Elegant chiavari chairs, perfect for upscale events",
  //     image: chiavariSeat,
  //     popular: false,
  //   },
  //   {
  //     id: "luxe",
  //     name: "Luxe Chairs",
  //     price: PRICING.chairs.luxe,
  //     description: "Premium luxury seating for sophisticated celebrations",
  //     image: luxeSeat,
  //     popular: false,
  //   },
  // ];

  // calculate chair cost
  // const calculateChairCost = () => {
  //   if (!formData.chairTpye) return 0;
  //   const pricePerChair = PRICING.chairs[formData.chairTpye] || 0;
  //   return pricePerChair * formData.chairQuantity;
  // };

  // calculate table cost
  // const calculateTableCost = () => {
  //   return tablesNeeded * PRICING.tables.dressed;
  // };

  // Handle chair selection
  // const handleChairSelect = (chairId) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     chairTpye: chairId,
  //     chairQuantity: prev.guestCount,
  //   }));
  // };

  // const handleChairQuantityChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     chairQuantity: parseInt(e.target.value) || 0,
  //   }));
  // };

  const [venueFilter, setVenueFilter] = useState("all");

  const tablesNeeded = Math.ceil(formData.guestCount / 7);

  const allMatchingVenues = getMatchingVenues(formData.location, venueFilter);
  const suggestedVenues = allMatchingVenues.slice(0, 6);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGuestCountChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      guestCount: parseInt(e.target.value),
    }));
  };

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
            <div className="quote__step">
              {currentStep === 1 && (
                <div className="step">
                  <h2 className="step__title">Step 1: Event Details</h2>
                  <p className="step__description">
                    Let's start with the basics about your event so we can give
                    you accurate pricing
                  </p>

                  <div className="form">
                    <div className="form__group">
                      <label htmlFor="eventDate" className="form__label">
                        Event Date <span className="form__required">*</span>
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="form__input"
                        min={new Date().toISOString().split("T")[0]} // Today or later
                        required
                      />
                    </div>

                    <div className="form__group">
                      <label htmlFor="guestCount" className="form__label">
                        Number of Guests{" "}
                        <span className="form__required">*</span>
                      </label>
                      <div className="form__slider-container">
                        <input
                          type="range"
                          id="guestCount"
                          name="guestCount"
                          min="2"
                          max="500"
                          step="3"
                          value={formData.guestCount}
                          onChange={handleGuestCountChange}
                          className="form__slider"
                        />
                        <div className="form__slider-value">
                          <span className="form__slider-number">
                            {formData.guestCount}
                          </span>
                          <span className="form__slider-label">guests</span>
                        </div>
                      </div>

                      <div className="form__calculation">
                        <span className="form__calculation-icon">📋</span>
                        <span className="form__calculation-text">
                          Tables needed: <strong>{tablesNeeded}</strong> (6
                          guests per table)
                        </span>
                      </div>
                    </div>

                    <div className="form__group">
                      <label className="form__label">
                        Location <span className="form__required">*</span>
                      </label>
                      <div className="form__radio-group">
                        <label className="form__radio">
                          <input
                            type="radio"
                            name="location"
                            value="nairobi"
                            checked={formData.location === "nairobi"}
                            onChange={handleChange}
                          />
                          <span className="form__radio-label">
                            <strong>Nairobi</strong>
                            <small>Within Nairobi County</small>
                          </span>
                        </label>

                        <label className="form__radio">
                          <input
                            type="radio"
                            name="location"
                            value="outside-nairobi"
                            checked={formData.location === "outside-nairobi"}
                            onChange={handleChange}
                          />
                          <span className="form__radio-label">
                            <strong>Outside Nairobi</strong>
                            <small>Beyond Nairobi County</small>
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="form__group">
                      <label htmlFor="venueName" className="form__label">
                        Venue Name <span className="form__required">*</span>
                      </label>
                      <div className="form__venue-filter">
                        <button
                          type="button"
                          onClick={() => setVenueFilter("all")}
                          className={`form__filter-btn ${venueFilter === "all" ? "form__filter-btn--active" : ""}`}
                        >
                          All Venues
                        </button>
                        <button
                          type="button"
                          onClick={() => setVenueFilter("outdoor")}
                          className={`form__filter-btn ${venueFilter === "outdoor" ? "form__filter-btn--active" : ""}`}
                        >
                          Outdoor
                        </button>
                        <button
                          type="button"
                          onClick={() => setVenueFilter("indoor")}
                          className={`form__filter-btn ${venueFilter === "indoor" ? "form__filter-btn--active" : ""}`}
                        >
                          Indoor
                        </button>
                      </div>

                      {suggestedVenues.length > 0 && (
                        <div className="form__venue-suggestions">
                          <p className="form__venue-suggestions-title">
                            💡{" "}
                            {venueFilter === "all"
                              ? "All"
                              : venueFilter === "outdoor"
                                ? "Outdoor"
                                : "Indoor"}{" "}
                            venues in{" "}
                            {formData.location === "nairobi"
                              ? "Nairobi"
                              : "outside Nairobi"}
                            :
                          </p>
                          <div className="form__venue-cards">
                            {suggestedVenues.map((venue) => (
                              <button
                                key={venue.id}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    venueName: venue.name,
                                  }))
                                }
                                className={`form__venue-card ${formData.venueName === venue.name ? "form__venue-card--selected" : ""}`}
                              >
                                <div className="form__venue-card-header">
                                  <span className="form__venue-card-type">
                                    {venue.type === "outdoor"
                                      ? "🌳"
                                      : venue.type === "indoor"
                                        ? "🏛️"
                                        : "🌳🏛️"}
                                  </span>
                                  <span className="form__venue-card-category">
                                    {venue.category}
                                  </span>
                                </div>
                                <div className="form__venue-card-name">
                                  {venue.name}
                                </div>
                                <div className="form__venue-card-area">
                                  {venue.area}
                                </div>
                                <div className="form__venue-card-contact">
                                  {venue.contact}
                                </div>
                              </button>
                            ))}
                          </div>
                          {allMatchingVenues.length > 6 && (
                            <p className="form__venue-suggestions-more">
                              +{allMatchingVenues.length - 6} more venues
                              available
                            </p>
                          )}
                        </div>
                      )}
                      <input
                        type="text"
                        id="venueName"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleChange}
                        placeholder="e.g., Marula Manor, Karen Country Club"
                        className="form__input"
                        required
                      />
                      <span className="form__hint">
                        Filter by venue type, select from suggestions, or enter
                        your own
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <StepTwo
                  formData={formData}
                  setFormData={setFormData}
                  tablesNeeded={tablesNeeded}
                />
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
