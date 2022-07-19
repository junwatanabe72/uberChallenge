import React from "react";
import { render, screen } from "@testing-library/react";
// import { appTitle } from "../utils/constant";
import Layout from "../components/templates/Layout";

describe("fetchData", () => {
  test("renders App component", async () => {
    render(
      <Layout>
        <></>
      </Layout>
    );
    screen.debug();
    // expect(screen.getByText("SearchFoodTrunks in SF")).toBeInTheDocument();
  });
});

// import { cleanup, fireEvent, render } from "@testing-library/react";
// import CheckboxWithLabel from "../components/atoms/Link";

// // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// // unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

// it("CheckboxWithLabel changes the text after click", () => {
//   const { queryByLabelText, getByLabelText } = render(
//     <CheckboxWithLabel labelOn="On" labelOff="Off" />
//   );

//   expect(queryByLabelText(/off/i)).toBeTruthy();

//   fireEvent.click(getByLabelText(/off/i));

//   expect(queryByLabelText(/on/i)).toBeTruthy();
// });
