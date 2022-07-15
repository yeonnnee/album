import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./reducers/albumSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumApi } from "./services/albums";

export const store = configureStore({
  reducer: {
    [albumApi.reducerPath]: albumApi.reducer,
    album: albumReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(albumApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);