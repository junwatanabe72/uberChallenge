import React from "react";
import {
  render,
  screen,
  // waitFor
} from "@testing-library/react";
import FoodTrunksList from "../components/organisms/FoodTrunksList";
// import userEvent from "@testing-library/user-event";
// import GoogleMapComponent from "../components/templates/googleMap";
import {
  // defaultGoogleMapOption, defaultPositions,
  testProperty,
  foodTrnkListTextOfEmpty,
} from "../utils/constant";

describe("App", () => {
  // test("fetches stories from an API and displays them", async () => {
  //   render(
  //     <GoogleMapComponent
  //       {...defaultGoogleMapOption}
  //       center={defaultPositions}
  //       style={{ height: "45vh" }}
  //     />
  //   );
  //   screen.debug();
  //   await waitFor(() => {
  //     screen.findByTestId("map");
  //   });
  //   screen.debug();
  // });
  describe("FoodTrunksList", () => {
    test("propsのfoodTrunksが要素の数だけ表示される。", () => {
      const tmpF = (num: number) => {
        console.log(num);
      };
      render(
        <FoodTrunksList
          foodTrunks={[testProperty, testProperty]}
          onClick={tmpF}
        />
      );
      expect(screen.getAllByRole("button").length).toBe(2);
      screen.debug();
    });
    test(`propsのfoodTrunksが[]の場合、${foodTrnkListTextOfEmpty}表示される。`, () => {
      const tmpF = (num: number) => {
        console.log(num);
      };
      render(<FoodTrunksList foodTrunks={[]} onClick={tmpF} />);
      screen.getAllByText(foodTrnkListTextOfEmpty);
      screen.debug();
    });
  });
});
