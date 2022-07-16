import React from "react";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";
import Table from "@mui/material/Table";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material/";

interface Props {
  foodTrunk: FoodTrunkPropety;
}

const GeneralTable: React.FC<Props> = ({ foodTrunk }) => {
  return (
    <Box sx={{ width: "50%", bgcolor: "background.paper" }}>
      <ListSubheader>{`Detail Store`}</ListSubheader>
      <TableContainer
        sx={{
          overflow: "auto",
          height: "43vh",
        }}
      >
        <Table aria-label="">
          {Object.entries(foodTrunk).map(([key, value], num) => {
            return (
              <React.Fragment key={num}>
                <TableHead>
                  <TableRow>
                    <TableCell>{key}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{value.toString()}</TableCell>
                  </TableRow>
                </TableBody>
              </React.Fragment>
            );
          })}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GeneralTable;
