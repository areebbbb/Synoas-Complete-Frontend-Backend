import { useAppDispatch, useAppSelector } from "hooks/hook";
import { useEffect } from "react";
import { UIActions, UISelector } from "store/feature/UI/UISlice";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";

const DarkModeToggle = () => {
  const UI = useAppSelector(UISelector);

  const dispatch = useAppDispatch();
  const ServerSideRender = typeof window === "undefined";
  let root = "";
  if (!ServerSideRender) {
    root = window.document.documentElement;
    root.classList.add("bg-gray-50");
    root.classList.add("dark:bg-slate-800");
    root.classList.add("dark:text-white");
  }
  useEffect(() => {
    if (!ServerSideRender) {
      root.classList.add(UI.theme);
      Cookies.set("theme", UI.theme);
    }
  }, [ServerSideRender, root.classList, UI.theme]);
  return (
    <button
      type="button"
      onClick={() => {
        root.classList.remove(UI.theme);
        dispatch(UIActions.setTheme(UI.theme === "dark" ? "light" : "dark"));
      }}
      className=" p-1 rounded-full  hover:bg-slate-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      <MoonIcon className="h-6 w-6 block dark:hidden" aria-hidden="true" />
      <SunIcon className="h-6 w-6 hidden  dark:block" aria-hidden="true" />
    </button>
  );
};

export default DarkModeToggle;
