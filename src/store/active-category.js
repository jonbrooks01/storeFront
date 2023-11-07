import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import categoryData from '../data.json';

const url = import.meta.env.VITE_API_URL;

export const getCategory = createAsyncThunk('GET/categories', async () => {
  // console.log('Fetching categories from the API');
  const response = await fetch(`${url}/categories`);
  const json = await response.json();
  // console.log('Received category data:', json.results);
  return json.results;
});

export const getCategoryById = createAsyncThunk(
  'GET/categories/:id',
  async (categoryId) => {
    // console.log(`Fetching category with ID ${categoryId} from the API`);
    const response = await fetch(`${url}/categories/${categoryId}`);
    const json = await response.json();
    // console.log('Received category data by ID:', json.result);
    return json.result;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    activeCategory: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.activeCategory = action.payload;
      });
  },
});

export default categorySlice;
