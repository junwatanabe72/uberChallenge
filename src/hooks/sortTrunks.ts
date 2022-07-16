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
    )
  );
};

export const sortNearFoodTrunks = (
  targetDeo: google.maps.LatLngLiteral,
  allFoodTrunks: FoodTrunkPropety[],
  number: number
) => {
  const { lat, lng } = targetDeo;
  const result = allFoodTrunks.sort(function (a, b) {
    const aDistance = calDistance(
      lat,
      lng,
      parseFloat(a.latitude),
      parseFloat(a.longitude)
    );
    const bDistance = calDistance(
      lat,
      lng,
      parseFloat(b.latitude),
      parseFloat(b.longitude)
    );
    return aDistance < bDistance ? -1 : 1;
  });
  return Array.from({ length: number }).map((_, num) => {
    return result[num];
  });
};
