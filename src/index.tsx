import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import Head from "./components/templates/Head";
import CenterStack from "./components/atoms/CenterStack";
import GlobalStyles from "./utils/styled/GolbalStyles";
import theme from "./utils/styled/theme";
import reportWebVitals from "./reportWebVitals";

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
        <RecoilRoot>
          <Suspense
            fallback={
              <CenterStack height="100vh">
                <CircularProgress />
              </CenterStack>
            }
          >
            <App />
          </Suspense>
        </RecoilRoot>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
reportWebVitals();
