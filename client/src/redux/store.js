import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Could not load cart', err);
    return undefined;
  }
};

const preloadedState = {
  cart: loadCartFromLocalStorage() || { cart: [] },
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState,
});

const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
};

store.subscribe(() => {
  const currentCartState = store.getState().cart;
  saveCartToLocalStorage(currentCartState);
});
