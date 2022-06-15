import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";
import {
  getLoginToken,
  postRegisterUser,
  postVerifyToken,
} from "./authService";
import { UIActions } from "../UI/UISlice";
import Cookies from "js-cookie";
import { message } from "antd";
import jwt_decode from "jwt-decode";

const initialState = {
  token: null,
  User: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload !== null) Cookies.set("token", action.payload);
    },
    setUser: (state, action) => {
      state.User = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.auth.token) {
        return state;
      }
      state.token = action.payload.auth.token;
      state.User = action.payload.auth.User;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;

export const LoginHandler = (username, password) => {
  return async (dispatch) => {
    let login = false;
    dispatch(UIActions.setGlobalLoading(true));
    await getLoginToken(username, password)
      .catch((err) => {
        dispatch(UIActions.setGlobalLoading(false));
        login = false;
        message.error(err.response.data.detail, 5);
      })
      .then((res) => {
        if (!res) return;
        dispatch(UIActions.setGlobalLoading(false));
        dispatch(setTokenHandler(res.data.access));
        login = true;
      });

    return login;
  };
};

export const RegisterHandler = (values) => {
  return async (dispatch) => {
    let login = false;
    dispatch(UIActions.setGlobalLoading(true));
    await postRegisterUser(values)
      .then(async (res) => {
        if (!res.data) return;
        login = await dispatch(LoginHandler(values.username, values.password));
        dispatch(UIActions.setGlobalLoading(false));
      })
      .catch((err) => {
        dispatch(UIActions.setGlobalLoading(false));
        login = false;
        if (err.response) {
          Object.keys(err.response?.data).forEach((key) => {
            message.error(`${key}: ${err.response.data[key]}`);
          });
        }
      });
    return login;
  };
};

export const tokenVerifyHandler = (token) => {
  return async (dispatch) => {
    await postVerifyToken(token).then((res) => {
      if (!res) return;
      if (res.status === 200) dispatch(setTokenHandler(token));
    });
  };
};

// decode jwt token and extract user data save  data in user state and token in token state
export const setTokenHandler = (token) => {
  return async (dispatch) => {
    await dispatch(authActions.setToken(token));
    const decoded = jwt_decode(token);

    await dispatch(authActions.setUser(decoded.user));
  };
};
