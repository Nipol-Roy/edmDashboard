"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoMdContacts } from "react-icons/io";
import { IoNewspaperSharp } from "react-icons/io5";
import { RiLoopRightFill } from "react-icons/ri";
import { RiVipCrown2Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Customers = () => {
  const dispatch = useDispatch();
  const { allCustomer } = useSelector((state) => state.customerList);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [openDropFilter, setOpenDropFIlter] = useState(false);

  

  useEffect(() => {
    console.log(allCustomer);
    setTotalCustomer(allCustomer?.length);
  }, [allCustomer]);

  const typeStyles = {
    new: "border-blue-300 text-blue-700 bg-blue-100",
    returning: "border-green-300 text-green-700 bg-green-100",
    vip: "border-yellow-400 text-yellow-700 bg-yellow-100",
    default: "border-gray-300 text-gray-700 bg-gray-100",
  };
  return (
    <div className=" relative ">
      <div className="h-16.25 w-full border border-gray-600 rounded-md  sticky top-0  z-20 left-0 bg-(--dcsbg)   mb-2 flex justify-between px-5 items-center">
        <div className=" flex justify-center items-center bg-(--dcmbg) text-white gap-3 p-2 rounded-md">
          <IoSearch className="text-xl" />
          <input type="text" className="outline-none" />
        </div>
        <div className="relative ">
          <div
            onClick={() => setOpenDropFIlter(!openDropFilter)}
            className="flex justify-center items-center gap-1 cursor-pointer  p-2 bg-(--dcbtn) rounded-md"
          >
            <span className="font-bold text-md">Filter</span>{" "}
            <MdOutlineKeyboardArrowRight className="text-2xl" />
          </div>

          <div
            className={`${openDropFilter ? "flex flex-col" : "hidden"} absolute  z-1 -bottom-68.75  right-0 bg-(--dcmbg) rounded-md`}
          >
            <div
              onClick={() => setOpenDropFIlter(!openDropFilter)}
              className="absolute top-1 text-white font-bold hover:scale-120 active:scale-90 transition duration-200 cursor-pointer p-1 rounded-full  right-3 text-2xl"
            >
              <IoMdClose />
            </div>
            <div className="relative  flex flex-col justify-center items-center gap-2 p-3 mt-6 ">
              <div className="w-50 border p-3 rounded-md bg-(--dcbtn) flex justify-center cursor-pointer items-center font-bold">
                All
              </div>
              <div className="w-50 border p-3 rounded-md bg-(--dcbtn) flex justify-center cursor-pointer items-center font-bold">
                VIP
              </div>
              <div className="w-50 border p-3 rounded-md bg-(--dcbtn) flex justify-center cursor-pointer items-center font-bold">
                New
              </div>
              <div className="w-50 border p-3 rounded-md bg-(--dcbtn) flex justify-center cursor-pointer items-center font-bold">
                Return
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* all total */}
      <div className="grid grid-rows-4 mt-2 ml-2  grid-cols-1  sm:grid-rows-2 sm:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4   pb-3 gap-5">
        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-blue-300 text-blue-700 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <IoMdContacts className="text-xl" />
            <div className="text-md ">Total Customers</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            {allCustomer.length}
          </div>
        </div>

        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-green-300 text-green-800 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <IoNewspaperSharp className="text-xl" />
            <div className="text-md ">New This Month</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            120
          </div>
        </div>
        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-amber-500 text-gray-900 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <RiLoopRightFill className="text-xl" />
            <div className=" text-md">Returning Customers</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            120
          </div>
        </div>
        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-fuchsia-500 text-gray-100 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <RiVipCrown2Fill className="text-xl text-yellow-400" />
            <div className=" text-md">VIP Customers</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            120
          </div>
        </div>
      </div>

      {/* all total End */}

      <div className="w-full border border-gray-600 mt-2 ml-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className=" bg-(--dcsbg) h-10">
              <th className="text-left px-3 font-bold text-lg">Name</th>
              <th className="text-left  font-bold text-lg">Email</th>
              <th className="text-center  px-3 font-bold text-lg">Orders</th>
              <th className="text-center  px-3 font-bold text-lg">
                Total Spend
              </th>
              <th className="text-center  px-3 font-bold text-lg">Status</th>
              <th className="text-center  px-3 font-bold text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {allCustomer.map((customer, idx) => (
              <tr key={idx} className="odd:bg-(--dcmbg) even:bg-(--dcsbg)">
                <td className="p-2 flex justify-start items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden ">
                    <img
                      src={customer.avatar}
                      className="w-full h-full object-cover object-center"
                      alt={customer.name}
                    />
                  </div>
                  <div className="line-clamp-2">{customer.name}</div>
                </td>
                <td>{customer.email}</td>
                <td className="text-center">{customer.totalOrders}</td>
                <td className="text-center">{customer.totalSpend}</td>
                <td className="text-center p-2">
                  <div
                    className={`border  py-1 rounded-md text-lg capitalize font-bold ${typeStyles[customer.type] || typeStyles.default} `}
                  >
                    {customer.type}
                  </div>
                </td>
                <td className="text-center w-40">
                  <button className="px-4 py-2 bg-(--dcbtn) rounded-lg text-white font-bold text-lg">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
