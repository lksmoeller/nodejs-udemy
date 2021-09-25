const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
	'/login',
	[
		body('email')
			.isEmail()
			.withMessage('Please insert an email address.')
			.normalizeEmail(),
		body('password').trim(),
	],
	authController.postLogin
);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject(
							'Email already exists. Please pick another one.'
						);
					}
				});
			})
			.normalizeEmail(),
		body(
			'password',
			'Please enter a password with only numbers and at lest 4 alphanumeric characters'
		)
			.isLength({ min: 4 })
			.isAlphanumeric()
			.trim(),
		body('confirmPassword')
			.trim()
			.custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error("Passwords don't match");
				}
				return true;
			}),
	],
	authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
