import { SET_CURRENT_USER, SET_USER_TOKEN_ID } from "./userActionTypes";

const initialState = {
    currentUser: null,
}

const userReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
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