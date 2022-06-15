import TopBarCard from "components/UI/TopBarCard";
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

      <div className="grid grid-cols-2 mt-2 gap-3">
        <TopBarCard>
          {"Today's Temperature is "}
          <span className="font-semibold">
            {dashboard?.Weather?.daily?.temperature_2m_max[0]} C
          </span>
        </TopBarCard>
        <TopBarCard>
          Your current City is{" "}
          <span className="font-semibold">{dashboard?.City}</span>
        </TopBarCard>
        <TopBarCard>
          {" "}
          Your current Country is{" "}
          <span className="font-semibold">{dashboard?.Country}</span>
        </TopBarCard>
        <TopBarCard>
          {" "}
          Your ISP is <span className="font-semibold">
            {" "}
            {dashboard?.ISP}
          </span>{" "}
        </TopBarCard>
      </div>
    </>
  );
};

export default TopBarDash;
