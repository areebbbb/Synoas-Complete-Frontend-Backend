import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import UIReducer from "./feature/UI/UISlice";
import authReducer from "./feature/auth/authSlice";
import DashboardReducer from "./feature/Dashboard/DashboardSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      UI: UIReducer,
      auth: authReducer,
      dashboard: DashboardReducer,
    },
  });
export const wrapper = createWrapper(makeStore);
