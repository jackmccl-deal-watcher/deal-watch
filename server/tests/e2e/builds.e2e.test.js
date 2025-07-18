const UserModel = require('../../models/UserModel');
const BuildModel = require('../../models/BuildModel')
const { signup_test_util } = require('./e2e_test_utils');
require('dotenv').config({ path: require('find-config')('.env') })

const LOGIN_TO_SAVE_MESSAGE = 'Login to save builds!'
const test_username = "test_builds_e2e_1"
const test_password = "test_password_1"

const navigate_to_builds_util = async () => {
    const builds_page_link = await page.$('#builds-page-link')
    await expect(builds_page_link).not.toBeNull()
    await builds_page_link.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const budget_input_field = await page.$('.budget-input')
    await expect(budget_input_field).not.toBeNull() 
}

const generate_builds_util = async () => {
    await navigate_to_builds_util()

    const generate_builds_button = await page.$('.generate-build-form-submit-button')
    await expect(generate_builds_button).not.toBeNull()
    await generate_builds_button.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const loading_circle = await page.waitForSelector('.loading-screen', { timeout: 1000 } )
    await expect(loading_circle).not.toBeNull()

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const build = await page.waitForSelector('.build', { timeout: 15000 } )
    await expect(build).not.toBeNull()
}

const get_build_title_input = async () => {
    return await page.$('.save-builds-title-input')
}

const get_save_build_button = async () => {
    return await page.$('.save-builds-button')
}

let recorder = null
describe('Builds', () => {
    beforeAll(async () => {
        recorder =  await page.screencast({path: 'Test_generate_builds_recording.webm'});
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        expect(await page.title()).not.toBe('');
    })
    
    test('Test builds navbar link', async () => {
        await navigate_to_builds_util()
    })

    test('Test generate builds not logged in', async () => {
        await generate_builds_util()

        const save_builds_text = await page.$eval('.save-builds', save_build => save_build.textContent);
        await expect(save_builds_text).toBe(LOGIN_TO_SAVE_MESSAGE)
    }, 20000)

    test('Test generate builds logged in', async () => {
        await signup_test_util(test_username, test_password)

        await generate_builds_util()   
        
        const save_builds_title_input = get_build_title_input();
        await expect(save_builds_title_input).not.toBeNull()
    }, 20000)

    test('Test save build', async () => {
        const test_build_title = 'test_builds_e2e_build_1'
        const test_build_changed_title = 'test_builds_e2e_build_2'

        const save_builds_title_input = get_build_title_input();
        await expect(save_builds_title_input).not.toBeNull()

        const logged_in_user = await UserModel.find({ 'username': test_username })
        await expect(logged_in_user.username).toBe(test_username)
        await BuildModel.deleteMany({ 'title': test_build_title, 'user': logged_in_user.id })

        await save_builds_title_input.type(test_build_title)

        const save_builds_button = await page.$('.save-builds-button')
        await expect(save_builds_button).not.toBeNull()
        await save_builds_button.click()

        const user_dropdown_button = await page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()
        await user_dropdown_button.click()

        const nav_saved_builds_button = await page.$('#user-saved-builds-button')
        await expect(nav_saved_builds_button).not.toBeNull()
        await nav_saved_builds_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const saved_build_title_input = await page.$('.save-builds-title-input');
        await expect(saved_build_title_input).not.toBeNull()
        const saved_build_title_input_text = await page.$eval('.saved-builds-title-input', input => input.value);
        await expect(saved_build_title_input_text).toBe(test_build_title)

        const saved_build_toggle_save_button = await page.$('.save-builds-button')
        await expect(saved_build_toggle_save_button).not.toBeNull()
        await saved_build_toggle_save_button.click()

        await saved_build_title_input.type(test_build_changed_title)

        await saved_build_toggle_save_button.click()

        await page.reload({ waitUntil: 'networkidle0' })
    })

    test('Test rename build', async () => {

    })

    afterAll( async () => {
        recorder.stop()
    })
})