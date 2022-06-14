import { tokenVerifyHandler } from "store/feature/auth/authSlice";

const useReqSetToken = async (store, req) => {
  const token = req.cookies.token;
  if (!token) return;
  await store.dispatch(tokenVerifyHandler(token));
  return;
};

export default useReqSetToken;
