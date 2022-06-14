import Api from "services/api";

export function getLoginToken(username, password) {
  const api = new Api();
  return api
    .init()
    .post("/api/token/", { username, password })
    .catch((err) => {
      api.errorCatcher(err);
    });
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
  const api = new Api();
  return api
    .init()
    .post("api/token/verify/", { token: token })
    .catch((err) => {
      api.errorCatcher(err);
    });
}
