import React from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dammy from "../../utils/images/dammy.jpg";

interface Props {
  foodTrunk: FoodTrunkPropety;
  open: boolean;
  handleClose: () => void;
}

const Image = styled.img`
  width: auto;
  height: 30vh;
  object-fit: cover;
`;

const AlertDialog: React.FC<Props> = ({ foodTrunk, open, handleClose }) => {
  const { applicant, address, fooditems } = foodTrunk;
  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "center",
          alignItems: "center",
          "& .MuiPaper-root": {
            width: "80%",
          },
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{applicant}</DialogTitle>
      <Image src={Dammy} alt="dammy" />
      <DialogContent>
        {Object.entries({ address, fooditems }).map(([title, value], num) => {
          return (
            <Grid container key={num} spacing={0}>
              <Grid item xs={4} md={2}>
                <span style={{ color: "red" }}>{`${title}:`}</span>
              </Grid>
              <Grid item xs={8} md={10}>
                {value}
              </Grid>
            </Grid>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
