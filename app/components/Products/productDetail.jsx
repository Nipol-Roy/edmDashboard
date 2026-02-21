"use client";

import { formatDistanceToNow, format } from "date-fns";
import loadingImage from "../../../public/data/images/cartoon-turtle-loading-icon-interface_172107-1203.jpg";

import { LuInfo } from "react-icons/lu";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import { HiShieldCheck } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const productDetail = ({ product }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const isoCreateTime = product.meta.createdAt;
  const createdDateTime = format(
    new Date(isoCreateTime),
    "dd MMM yyyy, hh:mm a",
  );
  const createdLeftTime = formatDistanceToNow(new Date(isoCreateTime), {
    addSuffix: true,
  });

  const isoUpdateTime = product.meta.updatedAt;
  const updatedDateTime = format(new Date(isoUpdateTime), "dd MMM yyyy");
  const updatedLeftTime = formatDistanceToNow(new Date(isoUpdateTime), {
    addSuffix: true,
  });

  return (
    <div className="w-full  flex justify-center items-start h-full overflow-auto  bg-gray-500">
      <div className="w-[90vw] relative xl:w-[70vw] my-5 bg-(--dcsbg) rounded-md">
        
        <div className="w-full flex flex-col justify-between  md:flex-row">
          {/* image section */}
          <div className="p-3">
            <div className="w-full  relative aspect-square flex justify-center items-center rounded-xl bg-gray-200 overflow-hidden">
              <img
                className="w-full h-full object-contain transition duration-300 hover:scale-105"
                src={product?.images?.[0] || loadingImage}
                alt={product?.title || "Product image"}
              />
            </div>
          </div>

          {/* image secrion end */}

          {/* product section */}
          <div className="w-full  p-3">
            <div className="flex justify-start gap-3 items-center py-1 ">
              <div className=" px-2 rounded-md bg-(--dcbtn) text-white">
                {product.category}
              </div>
              <div className=" px-2 rounded-md bg-(--dcbtn) text-white">
                {product.brand}
              </div>
            </div>

            <div>
              <div className="text-lg md:text-xl mt-2 xl:text-2xl">
                {product.title}
              </div>
              <div className="flex justify-between items-center ">
                <div className="text-lg md:text-2xl ">${product.price}</div>
              </div>
              <div className="w-full text-md my-2 flex justify-start gap-2 text-lg items-center ">
                <div className="text-(--dcmb) font-bold text-lg">ID:</div>
                <div className="">{product.meta.barcode}</div>
              </div>
            </div>
            <div>
              <div>
                <h2 className=" text-lg  my-2  text-(--dcmb) font-bold  ">
                  Dimensions
                </h2>
                <div className="flex justify-start items-center gap-3  ">
                  <div className="border p-2 rounded-xl bg-(--lcbtn) font-bold text-(--dcsbg)">
                    D: {product.dimensions.depth}
                  </div>
                  <div className="border p-2 rounded-xl bg-(--dcmb) font-bold text-(--dcsbg)">
                    H: {product.dimensions.height}
                  </div>
                  <div className="border p-2 rounded-xl bg-(--lcsbg) font-bold text-(--dcsbg)">
                    W: {product.dimensions.width}
                  </div>
                </div>
              </div>
              <div className="p-2 mt-2 bg-gray-700 text-justify rounded-md">
                <h2 className="text-lg font-bold mb-2 text-(--dcmb)">
                  Description
                </h2>
                <p className="text-sm">{product.description}</p>
              </div>
            </div>
            <div className="mt-4 p-2 border border-white xl:grid hidden rounded-lg   bg-(--dcmgb)   text-(--dcmb)">
              <div className=" py-2   flex justify-start gap-2 text-xl items-center ">
                <span>
                  <LuInfo />
                </span>
                <span className="text-(--dcmb) font-bold text-lg ">Info</span>
              </div>
              <div className="grid relative justify-center items-center   grid-cols-3 gap-2">
                {/* discount */}
                <div className=" flex justify-start items-center">
                  <div>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        <RiDiscountPercentLine />
                      </span>
                      <span className="text-sm text-(--dcmb)">Discount</span>
                    </div>
                    <div className="ml-10 text-md text-white">
                      %{product.discountPercentage}
                    </div>
                  </div>
                </div>
                {/* abailable */}
                <div className=" flex justify-start items-center">
                  <div>
                    {" "}
                    <div className="flex justify-start items-center gap-2">
                      {" "}
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        <MdOutlineEventAvailable />
                      </span>
                      <span className="text-sm text-(--dcmb)">Availablity</span>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                      <p className="text-sm ml-10 text-white">
                        {product.availabilityStatus}
                      </p>{" "}
                      <p className="text-white">{product.stock}</p>
                    </div>
                  </div>
                </div>
                {/* updat */}
                <div className=" flex justify-start items-center">
                  <div>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        {" "}
                        <MdOutlineSystemUpdateAlt />
                      </span>
                      <span className="text-sm text-(--dcmb)">Update Date</span>
                    </div>
                    <div className="text-sm ml-10 text-white">
                      <div className="text-white">{createdDateTime}</div>
                      <div className="text-white">{createdLeftTime}</div>
                    </div>
                  </div>
                </div>
                {/* Order number */}
                <div className=" flex justify-start sm:justify-start items-center">
                  <div>
                    {" "}
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        {" "}
                        <MdOutlineBorderColor />
                      </span>
                      <span className="text-sm text-(--dcmb)">
                        mimimum Order
                      </span>{" "}
                    </div>
                    <div className="text-sm ml-10 text-white">
                      {product.minimumOrderQuantity}
                    </div>
                  </div>
                </div>
                {/* warranty */}
                <div className=" flex justify-start items-center">
                  <div>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        {" "}
                        <HiShieldCheck />
                      </span>
                      <span className="text-sm text-(--dcmb)">Warranty</span>
                    </div>
                    <div className="ml-10 text-sm text-white">
                      {product.warrantyInformation}
                    </div>
                  </div>
                </div>
                {/* return Policy */}
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl bg-gray-700 p-2 rounded-full">
                        <TbTruckReturn />
                      </span>
                      <span className="text-sm text-(--dcmb)">
                        Return Policy
                      </span>
                    </div>
                    <p className="ml-10 text-sm text-white">
                      {product.returnPolicy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product section end */}
        </div>
        {/* review section start */}
        <div>
          <div className=" m-3  border bg-(--dcmbg) border-white xl:hidden rounded-lg text-white">
            <div className="p-3 flex items-center gap-2 text-xl">
              <LuInfo />
              <span className="text-(--dcmb)">Info</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
              {/* Discount */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <RiDiscountPercentLine />
                    </span>
                    <span className="text-sm text-(--dcmb)">Discount</span>
                  </div>
                  <p className="ml-10 text-md text-white">
                    %{product.discountPercentage}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <MdOutlineEventAvailable />
                    </span>
                    <span className="text-sm text-(--dcmb)">Availability</span>
                  </div>
                  <div className="ml-10 flex items-center gap-4 text-sm">
                    <p className="text-white">{product.availabilityStatus}</p>
                    <p className="text-white">{product.stock}</p>
                  </div>
                </div>
              </div>

              {/* Update Date */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <MdOutlineSystemUpdateAlt />
                    </span>
                    <span className="text-sm text-(--dcmb)">Update Date</span>
                  </div>
                  <div className="ml-10 text-sm">
                    <p className="text-white">{createdDateTime}</p>
                    <p className="text-white">{createdLeftTime}</p>
                  </div>
                </div>
              </div>

              {/* Minimum Order */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <MdOutlineBorderColor />
                    </span>
                    <span className="text-sm text-(--dcmb)">Minimum Order</span>
                  </div>
                  <p className="ml-10 text-sm text-white">
                    {product.minimumOrderQuantity}
                  </p>
                </div>
              </div>

              {/* Warranty */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <HiShieldCheck />
                    </span>
                    <span className="text-sm text-(--dcmb)">Warranty</span>
                  </div>
                  <p className="ml-10 text-sm text-white">
                    {product.warrantyInformation}
                  </p>
                </div>
              </div>
              {/* return policy */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl bg-gray-700 p-2 rounded-full">
                      <TbTruckReturn />
                    </span>
                    <span className="text-md text-(--dcmb)">Return Policy</span>
                  </div>
                  <p className="ml-10 text-sm text-white">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h2 className=" text-lg px-3 sm:text-xl font-bold text-(--dcmb)">
            Rating & Reviews
          </h2>
          {/* Bottom Section */}
          <div className="flex  justify-start relative flex-col sm:flex-row items-center gap-2 px-3 mb-3 w-full">
            <div className="w-full sm:w-1/2  gap-2 flex justify-start items-center ">
              <div className="w-1/2 flex justify-center items-center flex-col">
                <div className="text-5xl sm:text-[55px]  lg:text-[80px] font-bold">
                  {product.rating}
                  <span className="text-[20px]">/5</span>
                </div>
                <p className=" text-[13px] lg:text-[18px]">(50 New Reviews)</p>
              </div>
              <div className="w-1/2 p-2 relative flex flex-col gap-5">
                <div className="flex justify-center gap-1 items-center ">
                  <div className="text-(--lcmbg) flex justify-start items-center">
                    <FaStar /> <span className="px-2">5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    value={product.reviews[0].rating}
                    max={5}
                    className="w-[90%]"
                  />
                </div>
                <div className="flex justify-center gap-1 items-center ">
                  <div className="text-(--lcmbg) flex justify-start items-center">
                    <FaStar /> <span className="px-2">4</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    value={product.reviews[1].rating}
                    max={5}
                    className="w-[90%]"
                  />
                </div>
                <div className="flex justify-center gap-1 items-center ">
                  <div className="text-(--lcmbg) flex justify-start items-center">
                    <FaStar /> <span className="px-2">3</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    value={product.reviews[2].rating}
                    max={5}
                    className="w-[90%]"
                  />
                </div>
                <div className="flex justify-center gap-1 items-center ">
                  <div className="text-(--lcmbg) flex justify-start items-center">
                    <FaStar /> <span className="px-2">2</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    value={4}
                    max={5}
                    className="w-[90%]"
                  />
                </div>
                <div className="flex justify-center gap-1 items-center ">
                  <div className="text-(--lcmbg) flex justify-start items-center">
                    <FaStar /> <span className="px-2">1</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    value={3}
                    max={5}
                    className="w-[90%]"
                  />
                </div>
              </div>
            </div>
            {/* review message */}
            <div className="w-full h-52 p-1 sm:w-1/2 flex flex-col gap-3 bg-(--dcmbg) rounded-lg shadow-xl border border-slate-800">
              {/* Slider */}
              <div className="w-full h-full relative overflow-hidden rounded-xl">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-md 
          ${
            active === index
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
          bg-(--dcsbg) `}
                  >
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="p-3 flex justify-between items-center border-b border-gray-500">
                        <div>
                          <h2 className="text-sm md:text-lg font-semibold text-white capitalize">
                            {review.reviewerName}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-400">
                            {review.reviewerEmail}
                          </p>
                        </div>

                        <div className="text-right text-slate-400">
                          <h2 className="text-xs sm:text-sm">
                            {format(new Date(review.date), "dd MMM yyyy")}
                          </h2>
                          <p className="text-xs">
                            {formatDistanceToNow(new Date(review.date), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="px-3 py-2 flex justify-between gap-3 items-center flex-1">
                        <div className="w-[75%]">
                          <h3 className="text-sm sm:text-base font-semibold text-sky-400 mb-1">
                            Comment
                          </h3>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                            {review.comment} Lorem ipsum dolor sit amet
                            consectetur, adipisicing elit. Nihil, modi!
                          </p>
                        </div>

                        <div className="w-[25%] flex flex-col items-center justify-center">
                          <h3 className="text-sm font-semibold text-sky-400">
                            Rating
                          </h3>
                          <div className="relative flex items-center justify-center ">
                            <FaStar
                              size={34}
                              className="text-yellow-500 drop-shadow"
                            />
                            <span className="absolute text-2xl font-bold text-gray-950">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="w-full flex justify-center items-center">
                <div className="w-[60%] h-0.5 rounded-full bg-(--dcsbg) flex overflow-hidden">
                  {product.reviews.map((_, index) => (
                    <div
                      key={index}
                      className={`h-full transition-all duration-300 ${
                        active === index ? "bg-(--dcbtn)" : "bg-transparent"
                      }`}
                      style={{ width: `${100 / product.reviews.length}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* review section end */}
      </div>
    </div>
  );
};

export default productDetail;
{
  /*   */
}
