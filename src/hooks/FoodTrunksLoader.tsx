import React from "react";
import GoogleMapComponent from "../components/pages/";
import { fetchData } from "./fetch";

let foodTrunks: FoodTrunkPropety[] | undefined;

const FoodTrunksLoader: React.FC = () => {
  if (foodTrunks === undefined) {
    throw fetchData().then((d) => (foodTrunks = d));
  }
  return <GoogleMapComponent foodTrunks={foodTrunks} />;
};

export default FoodTrunksLoader;
