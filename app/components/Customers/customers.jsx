"use client";
import { useEffect, useMemo, useState } from "react";
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
    setTotalCustomer(allCustomer?.length);
  }, [allCustomer]);

  const typeStyles = {
    new: "border-blue-300 text-blue-700 bg-blue-100",
    returning: "border-green-300 text-green-700 bg-green-100",
    vip: "border-yellow-400 text-yellow-700 bg-yellow-100",
    default: "border-gray-300 text-gray-700 bg-gray-100",
  };

  const [sortingCustomer, setSortingCustomer] = useState("");

  const newCustomers = allCustomer.filter(
    (customer) => customer.type === "new",
  );
  const returningCustomers = allCustomer.filter(
    (customer) => customer.type === "returning",
  );
  const VIPCustomers = allCustomer.filter(
    (customer) => customer.type === "vip",
  );

  const handleSort = (e) => {
    setSortingCustomer(e.target.value);
  };

  const topToBottomSpendSorting = [];

  allCustomer.forEach((order) => {
    let inserted = false;

    for (let i = 0; i < topToBottomSpendSorting.length; i++) {
      if (order.totalSpend > topToBottomSpendSorting[i].totalSpend) {
        topToBottomSpendSorting.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      topToBottomSpendSorting.push(order);
    }
  });

  const bottomToTopSpendingSorting = [];
  allCustomer.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < bottomToTopSpendingSorting.length; i++) {
      if (order.totalSpend < bottomToTopSpendingSorting[i].totalSpend) {
        bottomToTopSpendingSorting.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      bottomToTopSpendingSorting.push(order);
    }
  });

  const TopOrderPlasedCustomers = [];

  allCustomer.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < TopOrderPlasedCustomers.length; i++) {
      if (order.totalOrders > TopOrderPlasedCustomers[i].totalOrders) {
        TopOrderPlasedCustomers.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      TopOrderPlasedCustomers.push(order);
    }
  });

  const aTozSort = [...allCustomer].sort((a, b) =>
    (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase()),
  );

  const topOrderCustomer = [];
  allCustomer.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < topOrderCustomer.length; i++) {
      if (order.totalOrders > topOrderCustomer[i].totalOrders) {
        topOrderCustomer.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      topOrderCustomer.push(order);
    }
  });

  const [searchingCustomer, setSearchingCustomer] = useState("");
  const handleSearchChange = (e) => {
    setSearchingCustomer(e.target.value);
  };

  console.log(searchingCustomer);

  const searchingCustomerResult = useMemo(() => {
    return allCustomer.filter((order)=>
    order.name.toLowerCase().includes(searchingCustomer.toLowerCase())
    )
  });
console.log(allCustomer)
  const sorted = {
    highToLow: topToBottomSpendSorting,
    lowToHigh: bottomToTopSpendingSorting,
    alphabeticalOrder: aTozSort,
    newCustomers: newCustomers,
    returningCustomers: returningCustomers,
    vipCustomers: VIPCustomers,
    topOrderCustomer: topOrderCustomer,
  };

  const sortedCustomers = searchingCustomer
    ? searchingCustomerResult
    : sorted[sortingCustomer] || allCustomer;

  return (
    <div className=" relative ">
      <div className="h-16.25 w-full border  border-gray-600 rounded-md  sticky top-0  z-20 left-0 bg-(--dcsbg)   mb-2 flex justify-between px-5 items-center">
        <div className=" flex justify-center items-center bg-(--dcmbg) text-white gap-3 p-2 rounded-md">
          <IoSearch className="text-xl" />
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search your Name..."
            className="outline-none"
          />
        </div>
        <div className="  gap-2 ">
          <select
            onChange={handleSort}
            value={sortingCustomer}
            name=""
            id=""
            className="bg-(--dcmbg)  text-md border-none h-10 w-60 p-2 rounded-md outline-none "
          >
            <option defaultChecked>Sort Customers</option>
            <option value="highToLow">Top To Bottom Spended</option>
            <option value="lowToHigh">Bottom To Top Spended </option>
            <option value="alphabeticalOrder">A To Z sort</option>
            <option value="newCustomers">New Customers</option>
            <option value="returningCustomers">returning Customers</option>
            <option value="vipCustomers">VIP Customers</option>
            <option value="topOrderCustomer">Top Orders Customer</option>
          </select>
        </div>
      </div>

      {/* all total */}
      <div className="grid grid-rows-4 mt-2 p-3  grid-cols-1  sm:grid-rows-2 sm:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4   pb-3 gap-5">
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
            {newCustomers.length}
          </div>
        </div>
        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-amber-500 text-gray-900 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <RiLoopRightFill className="text-xl" />
            <div className=" text-md">Returning Customers</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            {returningCustomers.length}
          </div>
        </div>
        <div className="   w-full h-32 sm:h-20 relative p-2 bg-white rounded-lg ">
          <div className=" bg-fuchsia-500 text-gray-100 flex justify-center items-center gap-2 w-full rounded-md h-1/2  font-bold">
            <RiVipCrown2Fill className="text-xl text-yellow-400" />
            <div className=" text-md">VIP Customers</div>
          </div>
          <div className="w-full flex justify-center items-center text-3xl font-bold bg-white text-gray-950 h-1/2">
            {VIPCustomers.length}
          </div>
        </div>
      </div>

      {/* all total End */}

      <div className="w-full border border-gray-600 mt-2 overflow-x-auto ">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className=" bg-(--dcsbg) h-10">
              <th className="text-left px-3 font-bold text-md">Customer</th>
              <th className="text-left font-bold text-md">Email</th>
              <th className="text-center  px-3 font-bold text-md">Orders</th>
              <th className="text-center   font-bold text-md">
                Total Spend
              </th>
              <th className="text-center  px-3 font-bold text-md">Status</th>
              <th className="text-left  px-3 font-bold text-md">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {sortedCustomers.map((customer, idx) => (
              <tr key={idx} className="odd:bg-(--dcmbg) even:bg-(--dcsbg) ">
                <td className="p-2 flex justify-start items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden ">
                    <img
                      src={customer.avatar}
                      className="w-full h-full object-cover object-center"
                      alt={customer.name}
                    />
                  </div>
                  <div className="line-clamp-1">{customer.name}</div>
                </td>
                <td className="">{customer.email}</td>
                <td className="text-center">{customer.totalOrders}</td>
                <td className="text-center px-2  ">{customer.totalSpend}</td>
                <td className="">
                  <div
                    className={` rounded-md text-sm py-1 px-3 text-center  border capitalize font-semibold ${typeStyles[customer.type] || typeStyles.default} `}
                  >
                    {customer.type}
                  </div>
                </td>
                <td className="text-center px-2 ">
                  <button className="px-4 py-1 bg-(--dcbtn) hover:bg-(--dcmb) hover:text-(--dcmbg) cursor-pointer rounded-md text-white font-medium transition text-sm">
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
