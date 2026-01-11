import React from "react";
import "../styles/global.css";

function Navbar() {
  return (
    <header className="navbar">
      {/* Moving Offer Strip */}
      <div className="offer-strip">
        <div className="offer-track">
          <span>
            GET 5% OFF • USE CODE <strong>HEALTHY5</strong>
          </span>
          <span>FREE SHIPPING ON ORDERS ABOVE ₹499</span>
          <span>PROTEIN THAT ACTUALLY TASTES GOOD</span>
          <span>NO PALM OIL • NO ADDED SUGAR</span>

          {/* Duplicate for seamless loop */}
          <span>
            GET 5% OFF • USE CODE <strong>HEALTHY5</strong>
          </span>
          <span>FREE SHIPPING ON ORDERS ABOVE ₹499</span>
          <span>PROTEIN THAT ACTUALLY TASTES GOOD</span>
          <span>NO PALM OIL • NO ADDED SUGAR</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="nav-container">
        {/* Logo */}
        <div className="logo">
          <span
            style={{
              fontFamily: "Caveat, cursive",
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            MASKA
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>Home</li>
          <li>Products</li>
          <li>Blogs</li>
          <li>Contact</li>
          <li>Track My Order</li>
        </ul>

        {/* Right Icons */}
        <div className="nav-icons">
          <span>🔍</span>
          <span>👤</span>
          <span>🤍</span>
          <span>🛒</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
