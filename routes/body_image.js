const express = require('express');
const router = express.Router();
const { all, add, remove, edit, bodyImage, } = require("../controllers/body_image");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', bodyImage);
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit);

module.exports = router;


