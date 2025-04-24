const express = require('express');
const router = express.Router();
const { all, add, edit, remove, contact_us} = require("../controllers/contact_us");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', contact_us);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



