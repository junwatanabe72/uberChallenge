import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// import FoodTrunksLoader from "./hooks/FoodTrunksLoader";
import Layout from "./components/templates/Layout";
import ErrorPage from "./components/pages/Error";
import { fetchData } from "./hooks/fetch";
import TopPage from "./components/pages";
// import CenterStack from "./components/atoms/CenterStack";

const App: React.FC = () => {
  const [foodTrunks, setFoodTrunks] = useState<FoodTrunkPropety[]>([]);

  const initData = async () => {
    const result = await fetchData();
    setFoodTrunks(result);
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <TopPage foodTrunks={foodTrunks} />
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
