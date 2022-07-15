import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GoogleMapComponent from "./components/pages";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <GoogleMapComponent />
      </Box>
    </Container>
  );
};

export default App;
