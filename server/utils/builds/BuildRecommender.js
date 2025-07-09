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
const MODULARITIES = ["No", "Semi", "Full"]
const MODULE_TYPES = ["DDR", "DDR2", "DDR3", "DDR4"]
const STORAGE_TYPES = ["HDD", "Hybrid", "SSD"]

const MARGIN = 0.10

const fetchPartsInBudget = async (userAllocations, margin) => {
    let partsDict = {}
    for (let [component_key, component] of Object.entries(userAllocations.components)) {
        const componentBudget = userAllocations.budget * component.allocation
        const componentBudgetLow = componentBudget - componentBudget * margin
        const componentBudgetHigh = componentBudget + componentBudget * margin
        
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
            a_color_rating += preferenceColors.length - color_index / 2
        }
        if (b['color'] === preferenceColors[color_index]) {
            b_color_rating += preferenceColors.length - color_index
        } else if (b['color'].includes(preferenceColors[color_index]) || preferenceColors[color_index].includes(b['color'])) {
            b_color_rating += preferenceColors.length - color_index / 2
        }
    }
    const colorAllocation = color_allocation_dict['allocation']
    const total_color_rating = a_color_rating + b_color_rating
    return colorAllocation * (a_color_rating - b_color_rating) / total_color_rating
}

const calcSlidingQualityRating = (a, b, allocation_dict, quality_levels, value_key) => {
    const keyPreference = allocation_dict[value_key]
    let a_key_value_rating = 0
    let b_key_value_rating = 0
    for (let value_index in quality_levels) {
        if (quality_levels[value_index] === a[value_key] || quality_levels[value_index] === keyPreference) {
            break
        } else {
            a_key_value_rating += 1 / keyPreference.length
        }
    }
    for (let value_index in quality_levels) {
        if (quality_levels[value_index] === b[value_key] || quality_levels[value_index] === keyPreference) {
            break
        } else {
            b_key_value_rating += 1 / keyPreference.length
        }
    }
    const keyAllocation = allocation_dict['allocation']
    const total_key_value_rating = a_key_value_rating + b_key_value_rating
    return keyAllocation * (a_key_value_rating - b_key_value_rating) / total_key_value_rating
}

const generalComparator = (a, b, userAllocations, component) => {
    let rating = 0
    const componentDict = userAllocations['components'][component]
    const componentPropertyKeys = Object.keys(componentDict).filter(key => key !== 'allocation')
    for (let key of componentPropertyKeys) {
        const allocation = componentDict[key]
        switch (typeof a[key]) {
            case ('number'): 
                const key_value_total = a[key] + b[key]
                rating += allocation * (a[key] - b[key]) / key_value_total
                break
            case ('array'):
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
                }
            case ('string'):
                // form_factor
                if (a[key] === allocation) {
                    rating += 1000
                }
                if (b[key] === allocation) {
                    rating -= 1000
                }
                break
        }
    }
    return rating
}

const recommendBuilds = async (userAllocations) => {
    const partsInBudget = await fetchPartsInBudget(userAllocations, MARGIN)
    let rankedComponents = {}
    for (let [component_key, components] of Object.entries(partsInBudget)) {
        rankedComponents[component_key] = components.sort((a, b) => generalComparator(a, b, userAllocations, component_key))
    }
    console.log(rankedComponents['case'])
}

recommendBuilds(userAllocations500)

module.exports = { recommendBuilds }