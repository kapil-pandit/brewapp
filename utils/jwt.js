'use strict';

const jwt = require('jsonwebtoken');

// const Customer = mongoose.model('Customer');
// const User = mongoose.model('User');

async function jwtCheck(req, res, next) {
    try {
        const token = req.headers.token
        if (!token) {
            throw new Error('JWT Token is required');
        }
        var tempDecode = jwt.decode(token);
        const decode = jwt.verify(token, 'secret');
        if (!decode.email) {
            throw new errors.InvalidData('User not found');
        }
        // let user = await User.findById(
        req.user = decode;
        next();
    } catch (e) {
        throw new Error((e.message))
    }
}

async function jwtCreate(req, res, next) {
    try {
        const email = req.body.email;
        if (!email) {
            throw new Error('email is required');
        }
        let ts = Date.now()
        const token = jwt.sign(
			{
				email,
			},
			`secret`,
			{
				expiresIn: '15d',
			}
		);
        if (!token) {
            throw new errors.InvalidData('token not found');
        }
        // let user = await User.findById(
            console.log('::::: token ::::::', token);
        req.user = token;
        next();
    } catch (e) {
        throw new Error((e.message))
    }
}

module.exports = {
    jwtCheck,
    jwtCreate,
};
