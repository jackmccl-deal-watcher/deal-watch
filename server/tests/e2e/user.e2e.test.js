const mongoose = require('../../Mongoose.js')
const UserModel = require('../../models/UserModel.js')
const { signup_test_util } = require('./e2e_test_utils.js')
require('dotenv').config({ path: require('find-config')('.env') })

const TEST_USERNAME = "test_user_e2e_1"
const TEST_PASSWORD = "test_password_1"

describe('Sign Up', () => {
    beforeAll(async () => {
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        expect(await page.title()).not.toBe('');
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
    
    test('Test signup e2e', async () => {
        await signup_test_util(TEST_USERNAME, TEST_PASSWORD)
    })

    test('Test logout e2e', async () => {
        const user_dropdown_button = await page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()
        await user_dropdown_button.click()
        
        const user_logout_button = await page.$('#user-logout-button')
        await expect(user_logout_button).not.toBeNull()
        await user_logout_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const login_button = await page.$('#login-button')
        await expect(login_button).not.toBeNull()
    })

    test('Test login e2e', async () => {
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

        await login_username_input.type(TEST_USERNAME)
        await login_password_input.type(TEST_PASSWORD)

        await login_form_submit_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const user_dropdown_button = page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()

        const logged_in_username = await page.$eval('#user-dropdown-button', button => button.textContent);
        await expect(logged_in_username).toBe(TEST_USERNAME)
    })

    afterAll(async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
})

module.exports = signup_test_util