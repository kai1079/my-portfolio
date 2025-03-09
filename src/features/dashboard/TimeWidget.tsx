import React from "react";

const TimeWidget: React.FC = () => {
  return (
    <div className="widget">
      <h3>Current Time</h3>
      <p>{new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default TimeWidget;
