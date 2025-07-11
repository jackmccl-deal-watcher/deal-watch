const { ComponentSpecs, MODEL_DICT, MODULARITIES, MODULE_TYPES, STORAGE_TYPES, EFFICIENCY_RATINGS, BUDGET_MARGIN, COMPARED_KEYS, PERFORMANCE_PRIORITIES, MODE, BUDGET_PRICE_ALLOCATION, BALANCED_PRICE_ALLOCATION, PERFORMANCE_PRICE_ALLOCATION, PERFORMANCE_ALLOCATION } = require('./BuildConstants.js')

const fetchPartsInBudget = async (userAllocations, budget_margin) => {
    let partsDict = {}
    for (let [component_key, component] of Object.entries(userAllocations.components)) {
        const componentBudget = userAllocations.budget * component.allocation
        const componentBudgetLow = componentBudget - componentBudget * budget_margin
        const componentBudgetHigh = componentBudget
        
        const componentModel = MODEL_DICT[component_key]
        const partsInBudget = await componentModel.find( { 
            $or: [
                {
                    $and: [
                        { thirtyDayAverage: {$gte: componentBudgetLow} },
                        { thirtyDayAverage: {$lte: componentBudgetHigh} },
                    ]
                },
                {
                    $and: [
                        { thirtyDayAverage: -1},
                        { pcppPrice: {$gte: componentBudgetLow} },
                        { pcppPrice: {$lte: componentBudgetHigh} },
                    ]
                },
            ]
        })
        const partsInBudgetPriceFixed = partsInBudget.map((part) => {
            if (part.thirtyDayAverage > 0) {
                part.pcppPrice = -1
            }
            return part
        })
        partsDict[component_key] = partsInBudgetPriceFixed   
    }
    return partsDict
}

const calcMixedRating = (a_rating, b_rating, allocation) => {
    if ((a_rating + b_rating) === 0) {
        return 0
    }
    return Math.sign(a_rating - b_rating) * allocation * (2/3) 
                + allocation * (1/3) * (a_rating - b_rating) / (a_rating+b_rating)
}

const calcColorRating = (a, b, color_allocation_dict) => {
    const preferenceColors = color_allocation_dict['colors']
    let a_color_rating = 0
    let b_color_rating = 0
    for (let color_index in preferenceColors) {
        if (a[ComponentSpecs.COLOR] === preferenceColors[color_index]) {
            a_color_rating += preferenceColors.length - color_index
        } else if (a[ComponentSpecs.COLOR].includes(preferenceColors[color_index]) || preferenceColors[color_index].includes(a[ComponentSpecs.COLOR])) {
            a_color_rating += (preferenceColors.length - color_index) / 2
        }
        if (b[ComponentSpecs.COLOR] === preferenceColors[color_index]) {
            b_color_rating += preferenceColors.length - color_index
        } else if (b[ComponentSpecs.COLOR].includes(preferenceColors[color_index]) || preferenceColors[color_index].includes(b[ComponentSpecs.COLOR])) {
            b_color_rating += (preferenceColors.length - color_index) / 2
        }
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

const calcPriceRating = (a, b, priceAllocation) => {
    let a_price = 0
    let b_price = 0

    if (a[ComponentSpecs.THIRTYDAYAVERAGE] > 0) {
        a_price = a[ComponentSpecs.THIRTYDAYAVERAGE]
    } else {
        a_price = a[ComponentSpecs.PCPP_PRICE]
    }
    if (b[ComponentSpecs.THIRTYDAYAVERAGE] > 0) {
        b_price = b[ComponentSpecs.THIRTYDAYAVERAGE]
    } else {
        b_price = b[ComponentSpecs.PCPP_PRICE]
    }
    return calcMixedRating(b_price, a_price, priceAllocation)
}

const calcRatingWithPrice = (a, b, nonPriceRating, priceAllocation) => {
    const newNonePriceRating = nonPriceRating * (1-priceAllocation)
    return newNonePriceRating + calcPriceRating(a, b, priceAllocation)
}

const getPerformanceAllocations = (componentAllocations, performanceAllocation) => {
    const componentAllocationsWithPerformance = JSON.parse(JSON.stringify(componentAllocations))
    for (let component_key of Object.keys(componentAllocations)) {
        const componentDict = componentAllocationsWithPerformance[component_key]
        const componentPropertyKeys = Object.keys(componentDict).filter(key => COMPARED_KEYS.includes(key))
        let numPriorityPropertiesInComponent = 0
        for (let prop_key of PERFORMANCE_PRIORITIES) {
            if (componentPropertyKeys.includes(prop_key)) {
                numPriorityPropertiesInComponent += 1
            }
        }
        for (let key of componentPropertyKeys) {
            switch (typeof componentDict[key]) {
                case 'number':
                    componentDict[key] *= (1-performanceAllocation)
                case 'dict':
                    componentDict[key]['allocation'] *= (1-performanceAllocation)
            }
            if (PERFORMANCE_PRIORITIES.includes(key)) {
                componentDict[key] += performanceAllocation / numPriorityPropertiesInComponent
            }
        }
    }
    return componentAllocationsWithPerformance
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

module.exports = { recommendBuild, generalComparator, getPerformanceAllocations, MODULARITIES, MODULE_TYPES, EFFICIENCY_RATINGS, STORAGE_TYPES, PERFORMANCE_PRIORITIES, COMPARED_KEYS, MODE }