const dataValidator = require("../helper/dataValidator");
const { DbHelper } = require("../helper/dbHelper");
const { COLLECTIONS } = require("../config/constant");

const dbInstance = new DbHelper();

let registerUser = async (userData) => {
    try {
        const updateObj = await dataValidator.validateRegisterObj(userData);
        let updatedBook = await dbInstance.insertDocument(COLLECTIONS.BOOK_COLLECTION_NAME, userData);
        return updatedBook;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let updateUser = async (userData, id) => {
    try {
        const updateObj = await dataValidator.validateUpdateUserObj(userData);
        let updatedUser = await dbInstance.updateDocument(COLLECTIONS.BOOK_COLLECTION_NAME, id, updateObj);
        return updatedUser;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let getUserDetails = async (id) => {
    try {
        const userDetails = await dbInstance.fetchSingleDocument(COLLECTIONS.BOOK_COLLECTION_NAME, id);
        return userDetails;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let getUserList = async (query) => {
    try {
        const { pgNo=1, limit=10, sort='name', order='1'} = query
        let sorting = {};
        sorting[sort] = order;
        const skipIndex = (pgNo - 1) * limit;
        console.log(sorting, skipIndex, limit);
        const bookList = await dbInstance.fetchUserList(COLLECTIONS.BOOK_COLLECTION_NAME, sorting, skipIndex, limit);
        return bookList;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

let deleteUser = async (id) => {
    try {
        const bookList = await dbInstance.deleteDocument(COLLECTIONS.BOOK_COLLECTION_NAME,id);
        return bookList;
    } catch (e) {
        console.error('Error ::: ', e)
        throw (e);
    }
}

module.exports = {
    registerUser,
    updateUser,
    getUserDetails,
    getUserList,
    deleteUser,
}