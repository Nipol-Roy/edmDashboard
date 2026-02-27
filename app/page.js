"use client"

import MainComponent from "./components/page"
import LogIn from "./components/LogIn"
import { useSelector } from "react-redux"



const page = () => {


  const {loginInfo,isLogin,isRegistration} = useSelector((state)=> state.Login)
  console.log(loginInfo)
  
  return (
    <div className="font-mono">
      <div>
        {
          loginInfo && isLogin === true && isRegistration === true ? <MainComponent/> : <LogIn/>
        }
      </div>
     
    </div>
  )
}

export default page
   