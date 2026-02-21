import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loginInfo: [],
    isLogin: false,
    storeDetails:[],
    shoppingDetails:[],
    notificationDetails:[]

}

const logInSlice = createSlice({
    name:"profile",
    initialState,
    reducers: {
        setLogIn(state,action){
            state.isLogin = action.payload
            if(!state.loginInfo.length === 0){
                state.isLogin = true
            }
        },
        setStore(state,action){
            state.storeDetails = action.payload
        },
        setShoping(state,action){
            state.shoppingDetails = action.payload
        },
        setNotification(state,action){
            state.notificationDetails = action.payload
        }
    }
})

export const {setLogIn,setStore,setShoping,setNotification} = logInSlice.actions
export default logInSlice.reducer