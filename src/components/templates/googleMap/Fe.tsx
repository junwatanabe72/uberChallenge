import React from "react";
import Circle from "./Circle";
import Marker from "./Marker";

const marker = "marker" as const;
const circle = "circle" as const;

interface Props {
  type: typeof marker | typeof circle;
  featureOptions?: any;
}

const FeaturesComponent: React.FC<Props> = ({ type, featureOptions }) => {
  const component = {
    marker: <Marker position={featureOptions.position} />,
    circle: <Circle {...featureOptions} />,
  } as const;
  console.log(featureOptions.position);
  return component[type];
};

export default FeaturesComponent;
