import { BOOK, EXIT } from "./actionTypes";

export function bookingAction(value) {
    return {
      type: BOOK,
      payload:value
    };
  }
export function exitbookingAction(value) {
  return{
    type: EXIT,
    payload:value
  };
}

