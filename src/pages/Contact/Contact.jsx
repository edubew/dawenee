import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import "./Contact.scss";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Track errors for each field
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

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
        const cleanPhone = value.replace(/\s/g, "");
        if (!phoneRegex.test(cleanPhone)) {
          return "Please enter a valid Kenyan phone number (e.g., 0701 234 567)";
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

  // Validate all fields at once
  const validateAllFields = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAllFields()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the error above before submitting");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    const message = `Hello Dawenee, I have a question about my event.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Question:
${formData.message}`;
    const whatsappUrl = `https://wa.me/254715784287?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitStatus("success");
    setSubmitMessage("Your question is ready in WhatsApp. Tap send there to reach us.");
    setIsSubmitting(false);

    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({ name: "", email: "", phone: "", message: "" });
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
        <div className="container">
          <div className="booking__header">
            <span className="booking__eyebrow">Questions & custom requests</span>
            <h1 className="booking__title">Let’s talk about <em>your event.</em></h1>
            <p className="booking__subtitle">
              Not ready for an estimate, or planning something outside our
              standard options? Ask a question and we’ll help you find the right next step.
            </p>
          </div>

          <div className="booking__content">
            <div className="booking__info">
              <span className="booking__panel-label">Talk to a real person</span>
              <h2 className="booking__info-title">Choose what feels easiest.</h2>
              <p className="booking__info-text">
                Choose the easiest way to start. A date, guest count and a few
                inspiration ideas are more than enough.
              </p>

              <div className="booking__methods">
                <a
                  href="https://wa.me/254715784287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="booking__method"
                >
                  <div className="booking__method-icon booking__method-icon--whatsapp">
                    <FaWhatsapp />
                  </div>
                  <div className="booking__method-content">
                    <h3 className="booking__method-title">WhatsApp</h3>
                    <p className="booking__method-detail">0715 784 287</p>
                    <span className="booking__method-cta">Chat with us →</span>
                  </div>
                </a>

                <a href="tel:+254715784287" className="booking__method">
                  <div className="booking__method-icon booking__method-icon--phone">
                    <FaPhone />
                  </div>
                  <div className="booking__method-content">
                    <h3 className="booking__method-title">Phone</h3>
                    <p className="booking__method-detail">0715 784 287</p>
                    <span className="booking__method-cta">Call us →</span>
                  </div>
                </a>

                <a
                  href="mailto:wndecorevents@gmail.com"
                  className="booking__method"
                >
                  <div className="booking__method-icon booking__method-icon--email">
                    <FaEnvelope />
                  </div>
                  <div className="booking__method-content">
                    <h3 className="booking__method-title">Email</h3>
                    <p className="booking__method-detail">
                      wndecorevents@gmail.com
                    </p>
                    <span className="booking__method-cta">Send email →</span>
                  </div>
                </a>

                <div className="booking__method booking__method--static">
                  <div className="booking__method-icon booking__method-icon--location">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="booking__method-content">
                    <h3 className="booking__method-title">Location</h3>
                    <p className="booking__method-detail">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="booking__quick-links">
                  <h3 className="booking__quick-links-title">
                    Ready to choose your styling details?
                  </h3>
                  <div className="booking__buttons">
                    <Link
                      to="/quote"
                      className="booking__button booking__button--primary"
                    >
                      Build My Event Estimate
                    </Link>
                    <Link
                      to="/our-work"
                      className="booking__button booking__button--secondary"
                    >
                      View Our Work
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking__form-section">
              <span className="booking__panel-label">Personal guidance</span>
              <h2 className="booking__form-title">I have a question</h2>
              <p className="booking__form-subtitle">
                Share what you are unsure about. We aim to respond within 24 hours.
              </p>

              <form className="booking__form" onSubmit={handleSubmit}>
                <div className="booking__field">
                  <label htmlFor="name" className="booking__label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`booking__input ${errors.name ? "booking__input--error" : ""}`}
                    placeholder="e.g Sarah..."
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
                    placeholder="e.g., dawenee@example.com"
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
                  <label htmlFor="message" className="booking__label">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`booking__input booking__textarea ${errors.message ? "booking__input--error" : ""}`}
                    placeholder="Tell us about your event or what you need help deciding..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  {errors.message && (
                    <span className="booking__error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="booking__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="booking__submit-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send My Question"
                  )}
                </button>
              </form>
            </div>
          </div>

          {submitStatus === "success" && (
            <div className="booking__message booking__message--success">
              <svg
                className="booking__message-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>{submitMessage}</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="booking__message booking__message--error">
              <svg
                className="booking__message-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p>{submitMessage}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
