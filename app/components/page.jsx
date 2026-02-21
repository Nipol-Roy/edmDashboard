"use client";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setLoading, setErrors } from "../redux/slices/tabsSlice";
import Logo from "../../public/data/images/logo.png";
import Customers from "./Customers/customers";
import Dashboard from "./Dashboard/dashboard";
import Order from "./Orders/page";
import Products from "./Products/products";
import Settings from "./Settings/settings";
import Profile from "./Profile/profile";
import { MdDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import Image from "next/image";

const page = () => {
  const dispatch = useDispatch();
  const { activeTab, loading, errors } = useSelector((state) => state.tabs);

  const tabs = [
    "dashboard",
    "products",
    "orders",
    "customers",
    "settings",
    "profile",
  ];

  return (
    <div className="flex  relative w-full box-border overflow-auto h-screen bg-(--dcmbg) text-(--dctxt)">
      <div className=" h-full w-[20%]  z-50  sm:w-50 sticky left-0 top-0  bg-(--dcsbg)  ">
        <div className="relative    flex justify-center items-center ">
          <div className=" w-18 h-18  ">
            <Image src={Logo} alt="logo" className="bg-cover bg-center" />
          </div>
        </div>
        <div className=" flex   flex-col gap-5 justify-center  items-center sm:items-start  sm:justify-start   my-5   ">
          {tabs.map((items, idx) => (
            <div
              key={idx}
              className="text-white"
              onClick={() => dispatch(setActiveTab(items))}
            >
              {items === "dashboard" ? (
                <div
                  className={`flex justify-start items-center gap-3 text-xl cursor-pointer  px-3 py-2 rounded-xl ${
                    activeTab === "dashboard" ? " bg-(--dcmbg) " : ""
                  } mx-5 `}
                >
                  <MdDashboard /> <h2 className="hidden sm:block">{items}</h2>
                </div>
              ) : items === "products" ? (
                <div
                  className={`flex justify-start items-center gap-3 text-xl cursor-pointer  px-3 py-2 rounded-xl ${
                    activeTab === "products" ? " bg-(--dcmbg) " : ""
                  } mx-5 `}
                >
                  <MdOutlineInventory2 />{" "}
                  <h2 className="hidden sm:block">{items}</h2>
                </div>
              ) : items === "orders" ? (
                <div
                  className={`flex justify-start items-center gap-3 text-xl cursor-pointer relative  px-3 py-2 rounded-xl ${
                    activeTab === "orders" ? " bg-(--dcmbg) " : ""
                  } mx-5 `}
                >
                  <FiShoppingCart />{" "}
                  <h2 className="hidden sm:block">{items}</h2>
                </div>
              ) : items === "customers" ? (
                <div
                  className={`flex justify-start items-center gap-3 text-xl cursor-pointer px-3 py-2 rounded-xl ${
                    activeTab === "customers" ? " bg-(--dcmbg) " : ""
                  } mx-5 `}
                >
                  <HiOutlineUserGroup />{" "}
                  <h2 className="hidden sm:block">{items}</h2>
                </div>
              ) : items === "settings" ? (
                <div
                  className={`flex justify-start items-center gap-3 text-xl cursor-pointer  px-3 py-2 rounded-xl ${
                    activeTab === "settings" ? " bg-(--dcmbg) " : ""
                  } mx-5 `}
                >
                  <FiSettings /> <h2 className="hidden sm:block">{items}</h2>
                </div>
              ) : (
                <div
                  className={`flex justify-start items-center gap-3 text-xl  px-3 py-2 rounded-xl ${
                    activeTab === "profile" ? " bg-(--dcmbg) " : ""
                  }  absolute bottom-15 left-1/2  -translate-x-1/2`}
                >
                  <CgProfile /> <h2 className="hidden sm:block">{items}</h2>
                </div>
              )}
            </div>
          ))}
          <div className="absolute bottom-2  text-[10px] border-t border-gray-500 sm:text-lg w-full flex justify-center items-center">
            &#169; EDM 2025
          </div>
        </div>
      </div>
      <div className=" w-full relative ">
        <div
          className="border-gray-500 font-semibold z-10 sticky top-0 overflow-hidden capitalize h-18.25 bg-(--dcsbg)
  flex justify-between px-5 items-center text-xl "
        >
          <div className="flex gap-3 ">
            <FaRegArrowAltCircleLeft size={24} className="cursor-pointer" />
            {activeTab}
          </div>
          <div className=" rounded-full relative sm:mr-5 ">
            <IoNotificationsOutline size={24} className="" />
            <span
              className="absolute -top-1 -right-1 h-4 flex justify-center
             items-center flex-full w-4 rounded-full text-sm bg-red-700 text-white "
            >
              3
            </span>
          </div>
        </div>

        <div>
          {activeTab === "dashboard" ? (
            <Dashboard />
          ) : activeTab === "products" ? (
            <Products />
          ) : activeTab === "orders" ? (
            <Order />
          ) : activeTab === "customers" ? (
            <Customers />
          ) : activeTab === "settings" ? (
            <Settings />
          ) : (
            <Profile />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
