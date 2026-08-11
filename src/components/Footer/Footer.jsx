import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhone,
  FaFacebook,
} from "react-icons/fa";
import "./Footer.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.getElementById("featured-work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo">Dawenee Decor &amp; Events</div>
            <p className="footer__tagline">
              We create stunning event experiences that make every celebration
              unforgettable — from intimate gatherings to grand celebrations.
            </p>
            <div className="footer__social">
              <a
                href="https://instagram.com/dawenee_decor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="https://tiktok.com/dawenee_decor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
              >
                <FaTiktok /> TikTok
              </a>
              <a
                href="https://facebook.com/dawenee_decor"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href="https://wa.me/254715784287"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a href="tel:+254715784287" aria-label="Call us">
                <FaPhone /> +254 715 784 287
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="footer__col-title">Quick Links</h4>
            <nav className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/quote">Get Quote</Link>
              <a href="#featured-work" onClick={scrollToWork}>
                Our Work
              </a>
              <a href="tel:+254715784287">Call Us</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__col-title">Get in Touch</h4>
            <div className="footer__contact-item">
              <strong>Location</strong>
              <span>Nairobi, Kenya</span>
            </div>
            <div className="footer__contact-item">
              <strong>Working Hours</strong>
              <span>Mon–Sun: 8am–7pm</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Dawenee Decor &amp; Events. All rights reserved.
          </p>
          <div className="footer__payment">
            We accept: M-Pesa · Bank Transfer
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
