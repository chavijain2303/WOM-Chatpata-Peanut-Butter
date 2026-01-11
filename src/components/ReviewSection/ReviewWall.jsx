import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import StoryReview from "./StoryReview";
import TasteChart from "./TasteChart";
import ReactionAlbum from "./ReactionAlbum";
import ReviewSummary from "./ReviewSummary";
import ReviewAnalyticsPreview from "./ReviewAnalyticsPreview";
import ReviewAnalyticsModal from "./ReviewAnalyticsModal";
import reviewData from "./reviewData";
import "../../styles/review.css";

function ReviewWall() {
  /* ---------------- STATE ---------------- */
  const [activeReview, setActiveReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortType, setSortType] = useState("recent");
  const [moodFilter, setMoodFilter] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  /* ---------------- REFS ---------------- */
  const autoSlideRef = useRef(null);
  const maxIndexRef = useRef(0);

  /* ---------------- SLIDER CONFIG ---------------- */
  const CARD_WIDTH = 280;
  const GAP = 24;

  const visibleCards = Math.floor(
    window.innerWidth / (CARD_WIDTH + GAP)
  );

  /* ---------------- FILTERED REVIEWS ---------------- */
  const filteredReviews = [...reviewData.reviews]
    .filter((r) =>
      moodFilter ? r.mood.includes(moodFilter) : true
    )
    .sort((a, b) => {
      if (sortType === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortType === "high") return b.rating - a.rating;
      if (sortType === "moderate")
        return Math.abs(a.rating - 3) - Math.abs(b.rating - 3);
      if (sortType === "low") return a.rating - b.rating;
      return 0;
    });

  const maxIndex = Math.max(
    filteredReviews.length - visibleCards,
    0
  );

  /* keep maxIndex fresh for interval */
  useEffect(() => {
    maxIndexRef.current = maxIndex;
  }, [maxIndex]);

  /* ---------------- AUTO DRIFT (STABLE) ---------------- */
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const max = maxIndexRef.current;
        return prev < max ? prev + 1 : 0;
      });
    }, 1800);

    return () => clearInterval(autoSlideRef.current);
  }, []);

  /* Reset slider on filter change */
  useEffect(() => {
    setCurrentIndex(0);
  }, [sortType, moodFilter]);

  /* ---------------- CONTROLS ---------------- */
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < maxIndex ? prev + 1 : prev
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const clearFilters = () => {
    setSortType("recent");
    setMoodFilter(null);
    setCurrentIndex(0);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <section className="review-section">
      {/* HEADER */}
      <div className="review-header">
        <h2>Real People. Real Cravings.</h2>
        <p className="header-sub">
          Slowly drifting — take control anytime
        </p>

        <ReviewSummary />
      </div>

      {/* STORY */}
      <StoryReview />

      {/* TASTE + ANALYTICS */}
      <div className="review-insights analytics-layout">
        <TasteChart />
        <ReviewAnalyticsPreview
          onOpen={() => setShowAnalytics(true)}
        />
      </div>

      {/* FILTERS */}
      <div className="review-filters">
        <div className="filter-group">
          <button
            className={sortType === "recent" ? "active" : ""}
            onClick={() => setSortType("recent")}
          >
            🕒 Most Recent
          </button>
          <button
            className={sortType === "high" ? "active" : ""}
            onClick={() => setSortType("high")}
          >
            ⭐ Highest
          </button>
          <button
            className={sortType === "moderate" ? "active" : ""}
            onClick={() => setSortType("moderate")}
          >
            🙂 Moderate
          </button>
          <button
            className={sortType === "low" ? "active" : ""}
            onClick={() => setSortType("low")}
          >
            ⚠️ Low
          </button>
        </div>

        <div className="filter-group">
          {["Spicy", "Healthy", "Crunchy", "Moderate"].map((m) => (
            <button
              key={m}
              className={moodFilter === m ? "active" : ""}
              onClick={() =>
                setMoodFilter(moodFilter === m ? null : m)
              }
            >
              {m}
            </button>
          ))}

          {(moodFilter || sortType !== "recent") && (
            <button
              className="clear-filter"
              onClick={clearFilters}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <div className="review-slider">
        <button
          className="slider-btn left"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div
          className="review-slider-window"
          onMouseEnter={() =>
            clearInterval(autoSlideRef.current)
          }
          onMouseLeave={() => {
            autoSlideRef.current = setInterval(() => {
              setCurrentIndex((prev) => {
                const max = maxIndexRef.current;
                return prev < max ? prev + 1 : 0;
              });
            }, 1800);
          }}
        >
          <div
            className="review-wall"
            style={{
              transform: `translateX(-${
                currentIndex * (CARD_WIDTH + GAP)
              }px)`,
            }}
          >
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onClick={() => setActiveReview(review)}
              />
            ))}
          </div>
        </div>

        <button
          className="slider-btn right"
          onClick={handleNext}
        >
          ›
        </button>
      </div>

      {/* REVIEW MODAL */}
      {activeReview && (
        <div
          className="review-modal"
          onClick={() => setActiveReview(null)}
        >
          <div
            className="review-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setActiveReview(null)}
            >
              ✕
            </button>

            <div className="review-stars">
              {"★".repeat(activeReview.rating)}
            </div>

            <p className="review-moment">
              {activeReview.moment}
            </p>

            <p className="review-story">
              “{activeReview.story}”
            </p>

            <div className="review-tags">
              {activeReview.mood.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>

            <span className="review-name">
              — {activeReview.name}
            </span>
          </div>
        </div>
      )}

      {/* ANALYTICS MODAL */}
      {showAnalytics && (
        <ReviewAnalyticsModal
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {/* REACTIONS */}
      <ReactionAlbum />
    </section>
  );
}

export default ReviewWall;
