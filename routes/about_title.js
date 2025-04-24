const express = require('express');
const router = express.Router();
const { all, add, edit, remove, about_title} = require("../controllers/about_title");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', about_title);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



