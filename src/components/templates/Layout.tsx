import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { appTitle } from "../../utils/constant";

interface Props {
  children: React.ReactNode;
}

const StyledContainer = styled(Container)`
  padding: 0 !important;
`;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <StyledContainer maxWidth="md">
      <Box sx={{ height: "100vh" }}>
        <Box p={1}>
          <h2>
            {" "}
            <a href="/">{appTitle}</a>
          </h2>
        </Box>
        {children}
      </Box>
    </StyledContainer>
  );
};
export default Layout;
