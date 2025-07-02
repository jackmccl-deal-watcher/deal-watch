const { test_cpu, test_videocard, test_motherboard, test_memory, test_hard_drive, test_power_supply, test_case } = require('./test_parts.js')
const { TestError } = require('../../errors/TestError.js')
const { getComparabilityScores } = require('../../utils/parts/ComparabilityScores.js')
const { getComparableParts } = require('../../utils/parts/ComparableParts.js')

const getComparabilityScoresCPUs_test = async () => {
    const comparableCPUs = await getComparableParts(test_cpu)
    const scoredComparableCPUs = getComparabilityScores(comparableCPUs, test_cpu)
    scoredComparableCPUs.forEach( (scoredComparableCPU) => {
        if (Object.keys(scoredComparableCPU.comparability_scores).length > 0
            && Object.keys(scoredComparableCPU.normalized_comparability_scores).length > 0
            && scoredComparableCPU.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresCPUs_test-CPU: Failed")
            throw new TestError("getComparabilityScoresCPUs_test-CPU: Failed")
        }
    })
    console.log("getComparabilityScoresCPUs_test-CPU: Passed")
    return true
}

const getComparabilityScoresVideoCards_test = async () => {
    const comparableVideoCards = await getComparableParts(test_videocard)
    const scoredComparableVideoCards = getComparabilityScores(comparableVideoCards, test_videocard)
    scoredComparableVideoCards.forEach( (scoredComparableVideoCard) => {
        if (Object.keys(scoredComparableVideoCard.comparability_scores).length > 0
            && Object.keys(scoredComparableVideoCard.normalized_comparability_scores).length > 0
            && scoredComparableVideoCard.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresVideoCards_test-VideoCard: Failed")
            throw new TestError("getComparabilityScoresVideoCards_test-VideoCard: Failed")
        }
    })
    console.log("getComparabilityScoresVideoCards_test-VideoCard: Passed")
    return true
}
const getComparabilityScoresMotherboards_test = async () => {
    const comparableMotherboards = await getComparableParts(test_motherboard)
    const scoredComparableMotherboards = getComparabilityScores(comparableMotherboards, test_motherboard)
    scoredComparableMotherboards.forEach( (scoredComparableMotherboard) => {
        if (Object.keys(scoredComparableMotherboard.comparability_scores).length > 0
            && Object.keys(scoredComparableMotherboard.normalized_comparability_scores).length > 0
            && scoredComparableMotherboard.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresMotherboards_test-Motherboard: Failed")
            throw new TestError("getComparabilityScoresMotherboards_test-Motherboard: Failed")
        }
    })
    console.log("getComparabilityScoresMotherboards_test-Motherboard: Passed")
    return true
}
const getComparabilityScoresMemorys_test = async () => {
    const comparableMemorys = await getComparableParts(test_memory)
    const scoredComparableMemorys = getComparabilityScores(comparableMemorys, test_memory)
    scoredComparableMemorys.forEach( (scoredComparableMemory) => {
        if (Object.keys(scoredComparableMemory.comparability_scores).length > 0
            && Object.keys(scoredComparableMemory.normalized_comparability_scores).length > 0
            && scoredComparableMemory.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresMemorys_test-Memory: Failed")
            throw new TestError("getComparabilityScoresMemorys_test-Memory: Failed")
        }
    })
    console.log("getComparabilityScoresMemorys_test-Memory: Passed")
    return true
}
const getComparabilityScoresHardDrives_test = async () => {
    const comparableHardDrives = await getComparableParts(test_hard_drive)
    const scoredComparableHardDrives = getComparabilityScores(comparableHardDrives, test_hard_drive)
    scoredComparableHardDrives.forEach( (scoredComparableHardDrive) => {
        if (Object.keys(scoredComparableHardDrive.comparability_scores).length > 0
            && Object.keys(scoredComparableHardDrive.normalized_comparability_scores).length > 0
            && scoredComparableHardDrive.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresHardDrives_test-HardDrive: Failed")
            throw new TestError("getComparabilityScoresHardDrives_test-HardDrive: Failed")
        }
    })
    console.log("getComparabilityScoresHardDrives_test-HardDrive: Passed")
    return true
}
const getComparabilityScoresPowerSupplys_test = async () => {
    const comparablePowerSupplys = await getComparableParts(test_power_supply)
    const scoredComparablePowerSupplys = getComparabilityScores(comparablePowerSupplys, test_power_supply)
    scoredComparablePowerSupplys.forEach( (scoredComparablePowerSupply) => {
        if (Object.keys(scoredComparablePowerSupply.comparability_scores).length > 0
            && Object.keys(scoredComparablePowerSupply.normalized_comparability_scores).length > 0
            && scoredComparablePowerSupply.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresPowerSupplys_test-PowerSupply: Failed")
            throw new TestError("getComparabilityScoresPowerSupplys_test-PowerSupply: Failed")
        }
    })
    console.log("getComparabilityScoresPowerSupplys_test-PowerSupply: Passed")
    return true
}
const getComparabilityScoresCases_test = async () => {
    const comparableCases = await getComparableParts(test_case)
    const scoredComparableCases = getComparabilityScores(comparableCases, test_case)
    scoredComparableCases.forEach( (scoredComparableCase) => {
        if (Object.keys(scoredComparableCase.comparability_scores).length > 0
            && Object.keys(scoredComparableCase.normalized_comparability_scores).length > 0
            && scoredComparableCase.average_comparability_score) {
        } else {
            console.log("getComparabilityScoresCases_test-Case: Failed")
            throw new TestError("getComparabilityScoresCases_test-Case: Failed")
        }
    })
    console.log("getComparabilityScoresCases_test-Case: Passed")
    return true
}

const getComparabilityScores_test = async () => {
    await getComparabilityScoresCPUs_test()
    await getComparabilityScoresVideoCards_test()
    await getComparabilityScoresMotherboards_test()
    await getComparabilityScoresMemorys_test()
    await getComparabilityScoresHardDrives_test()
    await getComparabilityScoresPowerSupplys_test()
    await getComparabilityScoresCases_test()
}

const running_tests = async () => {
    try {
        await getComparabilityScores_test()
    } catch (error) {
        console.error(error)
    }
    process.exit(0)
}

running_tests()