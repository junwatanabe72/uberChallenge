import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "400px",
};

const center = {
  lat: 37.72387884083248,
  lng: 122.3870108787852,
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // const onLoad = (map: google.maps.Map | null) => {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   if (!map) {
  //     return;
  //   }
  //   (map as google.maps.Map).fitBounds(bounds);
  //   setMap(map as google.maps.Map);
  // };

  const fetchData = async () => {
    let array = [] as any[]; // 細切れの値をここに結合していく。
    const decoder = new TextDecoder();
    await fetch("https://data.sfgov.org/resource/rqzj-sfat.json")
      .then((response: any) => response.body.getReader()) // ReadableStreamを取得する。
      .then((reader) => {
        // ReadableStream.read()はPromiseを返す。
        // Promiseは{ done, value }として解決される。
        // データを読み込んだとき：doneはfalse, valueは値。
        // データを読み込み終わったとき：doneはtrue, valueはundefined。
        function readChunk({ done, value }: { done: any; value: any }) {
          if (done) {
            // 読み込みが終わっていれば最終的なテキストを表示する。
            // console.log(array);
            setMarkers(array);
            setMap(map);
            return;
          }

          array = [...JSON.parse(decoder.decode(value)), ...array];
          // 次の値を読みにいく。
          reader.read().then(readChunk);
        }

        // 最初の値を読み込む。
        reader.read().then(readChunk);

        // const result = JSON.stringify(a.body);
        // // setMarkers(result);
        // console.log(result);
        return;
      });
  };
  console.log(markers);
  useEffect(() => {
    fetchData();
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
  // const optionss = { closeBoxURL: "", enableEventPropagation: true };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onUnmount={onUnmount}
    >
      <Circle
        // optional
        onLoad={(circle) => {
          console.log("Circle onLoad circle: ", circle);
        }}
        // optional
        onUnmount={onUnmount}
        // required
        center={center}
        // required
        options={circleOptions}
      />
      {markers.map((marker, num) => {
        const { latitude, longitude } = marker;
        // console.log(marker);
        // console.log(latitude);
        return (
          <Marker
            key={num}
            onLoad={(marker) => {
              console.log("Circle onLoad circle: ", marker);
            }}
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComponent);
