const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String}
});
UserSchema.plugin(passportLocalMongoose);
const UserModel = mongoose.model('User', UserSchema);

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

module.exports = UserModel;
