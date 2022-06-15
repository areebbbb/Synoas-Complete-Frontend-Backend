import { LogoutIcon } from "@heroicons/react/outline";
import DarkModeToggle from "components/UI/DarkModeToggle";
import { useAppSelector } from "hooks/hook";
import Cookies from "js-cookie";
import { authSelector } from "store/feature/auth/authSlice";
import { wrapper } from "store/store";
import "../styles/antd.css";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const ServerSideRender = typeof window === "undefined";
  if (ServerSideRender) {
    return (
      <div className="bg-gray-50 dark:bg-slate-800 dark:text-white min-h-screen"></div>
    );
  }
  const auth = useAppSelector(authSelector);
  const LoggedIn = auth.token !== null;
  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white min-h-screen">
      <div className="max-w-xl m-auto">
        <div className="float-right absolute right-2 z-50">
          <DarkModeToggle />
          {LoggedIn && (
            <button
              className=" p-1 rounded-full  hover:bg-slate-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => {
                Cookies.remove("token");
                window.location.reload();
              }}
            >
              <LogoutIcon className="h-6 w-6  " aria-hidden="true" />
            </button>
          )}
        </div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
