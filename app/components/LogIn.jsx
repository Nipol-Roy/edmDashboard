"use client";

import Image from "next/image";
// import bgImage from "../../public/data/images/loginBg.jpg";
import Logo from "../../public/data/images/logo.png";
import ImageIcon from "../../public/data/images/Image Logo.png";
import bgImage from "../../public/data/images/signing-Background.png";
import { useEffect, useState } from "react";

import { MdShoppingCart } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaLeaf } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { HiMiniIdentification } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { storeRegistration, setIsLogIn } from "../redux/slices/logInSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const [registration, setRegistration] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [confHidePassword, setConfHidePassword] = useState(false);
  const [regHidePassword, setRegHidePassword] = useState(false);
  // reg
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");

  // login
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPass, setLogInPass] = useState("");

  const [logInError, setLogInError] = useState("");

  const [error, setError] = useState("");
  const { registrationInfo, loginInfo, isLogin, isRegistration } = useSelector(
    (state) => state.Login,
  );

  useEffect(() => {
    const user = localStorage.getItem("registerUser");
    const login = localStorage.getItem("logedIn");

    if (user) {
      dispatch(storeRegistration(JSON.parse(user)));
    }
    if (login) {
      dispatch(setIsLogIn(JSON.parse(login)));
    }
  }, [dispatch]);

  // Registration Part
  const handleRegSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password != confPassword) {
      setError("does not Match your password");
      return;
    }

    if (password.length < 8) {
      setError("password must be minimum 8 charracter");
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/.test(confPassword)) {
      setError("Password must contains any special character");
      return;
    }
    if (registrationInfo) {
      alert(`you are already hava a account ${registrationInfo?.Email}`);
    }

    const RegistrationResult = {
      FullName: fullName,
      Email: email,
      Password: password,
      ConfPassword: confPassword,
      ShopName: shopName,
      Image: image,
      Role: role,
    };
    localStorage.setItem("registerUser", JSON.stringify(RegistrationResult));
    // localStorage.setItem("isRegistred", JSON.stringify(true));

    dispatch(storeRegistration(RegistrationResult));

    setFullName("");
    setEmail("");
    setPhone();
    setPassword("");
    setConfPassword("");
    setShopName("");
    setPhone("");
    setImage("");
    setRegistration(false);
    setRole("");
  };
  // registration part end
  // logIn part

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    setLogInError("");

    if (!registrationInfo) {
      setLogInError("No account found. Please register first.");
      return;
    }

    if (logInPass !== registrationInfo?.ConfPassword) {
      setLogInError("Incorrect Password Please Try Again");
      return;
    }

    if (logInEmail !== registrationInfo.Email) {
      setLogInError("Incorrect Email");
      return;
    }

    const logedInfo = {
      email: logInEmail,
      pass: logInPass,
    };

    localStorage.setItem("logedIn", JSON.stringify(logedInfo));

    dispatch(setIsLogIn(logedInfo));
  };

  return (
    <div className="w-full login flex justify-center items-center   relative ">
      <div className="w-full h-screen overflow-auto fixed top-0 left-0">
        <Image
          src={bgImage}
          alt="background"
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="z-50 text-white  p-2 w-full h-full flex justify-center items-center">
        <div className="h-full w-full md:w-[80%]    overflow-auto z-50 flex justify-center  py-5  items-center flex-col md:flex-row">
          <div className="w-full md:w-[45%]     relative    ">
            <div
              className="  flex flex-col justify-center  h-40 md:h-screen items-center 
                text-white w-full gap-2"
            >
              <div className="flex  justify-center  items-center gap-2">
                <div className="text-5xl   h-15 rounded-2xl overflow-hidden w-15">
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
              <div className=" flex justify-center items-center  text-center  text-md ">
                <p>Manage Orders, Customers & Analytics Efficently</p>
              </div>
            </div>
          </div>

          <div className=" w-full md:w-[55%]   flex justify-center items-center   md:h-screen ">
            <div
              className={`${registration ? "hidden" : "flex"} w-full p-3     relative  flex justify-center items-center`}
            >
              <div className=" flex justify-center items-center h-full bg-[#588bf81e] border border-gray-700 p-3  w-90 sm:w-110 rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.28)]">
                <div className=" h-full relative w-full p-3 ">
                  <div className="w-full h-20  flex justify-center items-center">
                    <div className="text-4xl border p-4 rounded-full text-blue-900 bg-linear-to-r from-blue-600 to-cyan-500">
                      <FaLock />
                    </div>
                  </div>
                  <div className="text-(--dctxt)  h-20 flex flex-col justify-center  items-center gap-2">
                    <div className="text-2xl font-bold">Admin Login</div>
                    <div>Sign in to Your account</div>
                  </div>

                  <form
                    action=""
                    onSubmit={(e) => handleLogInSubmit(e)}
                    className="gap-2 flex flex-col  "
                  >
                    <label htmlFor="" className="text-lg text-white">
                      Email
                    </label>
                    <div className="border  border-gray-400 overflow-hidden bg-gray-100  shadow-[0_4px_10px_rgba(0,0,0,0.28)] flex  justify-center items-center rounded-md">
                      <div className="text-2xl text-(--dcbtn) p-2">
                        <MdOutlineEmail />
                      </div>
                      <input
                        type="email"
                        required
                        value={logInEmail}
                        onChange={(e) => setLogInEmail(e.target.value)}
                        placeholder="example@hello.com"
                        className="outline-none  text-md w-full p-2"
                      />
                    </div>
                    {/* <p
                      className={`${logInError ? "block" : "hidden"} text-red-600 py-1 font-medium`}
                    >
                      {logInError}
                    </p> */}

                    <div>
                      <label htmlFor="" className="text-lg text-white ">
                        Password
                      </label>
                      <div className="border  border-gray-400 overflow-hidden bg-gray-100  shadow-[0_4px_10px_rgba(0,0,0,0.28)] flex  justify-center items-center rounded-md">
                        <div className="text-2xl text-(--dcbtn) p-2">
                          <TbLockPassword />
                        </div>
                        <input
                          required
                          value={logInPass}
                          onChange={(e) => setLogInPass(e.target.value)}
                          type={`${hidePassword ? "password" : "text"}`}
                          placeholder="Password"
                          className="outline-none text-md w-full  p-2"
                        />
                        <div
                          onClick={() => setHidePassword(!hidePassword)}
                          className="text-2xl p-2 text-(--dcbtn) cursor-pointer"
                        >
                          {hidePassword ? <BiSolidHide /> : <BiSolidShow />}
                        </div>
                      </div>
                      <p
                        className={`${logInError ? "block" : "hidden"} text-red-600 py-1 font-medium`}
                      >
                        {logInError}
                      </p>
                    </div>
                    <div className=" flex justify-between items-center">
                      <div className="text-white">
                        <input type="checkbox" className="outline-none " />{" "}
                        Remember Me
                      </div>
                      <div className="text-blue-100 hover:text-blue-700 transition underline">
                        Forgot Password?{" "}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className=" bg-linear-to-r from-blue-600 to-cyan-500 hover:to-blue-600 hover:from-cyan-500 transition hover:scale-102 py-2 text-white  rounded-md text-md w-full"
                    >
                      LogIn
                    </button>
                  </form>

                  <div className=" h-10 text-white flex justify-center items-center">
                    <div className="w-[45%] h-0.2 border"></div>
                    <div className="text-xl font-bold p-2">OR</div>
                    <div className="w-[45%] h-0.2 border"></div>
                  </div>

                  <div className="w-full  ">
                    <button className="flex justify-center items-center gap-2 text-md  w-full py-2 hover:scale-102 transition rounded-md  hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)]  bg-white text-gray-900 ">
                      <FcGoogle className="text-2xl" /> Sign in with Google
                    </button>
                  </div>

                  <div className="p-2 w-full flex justify-end items-center text-white">
                    I don't have account
                    <span
                      onClick={() => setRegistration(!registration)}
                      className="underline cursor-pointer px-2 text-blue-100 hover:text-blue-700 transition"
                    >
                      SignUp
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${registration ? "flex" : "hidden"} w-full   relative  p-3  flex justify-center items-center overflow-auto`}
            >
              <div className="relative p-3   bg-[#588bf81e] border border-gray-600 rounded-md   h-full   w-90  sm:w-110   ">
                <div className="w-full h-20  flex justify-center items-center">
                  <div className="text-5xl border p-2 rounded-full text-blue-900 bg-linear-to-r from-blue-600 to-cyan-50">
                    <IoPerson />
                  </div>
                </div>
                <div className=" text-xl md:text-2xl p-2 text-white flex flex-col   justify-center  items-center">
                  Create Your Account
                </div>
                <form
                  action=""
                  onSubmit={(e) => handleRegSubmit(e)}
                  className="flex flex-col gap-3"
                >
                  {/* Full Name */}
                  <div className="flex flex-col px-2 ">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Full Name
                    </label>

                    <div className="outline-none  rounded-md bg-white p-2  gap-3 flex justify-center items-center  w-full">
                      <div className="text-xl text-(--dcbtn) ">
                        <HiMiniIdentification />
                      </div>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={30}
                        className="outline-none w-full text-md"
                        placeholder="Enter your Full Name"
                        name="FullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="grid grid-cols-2 md:grid-cols-1">
                    <div className="flex flex-col  px-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Email
                      </label>
                      <div className="outline-none  rounded-md bg-white  p-2  gap-3 flex justify-center items-center  w-full">
                        <div className="text-xl text-(--dcbtn) ">
                          <MdOutlineEmail />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          className="outline-none  text-md  rounded-md bg-white  w-full"
                          placeholder="Enter your valid Email"
                          name="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col px-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Phone Number
                      </label>
                      <div className="outline-none  rounded-md bg-white  p-2  gap-3 flex justify-center items-center  w-full">
                        <div className="text-xl text-(--dcbtn) ">
                          <FaPhoneAlt />
                        </div>
                        <input
                          value={phone}
                          required
                          type="number"
                          className="outline-none text-md  rounded-md bg-white  w-full"
                          placeholder="Enter your Full Name"
                          name="PhoneNumber"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Password */}
                  <div className="flex flex-col px-2">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Password
                    </label>
                    <div
                      className={`flex rounded-md  justify-between items-center bg-white ${error ? "border text-red-600 border-red-600" : ""}`}
                    >
                      <div className="outline-none  rounded-md bg-white  p-2  gap-3 flex justify-center items-center w-full">
                        <div className="text-xl text-(--dcbtn) ">
                          <TbLockPassword />
                        </div>
                        <input
                          required
                          value={password}
                          type={`${regHidePassword ? "text" : "password"}`}
                          className="outline-none text-md  rounded-md   w-full"
                          placeholder="Enter your Full Name"
                          name="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div
                        onClick={() => setRegHidePassword(!regHidePassword)}
                        className="text-xl text-(--dcbtn) cursor-pointer pr-2"
                      >
                        {regHidePassword ? <BiSolidHide /> : <BiSolidShow />}
                      </div>
                    </div>
                    <p
                      className={`${error ? "block" : "hidden"} text-red-600 py-1 font-medium`}
                    >
                      {error}
                    </p>
                  </div>
                  {/* Confirm Password */}
                  <div className="flex  flex-col px-2">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Confirm Password
                    </label>
                    <div
                      className={`bg-white  rounded-md flex justify-between items-center ${error ? " border border-red-600 text-red-600" : ""}`}
                    >
                      <div className="outline-none   rounded-md bg-white  p-2  gap-3 flex justify-center items-center  w-full">
                        <div className="text-xl text-(--dcbtn) ">
                          <TbLockPassword />
                        </div>
                        <input
                          required
                          value={confPassword}
                          type={`${confHidePassword ? "text" : "password"}`}
                          className="outline-none text-md  rounded-md   w-full"
                          placeholder="Enter your Full Name"
                          name="ConfirmPassword"
                          onChange={(e) => setConfPassword(e.target.value)}
                        />
                      </div>
                      <div
                        onClick={() => setConfHidePassword(!confHidePassword)}
                        className="text-xl text-(--dcbtn)  cursor-pointer pr-2"
                      >
                        {confHidePassword ? <BiSolidHide /> : <BiSolidShow />}
                      </div>
                    </div>
                    <p
                      className={`${error ? "block" : "hidden"} text-red-600 py-1 font-medium`}
                    >
                      {error}
                    </p>
                  </div>
                  {/* Shop Name */}
                  <div className="grid  relative grid-cols-3 ">
                    <div className="flex flex-col col-span-3 px-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Shop Name
                      </label>
                      <div className="outline-none  rounded-md bg-white  p-2  gap-3 flex justify-center items-center  w-full">
                        <div className="text-xl text-(--dcbtn) ">
                          <FaShop />
                        </div>
                        <input
                          required
                          value={shopName}
                          type="text"
                          className="outline-none  text-md rounded-md bg-white  w-full"
                          placeholder="Enter your Full Name"
                          name="ShopName"
                          onChange={(e) => setShopName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col col-span-2  px-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Role
                      </label>
                      <div className="outline-none  rounded-md bg-white  p-2  gap-3 flex justify-center items-center w-full">
                        <div className="text-2xl text-(--dcbtn) ">
                          <GiAchievement />
                        </div>
                        <input
                          required
                          value={role}
                          type="text"
                          className="outline-none text-md  rounded-md bg-white  w-full"
                          placeholder="Enter your Full Name"
                          name="ShopName"
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* image */}
                    <div className="h-full w-full text-sm py-3 col-span-1 flex-col   flex justify-center items-center  ">
                      <label
                        htmlFor="profileImage"
                        className={`${image === "" ? "bg-white" : "bg-[#008A9F]"} cursor-pointer p-2  rounded-lg  text-white relative`}
                      >
                        <Image
                          src={ImageIcon}
                          alt="avatar"
                          className="h-12 w-17 object-cover object-center "
                        />
                      </label>
                      <div className="text-white py-1 ">Profile Image</div>
                      <input
                        type="file"
                        accept="image/*"
                        id="profileImage"
                        hidden
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        name="ProfileImage"
                      />
                    </div>
                  </div>

                  <div className=" w-full px-2 flex flex-col  ">
                    <button
                      className="text-white  rounded-md cursor-pointer hover:scale-101 transition
                   w-full py-1 md:py-2 hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] bg-linear-to-r from-blue-600 to-cyan-500 hover:to-blue-600 hover:from-cyan-500   "
                    >
                      Submit
                    </button>

                    <div className=" h-10 text-white flex justify-center items-center">
                      <div className="w-[45%] h-0.2 border"></div>
                      <div className="text-xl font-bold p-2">OR</div>
                      <div className="w-[45%] h-0.2 border"></div>
                    </div>
                    <button className="flex justify-center cursor-pointer items-center  text-md  w-full py-1 md:py-2 hover:scale-102 transition rounded-md  hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] bg-white text-gray-900 ">
                      <FcGoogle className="text-2xl" /> Sign in with Google
                    </button>
                  </div>
                </form>

                <div className="w-full p-3 text-right  text-white ">
                  i have already a Account
                  <span
                    onClick={() => setRegistration(!registration)}
                    className="text-lg underline cursor-pointer  px-2 text-blue-200 hover:text-blue-700"
                  >
                    LogIn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
