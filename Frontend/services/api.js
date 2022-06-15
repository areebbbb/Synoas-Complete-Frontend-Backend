import * as axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import { authActions,  } from "store/feature/auth/authSlice";
import { makeStore,  } from "store/store";
export default class Api {
  constructor() {
    this.api_token = null;
    this.csrf_token = null;
    this.client = null;
    this.api_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }

  init = () => {
    this.api_token = makeStore().getState().auth.token;
    this.csrf_token = Cookies.get("csrf_token");
    let headers = {
      Accept: "application/json",
    };

    // if (this.api_token) {
    //   headers.Authorization = `Bearer ${this.api_token}`;
    // }
    if (this.csrf_token) {
      headers["X-CSRFToken"] = this.csrf_token;
    }
    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 1200000,
      headers: headers,
    });

    return this.client;
  };

  errorCatcher(error) {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      message.error("You are not authorized to do this action", 5);
      makeStore().dispatch(authActions.setToken(null));
      Cookies.remove("token");
      makeStore().dispatch(authActions.setUser(null));
    } else if (error.response?.status === 500) {
      message.error("Something went wrong on the server-side", 5);
    } else if (error.response?.status === 400) {
      message.error(
        `Something went wrong with request, status code: ${error.response?.status}`,
        5
      );
    } else {
      message.error(
        `Server connection failed. This could be a network issue. code: ${error.response?.status}`,
        5
      );
    }
  }
}
