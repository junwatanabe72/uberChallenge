import React from "react";
import { Stack } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const CenterStack: React.FC<Props> = ({ children }) => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "70%" }}>
      {children}
    </Stack>
  );
};
export default CenterStack;
