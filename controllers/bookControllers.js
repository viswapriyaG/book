const BookModel = require('../models/bookModel');
const bookData = require('../data/bookData');

const getAllBookData = async (request, response) => {
    try {
        let books = await BookModel.find();
        if (books.length === 0) {
            const initialBooks = await BookModel.insertMany(bookData);
            books = await BookModel.find();
        }
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

const getBookById = async (request, response) => {
    const idToFetch = request.params.isbn;
    try {
        const expectedBookData = await BookModel.findOne({ isbn: idToFetch });
        if (expectedBookData) {
            return response.status(200).json(expectedBookData);
        }
        return response.status(403).json({ message:` No book was found with ISBN ${idToFetch} `});
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const addNewBookData = async (request, response) => {
    const newBook = request.body;
    try {
        const existingBook = await BookModel.findOne({ isbn: newBook.isbn });
        if (existingBook) {
            return response.status(200).json({ message: `A book with ISBN ${newBook.isbn} already exists` });
        }
        const insertedBook = await BookModel.create(newBook);
        return response.status(201).json(insertedBook);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

const updateBookData = async (request, response) => {
    const isbnToUpdate = request.params.isbn;
    const newBookData = request.body;
  
    try {
      const updatedBookData = await BookModel.findOneAndUpdate(
        { isbn: isbnToUpdate },
        newBookData,
        { new: true, runValidators: true }
      );
  
      if (updatedBookData) {
        return response.status(200).json(updatedBookData);
      }
  
      return response.status(404).json({ message: `No book was found with ISBN ${isbnToUpdate}` });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
}

const deleteBookData = async (request, response) => {
    const isbnToDelete = request.params.isbn;
  
    try {
      const deletedBookData = await BookModel.findOneAndDelete({ isbn: isbnToDelete });
  
      if (deletedBookData) {
        return response.status(200).json({ message:` Book with ISBN ${isbnToDelete} was successfully deleted `});
      }
  
      return response.status(404).json({ message: `No book was found with ISBN ${isbnToDelete} `});
    } catch (error) {
      return response.status(500).json({ message: error.message});
    }
}

module.exports = {
    getAllBookData,
    addNewBookData,
    getBookById,
    updateBookData,
    deleteBookData
};