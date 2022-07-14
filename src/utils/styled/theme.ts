import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5393ff",
      main: "#2979ff",
      dark: "#1c54b2",
      contrastText: "#000",
    },
    success: {
      main: "#33c9dc",
    },
    error: {
      main: "#f73378",
    },
  },
});

export default theme;
