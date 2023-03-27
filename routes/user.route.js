const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

//MIDDLEWARE
const auth = require('../middleware/auth');

router.route('/profile')
.get(auth('readOwn','profile'), userController.profile)
         //action , recources
.post(auth('updateOwn', 'profile'), userController.updateProfile);

router.route('/email')
.patch(auth('updateOwn', 'profile'), userController.updateUserEmail);

router.route('/verify').get(userController.verifyAccount);

module.exports = router;