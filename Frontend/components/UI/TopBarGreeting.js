import greetingTime from "greeting-time";
import { useAppSelector } from "hooks/hook";
import { useState, useEffect } from "react";
import { authSelector } from "store/feature/auth/authSlice";
import { getGenderPrediction } from "store/feature/externalApi/externalApiService";

const TopBarGreeting = () => {
  const auth = useAppSelector(authSelector);
  const [userGender, setUserGender] = useState({
    gender: null,
    probability: 0,
  });
  useEffect(() => {
    getGenderPrediction(auth.User.first_name).then((res) => {
      if (!res) return;
      setUserGender({
        gender: res.data.gender,
        probability: res.data.probability,
      });
    });
  }, []);
  return (
    <>
      <div>
        <h2 className="text-4xl dark:text-white">
          Welcome {auth.User.first_name}
        </h2>
        <h3 className="text-2xl  dark:text-white">
          {greetingTime(new Date())}
        </h3>
        <h4 className="dark:text-white font-semibold">
          Based on your name there is {userGender.probability * 100}%
          probability that your gender is {userGender.gender}
        </h4>
      </div>
    </>
  );
};

export default TopBarGreeting;
