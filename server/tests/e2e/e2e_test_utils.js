const mongoose = require('../../Mongoose.js')
const UserModel = require('../../models/UserModel.js')

const delay = (time) => {
    return new Promise( (resolve) => { 
        setTimeout(resolve, time)
    });
}

const signup_test_util = async (username, password) => {
    await UserModel.deleteMany({ 'username': username })
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

    await signup_username_input.type(username)
    await signup_password_input.type(password)

    await signup_form_submit_button.click()
    
    await delay(500)
}

const check_message_util = async (correct_message) => {
    await delay(500)
    const actual_message = await page.$eval('#message', message_div => message_div.textContent);
    await expect(actual_message).toBe(correct_message)
}

module.exports = { delay, signup_test_util, check_message_util }