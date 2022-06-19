import { SET_CURRENT_USER, SET_USER_TOKEN_ID,  SET_CURRENT_RECIPIENT } from "./userActionTypes";

const initialState = {
    currentUser: null,
    currentRecipient: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case SET_CURRENT_RECIPIENT:
                return {
                    ...state,
                    currentRecipient: action.payload,
        }
        case SET_USER_TOKEN_ID:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    tokenId: action.payload,
                },
            }
        default:
            return state
    }
}

export default userReducer;