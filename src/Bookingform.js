import React, { useState } from "react";
import toastr from "toastr";
import { Grid, TextField, Button } from "@material-ui/core";
import { Container, Typography, Paper } from "@material-ui/core";
import Parkingslots from "./Parkingslots";
import { useDispatch, useSelector } from "react-redux";
import { bookingAction } from "./actions";

const Bookingform = () => {
  const dispatch = useDispatch();
  const parking_slotlist = useSelector((state) => state);
  const [formData, setFormData] = useState({
    vehicle_number: "",
    entry_time: "",
    number_slot: 0,
    isBooked: true,
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    formData[name] = name === "number_slot" ? Number(value) : value;
    setFormData(formData);
  };

  const handleResetFormInput = (e) => {
    let formData = {
      vehicle_number: "",
      entry_time: "",
      number_slot: 0,
      isBooked: true,
    };
    console.log(formData, "reset", parking_slotlist);
    setFormData(formData);
  };

  const handleBooking = (e) => {
    console.log(parking_slotlist, "parking_slotlist");
    const result = parking_slotlist.value.find(
      (element) => element.number_slot === formData.number_slot
    );
    const checkAllSlot = parking_slotlist.value.filter(
      (element) => element.isBooked === false
    );

    if (checkAllSlot.length === 0) {
      toastr.options = {
        positionClass: "toast-top-full-width",
        hideDuration: 300,
        timeOut: 1000,
      };
      setTimeout(() => toastr.warning(`all slots are booked `), 10);
    } else if (result === undefined) {
      toastr.options = {
        positionClass: "toast-top-full-width",
        hideDuration: 300,
        timeOut: 1000,
      };
      setTimeout(() => toastr.warning(`select available slot only `), 10);
    } else if (result.isBooked === true) {
      toastr.options = {
        positionClass: "toast-top-full-width",
        hideDuration: 300,
        timeOut: 1000,
      };
      setTimeout(() => toastr.warning(`Already Booked`), 10);
    } else if (result.isBooked === false) {
      dispatch(bookingAction(formData));
      handleResetFormInput();
    }
  };

  //const dispatch = useDispatch();
  return (
    <Container style={{ padding: 16, margin: "auto", maxWidth: 800 }}>
      <Typography
        variant="h4"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        Parking Lot Management System !
      </Typography>
      <Grid>
        <Paper style={{ padding: 16 }}>
          <Grid container justify="flex-start" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Vehicle Number"
                color="secondary"
                variant="outlined"
                type="Text"
                name="vehicle_number"
                fullWidth
                onChange={handleFormInput}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Entry Time"
                color="secondary"
                variant="outlined"
                fullWidth
                type="time"
                name="entry_time"
                defaultValue="00:00:00"
                onChange={handleFormInput}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="number_slot"
                color="secondary"
                variant="outlined"
                type="Number"
                name="number_slot"
                fullWidth
                onChange={handleFormInput}
              />
            </Grid>

            <Grid
              container
              justify="space-evenly"
              alignItems="center"
              style={{ padding: 16 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => handleBooking()}
                //onClick={() => dispatch(bookingAction(formData))}
              >
                Submit
              </Button>
              <Button variant="contained" color="secondary" type="button">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Parkingslots />
    </Container>
  );
};

export default Bookingform;
