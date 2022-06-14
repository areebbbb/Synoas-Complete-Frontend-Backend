import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  theme: "light",
  GlobalLoading: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.GlobalLoading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.UI.theme) {
        return state;
      }
      state.theme = action.payload.UI.theme;
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
export const UISelector = (state) => state.UI;
