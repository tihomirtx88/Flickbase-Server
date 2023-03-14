const { User } = require('../models/User');

const userByEmail = async (email) => {
    return await User.findOne({email});
}

module.exports = {
    userByEmail
};