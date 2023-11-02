import { configureStore } from '@reduxjs/toolkit';
import productSlice from './products';
import categorySlice from './active-category';

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    category: categorySlice.reducer,
  },
});

export default store;
