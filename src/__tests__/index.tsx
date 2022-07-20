import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import GoogleMapComponent from "../components/templates/googleMap";
import { defaultGoogleMapOption, defaultPositions } from "../utils/constant";

describe("App", () => {
  test("fetches stories from an API and displays them", async () => {
    render(
      <GoogleMapComponent
        {...defaultGoogleMapOption}
        center={defaultPositions}
        style={{ height: "45vh" }}
      />
    );
    screen.debug();
    await waitFor(() => {
      screen.findByTestId("map");
    });
    screen.debug();
  });
});
