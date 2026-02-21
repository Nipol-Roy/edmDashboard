"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "@/app/redux/slices/productSlice";
import { CiFilter } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ProductDetail from "./productDetail";
import { FaArrowLeft } from "react-icons/fa6";

const products = () => {
  const [productId, setProductId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const dispatch = useDispatch();
  const { result, loading, errors } = useSelector((state) => state.product);

  useEffect(() => {
    if (!productId || filterdProducts.length === 0) return;
    const mainItem = filterdProducts.find(
      (item) => String(item.id) === String(productId),
    );
    setCurrentProduct(mainItem || null);
  }, [productId, dispatch]);

  const Category = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
  ];
  const priceRange = [
    "$0 - $25",
    "$25 -$50",
    "$50 - $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000+",
  ];
  const Brand = [
    "Essence",
    "Glamour Beauty",
    "Velvet Touch",
    "Chic Cosmetics",
    "Nail Couture",
    "Calvin Klein",
    "Chanel",
    "Dior",
    "Dolce & Gabbana",
    "Gucci",
    "Annibale Colombo",
    "Furniture Co",
    "Knoll",
    "Bath Trends",
    "Asus",
    "Huawei",
    "Lenovo",
    "Dell",
    "Fashion Trends",
    "Gigabyte",
    "Classic Wear",
    "Casual Comfort",
    "Urban Chic",
    "Nike",
    "Puma",
    "Off White",
    "Fashion Timepieces",
    "Longines",
    "Rolex",
    "Apple",
    "Amazon",
    "no-Brand",
  ];
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  const [filterShow, setFilterShow] = useState(false);
  const [addShow, setAddShow] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [],
    brand: [],
  });

  const handleChangeFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
    console.log(selectedFilters);
  };
  const isEmpty =
    selectedFilters.category.length === 0 &&
    selectedFilters.priceRange.length === 0 &&
    selectedFilters.brand.length === 0;

  const filterdProducts = isEmpty
    ? result
    : result.filter((product) => {
        const matchCategory =
          selectedFilters.category.length === 0 ||
          selectedFilters.category.includes(product.category);

        const matchBrand =
          selectedFilters.brand.length === 0 ||
          selectedFilters.brand.includes(product.brand);

        const matchPriceRange =
          selectedFilters.priceRange.length === 0 ||
          selectedFilters.priceRange.some((range) => {
            let min = 0;
            let max = Infinity;
            const cleanStringRange = range.replace(/\$/g, "").trim();
            if (cleanStringRange.includes("+")) {
              min = Number(cleanStringRange.replace("+", ""));
            } else {
              const [firstValue, lastValue] = cleanStringRange
                .split("-")
                .map((n) => Number(n.trim()));
              min = firstValue;
              max = lastValue;
            }
            return product.price >= min && product.price <= max;
          });

        return matchCategory && matchBrand && matchPriceRange;
      });

  function resetFilters() {
    setSelectedFilters({ category: [], priceRange: [], brand: [] });
    setOpenFilterBar(false);
  }
  let totalProductCount = filterdProducts.length;

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>Error{errors}</div>;

  // view Product

  return (
    <>
      <div className="">
         <div
          className={`${showDetails ? "flex" : "hidden"} h-screen fixed top-0 left-0 
            overflow-auto justify-center items-center w-full z-50
            bg-(--dcmbg)`}
        >
          {currentProduct ? (
            <div className="w-full h-full relative ">
              {/* Back Button */}

              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-3 left-3 z-50 cursor-pointer hover:scale-105 active:scale-95 transition duration-300 
                  p-3 w-10 h-10 rounded-full flex justify-center items-center text-xl bg-(--dcbtn)"
              >
                <FaArrowLeft />
              </button>

              <ProductDetail product={currentProduct} />
            </div>
          ) : (
            <div className="text-gray-400">
              Select a product to view details
            </div>
          )}
        </div>
        <div className="flex justify-between px-5  py-3 border-b border-gray-500   font-bold">
          <div
            onClick={() => setOpenFilterBar(true)}
            onMouseEnter={() => setFilterShow(true)}
            onMouseLeave={() => setFilterShow(false)}
            className="flex justify-center  items-center text-xl hover:bg-(--dcbtn) active:bg-(--dcbtn)
           text-white transition duration-300 gap-1  p-2 cursor-pointer  rounded-xl"
          >
            <CiFilter className="text-3xl" />
            <span className={`${filterShow ? "block " : "hidden"}`}>
              Filter
            </span>
            <span className="text-2xl">({totalProductCount})</span>
          </div>
          <div
            onMouseEnter={() => setAddShow(true)}
            onMouseLeave={() => setAddShow(false)}
            className="flex justify-center items-center cursor-pointer rounded-xl transition duration-300 gap-1 p-2 hover:bg-(--dcbtn) active:bg-(--dcbtn)
           text-white"
          >
            <span className={`${addShow ? "block text-lg" : "hidden"}`}>
              Add
            </span>
            <IoAddSharp className="text-3xl" />
          </div>
        </div>

        <div
          className={`fixed top-0 left-0  ${openFilterBar ? "flex" : "hidden"}
       w-full h-full bg-[#0a0a0aab]  text-white  justify-center 
       items-center snap-always z-50 `}
        >
          <div className="z-100 rounded-lg overflow-hidden min-w-[80%] md:min-w-[25%] h-[80%] bg-(--dcmbg)  text-xl">
            <div className=" h-full  overflow-scroll sbar">
              <div className="w-full py-5 px-3  sticky top-0 mb-3 flex justify-between bg-(--dcsbg) items-center">
                <div className="text-lg">Filter </div>
                <div
                  onClick={() => setOpenFilterBar(false)}
                  className="text-xl  p-2 rounded-full hover:bg-(--dcbtn)
                  active:scale-95 transition duration-300"
                >
                  {" "}
                  <IoMdClose />
                </div>
              </div>
              <form
                action=""
                className="p-2"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="p-2  w-full bg-(--dcsbg) text-white rounded-xl ">
                  <div>
                    <div
                      onClick={() => setOpenCategory(!openCategory)}
                      className=" flex cursor-pointer   justify-between items-center"
                    >
                      <div className="py-2">Category</div>
                      <div className="text-xl ">
                        {openCategory ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowForward />
                        )}
                      </div>
                    </div>
                    <div className="">
                      {Category.map((categorys, idx) => (
                        <div
                          key={idx}
                          className={`overflow-auto px-4 ${
                            openCategory ? "block" : "hidden"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={categorys}
                            checked={selectedFilters.category.includes(
                              categorys,
                            )}
                            onChange={() =>
                              handleChangeFilter("category", categorys)
                            }
                          />
                          &nbsp;{categorys}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2 my-2  w-full bg-(--dcsbg) text-white rounded-xl ">
                  <div>
                    <div
                      onClick={() => setOpenPriceRange(!openPriceRange)}
                      className=" flex cursor-pointer   justify-between items-center"
                    >
                      <div className="py-2">Price-Range</div>
                      <div className="text-xl ">
                        {openPriceRange ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowForward />
                        )}
                      </div>
                    </div>
                    <div className="">
                      {priceRange.map((priceRange, idx) => (
                        <div
                          key={idx}
                          className={`overflow-auto px-4 ${
                            openPriceRange ? "block" : "hidden"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className=""
                            value={priceRange}
                            checked={selectedFilters.priceRange.includes(
                              priceRange,
                            )}
                            onChange={() =>
                              handleChangeFilter("priceRange", priceRange)
                            }
                          />
                          &nbsp;{priceRange}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2 my-2  w-full bg-(--dcsbg) text-white rounded-xl ">
                  <div>
                    <div
                      onClick={() => setOpenBrand(!openBrand)}
                      className=" flex cursor-pointer   justify-between items-center"
                    >
                      <div className="py-2">Brand</div>
                      <div className="text-xl ">
                        {openBrand ? <IoIosArrowDown /> : <IoIosArrowForward />}
                      </div>
                    </div>
                    <div className="">
                      {Brand.map((Brand, idx) => (
                        <div
                          key={idx}
                          className={`overflow-auto px-4 ${
                            openBrand ? "block" : "hidden"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedFilters.brand.includes(Brand)}
                            onChange={() => handleChangeFilter("brand", Brand)}
                            className=""
                            value={Brand}
                          />
                          &nbsp;{Brand}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <button
                    onClick={() => setOpenFilterBar(false)}
                    className=" hover:scale-105  w-[45%] transition duration-300 py-3 mt-3 active:scale-95 cursor-pointer rounded-xl bg-(--dcbtn)"
                  >
                    Submit
                  </button>
                  <button
                    onClick={resetFilters}
                    className=" hover:scale-105 w-[45%] transition duration-300 py-3 mt-3 active:scale-95 cursor-pointer rounded-xl bg-(--dcbtn)"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
        <div className="flex flex-wrap gap-4 p-4  justify-center items-center">
          {filterdProducts.map((item, idx) => (
            <div key={idx}>
              <div className=" pt-3 pr-3 pl-3 flex justify-center items-center bg-gray-200 rounded-xl text-black relative  overflow-hidden">
                <div
                  className={` ${
                    Math.floor(item.discountPercentage) <= 0 ? "hidden" : "flex"
                  } absolute z-5 text-white
              left-0 top-0 w-12 rounded-br-3xl bg-(--dcbtn)  flex-col justify-center items-center`}
                >
                  <div className="text-2xl  font-extrabold">
                    {Math.floor(item.discountPercentage)}
                    <span className="text-md">%</span>
                  </div>
                  <span className="text-xl -mt-2 font-extrabold"> off</span>
                </div>
                <div className=" rounded-lg overflow-hidden w-45 relative">
                  <div className="w-45 h-45 rounded-md overflow-hidden bg-gray-50 ">
                    <img
                      className="object-cover hover:scale-105  transition duration-300 object-center"
                      src={item.images[0]}
                      alt={item.brand}
                    />
                  </div>
                  <div className=" ">
                    <div className="text-md  font-thin truncate overflow-hidden">
                      {item.title}
                    </div>

                    <div className=" inline text-sm px-2 py-1 rounded-3xl bg-(--dcbtn) text-gray-100 font-bold">
                      {item.category}
                    </div>

                    <div className="w-full flex my-2 justify-between items-center">
                      <div>${item.price}</div>
                      <div>stock {item.stock}</div>
                    </div>
                  </div>

                  <div className="w-full mb-3 flex justify-center rounded-xl items-center">
                    <button
                      onClick={() => {
                        setProductId(item.id);
                        setShowDetails(true);
                      }}
                      className="w-[90%] mb-1 cursor-pointer py-2  rounded-md 
                   bg-linear-to-r shadow-xs hover:skew-2 hover:scale-105 hover:shadow-md
                    transition duration-300 shadow-black from-(--dcbtn) to-[#008e9e]
                     text-gray-100 font-bold"
                    >
                      view Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default products;
