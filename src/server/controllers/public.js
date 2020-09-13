const passport = require('passport');
const path = require('path');

exports.getIndex = (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/web/public/index.html'));
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(500).end();
        }

        if (!user) {
            return res.status(400).end();
        }

        return req.logIn(user, error => {
            if (error) {
                return res.status(500).end();
            }
            return res.redirect('../secure');
        });
    })(req, res, next);
};
