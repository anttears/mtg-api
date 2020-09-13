const passport = require('passport');
const path = require('path');
const User = require('../models/User');
const uploadJsonSet = require('../actions/uploadJsonSet');

exports.getIndex = (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/web/secure/index.html'));
};

exports.getSignup = (req, res) => {
    return res.sendFile(path.join(__dirname, '../../client/web/secure/signup.html'));
};

exports.signup = async (req, res) => {
    const userData = req.body;
    const existingUser = await User.find({username: userData.username});
    if (existingUser.length) {
        return res.send('userExists');
    }

    return User.register(new User({
        username: userData.username
    }), userData.password, err => {
        if (err) {
            return res.sendStatus(500);
        }

        return passport.authenticate('local')(req, res, () => {
            return res.redirect('/secure');
        });
    });
};

exports.upload = (req, res) => {
    return req.files.setFile.mv(path.join(__dirname, `../_card-sets/${req.files.setFile.name}`), function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            const setData = JSON.parse(req.files.setFile.data);
            uploadJsonSet.uploadSet(setData);
            return res.send('Upload complete');
        } catch (e) {
            console.log(e);
            return res.set(500).send('Error - unable to process file');
        }
    });
};
