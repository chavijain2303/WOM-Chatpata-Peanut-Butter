import React from "react";

function ReviewFilters({ setSort, setMood }) {
  return (
    <div className="review-filters">
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="recent">Most Recent</option>
        <option value="high">Highest Rating</option>
        <option value="low">Lowest Rating</option>
      </select>

      <select onChange={(e) => setMood(e.target.value)}>
        <option value="">All Moods</option>
        <option value="Spicy">Spicy</option>
        <option value="Healthy">Healthy</option>
        <option value="Crunchy">Crunchy</option>
        <option value="Moderate">Moderate</option>
      </select>
    </div>
  );
}

export default ReviewFilters;
