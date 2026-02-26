import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedWork from "../../components/FeaturedProjects/FeaturedWork";
import Services from "../../components/Services/Services";
import Cta from "../../components/Cta/Cta";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />

      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar__items">
            <div className="trust-bar__item">
              <div className="trust-bar__icon">⚡</div>
              <h3 className="trust-bar__title">Same Day Setup</h3>
              <p className="trust-bar__description">
                Quick turnaround for last-minute events
              </p>
            </div>

            <div className="trust-bar__item">
              <div className="trust-bar__icon">💳</div>
              <h3 className="trust-bar__title">50% Deposit Only</h3>
              <p className="trust-bar__description">
                Pay half now, rest after your event
              </p>
            </div>

            <div className="trust-bar__item">
              <div className="trust-bar__icon">📦️</div>
              <h3 className="trust-bar__title">Flexible Packages</h3>
              <p className="trust-bar__description">
                Customize everything to match your budget
              </p>
            </div>

            <div className="trust-bar__item">
              <div className="trust-bar__icon">🗪</div>
              <h3 className="trust-bar__title">Free Consultation</h3>
              <p className="trust-bar__description">
                No obligation chat about your vision
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="how-it-works__header">
            <h2 className="how-it-works__title">How It Works</h2>
            <p className="how-it-works__subtitle">
              Three simple steps to your dream event
            </p>
          </div>

          <div className="how-it-works__steps">
            <div className="how-step">
              <div className="how-step__number">1</div>
              <h3 className="how-step__title">Tell Us Your Vision</h3>
              <p className="how-step__description">
                Share your event details: date, guest count, style preferences,
                and budget. Takes less than 2 minutes.
              </p>
            </div>

            <div className="how-it-works__arrow">→</div>

            <div className="how-step">
              <div className="how-step__number">2</div>
              <h3 className="how-step__title">Get Instant Quote</h3>
              <p className="how-step__description">
                Choose from our services, see real-time pricing, and customize
                your package exactly how you want it.
              </p>
            </div>

            <div className="how-it-works__arrow">→</div>

            <div className="how-step">
              <div className="how-step__number">3</div>
              <h3 className="how-step__title">Pay & Relax</h3>
              <p className="how-step__description">
                Secure your date with a 50% deposit via M-Pesa. We handle
                everything on event day—you just enjoy!
              </p>
            </div>
          </div>

          <div className="how-it-works__cta">
            <Link to="/quote" className="how-it-works__button">
              Start Your Quote Now
            </Link>
            <p className="how-it-works__note">
              No credit card required • Get pricing instantly
            </p>
          </div>
        </div>
      </section>

      <FeaturedWork />
      <Services />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
