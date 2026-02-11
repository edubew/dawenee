import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Booking.scss";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });

  // Track errors for each field
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });

  // Validation logic for each field
  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (!value.trim()) {
          return "Name is required";
        }
        if (value.trim().length < 4) {
          return "Name must be atleast 4 characters";
        }
        return "";
      }

      case "email": {
        if (!value.trim()) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return "";
      }

      case "phone": {
        if (!value.trim()) {
          return "Phone number is required";
        }
        const phoneRegex = /^(\+254|0)[17]\d{8}$/;
        // Remove spaces for validation
        const cleanPhone = value.replace(/\s/g, "");
        if (!phoneRegex.test(cleanPhone)) {
          return "Please enter a valid Kenyan phone number (e.g., 0701 234 567)";
        }
        return "";
      }

      case "eventDate": {
        if (!value) {
          return "Event date is required";
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          return "Event date cannot be in the past";
        }
        return "";
      }

      case "eventType": {
        if (!value) {
          return "Please select an event type";
        }
        return "";
      }

      case "message": {
        if (!value.trim()) {
          return "Please tell us about your event";
        }
        if (value.trim().length < 10) {
          return "Please provide at least 10 characters";
        }
        return "";
      }

      default:
        return "";
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return (
    <div className="booking-page">
      <Navbar />

      <main className="booking">
        <div className="container booking__inner">
          <div className="booking__header">
            <h1 className="booking__title">Book a Consultation</h1>
            <p className="booking__subtitle">
              Let's bring your vision to life. Fill out the form below and we
              will get back to you within 24 hours
            </p>
          </div>

          <form className="booking__form">
            <div className="booking__field">
              <label htmlFor="name" className="booking__label">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`booking__input ${errors.name ? "booking__input--error" : ""}`}
                placeholder="e.g Sarah Kimani"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <span className="booking__error">{errors.name}</span>
              )}
            </div>

            <div className="booking__field">
              <label htmlFor="email" className="booking__label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`booking__input ${errors.email ? "booking__input--error" : ""}`}
                placeholder="e.g., kimani@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="booking__error">{errors.email}</span>
              )}
            </div>

            <div className="booking__field">
              <label htmlFor="phone" className="booking__label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`booking__input ${errors.phone ? "booking__input--error" : ""}`}
                placeholder="e.g., 0701 234 567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <span className="booking__error">{errors.phone}</span>
              )}
            </div>

            <div className="booking__field">
              <label htmlFor="eventDate" className="booking__label">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className={`booking__input ${errors.eventDate ? "booking__input--error" : ""}`}
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
              {errors.eventDate && (
                <span className="booking__error">{errors.eventDate}</span>
              )}
            </div>

            <div className="booking__field">
              <label htmlFor="eventType" className="booking__label">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                className={`booking__input booking__select ${errors.eventType ? "booking__input--error" : ""}`}
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select event type</option>
                <option value="birthday">Birthday</option>
                <option value="wedding">Wedding</option>
                <option value="baby-shower">Baby Shower</option>
                <option value="engagement">Engagement</option>
                <option value="graduation">Graduation</option>
                <option value="picnic">Picnic</option>
                <option value="kids-party">Kids Party</option>
                <option value="proposal">Proposal</option>
                <option value="cooperate">Co-oporate</option>
                <option value="other">Other</option>
              </select>
              {errors.eventType && (
                <span className="booking__error">{errors.eventType}</span>
              )}
            </div>

            <div className="booking__field">
              <label htmlFor="message" className="booking__label">
                Tell Us About Your Event *
              </label>
              <textarea
                id="message"
                name="message"
                className={`booking__input booking__textarea ${errors.message ? "booking__input--error" : ""}`}
                placeholder="Share your vision, theme colors, number of guests, budget, or any special requests..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {errors.message && (
                <span className="booking__error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="booking__submit">
              Send Request
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Booking;
