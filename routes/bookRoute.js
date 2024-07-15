const express = require('express');
const router = express.Router();
const {
    getAllBookData,
    addNewBookData,
    getBookById,
    updateBookData,
    deleteBookData
} = require('../controllers/bookControllers');
const bookData = require('../data/bookData');

router.get('/getAllBookData', getAllBookData);

router.get('/getBookByISBN/:isbn', getBookById);

router.param('isbn', (request, response, next, isbn) => {
    request.book = bookData.find(book => book.isbn === isbn);
    next();
});

router.post('/addNewBookData',addNewBookData);

router.put('/updateBookData/:isbn', updateBookData);

router.delete('/deleteBookData/:isbn', deleteBookData);

module.exports = router;