const { calcMixedRating } = require('./BuildUtils.js')
const { ComponentSpecs, COMPARED_KEYS, PERFORMANCE_PRIORITIES } = require('./BuildConstants.js')

const calcPriceRating = (a, b, priceAllocation) => {
    let a_price = 0
    let b_price = 0

    if (a[ComponentSpecs.THIRTY_DAY_AVERAGE] > 0) {
        a_price = a[ComponentSpecs.THIRTY_DAY_AVERAGE]
    } else {
        a_price = a[ComponentSpecs.PCPP_PRICE]
    }
    if (b[ComponentSpecs.THIRTY_DAY_AVERAGE] > 0) {
        b_price = b[ComponentSpecs.THIRTY_DAY_AVERAGE]
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
                    break
                case 'dict':
                    componentDict[key]['allocation'] *= (1-performanceAllocation)
                    break
            }
            if (PERFORMANCE_PRIORITIES.includes(key)) {
                componentDict[key] += performanceAllocation / numPriorityPropertiesInComponent
            }
        }
    }
    return componentAllocationsWithPerformance
}

module.exports = { calcRatingWithPrice, getPerformanceAllocations }