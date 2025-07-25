const { ComponentSpecs, MODULARITIES, MODULE_TYPES, STORAGE_TYPES, EFFICIENCY_RATINGS, BUDGET_MARGIN, COMPARED_KEYS, MODE, PERFORMANCE_ALLOCATION, BUDGET_PRICE_ALLOCATION, BALANCED_PRICE_ALLOCATION, PERFORMANCE_PRICE_ALLOCATION } = require('./BuildConstants.js')
const { fetchPartsInBudget } = require('./FetchParts.js')
const { calcMixedRating } = require('./BuildUtils.js')
const { calcRatingWithPrice, getPerformanceAllocations } = require('./BuildModes.js')
const VARIABLE_TYPES = require('../../utils/VariableTypesEnum.js')

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
    // Issue with ~30% of power-supplies having no efficiency rating, assuming lowest quality_level
    if (a['type'] === 'power-supply' && a['efficiency_rating'] === null) {
        a['efficiency_rating'] = "80+"
    }
    if (b['type'] === 'power-supply' && b['efficiency_rating'] === null) {
        b['efficiency_rating'] = "80+"
    }
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
        componentAllocations = getPerformanceAllocations(componentAllocations, PERFORMANCE_ALLOCATION)
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
                    case (VARIABLE_TYPES.NUMBER): 
                        rating += calcMixedRating(a[key], b[key], allocation)
                        break
                    case (VARIABLE_TYPES.STRING):
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
            return calcRatingWithPrice(a, b, rating, BUDGET_PRICE_ALLOCATION)
        case MODE.BALANCED:
            return calcRatingWithPrice(a, b, rating, BALANCED_PRICE_ALLOCATION)
        case MODE.PERFORMANCE:
            return calcRatingWithPrice(a, b, rating, PERFORMANCE_PRICE_ALLOCATION)
        default:
            throw new Error(`Unknown ranking mode: ${mode}`)
    }
}

const recommendBuild = async (userAllocations, mode) => {
    const partsInBudget = await fetchPartsInBudget(userAllocations, BUDGET_MARGIN)
    let build = {}
    for (let [component_key, components] of Object.entries(partsInBudget)) {
        const componentAllocations = userAllocations['components']
        const sortedComponents = components.sort((a, b) => generalComparator(a, b, componentAllocations, component_key, mode))
        build[component_key] = sortedComponents[sortedComponents.length - 1]
    }
    return build
}

module.exports = { recommendBuild, generalComparator, calcMixedRating }