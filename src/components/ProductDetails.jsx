import React, { useState } from "react";
import "../styles/product.css";

function ProductDetails() {
  const [openSection, setOpenSection] = useState("description");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <section className="product-details">
      <div className="details-wrapper">
        {/* LEFT */}
        <div className="details-left">
          <h2>Product Details</h2>

          {/* Description */}
          <div className="accordion minimal">
            <div
              className="accordion-header"
              onClick={() => toggleSection("description")}
            >
              <div className="left">
                <span className="checkbox">✓</span>
                <span>Description</span>
              </div>
              <span className="icon">
                {openSection === "description" ? "⌃" : "⌄"}
              </span>
            </div>

            {openSection === "description" && (
              <div className="accordion-content">
                Maska Chatpata Peanut Butter is crafted for spice lovers. Made
                with premium roasted peanuts and Indian spices, it delivers a
                bold, savory kick with every spoon.
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="accordion minimal">
            <div
              className="accordion-header"
              onClick={() => toggleSection("info")}
            >
              <div className="left">
                <span className="checkbox">✓</span>
                <span>Additional Information</span>
              </div>
              <span className="icon">
                {openSection === "info" ? "⌃" : "⌄"}
              </span>
            </div>

            {openSection === "info" && (
              <div className="accordion-content">
                <ul>
                  <li>100% Vegetarian</li>
                  <li>No Added Sugar</li>
                  <li>No Palm Oil</li>
                  <li>High Protein</li>
                </ul>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="accordion minimal">
            <div
              className="accordion-header"
              onClick={() => toggleSection("features")}
            >
              <div className="left">
                <span className="checkbox">✓</span>
                <span>Features</span>
              </div>
              <span className="icon">
                {openSection === "features" ? "⌃" : "⌄"}
              </span>
            </div>

            {openSection === "features" && (
              <div className="accordion-content">
                Perfect for toast, parathas, smoothies, or straight from the jar.
                A guilt-free snack packed with protein and flavor.
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="accordion minimal">
            <div
              className="accordion-header"
              onClick={() => toggleSection("ingredients")}
            >
              <div className="left">
                <span className="checkbox">✓</span>
                <span>Ingredients</span>
              </div>
              <span className="icon">
                {openSection === "ingredients" ? "⌃" : "⌄"}
              </span>
            </div>

            {openSection === "ingredients" && (
              <div className="accordion-content">
                Roasted peanuts, cold-pressed oil, red chilli, black pepper,
                Himalayan pink salt.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="details-right">
          <img src="/images/product-detail.webp" alt="Product lifestyle" />
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
