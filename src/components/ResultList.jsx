import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../slices/bookSlice';
import BookItem from './BookItem';
import Pagination from './pagination';
import Loader from '../loader';

const payload = {
    title: "",
    author: "",
    published: "",
    link: "",
    language: "",
    pages: "",
    year: ""
}

const ResultList = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.bookReducer);
    // const results = store.results;
    // const paginationInfo = store.pagination;

    const [paginationInfo, setPaginationInfo] = useState({});
    const [results, setResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(false);
    const [bookInfo, setBookInfo] = useState(payload);
    const [isLoading, setIsLoading] = useState(false);
    const [sortVal, setSortVal] = useState('DESC');

    useEffect(() => {
        const values = {
            param: "page",
            value: currentPage
        }
        dispatch(fetchBooks(values)).then((response) => {
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


        // eslint-disable-next-line
    }, [currentPage]);

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
    };

    const handleOpenModal = (action, book) => {
        setIsModalOpen(true);
        setModalAction(action);
        if (action === 'View') {
            setBookInfo(book);
        } else {
            setBookInfo(payload);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelect = (e) => {
        setSortVal(e.target.value);
        const values = {
            search: store.searchVal,
            page: 1,
            sort: sortVal

        }
        dispatch(fetchBooks(values))
    }

    // console.log("this is action", modalAction);
    return (
        <>
            {
                isLoading && (
                    <Loader />
                )
            }
            <div className="results-list">

                <button type='button' className="add-button" onClick={() => handleOpenModal('Add')}>Add New Book to List</button>
                <select className='select-sort' name="sortVal" value={sortVal} onChange={(e) => handleSelect(e)}>
                    <option >Select</option>
                    <option value="ASC">Oldest to Newest</option>
                    <option value="DESC">Newest to Oldest</option>
                </select>
                {
                    results && results.length > 0 && (
                        <>
                            <h2>Search Results</h2>
                            <div className='result-table'>
                                <table className='styled-table'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((book) => (
                                            <tr key={book.id} onClick={() => handleOpenModal('View', book)}>
                                                <td >{book.title}</td>
                                                <td>{book.author}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </>
                    )
                }



                <Pagination
                    currentPage={currentPage}
                    totalPages={paginationInfo.totalPages}
                    onPageChange={handlePageChange} />


                {/* Modal */}
                <BookItem
                    action={modalAction}
                    book={bookInfo}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    sortVal
                />
            </div>
        </>

    )
}

export default ResultList;