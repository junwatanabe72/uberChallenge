import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// import Head from "./components/templates/Head";
import GlobalStyles from "./utils/styled/GolbalStyles";
import theme from "./utils/styled/theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <Head /> */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
