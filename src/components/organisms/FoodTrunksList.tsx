import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  foodTrunks: FoodTrunkPropety[];
  onClick: (num: number) => void;
}

const FoodTrunksList: React.FC<Props> = ({ foodTrunks, onClick }) => {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
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
              <ListItemButton
                key={num}
                onClick={() => {
                  onClick(num);
                }}
                divider
              >
                <ListItem disablePadding>
                  <ListItemText
                    primary={`${num + 1}:  ${trunk.applicant}`}
                    secondary={trunk.fooditems}
                  />
                </ListItem>
              </ListItemButton>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default FoodTrunksList;
