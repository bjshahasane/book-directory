import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchBooks = createAsyncThunk('header/fetchBooks', async (page) => {
    try {
        const response = await axios.get(`http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`);
        console.log("This is response", response.data);
        return response.data;
    } catch (error) {
        console.log("error occured")
        return false;
    }

});


const initialValue = {
    results: [],
    booksList: [],
    pagination:{}
};

export const bookSlice = createSlice({
    name: 'books',
    initialState: initialValue,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.results = action.payload.data;
            state.pagination = action.payload.pagination;
        });
    }
});


export default bookSlice.reducer;