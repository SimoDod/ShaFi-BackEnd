import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LoaderState = {
  fullscreenLoader: boolean;
};

const initialState: LoaderState = {
  fullscreenLoader: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showFullScreenLoader: (state, action: PayloadAction<boolean>) => {
      state.fullscreenLoader = action.payload;
    },
  },
});

export const { showFullScreenLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
