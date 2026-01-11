import React from "react";
import reviewData from "./reviewData";

function ReviewSummary() {
  const totalReviews = reviewData.reviews.length;

  const avgRating =
    reviewData.reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    ) / totalReviews;

  const roundedAvg = avgRating.toFixed(1);
  const fullStars = Math.floor(avgRating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="review-summary">
      <div className="summary-left">
        <div className="summary-stars">
          {"★".repeat(fullStars)}
          {"☆".repeat(emptyStars)}
        </div>
        <span className="summary-rating">
          {roundedAvg}
        </span>
      </div>

      <div className="summary-divider" />

      <div className="summary-right">
        <span className="summary-count">
          {totalReviews}
        </span>
        <span className="summary-label">
          REVIEWS
        </span>
      </div>
    </div>
  );
}

export default ReviewSummary;
