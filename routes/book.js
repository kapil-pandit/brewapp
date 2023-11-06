var express = require('express');
var router = express.Router();
const bookController = require("../controller/bookController")

// router.put('/:id', jwt.verifyJWT, bookController.updateBook);

router.post('/', bookController.createBook);
router.put('/:id',  bookController.updateBook);
router.get('/:id',  bookController.getBookDetails);
router.get('/',  bookController.getBookList);
router.delete('/:id',  bookController.deleteBook);

module.exports = router;