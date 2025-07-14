const UserModel = require('../models/UserModel.js')
const { hashPassword } = require('./argon.js')
const { UserCreateError } = require('../errors/UserErrors.js')

// Returns user by username, otherwise returns null
const getUser = async (username) => {
    let user = await UserModel.findOne({ 'username': username }, 'username password')
    return user
}

// Creates user, throws error if username already taken
const createUser = async (username, password) => {
    if (!username || !password) {
        throw new UserCreateError(`Username and password required!`)
    }
    let user = await UserModel.findOne({ 'username': username }, 'username password')
    if (user) {
        throw new UserCreateError(`User ${username} already exists!`)
    }
    const hashedPassword = await hashPassword(password)
    const newUser = new UserModel()
    newUser.username = username
    newUser.password = hashedPassword
    await newUser.save()
    return newUser
}

module.exports = { createUser, getUser}