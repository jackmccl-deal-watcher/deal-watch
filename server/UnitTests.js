const mongoose_test = () => {
    const mongoose = require('./Mongoose.js')

    const UserSchema = new mongoose.Schema({
        username: String,
        password: String,
    })

    const UserModel = mongoose.model('User', UserSchema)

    const newUser = new UserModel()

    newUser.username = "first user!"
    newUser.password = "test password"

    newUser.save()
}

const running_tests = () => {
    mongoose_test()
}

running_tests()