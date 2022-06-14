import DarkModeToggle from "components/UI/DarkModeToggle";
import { wrapper } from "store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white min-h-screen">
      <div className="max-w-xl m-auto">
        <div className="float-right absolute right-2 z-50">
          <DarkModeToggle />
        </div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
