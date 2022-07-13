import Slot from "./slot";
import { connect, useSelector } from 'react-redux';

import {
  Container,
  Button,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

function Parkingslots() {
  const parking_slotlist = useSelector(state => state)
  return (
    <Container alignItems="center">
      <Typography
        variant="h4"
        align="center"
        component="h1"
        style={{ padding: 16 }}
      >
        Parking Slots
      </Typography>
      <Paper style={{ padding: 16 }}>
        <Grid container justify="center" alignItems="center" spacing={2}>
          {parking_slotlist.value.map((data,index) => {
            return (
              <Slot slotInfo={data} key={index}/>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  value: state.value,
});
export default connect(mapStateToProps)(Parkingslots);