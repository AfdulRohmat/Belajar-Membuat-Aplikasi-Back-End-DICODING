import { postBookHandler, getAllBooks, getBookById, updateBookById, deleteBookById } from './handler.js';

const routes = [
    // CREATE / POST BOOKS
    {
        method: 'POST',
        path: '/books',
        handler: postBookHandler,
    },

    // GET ALL BOOKS
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks
    },

    // GET PARTICULAR BOOKS BY ID
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById
    },

    // PUT / UPDATE BOOK BY ID
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookById,
    },

    // DELETE BOOK BY ID
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookById,
    }
];

export default routes;