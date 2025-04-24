const express = require('express');
const router = express.Router();
const { all, add, edit, remove, product} = require("../controllers/product");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', product);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



