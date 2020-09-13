const express = require('express');
const router = new express.Router();
const connectEnsureLogin = require('connect-ensure-login');

const secureController = require('../controllers/secure');

router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), secureController.getIndex);
router.get('/signup', connectEnsureLogin.ensureLoggedIn('/login'), secureController.getSignup);

router.post('/signup', connectEnsureLogin.ensureLoggedIn('/login'), secureController.signup);
router.post('/upload', connectEnsureLogin.ensureLoggedIn('/login'), secureController.upload);

module.exports = router;
