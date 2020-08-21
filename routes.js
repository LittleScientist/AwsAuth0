var express = require('express');
var router = express.Router();
var authController = require('./Controllers/AwsAuthController');

router.post('/auth/register', authController.register);
router.post('/auth/confirm', authController.confirm_user);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

module.exports = router;