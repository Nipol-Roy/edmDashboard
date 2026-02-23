"use client";

import { LuDollarSign } from "react-icons/lu";
import { FaFirstOrder } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";

import { MdShoppingBasket } from "react-icons/md";
{/* <MdShoppingBasket /> */}
import { PiShoppingBagFill } from "react-icons/pi";
{/* <PiShoppingBagFill /> */}
import { MdShop } from "react-icons/md";
{/* <MdShop /> */}
import { RiContactsFill } from "react-icons/ri";
{/* <RiContactsFill /> */}



import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  YAxis,
  CartesianGrid,
  Area,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { orderData } from "@/public/data/orderdata/data";
import { addOrders } from "@/app/redux/slices/orderSlice";
import { setCustomer } from "@/app/redux/slices/customerSlice";
import { fetchProduct } from "@/app/redux/slices/productSlice";
import { format } from "date-fns";
import activityData from "../../../public/data/activityData/activity.json";

const dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addOrders(orderData));
    dispatch(fetchProduct());

    fetch("/data/customerData/customers.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCustomer(data.customers));
      })
      .catch((err) => console.log(err));
  }, []);

  const { totalOrders } = useSelector((state) => state.orders);
  const { result } = useSelector((state) => state.product);
  const { allCustomer } = useSelector((state) => state.customerList);

  console.log(result);
  console.log(allCustomer);

  const completeSales = totalOrders.filter(
    (order) => order.status === "Delivered",
  );

  const totalOrder = totalOrders.length;
  console.log(totalOrders);

  const totalProduct = result.length;
  const totalCustomers = allCustomer.length;

  let orderDetails = [];
  let newCustomer = allCustomer.filter((customer) => customer.type === "new");

  let totalSales = 0;
  for (const sale of completeSales) {
    totalSales += sale.total;
  }

  const totalSalesData = [];
  completeSales.map((sale) => {
    const day = new Date(sale.createdAt).toLocaleString("default", {
      weekday: "short",
    });
    totalSalesData.push({
      day: day,
      amount: sale.total,
    });
  });
  console.log(completeSales);

  const validOrders = totalOrders.filter(
    (order) => order.status !== "Cancelled",
  );
  console.log(validOrders);

  const newOrders = validOrders.filter((order) => order.status !== "Delivered");
  console.log(newOrders);

  let totalNewOrders = 0;
  for (const order of validOrders) {
    totalNewOrders += order.items[0].quantity;
  }

  validOrders.map((order) => {
    const day = new Date(order.createdAt).toLocaleString("default", {
      weekday: "short",
    });

    orderDetails.push({
      day: day,
      quantity: order.items[0].quantity,
      status: totalNewOrders,
    });
  });
  console.log(orderDetails);

  const months = {};
  allCustomer.forEach((custom) => {
    const month = new Date(custom.joined).toLocaleString("default", {
      month: "short",
    });

    months[month] = (months[month] || 0) + 1;
  });

  const customers = Object.keys(months).map((month) => ({
    month,
    total: months[month],
  }));
  console.log(customers);

  console.log(totalSales, totalOrder, totalProduct, totalCustomers);

  const acc = {};
  result.forEach((product) => {
    if (acc[product.category]) {
      acc[product.category] += product.stock;
    } else {
      acc[product.category] = product.stock;
    }
  });

  const chartData = Object.keys(acc).map((category) => ({
    category: category,
    quantity: acc[category],
  }));
  console.log(chartData);

  let totalProducts = 0;
  for (const pro of chartData) {
    totalProducts += pro.quantity;
  }

  // recent order
  const recentOrders = [];
  totalOrders.forEach((order) => {
    let inserted = false;
    for (let i = 0; i < recentOrders.length; i++) {
      if (
        new Date(order.createdAt).getTime() >
        new Date(recentOrders[i].createdAt).getTime()
      ) {
        recentOrders.splice(i, 0, order);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      recentOrders.push(order);
    }
  });
  console.log(recentOrders);

  const finalRecentOrder = recentOrders.slice(0, 10);
  console.log(finalRecentOrder);

  const topOrders = [];
  result.forEach((order) => {
    let inserteds = false;
    for (let i = 0; i < topOrders.length; i++) {
      if (order.minimumOrderQuantity > topOrders[i].minimumOrderQuantity) {
        topOrders.splice(i, 0, order);
        inserteds = true;
        break;
      }
    }
    if (!inserteds) {
      topOrders.push(order);
    }
  });
  console.log(topOrders);
  const topTenOrders = topOrders.slice(0, 10);
  console.log(topTenOrders);

  let weeklyResult = {};
  let weekSize = 7;
  let weekCount = 1;

  for (let i = 0; i < recentOrders.length; i += weekSize) {
    let resu = recentOrders.slice(i, i + weekSize);
    let mainres = [];
    resu.map((ord) => {
      let setDate = new Date(ord.createdAt).toLocaleString("default", {
        weekday: "short",
      });

      mainres.push({
        date: setDate,
        total: ord.total,
      });
    });
    weeklyResult[`last ${weekCount} week`] = mainres;

    weekCount++;
  }
  console.log(weeklyResult);
  const [activeWeek, setActiveWeek] = useState("last 1 week");

  const handleWeek = (e) => {
    setActiveWeek(e.target.value);
  };

  const pieChartData = {};

  totalOrders.forEach((order) => {
    pieChartData[order.status] = (pieChartData[order.status] || 0) + 1;
  });

  const mainPieChartData = Object.keys(pieChartData).map((data) => ({
    data,
    total: pieChartData[data],
  }));

  console.log(mainPieChartData);

  const COLORS = ["#003366", "#006400", "#FFD700", "#800000"];

  // activity Data

  const activity = activityData.activity;

  const tenActivityData = activity.slice(0, 10);
  console.log(tenActivityData);

  return (
    <div className="w-full relative flex justify-center items-center bg-(--dcmbg)">
      <div className="w-full  ">
        <div className="p-3 sm:p-4 sm:text-2xl text-xl font-bold text-gray-300">
          Welcome Back, Nipol!
        </div>

        {/*  first chart */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  p-3 gap-2">
          <div className=" rounded-md h-48 overflow-hidden flex justify-center items-center flex-col  bg-[#98f7c72d] ">
            <div className="w-full h-[20%]  flex justify-center items-center gap-2">
              <div className="p-1 inline-block rounded-lg bg-green-500 text-white">
                <LuDollarSign />
              </div>
              <div className="text-xl">Total Sales</div>
            </div>
            <div className="w-full h-[80%] relative ">
              <div className="h-[50%] flex flex-col justify-end items-center">
                <div className="text-2xl lg:text-3xl  ">
                  ${totalSales.toLocaleString()}
                </div>
                <div className="  flex  gap-3 px-2  items-center">
                  <p className="text-md">This Week</p>
                  <div className=" flex justify-center gap-1 text-green-400 items-center">
                    <IoMdArrowDropup className="text-xl" />
                    <div className="text-lg">6.5%</div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[50%] flex justify-center items-center relative ">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={totalSalesData}>
                    <defs>
                      <linearGradient
                        id="colorSales"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#22c55e"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#22c55e"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>

                    <Tooltip formatter={(value) => `$${value}`} />

                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#16a34a"
                      strokeWidth={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className=" h-48 relative rounded-md  bg-[#b38c3828]">
            <div className="w-full  p-1 flex justify-center items-center gap-2">
              <div className="p-1 inline-block rounded-lg bg-[#eba308] text-white">
                <FaFirstOrder />
              </div>
              <div className="text-xl">Orders</div>
            </div>
            <div className="w-full h-38">
              <div className="h-1/2  flex flex-col justify-end items-center">
                <div className="text-2xl md:text-3xl">{totalNewOrders}</div>
                <div>
                  <span className="text-md">This Week </span>{" "}
                  <span className="text-lg text-[#eba308]">+6.1%</span>
                </div>
              </div>
              <div className="h-1/2 ">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={orderDetails}>
                    <defs>
                      <linearGradient id="colorBox" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#eba308"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#eba308"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip formatter={(value) => `${value}`} />
                    <Area
                      type="monotone"
                      dataKey="quantity"
                      stroke="#eba308"
                      strokeWidth={1}
                      fill="url(#colorBox)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className=" h-48 rounded-md   bg-[#64d5f125]">
            <div className="w-full p-1 flex justify-center items-center gap-2">
              <div className="p-1 inline-block rounded-lg bg-[#0dc8f7] text-white">
                <IoMdContacts />
              </div>
              <div className="text-xl">Customers</div>
            </div>
            <div className="w-full h-40">
              <div className="w-full h-1/2  flex flex-col justify-end items-center">
                <div className="text-2xl md:text-3xl ">
                  {allCustomer.length + 26}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div>This Week</div>
                  <div className="text-xl text-[#0dc8f7] gap-1 flex justify-center items-center">
                    <IoMdArrowDropup /> <span className="text-lg">+14</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-1/2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={customers}>
                    <defs>
                      <linearGradient
                        id="colorHome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0dc8f7"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0dc8f7"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip formatter={(value) => `${value}`} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#0dc8f7"
                      strokeWidth={1}
                      fill="url(#colorHome)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className=" h-50 rounded-md   bg-[#8e30c51a]">
            <div className="w-full p-1 flex justify-center items-center gap-2">
              <div className="p-1 inline-block rounded-lg bg-[#a710ff] text-white">
                <MdProductionQuantityLimits />
              </div>
              <div className="text-xl">Products</div>
            </div>
            <div className="h-40 w-full flex flex-col justify-center items-center">
              <div className="w-full h-1/2 flex justify-center items-center text-2xl">
                {" "}
                {totalProducts}
              </div>
              <div className="w-full h-1/2 ">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorShap"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#a710ff"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#a710ff"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip formatter={(value) => `${value}`} />
                    <Area
                      type="monotone"
                      dataKey="quantity"
                      stroke="#a710ff"
                      strokeWidth={1}
                      fill="url(#colorShap)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        {/* firstchart end */}

        {/* big dashboard start */}
        <div className="px-3 w-full flex flex-col md:flex-row   gap-2 justify-between items-center">
          <div className="w-full md:w-[68%] xl:w-[74%] border border-gray-500 h-125 rounded-sm">
            <div className="py-4 flex justify-center items-center  border-b border-gray-500 font-bold text-sm">
              Sales Analytics
            </div>
            <div className="w-full h-[89%] ">
              <div className="h-[20%] w-full flex justify-end items-center pr-5">
                <select
                  className="px-5 py-3 outline-none rounded-md bg-(--dcbtn)"
                  name=""
                  id=""
                  value={activeWeek}
                  onChange={handleWeek}
                >
                  {Object.keys(weeklyResult).map((resul,idx) => (
                    <option key={idx}
                      className="bg-(--dcsbg) active:bg-(--dcmgb) text-white px-3 py-1"
                      value={resul}
                    >
                      {resul}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full h-[80%]  ">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyResult?.[activeWeek]}>
                    <defs>
                      <linearGradient
                        id="colorLine"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3094B8"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#3094B8"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      vertical={false}
                      strokeWidth={0.5}
                      horizontal={true}
                      strokeDasharray="3 3"
                    />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="total" />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#77D3EC"
                      strokeWidth={2}
                      fill="url(#colorLine)"
                      dot={{
                        r: 4,
                        fill: "#fff",
                        stroke: "#77D3EC",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#77D3EC",
                        stroke: "#3094B8",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[30%] xl:w-[24.5%] border border-gray-500 h-125 rounded-sm relative">
            <div className="py-4 flex justify-center items-center  border-b border-gray-500 font-bold text-sm">
              Top Selling Products
            </div>
            <div className="p-1 w-full h-[88%]  overflow-auto scrollbar-hide">
              {topTenOrders.map((order, idx) => (
                <div key={idx} className="w-full my-1 relative">
                  <div className="w-full h-14  px-1  flex  justify-start items-center border-b border-gray-500 gap-3">
                    <div className=" w-10 h-10 rounded-lg overflow-hidden  bg-gray-100">
                      <img
                        className="w-full h-full object-cover object-center"
                        src={order.images[0]}
                        alt={order.title}
                      />
                    </div>
                    <div className="w-[80%] ">
                      <div className="text-md  font-thin truncate overflow-hidden">
                        {order.title}
                      </div>
                      <div className="w-full  flex justify-start items-center ">
                        <div className="text-sm flex justify-start items-center gap-2 px-2 border-r">
                          <span>Sales</span>
                          <span>{order.stock}</span>
                        </div>
                        <div className="text-sm flex justify-start items-center gap-2  px-2">
                          <span>Sale</span>
                          <span>{order.minimumOrderQuantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* big dashboard end */}
        {/* revenue chart start*/}

        <div className="p-3 w-full md:flex  gap-2   justify-between items-center">
          <div className="w-full h-80 md:w-[69%] border border-gray-700  rounded-sm">
            <div className="p-4  font-bold text-md">Revenue This Month</div>
            <div></div>
          </div>
          <div className="w-full md:w-[40%] border border-gray-700  h-80 relative rounded-sm">
            <div className=" p-3  font-bold text-md">Orders Status</div>
            <div className="w-full   h-68">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mainPieChartData}
                    dataKey="total"
                    nameKey="data"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    stroke="none"
                  >
                    {mainPieChartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* revenue chart end*/}

        {/* recent order List start */}

        <div className="px-3      relative ">
          <div className="w-full h-full relative   ">
            <div className="w-full flex justify-between items-center rounded-sm sticky z-20 top-0  bg-(--dcmbg)  border border-gray-700  p-3">
              <div>Recent Orders</div>
              <button className="cursor-pointer text-md text-blue-400">
                view all
              </button>
            </div>
            <div className=" w-full  z-10">
              <table className="w-full border-collapse">
                <thead className="">
                  <tr className=" w-full  bg-(--dcsbg)">
                    <th className="p-2 text-left px-5 ">Order Id</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody className="w-full border border-gray-700 rounded-b-md">
                  {finalRecentOrder.map((order, idx) => {
                    const date = format(
                      new Date(order.createdAt),
                      "dd MMM yyy",
                    );
                    return (
                      <tr
                        key={idx}
                        className="text-center odd:bg-(--dcmgb) even:bg-(--dcsbg)"
                      >
                        <td className="p-2 px-5 text-left">#{order.orderId}</td>
                        <td className="p-2 text-left ">
                          {order.customer.name}
                        </td>
                        <td>{order.items[0].quantity}</td>
                        <td className="p-2">${order.total}</td>
                        <td className=" flex justify-center items-center p-2">
                          <div
                            className={ ` w-27 text-black p-1 rounded-md  ${order.status === "Pending" ? "bg-[#FFDF20]" : order.status === "Processing" ? "bg-[#8EC5FF]" : order.status === "Delivered" ? "bg-[#7BF1A8]" : "bg-[#cf2d2d] text-white"}`}
                          >
                            {order.status}
                          </div>
                        </td>
                        <td className="p-2">{date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* recent order List end */}

        {/* recent activity  List start */}

        <div className="p-3 flex   justify-center items-center">
         <div className="w-full ">
           <div className="w-full border border-gray-700 h-full p-3">
            Recent Activity
          </div>
          <div className="border border-gray-700 p-3">
            {tenActivityData.map((activity,idx) => (
              <div key={idx} className="flex items-center w-full gap-2  my-2">
                <div className="w-[50%] border border-gray-700  py-2 px-4 ">{
                  activity.type === "order" && activity.status === "placed" ? "" : activity.type === "order" }</div>
                <div className="w-[25%] border border-gray-700  py-2 px-4 ">2</div>
                <div className="w-[25%] border border-gray-700  py-2 px-4 ">3</div>
              </div>
            ))}
          </div>
         </div>
        </div>

        {/* recent activity List end */}
      </div>
    </div>
  );
};

export default dashboard;
