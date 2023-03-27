const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const auth = require('../middleware/auth');
const { addArticleValidator } = require('../middleware/validations');

///               rolle  and recources
router.post('/', auth('createAny', 'articles'), addArticleValidator, articlesController.createArticle);


module.exports = router;