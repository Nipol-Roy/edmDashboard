import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginInfo: null,
    registrationInfo: null,
    isLogin: false,
    isRegistration : false

}

const logInSlice = createSlice({
    name:"profile",
    initialState,
    reducers: {
        setIsLogIn(state,action){
            state.loginInfo = action.payload
           state.isLogin = true
        },
        setIsLogOut(state){
            state.loginInfo = null
            state.isLogin = false
        },
        storeRegistration(state,action){
            state.registrationInfo  = action.payload
            state.isRegistration = true
        }
    }
})

export const {setIsLogIn,setIsLogOut,storeRegistration} = logInSlice.actions
export default logInSlice.reducer