const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const auth = require('../middleware/auth');

///               rolle  and recources
router.post('/', auth('createAny', 'Articles'));


module.exports = router;