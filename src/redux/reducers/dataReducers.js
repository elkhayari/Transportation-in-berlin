import { Types } from "../types/actionTypes";

const initialState = {
  data: []
};

export const dataReducer = (state = initialState, { type, payload })=> {
  switch (type) {
    case Types.SET_DATA:
      console.log("SET_DATA");
      return {...state, data: payload};
    default:
      return {...state};
  }
}

export const selectedTripReducer = (state={}, {type, payload}) => {
  switch (type) {
    case Types.SELECTED_TRIP:
      console.log("SELECTED_TRIP");
      return {...state , ...payload};
    default:
      return {...state};
  }
}
