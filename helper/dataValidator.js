const { Validator } = require('node-input-validator');
const message = require('../config/messages');

module.exports = {
    validateRegisterObj: async function (dataObj) {
        let { name, email, mobile, department, place, dob} = dataObj

        const v = new Validator(dataObj, {
            name: 'string|required',
            email: 'email|required',
            department: 'string',
            place: 'string',
            dob: 'date',
            mobile: 'integer|required|minLength:1'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            name, email, mobile, department, place, dob
        }
        return updateFields;
    },
    validateUpdateUserObj: async function (dataObj) {
        let { name, email, mobile, department, place, dob} = dataObj

        const v = new Validator(dataObj, {
            name: 'string',
            email: 'email',
            mobile: 'integer',
            department: 'string',
            dob: 'date',
            place: 'string',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            name, email, mobile, department, place, dob
        }
        return updateFields;
    },
}