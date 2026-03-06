"use client";

import MainComponent from "./components/page";
import LogIn from "./components/LogIn";
import { useSelector } from "react-redux";



const page = () => {
  const { loginInfo} = useSelector(
    (state) => state.Login,
  );

  return (
    <div className="font-mono">
      <div>
        {loginInfo  ? (
          <MainComponent />
        ) : (
          <LogIn />
        )}
      </div>
    </div>
  );
};

export default page;
