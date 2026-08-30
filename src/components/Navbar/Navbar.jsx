import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import "./Navbar.scss";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navClass = (path) =>
    `navbar__link${location.pathname === path ? " navbar__link--active" : ""}`;

  return (
    <header
      className={`navbar ${
        isScrolled ? "navbar--scrolled" : ""
      } ${isMenuOpen ? "navbar--menu-open" : ""}`}
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Dawenee Decor & Events home"
        >
          <span className="navbar__logo-main">Dawenee</span>
          <span className="navbar__logo-sub">Decor & Events</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="navbar__desktop-nav" aria-label="Main navigation">
          <Link to="/" className={navClass("/")} aria-current={location.pathname === "/" ? "page" : undefined}>
            Home
          </Link>

          <Link to="/services" className={navClass("/services")} aria-current={location.pathname === "/services" ? "page" : undefined}>
            Services
          </Link>

          <Link to="/our-work" className={navClass("/our-work")} aria-current={location.pathname === "/our-work" ? "page" : undefined}>
            Our Work
          </Link>

          <Link to="/about" className={navClass("/about")} aria-current={location.pathname === "/about" ? "page" : undefined}>About Us</Link>
          <Link to="/contact" className={navClass("/contact")} aria-current={location.pathname === "/contact" ? "page" : undefined}>Contact</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="navbar__actions">
          <a
            href="https://wa.me/254715784287"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__whatsapp"
            aria-label="Chat with Dawenee on WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <Link to="/quote" className="btn btn--primary navbar__cta">
            Build my event estimate
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`navbar__menu-button ${
            isMenuOpen ? "navbar__menu-button--open" : ""
          }`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
      >
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          <Link to="/" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
            <span>01</span>
            Home
          </Link>

          <Link to="/services" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
            <span>02</span>
            Services
          </Link>

          <Link to="/our-work" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
            <span>03</span>
            Our Work
          </Link>

          <Link to="/about" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
            <span>04</span>
            About Us
          </Link>

          <Link to="/contact" className="navbar__mobile-link" onClick={() => setIsMenuOpen(false)}>
            <span>05</span>
            Contact
          </Link>
        </nav>

        <div className="navbar__mobile-footer">
          <div className="navbar__mobile-social">
            <a
              href="https://instagram.com/daweneedecor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dawenee on Instagram"
            >
              <FaInstagram />
              Instagram
            </a>

            <a
              href="https://wa.me/254715784287"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Dawenee on WhatsApp"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>

          <Link to="/quote" className="btn btn--primary navbar__mobile-cta" onClick={() => setIsMenuOpen(false)}>
            Build my event estimate
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
