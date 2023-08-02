import React from 'react';
import '../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const renderPaginationItems = () => {
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <li
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </li>
            );
        }

        return paginationItems;
    }
    return (
        <div>
            <ul className='pagination'>{renderPaginationItems()}</ul>
        </div>
    )
}

export default Pagination;