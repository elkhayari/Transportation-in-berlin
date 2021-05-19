import { Types } from "../types/actionTypes";

export const setData = (data) => {
  
  return {
    type: Types.SET_DATA,
    payload: data
  };
};

export const setStopovers = (data) => {
  return {
    type: Types.SELECTED_TRIP,
    payload: data,
  };
};


