import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    id: '1',
    name: 'black thsirt',
    price: '199',
    description: 'ipsum',
    amount: 5,
    img: '',
  },
  {
    id: '2',
    name: 'blue jeans',
    price: '299',
    description: 'lorem',
    amount: 10,
    img: '',
  },
];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProduct: (state) => {},
    addProduct: (state) => {
      state.push({ id: uuidv4(), name: 'xd' });
    },
    editProduct: (state) => {},
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
