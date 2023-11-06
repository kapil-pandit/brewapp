const message = require('../config/messages')
const bookProvider = require('../provider/bookProvider')
// const console = require('../logger')

let createBook = async (req, res) => {
    try {
        console.log("API hits...!");
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        let response = await bookProvider.createBook(req.body);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let updateBook = async (req, res) => {
    try {
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        // console.log(req.params);
        let response = await bookProvider.updateBook(req.body, req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let getBookDetails = async (req, res) => {
    try {
        let response = await bookProvider.getBookDetails(req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error  ::: ", e);
        return _handleResponse(req, res, e)
    }
}


let getBookList = async (req, res) => {
    try {
        console.log(req.query);
        const response = await bookProvider.getBookList(req.query);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error while changePassword ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let deleteBook = async (req, res) => {
    try {
        console.log(req.query);
        console.log(req.params);
        const response = await bookProvider.deleteBook(req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error while changePassword ::: ", e);
        return _handleResponse(req, res, e)
    }
}


module.exports = {
    createBook,
    updateBook,
    getBookDetails,
    getBookList,
    deleteBook,
}