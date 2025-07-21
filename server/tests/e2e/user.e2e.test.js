const mongoose = require('../../Mongoose.js')
const UserModel = require('../../models/UserModel.js')
const { signup_test_util, check_message_util, delay } = require('./e2e_test_utils.js')
require('dotenv').config({ path: require('find-config')('.env') })

const TEST_USERNAME = "test_user_e2e_1"
const TEST_PASSWORD = "test_password_1"

const login_test_util = async (username, password) => {
    await delay(500)
    const login_button = await page.$('#login-button')
    await expect(login_button).not.toBeNull()
    await login_button.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const login_username_input = await page.$('#login-username-input')
    const login_password_input = await page.$('#login-password-input')
    const login_form_submit_button = await page.$('#login-form-submit-button')

    await expect(login_username_input).not.toBeNull()
    await expect(login_password_input).not.toBeNull()
    await expect(login_form_submit_button).not.toBeNull()

    await login_username_input.type(username)
    await login_password_input.type(password)

    await login_form_submit_button.click()
}

const logout_test_util = async () => {
    await delay(500)
    const user_dropdown_button = await page.$('#user-dropdown-button')
    await expect(user_dropdown_button).not.toBeNull()
    await user_dropdown_button.click()
    
    const user_logout_button = await page.$('#user-logout-button')
    await expect(user_logout_button).not.toBeNull()
    await user_logout_button.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const login_button = await page.$('#login-button')
    await expect(login_button).not.toBeNull()
}

describe('User', () => {
    beforeAll(async () => {
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        expect(await page.title()).not.toBe('');
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
    
    test('Test user signup', async () => {
        await signup_test_util(TEST_USERNAME, TEST_PASSWORD)
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const user_dropdown_button = page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()
        
        const logged_in_username = await page.$eval('#user-dropdown-button', button => button.textContent);
        await expect(logged_in_username).toBe(TEST_USERNAME)
    })

    test('Test user logout', async () => {
        await logout_test_util()
    })

    test('Test user login', async () => {
        await login_test_util(TEST_USERNAME, TEST_PASSWORD)
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const user_dropdown_button = await page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()

        const logged_in_username = await page.$eval('#user-dropdown-button', button => button.textContent);
        await expect(logged_in_username).toBe(TEST_USERNAME)
        await logout_test_util()
    })

    test('Test login w/ invalid username/password', async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
        await login_test_util(TEST_USERNAME, TEST_PASSWORD)

        await check_message_util('Invalid username or password!')
    })

    test('Test login w/ empty username/password', async () => {
        await page.reload()
        await login_test_util('', '')
        await check_message_util('Invalid username or password!')
    })

    test('Test signup w/ empty username/password', async () => {
        await signup_test_util('', '')
        await check_message_util('Username and password required!')
        await page.reload()

        await signup_test_util(TEST_USERNAME, '')
        await check_message_util('Username and password required!')
        await page.reload()

        await signup_test_util('', TEST_PASSWORD)
        await check_message_util('Username and password required!')
        await page.reload()
    })

    afterAll(async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
})