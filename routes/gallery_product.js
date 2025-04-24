const express = require('express');
const router = express.Router();
const { all, add, edit, remove, gallery_product} = require("../controllers/gallery_product");
const { auth } = require("../middleware/auth");
const { gallery_content } = require('../controllers/gallery_content');

router.get('/', all);
router.get('/:id', gallery_product);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



