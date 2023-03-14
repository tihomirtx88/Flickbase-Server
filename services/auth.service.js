const { User } = require('../models/User');

const createUser = async(email, password) => {
   try {

      if (await User.emailTaken(email)) {
         throw new Error('Sorry email is taken');
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
}

module.exports = {
    createUser,
    genAuthToken
}