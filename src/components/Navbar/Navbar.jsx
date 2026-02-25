import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation(); //Gets current url path
  const isActive = (path) => location.pathname === path;

  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setmobileMenuOpen(!mobileMenuOpen);
  };

  // Close menu when Link is clicked
  const handleLinkClick = () => {
    setmobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          Dawenee Decor & Events
        </Link>

        <button
          className={`navbar__hamburger ${mobileMenuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          className={`navbar__links ${mobileMenuOpen ? "navbar__links--open" : ""}`}
        >
          <li>
            <Link
              to="/"
              className={
                isActive("/")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/portfolio"
              className={
                isActive("/portfolio")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={handleLinkClick}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={
                isActive("/services")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={handleLinkClick}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={
                isActive("/about")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={handleLinkClick}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              className="navbar__cta"
              onClick={handleLinkClick}
            >
              Book a Consultation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
