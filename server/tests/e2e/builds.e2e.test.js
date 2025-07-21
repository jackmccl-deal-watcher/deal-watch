const UserModel = require('../../models/UserModel');
const BuildModel = require('../../models/BuildModel')
const { signup_test_util } = require('./e2e_test_utils');
require('dotenv').config({ path: require('find-config')('.env') })

const LOGIN_TO_SAVE_MESSAGE = 'Login to save builds!'
const TEST_USERNAME = "test_builds_e2e_1"
const TEST_PASSWORD = "test_password_1"
const TEST_BUILD_TITLE = 'test_builds_e2e_build_1'
const TEST_BUILD_CHANGED_TITLE = 'test_builds_e2e_build_1_changed'

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

const set_build_title_input = async (value) => {
    const build_textfield = await page.$('.save-build-textfield')
    await build_textfield.click({clickCount: 3})
    for (const char of value) {
        await page.keyboard.press(char)
    }
}

const check_build_title_input = async (value) => {
    const build_title_input_text = await page.$eval('.save-builds-title-input', input => input.value);
    await expect(build_title_input_text).toBe(value)
}

const get_save_build_button = async () => {
    return await page.$('.save-builds-button')
}

const click_save_build_button = async () => {
    const save_build_button = await get_save_build_button()
    await expect(save_build_button).not.toBeNull()
    await save_build_button.click()
}

describe('Builds', () => {
    beforeAll(async () => {
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        await page.setViewport({ width: 1366, height: 768});
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
        await signup_test_util(TEST_USERNAME, TEST_PASSWORD)

        await generate_builds_util()   
        
        await get_build_title_input();
    }, 20000)

    test('Test save build', async () => {
        const logged_in_user = await UserModel.findOne({ 'username': TEST_USERNAME })
        await expect(logged_in_user.username).toBe(TEST_USERNAME)
        await BuildModel.deleteMany({ 'title': TEST_BUILD_TITLE, 'user': logged_in_user.id })

        await set_build_title_input(TEST_BUILD_TITLE)

        await click_save_build_button()

        const user_dropdown_button = await page.$('#user-dropdown-button')
        await expect(user_dropdown_button).not.toBeNull()
        await user_dropdown_button.click()

        const nav_saved_builds_button = await page.$('#user-saved-builds-button')
        await expect(nav_saved_builds_button).not.toBeNull()
        await nav_saved_builds_button.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        await check_build_title_input(TEST_BUILD_TITLE)
    }, 20000)

    test('Test rename build', async () => {
        await click_save_build_button()

        await set_build_title_input(TEST_BUILD_CHANGED_TITLE)

        await click_save_build_button()

        await page.reload({ waitUntil: 'networkidle0' })

        await check_build_title_input(TEST_BUILD_CHANGED_TITLE)
    }, 20000)

    test('Test unsave build', async () => {
        await click_save_build_button()

        await page.reload({ waitUntil: 'networkidle0' })

        const build = await page.$('.build')

        await expect(build).toBeNull()
    }, 20000)

    afterAll( async () => {
        await UserModel.deleteMany({ 'username': TEST_USERNAME })
    })
})