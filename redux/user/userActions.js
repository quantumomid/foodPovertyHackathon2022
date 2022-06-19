import { SET_CURRENT_USER, SET_USER_TOKEN_ID } from "./userActionTypes";

export const setCurrentUser = user => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const setUserTokenId = tokenId => async (dispatch) => {
    // user object includes saved recipes too - therefore this will be set too
    // upon successful login
    dispatch({
        type: SET_USER_TOKEN_ID,
        payload: tokenId
    }); 
};