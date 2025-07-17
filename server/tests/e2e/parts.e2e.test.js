const mongoose = require('../../Mongoose.js')
const UserModel = require('../../models/UserModel.js')
const ComponentTypes = require('./ComponentTypesEnum.js')
require('dotenv').config({ path: require('find-config')('.env') })

const test_username = "test_user_e2e_1"
const test_password = "test_password_1"

describe('Parts', () => {
    beforeAll(async () => {
        await page.goto(process.env.HOSTED_SITE, { waitUntil: 'networkidle0'});
        expect(await page.title()).not.toBe('');
    })
    
    test('Test parts navbar link', async () => {
        const parts_page_link = await page.$('#parts-page-link')
        await expect(parts_page_link).not.toBeNull()
        await parts_page_link.click()
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        const component_part_form = await page.$('#component-part-form')
        await expect(component_part_form).not.toBeNull()
    })

    for (let type of Object.values(ComponentTypes)) {
        test(`Test ${type} evaluation`, async () => {
            const component_form_dropdown = await page.$('#component-part-form-type-selector')
            await expect(component_form_dropdown).not.toBeNull()
            await component_form_dropdown.click()
            
            const component_type_button = await page.$(`component-form-${type}`)
            await expect(component_type_button).not.toBeNull()
            await component_type_button.click()
            
            
        })
    }
    
})