const mongoose = require('../Mongoose.js')
const UserModel = require('../models/UserModel.js')
const { verifyPassword } = require('../utils/argon.js')
const { getUser, createUser } = require('../utils/UserUtils.js')

test('tests database connection readyState', async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); 
    expect(mongoose.connection.readyState).toBe(1)
}, 10000)

test('tests getUser function by checking username and password', async () => {
    const test_username = "test_user1"
    const test_password = "test_password1"

    await UserModel.findOneAndDelete({ 'username': test_username })

    const newUser = new UserModel()
    
    newUser.username = test_username
    newUser.password = test_password

    await newUser.save()

    const user = await getUser(test_username)
    expect(user.username).toBe(test_username)
    expect(user.password).toBe(test_password)
})

test('tests createUser function by checking username and verifyingpassword', async () => {
    const test_username = "test_user1"
    const test_password = "test_password1"

    await UserModel.findOneAndDelete({ 'username': test_username })

    await createUser(test_username, test_password)

    const user = await UserModel.findOne({ 'username': test_username }, 'username password')

    expect(user.username).toBe(test_username)
    expect(await verifyPassword(test_password, user.password)).toBe(true)
})