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

const getArticleById = async (_id, user) => {
    try {
        const article = await Article.findById(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
        if (user.role === 'user' && article.status === 'draft') {
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry you are not allowed');
        }
        return article;
    } catch (error) {
        throw error;
    }
};

const getUserArticleById = async (_id) => {
    try {
        const article = await Article.findById(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
        if (article.status === 'draft') {
            throw new ApiError(httpStatus.NOT_FOUND, 'Sorry you are not allowed');
        }
        return article;
    } catch (error) {
        throw error;
    }
};
 
const updateArticleById = async (_id, body) => {
    try {
        const article = await Article.findOneAndUpdate(
            {_id},
            {"$set": body },
            {new: true}
        );

        if(!article) throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
        return article;

    } catch (error) {
        throw error;
    }
};

const deleteArticleById = async (_id) => {
    try {
        const article = await Article.findByIdAndRemove(_id);
        if(!article) throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
        return article;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    addArticle,
    getArticleById,
    getUserArticleById,
    updateArticleById,
    deleteArticleById
};