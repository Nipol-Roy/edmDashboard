"use client";

import Image from "next/image";
import bgImage from "../../public/data/images/loginBg.jpg";
import Logo from "../../public/data/images/logo.png";

import { MdShoppingCart } from "react-icons/md";
import { useState } from "react";

const LogIn = () => {
  const [registration, setRegistration] = useState(false);

  return (
    <div
      className={`w-full login h-dvh max-w-600 overflow-hidden box-border  relative ${registration === true ? "hidden" : "flex"}`}
    >
      {/* logIn Section */}
      <div className="w-full h-full flex justify-start flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 relative h-full  ">
          <Image
            src={bgImage}
            alt="background"
            className="object-cover w-full h-full object-center"
          />

          <div
            className="absolute flex flex-col justify-center md:justify-center items-center top-0 md:top-1/2 left-1/2 -translate-x-1/2 
             md:-translate-y-2/3 h-1/5 md:h-1/3 text-white w-full gap-2"
          >
            <div className="flex  justify-center  items-center gap-2">
              <div className="text-5xl  h-15 rounded-2xl overflow-hidden w-15">
                <Image
                  src={Logo}
                  alt="Logo"
                  className="object-cover object-center w-full h-full bg-gray-900 "
                />
                {/* <MdShoppingCart /> */}
              </div>
              <div className="text-3xl font-bold leading-7">
                <h2>EDM Admin Panel</h2>
                <p className="text-sm px-0.5 font-extralight">
                  E-Commerce Dashboard Management
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center text-center text-md items-center">
              <p>Manage Orders, Customers & Analytics Efficently</p>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-0 left-0 md:relative  md:w-1/2 h-full flex justify-center items-center">
          <div className=" flex justify-center items-center bg-white h-[60%] w-90 sm:w-110 rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.28)]">
            <div className="w-[90%] h-[90%] border">
            <div className="border border-black h-20"></div>


            </div>
          </div>
        </div>
      </div>
      {/* logIn Section End */}

      <div className={`${registration === true ? "flex" : "hidden"}`}>
        reginsration
      </div>
    </div>
  );
};

export default LogIn;
