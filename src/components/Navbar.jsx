import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onOpenQuote, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
      {/* Brand Logo */}
      <Link className="brand" to="/" onClick={() => setMobileOpen(false)}>
        <img
          src="/img/logo-mark.png"
          alt="Cruise Console Logistics"
          className="brand-logo"
        />
      </Link>

      {/* Navigation Links */}
      <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileOpen(false)}
        >
          [Home]
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileOpen(false)}
        >
          [Services]
        </NavLink>

        <NavLink
          to="/global-network"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileOpen(false)}
        >
          [Global Network]
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileOpen(false)}
        >
          [About]
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMobileOpen(false)}
        >
          [Contact]
        </NavLink>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        {/* <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === "dark" ? "☀" : "☾"}
          </span>
          <span className="theme-toggle-label">
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button> */}

        {/* Quote Modal Trigger */}
        <button
          type="button"
          className="nav-cta"
          onClick={() => {
            setMobileOpen(false);
            onOpenQuote();
          }}
        >
          Get a Quote
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>


    </nav>
  );
}
