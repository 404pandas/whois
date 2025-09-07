import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { roomApi } from "../services/roomApi";
import roomReducer from "../services/roomSlice";

const createEnhancers = (getDefaultEnhancers: any) => {
  if (__DEV__) {
    const Reactotron = require("../../ReactotronConfig").default;
    return getDefaultEnhancers().concat(Reactotron.createEnhancer());
  }
  return getDefaultEnhancers();
};

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    room: roomReducer, // <-- ✅ add slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware),
  enhancers: createEnhancers,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
