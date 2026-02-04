import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation(); //Gets current url path
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          Dawenee Decor & Events
        </Link>
        <ul className="navbar__links">
          <li>
            <Link
              to="/"
              className={
                isActive("/")
                  ? "navbar__link navbar__link--active"
                  : "navbar__link"
              }
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
            >
              Portfolio
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
            >
              About
            </Link>
          </li>
          <li>
            {/* <Link
                to="/details"
                className={
                  isActive("/details")
                    ? "navbar__link navbar__link--active"
                    : "navbar__link"
                }
              >
                Project Details
              </Link> */}
          </li>
          <li>
            <Link to="/booking" className="navbar__cta">
              Book a Consultation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
