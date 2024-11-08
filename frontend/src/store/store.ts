import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import rootReducer from "./rootReducer";
import localStorageMiddleware from "./middleware/localStorageMiddleware.ts";
import { configureStore } from "@reduxjs/toolkit/react";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof reduxStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const reduxStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });

  return store;
};

export default reduxStore;
