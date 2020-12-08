import React from "react";
import Ring from "./Ring";

export default function Tower({ rings }) {
  return (
    <div className="Tower">
      <div className="tower-bg">
        <div className="tower-pillar"></div>
        <div className="tower-base"></div>
      </div>

      <div className="rings">
        {rings.map((ring) => {
          return <Ring number={ring} key={ring} />;
        })}
      </div>
    </div>
  );
}
