var express = require('express');
var router = express.Router();
const userController = require("../controller/userController")
const cartController = require("../controller/cartController")
const valid = require('../validator/book.validator')
const {jwtCreate, jwtCheck} = require('../utils/jwt')
// router.put('/:id', jwt.verifyJWT, bookController.updateBook);

router.post('/',  cartController.add);
router.put('/:id', cartController.updateUser);
router.put('/', cartController.updateCartList);
router.get('/:id',  cartController.getUserDetails);
router.get('/',  cartController.getUserList);
router.delete('/:id',  cartController.deleteUser);

module.exports = router;