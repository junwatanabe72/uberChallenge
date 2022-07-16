import React, { useState, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleMapComponent from "../templates/googleMap/GMap";
import Circle from "../templates/googleMap/Circle";
import Marker from "../templates/googleMap/Marker";

interface Props {
  foodTrunks: FoodTrunkPropety[];
}
const defaultCenter = {
  lat: 37.72387884083248,
  lng: 237.57021237092852,
};

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>error</>;
  return <CircularProgress />;
};

const TopPage: React.FC<Props> = ({ foodTrunks }) => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(13); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    ...defaultCenter,
  });
  const [nearFoodTrunks, setNearFoodTrunks] = useState<FoodTrunkPropety[]>([]);
  const randomArray = () => {
    const min = 1;
    const max = 400;
    return Array.from({ length: 100 }).map((i) => {
      const a = Math.floor(Math.random() * (max + 1 - min)) + min;
      return foodTrunks[a];
    });
  };
  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([...clicks, e.latLng!]);
  };
  const onDragend = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
    const a = randomArray();
    console.log(a);
    setNearFoodTrunks(a);
  };
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0,
    center: center,
    radius: 300,
  } as const;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <GoogleMapComponent
          center={center}
          onClick={onClick}
          onDragend={onDragend}
          zoom={zoom}
          style={{ height: "50vh", width: "90vw" }}
        >
          <Marker position={center} />
          <Circle {...circleOptions} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            return (
              <Marker
                key={i}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                icon={image}
              />
            );
          })}
        </GoogleMapComponent>
      </Wrapper>
    </div>
  );
};

export default TopPage;
