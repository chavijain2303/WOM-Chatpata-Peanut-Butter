import React, { useState } from "react";
import { timeAgo } from "./utils/timeAgo";

function ReviewCard({ review, onClick }) {
  const [helpful, setHelpful] = useState(review.helpful);

  return (
    <div className="review-card" onClick={onClick}>
      <div className="review-top">
        <div className="review-stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>
        <span className="review-time">
          {timeAgo(review.createdAt)}
        </span>
      </div>

      <p className="review-moment">{review.moment}</p>
      <p className="review-story">“{review.story}”</p>

      <div className="review-moods">
        {review.mood.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="review-footer">
        <span className="review-name">— {review.name}</span>

        <button
          className="helpful-btn"
          onClick={(e) => {
            e.stopPropagation(); // ⛔ prevent modal opening
            setHelpful((h) => h + 1);
          }}
        >
          👍 Helpful ({helpful})
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;
