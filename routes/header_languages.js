const express = require('express');
const router = express.Router();
const { all, add, edit, remove, header_language} = require("../controllers/header_languages");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', header_language);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;


