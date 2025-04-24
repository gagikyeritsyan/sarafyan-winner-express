const express = require('express');
const router = express.Router();
const { all, add, edit, remove, winery_info} = require("../controllers/winery_info");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', winery_info);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



