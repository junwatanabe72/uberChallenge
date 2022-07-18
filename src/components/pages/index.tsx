import React, { useState, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleMapComponent from "../templates/googleMap/GMap";
import Circle from "../templates/googleMap/Circle";
import Marker from "../templates/googleMap/Marker";
import FoodTrunksList from "../organisms/FoodTrunksList";
import AlertDialog from "../atoms/CustomDialog";
import CustomFab from "../atoms/CustomFab";
import CenterStack from "../atoms/CenterStack";
import { filterNearFoodTrunks } from "../../hooks/filterTrunks";
import { defaultPositions } from "../../utils/constant";

interface Props {
  foodTrunks: FoodTrunkPropety[];
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>error</>;
  return (
    <CenterStack>
      <CircularProgress />
    </CenterStack>
  );
};

const TopPage: React.FC<Props> = ({ foodTrunks }) => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(14);
  const [selectStoreNumber, setSelectStoreNumber] = useState(0);
  const [searchAction, setSearchAction] = useState<boolean>(false);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    ...defaultPositions,
  });
  const [nearFoodTrunks, setNearFoodTrunks] = useState<FoodTrunkPropety[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onClickList = (num: number) => {
    setSelectStoreNumber(num);
    handleClickOpen();
  };
  const onClick = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    if (latLng === null) {
      return;
    }
    setClicks([...clicks, latLng]);
  };
  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    const tmpZoom = m.getZoom();
    if (!tmpZoom) {
      return;
    }
    setZoom(tmpZoom);
    if (!searchAction) {
      return;
    }
    const tmpCenter = m.getCenter()?.toJSON();
    if (!tmpCenter) {
      return;
    }
    console.log("search");
    const currentFoodTrunks = filterNearFoodTrunks(tmpCenter, foodTrunks, 300);
    setNearFoodTrunks(currentFoodTrunks);
    setSearchAction(false);
  };
  const onDragend = (m: google.maps.Map) => {
    const tmpCenter = m.getCenter()?.toJSON();
    const tmpZoom = m.getZoom();
    if (!tmpCenter || !tmpZoom) {
      return;
    }
    const targetGeo = tmpCenter;
    setZoom(tmpZoom);
    setCenter(targetGeo);
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0,
    center: center,
    radius: 300,
  } as const;

  return (
    <div style={{ position: "relative" }}>
      <CustomFab
        title={"search"}
        onClick={() => {
          setSearchAction(true);
          setSelectStoreNumber(0);
        }}
      />
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <GoogleMapComponent
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          onDragend={onDragend}
          gestureHandling={"cooperative"}
          minZoom={11}
          maxZoom={20}
          zoom={zoom}
          style={{ height: "45vh" }}
        >
          <Marker position={center} />
          <Circle {...circleOptions} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            const icon =
              i === selectStoreNumber
                ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                : "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
            return (
              <Marker
                key={i}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                icon={icon}
              />
            );
          })}
        </GoogleMapComponent>
      </Wrapper>
      {nearFoodTrunks && (
        <Box p={0} m={0}>
          <FoodTrunksList onClick={onClickList} foodTrunks={nearFoodTrunks} />
        </Box>
      )}
      {nearFoodTrunks[selectStoreNumber] && (
        <AlertDialog
          open={open}
          foodTrunk={nearFoodTrunks[selectStoreNumber]}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TopPage;
