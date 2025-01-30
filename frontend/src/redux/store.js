import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cart.js';
import booksApi from './features/books/booksApi.js';
import postsApi from './features/posts/postsApi.js';
import consultnatApi from './features/consultant/consultantApi.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [consultnatApi.reducerPath]: consultnatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, postsApi.middleware,consultnatApi.middleware),
});