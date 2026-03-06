"use client"

import { useSelector } from "react-redux"



const profile = () => {

  const {registrationInfo} = useSelector((state)=> state.Login)
  console.log(registrationInfo)

  return (
    <div>
      hello profile i am comming for you
    </div>
  )
}

export default profile
