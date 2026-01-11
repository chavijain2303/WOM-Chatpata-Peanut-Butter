import React from "react";

function TasteChart() {
  const tasteData = [
    { label: "Spice", value: 90 },
    { label: "Crunch", value: 75 },
    { label: "Creamy", value: 85 },
    { label: "Clean", value: 95 },
  ];

  return (
    <div className="taste-chart scroll-reveal delay">
      <h3>Taste DNA</h3>

      {tasteData.map((item, index) => (
        <div className="taste-row" key={index}>
          <span className="taste-label">{item.label}</span>
          <div className="taste-bar">
            <div
              className="taste-fill"
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasteChart;
