import React, { useState, useEffect } from "react";

interface LayerProps extends google.maps.KmlLayerOptions {
  onClick?: (num: number) => void;
}

const Layer: React.FC<LayerProps> = (props) => {
  const { onClick, ...options } = props;
  const [layer, setLayer] = useState<google.maps.visualization.HeatmapLayer>();

  const heatMapData = [
    { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },
    new google.maps.LatLng(37.782, -122.445),
    { location: new google.maps.LatLng(37.782, -122.443), weight: 2 },
    { location: new google.maps.LatLng(37.782, -122.441), weight: 3 },
    { location: new google.maps.LatLng(37.782, -122.439), weight: 2 },
    new google.maps.LatLng(37.782, -122.437),
    { location: new google.maps.LatLng(37.782, -122.435), weight: 0.5 },

    { location: new google.maps.LatLng(37.785, -122.447), weight: 3 },
    { location: new google.maps.LatLng(37.785, -122.445), weight: 2 },
    new google.maps.LatLng(37.785, -122.443),
    { location: new google.maps.LatLng(37.785, -122.441), weight: 0.5 },
    new google.maps.LatLng(37.785, -122.439),
    { location: new google.maps.LatLng(37.785, -122.437), weight: 2 },
    { location: new google.maps.LatLng(37.785, -122.435), weight: 3 },
  ];
  useEffect(() => {
    if (!layer) {
      setLayer(
        new google.maps.visualization.HeatmapLayer({ data: heatMapData })
      );
    }
    // remove layer from map on unmount
    return () => {
      if (layer) {
        layer.setMap(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer]);

  useEffect(() => {
    if (layer) {
      layer.setOptions(options);
    }
    if (layer) {
      ["click"].forEach((eventName) =>
        google.maps.event.clearListeners(layer, eventName)
      );
      if (onClick) {
        layer.addListener("click", onClick);
      }
    }
  }, [layer, options, onClick]);

  return null;
};

export default Layer;
