import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
} from "@react-google-maps/api";
import { fetchData } from "../hooks/fetch";

const containerStyle = {
  width: "700px",
  height: "400px",
};

const center = {
  lat: 37.72387884083248,
  lng: 237.57021237092852,
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY as string,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    fetchData(setMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const onUnmount = () => {
    setMap(null);
  };
  const onZoomChanged = () => {
    console.log("onZoomChanged");
  };
  const onIdle = () => {
    if (!map) {
      return;
    }
    const newCenter = map.getCenter();
    console.log([newCenter?.lat(), newCenter?.lng()]);
    console.log("onIdle");
    setMap(map);
  };
  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    if (!map) {
      return;
    }
    map.fitBounds(bounds);
    map.setZoom(5);
    setMap(map);
  };

  return isLoaded ? (
    <>
      {loadError && <>error</>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onIdle={onIdle}
        onLoad={(map) => {
          handleOnLoad(map);
        }}
        onZoomChanged={onZoomChanged}
        onUnmount={onUnmount}
      >
        <Circle
          onLoad={(circle) => {
            console.log("Circle onLoad circle: ", circle);
          }}
          onUnmount={onUnmount}
          // required
          center={center}
          // required
          options={circleOptions}
        />
        {markers.map((marker, num) => {
          const { latitude, longitude } = marker;
          // console.log(latitude);
          // console.log(latitude);
          return (
            <Marker
              key={num}
              position={{
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              }}
            />
          );
        })}
      </GoogleMap>
    </>
  ) : (
    <>loading</>
  );
};

export default React.memo(GoogleMapComponent);
