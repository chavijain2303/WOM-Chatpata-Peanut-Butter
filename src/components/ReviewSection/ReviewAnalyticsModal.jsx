import React from "react";
import reviewData from "./reviewData";

function ReviewAnalyticsModal({ onClose }) {
  const reviews = reviewData.reviews;
  const total = reviews.length;

  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / total;

  const recentReview = [...reviews].sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const stats = {
    high: reviews.filter((r) => r.rating >= 4).length,
    moderate: reviews.filter((r) => r.rating === 3).length,
    low: reviews.filter((r) => r.rating <= 2).length,
  };

  /* ⭐ STAR BREAKDOWN */
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (r) => r.rating === star
    ).length;
    return {
      star,
      count,
      percent: total ? ((count / total) * 100).toFixed(1) : 0,
    };
  });

  /* 🌶️ MOOD DISTRIBUTION */
  const moodCounts = {};
  reviews.forEach((review) => {
    review.mood.forEach((m) => {
      moodCounts[m] = (moodCounts[m] || 0) + 1;
    });
  });

  const totalMoods = Object.values(moodCounts).reduce(
    (s, c) => s + c,
    0
  );

  const moodBreakdown = Object.entries(moodCounts).map(
    ([mood, count]) => ({
      mood,
      count,
      percent: totalMoods
        ? ((count / totalMoods) * 100).toFixed(1)
        : 0,
    })
  );

  return (
    <div className="review-modal" onClick={onClose}>
      <div
        className="review-modal-card analytics-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h3 className="analytics-title">Review Insights</h3>

        {/* TOP STATS */}
        <div className="analytics-cards">
          <div className="analytics-card">
            <h4>{avg.toFixed(1)}</h4>
            <div className="stars">★★★★★</div>
            <p>Average Rating</p>
          </div>

          <div className="analytics-card">
            <h4>{total}</h4>
            <p>Total Reviews</p>
          </div>

          <div className="analytics-card">
            <h4>{stats.high}</h4>
            <p>High Ratings (4–5★)</p>
          </div>

          <div className="analytics-card">
            <h4>{stats.low}</h4>
            <p>Low Ratings (1–2★)</p>
          </div>
        </div>

        {/* STAR BREAKDOWN */}
        <div className="rating-breakdown">
          <h4>Detailed Rating Breakdown</h4>

          {breakdown.map((row) => (
            <div className="rating-row" key={row.star}>
              <span>{row.star}★</span>
              <div className="rating-bar">
                <div
                  className={`rating-fill star-${row.star}`}
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span>{row.percent}%</span>
              <span>{row.count}</span>
            </div>
          ))}
        </div>

        {/* 🆕 MOOD BREAKDOWN */}
        <div className="rating-breakdown">
          <h4>Mood</h4>

          {moodBreakdown.map((row) => (
            <div className="rating-row" key={row.mood}>
              <span>{row.mood}</span>
              <div className="rating-bar">
                <div
                  className="rating-fill"
                  style={{
                    width: `${row.percent}%`,
                    background:
                      "linear-gradient(90deg,#ff7a18,#ffb347)",
                  }}
                />
              </div>
              <span>{row.percent}%</span>
              <span>{row.count}</span>
            </div>
          ))}
        </div>

        {/* ANALYSIS */}
        <div className="review-analysis">
          <div className="analysis-card">
            <h4>Most Recent Review</h4>
            <p>“{recentReview.story}”</p>
            <span>— {recentReview.name}</span>
          </div>

          <div className="analysis-card">
            <h4>Moderate Reviews</h4>
            <div className="progress yellow">
              {Math.round((stats.moderate / total) * 100)}%
            </div>
          </div>

          <div className="analysis-card">
            <h4>Critical Reviews</h4>
            <div className="progress red">
              {Math.round((stats.low / total) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAnalyticsModal;
