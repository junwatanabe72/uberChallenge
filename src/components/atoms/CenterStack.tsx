import React from "react";
import { Stack } from "@mui/material";

interface Props {
  children: React.ReactNode;
  height?: string;
}

const CenterStack: React.FC<Props> = ({ children, height = "70%" }) => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: height }}>
      {children}
    </Stack>
  );
};
export default CenterStack;
