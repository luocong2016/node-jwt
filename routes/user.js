const express = require('express');
const router = express.Router();

const User = require('../controller/user/User');

router.post('/login', User.login);
router.post('/append', User.append);

module.exports = router;
