const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')
const HardDriveModel = require('../../models/part_models/HardDriveModel.js')
const PowerSupplyModel = require('../../models/part_models/PowerSupplyModel.js')
const CaseModel = require('../../models/part_models/CaseModel.js')
const { userAllocations500 } = require('../../tests/builds/test_builds.js')
const getListingLink = require('./ListingLink.js')

const MODEL_DICT = {
    'cpu': CPUModel,
    'video-card': VideoCardModel,
    'motherboard': MotherboardModel,
    'memory': MemoryModel,
    'hard-drive': HardDriveModel,
    'power-supply': PowerSupplyModel,
    'case': CaseModel,
}

// In order of "increasing" quality
const MODULARITIES = [
    "No", 
    "Semi", 
    "Full",
]
const MODULE_TYPES = [
    "DDR",
    "DDR2", 
    "DDR3", 
    "DDR4",
]
const STORAGE_TYPES = [
    "HDD", 
    "Hybrid", 
    "SSD",
]

const EFFICIENCY_RATINGS = [
    "80+",
    "80+ Bronze",
    "80+ Silver",
    "80+ Gold",
    "80+ Platinum",
    "80+ Titanium"
]

const MARGIN = 0.10

const COMPARED_KEYS = [
    'cores',
    'base_clock',
    'boost_clock',
    'vram',
    'ram_slots',
    'max_ram',
    'socket',
    'form_factor',
    'speed',
    'total_size',
    'module_type',
    'capacity',
    'storage_type',
    'wattage',
    'efficiency_rating',
    'modular',
    'internal_bays',
    'color',
]

const PERFORMANCE_PRIORITIES = [
    'base_clock', 
    'boost_clock', 
    'max_ram', 
    'total_size', 
    'module_type', 
    'storage_type',
    'wattage',
]

const MODE = Object.freeze({
    DEFAULT: 'default',
    BUDGET: 'budget',
    PERFORMANCE: 'performance',
});

const fetchPartsInBudget = async (userAllocations, margin) => {
    let partsDict = {}
    for (let [component_key, component] of Object.entries(userAllocations.components)) {
        const componentBudget = userAllocations.budget * component.allocation
        const componentBudgetLow = componentBudget - componentBudget * margin
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
        partsDict[component_key] = partsInBudget
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
        if (a['color'] === preferenceColors[color_index]) {
            a_color_rating += preferenceColors.length - color_index
        } else if (a['color'].includes(preferenceColors[color_index]) || preferenceColors[color_index].includes(a['color'])) {
            a_color_rating += (preferenceColors.length - color_index) / 2
        }
        if (b['color'] === preferenceColors[color_index]) {
            b_color_rating += preferenceColors.length - color_index
        } else if (b['color'].includes(preferenceColors[color_index]) || preferenceColors[color_index].includes(b['color'])) {
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

    if (a['thirtyDayAverage'] > 0) {
        a_price = a['thirtyDayAverage']
    } else {
        a_price = a['pcppPrice']
    }
    if (b['thirtyDayAverage'] > 0) {
        b_price = b['thirtyDayAverage']
    } else {
        b_price = b['pcppPrice']
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
        componentAllocations = getPerformanceAllocations(componentAllocations, 0.2)
    }
    let rating = 0
    const componentDict = componentAllocations[component_key]
    const componentPropertyKeys = Object.keys(componentDict).filter(key => COMPARED_KEYS.includes(key))
    for (let key of componentPropertyKeys) {
        const allocation = componentDict[key]
        switch (key) {
            case ('color'):
                rating += calcColorRating(a, b, allocation)
                break
            case ('modular'):
                rating += calcSlidingQualityRating(a, b, allocation, MODULARITIES, key)
                break
            case ('module_type'):
                rating += calcSlidingQualityRating(a, b, allocation, MODULE_TYPES, key)
                break
            case ('storage_type'):
                rating += calcSlidingQualityRating(a, b, allocation, STORAGE_TYPES, key)
                break
            case ('efficiency_rating'):
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

const recommendBuild = async (userAllocations, mode) => {
    const partsInBudget = await fetchPartsInBudget(userAllocations, MARGIN)
    let build = {}
    for (let [component_key, components] of Object.entries(partsInBudget)) {
        const componentAllocations = userAllocations['components']
<<<<<<< HEAD
        const sortedComponents = components.sort((a, b) => generalComparator(a, b, componentAllocations, component_key, mode))
        build[component_key] = sortedComponents[sortedComponents.length - 1]
=======
        rankedComponents[component_key] = components.sort((a, b) => generalComparator(a, b, componentAllocations, component_key, MODE.DEFAULT))
>>>>>>> jackmccl/builds-varied-builds
    }
    console.log(build)
}
recommendBuild(userAllocations500)

<<<<<<< HEAD
module.exports = { recommendBuild, generalComparator, getPerformanceAllocations, MODULARITIES, MODULE_TYPES, EFFICIENCY_RATINGS, STORAGE_TYPES, PERFORMANCE_PRIORITIES, COMPARED_KEYS }
=======
recommendBuilds(userAllocations500)

module.exports = { recommendBuilds, generalComparator, getPerformanceAllocations, MODULARITIES, MODULE_TYPES, EFFICIENCY_RATINGS, STORAGE_TYPES, PERFORMANCE_PRIORITIES, COMPARED_KEYS, MODE }
>>>>>>> jackmccl/builds-varied-builds
