import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cartProduct = state.cart.find((product) => {
        return product._id === action.payload._id;
      });
      if (cartProduct) {
        cartProduct.amount = cartProduct.amount + action.payload.amount;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const productIndex = state.cart.findIndex((product) => {
        return product._id === action.payload;
      });
      state.cart.splice(productIndex, 1);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
