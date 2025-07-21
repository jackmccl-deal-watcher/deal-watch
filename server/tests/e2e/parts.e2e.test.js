const ComponentTypes = require('./ComponentTypesEnum.js');
const { delay, check_message_util } = require('./e2e_test_utils.js');
require('dotenv').config({ path: require('find-config')('.env') })

const component_form_selection_test_util = async (type) => {
    const component_form_dropdown = await page.$('#component-part-form-type-selector')
    await expect(component_form_dropdown).not.toBeNull()
    await component_form_dropdown.click()

    await delay(500)
    
    const component_type_button = await page.$(`#component-form-${type}`)
    await expect(component_type_button).not.toBeNull()
    await component_type_button.click()
    
    await delay(500)
}

const evaluate_component_test_util = async () => {
    const component_form_submit_button = await page.$('.component-form-submit-button')
    await component_form_submit_button.click()
}

const component_evaluation_test_util = async (type) => {
    await component_form_selection_test_util(type)

    await evaluate_component_test_util()
    const loading_circle = await page.waitForSelector('.loading-screen', { timeout: 1000 } )
    await expect(loading_circle).not.toBeNull()
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
            await component_evaluation_test_util(type)

            await page.waitForSelector('.evaluation-results', { timeout: 30000 } )

            const expected_market_value = await page.$('.evaluation-results-expected-value')
            await expect(expected_market_value).not.toBeNull()
            const thirty_day_trend = await page.$('.evaluation-results-trend')
            await expect(thirty_day_trend).not.toBeNull()
        }, 35000)
    }

    test('Test no comparable parts', async () => {
        await component_form_selection_test_util('cpu')
        
        const cpu_scores_slider_input = await page.$('.cpu-cores-slider-input')
        await expect(cpu_scores_slider_input).not.toBeNull()

        const bounding_box = await cpu_scores_slider_input.boundingBox()
        const starting_X = bounding_box.x + bounding_box.width / 2
        const starting_Y = bounding_box.y + bounding_box.height / 2
        const ending_X = starting_X + 40
        
        await page.mouse.move(starting_X, starting_Y)
        await page.mouse.down()
        await page.mouse.move(ending_X, starting_Y)
        await page.mouse.up()

        await evaluate_component_test_util()

        await delay(1000)

        await check_message_util("No comparable parts with enough listing data!")
    })
})