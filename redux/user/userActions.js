import { SET_CURRENT_USER, SET_CURRENT_RECIPIENT, SET_USER_TOKEN_ID } from "./userActionTypes";

export const setCurrentUser = user => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    }); 
};

export const setCurrentRecipient = user => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_RECIPIENT,
        payload: user
    }); 
};

export const setUserTokenId = tokenId => async (dispatch) => {
    dispatch({
        type: SET_USER_TOKEN_ID,
        payload: tokenId
    }); 
};