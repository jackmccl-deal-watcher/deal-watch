const mongoose = require('../Mongoose.js')
const UserModel = require('../models/UserModel.js')
const { verifyPassword } = require('../utils/argon.js')
const { getUser, createUser } = require('../utils/UserUtils.js')

const TEST_USERNAME = "test_user_unit_1"
const TEST_PASSWORD = "test_password_1"

describe('User unit tests', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
    test('tests database connection readyState is connected', async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); 
        expect(mongoose.connection.readyState).toBe(1)
    }, 10000)
    
    test('tests getUser function by checking username and password', async () => {
        const newUser = new UserModel()
        
        newUser.username = TEST_USERNAME
        newUser.password = TEST_PASSWORD
    
        await newUser.save()
    
        const user = await getUser(TEST_USERNAME)
        expect(user.username).toBe(TEST_USERNAME)
        expect(user.password).toBe(TEST_PASSWORD)
    })

    test('tests createUser function by checking username and verifyingpassword', async () => {
        await createUser(TEST_USERNAME, TEST_PASSWORD)
    
        const user = await UserModel.findOne({ 'username': TEST_USERNAME }, 'username password')
    
        expect(user.username).toBe(TEST_USERNAME)
        expect(await verifyPassword(TEST_PASSWORD, user.password)).toBe(true)
    })

    test('tests getUser returns null for non-existent user', async () => {
        const user = await getUser('non_existent_user')
        await expect(user).toBeNull()
    })

    test('tests verifyPassword returns false for incorrect password', async () => {
        await createUser(TEST_USERNAME, TEST_PASSWORD)
        const user = await getUser(TEST_USERNAME)
        await expect(await verifyPassword('wrong_password', user.password)).toBe(false)
    })

    test('tests createUser requires username and password', async () => {
        await expect( async () => (await createUser('', ''))).rejects.toThrow('Username and password required!')
        await expect( async () => (await createUser(TEST_USERNAME, ''))).rejects.toThrow('Username and password required!')
        await expect( async () => (await createUser('', TEST_PASSWORD))).rejects.toThrow('Username and password required!')
    })

    test("tests createUser doesn't allow duplicate usernames", async () => {
        await createUser(TEST_USERNAME, TEST_PASSWORD)
        await expect( async () => (await createUser(TEST_USERNAME, TEST_PASSWORD))).rejects.toThrow(`User ${TEST_USERNAME} already exists!`)
    })
    afterEach(async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
})