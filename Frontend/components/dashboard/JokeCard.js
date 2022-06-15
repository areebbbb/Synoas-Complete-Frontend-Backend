import { HeartIcon } from "@heroicons/react/outline";
import { useAppSelector } from "hooks/hook";
import { useState, useEffect } from "react";
import { authSelector } from "store/feature/auth/authSlice";
import { postJokePost } from "store/feature/Dashboard/DashboardService";
import { getJoke } from "store/feature/externalApi/externalApiService";
import { message, Spin } from "antd";

const JokeCard = () => {
  const auth = useAppSelector(authSelector);
  const [jokeData, setJokeData] = useState({ value: "" });
  const [jokeDataLoading, setJokeDataLoading] = useState(true);
  useEffect(() => {
    setJokeDataLoading(true);
    getJoke().then((res) => {
      if (!res) return;
      setJokeData(res.data);
      setJokeDataLoading(false);
    });
  }, []);

  const [fav, setFav] = useState(false);
  return (
    <Spin spinning={jokeDataLoading}>
      <div className="m-auto text-center justify-center gird gird-cols-1 min-h-[20px]">
        <HeartIcon
          className={`max-h-5 w-full cursor-pointer ${
            fav ? "text-red-600" : "text-black  dark:text-white"
          }`}
          onClick={() => {
            setFav((pre) => !pre);
            postJokePost(auth.User.username, jokeData.value).then((res) => {
              message.success("Request Completed", 3);
            });
          }}
        />
        <div className="min-w-full border border-gray-500 dark:border-gray-300 rounded-xl p-2 m-2">
          {jokeData?.value}
        </div>
      </div>
    </Spin>
  );
};

export default JokeCard;
