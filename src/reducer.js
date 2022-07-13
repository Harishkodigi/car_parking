import parkingData from './parkingData'
const initialState = {
    value: parkingData,
  };
  
  function addReducer(state = initialState, action) {
    let stateValue = state.value
    switch(action.type) {
      case 'BOOK':
        let bookingIndex = stateValue.findIndex(x => x.number_slot === action.payload.number_slot && x.isBooked === false);
        stateValue[bookingIndex] = action.payload;
        console.log(stateValue[bookingIndex],bookingIndex,state.value,"resducer book")
        return { ...state, value: stateValue };
      case 'EXIT':
        let exitIndex = state.value.findIndex(x => x.isBooked === true && x.number_slot === action.payload.number_slot);
         state.value[exitIndex] = action.payload;
        return { ...state, value: state.value };
      default:
        return state;
    }
  }
  
  export default addReducer;
  