const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    token: String,
    expiration: String,
    userName: String
});

module.exports = mongoose.model('token', UserSchema);