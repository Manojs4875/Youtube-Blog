const express = require('express');
const router = express.Router();
const { handlesignup, handlelogin } = require('../controller/user.js');

router.post('/signup', handlesignup);
router.post('/login', handlelogin);

module.exports = router;