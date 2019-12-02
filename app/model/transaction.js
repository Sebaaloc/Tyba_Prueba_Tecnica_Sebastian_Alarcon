const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    userName: String,
    date: String,
    cityQueried: String
});

module.exports = mongoose.model('transaction', UserSchema);