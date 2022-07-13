import { Box, Button, Paper, Typography } from "@material-ui/core";
import { height } from "@mui/system";
import Exitpage from './Exitpage';

import React from "react";

function slot(propsData) {
 let  slotInfo = propsData.slotInfo
  let bookedSlotColor =  slotInfo.isBooked === true ? "#355E3B" :"#D5D8DC "
  return (
    <Paper
      style={{
        padding: 16,
        color: "#e8t6e9",
        background: bookedSlotColor,
        margin: "4px",
        textAlign:"center",
        width:"300px",
        height:"300px"
      }}
      variant="outlined"
    >
      <Typography
        variant="h5"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        {slotInfo.number_slot}
      </Typography>

      {
         slotInfo.isBooked &&
         <>

      <Typography
        variant="h6"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        Vehicle Number: {slotInfo.vehicle_number}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        Entry Time : {slotInfo.entry_time}
      </Typography>
      <Exitpage slotInfo={slotInfo}/>
         </>

      }
      {
         !slotInfo.isBooked &&

         <Typography
        variant="h6"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        Available
      </Typography>

      }
      
    </Paper>
  );
}

export default slot;
