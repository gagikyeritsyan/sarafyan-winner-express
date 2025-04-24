const express = require('express');
const router = express.Router();
const { all, add, edit, remove, footer} = require("../controllers/footer");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', footer);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



