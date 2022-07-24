const R = Math.PI / 180;
const calDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    ) *
    1000
  );
};

export const filterNearFoodTrunks = (
  userSetting: UserSetting,
  allFoodTrunks: FoodTrunkPropety[]
) => {
  if (!allFoodTrunks.length) {
    return [];
  }
  const { searchCenter, circleRange } = userSetting;
  if (!searchCenter) {
    return [];
  }
  const { lat, lng } = searchCenter;
  const tmp = allFoodTrunks.filter((v) => {
    const distance = calDistance(
      lat,
      lng,
      parseFloat(v.latitude),
      parseFloat(v.longitude)
    );
    return distance < circleRange;
  });
  return tmp;
};
