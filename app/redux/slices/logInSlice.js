import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginInfo: {name:"nipol"},
    isLogin: true,
    isRegistration : true

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