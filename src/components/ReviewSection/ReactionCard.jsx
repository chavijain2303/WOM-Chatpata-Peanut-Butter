import React from "react";

function ReactionCard({ data, onClick }) {
  return (
    <div className="reaction-card" onClick={onClick}>
      <div className="reaction-photo">
        <img src={data.image} alt={data.name} />
      </div>

      <p className="reaction-text">{data.reaction}</p>
      <span className="reaction-name">— {data.name}</span>
    </div>
  );
}

export default ReactionCard;
