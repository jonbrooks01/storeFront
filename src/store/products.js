import { createSlice } from '@reduxjs/toolkit';
import productData from '../data.json';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productData: productData.products,
    selectedProduct: 'all',
    // price: 'all',
  },
  reducers: {
    showProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCategory: (state, action) => {
      state.setCategory = action.payload;
    },
  },
});

export default productSlice;
