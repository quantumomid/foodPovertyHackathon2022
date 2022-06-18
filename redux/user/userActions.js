import { SET_CURRENT_USER } from "./userActionTypes";

export const setCurrentUser = user => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};