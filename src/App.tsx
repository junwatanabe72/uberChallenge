import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import FoodTrunksLoader from "./hooks/FoodTrunksLoader";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex" }}>
        <Suspense fallback={<CircularProgress />}>
          <FoodTrunksLoader />
        </Suspense>
      </Box>
    </Container>
  );
};

export default App;
