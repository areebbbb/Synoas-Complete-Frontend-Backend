import DarkModeToggle from "components/UI/DarkModeToggle";
import Cookies from "js-cookie";
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
  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white min-h-screen">
      <div className="max-w-xl m-auto">
        <div className="float-right absolute right-2 z-50">
          <DarkModeToggle />
          <button
            onClick={() => {
              Cookies.remove("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
