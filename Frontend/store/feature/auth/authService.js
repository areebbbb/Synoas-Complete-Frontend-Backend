import Api from "services/api";
import * as axios from "axios";

export function getLoginToken(username, password) {
  const api = new Api();
  return api.init().post("/api/token/", { username, password });
}

export function postRegisterUser(values) {
  const api = new Api();
  return api
    .init()
    .post("/api/register/", values)
    .catch((err) => {
      api.errorCatcher(err);
    });
}

export function postVerifyToken(token) {
  return axios.post(`${process.env.NEXT_PUBLIC_SSR_URL}/api/token/verify/`, {
    token: token,
  });
}
