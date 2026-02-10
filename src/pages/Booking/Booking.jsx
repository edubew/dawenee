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

  {
    /* Handle input changes */
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
                className="booking__input"
                placeholder="e.g Sarah Kimani"
                required
              />
            </div>

            <div className="booking__field">
              <label htmlFor="email" className="booking__label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="booking__input"
                placeholder="e.g., kimani@example.com"
                required
              />
            </div>

            <div className="booking__field">
              <label htmlFor="phone" className="booking__label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="booking__input"
                placeholder="e.g., 0701 234 567"
                required
              />
            </div>

            <div className="booking__field">
              <label htmlFor="eventDate" className="booking__label">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="booking__input"
                required
              />
            </div>

            <div className="booking__field">
              <label htmlFor="eventType" className="booking__label">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                className="booking__input booking__select"
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
            </div>

            <div className="booking__field">
              <label htmlFor="message" className="booking__label">
                Tell Us About Your Event *
              </label>
              <textarea
                id="message"
                name="message"
                className="booking__input booking__textarea"
                placeholder="Share your vision, theme colors, number of guests, budget, or any special requests..."
                rows="5"
                required
              />
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
