import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import FoodTrunksLoader from "./hooks/FoodTrunksLoader";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg">
              <Box sx={{ display: "flex" }}>
                <Suspense fallback={<CircularProgress />}>
                  <FoodTrunksLoader />
                </Suspense>
              </Box>
            </Container>
          }
        ></Route>
        <Route path="/*" element={<div>not found</div>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
