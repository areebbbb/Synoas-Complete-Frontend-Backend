import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import React from "react";

const VectorMapComp = () => {
  return (
    <div className="w-full h-full">
      <VectorMap
        map={worldMill}
        className="w-full h-full"
        height={500}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default VectorMapComp;
