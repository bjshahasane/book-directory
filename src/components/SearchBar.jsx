import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { fetchBooks, handleSearchVal } from '../slices/bookSlice';
import Loader from '../loader';

const SearchBar = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        const { name, value } = e.target;
        setQuery(value);
        dispatch(handleSearchVal(value))
        let payload;
        if (!value) {
            payload = {
                page: 1,
                search:query
            }
            dispatch(fetchBooks(payload)).then((response) => {
                setIsLoading(true);
                if (response) {
                    console.log("Book searched");
                    setIsLoading(false);

                } else {
                    console.log("Error occurred while searching book.");
                    setIsLoading(false);
                }
            })
                .catch((error) => {
                    // Handle any errors that occur during the API call
                    console.log("Error occurred:", error.message);
                    setIsLoading(false);
                });
        }
    }

    const onSearch = () => {
        let payload;
        if (query) {
            payload = {
                search: query
            }
            dispatch(fetchBooks(payload)).then((response) => {
                setIsLoading(true);
                if (response) {
                    console.log("Book searched");
                    setIsLoading(false);

                } else {
                    console.log("Error occurred while searching book.");
                    setIsLoading(false);
                }
            })
                .catch((error) => {
                    console.log("Error occurred:", error.message);
                    setIsLoading(false);
                });
        }
    }

    return (
        <>
            {
                isLoading && (
                    <Loader />
                )
            }
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Enter book title"
                />
                <button className="search-button" onClick={onSearch}>Search</button>
            </div>
        </>

    )

}

export default SearchBar;