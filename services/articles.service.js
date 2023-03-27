const { Article } = require('../models/Article');
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiErros');

const addArticle = async (body) => {
    try {
        const article = new Article({
            ...body,
            score: parseInt(body.score)
        });
        article.save();
        return article;
        
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addArticle,
};