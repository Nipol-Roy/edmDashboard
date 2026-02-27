"use client";
import { CiSearch, CiFilter } from "react-icons/ci";

import { GoSortDesc } from "react-icons/go";
import { format } from "date-fns";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { totalOrders } = useSelector((state) => state.orders);
  const { result } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const statusStyles = {
    Pending: "bg-yellow-300 text-yellow-900",
    Processing: "bg-blue-300 text-blue-900",
    Delivered: "bg-green-300 text-green-900",
    Canceled: "bg-red-300 text-red-900",
  };

  const matchingOrders = totalOrders.map((order) => {
    const matchProduct = result?.find(
      (item) => Number(item.id) === Number(order.items[0].productId),
    );
    return {
      ...order,
      price: matchProduct?.price * order.items[0].quantity ?? 0,
      image: matchProduct?.images?.[0],
      title: matchProduct?.title,
    };
    // orders.price * orders.items[0].quantity
  });

  const alphabeticalySorted = matchingOrders?.sort((a, b) =>
    (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase()),
  );

  const latestOrder = [];
  matchingOrders.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < latestOrder.length; i++) {
      if (
        new Date(order.createdAt).getTime() >
        new Date(latestOrder[i].createdAt).getTime()
      ) {
        latestOrder.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      latestOrder.push(order);
    }
  });

  const highPrice = [];
  matchingOrders.forEach((order) => {
    let inserted = false;

    for (let i = 0; i < highPrice.length; i++) {
      if (order.price > highPrice[i].price) {
        highPrice.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      highPrice.push(order);
    }
  });

  const lowPrice = [];
  matchingOrders.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < lowPrice.length; i++) {
      if (order.price < lowPrice[i].price) {
        lowPrice.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      lowPrice.push(order);
    }
  });

  const pendingOrder = matchingOrders.filter(
    (order) => order.status === "Pending",
  );

  const deliveriedOrder = matchingOrders.filter(
    (order) => order.status === "Delivered",
  );

  const canceledOrder = matchingOrders.filter(
    (order) => order.status === "Cancelled",
  );

  const processingOrder = matchingOrders.filter(
    (order) => order.status === "Processing",
  );

  const sortById = [];
  matchingOrders.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < sortById.length; i++) {
      if (order.orderId < sortById[i].orderId) {
        sortById.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      sortById.push(order);
    }
  });

  const [searchTeam, setSearchTeam] = useState("");

  const handleSearch = (e) => {
    setSearchTeam(e.target.value);
  };

  console.log(matchingOrders);

  const searchResult = useMemo(() => {
    return matchingOrders.filter(
      (order) =>
        order.customer.name.toLowerCase().includes(searchTeam.toLowerCase()) ||
        order.orderId.toString().includes(searchTeam.toString()),
    );
  }, [matchingOrders, searchTeam]);

  const [sortBy, setSortBy] = useState("latestOrders");

  const sortMap = {
    pendingOrder: pendingOrder,
    DeliveredOrder: deliveriedOrder,
    CancelledOrders: canceledOrder,
    ProcessingOrder: processingOrder,
    alphabeticalOrder: alphabeticalySorted,
    lowToHigh: lowPrice,
    highToLow: highPrice,
    latestOrders: latestOrder,
    sortById: sortById,
  };

  const sorted = searchTeam ? searchResult : sortMap[sortBy] || matchingOrders;

  const handleSelect = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="rounded-md  relative w-full">
      <div className="bg-(--dcmbg) rounded-md border border-gray-700">
        {/* Search Bar */}
        <div className="sticky top-0 z-20 bg-(--dcmbg) rounded-md border-b border-gray-700">
          <div className="flex w-full justify-between items-center p-3">
            <div className="flex bg-(--dcsbg) items-center  gap-2 px-3 py-2 rounded-md w-60 sm:w-75">
              <CiSearch className="text-xl opacity-70" />
              <input
                value={searchTeam}
                onChange={handleSearch}
                type="text"
                placeholder="Search Name Or Order Id.."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                onChange={handleSelect}
                value={sortBy}
                name=""
                id=""
                className="bg-(--dcsbg) text-sm border-none p-2 rounded-md outline-none "
              >
                <option value="latestOrders">Latest</option>
                <option value="sortById">Sort By Id</option>
                <option value="highToLow">High To Low Price</option>
                <option value="lowToHigh">Low High To Price </option>
                <option value="alphabeticalOrder">Alphabetical sort</option>
                <option value="pendingOrder">Pending Orders</option>
                <option value="DeliveredOrder">Delivered Orders</option>
                <option value="ProcessingOrder">Processing Orders</option>
                <option value="CancelledOrders">Cancelled Orders</option>
              </select>
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
              {sorted.map((orders, idx) => {
                const totalPrice = orders.price.toFixed(2);
                const date = format(new Date(orders.createdAt), "dd MMM yyyy");
                return (
                  <tr
                    key={orders.orderId}
                    className="odd:bg-(--dcsbg) even:bg-(--dcmbg) border-b border-gray-700"
                  >
                    <td className="p-1 text-center">{orders.orderId}</td>
                    <td className="p-1 text-center">{orders.customer.name}</td>
                    <td className="p-1">
                      <div className="flex items-center gap-3">
                        <span className="bg-white w-12 h-12 p-1 rounded-full flex justify-center items-center shrink-0">
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={orders.image || "/placeholder.png"}
                            alt={orders.title || "Product"}
                          />
                        </span>
                        <span className="line-clamp-2">
                          {orders.title || "Unknown Product"}
                        </span>
                      </div>
                    </td>
                    <td className="p-1 text-center">
                      {orders.items[0].quantity}
                    </td>
                    <td className="p-1 text-center">${totalPrice}</td>
                    <td className="p-1 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[orders.status] ||
                          "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {orders.status}
                      </span>
                    </td>
                    <td className="p-1 text-center whitespace-nowrap">
                      {date}
                    </td>
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
