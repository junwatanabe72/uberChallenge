import React, { useState, useEffect, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Marker from "../templates/googleMap/Marker";
import GoogleMapComponent from "../templates/googleMap/GMap";
// import { fetchData } from "../hooks/fetch";

const defaultCenter = {
  lat: 37.72387884083248,
  lng: 237.57021237092852,
};
const defaultCenter2 = {
  lat: 38.72387884083248,
  lng: 237.57021237092852,
};
const defaultCenter3 = {
  lat: 38.72387884083248,
  lng: 227.57021237092852,
};

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>error</>;
  return <>loading</>;
};

const TopPage: React.FC = () => {
  // [START maps_react_map_component_app_state]
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    ...defaultCenter,
  });
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([
    defaultCenter3,
    defaultCenter2,
  ]);
  useEffect(() => {
    // fetchData(setMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };
  console.log(markers);
  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };
  // [END maps_react_map_component_app_state]

  // [START maps_react_map_component_app_return]
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <GoogleMapComponent
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ height: "50vh", width: "90vw" }}
        >
          <Marker position={center} />
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
        </GoogleMapComponent>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {/* {form} */}
    </div>
  );
  // [END maps_react_map_component_app_return]
};

export default TopPage;
// const form = (
//   <div
//     style={{
//       padding: "1rem",
//       flexBasis: "250px",
//       height: "100%",
//       overflow: "auto",
//     }}
//   >
//     <label htmlFor="zoom">Zoom</label>
//     <input
//       type="number"
//       id="zoom"
//       name="zoom"
//       value={zoom}
//       onChange={(event) => setZoom(Number(event.target.value))}
//     />
//     <br />
//     <label htmlFor="lat">Latitude</label>
//     <input
//       type="number"
//       id="lat"
//       name="lat"
//       value={center.lat}
//       onChange={(event) =>
//         setCenter({ ...center, lat: Number(event.target.value) })
//       }
//     />
//     <br />
//     <label htmlFor="lng">Longitude</label>
//     <input
//       type="number"
//       id="lng"
//       name="lng"
//       value={center.lng}
//       onChange={(event) =>
//         setCenter({ ...center, lng: Number(event.target.value) })
//       }
//     />
//     <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
//     {clicks.map((latLng, i) => (
//       <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//     ))}
//     <button onClick={() => setClicks([])}>Clear</button>
//   </div>
// );
