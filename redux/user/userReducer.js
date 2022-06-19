import { SET_CURRENT_USER } from "./userActionTypes";
import { SET_CURRENT_RECIPIENT } from "./userActionTypes";

const initialState = {
    currentUser: null,
    currentRecipient: null
}

const userReducer = (state = initialState, action) => {
console.log(action.payload);
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
        default:
            return state
    }
}

export default userReducer;