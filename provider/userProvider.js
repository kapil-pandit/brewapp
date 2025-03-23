const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sgMail = require('@sendgrid/mail');
const dataValidator = require("../helper/dataValidator");
const { DbHelper } = require("../helper/dbHelper");
const { COLLECTIONS } = require("../config/constant");

const dbInstance = new DbHelper();

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "1h",
  });
};

let sendotp = async (userData) => {
  try {
    sgMail.setApiKey(process.env.SEND_GRID_KEY)
    await dataValidator.validateSendOtp(userData);
    const user = await dbInstance.findUSer(
      COLLECTIONS.USER_COLLECTION_NAME,
      userData
    );
    // console.log("::::: user :::::::", user);
    if (typeof user !== "object") throw new Error("Register First");

    const timestamp = Date.now().toString(); // Get current timestamp
    const otp = timestamp.slice(-6);
    let expirydate = Number(timestamp)+ 300000;
    let updatedBook = await dbInstance.updateDocument(
      COLLECTIONS.USER_COLLECTION_NAME,
      user._id, {otp, otpExpiry:expirydate}
    );
    const msg = {
      to: userData.email,
      from: 'kapilpandit0408@gmail.com', // Must be verified with SendGrid
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `<strong>Your OTP code is: ${otp}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log('OTP sent successfully');
} catch (error) {
    console.error('Error sending OTP:', error.response?.body || error.message);
}
    return otp;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

let verifyotp = async (userData) => {
  try {
    // sgMail.setApiKey(process.env.SEND_GRID_KEY)
    await dataValidator.validateverifyOtp(userData);
    const user = await dbInstance.findUSerByOtp(
      COLLECTIONS.USER_COLLECTION_NAME,
      userData
    );
    // console.log("::::: user :::::::", user);
    if (typeof user !== "object") throw new Error("Invalid OTP");

    const timestamp = Date.now().toString(); // Get current timestamp
    console.log(timestamp);
    let expirydate = Number(timestamp)- 300000;
    if(user.otpExpiry <= expirydate) throw new Error("OTP Expired");
    // await dbInstance.updateDocument(
    //   COLLECTIONS.USER_COLLECTION_NAME,
    //   user._id, {otp : "", otpExpiry:"", active:true}
    // );
    return "Please set your password";
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}

let passwordSet = async (userData) => {
  try {
    // sgMail.setApiKey(process.env.SEND_GRID_KEY)
    await dataValidator.validateverifypassword(userData);
    const user = await dbInstance.findUSerByOtp(
      COLLECTIONS.USER_COLLECTION_NAME,
      userData
    );
    // console.log("::::: user :::::::", user);
    if (typeof user !== "object") throw new Error("Invalid OTP");
    const hash = await hashPassword(userData.password)
    const timestamp = Date.now().toString(); // Get current timestamp
    console.log(timestamp);
    let expirydate = Number(timestamp)- 300000;
    if(user.otpExpiry <= expirydate) throw new Error("OTP Expired");
    await dbInstance.updateDocument(
      COLLECTIONS.USER_COLLECTION_NAME,
      user._id, {otp : "", otpExpiry:"", active:true, password:hash}
    );
    return "Please Login..!";
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};



let registerUser = async (userData) => {
  try {
    const updateObj = await dataValidator.validateRegisterObj(userData);
    const user = await dbInstance.findUSer(
      COLLECTIONS.USER_COLLECTION_NAME,
      userData
    );
    // console.log("::::: user :::::::", user);
    if (typeof user === "object") throw new Error("User already exist");
    
    let insertedUser = await dbInstance.insertDocument(
      COLLECTIONS.USER_COLLECTION_NAME,
      updateObj
    );
    return insertedUser;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

let loginUser = async (userData) => {
  try {
    await dataValidator.validateLoginObj(userData);
    let userDoc = await dbInstance.findUSer(
      COLLECTIONS.USER_COLLECTION_NAME,
      userData
    );
    // let updatedBook = await dbInstance.insertDocument(COLLECTIONS.BOOK_COLLECTION_NAME, userData);
    // Compare passwords
    console.log(":::::userDoc::::", userDoc);
    if (!userDoc._id) {
      throw "Invalid Email";
    }
    const isMatch = await bcrypt.compare(userData.password, userDoc.password);
    console.log(":::::isMatch::::", isMatch);

    if (!isMatch) return { message: "Invalid password" };
    // console.log(":::::userDoc::::", userDoc);
    const token = generateToken(userDoc._id);
    userDoc.jwt = token;
    return userDoc;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

let updateUser = async (userData, id) => {
  try {
    const updateObj = await dataValidator.validateUpdateUserObj(userData);
    let updatedUser = await dbInstance.updateDocument(
      COLLECTIONS.BOOK_COLLECTION_NAME,
      id,
      updateObj
    );
    return updatedUser;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

let updateUserList = async (userData) => {
  try {
    // const updateObj = await dataValidator.validateUpdateUserObj(userData);
    let updatedUser = await dbInstance.updateDocumentList(
      COLLECTIONS.BOOK_COLLECTION_NAME,
      userData
    );
    return updatedUser;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

// let getUserDetails = async (id) => {
//   try {
//     const userDetails = await dbInstance.fetchSingleDocument(
//       COLLECTIONS.BOOK_COLLECTION_NAME,
//       id
//     );
//     return userDetails;
//   } catch (e) {
//     console.error("Error ::: ", e);
//     throw e;
//   }
// };

let getUserList = async (query) => {
  try {
    const { pgNo = 1, limit = 10, sort = "name", order = "1" } = query;
    let sorting = {};
    sorting[sort] = order;
    const skipIndex = (pgNo - 1) * limit;
    console.log(sorting, skipIndex, limit);
    const bookList = await dbInstance.fetchUserList(
      COLLECTIONS.BOOK_COLLECTION_NAME,
      sorting,
      skipIndex,
      limit
    );
    return bookList;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

let deleteUser = async (id) => {
  try {
    const bookList = await dbInstance.deleteDocument(
      COLLECTIONS.BOOK_COLLECTION_NAME,
      id
    );
    return bookList;
  } catch (e) {
    console.error("Error ::: ", e);
    throw e;
  }
};

module.exports = {
  registerUser,
  sendotp,
  verifyotp,
  passwordSet,
  loginUser,
  updateUser,
  updateUserList,
  getUserList,
  deleteUser,
};
