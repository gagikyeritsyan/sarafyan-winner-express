const express = require('express');
const router = express.Router();
const { all, add, edit, remove, contact_message} = require("../controllers/contact_message");
const { auth } = require("../middleware/auth");

router.get('/', all);
router.get('/:id', contact_message);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;



