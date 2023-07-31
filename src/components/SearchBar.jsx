import React, { useState } from 'react'

const SearchBar = () => {

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log("this is search")
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter book title"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar;