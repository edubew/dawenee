import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__column">
            <h3 className="footer__logo">Dawenee Decor & Events</h3>
            <p className="footer__tagline">
              We create stunning event experiences that make every celebration
              unforgettable. From intimate gatherings to grand celebrations, we
              bring your vision to life.
            </p>

            <div className="footer__social">
              <a
                href="https://instagram.com/dawenee_decor"
                target="blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Follow us on Instagram"
              >
                <span className="footer__social-icon">📷</span>
                Instagram
              </a>

              <a
                href="https://tiktok.com/dawenee_decor"
                target="blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Follow us on TikTok"
              >
                <span className="footer__social-icon">🎵</span>
                TikTok
              </a>

              <a
                href="https://tiktok.com/dawenee_decor"
                target="blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Follow us on TikTok"
              >
                <span className="footer__social-icon">🎵</span>
                Facebook
              </a>

              <a
                href="https://wa.me/254715784287"
                target="blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Chat with us on WhatsApp"
              >
                <span className="footer__social-icon">💬</span>
                WhatsApp
              </a>

              <a
                href="tel:+254715784287"
                className="footer__social-link"
                aria-label="Call us"
              >
                <span className="footer__social-icon">📞</span>
                +254715784287
              </a>
            </div>
          </div>

          <div className="footer__column--secondary">
            <h4 className="footer__column-title">Quick Links</h4>
            <nav className="footer__links">
              <Link to="/" className="footer__link">
                Home
              </Link>
              <Link to="/quote" className="footer__link">
                Get Quote
              </Link>
              <a href="#featured-work" className="footer__link">
                Our Work
              </a>
              <a href="tel:+254715784287" className="footer__link">
                Call Us
              </a>
            </nav>
          </div>

          <div className="footer__column--primary">
            <h4 className="footer__column-title">Get in Touch</h4>
            <div className="footer__contact">

              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>

              <div className="footer__contact-item">
                <span className="footer__contact-icon">⏰</span>
                <div>
                  <strong>Working Hours</strong>
                  <span>Mon-Sun: 8AM-7PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Dawenee Decor & Events. All rights
            reserved.
          </p>
          <div className="footer__payment">
            <span className="footer__payment-text">We accept:</span>
            <span className="footer__payment-methods">
              M-Pesa • Bank Transfer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
