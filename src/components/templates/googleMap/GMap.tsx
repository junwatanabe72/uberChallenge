import React, { Children, cloneElement, isValidElement, useRef } from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onDragend?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  children?: React.ReactNode;
}

const deepCompareEqualsForMaps = (a: any, b: any) => {
  return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
};

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const GoogleMapComponent: React.FC<MapProps> = ({
  onClick,
  onDragend,
  children,
  style,
  ...options
}) => {
  const ref = useRef() as any;
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  React.useEffect(() => {
    if (map) {
      ["click", "dragend"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }
      if (onDragend) {
        console.log("dragend");
        map.addListener("dragend", () => onDragend(map));
      }
    }
  }, [map, onClick, onDragend]);
  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default GoogleMapComponent;
