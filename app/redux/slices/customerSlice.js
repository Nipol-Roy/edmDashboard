import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCustomer:[],
    loading: true,
    error: null
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers:{
        setCustomer(state,action){
            state.allCustomer = action.payload
            state.loading = false
        },
        setLoading(state,action){
            state.loading = true,
            state.error = null
        }
    }
})
export const {setCustomer} = customerSlice.actions
export default customerSlice.reducer