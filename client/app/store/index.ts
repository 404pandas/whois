import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "../services/roomApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
