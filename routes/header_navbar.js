const express = require('express');
const router = express.Router();
const { all, add, edit, remove, header_navbar } = require("../controllers/header_navbar");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', header_navbar);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;


