const message = require('../config/messages')
const cartProvider = require('../provider/cartProvider')
const axios = require('axios')
// const console = require('../logger')



const CLIENT_ID = '115021034517-mi4vu69lej2r33872apbb5mh3m7tsluq.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';


let createGmail = async (req, res) => {
    try {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
        res.redirect(url);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}


let callbackGmail = async (req, res) => {
    const { code } = req.query;
    console.log(code, ":::::::::: code :::::::::::");

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Code to handle user authentication and retrieval using the profile data
console.log(data, "::::::::::: data :::::::::::::");
return _handleResponse(req, res, null, data);
  }  catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}
let add = async (req, res) => {
    try {
        console.log("API hits...!", req.body);
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        let response = await cartProvider.add(req.body);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let updateUser = async (req, res) => {
    try {
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        // console.log(req.params);
        let response = await cartProvider.updateUser(req.body, req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let updateCartList = async (req, res) => {
    try {
        if (!req.body) {
            return _handleResponse(req, res, message.error.REQ_BODY_EMPTY);
        }
        // console.log(req.params);
        let response = await cartProvider.updateCartList(req.body.data,);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let getUserDetails = async (req, res) => {
    try {
        let response = await cartProvider.getUserDetails(req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error  ::: ", e);
        return _handleResponse(req, res, e)
    }
}


let getUserList = async (req, res) => {
    try {
        console.log(req.query);
        const response = await cartProvider.getUserList(req.query);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error while changePassword ::: ", e);
        return _handleResponse(req, res, e)
    }
}

let deleteUser = async (req, res) => {
    try {
        console.log(req.query);
        console.log(req.params);
        const response = await cartProvider.deleteUser(req.params.id);
        return _handleResponse(req, res, null, response);
    } catch (e) {
        console.error("Error while changePassword ::: ", e);
        return _handleResponse(req, res, e)
    }
}


module.exports = {
    callbackGmail,
    createGmail,
    add,
    updateUser,
    updateCartList,
    getUserDetails,
    getUserList,
    deleteUser,
}