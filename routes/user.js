const express = require('express');
const router = express.Router();
const limit = require("../middleware/limit");

const userCtrl = require('../controllers/user');
router.get('/', userCtrl.getUsers);

router.post('/signup', userCtrl.signup);

router.post("/login", limit.limiter, userCtrl.login);


module.exports = router;