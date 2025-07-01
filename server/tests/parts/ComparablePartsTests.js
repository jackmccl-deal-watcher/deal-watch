const { test_cpu, test_videocard, test_motherboard, test_memory, test_hard_drive, test_power_supply, test_case } = require('./test_parts.js')
const { getComparableParts } = require('../../utils/parts/ComparableParts.js')

const getComparableCPUs_test = async () => {
    const comparableCPUs = await getComparableParts(test_cpu)
    if (comparableCPUs.length > 0) {
        console.log("getComparableParts_test-CPU: Passed")
        return true
    } else {
        console.log("getComparableParts_test-CPU: Failed")
        return false
    }
}

const getComparableVideoCards_test = async () => {
    const comparableVideoCards = await getComparableParts(test_videocard)
    if (comparableVideoCards.length > 0) {
        console.log("getComparableParts_test-VideoCard: Passed")
        return true
    } else {
        console.log("getComparableParts_test-VideoCard: Failed")
        return false
    }
}

const getComparableMotherboards_test = async () => {
    const comparableMotherboards = await getComparableParts(test_motherboard)
    if (comparableMotherboards.length > 0) {
        console.log("getComparableParts_test-Motherboard: Passed")
        return true
    } else {
        console.log("getComparableParts_test-Motherboard: Failed")
        return false
    }
}

const getComparableMemorys_test = async () => {
    const comparableMemorys = await getComparableParts(test_memory)
    if (comparableMemorys.length > 0) {
        console.log("getComparableParts_test-Memory: Passed")
        return true
    } else {
        console.log("getComparableParts_test-Memory: Failed")
        return false
    }
}

const getComparableHardDrives_test = async () => {
    const comparableHardDrives = await getComparableParts(test_hard_drive)
    if (comparableHardDrives.length > 0) {
        console.log("getComparableParts_test-HardDrive: Passed")
        return true
    } else {
        console.log("getComparableParts_test-HardDrive: Failed")
        return false
    }
}

const getComparablePowerSupplys_test = async () => {
    const comparablePowerSupplys = await getComparableParts(test_power_supply)
    if (comparablePowerSupplys.length > 0) {
        console.log("getComparableParts_test-PowerSupply: Passed")
        return true
    } else {
        console.log("getComparableParts_test-PowerSupply: Failed")
        return false
    }
}

const getComparableCases_test = async () => {
    const comparableCases = await getComparableParts(test_case)
    if (comparableCases.length > 0) {
        console.log("getComparableParts_test-Case: Passed")
        return true
    } else {
        console.log("getComparableParts_test-Case: Failed")
        return false
    }
}

const getComparableParts_test = async () => {
    await getComparableCPUs_test()
    await getComparableVideoCards_test()
    await getComparableMotherboards_test()
    await getComparableMemorys_test()
    await getComparableHardDrives_test()
    await getComparablePowerSupplys_test()
    await getComparableCases_test()
}

const running_tests = async () => {
    await getComparableParts_test()
    process.exit(0)
}

running_tests()