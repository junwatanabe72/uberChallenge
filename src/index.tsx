import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "./utils/styled/GolbalStyles";
import theme from "./utils/styled/theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Head from "./components/templates/Head";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Head />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
reportWebVitals();
