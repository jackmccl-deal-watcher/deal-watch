const mongoose = require('../../Mongoose.js')
const UserModel = require('../../models/UserModel.js')
require('dotenv').config({ path: require('find-config')('.env') })

const test_username = "test_user_e2e_1"
const test_password = "test_password_1"

describe('Sign Up', () => {
    beforeAll(async () => {
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        expect(await page.title()).not.toBe('');
        await UserModel.deleteMany({ 'username': test_username })
    })
    
    test('Test signup e2e', async () => {
        const signup_button = await page.$('#signup-button')
        await expect(signup_button).not.toBeNull()
        await signup_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const signup_username_input = await page.$('#signup-username-input')
        const signup_password_input = await page.$('#signup-password-input')
        const signup_form_submit_button = await page.$('#signup-form-submit-button')

        await expect(signup_username_input).not.toBeNull()
        await expect(signup_password_input).not.toBeNull()
        await expect(signup_form_submit_button).not.toBeNull()

        await signup_username_input.type(test_username)
        await signup_password_input.type(test_password)

        await signup_form_submit_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const user_dropdown_button = page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()

        const logged_in_username = await page.$eval('#user-dropdown-button', button => button.textContent);
        await expect(logged_in_username).toBe(test_username)
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

        await login_username_input.type(test_username)
        await login_password_input.type(test_password)

        await login_form_submit_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const user_dropdown_button = page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()

        const logged_in_username = await page.$eval('#user-dropdown-button', button => button.textContent);
        await expect(logged_in_username).toBe(test_username)
    })

    afterAll(async () => {
        await UserModel.deleteMany({ 'username': test_username })
    })
})