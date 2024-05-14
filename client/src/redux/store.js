import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "./api/eventsApi";
import { participantApi } from "./api/participantApi";

const APIS = [eventsApi, participantApi];

const apiReducers = APIS.reduce((acc, { reducerPath, reducer }) => {
  return {
    ...acc,
    [reducerPath]: reducer,
  };
}, {});

const middlewares = APIS.map(({ middleware }) => middleware);

const reducers = combineReducers({
  ...apiReducers,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export default store;
