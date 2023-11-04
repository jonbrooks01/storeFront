import { createSlice } from '@reduxjs/toolkit';

const addCartSlice = createSlice({
  name: 'add-to-cart',
  initialState: {
    addedProducts: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.addedProducts.push(action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const productIndex = state.addedProducts.findIndex(
        (product) => product.name === action.payload.name
      );
      if (productIndex !== -1) {
        // Check if state.addedProducts[productIndex] exists
        if (state.addedProducts[productIndex]) {
          state.addedProducts[productIndex].quantity = action.payload.quantity;
        }
      }
    },
    removeItemFromCart: (state, action) => {
      const { name } = action.payload;

      state.addedProducts = state.addedProducts.filter(
        (item) => item.name !== name
      );
    },
  },
});

export default addCartSlice;
