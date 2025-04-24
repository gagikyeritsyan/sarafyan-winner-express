const express = require('express');
const router = express.Router();
const { all, add, edit, remove, home_intro} = require("../controllers/home_intro");
const { auth } = require("../middleware/auth");
// const { home_intro } = require('../controllers/home_intro');

router.get('/', all);
router.get('/:id', home_intro);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;


