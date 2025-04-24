const express = require('express');
const router = express.Router();
const { all, add, edit, remove, winery_image} = require("../controllers/winery_image");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', winery_image);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



