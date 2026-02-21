"use client";
import { CiSearch, CiFilter } from "react-icons/ci";

import { GoSortDesc } from "react-icons/go";
import { format } from "date-fns";


import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { totalOrders } = useSelector((state) => state.orders);
  const { result } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [showSort,setShowSort] = useState(false)
  const [showFilter,setShowFilter] = useState(false)

  const statusStyles = {
    Pending: "bg-yellow-300 text-yellow-900",
    Processing: "bg-blue-300 text-blue-900",
    Delivered: "bg-green-300 text-green-900",
    Canceled: "bg-red-300 text-red-900",
  };

 

  return (
    <div className="rounded-md  relative w-full">
  <div className="bg-(--dcmbg) rounded-md border border-gray-700">

    {/* Search Bar */}
    <div className="sticky top-0 z-20 bg-(--dcmbg) rounded-md border-b border-gray-700">
      <div className="flex w-full justify-between items-center p-3">
        <div className="flex bg-(--dcsbg) items-center  gap-2 px-2 py-1 w-55 sm:w-65">
          <CiSearch className="text-xl opacity-70" />
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>



        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-(--dcsbg) text-sm">
            <CiFilter className="text-lg" />
            <span className="hidden sm:block">Filter</span>
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-(--dcsbg) text-sm">
            <GoSortDesc className="text-lg" />
            <span className="hidden sm:block">Sort</span>
          </button>
        </div>




      </div>
    </div>

    {/* Table Wrapper */}
    <div className="max-h-80vh] overflow-auto">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead className="sticky top-0 bg-(--dcmbg) z-10">
          <tr className="border-b border-gray-600">
            <th className="p-3 text-center">OrderId</th>
            <th className="p-3 text-center">Customer</th>
            <th className="p-3 text-left px-5">Product</th>
            <th className="p-3 text-center">Qty</th>
            <th className="p-3 text-center">Total</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Date</th>
          </tr>
        </thead>

        <tbody>
          {totalOrders.map((orders, idx) => {
            const matchProduct = result?.find(
              (item) => item.id === orders.items[0].productId,
            );

            const quantity = orders.items[0].quantity;
            const price = matchProduct?.price ?? 0;
            const totalPrice = (price * quantity).toFixed(2);

            const date = format(new Date(orders.createdAt), "dd MMM yyyy");

            return (
              <tr
                key={orders.orderId}
                className="odd:bg-(--dcsbg) even:bg-(--dcmbg) border-b border-gray-700"
              >
                <td className="p-3 text-center">{orders.orderId}</td>
                <td className="p-3 text-center">{orders.customer.name}</td>

                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-white w-12 h-12 p-1 rounded-full flex justify-center items-center shrink-0">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={matchProduct?.images?.[0] || "/placeholder.png"}
                        alt={matchProduct?.title || "Product"}
                      />
                    </span>
                    <span className="line-clamp-2">
                      {matchProduct?.title || "Unknown Product"}
                    </span>
                  </div>
                </td>

                <td className="p-3 text-center">{quantity}</td>
                <td className="p-3 text-center">${totalPrice}</td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[orders.status] ||
                      "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {orders.status}
                  </span>
                </td>

                <td className="p-3 text-center whitespace-nowrap">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default Orders;
