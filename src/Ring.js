import React from "react";

export default function Ring({ number }) {
  const MIN_WIDTH = 80;
  const INC_WIDTH = 15;

  const width = MIN_WIDTH + INC_WIDTH * number;

  return (
    <div className="Ring" style={{ width }}>
      {number}
    </div>
  );
}
