const { ComponentSpecs, MODULARITIES, MODULE_TYPES, STORAGE_TYPES, EFFICIENCY_RATINGS, BUDGET_MARGIN, COMPARED_KEYS, MODE} = require('./BuildConstants.js')
const { fetchPartsInBudget } = require('./FetchParts.js')
const { calcMixedRating } = require('./BuildUtils.js')
const { calcRatingWithPrice, getPerformanceAllocations } = require('./BuildModes.js')

const calcPartColorScore = (part, color_index, color_preferences) => {
    let part_color_rating = 0
    const current_color = color_preferences[color_index]
    if (part[ComponentSpecs.COLOR] === current_color) {
        part_color_rating += color_preferences.length - color_index
    } else if (part[ComponentSpecs.COLOR].includes(current_color) || current_color.includes(part[ComponentSpecs.COLOR])) {
        part_color_rating += (color_preferences.length - color_index) / 2
    }
    return part_color_rating
}

const calcColorRating = (a, b, color_allocation_dict) => {
    const preferenceColors = color_allocation_dict['colors']
    let a_color_rating = 0
    let b_color_rating = 0
    for (let color_index in preferenceColors) {
        a_color_rating += calcPartColorScore(a, color_index, preferenceColors)
        b_color_rating += calcPartColorScore(b, color_index, preferenceColors)
    }
    const colorAllocation = color_allocation_dict['allocation']
    return calcMixedRating(a_color_rating, b_color_rating, colorAllocation)
}

const calcSlidingQualityRating = (a, b, spec_allocation, quality_levels, spec_key) => {
    let a_key_value_rating = 0
    let b_key_value_rating = 0

    let a_key_value_quality_index = quality_levels.indexOf(a[spec_key])
    let b_key_value_quality_index = quality_levels.indexOf(b[spec_key])

    if (a_key_value_quality_index === -1) {
        throw new Error(`Unknown part quality spec: ${a[spec_key]}`)
    }
    if (b_key_value_quality_index === -1) {
        throw new Error(`Unknown part quality spec: ${b[spec_key]}`)
    }

    a_key_value_rating += a_key_value_quality_index / quality_levels.length
    b_key_value_rating += b_key_value_quality_index / quality_levels.length

    return calcMixedRating(a_key_value_rating, b_key_value_rating, spec_allocation)
}

const generalComparator = (a, b, componentAllocations, component_key, mode) => {
    if (mode === MODE.PERFORMANCE) {
        // Redistributes allocations based on performance, then creates rating
        componentAllocations = getPerformanceAllocations(componentAllocations, 0.2)
    }
    let rating = 0
    const componentDict = componentAllocations[component_key]
    const componentPropertyKeys = Object.keys(componentDict).filter(key => COMPARED_KEYS.includes(key))
    for (let key of componentPropertyKeys) {
        const allocation = componentDict[key]
        switch (key) {
            case (ComponentSpecs.COLOR):
                rating += calcColorRating(a, b, allocation)
                break
            case (ComponentSpecs.MODULAR):
                rating += calcSlidingQualityRating(a, b, allocation, MODULARITIES, key)
                break
            case (ComponentSpecs.MODULE_TYPE):
                rating += calcSlidingQualityRating(a, b, allocation, MODULE_TYPES, key)
                break
            case (ComponentSpecs.STORAGE_TYPE):
                rating += calcSlidingQualityRating(a, b, allocation, STORAGE_TYPES, key)
                break
            case (ComponentSpecs.EFFICIENCY_RATING):
                rating += calcSlidingQualityRating(a, b, allocation, EFFICIENCY_RATINGS, key)
                break
            default:
                switch (typeof a[key]) {
                    case ('number'): 
                        rating += calcMixedRating(a[key], b[key], allocation)
                        break
                    case ('string'):
                        // form_factor or socket, allocation is the form_factor/socket value inputed by user as preference
                        if (a[key] === allocation) {
                            rating += 1000
                        }
                        if (b[key] === allocation) {
                            rating -= 1000
                        }
                        break
                    }
        }
    }
    switch (mode) {
        case MODE.BUDGET:
            // Modifies rating to also account for price
            return calcRatingWithPrice(a, b, rating, 0.3)
        case MODE.DEFAULT:
            return rating
        default:
            throw new Error(`Unknown ranking mode: ${mode}`)
    }
}

const recommendBuilds = async (userAllocations) => {
    const partsInBudget = await fetchPartsInBudget(userAllocations, BUDGET_MARGIN)
    let rankedComponents = {}
    for (let [component_key, components] of Object.entries(partsInBudget)) {
        const componentAllocations = userAllocations['components']
        rankedComponents[component_key] = components.sort((a, b) => generalComparator(a, b, componentAllocations, component_key, MODE.DEFAULT))
    }
}

module.exports = { recommendBuilds, generalComparator, calcMixedRating }