import Api from "services/api";

export function postGeoLocation(username, data) {
  const api = new Api();
  return api.init().post("/api/ApplicationLoginActivityViewSet/", {
    username: username,
    ...data,
  });
}

export function getApplicationLoginActivity() {
  const api = new Api();
  return api.init().get("/api/ApplicationLoginActivityViewSet/");
}

export function postJokePost(user, joke) {
  const api = new Api();
  return api
    .init()
    .post("/api/UserPosts/", { username: user, postValue: joke });
}

export function getQuotePost(user) {
  const api = new Api();
  return api.init().get(`/api/UserPosts/?filter{UserID.username}=${user}`);
}

export function patchQuotePost(Quote) {
  const api = new Api();
  return api.init().patch(`/api/Posts/${Quote.PostID}`, Quote);
}

export function DeleteQuotePost(Quote) {
  const api = new Api();
  return api.init().delete(`/api/UserPosts/${Quote.UserPostID}`);
}
