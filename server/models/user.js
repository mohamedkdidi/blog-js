const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    email: {type:String},
    username: {type:String},
    password: {type:String},
    lastlogin: {type:Date}
});

// Pre-save of user's hash password to database
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('users', UserSchema, 'users');