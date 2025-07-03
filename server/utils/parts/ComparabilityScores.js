const ComponentTypes = require('../../models/part_models/ComponentTypesEnum.js')
const { CPU_PROPERTIES, VIDEOCARD_PROPERTIES, MOTHERBOARD_PROPERTIES, MEMORY_PROPERTIES, HARD_DRIVE_PROPERTIES, POWER_SUPPLY_PROPERTIES, CASE_PROPERTIES} = require('../../models/part_models/ComponentPropertiesEnums.js')

const calcComparabilityScore = (comparable_parts, input_part, specs) => {
    let working_comparable_parts = comparable_parts.map(part => part["_doc"])
    specs.map( (spec) => {
        let spec_total_comparability_score = 0
        const scored_comparable_parts = working_comparable_parts.map( (comparable_part) => {
            const input_spec_value = input_part[spec]
            const comparable_spec_value = comparable_part[spec]
            const comparability_score = 1-(Math.abs(input_spec_value - comparable_spec_value) / input_spec_value)
            let copy_comparable_part = {...comparable_part}
            if (!copy_comparable_part["comparability_scores"]) {
                copy_comparable_part["comparability_scores"] = {}
                copy_comparable_part["comparability_scores"][spec] = comparability_score
            } else {
                copy_comparable_part["comparability_scores"][spec] = comparability_score
            }

            spec_total_comparability_score += comparability_score
            return copy_comparable_part
        })
        const normalized_comparable_parts = scored_comparable_parts.map( (comparable_part) => {
            const comparability_score = comparable_part["comparability_scores"][spec]
            const normalized_comparability_score = comparability_score / spec_total_comparability_score
            let copy_comparable_part = {...comparable_part}
            if (!copy_comparable_part["normalized_comparability_scores"]) {
                copy_comparable_part["normalized_comparability_scores"] = {}
                copy_comparable_part["normalized_comparability_scores"][spec] = normalized_comparability_score
            } else {
                copy_comparable_part["normalized_comparability_scores"][spec] = normalized_comparability_score
            }
            return copy_comparable_part
        })
        working_comparable_parts = normalized_comparable_parts
    })
    const averaged_comparable_parts = working_comparable_parts.map( (comparable_part) => {
        let copy_comparable_part = {...comparable_part}
        let part_total_normalized_comparability_score = 0
        specs.map( (spec) => {
            const normalized_comparability_score = copy_comparable_part["normalized_comparability_scores"][spec]
            part_total_normalized_comparability_score += normalized_comparability_score
        })
        copy_comparable_part["average_comparability_score"] = part_total_normalized_comparability_score / specs.length
        return copy_comparable_part
    })
    return averaged_comparable_parts
}

const getComparabilityScoresCPUs = (comparable_cpus, input_cpu) => {
    const specs = [CPU_PROPERTIES.CORES, CPU_PROPERTIES.BASE_CLOCK, CPU_PROPERTIES.BOOST_CLOCK]
    return calcComparabilityScore(comparable_cpus, input_cpu, specs)
}

const getComparabilityScoresVideoCards = (comparable_videocards, input_videocard) => {
    const specs = [VIDEOCARD_PROPERTIES.VRAM, VIDEOCARD_PROPERTIES.BASE_CLOCK, VIDEOCARD_PROPERTIES.BOOST_CLOCK]
    return calcComparabilityScore(comparable_videocards, input_videocard, specs)
}

const getComparabilityScoresMotherboards = (comparable_motherboards, input_motherboard) => {
    const specs = [MOTHERBOARD_PROPERTIES.RAM_SLOTS, MOTHERBOARD_PROPERTIES.MAX_RAM]
    return calcComparabilityScore(comparable_motherboards, input_motherboard, specs)
}

const getComparabilityScoresMemorys = (comparable_memorys, input_memory) => {
    const specs = [MEMORY_PROPERTIES.SPEED, MEMORY_PROPERTIES.TOTAL_SIZE]
    return calcComparabilityScore(comparable_memorys, input_memory, specs)
}

const getComparabilityScoresHardDrives = (comparable_hard_drives, input_hard_drive) => {
    const specs = [HARD_DRIVE_PROPERTIES.CAPACITY]
    return calcComparabilityScore(comparable_hard_drives, input_hard_drive, specs)
}

const getComparabilityScoresPowerSupplys = (comparable_power_supplys, input_power_supply) => {
    const specs = [POWER_SUPPLY_PROPERTIES.WATTAGE]
    return calcComparabilityScore(comparable_power_supplys, input_power_supply, specs)
}

const getComparabilityScoresCases = (comparable_cases, input_case) => {
    const specs = [CASE_PROPERTIES.INTERNAL_BAYS]
    return calcComparabilityScore(comparable_cases, input_case, specs)
}

const getComparabilityScores = (comparable_parts, input_part) => {
    switch (input_part.type) {
        case ComponentTypes.CPU:
            return getComparabilityScoresCPUs(comparable_parts, input_part)
        case ComponentTypes.VIDEOCARD:
            return getComparabilityScoresVideoCards(comparable_parts, input_part)
        case ComponentTypes.MOTHERBOARD:
            return getComparabilityScoresMotherboards(comparable_parts, input_part)
        case ComponentTypes.MEMORY:
            return getComparabilityScoresMemorys(comparable_parts, input_part)
        case ComponentTypes.HARD_DRIVE:
            return getComparabilityScoresHardDrives(comparable_parts, input_part)
        case ComponentTypes.POWER_SUPPLY:
            return getComparabilityScoresPowerSupplys(comparable_parts, input_part)
        case ComponentTypes.CASE:
            return getComparabilityScoresCases(comparable_parts, input_part)
        case ComponentTypes.UNKNOWN:
            console.log("ComponentType: UNKNOWN in get comparability scores")
            return []
    }
    return []
}

module.exports = { getComparabilityScores }