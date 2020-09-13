const express = require('express');
const router = new express.Router();
const connectEnsureLogin = require('connect-ensure-login');

const publicController = require('../controllers/public');

router.get('/', connectEnsureLogin.ensureLoggedIn('/login'), function(req, res) {
    res.redirect('/secure');
});
router.get('/login', publicController.getIndex);
router.get('/logout', publicController.logout);

router.post('/login', publicController.login);

module.exports = router;
