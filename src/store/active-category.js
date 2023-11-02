import { createSlice } from '@reduxjs/toolkit';
import categoryData from '../data.json';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: categoryData,
    activeCategory: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      console.log(action.payload);
      state.activeCategory = action.payload;
    },
  },
});

export default categorySlice;
