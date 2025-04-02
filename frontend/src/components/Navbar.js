import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Ensure this file exists

function Navbar() {
  // Load Dark Mode from Local Storage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  // Update Dark Mode when it changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">📈 Stock Market Analyzer</Link>
        
        {/* Mobile Navbar Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/sentiment">Market Sentiment</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/auth">Sign Up / Login</Link></li> {/* ✅ Updated Link */}
          </ul>

          {/* Dark Mode Toggle Button */}
          <button className="btn btn-outline-secondary ms-3" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
