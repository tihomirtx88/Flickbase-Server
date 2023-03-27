const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');

const addArticleValidator = [
    check('title')
      .trim().not().isEmpty().withMessage('You need add title').bail()
      .isLength({min:3}).withMessage('The title must be at least 3 characters long').bail(),
    check('director')
      .trim().not().isEmpty().withMessage('You need add director').bail()
      .not().isBoolean().withMessage('The field with dirctor can be boolean').bail()
      .isLength({min:3, max:100}).withMessage('The Director must be at least 3 and maximum 100 characters long').bail(),
      ///TODO ALL VALIDATIONS 
      (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
          
        next();
      }
]


module.exports = {addArticleValidator};