import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (_, thunkAPI) => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=100");

      if (!data.ok) {
        return thunkAPI.rejectWithValue(`Server Error: ${data.status}`);
      }

      const responseData = await data.json();
      return responseData.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const ProductSlice = createSlice({
  name: "products",
  initialState: {
    result: [],
    loading: false,

    erros: null,
  },
  reducers: {
    addToProduct(state, action) {},
    removeToProduct(state, action) {},
  },
  extraReducers: (builder) => {
    builder
    // All Products
      .addCase(fetchProduct.pending, (state, action) => {
        state.loading = true;
        state.erros = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.result = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.erros = action.payload;
      })

  },
});

export const { setProducts, setLoading, setError } = ProductSlice.actions;
export default ProductSlice.reducer;
