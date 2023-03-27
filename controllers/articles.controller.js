const httpStatus = require('http-status');
const { articleService } = require('../services');

const articlesController = {
    async createArticle(req, res, next){
       try {
           const article = await articleService.addArticle(req.body);
           res.json(article);
        
       } catch (error) {
           next(error);
       }
    },
};

module.exports = articlesController;