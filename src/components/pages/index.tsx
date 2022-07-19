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
import {
  defaultCircleOption,
  defaultGoogleMapOption,
  defaultPositions,
  markerIcon,
  rangeOfCircle,
} from "../../utils/constant";

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

const userSetting = {
  zoom: 14,
  selectStoreNumber: 0,
  searchAction: false,
  center: defaultPositions,
};

const TopPage: React.FC<Props> = ({ foodTrunks }) => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [setting, setSetting] = useState(userSetting);
  const [nearFoodTrunks, setNearFoodTrunks] = useState<FoodTrunkPropety[]>([]);
  const [open, setOpen] = useState(false);

  const handleClick = (open: boolean) => {
    setOpen(open);
  };

  const onClickList = (num: number) => {
    setSetting({ ...setting, selectStoreNumber: num });
    handleClick(true);
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
    if (tmpZoom !== setting.zoom) {
      setSetting({ ...setting, zoom: tmpZoom });
    }
    if (!setting.searchAction) {
      return;
    }
    const tmpCenter = m.getCenter()?.toJSON();
    if (!tmpCenter) {
      return;
    }
    const currentFoodTrunks = filterNearFoodTrunks(
      tmpCenter,
      foodTrunks,
      rangeOfCircle
    );
    setNearFoodTrunks(currentFoodTrunks);
    setSetting({ ...setting, searchAction: false });
  };
  const onDragend = (m: google.maps.Map) => {
    const tmpCenter = m.getCenter()?.toJSON();
    const tmpZoom = m.getZoom();
    if (!tmpCenter || !tmpZoom) {
      return;
    }
    const targetGeo = tmpCenter;
    setSetting({ ...setting, zoom: tmpZoom, center: targetGeo });
    return;
  };
  return (
    <div style={{ position: "relative" }}>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <CustomFab
          title={"search"}
          onClick={() => {
            setSetting({ ...setting, searchAction: true });
          }}
        />
        <GoogleMapComponent
          {...defaultGoogleMapOption}
          center={setting.center}
          onClick={onClick}
          onIdle={onIdle}
          onDragend={onDragend}
          zoom={setting.zoom}
          style={{ height: "45vh" }}
        >
          <Marker position={setting.center} />
          <Circle {...defaultCircleOption(setting.center)} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            return (
              <Marker
                key={i}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                icon={markerIcon(i === setting.selectStoreNumber)}
              />
            );
          })}
        </GoogleMapComponent>
        {nearFoodTrunks && (
          <Box p={0} m={0}>
            <FoodTrunksList onClick={onClickList} foodTrunks={nearFoodTrunks} />
          </Box>
        )}
      </Wrapper>
      {nearFoodTrunks[setting.selectStoreNumber] && (
        <AlertDialog
          open={open}
          foodTrunk={nearFoodTrunks[setting.selectStoreNumber]}
          handleClose={() => {
            handleClick(false);
          }}
        />
      )}
    </div>
  );
};

export default TopPage;
