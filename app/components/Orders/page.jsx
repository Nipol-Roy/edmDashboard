"use client";
import { CiSearch, CiFilter } from "react-icons/ci";

import { GoSortDesc } from "react-icons/go";
import { format } from "date-fns";

import { useState } from "react";
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
  console.log(matchingOrders);

  const alphabeticalySorted = matchingOrders?.sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });
  console.log(alphabeticalySorted);

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
  console.log(latestOrder);

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

  console.log(highPrice);

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

  console.log(lowPrice);

  const pendingOrder = matchingOrders.filter(
    (order) => order.status === "Pending",
  );
  console.log(pendingOrder);

  const deliveriedOrder = matchingOrders.filter(
    (order) => order.status === "Delivered",
  );
  console.log(deliveriedOrder);
  const canceledOrder = matchingOrders.filter(
    (order) => order.status === "Cancelled",
  );
  console.log(canceledOrder);
  const processingOrder = matchingOrders.filter(
    (order) => order.status === "Processing",
  );


  const sortById = []
   matchingOrders.forEach((order)=>{
    let inserted = false;
    for(let i=0; i < sortById.length; i++){
      if(order.orderId < sortById[i].orderId){
        sortById.splice(i,0,order)
        inserted = true
  break
      }
    }
    if(!inserted){
      sortById.push(order)
    }
  })
  console.log(sortById)


  console.log(processingOrder);
  const [sortBy, setSortBy] = useState("latestOrders");

  const sorted =
    sortBy === "pendingOrder"
      ? pendingOrder
      : sortBy === "DeliveredOrder"
        ? deliveriedOrder
        : sortBy === "CancelledOrders"
          ? canceledOrder
          : sortBy === "ProcessingOrder"
            ? processingOrder
            : sortBy === "alphabeticalOrder"
              ? alphabeticalySorted
              : sortBy === "lowToHigh"
                ? lowPrice
                : sortBy === "highToLow"
                  ? highPrice
                  : sortBy === "latestOrders"
                  ? latestOrder : sortBy === "sortById"
                  ? sortById : matchingOrders;

  const handleSelect = (e) => {
    setSortBy(e.target.value);
  };

  console.log(sortBy);

  return (
    <div className="rounded-md  relative w-full">
      <div className="bg-(--dcmbg) rounded-md border border-gray-700">
        {/* Search Bar */}
        <div className="sticky top-0 z-20 bg-(--dcmbg) rounded-md border-b border-gray-700">
          <div className="flex w-full justify-between items-center p-3">
            <div className="flex bg-(--dcsbg) items-center  gap-2 px-3 py-2 rounded-md w-45 sm:w-65">
              <CiSearch className="text-xl opacity-70" />
              <input
                type="text"
                placeholder="Search orders..."
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

              {/* <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-(--dcsbg) text-sm">
            <GoSortDesc className="text-lg" />
            <span className="hidden sm:block">Sort</span>
          </button> */}
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
                const totalPrice = (orders.price).toFixed(2);
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
                            src={orders.image || "/placeholder.png"}
                            alt={orders.title || "Product"}
                          />
                        </span>
                        <span className="line-clamp-2">
                          {orders.title || "Unknown Product"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {orders.items[0].quantity}
                    </td>
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
                    <td className="p-3 text-center whitespace-nowrap">
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
