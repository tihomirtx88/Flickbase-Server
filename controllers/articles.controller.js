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
    async getArticleById(req, res, next){
        try {
            const _id = req.params.id;
            const article = await articleService.getArticleById(_id, req.user);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async getUserArticleById(req, res, next){
        try {
            const _id = req.params.id;
            const article = await articleService.getUserArticleById(_id);
            res.json(article);
        } catch (error) {
            next(error);
        }
    },
    async updateArticleById(req, res, next){
        try {
            const _id = req.params.id;
            const article = await articleService.updateArticleById(_id, req.body);
            res.json(article);
            
        } catch (error) {
            next(error);
        }
    },
    async deleteArticleById(req, res, next){
        try {
            const _id = req.params.id;
            await articleService.deleteArticleById(_id);
            res.status(httpStatus.OK).json({action: 'Deleted'});
        } catch (error) {
            next(error);
        }
    }
};

module.exports = articlesController;