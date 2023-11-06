const dataValidator = require("../helper/dataValidator");
const { DbHelper } = require("../helper/dbHelper");
const { COLLECTIONS } = require("../config/constant");

const dbInstance = new DbHelper();

let createBook = async (bookData) => {
    try {
        const updateObj = await dataValidator.validateCreateBookObj(bookData);
        let updatedBook = await dbInstance.insertDocument(COLLECTIONS.BOOK_COLLECTION_NAME, updateObj);
        return updatedBook;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let updateBook = async (bookData, id) => {
    try {
        const updateObj = await dataValidator.validateUpdateBookObj(bookData);
        let updatedBook = await dbInstance.updateDocument(COLLECTIONS.BOOK_COLLECTION_NAME, id, updateObj);
        return updatedBook;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let getBookDetails = async (id) => {
    try {
        const bookDetails = await dbInstance.getBookById(id);
        return bookDetails;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let getBookList = async (query) => {
    try {
        const { pgNo=1, limit=10, sort='name', order='1'} = query
        let sorting = {};
        sorting[sort] = order;
        const skipIndex = (pgNo - 1) * limit;
        console.log(sorting, skipIndex, limit);
        const bookList = await dbInstance.getBooksList(sorting, skipIndex, limit);
        return bookList;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let deleteBook = async (id) => {
    try {
        const bookList = await dbInstance.deleteBook(id);
        return bookList;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

module.exports = {
    createBook,
    updateBook,
    getBookDetails,
    getBookList,
    deleteBook,
}