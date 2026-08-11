import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollToWork = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/#featured-work";
      return;
    }
    document
      .getElementById("featured-work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          Dawenee <span>Decor</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            <li>
              <Link
                to="/"
                className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#featured-work"
                onClick={scrollToWork}
                className="navbar__link"
              >
                Our Work
              </a>
            </li>
            <li>
              <Link
                to="/quote"
                className={`navbar__link ${location.pathname === "/quote" ? "navbar__link--active" : ""}`}
              >
                Services
              </Link>
            </li>
          </ul>

          <Link to="/quote" className="navbar__cta">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="navbar__mobile-links">
            <li>
              <Link to="/" className="navbar__mobile-link">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#featured-work"
                onClick={scrollToWork}
                className="navbar__mobile-link"
              >
                Our Work
              </a>
            </li>
            <li>
              <Link to="/quote" className="navbar__mobile-link">
                Services
              </Link>
            </li>
            <li>
              <Link to="/quote" className="navbar__mobile-cta">
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
