import React, { useEffect, useState } from "react";
import reviewData from "./reviewData";

function AnimatedNumber({ value, duration = 800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toFixed(1)}</>;
}

function ReviewAnalyticsPreview({ onOpen }) {
  const reviews = reviewData.reviews;
  const total = reviews.length;

  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / total;

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (r) => r.rating === star
    ).length;
    return {
      star,
      count,
      percent: total
        ? Math.round((count / total) * 100)
        : 0,
    };
  });

  const high = reviews.filter((r) => r.rating >= 4).length;
  const moderate = reviews.filter(
    (r) => r.rating === 3
  ).length;
  const low = reviews.filter((r) => r.rating <= 2).length;

  return (
    <div className="analytics-preview">
      <div className="analytics-header">
        <h3>Review Analytics</h3>
        <button
          className="analytics-btn"
          onClick={onOpen}
        >
          Detailed Analytics
        </button>
      </div>

      {/* TOP NUMBERS */}
      <div className="analytics-top">
        <div className="analytics-metric">
          <span className="metric-value">
            <AnimatedNumber value={avg} />★
          </span>
          <span className="metric-label">
            Average Rating
          </span>
        </div>

        <div className="analytics-metric">
          <span className="metric-value">
            <AnimatedNumber value={total} />
          </span>
          <span className="metric-label">
            Total Reviews
          </span>
        </div>
      </div>

      {/* STAR BREAKDOWN */}
      <div className="analytics-stars">
        {breakdown.map((row) => (
          <div className="star-row" key={row.star}>
            <span>{row.star}★</span>
            <div className="star-bar">
              <div
                className={`star-fill star-${row.star}`}
                style={{ width: `${row.percent}%` }}
              />
            </div>
            <span>{row.percent}%</span>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="analytics-summary">
        <div>
          <strong>
            {Math.round((high / total) * 100)}%
          </strong>
          <span>High (4–5★)</span>
        </div>
        <div>
          <strong>
            {Math.round((moderate / total) * 100)}%
          </strong>
          <span>Moderate (3★)</span>
        </div>
        <div>
          <strong>
            {Math.round((low / total) * 100)}%
          </strong>
          <span>Low (1–2★)</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewAnalyticsPreview;
