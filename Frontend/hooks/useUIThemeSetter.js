import { UIActions } from "store/feature/UI/UISlice";

const useUIThemeSetter = async (store, req) => {
  const theme = req.cookies.theme;
  if (!theme) return;

  await store.dispatch(UIActions.setTheme(theme));
};

export default useUIThemeSetter;
