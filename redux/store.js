import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const middlewares = [Thunk];

let enhancer;
enhancer = applyMiddleware(...middlewares);

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
    enhancer = composeWithDevTools(applyMiddleware(...middlewares))
};

const store = createStore(rootReducer, enhancer);

export { store };