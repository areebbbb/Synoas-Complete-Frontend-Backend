import TopBarGreeting from "components/UI/TopBarGreeting";
import { useAppDispatch, useAppSelector } from "hooks/hook";
import { useEffect } from "react";
import {
  DashboardActions,
  DashboardSelector,
} from "store/feature/Dashboard/DashboardSlice";
import { getWeather } from "store/feature/externalApi/externalApiService";

const TopBarDash = () => {
  const dashboard = useAppSelector(DashboardSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      dashboard.Latitude === null ||
      dashboard.Longitude === null ||
      dashboard.Timezone === null
    )
      return {};
    getWeather(
      dashboard.Latitude,
      dashboard.Longitude,
      dashboard.Timezone
    ).then((res) => {
      if (!res) return;
      dispatch(DashboardActions.setWeather(res.data));
    });
  }, [dashboard.Latitude, dashboard.Longitude, dashboard.Timezone]);
  return (
    <>
      <TopBarGreeting />
      <div className="flex justify-center text-lg dark:text-white">
        temperature is {dashboard?.Weather?.daily?.temperature_2m_max[0]} C
      </div>
      <div>
        <h4 className="text-lg dark:text-white">
          Your current City is {dashboard?.City}
        </h4>
        <h4 className="text-lg dark:text-white">
          Your current Country is {dashboard?.Country}
        </h4>
        <h4 className="text-lg dark:text-white">
          Your ISP is {dashboard?.ISP}
        </h4>
      </div>
    </>
  );
};

export default TopBarDash;
