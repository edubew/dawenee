import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3 className="footer__logo">Dawenee Decor & Events</h3>
          <p className="footer__tagline">
            Turning celebrations into cherished memories
          </p>
        </div>

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

        <nav className="footer__nav">
          <Link to="/" className="footer__nav-link">
            Home
          </Link>
          <span className="footer__nav-divider">.</span>
          <Link to="/portfolio" className="footer__nav-link">
            Portfolio
          </Link>
          <span className="footer__nav-divider">.</span>
          <Link to="/services" className="footer__nav-link">
            Services
          </Link>
          <span className="footer__nav-divider">.</span>
          <Link to="/about" className="footer__nav-link">
            About
          </Link>
          <span className="footer__nav-divider">.</span>
          <Link to="/booking" className="footer__nav-link">
            Book
          </Link>
        </nav>

        <div className="footer__legal">
          <p className="footer__copyright">
            © {new Date().getFullYear()}Dawenee Decor & Events
          </p>
          <p className="footer__location">Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
