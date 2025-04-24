const express = require('express');
const router = express.Router();
const { all, add, edit, remove, winery_our_story} = require("../controllers/winery_our_story");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', winery_our_story);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



