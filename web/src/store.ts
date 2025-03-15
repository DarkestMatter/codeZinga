import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit/react";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
//sagaMiddleware.run(brokerSagaWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
