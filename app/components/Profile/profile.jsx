"use client"

import { useSelector } from "react-redux"



const profile = () => {

  const {registrationInfo} = useSelector((state)=> state.Login)
  console.log(registrationInfo)

  return (
    <div className="borde h-screen flex justify-center items-center text-2xl">
      comming soon
    </div>
  )
}

export default profile
