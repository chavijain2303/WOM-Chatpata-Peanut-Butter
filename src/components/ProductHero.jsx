import React, { useState } from "react";
import "../styles/product.css";

function ProductHero() {
  const [size, setSize] = useState("300g");
  const [quantity, setQuantity] = useState(1);

  // 👉 Images array
  const images = [
    "/images/jar.webp",
    "/images/jar-angle.png",
    "/images/nutrition.png",
    "/images/lifestyle.png",
  ];

  // 👉 Main image state
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="product-hero">
      {/* Left: Product Images */}
      <div className="product-image">
        {/* Main Image */}
        <div className="main-image">
          <img src={mainImage} alt="Maska Chatpata Peanut Butter" />
        </div>

        {/* Thumbnails */}
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={mainImage === img ? "active" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="product-info">
        <span className="brand">Maskabutters</span>
        <h1>Chatpata Peanut Butter (Spicy)</h1>

        <div className="rating">
          ⭐ 4.1 <span>(10000+ units sold)</span>
        </div>

        <div className="price">
          <span className="old-price">Rs. 339.00</span>
          <span className="new-price">Rs. 288.20</span>
          <span className="sale">Sale</span>
        </div>

        <p className="shipping">Free Shipping</p>

        {/* Size Selector */}
        <div className="sizes">
          <p>Size</p>
          <div className="size-buttons">
            <button
              className={size === "300g" ? "active" : ""}
              onClick={() => setSize("300g")}
            >
              300g
            </button>
            <button
              className={size === "500g" ? "active" : ""}
              onClick={() => setSize("500g")}
            >
              500g
            </button>
          </div>
        </div>

        {/* Quantity */}
        <div className="quantity">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            −
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button className="add-to-cart">Add to Cart</button>

        <div className="badges">
          <span>Lab Tested</span>
          <span>Backed by Science</span>
          <span>Fast Shipping</span>
        </div>
      </div>
    </section>
  );
}

export default ProductHero;
