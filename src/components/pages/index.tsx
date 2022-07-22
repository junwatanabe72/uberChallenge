import React, { ReactElement } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  foodTrunkState,
  modalState,
  nearFoodTrunkState,
  userSettingState,
} from "../../store/atom";
import Box from "@mui/material/Box";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleMapComponent from "../templates/googleMap";
import Circle from "../templates/googleMap/Circle";
import Marker from "../templates/googleMap/Marker";
import FoodTrunksList from "../organisms/FoodTrunksList";
import AlertDialog from "../atoms/CustomDialog";
import CustomFab from "../atoms/CustomFab";
import CenterStack from "../atoms/CenterStack";

import {
  defaultCircleOption,
  defaultGoogleMapOption,
  markerIcon,
  searchCenterMarkerOption,
} from "../../utils/constant";
import { filterNearFoodTrunks } from "../../hooks/filterTrunks";
import DiscreteSliderMarks from "../atoms/CustomSlider";

const gMapheight = "45vh";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <CenterStack>Error</CenterStack>;
  return (
    <CenterStack height={gMapheight}>
      <CircularProgress />
    </CenterStack>
  );
};

const TopPage: React.FC = () => {
  const foodTrunks = useRecoilValue(foodTrunkState);
  const setModalState = useSetRecoilState(modalState);
  const [userSetting, setUserSetting] = useRecoilState(userSettingState);
  const [nearFoodTrunks, setNearFoodTrunk] = useRecoilState(nearFoodTrunkState);

  const onClickSearch = () => {
    const currentCenter = userSetting.currentCenter;
    const currentFoodTrunks = filterNearFoodTrunks(
      currentCenter,
      foodTrunks,
      userSetting.circleRange
    );
    setNearFoodTrunk(currentFoodTrunks);
    setUserSetting({
      ...userSetting,
      searchCenter: currentCenter,
      selectStoreNumber: -1,
    });
    return;
  };
  const onClickList = (num: number) => {
    setUserSetting({ ...userSetting, selectStoreNumber: num });
    setModalState(true);
  };
  const onClickMarker = (num: number) => {
    console.log("onClick");
    if (!nearFoodTrunks.length) {
      return;
    }
    setUserSetting({ ...userSetting, selectStoreNumber: num });
    setModalState(true);
    return;
  };
  const onMapIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    const tmpZoom = m.getZoom();
    if (!tmpZoom) {
      return;
    }
    if (tmpZoom !== userSetting.zoom) {
      setUserSetting({ ...userSetting, zoom: tmpZoom });
    }
    const tmpCenter = m.getCenter()?.toJSON();
    if (!tmpCenter) {
      return;
    }
  };
  const onMapDragend = (m: google.maps.Map) => {
    console.log("onDragend");
    const tmpCenter = m.getCenter()?.toJSON();
    const tmpZoom = m.getZoom();
    if (!tmpCenter || !tmpZoom) {
      return;
    }
    const targetGeo = tmpCenter;
    setUserSetting({ ...userSetting, zoom: tmpZoom, currentCenter: targetGeo });
    return;
  };
  const onMapDBlclick = (e: google.maps.MapMouseEvent) => {
    console.log("onDBlclick");
    if (e.latLng === null) {
      return;
    }
    const tmpCenter = e.latLng.toJSON();
    setUserSetting({ ...userSetting, currentCenter: tmpCenter });
    return;
  };
  return (
    <div style={{ position: "relative" }}>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY as string} render={render}>
        <CustomFab title={"search"} onClick={onClickSearch} />
        <GoogleMapComponent
          {...defaultGoogleMapOption}
          center={userSetting.currentCenter}
          onIdle={onMapIdle}
          onDBlclick={onMapDBlclick}
          onDragend={onMapDragend}
          zoom={userSetting.zoom}
          style={{ height: gMapheight }}
        >
          <Marker position={userSetting.currentCenter} />
          <Marker
            position={userSetting.searchCenter}
            icon={searchCenterMarkerOption}
          />
          <Circle {...defaultCircleOption(userSetting)} />
          {Object.values(nearFoodTrunks).map((marker, i) => {
            const { latitude, longitude } = marker;
            return (
              <Marker
                key={i}
                onClick={() => {
                  onClickMarker(i);
                }}
                clickable={true}
                position={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                icon={markerIcon(i === userSetting.selectStoreNumber)}
              />
            );
          })}
        </GoogleMapComponent>
        <DiscreteSliderMarks />
        {nearFoodTrunks && (
          <Box p={0} m={0}>
            <FoodTrunksList onClick={onClickList} foodTrunks={nearFoodTrunks} />
          </Box>
        )}
      </Wrapper>
      {nearFoodTrunks[userSetting.selectStoreNumber] && (
        <AlertDialog
          foodTrunk={nearFoodTrunks[userSetting.selectStoreNumber]}
        />
      )}
    </div>
  );
};

export default TopPage;
