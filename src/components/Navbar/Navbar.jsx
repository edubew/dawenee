// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Navbar.scss";

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location]);

//   const scrollToWork = (e) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       window.location.href = "/#featured-work";
//       return;
//     }
//     document
//       .getElementById("featured-work")
//       ?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
//       <div className="container navbar__inner">
//         {/* Logo */}
//         <Link to="/" className="navbar__logo">
//           Dawenee <span>Decor</span>
//         </Link>

//         {/* Desktop nav */}
//         <nav className="navbar__nav" aria-label="Main navigation">
//           <ul className="navbar__links">
//             <li>
//               <Link
//                 to="/"
//                 className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <a
//                 href="#featured-work"
//                 onClick={scrollToWork}
//                 className="navbar__link"
//               >
//                 Our Work
//               </a>
//             </li>
//             <li>
//               <Link
//                 to="/quote"
//                 className={`navbar__link ${location.pathname === "/quote" ? "navbar__link--active" : ""}`}
//               >
//                 Services
//               </Link>
//             </li>
//           </ul>

//           <Link to="/quote" className="navbar__cta">
//             Get a Quote
//           </Link>
//         </nav>

//         {/* Mobile hamburger */}
//         <button
//           className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
//           onClick={() => setMenuOpen((p) => !p)}
//           aria-label={menuOpen ? "Close menu" : "Open menu"}
//           aria-expanded={menuOpen}
//         >
//           <span />
//           <span />
//           <span />
//         </button>
//       </div>

//       {/* Mobile menu */}
//       <div
//         className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
//       >
//         <nav aria-label="Mobile navigation">
//           <ul className="navbar__mobile-links">
//             <li>
//               <Link to="/" className="navbar__mobile-link">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <a
//                 href="#featured-work"
//                 onClick={scrollToWork}
//                 className="navbar__mobile-link"
//               >
//                 Our Work
//               </a>
//             </li>
//             <li>
//               <Link to="/quote" className="navbar__mobile-link">
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link to="/quote" className="navbar__mobile-cta">
//                 Get a Quote
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;
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
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsMenuOpen(false);
  };

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

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
          aria-label="Dawenee Decor & Events home"
        >
          <span className="navbar__logo-main">Dawenee</span>
          <span className="navbar__logo-sub">Decor & Events</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="navbar__desktop-nav" aria-label="Main navigation">
          <Link to="/" className="navbar__link">
            Home
          </Link>

          <a
            href="/#featured-work"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, "featured-work")}
          >
            Our Work
          </a>

          <a
            href="/#services"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, "services")}
          >
            Services
          </a>

          <a
            href="/#why-dawenee"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, "why-dawenee")}
          >
            Why Dawenee
          </a>

          <a
            href="/#faq"
            className="navbar__link"
            onClick={(e) => handleSectionClick(e, "faq")}
          >
            FAQ
          </a>
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
            Start your quote estimate
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
          <Link to="/" className="navbar__mobile-link">
            <span>01</span>
            Home
          </Link>

          <a
            href="/#featured-work"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, "featured-work")}
          >
            <span>02</span>
            Our Work
          </a>

          <a
            href="/#services"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, "services")}
          >
            <span>03</span>
            Services
          </a>

          <a
            href="/#why-dawenee"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, "why-dawenee")}
          >
            <span>04</span>
            Why Dawenee
          </a>

          <a
            href="/#faq"
            className="navbar__mobile-link"
            onClick={(e) => handleSectionClick(e, "faq")}
          >
            <span>05</span>
            FAQ
          </a>
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

          <Link to="/quote" className="btn btn--primary navbar__mobile-cta">
            Get an instant quote
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;