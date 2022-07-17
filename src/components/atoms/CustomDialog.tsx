import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  foodTrunk: FoodTrunkPropety;
  open: boolean;
  handleClose: () => void;
}

const AlertDialog: React.FC<Props> = ({ foodTrunk, open, handleClose }) => {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "center",
          alignItems: "flex-start",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{foodTrunk.applicant}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {foodTrunk.fooditems}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
