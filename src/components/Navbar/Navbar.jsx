import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
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

  //  const scrollToSection = (sectionId) => {
  //    handleLinkClick();
  //    const element = document.getElementById(sectionId);
  //    if (element) {
  //      element.scrollIntoView({ behavior: "smooth", block: "start" });
  //    }
  //  };

  const handleOurWorkClick = () => {
    handleLinkClick();

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('featured-work');
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById("featured-work");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
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
            <button
              onClick={handleOurWorkClick}
              className="navbar__link navbar__link--button"
            >
              Our Work
            </button>
          </li>

          <li>
            <Link
              to="/quote"
              className={
                isActive("/quote")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
              onClick={handleLinkClick}
            >
              Get Quote
            </Link>
          </li>

          <li>
            <Link
              to="/booking"
              className="navbar__cta"
              onClick={handleLinkClick}
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
