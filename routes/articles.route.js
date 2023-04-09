const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const auth = require('../middleware/auth');
const { addArticleValidator } = require('../middleware/validations');

///               rolle  and recources
router.post('/', auth('createAny', 'articles'), addArticleValidator, articlesController.createArticle);

router.route('/article/:id')
   .get(auth('readAny','articles'),articlesController.getArticleById)
   .patch(auth('updateAny', 'articles'), articlesController.updateArticleById)
   .delete(auth('deleteAny', 'articles'), articlesController.deleteArticleById)

router.route('/users/article/:id').get(articlesController.getUserArticleById);

router.route('/all')
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles);



module.exports = router;