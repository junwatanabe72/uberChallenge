import React from "react";
import Box from "@mui/material/Box";
import { Fab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  title: string;
  onClick: () => void;
}

const CustomFab: React.FC<Props> = ({ title, onClick }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1,
        width: "100vw",
        maxWidth: "md",
      }}
    >
      <Box
        py={3}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Fab variant="extended" color="info" size="medium" onClick={onClick}>
          <SearchIcon sx={{ mr: 1 }} />
          {title}
        </Fab>
      </Box>
    </Box>
  );
};

export default CustomFab;
