import { useEffect, useState } from "react";
import { Button } from "antd";
import { wrapper } from "store/store";
import useUIThemeSetter from "hooks/useUIThemeSetter";
import useReqSetToken from "hooks/useReqSetToken";
import { useAppDispatch, useAppSelector } from "hooks/hook";
import { authSelector } from "store/feature/auth/authSlice";
import { getGeoLocation } from "store/feature/externalApi/externalApiService";
import { postGeoLocation } from "store/feature/Dashboard/DashboardService";
import { DashboardActions } from "store/feature/Dashboard/DashboardSlice";
import TopBarDash from "components/dashboard/TopBarDash";
import DashboardTrackerModal from "components/dashboard/DashboardTrackerModal";
import JokesList from "components/dashboard/JokesList";
import dynamic from "next/dynamic";

const VectorMapComp = dynamic(
  () => import("components/dashboard/VectorMapComp"),
  { ssr: false }
);
export default function Home() {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [dashboardTrackerModal, setDashboardTrackerModal] = useState(false);
  const dashboardTrackerCloseHandler = () => {
    setDashboardTrackerModal(false);
  };
  useEffect(() => {
    getGeoLocation().then((res) => {
      dispatch(DashboardActions.setCity(res?.data?.city));
      dispatch(DashboardActions.setCountry(res?.data?.country));
      dispatch(DashboardActions.setISP(res?.data?.isp));
      dispatch(DashboardActions.setLatitude(res?.data?.lat));
      dispatch(DashboardActions.setLongitude(res?.data?.lon));
      dispatch(DashboardActions.setTimezone(res?.data?.timezone));
      postGeoLocation(auth.User.username, res?.data);
    });
  }, []);
  return (
    <div className="flex min-h-screen p-[25px] justify-center text-center   ">
      <div className="   m-auto ">
        <div className="  p-[25px]  ">
          <TopBarDash />
        </div>
        <div className="p-4">
          <Button
            type="primary"
            onClick={() => {
              setDashboardTrackerModal(true);
            }}
            htmlType="antdButton"
          >
            Show all recent activities
          </Button>
          {dashboardTrackerModal && (
            <DashboardTrackerModal
              visible={dashboardTrackerModal}
              dashboardTrackerCloseHandler={dashboardTrackerCloseHandler}
            />
          )}
        </div>
        <div className="min-h-[500px] min-w-[500px]">
          <VectorMapComp />
        </div>
        <JokesList />
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await useUIThemeSetter(store, req);
      await useReqSetToken(store, req);
      if (store.getState().auth.token !== null) return {};
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }
);
