import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { dammyImage } from "../../utils/constant";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/atom";

interface Props {
  foodTrunk: FoodTrunkPropety;
}

const Image = styled.img`
  width: auto;
  height: 25vh;
  object-fit: cover;
`;

const AlertDialog: React.FC<Props> = ({ foodTrunk }) => {
  const [open, setModal] = useRecoilState(modalState);
  const handleClose = () => {
    setModal(false);
  };
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
      <Image src={dammyImage} alt="dammy" />
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
      <DialogActions>
        <Button color={"secondary"} onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
