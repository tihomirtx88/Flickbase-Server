const mongoose = require('mongoose');
const validator = require('validator');
const bcrupt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
           if(!validator.isEmail(value)){
              throw new Error('Invalid email');
           }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstname: {
        type: String,
        maxLength: 100,
        trim: true
    },
    lastname: {
        type: String,
        maxLength: 100,
        trim: true
    },
    age: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    }
},{
   timestamps: true
});

userSchema.pre('save', async function(next){
   let user = this;

   if (user.isModified('password')) {
      const salt = await bcrupt.genSalt(10);
      const hash = await bcrupt.hash(user.password, salt);
      user.password = hash;
   }

   next();
});

userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
};

userSchema.methods.generateAuthToken = function(){
    let user = this;
    const userObj = {sub: user._id.toHexString(), email: user.email};
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '1d'});
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this;
    const match = await bcrupt.compare(candidatePassword, user.password);
    return match;
}

userSchema.methods.generateRegisterToken = function(){
    let user = this;
    const userObj = { sub: user._id.toHexString()};
    const token = jwt.sign(userObj,process.env.DB_SECRET,{ expiresIn:'10h'})
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = { User };