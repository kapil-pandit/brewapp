var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")
const valid = require('../validator/book.validator')
const {jwtCreate, jwtCheck} = require('../utils/jwt')
// router.put('/:id', jwt.verifyJWT, bookController.updateBook);

router.post('/',  userController.register);
router.put('/:id', userController.updateUser);
router.get('/:id',  userController.getUserDetails);
router.get('/',  userController.getUserList);
router.delete('/:id',  userController.deleteUser);

module.exports = router;