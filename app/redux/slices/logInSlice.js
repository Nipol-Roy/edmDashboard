import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginInfo: null,
    isLogin: false,
    isRegistration : false

}

const logInSlice = createSlice({
    name:"profile",
    initialState,
    reducers: {
        setLogIn(state,action){
            state.loginInfo = action.payload
           state.isLogin = true
        },
        setLogOut(state){
            state.loginInfo = null
            state.isLogin = false
        }
    }
})

export const {setLogIn,setLogOut} = logInSlice.actions
export default logInSlice.reducer