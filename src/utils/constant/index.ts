export const appTitle = "SearchFoodTrunks in SF";
export const description = "search Food Trunks In SF";
export const imagePath = "";
export const siteUrl = "https://uberchallenge.netlify.app/";
// San Francisco City Hall
export const defaultPositions = {
  lat: 37.779384443562826,
  lng: -122.41926798915804,
};
export const fetchUrl = "https://data.sfgov.org/resource/rqzj-sfat.json";
export const rangeOfCircle = 500;
export const foodTrnkListTextOfEmpty = "Not Result";
export const defaultUserSetting = {
  zoom: 14,
  selectStoreNumber: -1,
  searchAction: false,
  center: defaultPositions,
};
export const defaultCircleOption = (posititon: google.maps.LatLngLiteral) => {
  return {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0,
    center: posititon,
    radius: rangeOfCircle,
  };
};
export const defaultGoogleMapOption = {
  streetViewControl: false,
  gestureHandling: "cooperative",
  minZoom: 11,
  maxZoom: 20,
};
export const dammyImage =
  "https://res.cloudinary.com/dulbhhpbj/image/upload/v1658236910/cld-sample-4.jpg";
export const markerIcon = (isTarget: boolean) => {
  if (isTarget) {
    return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  }
  return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
};
export const testProperty: FoodTrunkPropety = {
  objectid: "1571753",
  applicant: "The Geez Freeze",
  facilitytype: "Truck",
  cnn: "887000",
  locationdescription: "18TH ST: DOLORES ST to CHURCH ST (3700 - 3799)",
  address: "3750 18TH ST",
  blocklot: "3579006",
  block: "3579",
  lot: "006",
  permit: "21MFF-00015",
  status: "APPROVED",
  fooditems: "Snow Cones: Soft Serve Ice Cream & Frozen Virgin Daiquiris",
  x: "6004575.869",
  y: "2105666.974",
  latitude: "37.76201920035647",
  longitude: "-122.42730642251331",
  schedule:
    "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=21MFF-00015&ExportPDF=1&Filename=21MFF-00015_schedule.pdf",
  approved: "2022-01-28T00:00:00.000",
  received: "20210315",
  priorpermit: "0",
  expirationdate: "2022-11-15T00:00:00.000",
  location: {
    latitude: "37.76201920035647",
    longitude: "-122.42730642251331",
    human_address: '{"address": "", "city": "", "state": "", "zip": ""}',
  },
  ":@computed_region_yftq_j783": "8",
  ":@computed_region_p5aj_wyqh": "4",
  ":@computed_region_rxqg_mtj9": "5",
  ":@computed_region_bh8s_q3mv": "28862",
  ":@computed_region_fyvs_ahh9": "3",
};
