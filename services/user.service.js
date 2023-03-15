const { User } = require('../models/User');

const userByEmail = async (email) => {
    return await User.findOne({email});
}

const findUserById = async (_id) => {
    return await User.findById(_id);
}

module.exports = {
    userByEmail,
    findUserById
};