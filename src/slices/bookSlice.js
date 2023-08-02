import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchBooks = createAsyncThunk('books/fetchBooks', async (payload) => {
    let sortDir ="DESC";
    if(payload.sort){
        sortDir = payload.sort
    }
    // console.log("these are values", payload);
    try {
        const response = await axios.get(`http://68.178.162.203:8080/application-test-v1.1/books?sortDirection=${sortDir}${payload.param}=${payload.value}`);
        // console.log("This is response", response.data);
        return response.data;
    } catch (error) {
        console.log("error occured")
        return false;
    }

});


const initialValue = {
    results: [],
    pagination: {}
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