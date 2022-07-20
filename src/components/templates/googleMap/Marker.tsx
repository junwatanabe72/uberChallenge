import React, { useState, useEffect } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  onClick?: (num: number) => void;
}

const Marker: React.FC<MarkerProps> = (props) => {
  const { onClick, ...options } = props;
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
    if (marker) {
      ["click"].forEach((eventName) =>
        google.maps.event.clearListeners(marker, eventName)
      );
      if (onClick) {
        marker.addListener("click", onClick);
      }
    }
  }, [marker, options, onClick]);

  return null;
};

export default Marker;
