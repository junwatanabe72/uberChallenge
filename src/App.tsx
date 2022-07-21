import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CenterStack from "./components/atoms/CenterStack";
import TopPage from "./components/pages";
import ErrorPage from "./components/pages/Error";
import Layout from "./components/templates/Layout";

const App: React.FC = (): JSX.Element => {
  const routeElement = {
    top: {
      path: "/",
      component: (
        <Layout>
          <Suspense
            fallback={
              <CenterStack>
                <CircularProgress />
              </CenterStack>
            }
          >
            <TopPage />
          </Suspense>
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
