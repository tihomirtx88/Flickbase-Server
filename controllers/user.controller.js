const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiErros');


const { userService, authService, emailService } = require('../services');

const userController = {
    async profile(req,res,next){
        try{
            const user = await userService.findUserById(req.user._id);
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND,'User not found')
            }
            res.json(res.locals.permission.filter(user._doc))
        } catch(error){
            next(error);
        }
    },
    async updateProfile(req, res, next){
        try {
            const user = await userService.updateUserProfile(req);
            res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },
    async updateUserEmail(req, res, next){
        try {
            const user = await userService.updateUserEmail(req);
            const token = authService.genAuthToken(user);

             //Send verification email
             await emailService.registerEmail(user.email,user);
            
            res.cookie('x-access-token', token).send({
                user: res.locals.permission.filter(user._doc),
                token: token
            });
        } catch (error) {
            next(error);
        }
    },
    async verifyAccount(req, res, next){
        try {
            const token = userService.validateToken(req.query.validation);
            const user = await userService.findUserById(token.sub);

            if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            if(user.verified) throw new ApiError(httpStatus.NOT_FOUND, 'Account is already verified');

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                email: user.email,
                verified: true
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;