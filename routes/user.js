var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")
const valid = require('../validator/book.validator')
const {jwtCreate, jwtCheck} = require('../utils/jwt')
// router.put('/:id', jwt.verifyJWT, bookController.updateBook);

router.post('/register',  userController.register);
router.post('/sendotp',  userController.sendotp);
router.post('/verifyotp',  userController.verifyotp);
router.post('/login',  userController.login);
router.put('/:id', userController.updateUser);
router.put('/', userController.updateUserList);
router.get('/:id',  userController.getUserDetails);
router.get('/',  userController.getUserList);
router.delete('/:id',  userController.deleteUser);
router.get('/test',  (req, res) => {
    res.send("This is from jenkins")
});

module.exports = router;