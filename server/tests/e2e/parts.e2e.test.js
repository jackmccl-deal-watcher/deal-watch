const ComponentTypes = require('./ComponentTypesEnum.js')
require('dotenv').config({ path: require('find-config')('.env') })

const delay = (time) => {
    return new Promise( (resolve) => { 
        setTimeout(resolve, time)
    });
}

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

            await delay(500)
            
            const component_type_button = await page.$(`#component-form-${type}`)
            await expect(component_type_button).not.toBeNull()
            await component_type_button.click()
            
            await delay(500)

            const component_form_submit_button = await page.$('.component-form-submit-button')
            await component_form_submit_button.click()

            const loading_circle = await page.waitForSelector('.loading-screen', { timeout: 1000 } )
            await expect(loading_circle).not.toBeNull()

            await page.waitForSelector('.evaluation-results', { timeout: 30000 } )

            const expected_market_value = await page.$('.evaluation-results-expected-value')
            await expect(expected_market_value).not.toBeNull()
            const thirty_day_trend = await page.$('.evaluation-results-trend')
            await expect(thirty_day_trend).not.toBeNull()
        }, 35000)
    }
})