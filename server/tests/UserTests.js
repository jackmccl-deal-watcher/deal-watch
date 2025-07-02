const { TestError } = require('../errors/TestError.js')
const { verifyPassword } = require('../utils/argon.js')

const mongoose_connection_test = async () => {
    try {
        const mongoose = require('../Mongoose.js')
        const UserModel = require('../models/UserModel.js')
    
        const newUser = new UserModel()
    
        newUser.username = "first user!"
        newUser.password = "test password"
    
        await newUser.save()
        
        console.log("mongoose_connection_test: Passed")
        return true
    } catch (error) {
        console.log("mongoose_connection_test: Failed")
        throw new TestError("mongoose_connection_test: Failed")
    }
}

const getUser_test = async () => {
    const { createUser, getUser } = require('../utils/UserUtils.js')
    const UserModel = require('../models/UserModel.js')

    const test_username = "test_user1"
    const test_password = "test_password1"

    await UserModel.findOneAndDelete({ 'username': test_username })

    const newUser = new UserModel()
    
    newUser.username = test_username
    newUser.password = test_password

    await newUser.save()

    const user = await getUser(test_username)
    if (user.username && user.username === test_username 
        && user.password && user.password == test_password) {
        console.log("getUser_test: Passed")
        return true
    } else {
        console.log("getUser_test: Failed")
        throw new TestError("getUser_test: Failed")
    }
}

const createUser_test = async () => {
    const { createUser, getUser } = require('../utils/UserUtils.js')
    const UserModel = require('../models/UserModel.js')

    const test_username = "test_user1"
    const test_password = "test_password1"

    await UserModel.findOneAndDelete({ 'username': test_username })

    await createUser(test_username, test_password)

    const user = await UserModel.findOne({ 'username': test_username }, 'username password')

    if (user.username && user.username === test_username 
        && user.password && verifyPassword(test_password, user.password)) {
        console.log("createUser_test: Passed")
        return true
    } else {
        console.log("createUser_test: Failed")
        throw new TestError("createUser_test: Failed")
    }
}

const running_tests = async () => {
    try {
        await mongoose_connection_test()
        await getUser_test()
        await createUser_test()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()