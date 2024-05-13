import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
