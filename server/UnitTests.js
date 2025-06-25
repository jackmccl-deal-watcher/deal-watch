const mongoose_connection_test = async () => {
    try {
        const mongoose = require('./Mongoose.js')
        const UserModel = require('./models/UserModel.js')
    
        const newUser = new UserModel()
    
        newUser.username = "first user!"
        newUser.password = "test password"
    
        await newUser.save()
        
        console.log("mongoose_connection_test: Passed")
        return true
    } catch (error) {
        console.error("mongoose_connection_test: Failed")
        return false
    }
}

const mongoose_getUser_test = async () => {
    const { createUser, getUser } = require('./utils/UserUtils.js')
    const UserModel = require('./models/UserModel.js')

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
        console.log("mongoose_getUser_test: Passed")
        return true
    } else {
        console.error("mongoose_getUser_test: Failed")
        return false
    }
}

const mongoose_createUser_test = async () => {
    const { createUser, getUser } = require('./utils/UserUtils.js')
    const UserModel = require('./models/UserModel.js')

    const test_username = "test_user1"
    const test_password = "test_password1"

    await UserModel.findOneAndDelete({ 'username': test_username })

    await createUser(test_username, test_password)

    const user = await UserModel.findOne({ 'username': test_username }, 'username password')

    if (user.username && user.username === test_username 
        && user.password && user.password == test_password) {
        console.log("mongoose_createUser_test: Passed")
        return true
    } else {
        console.error("mongoose_createUser_test: Failed")
        return false
    }
}

const running_tests = async () => {
    await mongoose_connection_test()
    await mongoose_getUser_test()
    await mongoose_createUser_test()
    process.exit(0)
}

running_tests()