import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopPage from "./components/pages";
import ErrorPage from "./components/pages/Error";
import Layout from "./components/templates/Layout";
import { fetchData } from "./hooks/fetch";

const App: React.FC = () => {
  const [foodTrunks, setFoodTrunks] = useState<FoodTrunkPropety[]>([]);

  const initData = async () => {
    const result = await fetchData();
    setFoodTrunks(result);
  };
  useEffect(() => {
    initData();
  }, []);

  const routeElement = {
    top: {
      path: "/",
      component: (
        <Layout>
          <TopPage foodTrunks={foodTrunks} />
        </Layout>
      ),
    },
    other: {
      path: "/*",
      component: (
        <Layout>
          <ErrorPage errorNumber={404} />
        </Layout>
      ),
    },
  };

  return (
    <Router>
      <Routes>
        {Object.values(routeElement).map((element, num) => {
          const { path, component } = element;
          return <Route key={num} path={path} element={component}></Route>;
        })}
      </Routes>
    </Router>
  );
};

export default App;
