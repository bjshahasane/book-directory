import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../slices/bookSlice';
import Pagination from './pagination';

const ResultList = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.bookReducer);
    // const results = store.results;
    // const paginationInfo = store.pagination;

    const [paginationInfo, setPaginationInfo] = useState({});
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(fetchBooks(currentPage));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store.results) {
            setResults(store.results);
        }
        if (store.pagination) {
            setPaginationInfo(store.pagination);
        }
    }, [store])

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Implement logic to fetch data for the new page here if needed
    };

    // console.log("this is store", store);
    return (
        <div className="results-list">
            <h2>Search Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={paginationInfo.totalPages}
                onPageChange={handlePageChange} />
        </div>
    )
}

export default ResultList;