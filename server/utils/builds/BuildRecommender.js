const CPUModel = require('../../models/part_models/CPUModel.js')
const VideoCardModel = require('../../models/part_models/VideoCardModel.js')
const MotherboardModel = require('../../models/part_models/MotherboardModel.js')
const MemoryModel = require('../../models/part_models/MemoryModel.js')
const HardDriveModel = require('../../models/part_models/HardDriveModel.js')
const PowerSupplyModel = require('../../models/part_models/PowerSupplyModel.js')
const CaseModel = require('../../models/part_models/CaseModel.js')
const userAllocations500 = require('../../tests/builds/test_builds.js')

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
    'internal-bays',
    'color'
]

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
    const total_color_rating = a_color_rating + b_color_rating
    return colorAllocation * (a_color_rating - b_color_rating) / total_color_rating
}

const calcSlidingQualityRating = (a, b, spec_allocation, quality_levels, spec_key) => {
    let a_key_value_rating = 0
    let b_key_value_rating = 0

    let a_key_value_quality_index = quality_levels.indexOf(a[spec_key])
    let b_key_value_quality_index = quality_levels.indexOf(b[spec_key])

    a_key_value_rating += a_key_value_quality_index / quality_levels.length
    b_key_value_rating += b_key_value_quality_index / quality_levels.length

    const total_key_value_rating = a_key_value_rating + b_key_value_rating
    return Math.sign(a_key_value_rating - b_key_value_rating) * spec_allocation * (2/3) 
                            + Math.min(spec_allocation * (a_key_value_rating - b_key_value_rating) / total_key_value_rating, 1/3)
}

const generalComparator = (a, b, componentAllocations, component) => {
    let rating = 0
    const componentDict = componentAllocations[component]
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
                        const key_value_total = a[key] + b[key]
                        rating += Math.sign(a[key] - b[key]) * allocation * (2/3) 
                            + Math.min(allocation * (a[key] - b[key]) / key_value_total, 1/3)
                        break
                    case ('string'):
                        // form_factor or socket
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
    return rating
}

const recommendBuilds = async (userAllocations) => {
    const partsInBudget = await fetchPartsInBudget(userAllocations, MARGIN)
    let rankedComponents = {}
    for (let [component_key, components] of Object.entries(partsInBudget)) {
        const componentAllocations = userAllocations['components']
        rankedComponents[component_key] = components.sort((a, b) => generalComparator(a, b, componentAllocations, component_key))
    }
}

recommendBuilds(userAllocations500)

module.exports = { recommendBuilds, generalComparator }