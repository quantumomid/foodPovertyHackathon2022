import { SET_CURRENT_USER, SET_CURRENT_RECIPIENT } from "./userActionTypes";

export const setCurrentUser = user => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const setCurrentRecipient = user => async (dispatch) => {
    console.log('U S E R', user);
    dispatch({
        type: SET_CURRENT_RECIPIENT,
        payload: user
    }); 
};