const mongoose = require('../Mongoose.js')
const UserModel = require('../models/UserModel.js')

// Returns user by username, otherwise returns null
const getUser = async (username) => {
    let user = await UserModel.findOne({ 'username': username }, 'username password')
    return user
}

// Creates user, throws error if username already taken
const createUser = async (username, password) => {
    let user = await UserModel.findOne({ 'username': username }, 'username password')
    if (user) {
        throw new Error(`User ${username} already exists!`)
    }
    const newUser = new UserModel()
    newUser.username = username
    newUser.password = password
    await newUser.save()
    return newUser
}

module.exports = { createUser, getUser}