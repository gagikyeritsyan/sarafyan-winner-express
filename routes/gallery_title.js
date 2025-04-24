const express = require('express');
const router = express.Router();
const { all, add, edit, remove, gallery_title} = require("../controllers/gallery_title");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', gallery_title);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



