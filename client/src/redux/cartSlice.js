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
  },
  extraReducers: (builder) => {},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
