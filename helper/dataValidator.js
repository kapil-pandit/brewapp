const { Validator } = require('node-input-validator');
const message = require('../config/messages');

module.exports = {
    validateCreateBookObj: async function (dataObj) {
        let { name, author, price, publishedDate} = dataObj

        const v = new Validator(dataObj, {
            name: 'required',
            author: 'required',
            publishedDate: 'required|dateFormat:YYYY-MM-DD',
            price: 'required|minLength:1'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            name: name,
            author: author,
            price:price,
            publishedDate: publishedDate
        }
        return updateFields;
    },
    validateUpdateBookObj: async function (dataObj) {
        let { name, author, price, publishedDate} = dataObj

        const v = new Validator(dataObj, {
            name: 'required',
            author: 'required',
            publishedDate: 'required|dateFormat:YYYY-MM-DD',
            price: 'required|minLength:1'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            name: name,
            author: author,
            price:price,
            publishedDate: publishedDate
        }
        return updateFields;
    },
}