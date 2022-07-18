import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FoodTrunksLoader from "./hooks/FoodTrunksLoader";
import Layout from "./components/templates/Layout";
import ErrorPage from "./components/pages/Error";
import CenterStack from "./components/atoms/CenterStack";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Suspense
                fallback={
                  <CenterStack>
                    <CircularProgress />
                  </CenterStack>
                }
              >
                <FoodTrunksLoader />
              </Suspense>
            </Layout>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <Layout>
              <ErrorPage errorNumber={404} />
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
