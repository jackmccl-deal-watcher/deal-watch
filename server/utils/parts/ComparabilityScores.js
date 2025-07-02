const ComponentTypes = require('../../models/part_models/ComponentTypesEnum.js')

const calcComparabilityScore = (comparable_parts, input_part, specs) => {
    specs.forEach( (spec) => {
        let spec_total_comparability_score = 0
        comparable_parts.forEach( (comparable_part) => {
            comparable_part[spec]["comparability_score"] = Math.abs(input_part[spec] - comparable_part[spec])
            console.log(comparable_part)
            spec_total_comparability_score += comparable_part[spec]["comparability_score"]
        })
        comparable_parts.forEach( (comparable_part) => {
            comparable_part[spec]["normalized_comparability_score"] = comparable_part[spec]["comparability_score"] / spec_total_comparability_score
        })
    })
    comparable_parts.forEach( (comparable_part) => {
        let part_total_comparability_score = 0
        specs.forEach( (spec) => {
            part_total_comparability_score += comparable_part[spec]["comparability_score"]
        })
        comparable_part["average_comparability_score"] = part_total_comparability_score / specs.length
    })
}

const getComparabilityScoresCPUs = (comparable_cpus, input_cpu) => {
    const specs = ['cores', 'base_clock', 'boost_clock']
    calcComparabilityScore(comparable_cpus, input_cpu, specs)
    return comparable_cpus
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