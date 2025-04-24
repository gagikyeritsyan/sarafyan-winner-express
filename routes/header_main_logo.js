const express = require('express');
const router = express.Router();
const { all, add, edit, remove, logo } = require("../controllers/header_main_logo");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', logo);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;


