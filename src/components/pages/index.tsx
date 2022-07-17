import React, { useState, ReactElement } from "react";
import Box from "@mui/material/Box";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleMapComponent from "../templates/googleMap/GMap";
import Circle from "../templates/googleMap/Circle";
import Marker from "../templates/googleMap/Marker";
import { sortNearFoodTrunks } from "../../hooks/sortTrunks";
import { defaultPositions } from "../../utils/constant";
import FoodTrunksList from "../organisms/FoodTrunksList";
import AlertDialog from "../atoms/CustomDialog";

interface Props {
  foodTrunks: FoodTrunkPropety[];
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <>error</>;
  return <CircularProgress />;
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
    if (!searchAction) {
      return;
    }
    const tmpCenter = m.getCenter()?.toJSON();
    if (!tmpCenter) {
      return;
    }
    console.log("search");
    const currentFoodTrunks = sortNearFoodTrunks(tmpCenter, foodTrunks, 10);
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
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          variant="extended"
          onClick={() => {
            setSearchAction(true);
            setSelectStoreNumber(0);
          }}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Navigate
        </Fab>
      </Box>
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
          style={{ height: "47vh" }}
        >
          <Marker position={center} />
          <Circle {...circleOptions} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            console.log(nearFoodTrunks);
            const icon =
              i === selectStoreNumber
                ? {
                    fillColor: "blue",
                    fillOpacity: 0.8,
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 16,
                    strokeColor: "blue",
                    strokeWeight: 1.0,
                  }
                : {
                    fillColor: "red",
                    fillOpacity: 0.8,
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 16,
                    strokeColor: "red",
                    strokeWeight: 1.0,
                  };
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
      <Box>
        <FoodTrunksList onClick={onClickList} foodTrunks={nearFoodTrunks} />
      </Box>
      {nearFoodTrunks[selectStoreNumber] && (
        <AlertDialog
          open={open}
          foodTrunk={nearFoodTrunks[selectStoreNumber]}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default TopPage;
