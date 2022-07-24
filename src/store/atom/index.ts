import { atom, selector } from "recoil";
import { filterNearFoodTrunks } from "../../hooks/filterTrunks";
import { defaultUserSetting } from "../../utils/constant";

const recoilKeys = {
  userSettingState: "userSettingState",
  foodTrunkState: "foodTrunkState",
  nearFoodTrunkState: "nearFoodTrunkState",
  currentFoodTrunksState: "currentFoodTrunksState",
  modalState: "modalState",
} as const;

export const modalState = atom<boolean>({
  key: recoilKeys.modalState,
  default: false,
});

export const foodTrunkState = atom<FoodTrunkPropety[]>({
  key: recoilKeys.foodTrunkState,
  default: [],
});
export const nearFoodTrunkState = atom<FoodTrunkPropety[]>({
  key: recoilKeys.nearFoodTrunkState,
  default: [],
});
export const userSettingState = atom<UserSetting>({
  key: recoilKeys.userSettingState,
  default: defaultUserSetting,
});

export const currentFoodTrunksState = selector<FoodTrunkPropety[]>({
  key: recoilKeys.currentFoodTrunksState,
  get: ({ get }) => get(nearFoodTrunkState),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set: ({ get, set }, newValue) => {
    const foodTrunk = get(foodTrunkState);
    const userSetting = get(userSettingState);
    const result = filterNearFoodTrunks(userSetting, foodTrunk);
    set(nearFoodTrunkState, result);
  },
});
