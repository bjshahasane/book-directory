import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../slices/bookSlice";
import Loader from '../loader';
import { showNotification } from "../slices/siteSettingSlice";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f2e765",
        width: 400,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)"
    },
};

const BookItem = ({ action, book, isOpen, onClose, sortVal }) => {

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [bookPayload, setBookPayload] = useState({});
    const [modalView, setModalView] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    // console.log("this is book", modalView, bookPayload);
    useEffect(() => {
        if (isOpen) {
            setModalOpen(isOpen);
        }
        if (action) {
            setModalView(action);
        }
        if (book) {
            setBookPayload(book)
        }
    }, [isOpen, action, book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const temp = { ...bookPayload };
        temp[name] = value;
        setBookPayload(temp);
    }

    const Submitpayload = async (bookId = "") => {
        setIsLoading(true);
        console.log("submitting");
        const values = {
            search: "",
            page: 1,
            sort: sortVal
        }
        const apiUrl = `http://68.178.162.203:8080/application-test-v1.1/books`;
        if (modalView === "Add") {
            try {
                const response = await axios.post(apiUrl, bookPayload);
                if (response.data) {
                    console.log("this is add response", response.data);
                    dispatch(showNotification({ message: `${response.data.message}`, type: "success" }))
                    onClose();
                    dispatch(fetchBooks(values));
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.response.data.message) {
                    dispatch(showNotification({ message: `${error.response.data.message}`, type: "error" }))
                } else {
                    dispatch(showNotification({ message: "Error Occured ", type: "error" }))

                }
                console.log("Error occurred 1:",error);
                return false;
            }
        } else {
            try {
                const response = await axios.put(`${apiUrl}/${bookId}`, bookPayload);
                if (response.data) {
                    console.log("this is add response", response.data);
                    onClose();
                    dispatch(showNotification({ message: `${response.data.message}`, type: "success" }))
                    dispatch(fetchBooks(values));
                    setIsLoading(false);
                }
            } catch (error) {
                if (error.response.data.message) {
                    dispatch(showNotification({ message: `${error.response.data.message}`, type: "error" }))
                } else {
                    dispatch(showNotification({ message: "Error Occured ", type: "error" }))

                }
                console.log("error occured")
                setIsLoading(false);
                return false;
            }
        }

    }
    // console.log("this is modal view", modalOpen);
    return (
        < >
            {
                isLoading && (
                    <Loader />
                )
            }

            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={customStyles}
                ariaHideApp={false}
            >
                {
                    modalView && (modalView === "Add" || modalView === "Edit") && (
                        <>
                            <div className="book-detail">
                                <h3>{modalView} Book Details</h3>
                                <div className="view-body">
                                    <dl className="dl-style">
                                        <dt><label htmlFor="title">Title</label></dt>
                                        <dt><input type="text" id="title" name="title" value={bookPayload.title} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt> <label htmlFor="author">Author</label></dt>
                                        <dt><input type="text" id="author" name="author" value={bookPayload.author} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt><label htmlFor="published">Published</label></dt>
                                        <dt><input type="text" id="published" name="published" value={bookPayload.published} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt><label htmlFor="language">Language</label></dt>
                                        <dt><input type="text" id="language" name="language" value={bookPayload.language} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt><label htmlFor="pages">Pages</label></dt>
                                        <dt><input type="number" id="pages" name="pages" value={bookPayload.pages} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt><label htmlFor="year">Year</label></dt>
                                        <dt><input type="number" id="year" name="year" value={bookPayload.year} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                    <dl className="dl-style">
                                        <dt><label htmlFor="link">Link</label></dt>
                                        <dt><input type="text" id="link" name="link" value={bookPayload.link} onChange={(e) => handleChange(e)} /></dt>
                                    </dl>
                                </div>
                            </div>
                            <div style={{ float: "right" }}>
                                <button className="button" onClick={modalView === "Add" ? Submitpayload : () => Submitpayload(bookPayload.id)}>{modalView} Book</button>
                                <button className="button close" onClick={onClose}>Close Modal</button>
                            </div>
                        </>


                    )}

                {
                    modalView && modalView === "View" && (
                        <>
                            <div className="book-detail-view">
                                <div className="view-header">
                                    <h3>{modalView} Book Details</h3>
                                    <button className="button" type="button" onClick={() => setModalView("Edit")}>Update Details</button>
                                </div>
                                <div className="view-body">
                                    <dl className="dl-style-view">
                                        <dt><b>Title :</b> </dt>
                                        <dt>{bookPayload.title}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Author :</b></dt>
                                        <dt>{bookPayload.author}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Publised :</b></dt>
                                        <dt>{bookPayload.published}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Language :</b></dt>
                                        <dt>{bookPayload.language}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Pages :</b></dt>
                                        <dt>{bookPayload.pages}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Year :</b></dt>
                                        <dt>{bookPayload.year}</dt>
                                    </dl>
                                    <dl className="dl-style-view">
                                        <dt><b>Link :</b></dt>
                                        <dt><a href={bookPayload.link}> {bookPayload.link}</a></dt>
                                    </dl>
                                </div>


                            </div>
                            <div style={{ float: "right" }}>
                                <button className="button close" onClick={onClose}>Close Modal</button>

                            </div>
                        </>


                    )
                }

            </Modal>

        </>
    );
}

export default BookItem;
