const mongoose = require('../Mongoose.js')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserModel = mongoose.model('User', UserSchema, 'users')

module.exports = UserModel