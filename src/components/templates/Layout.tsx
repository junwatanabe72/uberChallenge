import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <div>Search Food Trunks in SF</div>
        {children}
      </Box>
    </Container>
  );
};
export default Layout;
