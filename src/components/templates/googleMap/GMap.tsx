import React, {
  Children,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
  useRef,
} from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onDragend?: (map: google.maps.Map) => void;
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepCompareEqualsForMaps = (a: any, b: any) => {
  return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const GoogleMapComponent: React.FC<MapProps> = ({
  onClick,
  onIdle,
  onDragend,
  children,
  style,
  ...options
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef() as any;
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle", "dragend"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }
      if (onDragend) {
        map.addListener("dragend", () => onDragend(map));
      }
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onDragend, onIdle]);
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
