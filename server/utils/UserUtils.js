const mongoose = require('../Mongoose.js')
const UserModel = require('../models/UserModel.js')

const getUser = async (username) => {
    try {
        let user = await UserModel.findOne({ 'username': username }, 'username password')
        return user
    } catch (error) {
        console.error(error)
    }
}

const createUser = async (username, password) => {
    try {
        let user = await UserModel.findOne({ 'username': username }, 'username password')
        if (user) {
            console.error(`User ${username} already exists!`)
            return false
        }
        const newUser = new UserModel()
        newUser.username = username
        newUser.password = password
        await newUser.save()
        return newUser
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = { createUser, getUser}