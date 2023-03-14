//MIDDLEWARE
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiErros');

//MODELS
const { User } = require('../models/User');

//SERVICES
const userService = require('./user.service');

const createUser = async(email, password) => {
   try {

      if (await User.emailTaken(email)) {
         throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email is taken');
      }

      const user = new User({
         email,
         password
      });

      await user.save();
      return user;

   } catch (err) {
      throw err;
   }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
};

const loginWithEmailAndPassword = async (email, password) => {
    try {
      const user = await userService.userByEmail(email);
      if (!user) {
         // throw new Error('Sorry BAD email');
         throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD email');
      }
      if (!(await user.comparePassword(password))) {
         // throw new Error('Sorry BAD password');
         throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD password');
      }

      return user;

    } catch (err) {
      throw err;
    }
};

module.exports = {
    createUser,
    genAuthToken,
    loginWithEmailAndPassword
}