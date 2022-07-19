import { fetchUrl } from "../utils/constant";
import axios from "axios";
export const fetchData = async () => {
  const { data } = await axios.get(fetchUrl);
  return data as FoodTrunkPropety[];
};
