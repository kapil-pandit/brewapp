const { Validator } = require('node-input-validator');
const message = require('../config/messages');

module.exports = {
    validateRegisterObj: async function (dataObj) {
        let { firstName, lastName, email, mobile,  gender, dob} = dataObj

        const v = new Validator(dataObj, {
            firstName: 'string|required',
            lastName: 'string|required',
            email: 'email|required',
            gender: 'string',
            dob: 'date',
            mobile: 'integer|required|minLength:10|maxLength:10'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            firstName, lastName, email, mobile,  gender, dob
        }
        return updateFields;
    },
    validateSendOtp: async function (dataObj) {
        let { email,} = dataObj

        const v = new Validator(dataObj, {
            email: 'email',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            email,
        }
        return updateFields;
    },

    validateverifyOtp: async function (dataObj) {
        let {otp,} = dataObj

        const v = new Validator(dataObj, {
            otp: 'integer|required|minLength:6|maxLength:6'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            otp,
        }
        return updateFields;
    },

    validateverifypassword: async function (dataObj) {
        let {password,} = dataObj

        const v = new Validator(dataObj, {
            password: 'string|required|minLength:8|maxLength:16'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            password,
        }
        return updateFields;
    },
    validateLoginObj: async function (dataObj) {
        let { password, email,} = dataObj

        const v = new Validator(dataObj, {
            email: 'email|required',
            password: 'string|required',
            // department: 'string',
            // place: 'string',
            // dob: 'date',
            // mobile: 'integer|required|minLength:1'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        }

        const updateFields = {
            email, password
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