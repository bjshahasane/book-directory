import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../slices/bookSlice';
import siteSettings from '../slices/siteSettingSlice';

export const store = configureStore({
    reducer: {
        bookReducer,
        siteSettings,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

