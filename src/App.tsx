import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FoodTrunksLoader from "./hooks/FoodTrunksLoader";
import Layout from "./components/templates/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Suspense fallback={<CircularProgress />}>
                <FoodTrunksLoader />
              </Suspense>
            </Layout>
          }
        ></Route>
        <Route path="/*" element={<Layout>not found</Layout>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
