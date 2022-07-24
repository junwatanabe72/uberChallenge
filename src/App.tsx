import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import TopPage from "./components/pages";
import ErrorPage from "./components/pages/Error";
import Layout from "./components/templates/Layout";
import { fetchData } from "./hooks/fetch";
import { foodTrunkState } from "./store/atom";

const App: React.FC = (): JSX.Element => {
  const [foodTrunks, setFoodTrunks] = useRecoilState(foodTrunkState);
  if (foodTrunks.length === 0) {
    throw fetchData().then(setFoodTrunks);
  }
  const routeElement = {
    top: {
      path: "/",
      component: (
        <Layout>
          <TopPage />
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
