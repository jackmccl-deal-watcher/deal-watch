const ComponentTypes = require('../../models/part_models/ComponentTypesEnum.js')
const { copy } = require('../../routes/UserRoutes.js')

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
    const specs = ['cores', 'base_clock', 'boost_clock']
    return calcComparabilityScore(comparable_cpus, input_cpu, specs)
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