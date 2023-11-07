import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products';
import categorySlice from './active-category';
import addCartSlice from './cart';

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    category: categorySlice.reducer,
    addCart: addCartSlice.reducer,
  },
});

export default store;
