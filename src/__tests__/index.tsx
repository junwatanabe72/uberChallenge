import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("fetchData", () => {
  test("renders App component", () => {
    render(<App />);
    screen.debug();
  });
});