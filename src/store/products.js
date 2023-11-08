import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import productData from '../data.json';

const url = import.meta.env.VITE_API_URL;

export const getProducts = createAsyncThunk('GET/products', async () => {
  // console.log('Fetching products from the API');
  const response = await fetch(`${url}/products`);
  const json = await response.json();
  // console.log('Received product data:', json.results);
  return json.results;
});

export const updateProduct = createAsyncThunk(
  'PUT/product/:id',
  async ({ product, amount }) => {
    const updatedProduct = { ...product, inStock: product.inStock + amount };

    const response = await fetch(`${url}/products/${product._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: { 'content-Type': 'application/json' },
    });

    const json = await response.json();
    return json;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productData: [],
    selectedProduct: null,
    // price: 'all',
  },
  reducers: {
    showProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateProductInState: (state, action) => {
      const { product, amount } = action.payload;
      const updatedProduct = state.productData.find(
        (p) => p._id === product._id
      );

      if (updatedProduct) {
        updatedProduct.inStock += amount;
      }
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productData = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.productData.findIndex(
          (p) => p._id === updatedProduct._id
        );
        state.productData[index] = updatedProduct;
      });
  },
});

export default productSlice;
