import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../slices/bookSlice';

export const store = configureStore({
    reducer: {
        bookReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

