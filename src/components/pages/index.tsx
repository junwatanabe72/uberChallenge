import React, { useState, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleMapComponent from "../templates/googleMap/GMap";
import Circle from "../templates/googleMap/Circle";
import Marker from "../templates/googleMap/Marker";
import { sortNearFoodTrunks } from "../../hooks/sortTrunks";
import { defaultPositions } from "../../utils/constant";
import FoodTrunksList from "../organisms/FoodTrunksList";

interface Props {
  foodTrunks: FoodTrunkPropety[];
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>error</>;
  return <CircularProgress />;
};

const TopPage: React.FC<Props> = ({ foodTrunks }) => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(14); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    ...defaultPositions,
  });
  const [nearFoodTrunks, setNearFoodTrunks] = useState<FoodTrunkPropety[]>([]);
  const onClick = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    if (latLng === null) {
      return;
    }
    // const targetGeo = latLng.toJSON();
    setClicks([...clicks, latLng]);
  };
  const onDragend = (m: google.maps.Map) => {
    const targetGeo = m.getCenter()!.toJSON();
    setZoom(m.getZoom()!);
    setCenter(targetGeo);
    const currentFoodTrunks = sortNearFoodTrunks(targetGeo, foodTrunks, 10);
    setNearFoodTrunks(currentFoodTrunks);
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
    <>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <GoogleMapComponent
          center={center}
          onClick={onClick}
          onDragend={onDragend}
          gestureHandling={"cooperative"}
          minZoom={11}
          maxZoom={16}
          zoom={zoom}
          style={{ height: "47vh" }}
        >
          <Marker position={center} />
          <Circle {...circleOptions} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            return (
              <Marker
                key={i}
                animation={google.maps.Animation.DROP}
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
      <Box sx={{ display: "flex" }}>
        <FoodTrunksList foodTrunks={nearFoodTrunks} />
        <FoodTrunksList foodTrunks={nearFoodTrunks} />
      </Box>
    </>
  );
};

export default TopPage;
