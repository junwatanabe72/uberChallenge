import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  foodTrunks: FoodTrunkPropety[];
}

const FoodTrunksList: React.FC<Props> = ({ foodTrunks }) => {
  return (
    <Box sx={{ width: "50%", bgcolor: "background.paper" }}>
      <ListSubheader>{`Near Food Trunks`}</ListSubheader>
      <nav>
        <List
          sx={{
            overflow: "auto",
            height: "43vh",
          }}
        >
          {foodTrunks.map((trunk, num) => {
            return (
              <ListItem key={num} disablePadding>
                <ListItemText
                  primary={`${num + 1}:  ${trunk.applicant}`}
                  secondary={trunk.fooditems}
                />
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default FoodTrunksList;
