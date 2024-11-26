import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';

const initialState = {
  products: [],
  singleProduct: null,
  status: 'idle',
  message: null,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products`, { method: 'GET' });
      if (!res.ok) {
        throw new Error(`Failed to get products: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: 'GET',
      });
      if (!res.ok) {
        throw new Error(`Failed to get product by id: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProducts = createAsyncThunk(
  'products/addProducts',
  async (product, { rejectWithValue }) => {
    const fd = new FormData();
    fd.append('name', product.name);
    fd.append('price', product.price);
    fd.append('amount', product.amount);
    fd.append('description', product.description);
    fd.append('uploaded_file', product.file);

    const options = {
      method: 'POST',
      credentials: 'include',
      body: fd,
    };

    try {
      const res = await fetch(`${API_URL}/products`, options);
      if (!res.ok) {
        throw new Error(`Failed to add product: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (productId, { rejectWithValue }) => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    try {
      const res = await fetch(`${API_URL}/products/${productId}`, options);
      if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    editProduct: (state) => {},
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })
      .addCase(getProductById.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })
      .addCase(addProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        const { message, newProduct } = action.payload;
        if (newProduct) {
          state.products.push({
            ...newProduct,
          });
        }
        state.message = message;
        state.status = 'succeeded';
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })
      .addCase(deleteProducts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        const { message, deletedProduct } = action.payload;
        if (deletedProduct) {
          const index = state.products.findIndex(
            (product) => product._id === deletedProduct._id
          );
          state.products.splice(index, 1);
        }
        state.message = message;
        state.status = 'succeeded';
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      });
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;

// export const addProductRequest = (product) => {
//   const fd = new FormData();
//   fd.append('name', product.name);
//   fd.append('price', product.price);
//   fd.append('amount', product.amount);
//   fd.append('description', product.description);
//   fd.append('uploaded_file', product.file);

//   return (dispatch) => {
//     const options = {
//       method: 'POST',
//       credentials: 'include',
//       body: fd,
//     };

//     fetch(`${API_URL}/products`, options)
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//       })
//       .then((res) => {
//         dispatch(addProduct(res.newProduct));
//       });
//   };
// };
