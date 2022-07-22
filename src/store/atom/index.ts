import { atom, selector } from "recoil";
import { fetchData } from "../../hooks/fetch";
import { defaultUserSetting } from "../../utils/constant";

const recoilKeys = {
  foodTrunkState: "foodTrunkState",
  modalState: "modalState",
  currentListState: "currentListState",
  nearFoodTrunkState: "nearFoodTrunkState",
  userSettingState: "userSettingState",
} as const;
// type RecoilKeys = typeof recoilKeys[keyof typeof recoilKeys];

export const modalState = atom<boolean>({
  key: recoilKeys.modalState,
  default: false,
});

export const foodTrunkState = selector<FoodTrunkPropety[]>({
  key: recoilKeys.foodTrunkState,
  get: async () => {
    const foodTrunks = await fetchData();
    return foodTrunks;
  },
});
export const nearFoodTrunkState = atom<FoodTrunkPropety[]>({
  key: recoilKeys.nearFoodTrunkState,
  default: [],
});
export const userSettingState = atom<UserSetting>({
  key: recoilKeys.userSettingState,
  default: defaultUserSetting,
});
