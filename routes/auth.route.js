const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/test', authController.test);

module.exports = router;