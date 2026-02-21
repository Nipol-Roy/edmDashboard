import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalOrders : [],
    loading: false,
    errors: null,

}

const OrderSlice = createSlice({
    name: "OrderSlice",
    initialState,
    reducers:{
        addOrders(state,action){
            state.totalOrders = action.payload
        }
    }
})
export const {addOrders} = OrderSlice.actions
export default OrderSlice.reducer