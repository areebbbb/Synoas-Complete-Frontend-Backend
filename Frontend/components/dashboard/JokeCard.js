import { HeartIcon } from "@heroicons/react/outline";
import { useAppSelector } from "hooks/hook";
import { useState, useEffect } from "react";
import { authSelector } from "store/feature/auth/authSlice";
import { postJokePost } from "store/feature/Dashboard/DashboardService";
import { getJoke } from "store/feature/externalApi/externalApiService";
import { message } from "antd";

const JokeCard = () => {
  const auth = useAppSelector(authSelector);
  const [jokeData, setJokeData] = useState({ value: "" });
  useEffect(() => {
    getJoke().then((res) => {
      if (!res) return;
      setJokeData(res.data);
    });
  }, []);

  const [fav, setFav] = useState(false);
  return (
    <div className="m-auto text-center justify-center gird gird-cols-1">
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
  );
};

export default JokeCard;
