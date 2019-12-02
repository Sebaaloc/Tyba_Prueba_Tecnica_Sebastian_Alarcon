const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    userName: String,
    password: String
});

module.exports = mongoose.model('user_info', UserSchema);