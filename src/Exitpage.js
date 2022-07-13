import * as React from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";

import { exitbookingAction } from "./actions";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          variant="contained"
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Exitpage(exitInfo) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Paybutton = () => {
    let value = {
      "car-registration": "TU68 0BB",
      charge: 20,
    };
    fetch("https://httpstat.us/200", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(value),
    }).then((data) => {
      toastr.options = {
        positionClass: "toast-top-full-width",
        hideDuration: 300,
        timeOut: 1000,
      };
      let resetSlot = {
        entry_time: "",
        isBooked: false,
        number_slot: exitInfo.slotInfo.number_slot,
        vehicle_number: "",
      };
      setTimeout(() => toastr.success(`Payment Success `), 10);
      dispatch(exitbookingAction(resetSlot));
      setOpen(false);
    });

    //alert("payment Done");
  };

  let current = new Date();
  let entryTime = exitInfo.slotInfo.entry_time.replace(":", ".");
  let exitTime = current.getHours() + "." + current.getMinutes();
  let totalParkedTime = Math.ceil(Number(exitTime - entryTime));

  let totalCharge = 0;
  if (totalParkedTime <= 2) {
    totalCharge = 10;
  } else if (totalParkedTime > 2) {
    totalCharge = (totalParkedTime - 2) * 10 + 10;
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Exit
      </Button>
      <BootstrapDialog
        onClose={open}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Payment Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography
            variant="h4"
            align="center"
            component="h6"
            style={{ padding: 16 }}
          >
            Registration Number: {exitInfo.slotInfo.vehicle_number}
          </Typography>
          <Typography
            variant="h4"
            align="center"
            component="h6"
            style={{ padding: 16 }}
          >
            Total Charge: {totalCharge} $
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={Paybutton}>
            Pay
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
