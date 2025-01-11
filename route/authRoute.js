const router = require('express').Router();
const { signUp, EmailVerification, login, forgotPassword, resetPassword } = require('../controller/authController');

router.route('/signUp').post(signUp);

router.route('/verify-email').get(EmailVerification);

router.route('/login').post(login);

router.route('/forgot-password').post(forgotPassword);

router.route('/reset-password').post(resetPassword);

module.exports = router;