const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js');
const { checkforAuthentication } = require('../middleware/authentication.js');
const { createblog } = require('../controller/blog.js');

router.post('/', upload.single('coverImageUrl'), checkforAuthentication, createblog);

module.exports = router;