const mongoose = require('./Mongoose.js')
const UserModel = require('./UserModel.js')

describe('Sign Up', () => {
    beforeAll(async () => {
        await page.goto(import.meta.env.VITE_HOSTED_SITE);
    })
    test('Login and signup buttons exist', async () => {
        await expect(page.$('#login-button')).toBeDefined()
        await expect(page.$('#signup-button')).toBeDefined()
    })
    test('Test signup e2e', async () => {
        const test_username = "test_user_1"
        const test_password = "test_password_1"

        await UserModel.findOneAndDelete({ 'username': test_username })

        await page.click('#login-button')

        await expect(page.$('#login-username-input')).toBeDefined()
        await expect(page.$('#login-password-input')).toBeDefined()
        await expect(page.$('#login-form-submit-button')).toBeDefined()

        await page.type('#login-username-input', test_username)
        await page.type('#login-password-input', test_password)

        await page.click('#login-form-submit-button')

        await expect(page.$('#user-dropdown-button')).toBeDefined()

        const logged_in_username = await page.$('#user-dropdown-button', button => button.textContent.trim())
        await expect(logged_in_username).toBe(test_username)
    })
})