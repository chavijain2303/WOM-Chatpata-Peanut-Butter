import React, { useState } from "react";
import reactionData from "./reactionData";
import ReactionCard from "./ReactionCard";
import "../../styles/review.css";

function ReactionAlbum() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="reaction-section">
      <h2 className="reaction-title">
        First Bite Reactions <span>📸</span>
      </h2>

      <p className="reaction-sub">
        Real people. Real first bites. No filters.
      </p>

      <div className="reaction-wall">
        {reactionData.map((item) => (
          <ReactionCard
            key={item.id}
            data={item}
            onClick={() => setActivePhoto(item)}
          />
        ))}
      </div>

      {activePhoto && (
        <div
          className="reaction-modal"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="reaction-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.image}
              alt={activePhoto.name}
            />
            <p>{activePhoto.reaction}</p>
            <span>— {activePhoto.name}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReactionAlbum;
