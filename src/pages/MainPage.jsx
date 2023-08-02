import React from 'react'
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';

const MainPage = () => {
    return (
        <div className='main-page'>
            <div>
                <h1>Welcome to Book Directory !!</h1>
            </div>
            <SearchBar />
            <ResultList />
        </div>
    )
}

export default MainPage;