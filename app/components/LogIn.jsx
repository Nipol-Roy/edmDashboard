"use client";

import Image from "next/image";
import bgImage from "../../public/data/images/loginBg.jpg";
import Logo from "../../public/data/images/logo.png";
import ImageIcon from "../../public/data/images/Image Logo.png";
import { useEffect, useState } from "react";

import { MdShoppingCart } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FaLeaf } from "react-icons/fa";

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
    // console.log(JSON.parse(localStorage.getItem("registerUser")))
    if (user) {
      dispatch(
        storeRegistration(JSON.parse(localStorage.getItem("registerUser"))),
      );
    }
    if (login) {
      dispatch(setIsLogIn(JSON.parse(localStorage.getItem("logedIn"))));
    }
  }, [dispatch]);

  // Registration Part
  const handleRegSubmit = (e) => {
    e.preventDefault();

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
  };
  // registration part end
  // logIn part

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    setLogInError("");
    console.log(logInEmail, logInPass);

    if (logInPass !== registrationInfo?.ConfPassword) {
      setLogInError("Incorrect Password Please Try Again");
      return;
    }
    if (logInEmail !== registrationInfo?.Email) {
      setLogInError("Incorrect Email Please Try Again");
      return;
    }

    const logedInfo = {
      email: logInEmail,
      pass: logInPass,
    };


    localStorage.setItem("logedIn", JSON.stringify(logedInfo));

    dispatch(setIsLogIn(logedInfo));
  };

  console.log(isLogin, isRegistration);

  return (
    <div
      className={`w-full login h-dvh max-w-600 overflow-hidden box-border  relative `}
    >
      {/* logIn Section */}
      <div
        className={`w-full ${registration === true ? "hidden" : "flex"} h-full flex justify-start flex-col md:flex-row relative`}
      >
        <div className="w-full h-full absolute">
          <Image
            src={bgImage}
            alt="background"
            className="object-cover w-full h-full object-center"
          />
        </div>
        <div className="w-full md:w-1/2 relative h-full md:border-r md:border-white md:border-dashed  ">
          <div
            className=" absolute flex flex-col justify-center md:justify-center items-center top-0 md:top-1/2 left-1/2 -translate-x-1/2 
             md:-translate-y-2/3 h-1/5 md:h-1/3 text-white w-full gap-2"
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
            <div className="w-full flex justify-center text-center text-md items-center">
              <p>Manage Orders, Customers & Analytics Efficently</p>
            </div>
          </div>
        </div>

        <div className="w-full absolute top-0 left-0 md:relative  md:w-1/2 h-full flex justify-center items-center">
          <div className=" flex justify-center items-center bg-(--dcbtn) h-[60%] w-90 sm:w-110 rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.28)]">
            <div className="w-[80%] h-[90%] relative ">
              <div className="text-(--dctxt)  h-20 flex flex-col justify-center  items-center gap-2">
                <div className="text-2xl font-bold">Admin Login</div>
                <div>Sign in to Your account</div>
              </div>
              <div>
                <form
                  action=""
                  onSubmit={(e) => handleLogInSubmit(e)}
                  className="gap-4 flex flex-col "
                >
                  <div>
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
                        placeholder="Enter your Valid Email"
                        className="outline-none  text-md w-full p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="" className="text-lg text-white ">
                      Password
                    </label>
                    <div className="border  border-gray-400 overflow-hidden bg-gray-100  shadow-[0_4px_10px_rgba(0,0,0,0.28)] flex  justify-center items-center rounded-md">
                      <input
                        required
                        value={logInPass}
                        onChange={(e) => setLogInPass(e.target.value)}
                        type={`${hidePassword ? "password" : "text"}`}
                        placeholder="Enter your Password"
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
                    className="hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] transition hover:scale-102 py-2 text-white bg-[#005B75] rounded-md text-md w-full"
                  >
                    LogIn
                  </button>
                </form>
              </div>

              <div className=" ">
                <div className=" h-10 text-white flex justify-center items-center">
                  <div className="w-[45%] h-0.2 border"></div>
                  <div className="text-xl font-bold p-2">OR</div>
                  <div className="w-[45%] h-0.2 border"></div>
                </div>
              </div>
              <div className="w-full  ">
                <button className="flex justify-center items-center gap-2 text-md  w-full py-2 hover:scale-102 transition rounded-md  hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] text-white bg-[#009DA3] ">
                  <FcGoogle className="text-2xl" /> Sign in with Google
                </button>
              </div>

              <div className="p-2 w-full flex justify-end items-center absolute bottom-0 right-0 text-white">
                I don't have account
                <span
                  onClick={() => setRegistration(!registration)}
                  className="underline cursor-pointer p-2 text-blue-100 hover:text-blue-700 transition"
                >
                  SignUp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* logIn Section End */}

      {/* registration Section start */}

      <div className={`${registration === true ? "flex" : "hidden"}  `}>
        <div className="w-full h-full absolute top-0 left-0 login">
          <Image
            src={bgImage}
            alt="background page"
            className="w-full  h-full object-cover object-center"
          />
        </div>
        <div className="w-full  h-screen z-5 flex flex-col md:flex-row justify-start md:justify-center items-center">
          <div className="w-full md:w-1/2 md:border-r md:border-dashed md:border-white h-[18%] flex justify-center items-center md:h-full">
            <div className=" flex flex-col justify-center items-center gap-1">
              <div className="w-15 h-15">
                <Image
                  src={Logo}
                  className="w-full h-full object-cover object-center bg-gray-900 rounded-lg"
                  alt="Logo"
                />
              </div>
              <div className="text-2xl px-4 sm:text-3xl   text-center text-gray-200 font-bold">
                The Simplest Way to Manage your Workforce
              </div>
              <p className="text-center text-gray-200 text-sm sm:text-[15px]  ">
                Enter your credentials to access your account
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2  h-full flex justify-center items-center ">
            <div className="w-[96%] h-[96%] relative   bg-(--lcbtn) rounded-md flex justify-center items-center">
              <div className="sm:w-100 relative h-full sm:h-[93%] w-full  bg-(--dcbtn) rounded-md overflow-hidden   xl:w-125 xl:h-200  ">
                <div className=" text-2xl flex flex-col  py-4 justify-start  items-center">
                  <div className=" text-2xl font-bold text-white">
                    Create Your Account
                  </div>
                </div>
                <form action="" onSubmit={(e) => handleRegSubmit(e)}>
                  {/* Full Name */}
                  <div className="flex flex-col p-2">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={30}
                      className="outline-none p-1 py-2 rounded-md  bg-white  w-full"
                      placeholder="Enter your Full Name"
                      name="FullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  {/* Email */}
                  <div className="grid grid-cols-2 md:grid-cols-1">
                    <div className="flex flex-col  p-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        className="outline-none p-1 py-2 rounded-md bg-white  w-full"
                        placeholder="Enter your valid Email"
                        name="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col p-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        value={phone}
                        required
                        type="number"
                        className="outline-none p-1 py-2 rounded-md bg-white  w-full"
                        placeholder="Enter your Full Name"
                        name="PhoneNumber"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p
                        className={`${error ? "block" : "hidden"} text-red-600 py-1 font-medium`}
                      >
                        {error}
                      </p>
                    </div>
                  </div>
                  {/* Password */}
                  <div className="flex flex-col p-2">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Password
                    </label>
                    <div
                      className={`flex rounded-md  justify-between items-center bg-white ${error ? "border text-red-600 border-red-600" : ""}`}
                    >
                      <input
                        required
                        value={password}
                        type={`${regHidePassword ? "text" : "password"}`}
                        className="outline-none p-1 py-2 rounded-md   w-full"
                        placeholder="Enter your Full Name"
                        name="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        onClick={() => setRegHidePassword(!regHidePassword)}
                        className="text-2xl text-(--dcbtn) cursor-pointer pr-2"
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
                  <div className="flex  flex-col p-2">
                    <label htmlFor="" className="text-lg font-bold text-white">
                      Confirm Password
                    </label>
                    <div
                      className={`bg-white  rounded-md flex justify-between items-center ${error ? " border border-red-600 text-red-600" : ""}`}
                    >
                      <input
                        required
                        value={confPassword}
                        type={`${confHidePassword ? "text" : "password"}`}
                        className="outline-none p-2   "
                        placeholder="Enter your Full Name"
                        name="ConfirmPassword"
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                      <div
                        onClick={() => setConfHidePassword(!confHidePassword)}
                        className="text-2xl text-(--dcbtn)  cursor-pointer pr-2"
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
                    <div className="flex flex-col col-span-2 p-2">
                      <label
                        htmlFor=""
                        className="text-lg font-bold text-white"
                      >
                        Shop Name
                      </label>
                      <input
                        required
                        value={shopName}
                        type="text"
                        className="outline-none p-1 py-2 rounded-md bg-white  w-full"
                        placeholder="Enter your Full Name"
                        name="ShopName"
                        onChange={(e) => setShopName(e.target.value)}
                      />
                    </div>
                    {/* image */}
                    <div className="h-full w-full text-sm  col-span-1 flex-col   flex justify-center items-center  py-1">
                      <label
                        htmlFor="profileImage"
                        className="cursor-pointer p-2  rounded-lg bg-(--dcmbg) text-white relative"
                      >
                        <Image
                          src={ImageIcon}
                          className="h-20 w-25 object-cover object-center "
                        />
                      </label>
                      <div
                        className={`text-white py-2 ${error ? "text-red-600" : ""}`}
                      >
                        Profile Image
                      </div>
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

                  <div className=" w-full p-2 flex flex-col  ">
                    <button
                      className="text-white  rounded-md cursor-pointer hover:scale-101 transition 
                   w-full py-2 hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] bg-[#005B75]   "
                    >
                      Submit
                    </button>

                    <div className=" h-10 text-white flex justify-center items-center">
                      <div className="w-[45%] h-0.2 border"></div>
                      <div className="text-xl font-bold p-2">OR</div>
                      <div className="w-[45%] h-0.2 border"></div>
                    </div>
                    <button className="flex justify-center cursor-pointer items-center  text-md  w-full py-2 hover:scale-102 transition rounded-md  hover:shadow-[0_4px_10px_rgba(0,0,0,0.28)] text-white bg-[#009DA3] ">
                      <FcGoogle className="text-2xl" /> Sign in with Google
                    </button>
                  </div>
                </form>

                <div className="w-full absolute bottom-0 text-right px-3 text-white ">
                  i have already a Account
                  <span
                    onClick={() => setRegistration(!registration)}
                    className="text-lg underline text-blue-200 hover:text-blue-700"
                  >
                    LogIn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* registration section end */}
    </div>
  );
};

export default LogIn;
