import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchBooks = createAsyncThunk('books/fetchBooks', async (payload) => {
    let sortDir = "DESC";
    if (payload.sort) {
        sortDir = payload.sort
    }
    let searchUrl = `http://68.178.162.203:8080/application-test-v1.1/books?sortDirection=${sortDir}`;
    if (payload.page) {
        searchUrl += `&page=${payload.page}`
    }
    if (payload.search && payload.search !== "") {
        searchUrl += `&title=${payload.search}`
    }
    console.log("this is url", searchUrl);
    try {
        const response = await axios.get(`${searchUrl}`);
        // console.log("This is response", response.data);
        return response.data;
    } catch (error) {
        console.log("error occured")
        return false;
    }

});


const initialValue = {
    results: [],
    pagination: {},
    searchVal: ""
};

export const bookSlice = createSlice({
    name: 'books',
    initialState: initialValue,
    reducers: {
        handleSearchVal: (state, action) => {
            state.searchVal = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.results = action.payload.data;
            state.pagination = action.payload.pagination;
        });
    }
});

export const { handleSearchVal } = bookSlice.actions

export default bookSlice.reducer;