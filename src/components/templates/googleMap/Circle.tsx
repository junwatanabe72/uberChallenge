import React, { useState, useEffect } from "react";

const Circle: React.FC<google.maps.CircleOptions> = (options) => {
  const [circle, setMarker] = useState<google.maps.Circle>();

  useEffect(() => {
    if (!circle) {
      setMarker(new google.maps.Circle());
    }

    // remove circle from map on unmount
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle]);

  useEffect(() => {
    if (circle) {
      circle.setOptions(options);
    }
  }, [circle, options]);

  return null;
};

export default Circle;
